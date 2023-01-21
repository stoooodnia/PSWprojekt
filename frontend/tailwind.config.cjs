/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'black': "#2d2a32",
        'white': "#f7f9f9",
        'gray': "#464f51",
      },
      backgroundImage: {
        'spy': "url('./src/assets/images/spy.jpg')",
      },
    },
  },
  plugins: [],
};
