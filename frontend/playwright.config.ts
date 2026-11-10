import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  use: {
    baseURL: "http://127.0.0.1:5173",
    headless: true,
  },

  webServer: [
    {
      command: "npm start",
      cwd: "..",
      url: "http://localhost:3000/productos",
      env: {
        NODE_ENV: "test",
      },
      reuseExistingServer: true,
    },
    {
      command: "npm run dev -- --host 127.0.0.1",
      cwd: ".",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: false,
    },
  ],
});