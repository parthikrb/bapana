'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Login from '../components/login/login';
import { Box, Heading } from '@chakra-ui/react';
import { useAuth } from '../hooks/use-auth';

const LoginPage = () => {
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
        <Login />
      </Box>
    </Box>
  );
};

const Page = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace('/organizations');
    return;
  }

  return <LoginPage />;
};

export default Page;
