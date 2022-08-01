import { styled } from 'stitches.config';

export const CardDetailsBodyContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$4 0',
  borderBottom: '1px solid $gray700',
});

export const InfoBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const InfoText = styled('p', {
  fontWeight: 300,
  letterSpacing: 0.2,

  display: 'inline-block',
  width: '75%',

  '@bp2': {
    width: '100%',
  },
});

export const InfoTitle = styled('h3', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  fontWeight: 400,
  fontSize: '$xl',
});

export const AbilityTag = styled('span', {
  fontWeight: 400,
  fontSize: '$base',
  color: '$violet500',

  border: '1px solid $violet500',
  padding: '$1 $4',
  borderRadius: 8,
});

export const MoveCost = styled('span', {
  display: 'flex',
  gap: '$1',
});

export const MoveDamage = styled('span', {
  marginLeft: 'auto',
});
