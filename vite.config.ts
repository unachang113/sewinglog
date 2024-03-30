import {vitePlugin as remix} from '@remix-run/dev';
import {installGlobals} from '@remix-run/node';
import {defineConfig} from 'vite';
import {vercelPreset} from '@vercel/remix/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  plugins: [remix({presets: [vercelPreset()]}), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
});
