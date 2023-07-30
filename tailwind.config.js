/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d14ff4",
        secondary: "#ce00b9",
        accent: "#6539d5",
        neutral: "#17051c",
        foreground: "#f0f0f0",
      },
    },
  },
  plugins: [],
}
