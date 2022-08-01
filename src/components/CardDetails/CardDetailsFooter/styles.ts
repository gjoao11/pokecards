import { styled } from 'stitches.config';

export const CardDetailsFooterContainer = styled('footer', {
  padding: '$4 0',
  borderBottom: '1px solid $gray700',
});

export const PokemonCardStats = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '$2',
  rowGap: '$4',

  padding: '$4 $2',
  border: '1px solid $gray700',
  borderRadius: 8,

  '@bp1': {
    gridTemplateColumns: '1fr',
    justifyItems: 'start',
  },
});

export const PokemonCardStat = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',

  fontSize: '$lg',

  '& span': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2 ',

    fontWeight: 300,
    fontSize: '$xl',
  },

  '@bp1': {
    alignItems: 'flex-start',
  },
});

export const CardExpansion = styled('div', {
  marginTop: '$8',

  '& h3': {
    fontSize: '$base',
    fontWeight: 300,

    marginBottom: '$1',
  },

  '& a': {
    fontSize: '$lg',
    color: '$blue500',

    display: 'flex',
    alignItems: 'center',
    gap: '$1',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const DetailsGrid = styled('div', {
  marginTop: '$8',

  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '$2',
  rowGap: '$4',

  '@bp1': {
    gridTemplateColumns: '1fr',
  },
});

export const DetailsGridItem = styled('div', {
  '& h3': {
    fontSize: '$base',
    fontWeight: 300,

    marginBottom: '$1',
  },

  '& p': {
    fontSize: '$lg',
  },
});
