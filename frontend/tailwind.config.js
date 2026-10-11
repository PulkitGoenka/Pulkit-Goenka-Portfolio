/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Caveat Brush"', 'cursive'],
        sans: ['Outfit', 'sans-serif']
      },
      colors: {
        neon: {
          green: '#39FF14',
          pink: '#FF00FF',
          cyan: '#00FFFF',
          purple: '#BF00FF',
          yellow: '#FFE600'
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
