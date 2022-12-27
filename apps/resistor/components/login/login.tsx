import { Box, Button, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading } = useAuth();

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

  return (
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
  );
};

export default Login;
