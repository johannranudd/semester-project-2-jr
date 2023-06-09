## Getting Started

### Installing


1. Clone the repo:

```bash
git clone https://github.com/johannranudd/semester-project-2-jr.git
```

2. Install the dependencies:

```
npm install
```


## Running


To run the app, run the following commands:

```bash
npm run start
```



## tailwind.config.js

```
My tailwind configs

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
        danger: "#F16A6A",
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
        custom4: "rgba(0, 0, 0, .5) 0px -1px 8px;",
        custom5: "rgba(250, 250, 250, .5) 0px -1px 8px;",
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


```

## Create build and watch scripts in package.json

```
"scripts": {
    "build": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css"
    "watch": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch"
  }

- run `npm run watch` to watch for changes in tailwind
```

## Create a link to the output.css file

```
<link rel="stylesheet" href="./dist/css/output.css" />
```

## package.json

```
{
  "name": "semester-project-2-jr",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css",
    "watch": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch & live-server"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/johannranudd/semester-project-2-jr.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/johannranudd/semester-project-2-jr/issues"
  },
  "homepage": "https://github.com/johannranudd/semester-project-2-jr#readme",
  "devDependencies": {
    "tailwindcss": "^3.2.4"
  }
}

```
