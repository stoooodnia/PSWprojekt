/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlack: "#2d2a32",
        myWhite: "#f7f9f9",
        myGray: "#464f51",
      },
    },
  },
  plugins: [],
};
