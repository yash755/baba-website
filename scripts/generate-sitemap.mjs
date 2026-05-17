/**
 * Generates public/sitemap.xml by fetching the stories API at build time.
 * Run with: node scripts/generate-sitemap.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://jaibabamohanram.co.in';
const API_URL = 'https://www.api.joinpublicgroups.com/get_experience';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/info', priority: '0.9', changefreq: 'weekly' },
  { path: '/aarti', priority: '0.9', changefreq: 'monthly' },
  { path: '/chalisa', priority: '0.9', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/experience', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'yearly' },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry({ loc, priority = '0.7', changefreq = 'monthly', lastmod }) {
  const today = new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod || today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function fetchStories() {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data ?? [];
  } catch (err) {
    console.warn(`[sitemap] Could not fetch stories (${err.message}). Using static routes only.`);
    return [];
  }
}

async function generate() {
  const stories = await fetchStories();
  const entries = [];

  for (const route of staticRoutes) {
    entries.push(urlEntry({ loc: `${BASE_URL}${route.path}`, ...route }));
  }

  for (const story of stories) {
    if (!story.id || !story.title) continue;
    const slug = encodeURIComponent(story.title.trim().replace(/\s+/g, '-'));
    const loc = `${BASE_URL}/detail-story/${slug}/${story.id}`;
    const lastmod = story.updated_at ? story.updated_at.split('T')[0] : undefined;
    entries.push(urlEntry({ loc, priority: '0.8', changefreq: 'monthly', lastmod }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  const outDir = join(__dirname, '..', 'public');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf8');
  console.log(`[sitemap] Written ${entries.length} URLs to ${outPath}`);
}

generate();
