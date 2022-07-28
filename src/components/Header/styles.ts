import { styled } from 'stitches.config';

export const HeaderContainer = styled('header', {
  height: '5rem',
  borderBottom: '1px solid $gray700',
});

export const HeaderContent = styled('div', {
  maxWidth: '1152px',
  margin: '0 auto',
  padding: '0 $4',
  height: '5rem',

  display: 'flex',
  alignItems: 'center',

  '& .logo': {
    fontSize: '$2xl',
    fontWeight: 700,
  },
});
