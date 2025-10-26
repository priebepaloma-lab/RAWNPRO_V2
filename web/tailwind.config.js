/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rawn: {
          bg: {
            base: "#0A0A0A",
            "gradient-from": "#030303",
            "gradient-to": "#101010",
            surface: "rgba(255,255,255,0.04)",
            user: "#111415",
          },
          text: {
            primary: "#EAF8F5",
            secondary: "#BFECE1",
            muted: "#9ECFBE",
          },
          accent: {
            neon: "#00FF9C",
            lime: "#B2F542",
          },
          border: {
            neon: "rgba(0,255,156,0.5)",
            panel: "rgba(0,255,156,0.15)",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "14px",
        lg: "18px",
        xl: "24px",
        pill: "999px",
      },
      boxShadow: {
        "neon-soft": "0 0 20px rgba(0,255,156,0.10)",
        "neon-glow": "0 0 12px rgba(0,255,156,0.50)",
        "neon-focus": "0 0 8px rgba(0,255,156,0.30)",
      },
      backdropBlur: {
        panel: "12px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            p: {
              marginTop: "0.75em",
              marginBottom: "0.75em",
              lineHeight: "1.6",
            },
            "h1, h2, h3, h4": {
              color: "inherit",
              fontWeight: "600",
              marginTop: "1.25em",
              marginBottom: "0.5em",
              lineHeight: "1.3",
            },
            h1: { fontSize: "1.125rem" },
            h2: { fontSize: "1.0625rem" },
            h3: { fontSize: "1rem" },
            h4: { fontSize: "0.9375rem" },
            "ul, ol": {
              marginTop: "0.5em",
              marginBottom: "0.75em",
              paddingLeft: "1.25em",
            },
            li: {
              marginTop: "0.25em",
              marginBottom: "0.25em",
              lineHeight: "1.5",
            },
            "li > p": {
              marginTop: "0.25em",
              marginBottom: "0.25em",
            },
            strong: {
              fontWeight: "600",
              color: "inherit",
            },
            em: {
              fontStyle: "italic",
              color: "inherit",
            },
            code: {
              color: "inherit",
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "0.25rem",
              padding: "0.125rem 0.375rem",
              fontWeight: "400",
              fontSize: "0.9em",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            a: {
              color: "#00FF9C",
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: "#B2F542",
              },
            },
            blockquote: {
              fontStyle: "italic",
              borderLeftColor: "#d1d5db",
              color: "inherit",
              paddingLeft: "1em",
              marginTop: "1em",
              marginBottom: "1em",
            },
            hr: {
              borderColor: "#e5e7eb",
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
