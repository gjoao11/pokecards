import { styled } from 'stitches.config';

export const LoadMoreButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',

  color: '$text',

  '&:disabled': {
    cursor: 'default',
  },
});
