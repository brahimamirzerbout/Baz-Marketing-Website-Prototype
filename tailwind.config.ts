import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        ink: {
          50: '#f7f7f6',
          100: '#ececea',
          200: '#d6d6d3',
          300: '#b1b1ad',
          400: '#7e7e79',
          500: '#5b5b57',
          600: '#3f3f3c',
          700: '#2a2a28',
          800: '#18181a',
          900: '#0e0e10',
          950: '#070708',
        },
        paper: {
          DEFAULT: '#f5f1ea',
          50: '#fdfcf9',
          100: '#faf7f2',
          200: '#f5f1ea',
          300: '#ece5d8',
          400: '#d9cfbd',
        },
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
        soft: '0 1px 2px rgba(14,14,16,0.04), 0 8px 24px -8px rgba(14,14,16,0.08)',
        lift: '0 4px 8px rgba(14,14,16,0.06), 0 24px 48px -12px rgba(14,14,16,0.18)',
        ring: '0 0 0 1px rgba(14,14,16,0.08)',
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
