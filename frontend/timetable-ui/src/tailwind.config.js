/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-container-low': '#f2f3ff',
        'primary-fixed': '#dde1ff',
        'on-secondary': '#ffffff',
        'inverse-on-surface': '#eef0ff',
        'on-tertiary-fixed-variant': '#5a00c6',
        'surface-container-highest': '#dae2fd',
        surface: '#faf8ff',
        'primary-container': '#1e40af',
        'on-tertiary-fixed': '#25005a',
        'surface-container': '#eaedff',
        'on-primary-container': '#a8b8ff',
        'surface-dim': '#d2d9f4',
        primary: '#00288e',
        'on-secondary-fixed': '#0d1c2e',
        background: '#faf8ff',
        outline: '#757684',
        'error-container': '#ffdad6',
        'surface-bright': '#faf8ff',
        'surface-container-high': '#e2e7ff',
        tertiary: '#440098',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        'on-secondary-container': '#57657a',
        'surface-tint': '#3755c3',
        'on-primary': '#ffffff',
        'outline-variant': '#c4c5d5',
        'secondary-fixed': '#d5e3fc',
        'surface-container-lowest': '#ffffff',
        'on-surface': '#131b2e',
        'on-primary-fixed': '#001453',
        'tertiary-container': '#5f00d1',
        'secondary-container': '#d5e3fc',
        'on-secondary-fixed-variant': '#3a485b',
        'tertiary-fixed-dim': '#d2bbff',
        'inverse-primary': '#b8c4ff',
        'inverse-surface': '#283044',
        'primary-fixed-dim': '#b8c4ff',
        'on-tertiary': '#ffffff',
        'tertiary-fixed': '#eaddff',
        'on-tertiary-container': '#c9aeff',
        'on-primary-fixed-variant': '#173bab',
        secondary: '#515f74',
        error: '#ba1a1a',
        'on-surface-variant': '#444653',
        'surface-variant': '#dae2fd',
        'on-background': '#131b2e',
        'secondary-fixed-dim': '#b9c7df'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      spacing: {
        'margin-mobile': '1rem',
        margin: '2rem',
        gutter: '1.5rem',
        'space-md': '1rem',
        'space-sm': '0.5rem',
        'space-xl': '2rem',
        'space-xs': '0.25rem',
        'gutter-mobile': '0.75rem',
        'space-lg': '1.5rem'
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif']
      },
      fontSize: {
        'label-sm': ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0.03em', fontWeight: '500' }],
        'headline-sm': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.005em', fontWeight: '600' }],
        'headline-lg-mobile': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'label-lg': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em', fontWeight: '600' }],
        'headline-xl': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        'body-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'headline-xl-mobile': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em', fontWeight: '700' }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'headline-md': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'label-md': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em', fontWeight: '600' }],
        'headline-lg': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em', fontWeight: '600' }]
      },
      gridTemplateColumns: {
        timetable: '110px repeat(5, minmax(130px, 1fr)) 90px repeat(3, minmax(130px, 1fr))'
      }
    }
  },
  plugins: []
}
