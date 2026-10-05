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
        indigo: '#4F46E5',
        'indigo-dark': '#4338CA',
        ink: '#0F172A',
        muted: '#64748B',
        surface: '#F7F8FA',
        border: '#EAECF0',
        green: '#16A34A',
        amber: '#D97706',
        red: '#DC2626',
        'indigo-50': '#EEF2FF',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'elevation-2': '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'elevation-3': '0 10px 24px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
