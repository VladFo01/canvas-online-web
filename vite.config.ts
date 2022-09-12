import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })],
    envDir: 'env',
    server: {
      port: 4545
    }
  }
})
