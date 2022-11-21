/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screen: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#06212D",
        secondary: "#EAF6F8",
        third: "#096076",
        fourth: "#515150",
        fifth: "#94746F",
        contrast: "#DC0A27",
        black: "#000000",
        white: "#FFFFFF",
        "box-shadow-1":
          "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        "box-shadow-2": "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        "box-shadow-3": "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      },
    },
  },
  plugins: [],
};
