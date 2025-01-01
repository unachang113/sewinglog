import { reactRouter } from '@react-router/dev/vite';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    reactRouter(),
    tsconfigPaths()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
});
