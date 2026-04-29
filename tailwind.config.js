/** @type {import('tailwindcss').Config} */
export default {
  // This tells Tailwind to look at your HTML and Vue files for classes
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


