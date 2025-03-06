const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./mdx-components.tsx",
    "content/**/*.mdx",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-calsans)"],
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 1s cubic-bezier(0.34, 1.56, 0.64, 1)", // Springy overshoot
        "title": "title 1.5s cubic-bezier(0.25, 1, 0.5, 1)", // Slower, pronounced spring
        "fade-left": "fadeLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bounce from left
        "fade-right": "fadeRight 1s cubic-bezier(0.34, 1.56, 0.64, 1)", // Bounce from right
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" }, // Subtle drop-in
          "60%": { opacity: "1", transform: "translateY(-5px)" }, // Overshoot
          "100%": { opacity: "1", transform: "translateY(0)" }, // Settle
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" }, // Start further out
          "70%": { opacity: "1", transform: "translateX(-5px)" }, // Bounce past
          "100%": { opacity: "1", transform: "translateX(0)" }, // Settle
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" }, // Start further out
          "70%": { opacity: "1", transform: "translateX(5px)" }, // Bounce past
          "100%": { opacity: "1", transform: "translateX(0)" }, // Settle
        },
        title: {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(20px)", "letter-spacing": "0.2em" }, // Start small and spaced
          "60%": { opacity: "1", transform: "scale(1.05) translateY(-5px)", "letter-spacing": "0.05em" }, // Overshoot
          "100%": { opacity: "1", transform: "scale(1) translateY(0)", "letter-spacing": "normal" }, // Settle
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
  ],
};