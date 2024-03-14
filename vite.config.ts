import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

const cdn = (path: string) => `https://cdn.jsdelivr.net/npm/${path}`;

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), splitVendorChunkPlugin()],
  esbuild: {
    pure: ["console.log"],
  },
  build: {
    minify: true,
    rollupOptions: {
      treeshake: true,
      external: ["frontmatter", "markdown-it", "markdown-it-emoji"],
      output: {
        paths: {
          "markdown-it": cdn("markdown-it@latest/dist/markdown-it.min.js/+esm"),
        },
      },
    },
  },
});
