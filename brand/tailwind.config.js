/** @type {import('tailwindcss').Config} */
// BAZ — Full Tailwind v3 Configuration
// Usage: require('./brand/tailwind.config.js') in your project root

const bazTheme = require('./tailwind.theme.js')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  presets: [bazTheme],

  theme: {
    extend: bazTheme.theme.extend,
  },

  // Dark mode via class strategy (for ink sections)
  darkMode: 'class',

  plugins: [
    // No external plugins — BlackSwan is hand-rolled, not shadcn/ui
    // Add @tailwindcss/typography if prose content is needed
    // require('@tailwindcss/typography'),
  ],

  // Important: false (default) — use component-level specificity
  important: false,

  // Separator: default '-' — no custom separator needed
  separator: '-',
}