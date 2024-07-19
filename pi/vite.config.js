import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@paginainicial': '/src/paginas/paginainicial',
      // Adicione outros aliases conforme necessário
    },
  },
})
