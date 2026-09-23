/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          blurple: '#5865F2',
          dark: '#36393f',
          darker: '#2f3136',
          darkest: '#202225'
        }
      }
    },
  },
  plugins: [],
}
