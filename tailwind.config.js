const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],
  
  theme: {
 
    extend: {
      fontFamily: {
        'vw': ['VWHead', 'sans-serif'],
      },
      colors: {
        'vw': {
          'light': "#4CC7F4",
          'dark': "#01315F",
        },
        'white': "#FFFFFF",
      },
    },
  },
  plugins: [animate],
}