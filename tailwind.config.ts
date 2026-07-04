import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,mdx}'],
  darkMode: ['selector', '.dark'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2rem' },
      screens: { '2xl': '86rem' },
    },
    extend: {
      colors: {
        // Æther Design System — BlackSwan seed hue 270 (violet)
        ink: '#111111',
        panel: '#1A1A1A',
        'panel-2': '#2C2C2C',
        sand: '#E8E4E0',
        stone: '#B0AAA5',
        brand: '#b87adb',
        'brand-2': '#c9a3e5',
        // Semantic tokens for shadcn compatibility
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)' },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        // Hero H1
        'hero': ['clamp(1.9rem, 9vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        // Section H2
        'section': ['clamp(1.35rem, 5.3vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        // Fibonacci px scale (legacy compat)
        'fib-micro': ['8px', { lineHeight: '13px' }],
        'fib-tiny': ['10px', { lineHeight: '16px' }],
        'fib-xs': ['13px', { lineHeight: '21px' }],
        'fib-sm': ['16px', { lineHeight: '26px' }],
        'fib-base': ['21px', { lineHeight: '34px' }],
        'fib-lg': ['34px', { lineHeight: '55px' }],
        'fib-xl': ['55px', { lineHeight: '89px' }],
        'fib-xxl': ['89px', { lineHeight: '144px' }],
        // Display scale
        'display-2xl': ['clamp(3.5rem, 7vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(2.75rem, 5.5vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2.1rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm, 0.25rem)',
        DEFAULT: 'var(--radius-md, 0.5rem)',
        md: 'var(--radius-md, 0.5rem)',
        lg: 'var(--radius-lg, 0.75rem)',
        xl: 'var(--radius-xl, 1rem)',
        '2xl': 'var(--radius-2xl, 1.5rem)',
        '3xl': 'var(--radius-3xl, 2rem)',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.3), 0 8px 21px -8px rgba(0,0,0,0.2)',
        lift: '0 3px 8px rgba(0,0,0,0.3), 0 13px 34px -13px rgba(0,0,0,0.2)',
        ring: '0 0 0 1px rgba(255,255,255,0.1)',
        glow: '0 5px 21px rgba(242,87,43,0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(.4,0,.2,1) both',
        marquee: 'marquee 32s linear infinite',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;