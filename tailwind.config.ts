import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        zinc: {
          150: "#F4F4F4",
        },
      },
    },
    colors: {
      carbon: "rgba(51, 51, 51, 1)",
    },
  },
  plugins: [],
} satisfies Config;
