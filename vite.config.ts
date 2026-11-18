import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const demoMode = env.VITE_DEMO_MODE !== 'false';

  // A production build must not silently publish sample business information.
  if (mode === 'production' && !demoMode) {
    if (env.VITE_CLIENT_CONTENT_APPROVED !== 'true') {
      throw new Error('Production release blocked: set VITE_CLIENT_CONTENT_APPROVED=true only after every demo detail has been replaced and approved.');
    }
    if (!/^\d{10,15}$/.test(env.VITE_WHATSAPP_NUMBER || '')) {
      throw new Error('Production release blocked: VITE_WHATSAPP_NUMBER must be a verified international number containing 10–15 digits.');
    }
    if (!/^tel:\+[1-9]\d{7,14}$/.test(env.VITE_PHONE_HREF || '')) {
      throw new Error('Production release blocked: VITE_PHONE_HREF must be a verified tel:+ number.');
    }
    if (!/^https:\/\//i.test(env.VITE_SITE_URL || '')) {
      throw new Error('Production release blocked: VITE_SITE_URL must be the final HTTPS canonical domain.');
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Preserve root-relative source image URLs used by the existing design.
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
      alias: { '@': path.resolve(__dirname, '.') },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
