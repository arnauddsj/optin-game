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
        50: "#54A1DF",
        500: "#011C3F",
      },
      'white': "#FFFFFF",
    },
    extend: {
      fontFamily: {
        VWHead: ['VWHead', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [animate],
}