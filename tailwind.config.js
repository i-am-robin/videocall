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
      "grey-100": "#1B2730",
      "grey-300": "#28343E",
      "black-dark": "#06141D",
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
