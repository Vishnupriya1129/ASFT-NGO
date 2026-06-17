import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Nature Theme — Preserved Exactly ───────────────
        'soil-dark':    '#3E2723',
        'soil-mid':     '#5D4037',
        'soil-light':   '#8D6E63',
        'earth-warm':   '#A1887F',
        'earth-cream':  '#EFEBE9',
        'forest-dark':  '#1B5E20',
        'forest-mid':   '#2E7D32',
        'forest-light': '#4CAF50',
        'leaf-bright':  '#66BB6A',
        'leaf-pale':    '#C8E6C9',
        'sun-gold':     '#F9A825',
        'sun-warm':     '#FFCA28',
        'sun-pale':     '#FFF8E1',
        'sky-pale':     '#E8F5E9',
        'cloud':        '#FAFAFA',
        'charcoal':     '#212121',
        'stone':        '#616161',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in-up':      'fadeInUp 0.8s ease forwards',
        'scroll-announce': 'scrollAnnouncements 35s linear infinite',
        'pulse-slow':      'pulse 3s ease-in-out infinite',
        'count-up':        'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scrollAnnouncements: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        countUp: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #E8F5E9 0%, #C8E6C9 40%, #EFEBE9 100%)',
        'soil-gradient': 'linear-gradient(180deg, #3E2723 0%, #5D4037 100%)',
        'forest-gradient': 'linear-gradient(135deg, #2E7D32, #4CAF50)',
        'gold-gradient': 'linear-gradient(135deg, #F9A825, #FFCA28)',
        'donate-gradient': 'linear-gradient(135deg, #1B5E20 0%, #5D4037 100%)',
      },
      boxShadow: {
        'forest': '0 8px 25px rgba(46, 125, 50, 0.3)',
        'forest-lg': '0 15px 45px rgba(46, 125, 50, 0.15)',
        'gold': '0 8px 25px rgba(249, 168, 37, 0.3)',
        'card': '0 8px 30px rgba(0,0,0,0.06)',
        'card-hover': '0 15px 45px rgba(46, 125, 50, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;