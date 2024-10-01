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
    colors: {
      'vw': {
        50: "#4CC7F4",
        500: "#01315F",
      },
      'white': "#FFFFFF",
    },
    extend: {
      fontFamily: {
        VWHead: ['VWHead', 'sans-serif'],
      },
      screens: {
        'tablet': '640px',
        'tablet-lg': '1080px',
      },
    },
  },
  plugins: [animate],
}