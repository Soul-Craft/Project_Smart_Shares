import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// The soulcraft account's dev-server ports (3100-3149), never Vite's defaults.
export default defineConfig({
  plugins: [react()],
  server: { port: 3110, strictPort: true },
  preview: { port: 3111, strictPort: true },
  // firebase.json serves build/, where create-react-app used to put the bundle.
  build: { outDir: 'build' },
  test: { environment: 'jsdom' }
})
