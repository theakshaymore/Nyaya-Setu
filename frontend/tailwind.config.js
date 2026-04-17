/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-inverse': 'var(--color-text-inverse)',
        'surface-base': 'var(--color-surface-base)',
        'surface-muted': 'var(--color-surface-muted)',
        'surface-raised': 'var(--color-surface-raised)',
        'surface-strong': 'var(--color-surface-strong)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-strong': 'var(--color-border-strong)',
        'focus-ring': 'var(--color-focus-ring)',
        'bg-canvas': 'var(--color-bg-canvas)',
        'state-error': 'var(--color-state-error)',
        'state-error-surface': 'var(--color-state-error-surface)',
        gold: 'var(--color-surface-raised)',
        ink: 'var(--color-text-primary)',
        paper: 'var(--color-surface-muted)',
        sidebar: 'var(--color-surface-muted)',
        shell: 'var(--color-bg-canvas)'
      },
      fontFamily: {
        display: ['"Work Sans"', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif']
      },
      boxShadow: {
        legal:
          'rgba(0, 0, 0, 0.08) 0px 1px 2px -0.5px, rgba(0, 0, 0, 0.12) 0px -0.5px 0px 0px inset'
      }
    }
  },
  plugins: []
}
