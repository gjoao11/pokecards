import { styled } from 'stitches.config';

export const CardDetailsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '320px 1fr',
  alignItems: 'start',
  columnGap: '$24',
  rowGap: '$12',

  '@bp3': {
    columnGap: '$12',
  },

  '@bp2': {
    gridTemplateColumns: '1fr',
  },
});

export const CardImageContainer = styled('div', {
  filter: 'drop-shadow(0 0 4px $colors$gray500)',

  '@bp2': {
    maxWidth: 320,
    width: '100%',
    margin: '0 auto',
  },

  '@bp1': {
    maxWidth: 'unset',
  },
});

export const CardDataContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});
