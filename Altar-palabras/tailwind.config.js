import { defineConfig } from '@tailwindcss/postcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#6A0572',
        accent: '#FFC300',
        background: '#1A1A2E',
        text: '#FFFFFF',
        textSecondary: '#F0F0F0',
      },
      fontFamily: {
        'title': ['Creepster', 'cursive'],
        'body': ['Lora', 'serif'],
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
})