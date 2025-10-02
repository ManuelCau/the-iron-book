import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/the-iron-book/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/Tests/testsSetup.ts",
  },
});
