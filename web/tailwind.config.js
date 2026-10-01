/** @type {import('tailwindcss').Config} */
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: withAlpha("--brand"),
          light: withAlpha("--brand-light"),
          dark: withAlpha("--brand-dark"),
          darker: withAlpha("--brand-darker"),
        },
        canvas: withAlpha("--canvas"),
        paper: withAlpha("--paper"),
        shell: {
          DEFAULT: withAlpha("--shell"),
          dark: withAlpha("--shell-dark"),
        },
        espresso: withAlpha("--espresso"),
        stone: withAlpha("--stone"),
        dust: withAlpha("--dust"),
        fog: withAlpha("--fog"),
        ash: withAlpha("--ash"),
        muted: withAlpha("--muted"),
        status: {
          todo: withAlpha("--status-todo"),
          doing: withAlpha("--status-doing"),
          done: withAlpha("--status-done"),
          "todo-dot": withAlpha("--status-todo-dot"),
          "doing-dot": withAlpha("--status-doing-dot"),
          "done-dot": withAlpha("--status-done-dot"),
        },
        bug: {
          DEFAULT: withAlpha("--bug"),
          bg: withAlpha("--bug-bg"),
          "bg-hover": withAlpha("--bug-bg-hover"),
        },
        impro: {
          DEFAULT: withAlpha("--impro"),
          bg: withAlpha("--impro-bg"),
          "bg-hover": withAlpha("--impro-bg-hover"),
        },
        feature: {
          green: withAlpha("--feature-green"),
          blue: withAlpha("--feature-blue"),
          orange: withAlpha("--feature-orange"),
        },
      },
      fontFamily: {
        lora: ["Lora", "serif"],
      },
      fontSize: {
        nano: ["9px", { lineHeight: "1" }],
        micro: ["10px", { lineHeight: "1" }],
        caption: ["11px", { lineHeight: "1.4" }],
        fine: ["13px", { lineHeight: "1.55" }],
        cta: ["15px", { lineHeight: "1.6" }],
        logo: ["21px", { lineHeight: "1" }],
        subhead: ["22px", { lineHeight: "1.3" }],
        section: ["26px", { lineHeight: "1.3" }],
        pane: ["28px", { lineHeight: "1.3" }],
        hero: ["58px", { lineHeight: "1.12" }],
      },
      spacing: {
        2.25: "9px",
        2.75: "11px",
        3.25: "13px",
        3.75: "15px",
        4.5: "18px",
        5.5: "22px",
        120: "480px",
      },
      borderRadius: {
        item: "9px",
        input: "10px",
        tab: "11px",
        task: "13px",
        project: "15px",
        card: "20px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,.1)",
        widget: "0 1px 5px rgba(0,0,0,.05)",
        task: "0 1px 4px rgba(0,0,0,.05)",
        "task-hover": "0 5px 14px rgba(0,0,0,.09)",
        "card-hover": "0 6px 18px rgba(0,0,0,.09)",
        panel: "-6px 0 32px rgba(0,0,0,.12)",
        "panel-right": "6px 0 32px rgba(0,0,0,.12)",
        drawer: "-8px 0 40px rgba(0,0,0,.16)",
        tab: "0 1px 4px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
