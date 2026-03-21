#!/usr/bin/env node
/**
 * translate.mjs — AI-powered PT → EN translation for CMS JSON files.
 *
 * Usage:
 *   node scripts/translate.mjs apps/monte-da-estrada/src/data/pt/home.json
 *
 * Reads the PT JSON, walks the tree to collect translatable strings,
 * sends them as a batch to OpenAI gpt-4o-mini, and writes the EN JSON.
 *
 * Env: OPENAI_API_KEY must be set.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, basename, join } from 'node:path';

// ── Config ──────────────────────────────────────────────────────
const MODEL = 'gpt-4o-mini';
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Keys whose values should NEVER be translated (URLs, images, coordinates, IDs)
const SKIP_KEYS = new Set([
  'src', 'image', 'imageSrc', 'logo', 'favicon', 'metaImage',
  'thumbnail', 'url', 'mapUrl', 'ctaHref', 'href',
  'latitude', 'longitude', 'postalCode',
  'reservasUrl', 'siteLogo',
]);

// ── Helpers ─────────────────────────────────────────────────────

/** Check if a string looks like a URL or file path — skip translation */
function isUrlOrPath(s) {
  return /^https?:\/\//.test(s) || /^\/[a-z]/.test(s);
}

/**
 * Walk a JSON value and collect all translatable strings.
 * Returns an array of { path: string[], value: string }.
 */
function collectStrings(obj, path = []) {
  const results = [];

  if (typeof obj === 'string') {
    const key = path[path.length - 1];
    if (SKIP_KEYS.has(key) || isUrlOrPath(obj)) return results;
    if (obj.trim().length === 0) return results;
    results.push({ path: [...path], value: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...collectStrings(item, [...path, String(i)]));
    });
  } else if (obj !== null && typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      results.push(...collectStrings(val, [...path, key]));
    }
  }

  return results;
}

/** Set a value at a nested path in an object, creating intermediaries. */
function setAtPath(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];
    if (!(key in current)) {
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = value;
}

/** Deep-clone a JSON-safe value. */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ── OpenAI API call ─────────────────────────────────────────────

async function translateBatch(strings) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  // Build a numbered list so the model returns translations in the same order
  const numberedList = strings
    .map((s, i) => `${i + 1}. ${s}`)
    .join('\n');

  const systemPrompt = `You are a professional translator for a Portuguese boutique rural hotel website (Monte da Estrada, Alentejo, Portugal).

Translate the following Portuguese texts to English. Maintain:
- The same tone: calm, editorial, understated luxury
- Place names (Zambujeira do Mar, Alentejo, etc.) should NOT be translated
- Brand names should NOT be translated
- Keep the same length and style as the original

Return ONLY a JSON array of translated strings in the same order. No numbering, no explanations.
Example input:
1. Bem-vindo ao Monte
2. Uma experiência única

Example output:
["Welcome to Monte", "A unique experience"]`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: numberedList },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();

  // Parse the JSON array from the response
  try {
    return JSON.parse(content);
  } catch {
    // Try extracting JSON array from markdown code block
    const match = content.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`Failed to parse translation response: ${content}`);
  }
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  const ptFile = process.argv[2];
  if (!ptFile) {
    console.error('Usage: node scripts/translate.mjs <pt-json-file>');
    process.exit(1);
  }

  // Derive EN output path: replace /pt/ with /en/
  const enFile = ptFile.replace(/[\\/]pt[\\/]/, '/en/');
  if (enFile === ptFile) {
    console.error(`Error: file path must contain /pt/ directory: ${ptFile}`);
    process.exit(1);
  }

  console.log(`📖 Reading: ${ptFile}`);
  const ptData = JSON.parse(readFileSync(ptFile, 'utf-8'));

  // Collect translatable strings
  const entries = collectStrings(ptData);
  console.log(`🔍 Found ${entries.length} translatable strings`);

  if (entries.length === 0) {
    console.log('ℹ️  No translatable strings found, copying file as-is');
    mkdirSync(dirname(enFile), { recursive: true });
    writeFileSync(enFile, JSON.stringify(ptData, null, 2) + '\n', 'utf-8');
    return;
  }

  // Translate in batches of 50 to avoid token limits
  const BATCH_SIZE = 50;
  const allTranslations = [];

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    const batchStrings = batch.map((e) => e.value);
    console.log(`🌐 Translating batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(entries.length / BATCH_SIZE)} (${batchStrings.length} strings)...`);
    const translations = await translateBatch(batchStrings);
    allTranslations.push(...translations);
  }

  // Build the EN JSON by cloning PT and replacing translated values
  const enData = deepClone(ptData);
  for (let i = 0; i < entries.length; i++) {
    setAtPath(enData, entries[i].path, allTranslations[i]);
  }

  // Write EN file
  mkdirSync(dirname(enFile), { recursive: true });
  writeFileSync(enFile, JSON.stringify(enData, null, 2) + '\n', 'utf-8');
  console.log(`✅ Written: ${enFile}`);
}

main().catch((err) => {
  console.error('❌ Translation failed:', err.message);
  process.exit(1);
});
