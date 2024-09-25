const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],  // 小文字で定義
        zenMaru: ['Zen Maru Gothic', 'sans-serif'],  // 追加
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
