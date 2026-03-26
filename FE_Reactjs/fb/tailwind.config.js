/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fb: {
          bg: '#18191a',
          card: '#242526',
          hover: '#3a3b3c',
          border: '#3e4042',
          text: '#e4e6eb',
          muted: '#b0b3b8',
          blue: '#1877f2',
          'blue-hover': '#166fe5',
          input: '#3a3b3c',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
