/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig(() => {
  const base = process.env.BASE_PATH || '/2552419-six-cities-3/';

  return {
    base,
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            /href="css\/main.css"/g,
            `href="${base}css/main.css"`
          );
        },
      },
      {
        name: 'generate-404',
        closeBundle() {
          try {
            const indexHtml = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8');
            writeFileSync(resolve(__dirname, 'dist/404.html'), indexHtml);
          } catch {
            // Ignore errors if dist doesn't exist yet
          }
        },
      },
    ],
    server: {
      open: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
  };
});
