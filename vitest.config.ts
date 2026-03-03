import react from '@vitejs/plugin-react-swc';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
    },
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          name: 'node',
          globals: true,
          environment: 'node',
          include: ['src/**/*.node.{test,spec}.{ts,tsx}'],
        },
      },
      {
        plugins: [react(), tsconfigPaths()],
        test: {
          name: 'browser',
          globals: true,
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
            headless: true,
          },
          include: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
        },
      },
    ],
  },
});

export default config;
