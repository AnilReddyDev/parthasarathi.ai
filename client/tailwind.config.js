/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        darkIndigo: '#6374f7',    // Overall background
        lightCream: '#FAF3E0',    // Primary text (body text)

        // Accent Colors
        royalGold: '#f7980a',     // Headings & titles
        deepRed: '#8B0000',       // Navigation background
        saffron: '#FF9933',       // Buttons / Call-to-Actions

        // Secondary Elements
        darkGray: '#303030',      // Cards, panels, and content boxes
        almostBlack: '#212121',   // Footer background and button text
        ashGrey: '#B2BEB5',       // Footer accent text
      },
    },
  },
  plugins: [],
}