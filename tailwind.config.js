/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/img/bg.jpg')"
      },
      colors: {
        blue_dark:'#003366',
        blue_light: '#66b2ff',
        green: '#2ecc71',
        red_light: '#D88484',
        gray: '#4f4f4f',
        perl: '#f2f2f2',
        orange: '#ffa07a'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily:{
        'sans': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}