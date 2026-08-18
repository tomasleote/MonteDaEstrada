#!/usr/bin/env node
// One-time migration tool: downloads every image from the old Wix site
// (montedopapaleguas.pt) at original upload resolution, into the CDN repo.
//
//   node scripts/scrape-wix-images.mjs
//
// No browser required. Wix publishes a per-page JSON model listing every
// image a page owns — including carousel slides that never appear in the
// server-rendered HTML — so we read those instead of driving a headless
// browser through the UI.
//
// Output: <assets-hotel>/pl/<page>/*  +  <assets-hotel>/pl/manifest.json

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://www.montedopapaleguas.pt';
const OUT_DIR = 'C:/Users/leotm/Desktop/Projetos/Programming/Hotels-Assets/assets-hotel/pl';
const CONCURRENCY = 8;
const UA = 'Mozilla/5.0 (compatible; papa-leguas-migration/1.0)';

const MEDIA_ID = /[a-f0-9]{6}_[a-f0-9]{32}~mv2\.[a-zA-Z]{3,4}/g;

// Wix's internal slug for the homepage.
const SLUG_ALIASES = { blank: 'home' };

// Images are deduped so the CDN repo never stores the same binary twice.
// Content pages are processed before aggregator pages (galeria reuses shots
// from quartos/redondezas), so each file lands in the folder it belongs to.
// manifest.json records every page that references a file.
const PAGE_PRIORITY = ['quartos', 'atividades', 'redondezas', 'contactos', 'home', 'galeria'];

// Anything after `<id>~mv2.<ext>` in a wixstatic URL is a display transform
// (/v1/fill/w_980,…). The bare id is the original upload.
const originalUrl = (id) => `https://static.wixstatic.com/media/${id}`;
const fileNameFor = (id) => id.replace('~mv2', '');

async function getText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

// The homepage embeds a router map of every page -> its JSON model filename.
async function getPageMap() {
  const html = (await getText(SITE_URL)).split('\\/').join('/').split('\\"').join('"');
  const map = new Map();
  const re = /"pageUriSEO":"([^"]+)","pageJsonFileName":"([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    map.set(SLUG_ALIASES[m[1]] || m[1], m[2]);
  }
  if (!map.size) throw new Error('could not read pagesMap — Wix markup may have changed');
  return map;
}

// Two sources, unioned:
//   page JSON — carousel slides that are never server-rendered
//   page HTML — Pro Gallery items and master-page assets (logo, favicon),
//               which live outside the page model
async function imagesForPage(slug, jsonFile) {
  const ids = new Set();
  const dims = {};

  try {
    const raw = await getText(`https://static.wixstatic.com/sites/${jsonFile}.json.z?v=3`);
    for (const id of raw.match(MEDIA_ID) || []) ids.add(id);

    const re = /"uri"\s*:\s*"([^"]+~mv2\.[a-zA-Z]{3,4})"[^}]{0,300}?"width"\s*:\s*(\d+)\s*,\s*"height"\s*:\s*(\d+)/g;
    let m;
    while ((m = re.exec(raw)) !== null) if (!dims[m[1]]) dims[m[1]] = { width: +m[2], height: +m[3] };
  } catch { /* page model unavailable — HTML pass below still applies */ }

  try {
    const html = await getText(`${SITE_URL}/${slug === 'home' ? '' : slug}`);
    for (const id of html.match(MEDIA_ID) || []) ids.add(id);
  } catch { /* page has no public URL (e.g. fullscreen-page) */ }

  return { ids: [...ids], dims };
}

function orderPages(slugs) {
  return [...slugs].sort((a, b) => {
    const ia = PAGE_PRIORITY.indexOf(a);
    const ib = PAGE_PRIORITY.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
}

async function downloadAll(jobs) {
  let i = 0, ok = 0, skipped = 0, failed = 0, bytes = 0;
  const failures = [];

  async function worker() {
    while (i < jobs.length) {
      const { id, dest } = jobs[i++];
      if (existsSync(dest) && statSync(dest).size > 0) {
        skipped++;
        bytes += statSync(dest).size;
        continue;
      }
      try {
        const res = await fetch(originalUrl(id), { headers: { 'User-Agent': UA } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        if (!buf.byteLength) throw new Error('empty body');
        await writeFile(dest, buf);
        ok++;
        bytes += buf.byteLength;
        process.stdout.write(`\r  downloaded ${ok}/${jobs.length}   `);
      } catch (e) {
        failed++;
        failures.push({ id, error: e.message });
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\r');
  return { ok, skipped, failed, failures, bytes };
}

async function run() {
  console.log('Reading page map…');
  const pageMap = await getPageMap();
  console.log(`  ${pageMap.size} pages: ${[...pageMap.keys()].join(', ')}\n`);

  const perPage = {};
  const allDims = {};
  for (const slug of orderPages(pageMap.keys())) {
    try {
      const { ids, dims } = await imagesForPage(slug, pageMap.get(slug));
      perPage[slug] = ids;
      Object.assign(allDims, dims);
      console.log(`${slug.padEnd(18)} ${String(ids.length).padStart(3)} referenced`);
    } catch (e) {
      perPage[slug] = [];
      console.log(`${slug.padEnd(18)} FAILED — ${e.message}`);
    }
  }

  // Assign each unique image to the first page (by priority) that references it.
  const owner = new Map();
  const usedBy = new Map();
  for (const slug of orderPages(Object.keys(perPage))) {
    for (const id of perPage[slug]) {
      if (!owner.has(id)) owner.set(id, slug);
      if (!usedBy.has(id)) usedBy.set(id, []);
      usedBy.get(id).push(slug);
    }
  }

  // Master-page assets (logo, favicon) appear on every page — keep them out
  // of an arbitrary content folder.
  const contentPages = Object.keys(perPage).filter((s) => perPage[s].length);
  for (const [id, pages] of usedBy) {
    if (contentPages.length > 1 && pages.length === contentPages.length) owner.set(id, 'shared');
  }

  const jobs = [];
  for (const [id, slug] of owner) {
    jobs.push({ id, slug, dest: path.join(OUT_DIR, slug, fileNameFor(id)) });
  }
  for (const slug of new Set(jobs.map((j) => j.slug))) {
    await mkdir(path.join(OUT_DIR, slug), { recursive: true });
  }

  console.log(`\n${jobs.length} unique images (deduped). Downloading originals…`);
  const { ok, skipped, failed, failures, bytes } = await downloadAll(jobs);

  const manifest = {
    scrapedFrom: SITE_URL,
    totalUnique: jobs.length,
    files: jobs
      .map(({ id, slug }) => ({
        path: `pl/${slug}/${fileNameFor(id)}`,
        page: slug,
        usedBy: usedBy.get(id),
        ...(allDims[id] || {}),
      }))
      .sort((a, b) => a.path.localeCompare(b.path)),
    failures,
  };
  await writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  const counts = {};
  for (const j of jobs) counts[j.slug] = (counts[j.slug] || 0) + 1;

  console.log(`Done. ${ok} downloaded, ${skipped} already present, ${failed} failed.`);
  console.log(`  total size: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
  for (const [slug, n] of Object.entries(counts)) console.log(`    pl/${slug.padEnd(14)} ${n}`);
  console.log(`  manifest: ${path.join(OUT_DIR, 'manifest.json')}`);
  if (failed) console.log(`  ${failed} failures recorded in manifest.json`);
}

run().catch((e) => { console.error(e); process.exit(1); });
