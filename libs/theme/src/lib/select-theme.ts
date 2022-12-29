import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { HEIGHT, WIDTH } from './constants';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    width: WIDTH,
    height: HEIGHT,
    border: 'gray.500',
    color: 'gray.500'
  },
  icon: {
    color: 'purple.500',
    left: 270
  },
})

export const selectTheme = defineMultiStyleConfig({ baseStyle })
