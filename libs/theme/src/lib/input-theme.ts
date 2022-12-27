import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { HEIGHT, WIDTH } from './constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    width: WIDTH,
    height: HEIGHT,
    color: 'gray.500',
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
