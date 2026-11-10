import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/productos": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/pedidos": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/reportes": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/__test__": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",

    exclude: [
      "e2e/**",
      "node_modules/**",
      "dist/**",
    ],
  },
});