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
        "app-dark": "#000",
        "app-light": "#fff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "montserrat-alt": ["Montserrat Alternates", "sans-serif"],
        questrial: ["Questrial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
