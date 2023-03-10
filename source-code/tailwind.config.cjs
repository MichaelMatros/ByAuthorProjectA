/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/**.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: "600px",
        desktop: "1200px",
      },
      colors: {
        "app-dark": {
          DEFAULT: "#000",
          "header-2": "#343434",
        },
        "app-light": "#fff",
        accent: "#a5a5a5",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "montserrat-alt": ["Montserrat Alternates", "sans-serif"],
        questrial: ["Questrial", "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
    },
  },
  plugins: [],
};
