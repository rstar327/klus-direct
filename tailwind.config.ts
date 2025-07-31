import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        klusdirect: {
          orange: "hsl(var(--klusdirect-orange))",
          "orange-dark": "hsl(var(--klusdirect-orange-dark))",
          blue: "hsl(var(--klusdirect-blue))",
          "blue-dark": "hsl(var(--klusdirect-blue-dark))",
          gold: "hsl(var(--klusdirect-gold))",
          "gold-dark": "hsl(var(--klusdirect-gold-dark))",
          premium: {
            900: "hsl(var(--premium-900))",
            800: "hsl(var(--premium-800))",
            700: "hsl(var(--premium-700))",
            600: "hsl(var(--premium-600))",
            500: "hsl(var(--premium-500))",
            400: "hsl(var(--premium-400))",
            300: "hsl(var(--premium-300))",
            200: "hsl(var(--premium-200))",
            100: "hsl(var(--premium-100))",
            50: "hsl(var(--premium-50))",
          },
          gray: {
            50: "hsl(var(--klusdirect-gray-50))",
            100: "hsl(var(--klusdirect-gray-100))",
            200: "hsl(var(--klusdirect-gray-200))",
            300: "hsl(var(--klusdirect-gray-300))",
            400: "hsl(var(--klusdirect-gray-400))",
            500: "hsl(var(--klusdirect-gray-500))",
            600: "hsl(var(--klusdirect-gray-600))",
            700: "hsl(var(--klusdirect-gray-700))",
            800: "hsl(var(--klusdirect-gray-800))",
            900: "hsl(var(--klusdirect-gray-900))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s infinite",
        "glow": "glow 2s infinite alternate",
        "shimmer": "shimmer 3s infinite",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        "glow": {
          "0%": {
            "box-shadow": "0 0 20px rgba(251, 146, 60, 0.5)",
          },
          "100%": {
            "box-shadow": "0 0 30px rgba(251, 146, 60, 0.8), 0 0 40px rgba(59, 130, 246, 0.3)",
          },
        },
        "shimmer": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
    backgroundImage: {
      "premium-gradient": "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
      "gold-gradient": "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #d97706 100%)",
      "shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
