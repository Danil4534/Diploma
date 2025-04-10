import { transform } from 'lodash';
import { keyframes } from 'motion';

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
          k2d:['K2D', ...defaultTheme.fontFamily.sans]
        },
        keyframes:{
          fadeIn:{
            '0%':{
              transform: 'scale(0)'
            },
            '100%':{
              transform: 'scale(1)'
            }
          },
          fadeInOpacity:{
          '0%':{
              opacity: 0,
              transform: 'translateY(100px)'
            },
            '100%':{
              transform: 'translateY(0)',
              opacity: 1
            }
          },
          rightIn:{
            '0%':{
              opacity:0,
              transform: 'translateX(500px)'
            },
            '100%':{
              opacity:1,
              transform: 'translateX(0)'
            }
          },
          bottomIn:{
            '0%':{
              opacity:0,
              transform: 'translateY(500px)'
            },
            '100%':{
              opacity:1,
              transform: 'translateY(0)'
            }
          },
          rotate:{
            '0%':{
              opacity:0,
              transform: 'rotate(0deg) scale(0)'
            },
            '100%':{
              opacity:1,
              transform: 'rotate(360deg) scale(1)'
            }
          },
          rotateHomePage:{
            '0%':{
              opacity:1,
              transform: 'rotate(0deg) scale(100)'
            },
            '100%':{
              opacity:1,
              transform: 'rotate(360deg) scale(1)'
            }
          },
          fadeOut: {
            '0%': { opacity: 1 },
            '100%': { transform: "translateY(-500px)" }
          },
        },
        animation:{
          fadeIn: 'fadeIn 0.8s ease-in-out',
          fadeInOpacity:'fadeInOpacity 3s linear',
          rightIn: 'rightIn 0.8s ease-in-out',
          rotateHomePage: 'rotateHomePage 0.8s ease-in-out',
          rotate: 'rotate 0.8s ease-in-out',
          bottomIn: 'bottomIn 3s ease-in',
          fadeOut: 'fadeOut 0.5s ease-in-out forwards',
          bottomInWithDelay: 'bottomIn 3s ease-in'
        }
        
      },
    },
    plugins: [],
  }