/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lithos: {
          orange: "#e8702a",
          orangeDark: "#d2611f"
        }
      }
    },
  },
  plugins: [],
}