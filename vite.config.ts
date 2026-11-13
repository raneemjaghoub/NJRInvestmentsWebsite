import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { contactApi } from './server/contact.ts'

export default defineConfig({plugins: [react(), tailwindcss(), contactApi()]})
