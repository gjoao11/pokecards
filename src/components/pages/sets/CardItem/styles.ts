import { styled } from 'stitches.config';

export const CardItemContainer = styled('div', {
  borderRadius: 10,

  transition: 'transform 0.2s ease-in-out',

  '&:hover': {
    transform: 'translateY(-4%)',
  },
});
