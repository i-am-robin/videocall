/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      prymary: "#0084FF",
      "grey-300": "#3A3B3C",
      "black-dark": "#131313",
      "red-prymary": "#FF3B32",
      "white-prymary": "#FEFEFD",
      transparent: "#00000",
      "text-prymary": "#FEFBFE",
      "text-secondary": "#DBD8CF",
      "grey-400": "#57606F",
    },
  },
  plugins: [],
};
