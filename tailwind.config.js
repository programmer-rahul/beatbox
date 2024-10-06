const colors = require("./src/constants/colors.js")

module.exports = {
  content: [],
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors : {...colors}
    },
  },
  plugins: [],
};
