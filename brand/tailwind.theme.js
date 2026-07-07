/** @type {import('tailwindcss').Config} */
module.exports = {
  // BAZ — BlackSwan Monochrome Design System (Violet Seed: --seed-hue: 270)
  // Fibonacci × Da Vinci × Material 3
  // Change --seed-hue to rebrand the entire cascade
  // Tailwind v3 Theme Extension

  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────
      colors: {
        // Brand neutrals
        ink: {
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          800: '#1a1a1a',
          900: '#0e0e0e',
        },
        paper: {
          DEFAULT: '#f5f1ea',
          50: '#faf7f1',
          100: '#f0ebe0',
          200: '#e0d8cc',
          300: '#c9bfb0',
        },

        // Violet accent (BlackSwan monochrome — seed-hue: 41)
        accent: {
          DEFAULT: 'hsl(0, 0% 72%, 52%)',
          50: 'hsl(0, 0% 72%, 97%)',
          100: 'hsl(0, 0% 72%, 93%)',
          200: 'hsl(0, 0% 72%, 82%)',
          300: 'hsl(0, 0% 72%, 72%)',
          400: 'hsl(0, 0% 72%, 62%)',
          500: 'hsl(0, 0% 72%, 52%)',
          600: 'hsl(0, 0% 72%, 42%)',
          700: 'hsl(0, 0% 72%, 32%)',
          800: 'hsl(0, 0% 72%, 22%)',
          900: 'hsl(0, 0% 72%, 12%)',
          violet: '#646464',
          red: '#8a8a8a',
        },

        // Violet monochrome spectrum (seed-hue: 41)
        violet: {
          50: 'hsl(0, 0% 72%, 97%)',
          100: 'hsl(0, 0% 72%, 93%)',
          200: 'hsl(0, 0% 72%, 82%)',
          300: 'hsl(0, 0% 72%, 72%)',
          400: 'hsl(0, 0% 72%, 62%)',
          500: 'hsl(0, 0% 72%, 52%)',
          600: 'hsl(0, 0% 72%, 42%)',
          700: 'hsl(0, 0% 72%, 32%)',
          800: 'hsl(0, 0% 72%, 22%)',
          900: 'hsl(0, 0% 72%, 12%)',
        },

        // Semantic
        success: 'hsl(152, 68%, 38%)',
        warning: 'hsl(38, 92%, 45%)',
        danger: 'hsl(0, 78%, 50%)',
      },

      // ── Fonts ───────────────────────────────────────────────
      fontFamily: {
        display: ['Fraunces', 'Iowan Old Style', 'Noto Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'ui-monospace', 'monospace'],
      },

      // ── Font Sizes (Major Third 1.25 scale) ────────────────
      fontSize: {
        '2xs': ['0.512rem', { lineHeight: '1.2' }],
        'xs': ['0.64rem', { lineHeight: '1.4' }],
        'sm': ['0.8rem', { lineHeight: '1.55' }],
        'base': ['1rem', { lineHeight: '1.55' }],
        'md': ['1.25rem', { lineHeight: '1.3' }],
        'lg': ['1.563rem', { lineHeight: '1.3' }],
        'xl': ['1.953rem', { lineHeight: '1.15' }],
        '2xl': ['2.441rem', { lineHeight: '1.15' }],
        '3xl': ['3.052rem', { lineHeight: '1.1' }],
        '4xl': ['3.815rem', { lineHeight: '1.1' }],
        'display-m': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-l': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },

      // ── Spacing (8pt rhythm) ─────────────────────────────────
      spacing: {
        'px': '0.0625rem',
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '14': '3.5rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '44': '11rem',
        '52': '13rem',
        '60': '15rem',
      },

      // ── Border Radius (Fibonacci + BlackSwan) ───────────────────
      borderRadius: {
        'fib3': '3px',
        'fib5': '5px',
        'fib8': '8px',
        'fib13': '13px',
        'fib21': '21px',
        'fib34': '34px',
        'fib55': '55px',
        'fib89': '89px',
      },

      // ── Box Shadows ────────────────────────────────────────
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'lift': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        'xs': '0 1px 2px 0 rgba(0,0,0,0.03)',
        'sm': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        'lg': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        'xl': '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.04)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.16)',
        'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
      },

      // ── Animations & Keyframes ──────────────────────────────
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.25s ease-out forwards',
        'slide-out': 'slideOut 0.2s ease-in forwards',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'spin': 'spin 0.6s linear infinite',
      },

      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-10px) scale(0.98)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      // ── Transition Timing ───────────────────────────────────
      transitionTimingFunction: {
        'baz-default': 'cubic-bezier(0.2, 0, 0, 1)',
        'baz-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'baz-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'baz-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'baz-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },

      // ── Container ──────────────────────────────────────────
      containers: {
        sm: '36rem',
        md: '48rem',
        lg: '60rem',
        xl: '72rem',
        '2xl': '84rem',
      },

      // ── Z-Index ────────────────────────────────────────────
      zIndex: {
        'below': '-1',
        'base': '0',
        'above': '1',
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'popover': '500',
        'toast': '600',
      },

      // ── Letter Spacing ──────────────────────────────────────
      letterSpacing: {
        'baz-tighter': '-0.04em',
        'baz-tight': '-0.02em',
        'baz-normal': '0',
        'baz-wide': '0.03em',
        'baz-wider': '0.06em',
        'baz-widest': '0.1em',
        'baz-eyebrow': '0.18em',
      },

      // ── Max Width ──────────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'hero': '64rem',
        'prose-sm': '40rem',
        'prose': '48rem',
        'prose-lg': '56rem',
      },
    },
  },

  plugins: [],
}