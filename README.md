## Install tailwind

```
npm install -D tailwindcss
```

## Get tailwind.config.js

```
npx tailwindcss init

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

## Create build and watch scripts

```
"scripts": {
    "build": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css"
    "watch": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch"
  }
```

## Create a link to the output.css file

```
<link rel="stylesheet" href="./dist/css/output.css" />
```
