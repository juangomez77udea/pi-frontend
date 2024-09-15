/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue_dark:'#003366',
        blue_light: '#66b2ff',
        green: '#2ecc71',
        gray: '#4f4f4f',
        perl: '#f2f2f2',
        orange: '#ffa07a'
      },
      fontFamily:{
        'sans': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}