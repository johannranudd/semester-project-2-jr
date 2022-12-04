/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,mjs}", "./*.html"],
  theme: {
    screens: {
      "3xs": "320px",
      "380xs": "380px",
      "2xs": "420px",
      xs: "480px",
      ...defaultTheme.screens,
    },

    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
      },
      colors: {
        primaryClr: "#06212D",
        secondaryClr: "#EAF6F8",
        thirdClr: "#096076",
        fourthClr: "#515150",
        fifthClr: "#94746F",
        contrastClr: "#DC0A27",
        success: "#5DC60B",
        blackClr: "#000000",
        whiteClr: "#FFFFFF",
        hoverClr: "rgb(50, 50, 50)",
        hoverBlackClr: "rgb(50, 50, 50)",
        hoverWhiteClr: "rgb(200, 200, 200)",
      },
      boxShadow: {
        custom: "rgba(234, 246, 248, .3) 0px -4px 12px;",
        custom2: "rgba(6, 33, 45, .3) 0px 4px 12px;",
        custom3: "rgba(93, 198, 11, 1) 0px 0px 12px;",
      },
      maxWidth: {
        logo: "3rem",
      },
      transitionDuration: {
        custom: "300ms",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(210px, 1fr));",
      },
    },
    fontFamily: {
      header: ["Proza Libre", "sans-serif"],
      paragraph: ["Inter", "sans-serif"],
    },
    fontSize: {
      xs: "0.6rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
