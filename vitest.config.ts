import react from "@vitejs/plugin-react";
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
      setupFiles: ['./__tests__/setup-test.ts'],
      include: ['app/**/*.test.tsx'],
      environment: 'jsdom',
      globals: true,
  },
})
