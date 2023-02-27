/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        exs: '14px'
      },
      fontFamily: {
        Chakra: ['Chakra Petch'],
      },
      animation: {
        shine: "shine 1s",
        enter: 'enter 0.1s ease-out',
        rotate: 'rotate 2s infinite linear',
        fadeIn: 'fadeIn 0.1s ease-out',
      },
      keyframes: {
        shine: {
          "100%": { left: "25%" },
        },
        enter: {
          "0%": {
            transform: "scale(0.9)",
            opacity: 0,
          },

          "100%": {
            transform: "scale(1)",
            opacity: 1,
          }
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },

          "100%": {
            transform: "rotate(360deg)",
          }
        },
        fadeIn: {
          "0%": {
            scale: 0.8,
            opacity: 0
          },

          "100%": {
            opacity: 1,
          }
        },
      },
      colors: {
        blue: {
          450: '#0F172A',
        },
        gray: {
          1000: '#242424',
        },
        "dark-charcoal": "#313131",
        "tangerine-yellow": "#37AB45",
        "granite-gray": "#666666",
        "smoky-black": "#BBC7F9",
        "raisin-black": "#F2F2FC",
        "plochere": "#D5351E",
        "pineapple": "#554609"
      },
      boxShadow: {
        '4xl': 'rgb(255, 255, 255, 0.5) 0px 0px 3px 3px',
      }
    },
  },
  plugins: [],
}