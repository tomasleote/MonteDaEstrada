#!/usr/bin/env node
// Resizes the PL CDN images for web delivery.
//
//   node scripts/optimize-images.mjs [--dry]
//
// The webp conversion pass kept full camera resolution (median 3748px wide,
// ~5 MB/file), which is why pages load slowly — jsDelivr is a plain file CDN
// and cannot resize on the fly. This caps the longest edge at MAX_EDGE and
// re-encodes, bringing PL in line with MDE (median 1500px, ~0.5 MB/file).
//
// Rewrites files in place. Commit the result and bump the CDN pin.

import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'C:/Users/leotm/Desktop/Projetos/Programming/Hotels-Assets/assets-hotel/pl';
const MAX_EDGE = 1920;   // plenty for full-bleed heroes on 2x displays
const QUALITY = 80;
const CONCURRENCY = 4;
const DRY = process.argv.includes('--dry');

function allImages(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) allImages(full, out);
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = allImages(ROOT);
const before = files.reduce((sum, f) => sum + statSync(f).size, 0);
console.log(`${files.length} images, ${(before / 1048576).toFixed(1)} MB total`);
console.log(`Resizing longest edge to ${MAX_EDGE}px @ q${QUALITY}${DRY ? ' (DRY RUN)' : ''}…\n`);

let i = 0, done = 0, skipped = 0, failed = 0, after = 0;
const failures = [];

async function worker() {
  while (i < files.length) {
    const file = files[i++];
    try {
      const input = await readFile(file);
      const meta = await sharp(input).metadata();
      const longest = Math.max(meta.width, meta.height);

      // Re-encode even when already small enough: the source webp files were
      // written at a high quality setting and still shrink substantially.
      const pipeline = sharp(input).rotate();
      if (longest > MAX_EDGE) pipeline.resize({ width: meta.width >= meta.height ? MAX_EDGE : null, height: meta.height > meta.width ? MAX_EDGE : null, withoutEnlargement: true });
      const output = await pipeline.webp({ quality: QUALITY, effort: 5 }).toBuffer();

      if (output.length >= input.length && longest <= MAX_EDGE) {
        after += input.length;
        skipped++;
        continue;
      }

      if (!DRY) await writeFile(file, output);
      after += output.length;
      done++;
      process.stdout.write(`\r  ${done + skipped}/${files.length} processed  `);
    } catch (e) {
      failed++;
      failures.push(`${path.basename(file)}: ${e.message}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
process.stdout.write('\r');

console.log(`\nResized ${done}, left as-is ${skipped}, failed ${failed}`);
console.log(`  before: ${(before / 1048576).toFixed(1)} MB`);
console.log(`  after:  ${(after / 1048576).toFixed(1)} MB  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
console.log(`  avg/file: ${(after / files.length / 1048576).toFixed(2)} MB`);
if (failures.length) console.log('\nFailures:\n  ' + failures.join('\n  '));
if (DRY) console.log('\nDry run — no files written.');
