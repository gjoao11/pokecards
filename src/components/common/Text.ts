import { styled } from 'stitches.config';

export const Text = styled('p', {
  color: '$text',

  variants: {
    size: {
      1: {
        fontSize: '$sm',
      },
      2: {
        fontSize: '$base',
      },
      3: {
        fontSize: '$2xl',
      },
      4: {
        fontSize: '$3xl',
      },
    },
  },

  defaultVariants: {
    size: '2',
  },
});
