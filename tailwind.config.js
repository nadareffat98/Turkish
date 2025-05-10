/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [],
  theme: {
    extend: {
      colors: {
        "main-color": "var(--main-color)",
        "second-color": "var(--second-color)",
        "border-color": "var(--border-color)",
        "font-color": "var(--font-color)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-30%)" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [],
};
