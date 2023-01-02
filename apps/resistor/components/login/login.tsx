import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const { login, isLoading, isAuthenticated } = useAuth();

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setUsername(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/organizations');
    } else {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="2xl" fontWeight="bold" mb="10px">
            Welcome
          </Text>
          <Input
            placeholder="Username"
            mb="10px"
            value={username}
            onChange={handleUsernameChange}
            borderColor="#718096"
          />
          <Input
            placeholder="Password"
            mb="10px"
            value={password}
            onChange={handlePasswordChange}
            borderColor="#718096"
          />
          <Button
            colorScheme="purple"
            mb="10px"
            onClick={() => {
              login(username, password);
            }}
            disabled={!username || !password}
            isLoading={isLoading}
          >
            Login
          </Button>
          <Text fontSize="sm" fontWeight="bold">
            Don&apos;t have an account? Contact your manager.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
