/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Geist"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cream:  '#f8f6f1',
        ink:    '#0a0908',
        'ink-2':'#2c2825',
        'ink-3':'#6b6560',
        'ink-4':'#b5b0aa',
        gold:   '#c8922a',
        'gold-light': '#f5dfa0',
      },
      animation: {
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':   'fadeIn 0.5s ease both',
        'slide-up':  'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        fadeUp:  { from:{ opacity:'0', transform:'translateY(24px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        slideUp: { from:{ opacity:'0', transform:'translateY(40px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
