import { styled } from 'stitches.config';

export const CardFormatsContainer = styled('div', {
  paddingTop: '$4',
});

export const RegulationMark = styled('div', {
  marginBottom: '$8',

  '& h3': {
    fontSize: '$base',
    fontWeight: 300,

    marginBottom: '$1',
  },

  '& p': {
    fontSize: '$lg',
  },
});

export const FormatsContainer = styled('div', {
  '& h3': {
    fontSize: '$lg',
    fontWeight: 400,
  },

  '& > div': {
    marginTop: '$4',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '$4',
    flexWrap: 'wrap',

    '@bp1': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
});

export const FormatItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  '& p': {
    fontSize: '$base',
  },
});

export const FormatTag = styled('span', {
  fontWeight: 400,
  fontSize: '$sm',
  textAlign: 'center',

  padding: '$1 $4',
  borderRadius: 8,
  width: '$space$24',

  variants: {
    legality: {
      legal: {
        color: '#1be436',
        border: '1px solid #1be436',
      },

      notLegal: {
        color: '#e41b43',
        border: '1px solid #e41b43',
      },
    },
  },
});
