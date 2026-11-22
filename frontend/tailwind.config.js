/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#081c15',
          800: '#1b4332',
          700: '#2d6a4f',
          600: '#40916c',
          500: '#52b788',
          400: '#74c69d',
          300: '#95d5b2',
          200: '#b7e4c7',
          100: '#d8f3dc',
        },
        civic: {
          bg: '#f8faf9',
          charcoal: '#1a1d20',
          amber: '#e9c46a',
          slate: '#64748b',
        },
        waste: {
          wet: '#2d6a4f',       // Organic Green
          dry: '#2563eb',       // Recyclable Blue
          sanitary: '#dc2626',  // Sanitary Red
          special: '#ca8a04',   // Special Care Amber/Yellow
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(27, 67, 50, 0.08), 0 8px 10px -6px rgba(27, 67, 50, 0.04)',
      }
    },
  },
  plugins: [],
}

