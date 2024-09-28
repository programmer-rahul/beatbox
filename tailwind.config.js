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
        primary_light: ["Primary_Light", "Sans-Serif"],
        primary_regular: ["Primary_Regular", "Sans-Serif"],
        primary_semibold: ["Primary_SemiBold", "Sans-Serif"],
        primary_bold: ["Primary_Bold", "Sans-Serif"],
      },
    },
  },
  plugins: [],
};
