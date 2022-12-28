'use client';

import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

export const Loading = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        color="purple.500"
        size="xl"
        thickness="6px"
        emptyColor="gray.200"
      />
    </Box>
  );
};

export default Loading;
