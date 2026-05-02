/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          cream: '#F5F5F0',
          gold: '#C6A43F',
          charcoal: '#1A1A1A',
          dove: '#666666',
        },
      },
    },
  },
  plugins: [],
}