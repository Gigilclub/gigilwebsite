import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // GIGIL Design System Colors
        'gigil-cream': '#F9F5F0',      // Primary BG
        'gigil-off-white': '#FAFAF8',   // Secondary BG
        'gigil-teal': '#005F56',        // Text Primary
        'gigil-peach': '#FFCAB0',       // Accent
        'gigil-border': '#E8E3DC',      // Border
        'gigil-dark': '#2D2D2D',        // Dark Text
        'gigil-white': '#FFFFFF',       // Light Text
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1-mobile': ['48px', { lineHeight: '1.05', fontWeight: '600' }],
        'h1-desktop': ['64px', { lineHeight: '1.05', fontWeight: '600' }],
        'h2-mobile': ['36px', { lineHeight: '1.1', fontWeight: '600' }],
        'h2-desktop': ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        'h3-mobile': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3-desktop': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        'gigil-sm': '0 1px 2px rgba(0,0,0,0.05)',
        'gigil-md': '0 4px 6px rgba(0,0,0,0.07)',
        'gigil-lg': '0 10px 15px rgba(0,0,0,0.08)',
        'gigil-xl': '0 20px 25px rgba(0,0,0,0.09)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-delayed': 'fadeInUp 0.6s ease-out 0.1s both',
        'hover-lift': 'hoverLift 0.3s ease-in-out',
      },
      scale: {
        '102': '1.02',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
      screens: {
        'tablet': '768px',
        'desktop': '1024px',
        'large': '1280px',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;

