/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "surface-tint": "#00e290",
        "outline-variant": "hsl(var(--outline-variant))",
        "on-error": "#690005",
        "surface": "hsl(var(--surface))",
        "secondary-fixed-dim": "#ffb3ae",
        "primary-fixed": "#52ffac",
        "inverse-on-surface": "hsl(var(--inverse-on-surface))",
        "error-container": "#93000a",
        "on-secondary": "#68000b",
        "surface-container-lowest": "hsl(var(--surface-container-lowest))",
        "inverse-surface": "hsl(var(--inverse-surface))",
        "primary-container": "#00ffa3",
        "on-tertiary-fixed-variant": "#564500",
        "on-secondary-fixed": "#410004",
        "tertiary-container": "#ffdd67",
        "on-surface-variant": "hsl(var(--on-surface-variant))",
        "surface-container-high": "hsl(var(--surface-container-high))",
        "surface-bright": "hsl(var(--surface-bright))",
        "on-tertiary-fixed": "#231b00",
        "tertiary-fixed": "#ffe17b",
        "on-tertiary": "#3b2f00",
        "on-secondary-fixed-variant": "#930014",
        "on-primary-container": "#007146",
        "on-secondary-container": "#ffb3ad",
        "surface-container-highest": "hsl(var(--surface-container-highest))",
        "on-tertiary-container": "#766000",
        "secondary-container": "#a90219",
        "surface-variant": "hsl(var(--surface-container-highest))",
        "inverse-primary": "#006d43",
        "on-surface": "hsl(var(--on-surface))",
        "primary-fixed-dim": "#00e290",
        "outline": "hsl(var(--outline))",
        "secondary-fixed": "#ffdad7",
        "on-primary-fixed-variant": "#005231",
        "on-error-container": "#ffdad6",
        "surface-container": "hsl(var(--surface-container))",
        "surface-container-low": "hsl(var(--surface-container-low))",
        "surface-dim": "hsl(var(--surface))",
        "tertiary-fixed-dim": "#e4c451",
        "on-primary": "#003920",
        "on-primary-fixed": "#002111"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseRealTime: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" }
        },
        ambientFloat: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5%, 5%) scale(1.1)" },
          "100%": { transform: "translate(-5%, 2%) scale(1)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-slow": "pulseRealTime 3s infinite",
        "shimmer": "shimmer 4s infinite linear",
        "ambient-float": "ambientFloat 20s infinite alternate"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}