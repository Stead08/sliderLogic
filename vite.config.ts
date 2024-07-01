/// <reference types="vitest" />
import { defineConfig} from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'sliderLogic',
      fileName: (format) => `sliderLogic.${format}.js`
    }
  },
  test: {
    includeSource: ['src/**/*.ts']
  },
  define: {
    'import.meta.vitest': 'undefined'
  }
})