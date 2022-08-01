import { styled } from 'stitches.config';

export const CardDetailsHeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  borderBottom: '1px solid $gray700',
  paddingBottom: '$4',
});

export const CardInfoContainer = styled('div', {
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '$1',

    marginTop: '$1',

    fontSize: '$lg',
    color: '$gray300',
  },
});

export const PokemonCardInfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  fontSize: '$sm',

  '& p > span': {
    fontSize: '$2xl',
  },
});
