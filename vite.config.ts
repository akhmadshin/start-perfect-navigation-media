import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  esbuild: {
    jsx: 'automatic',
  },
  plugins: [
    tanstackStart(),
    nitro(),
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
  ],
})
