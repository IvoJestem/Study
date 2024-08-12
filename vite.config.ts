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
        home: resolve(__dirname, "src/pages/home/index.html"),
        transferlist: resolve(__dirname, "src/pages/transferlist/index.html"),
        search: resolve(__dirname, "src/pages/search/index.html"),
      },
    },
  },
});
