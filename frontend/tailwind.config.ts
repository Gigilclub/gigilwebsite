import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gigil: {
          teal: '#005F56',
          peach: '#FFCCAB'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;

