/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#F3EFE6',
        paper: '#F8F6F1',
        ink: '#0F1729',
        sidebar: '#1E2A3A',
        gold: '#C9A84C',
        mutedGold: '#E4D3A1'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif']
      },
      boxShadow: {
        legal: '0 20px 45px rgba(15, 23, 41, 0.12)'
      },
      backgroundImage: {
        parchment:
          'radial-gradient(circle at top left, rgba(201, 168, 76, 0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(15, 23, 41, 0.08), transparent 34%)'
      }
    }
  },
  plugins: []
}
