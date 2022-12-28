import { extendTheme } from '@chakra-ui/react';
import { HEIGHT, WIDTH } from './constants';
import { inputTheme } from './input-theme';

export const theme = extendTheme({
  global: {
    styles: {
      '*': {
        boxSizing: 'border-box',
      },
      p: {
        margin: 0,
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semi-bold',
        maxWidth: WIDTH,
        height: HEIGHT,
        border: 'none',
        textTransform: 'uppercase',
      },
      variants: {
        outline: {
          border: '2px solid',
        },
      },
      defaultProps: {
        size: 'md',
        colorScheme: 'purple',
      },
    },
    Input: inputTheme,
    Text: {
      baseStyle: {
        color: 'gray.500',
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.500',
      },
    },
    CloseButton: {
      baseStyle: {
        border: 'none',
      }
    },
  },
});

export default theme;
