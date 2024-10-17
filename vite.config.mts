import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// for the jobs node-js only build
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node'
  }
})
