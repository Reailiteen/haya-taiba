/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['FF Shamel', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        mono: ['FF Shamel', 'Noto Sans Arabic', 'var(--font-geist-mono)', 'monospace'],
        pingfang: ['FF Shamel', 'Noto Sans Arabic', 'PingFang SC', 'PingFang TC', 'system-ui', 'sans-serif'],
        'ff-shamel': ['FF Shamel', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        'ff-shamel-book': ['FF Shamel', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        'ff-shamel-bold': ['FF Shamel', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        // Override common font classes
        serif: ['FF Shamel', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        display: ['FF Shamel', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        // Wellbeing brand colors
        wellbeing: {
          orange: 'var(--wellbeing-orange)',
          yellow: 'var(--wellbeing-yellow)',
          green: 'var(--wellbeing-green)',
          blue: 'var(--wellbeing-blue)',
          purple: 'var(--wellbeing-purple)',
          white: 'var(--wellbeing-white)',
          black: 'var(--wellbeing-black)',
          gray: 'var(--wellbeing-gray)',
        },
        text: {
          dark: 'var(--text-dark)',
          light: 'var(--text-light)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

