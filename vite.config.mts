import path from 'node:path'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// for the jobs node-js only build
export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    ssr: true,
    target: 'node20',
    rollupOptions: {
      input: {
        index: path.resolve(import.meta.dirname, 'src/index.ts')
      },
      output: {
        format: 'esm',
        preserveModules: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
})
