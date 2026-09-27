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
        ivory: '#F7F3ED',
        charcoal: '#211D1A',
        clay: '#C46A3F',     // default accent; real accent is runtime-dynamic
        olive: '#5C6B4F',    // success / "live" / available
        gold: '#E8A93B',     // pending / trial state
        sky: '#4C7A8C',      // info / focus ring
        line: 'rgba(33,29,26,0.12)',
        muted: '#8A8177',
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
