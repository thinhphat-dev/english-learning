/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
       boxShadow: {
        'even': '0 0 10px rgba(0, 0, 0, 0.3)', 
      },
      backgroundImage: {
        'bg-login': "url('./src/assets/auth/bg-login.png')",
      },
       fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'], 
      },
        rotate: {
        'y-180': '180deg',
      },
      colors: {
        'c-main-color': '#2F54EB',          
        'c-sec-color': '#0b1b5d',  
        'c-third-color': '#7386d4',          
        'c-card-front-color': '#bfdbfe ',          
        'c-light-gray-color': '#F3F4F6',      
        'c-main-light-color': '#d0dbff',
      },
    },
  },
  plugins: [],
}