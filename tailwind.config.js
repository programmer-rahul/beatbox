const colors = require("./src/constants/colors.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        spacemono: ["SpaceMono", "Sans-Serif"],
      },
    },
  },
  plugins: [],
};
