import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Override fontSize to remove xs
    fontSize: {
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - 0.5rem))' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(calc(-50% - 0.5rem))' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      colors: {
        // Foster Greatness Brand Colors
        'fg-navy': '#1a2949',        // Primary Navy Blue
        'fg-teal': '#0067a2',        // Primary Teal Blue
        'fg-light-blue': '#ddf3ff',  // Light Blue
        'fg-orange': '#fa8526',      // Accent Orange
        'fg-yellow': '#faca2c',      // Accent Yellow
        'fg-accent-teal': '#00c8b7', // Accent Teal/Blue

        // Holiday colors (keeping for gingerbread theme)
        holiday: {
          red: '#c41e3a',
          green: '#165b33',
          gold: '#ffd700',
        }
      },
    },
  },
  plugins: [],
};

export default config;
