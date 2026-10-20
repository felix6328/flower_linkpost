/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bouquet: {
          burgundy: '#5a0a14',
          wine: '#78101e',
          ruby: '#931525',
          rose: '#e24d68',
          blush: '#f9d5db',
          cream: '#fdfbf7',
          paper: '#efe5d8',
          stem: '#2e4933',
          leaf: '#4a6b47',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'sway-slow': 'sway 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
