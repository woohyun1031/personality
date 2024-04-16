import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        sway_animation: 'sway 0.3s ease-in-out forwards',
        not_sway_animation: 'not_sway 0.3s ease-in-out forwards',
        purse_animation: 'purse .5s ease-in-out forwards',
        not_purse_animation: 'not_purse .5s ease-in-out forwards',
      },
      keyframes: {
        sway: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(10deg)' },
        },
        not_sway: {
          '0%': { transform: 'rotate(10deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        purse: {
          '0%': { opacity: '0' },
          '10%': { opacity: '.03' },
          '20%': { opacity: '0' },
          '30%': { opacity: '0.03' },
          '40%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        not_purse: {
          '0%': { opacity: '1' },
          '10%': { opacity: '.9' },
          '20%': { opacity: '1' },
          '30%': { opacity: '0.9' },
          '40%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
