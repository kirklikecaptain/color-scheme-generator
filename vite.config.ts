import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  plugins: [react()],
});
