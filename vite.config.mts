import path from 'path'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// for the jobs node-js only build
export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    sourcemap: true,
    ssr: false,
    target: 'node20',
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: name => name.includes('node:')
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
})
