/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#222831",
        secondary: "#393E46",
        tertiary: "#00ADB5",
        white: "#EEEEEE",
        blue: "#beebe9",
        yellow: "#f6f5ae",
        red: "#ffaaa5",
        orgwan: "#c7ceea",
      },
      backgroundColor: {
        dark: "#222831",
        secondary: "#393E46",
        tertiary: "#00ADB5",
        white: "#EEEEEE",
        comp: "#0E46A3",
        blue: "#beebe9",
        yellow: "#f6f5ae",
        red: "#ffaaa5",
        orgwan: "#c7ceea",
      },
    },
    plugins: [nextui()],
  },
};
