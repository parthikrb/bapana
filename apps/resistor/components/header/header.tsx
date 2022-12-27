import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      w="100%"
      h="60px"
      bg="white"
      display="flex"
      alignItems="center"
      px="16px"
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
      }}
    >
      <Text fontSize={'2xl'} fontWeight="bold" color="purple.500">
        Resistor
      </Text>
    </Box>
  );
};

export default Header;
