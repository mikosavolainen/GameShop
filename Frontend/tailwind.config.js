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
      "wrench-neutral-5": "#303030",
      "wrench-neutral-dark":  "#1C1C1C",
      "wrench-accent-gold":   "#FFD700",
      "wrench-turquoise": "#40E0D0",
      "wrench-coral": "#FF6347",
      "wrench-coral-2": "#C6462F",
      "wrench-purple-1": "#D8BFD8",
      "wrench-purple": "#6A0DAD",
      "wrench-purple-2": "#5E1493"
    },
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        rotate: 'rotate 1s linear infinite',
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      }
    },
  },
  plugins: []
}

