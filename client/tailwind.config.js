/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
    content: [
      "./index.html",
      "./src/**",
    ],
    theme: {
      extend: {
        fontFamily:{
          k2d:['"K2D"', ...defaultTheme.fontFamily.sans]
        }
        
      },
    },
    plugins: [],
  }