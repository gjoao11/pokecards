import { createStitches } from '@stitches/react';

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      inter: 'Inter',
    },
    colors: {
      background: '#121214',
      text: '#e2e2e6',

      gray200: '#e2e2e6',
      gray300: '#c4c4c6',
      gray500: '#71717a',
      gray600: '#3f3f46',
      gray700: '#2c2c2e',
      gray800: '#202022',
      gray900: '#121214',

      violet500: '#8b5cf6',

      blue500: '#1f7de7',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    space: {
      px: '1px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      12: '3rem',
      24: '6rem',
    },
  },

  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});
