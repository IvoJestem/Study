import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "src/home/index.html"),
        transferlist: resolve(__dirname, "src/transferlist/index.html"),
        search: resolve(__dirname, "src/search/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
      },
    },
  },
});
