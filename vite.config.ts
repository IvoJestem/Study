import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "src/pages/register/index.html"),
        register: resolve(__dirname, "src/pages/home/index.html"),
        transferlist: resolve(__dirname, "src/pages/transferlist/index.html"),
        search: resolve(__dirname, "src/pages/search/index.html"),
      },
    },
  },
});
