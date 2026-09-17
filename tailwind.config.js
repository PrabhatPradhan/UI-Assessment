/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // brand blue is only used for selected + focus states
        brand: {
          50: "#EEF2FD",
          100: "#DCE4FB",
          500: "#3358D4",
          600: "#2848B8",
          700: "#203A94",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
