import {resolve} from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as packageJson from './package.json';
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    tsconfigPaths(),
    dts({
      include: ['src/components/', 'src/index.d.ts'],
    })
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      formats: ['es'],
      fileName: (format) => `coft-react-components.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
    sourcemap: true,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      }
    }
  }
})
