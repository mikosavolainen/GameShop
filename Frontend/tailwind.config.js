/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "wrench-neutral-white": "#ffffff",
      "wrench-neutral-2":     "#878787",
      "wrench-neutral-3":     "#505050",
      "wrench-neutral-4":     "#1F1F1F",
      "wrench-neutral-dark":  "#1C1C1C"
    },
    extend: {},
  },
  plugins: [],
}

