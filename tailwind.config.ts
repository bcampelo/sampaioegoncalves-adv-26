import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050A14",
          900: "#0A1220",
          800: "#0D1A30",
          700: "#0F1E3D",
          600: "#152747",
        },
        gold: {
          DEFAULT: "#C9A961",
          light: "#D4AF37",
          soft: "#E8D9A8",
          deep: "#A8863F",
        },
        ink: {
          DEFAULT: "#F5F3EC",
          muted: "rgba(245, 243, 236, 0.66)",
          faint: "rgba(245, 243, 236, 0.40)",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        overline: "0.28em",
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "88rem",
      },
      spacing: {
        section: "clamp(6rem, 12vw, 11rem)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 24px 60px -20px rgba(0, 0, 0, 0.65)",
        "gold-glow": "0 0 0 1px rgba(201, 169, 97, 0.28), 0 18px 50px -18px rgba(201, 169, 97, 0.35)",
        lift: "0 40px 80px -40px rgba(0, 0, 0, 0.8)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "gold-sweep": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(500%)", opacity: "0" },
        },
      },
      animation: {
        "gold-sweep": "gold-sweep 6s linear infinite",
        "marquee-x": "marquee-x 42s linear infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
