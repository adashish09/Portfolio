/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080808',
          secondary: '#111111',
          elevated: '#171717',
          surface: '#1c1c1c',
        },
        accent: {
          DEFAULT: '#E87524',
          hover: '#d46519',
          amber: '#F5A14B',
          glow: 'rgba(232, 117, 36, 0.15)',
        },
        content: {
          primary: '#F5F5F5',
          secondary: '#A1A1A1',
          muted: '#737373',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cinematic-glow': '0 0 50px -10px rgba(232, 117, 36, 0.25)',
        'cinematic-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'cinematic-subtle': '0 0 25px rgba(232, 117, 36, 0.08)',
      },
      backgroundImage: {
        'radial-gradient-hero': 'radial-gradient(circle at 50% 0%, rgba(232, 117, 36, 0.12) 0%, rgba(8, 8, 8, 0) 70%)',
        'radial-gradient-amber': 'radial-gradient(circle at 80% 20%, rgba(245, 161, 75, 0.08) 0%, rgba(8, 8, 8, 0) 60%)',
      },
    },
  },
  plugins: [],
}

