import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

const sitemapPaths = [
  '/',
  '/about',
  '/facilities',
  '/membership',
  '/trainers',
  '/timetable',
  '/gallery',
  '/contact',
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
  const indexingRequested = env.VITE_INDEXING_ENABLED === 'true';

  let isValidHttpsSiteUrl = false;
  try {
    isValidHttpsSiteUrl = new URL(siteUrl).protocol === 'https:';
  } catch {
    isValidHttpsSiteUrl = false;
  }

  if (indexingRequested && !isValidHttpsSiteUrl) {
    throw new Error(
      'VITE_INDEXING_ENABLED=true requires VITE_SITE_URL to be a valid HTTPS production domain.',
    );
  }

  const indexingEnabled = indexingRequested && isValidHttpsSiteUrl;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'client-seo-output',
        transformIndexHtml(html: string) {
          const robotsContent = indexingEnabled ? 'index,follow' : 'noindex,nofollow';
          return html.replace(
            /<meta name="robots" content="[^"]*"\s*\/?>/i,
            `<meta name="robots" content="${robotsContent}" />`,
          );
        },
        generateBundle(_options, bundle) {
          const robotsContent = indexingEnabled
            ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
            : 'User-agent: *\nDisallow: /\n';

          const robotsAsset = bundle['robots.txt'];
          if (robotsAsset?.type === 'asset') {
            robotsAsset.source = robotsContent;
          } else {
            this.emitFile({
              type: 'asset',
              fileName: 'robots.txt',
              source: robotsContent,
            });
          }

          const sitemapAsset = bundle['sitemap.xml'];
          if (!indexingEnabled) {
            if (sitemapAsset) delete bundle['sitemap.xml'];
            return;
          }

          const sitemapXml = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...sitemapPaths.map(
              (route) =>
                `  <url><loc>${siteUrl}${route}</loc></url>`,
            ),
            '</urlset>',
            '',
          ].join('\n');

          if (sitemapAsset?.type === 'asset') {
            sitemapAsset.source = sitemapXml;
          } else {
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: sitemapXml,
            });
          }
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." continue to resolve in production builds.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) return;

          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');

          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
