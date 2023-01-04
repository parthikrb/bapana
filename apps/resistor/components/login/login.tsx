import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { isValidForm } from '../../utils/is-valid-form';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AuthWrapper from '../../hocs/auth-wrapper/auth-wrapper';
import { useAuth } from '../../hooks/use-auth';

const Login = () => {
  const initialFormValues = {
    username: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState(initialFormValues);

  const router = useRouter();

  const { login, isLoading, isAuthenticated } = useAuth();

  const handleLoginFormChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginForm({ ...loginForm, [name]: value });
    },
    [loginForm]
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/organizations');
    } else {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  return (
    <AuthWrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Heading textAlign="center" color="gray.500" margin={4}>
          Welcome
        </Heading>
        <Stack spacing={4}>
          <FormControl>
            <Input
              name="username"
              placeholder="Username"
              value={loginForm.username}
              onChange={handleLoginFormChange}
              borderColor="#718096"
            />
          </FormControl>
          <FormControl
            isInvalid={
              loginForm.password.length > 0 && loginForm.password.length < 8
            }
          >
            <Input
              placeholder="Password (min 8 characters)"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginFormChange}
              borderColor="#718096"
            />
          </FormControl>
          <Button
            colorScheme="purple"
            mb="10px"
            onClick={() => {
              login(loginForm.username, loginForm.password);
            }}
            disabled={
              isLoading ||
              !isValidForm(loginForm) ||
              loginForm.password.length < 8
            }
            isLoading={isLoading}
          >
            Login
          </Button>
        </Stack>
        <Text fontSize="sm" fontWeight="bold">
          Don&apos;t have an account? Contact your manager.
        </Text>
      </Box>
    </AuthWrapper>
  );
};

export default Login;
