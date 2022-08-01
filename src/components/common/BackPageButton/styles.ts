import { styled } from 'stitches.config';

export const BackPageButtonContainer = styled('button', {
  backgroundColor: 'transparent',
  border: '1px solid $gray700',
  padding: '$2 $4',
  borderRadius: 8,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',

  color: '$text',
  fontSize: '$base',

  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '$gray800',
  },
});
