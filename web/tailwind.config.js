/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        heading: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        body: ['"Mulish"', "system-ui", "sans-serif"],
        serif: ['"Droid Serif"', "Georgia", "serif"],
      },
      colors: {
        brand: {
          blue: "#0d4866",
          orange: "#f77f00",
          yellow: "#fcbf49",
          light: "#f4f4f4",
          dark: "#272727",
        },
      },
    },
  },
  plugins: [],
};