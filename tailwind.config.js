/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-login': "url('./src/assets/auth/bg-login.png')",
      },
       fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'], 
      },
        rotate: {
        'y-180': '180deg',
      },
    },
  },
  plugins: [],
}