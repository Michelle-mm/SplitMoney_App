/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'b-md': '0 6px 2px rgb(0 0 0 / 0.1)',
      },
      fontSize: {
        14: '14px',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '14xl': '14.5rem',
        '16xl': '16rem',
        '17xl': '17rem',
        '19xl': '19rem',
        '20xl': '20rem',
        '25xl': '25rem',
      },
      colors:{
        'org-green': '#80bcbe',
        'BRGRAY': '#606060'
      },
      backgroundColor: {
        'main-bg': '#80bcbe',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      maxWidth: {
        '26x': '26%',
        50: '50%',
        60: '60%',
      },
      height: {
        80: '80px',
        600: '600px',
        85: '85%',
      },
      minHeight: {
        600: '600px',
        700: '700px',
        500: '500px',
        400: '400px',
        300: '300px',
      },
      maxHeight:{
        300: '300px',
        400: '400px',
        600: '600px',
        700: '700px',
      },
      scale: {
        '500': '5',
        '600': '6',
      },
      rotate: {
        '20': '20deg',
      }
    },
  },
  plugins: [],
};