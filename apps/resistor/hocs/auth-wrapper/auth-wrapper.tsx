import { Box, Heading } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export interface IAuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: IAuthWrapperProps) => {
  return (
    <Box w="100%" h="100vh" bg="purple.500" display="flex">
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="4xl" color="white">
          Resistor
        </Heading>
      </Box>
      <Box bg="white" h="100vh" w="35%">
        {children}
      </Box>
    </Box>
  );
};

export default AuthWrapper;
