import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-muted': 'var(--bg-muted)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-faint': 'var(--fg-faint)',
        line: 'var(--line)',
        'line-soft': 'var(--line-soft)',
        accent: 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        display: ['"Geist"', '"Inter"', '-apple-system', 'system-ui', 'sans-serif'],
        body: ['"Inter"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        lg: '18px',
      },
      maxWidth: {
        container: '1320px',
      },
      animation: {
        'pulse': 'pulse 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
        'reveal': 'reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw-arc': 'drawArc 4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards',
        'ball-roll': 'ballRoll 4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards',
        'court-fade': 'courtFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.7' },
        },
        reveal: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'none' },
        },
        drawArc: {
          'to': { strokeDashoffset: '0' },
        },
        ballRoll: {
          '0%': { offsetDistance: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { offsetDistance: '100%', opacity: '1' },
        },
        courtFade: {
          'from': { opacity: '0', transform: 'scale(0.96)' },
          'to': { opacity: '0.18', transform: 'scale(1)' },
        },
      },
      letterSpacing: {
        'wide': '0.04em',
        'wider': '0.08em',
        'widest': '0.16em',
      },
      lineHeight: {
        'tight': '0.92',
      },
    },
  },
  plugins: [],
};
export default config;
