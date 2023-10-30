/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      sofia: ['Sofia Sans Variable', 'sans-serif'],
    },
    colors: {
      'dark1': '#000000',
      'light1': '#ffffff',
      'accent1': '#00c8ff',
    }
  },
  plugins: [],
}

