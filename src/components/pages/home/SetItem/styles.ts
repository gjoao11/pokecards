import { styled } from 'stitches.config';

export const SetItemContainer = styled('div', {
  padding: '$6 $4',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$4',

  borderTop: '1px solid $gray700',

  'a:last-child > &': {
    borderBottom: '1px solid $gray700',
  },

  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '$gray800',

    '& strong': {
      color: '$violet500',
    },
  },

  '& > div': {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '$4',
  },

  '@media (max-width: 640px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export const SetLogo = styled('div', {
  flex: 1,
  maxWidth: 192,
  height: 64,
});

export const SetSymbol = styled('div', {
  flex: 1,
  minWidth: 32,
  maxWidth: 32,
  height: 32,
  display: 'none',
});

export const SetInfo = styled('div', {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const MainSetInfoContent = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '& strong': {
    fontWeight: 700,
    fontSize: '$2xl',

    transition: 'color 0.2s ease-in-out',
  },

  '& p': {
    fontWeight: 400,
    fontSize: '$base',
    color: '$gray300',
  },
});

export const CardNumber = styled('p', {
  fontWeight: 400,
  fontSize: '$base',
  color: '$gray300',
});
