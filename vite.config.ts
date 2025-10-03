import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // 폴더 구조가 잡히면 수정 필요
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
    },
  },
});
