export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pawJump: {
          "0%":   { transform: "translateY(0)" },
          "20%":  { transform: "translateY(-18px)" },   /* jump up */
          "40%":  { transform: "translateY(0)" },
          "60%":  { transform: "translateY(-8px)" },    /* small bounce */
          "100%": { transform: "translateY(0)" }
        },
        pawOpen: {
          "0%":   { transform: "scale(1) rotate(0deg)" },
          "20%":  { transform: "scale(1.06) rotate(-6deg)" },
          "40%":  { transform: "scale(1) rotate(0deg)" },
          "60%":  { transform: "scale(1.04) rotate(6deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" }
        }
      },
      animation: {
        pawJump: "pawJump 1.6s cubic-bezier(.2,.9,.2,1) infinite",
        pawOpen: "pawOpen 1.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
}
