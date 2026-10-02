import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          base: '#141211',
          surface: '#221E1C',
          card: '#25201E',
          glass: 'rgba(37, 32, 30, 0.70)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        mocha: {
          DEFAULT: '#8C5A4C',
          hover: '#9E6756',
          accent: '#D98A5B',
        },
        cream: '#F5EFEA',
        taupe: '#A39890',

        // Legacy compatibility aliases
        ivory: '#141211',
        charcoal: '#F5EFEA',
        clay: '#8C5A4C',
        line: 'rgba(255, 255, 255, 0.08)',
        muted: '#A39890',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-public-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
