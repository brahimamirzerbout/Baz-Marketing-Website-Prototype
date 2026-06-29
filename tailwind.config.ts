import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,mdx}'],
  darkMode: ['selector', '[data-theme=dark]'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // ink: text colors — invert in dark mode
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          50: 'rgb(var(--c-paper-50) / <alpha-value>)',
          100: 'rgb(var(--c-paper-100) / <alpha-value>)',
          200: 'rgb(var(--c-paper-200) / <alpha-value>)',
          300: 'rgb(var(--c-paper-300) / <alpha-value>)',
          400: 'rgb(var(--c-ink-400) / <alpha-value>)',
          500: 'rgb(var(--c-ink-500) / <alpha-value>)',
          600: 'rgb(var(--c-ink-600) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
          800: 'rgb(var(--c-ink-800) / <alpha-value>)',
          900: 'rgb(var(--c-ink-900) / <alpha-value>)',
          950: 'rgb(var(--c-ink-950) / <alpha-value>)',
        },
        // paper: surface colors — invert in dark mode
        paper: {
          DEFAULT: 'rgb(var(--c-paper) / <alpha-value>)',
          50: 'rgb(var(--c-paper-50) / <alpha-value>)',
          100: 'rgb(var(--c-paper-100) / <alpha-value>)',
          200: 'rgb(var(--c-paper-200) / <alpha-value>)',
          300: 'rgb(var(--c-paper-300) / <alpha-value>)',
          400: 'rgb(var(--c-paper-400) / <alpha-value>)',
        },
        // Accent stays the same in both modes
        accent: {
          DEFAULT: '#ff3b2f',
          600: '#e0281c',
          700: '#b81f15',
        },
        success: '#3ddc97',
        warning: '#ffb020',
        info: '#4f7cff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(2.75rem, 5.5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem', '3xl': '1.75rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.08)',
        lift: '0 4px 8px rgba(0,0,0,0.06), 0 24px 48px -12px rgba(0,0,0,0.18)',
        ring: '0 0 0 1px rgba(0,0,0,0.08)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(.2,.7,.2,1) both',
        marquee: 'marquee 28s linear infinite',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;