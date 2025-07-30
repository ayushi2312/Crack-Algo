/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-purple': '#6C63FF',
        'neon-blue': '#00C6FF',
        'lime-green': '#00E676',
        'gold': '#FFD700',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'ping-slow': 'ping 3s infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(108, 99, 255, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 198, 255, 0.3)',
        'glow-lime': '0 0 20px rgba(0, 230, 118, 0.3)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
      }
    },
  },
  plugins: [],
};