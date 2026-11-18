import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';

const root = process.cwd();
const env = loadEnv('production', root, '');
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const distDir = path.join(root, 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const robotsPath = path.join(distDir, 'robots.txt');

if (!siteUrl) {
  if (fs.existsSync(sitemapPath)) fs.rmSync(sitemapPath);
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => !/^sitemap:/i.test(line))
      .join('\n')
      .trimEnd();
    fs.writeFileSync(robotsPath, robots + '\n');
  }
  console.warn('VITE_SITE_URL is not set; sitemap generation skipped. Configure the final HTTPS domain before production indexing.');
  process.exit(0);
}

if (!/^https:\/\//i.test(siteUrl)) {
  throw new Error('VITE_SITE_URL must start with https://');
}

const routes = [
  ['/', 'weekly', '1.0'],
  ['/about', 'monthly', '0.8'],
  ['/facilities', 'monthly', '0.9'],
  ['/membership', 'weekly', '0.9'],
  ['/trainers', 'monthly', '0.8'],
  ['/timetable', 'weekly', '0.8'],
  ['/gallery', 'monthly', '0.7'],
  ['/contact', 'monthly', '0.9'],
];

const urls = routes.map(([route, frequency, priority]) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');

fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const existingRobots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8').split(/\r?\n/).filter((line) => !/^sitemap:/i.test(line)).join('\n').trimEnd() : 'User-agent: *\nAllow: /';
fs.writeFileSync(robotsPath, `${existingRobots}\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`Generated sitemap for ${siteUrl}`);
