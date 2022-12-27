'use client';
import React from 'react';
import Login from './components/login/login';
import { Box, Text } from '@chakra-ui/react';
import { useAuth } from './hooks/use-auth';

const LoginPage = () => {
  return (
    <Box w="100%" h="100vh" bg="purple.500" display="flex">
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize="5xl"
          fontWeight="bold"
          mb="10px"
          color="white"
          textTransform="uppercase"
        >
          Resistor
        </Text>
      </Box>
      <Box bg="white" h="100vh" w="35%">
        <Login />
      </Box>
    </Box>
  );
};

const Page = () => {
  const { isAuthenticated } = useAuth();
  return <>{isAuthenticated ? <>Authenticated</> : <LoginPage />}</>;
};

export default Page;
