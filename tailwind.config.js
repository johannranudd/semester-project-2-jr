/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      screen: {
        "2xs": "400px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
        ...defaultTheme.screens,
      },
      colors: {
        primaryClr: "#06212D",
        secondaryClr: "#EAF6F8",
        thirdClr: "#096076",
        fourthClr: "#515150",
        fifthClr: "#94746F",
        contrastClr: "#DC0A27",
        blackClr: "#000000",
        whiteClr: "#FFFFFF",
        hoverClr: "rgb(50, 50, 50)",
        hoverBlackClr: "rgb(50, 50, 50)",
        hoverWhiteClr: "rgb(200, 200, 200)",
        "box-shadow-1":
          "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        "box-shadow-2": "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        "box-shadow-3": "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      },
      maxWidth: {
        logo: "3rem",
      },
    },
    fontFamily: {
      header: ["Proza Libre", "sans-serif"],
      paragraph: ["Inter", "sans-serif"],
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
