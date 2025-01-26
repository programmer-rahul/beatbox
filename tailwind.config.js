const colors = require("./src/constants/colors.js");

module.exports = {
  content: [],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { ...colors },
    },

    fontFamily: {
      primary_light: ["Primary-Light"],
      primary_regular: ["Primary-Regular"],
      primary_semibold: ["Primary-SemiBold"],
      primary_bold: ["Primary-Bold"],
    },
  },
  plugins: [],
};
