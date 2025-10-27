#!/usr/bin/env node
/*
  Build app icons from a single 1024x1024 PNG source placed at:
  web/public/brand/app-icon-1024.png

  Outputs:
  - web/public/icons/rawnpro-192.png
  - web/public/icons/rawnpro-512.png
  - web/public/icons/apple-touch-icon-180.png

  Notes:
  - Keep the artwork centered with ~20-24% safe area padding.
  - No rounded corners or shadows; platforms will mask them.
*/
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'public', 'brand', 'app-icon-1024.png');
const outDir = path.join(root, 'public', 'icons');

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  const hasSrc = await exists(src);
  if (!hasSrc) {
    console.log('[icons] Source not found, skipping:', path.relative(root, src));
    return;
  }

  let sharp;
  try {
    ({ default: sharp } = await import('sharp'));
  } catch (e) {
    console.warn('[icons] sharp not installed; skipping icon generation.');
    return;
  }

  await fs.mkdir(outDir, { recursive: true });

  const tasks = [
    { size: 192, file: 'rawnpro-192.png' },
    { size: 512, file: 'rawnpro-512.png' },
    { size: 180, file: 'apple-touch-icon-180.png' },
  ].map(async ({ size, file }) => {
    const dest = path.join(outDir, file);
    await sharp(src)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log('[icons] wrote', path.relative(root, dest));
  });

  await Promise.all(tasks);
  console.log('[icons] done');
}

main().catch((err) => {
  console.error('[icons] failed', err);
  process.exit(0); // be non-fatal for builds
});
