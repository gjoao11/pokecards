import { styled } from 'stitches.config';

export const CardList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '$6',

  '@bp3': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  '@bp2': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@bp1': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
