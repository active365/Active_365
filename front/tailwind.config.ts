import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FFD700", // Amarillo energético
          light: "#FFDD33", // Amarillo claro (Hover)
          orange: "#FFA500", // Naranja (Activo)
          muted: "#F4D03F", // Amarillo apagado
        },
        gray: {
          light: "#F5F5F5", // Gris claro
          DEFAULT: "#A9A9A9", // Gris medio
          dark: "#505050", // Gris oscuro
        },
        black: {
          DEFAULT: "#1A1A1A", // Negro elegante
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
