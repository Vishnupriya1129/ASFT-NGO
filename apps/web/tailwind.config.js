/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Modern teal/turquoise
        'primary': {
          50: '#F0F9FB',
          100: '#E0F2F7',
          200: '#B3E5FC',
          300: '#81D4FA',
          400: '#4FC3F7',
          500: '#29B6F6',
          600: '#039BE5',
          700: '#0288D1',
          800: '#0277BD',
          900: '#01579B',
        },
        // Accent - Warm coral/orange
        'accent': {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#F57C00',
          700: '#E65100',
          800: '#BF360C',
        },
        // Neutral grays
        'slate': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Legacy colors (for backward compatibility)
        'soil-dark': '#1E293B',
        'soil-mid': '#334155',
        'soil-light': '#64748B',
        'earth-warm': '#94A3B8',
        'earth-cream': '#F1F5F9',
        'forest-dark': '#0277BD',
        'forest-mid': '#029BE5',
        'forest-light': '#4FC3F7',
        'leaf-bright': '#81D4FA',
        'leaf-pale': '#E0F2F7',
        'sun-gold': '#FF9800',
        'sun-warm': '#FFA726',
        'sun-pale': '#FFF3E0',
        'sky-pale': '#F0F9FB',
        cloud: '#F8FAFC',
        charcoal: '#1E293B',
        stone: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'scroll-announce': 'scrollAnnouncements 35s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollAnnouncements: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        countUp: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #F0F9FB 0%, #E0F2F7 50%, #FFF3E0 100%)',
        'soil-gradient': 'linear-gradient(180deg, #1E293B 0%, #334155 100%)',
        'forest-gradient': 'linear-gradient(135deg, #0277BD, #4FC3F7)',
        'gold-gradient': 'linear-gradient(135deg, #FF9800, #FFA726)',
        'donate-gradient': 'linear-gradient(135deg, #0277BD 0%, #334155 100%)',
      },
      boxShadow: {
        forest: '0 8px 25px rgba(2, 119, 189, 0.2)',
        'forest-lg': '0 15px 45px rgba(2, 119, 189, 0.15)',
        gold: '0 8px 25px rgba(255, 152, 0, 0.2)',
        card: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 35px rgba(2, 119, 189, 0.15)',
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
