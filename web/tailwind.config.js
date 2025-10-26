/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
              color: "#059669",
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: "#047857",
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
