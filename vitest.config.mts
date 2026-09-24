import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
    include: ['tests/**/*.test.ts'],
    fileParallelism: false,
    maxConcurrency: 1,
    testTimeout: 120000,
    hookTimeout: 120000,
  },
});
