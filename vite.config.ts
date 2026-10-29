import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The CV button activates automatically once the real PDF exists at
// public/Loganathan_Yathavan_CV.pdf. Until then the site shows an honest
// "CV on request" action instead of linking to a file that does not exist.
const CV_FILENAME = 'Loganathan_Yathavan_CV.pdf'
const cvAvailable = existsSync(resolve(__dirname, 'public', CV_FILENAME))

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  define: {
    __CV_AVAILABLE__: JSON.stringify(cvAvailable),
    __CV_FILENAME__: JSON.stringify(CV_FILENAME),
  },
})
