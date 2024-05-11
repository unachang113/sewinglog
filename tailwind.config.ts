import {type Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'card-list': 'repeat(auto-fill, minmax(240px, 1fr))',
      },
      fontFamily: {
        logo: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
