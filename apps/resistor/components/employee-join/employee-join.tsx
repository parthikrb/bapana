'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { IJoinEmployeePayload, joinEmployee } from '@resistor/api';
import { isValidForm } from '@resistor/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import AuthWrapper from '../../hocs/auth-wrapper/auth-wrapper';
import { useAuth } from '../../hooks/use-auth';

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

export const EmployeeJoin = () => {
  const [invitationCode, setInvitationCode] = useState('');

  const [joinForm, setJoinForm] = useState(initialFormValues);

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const toast = useToast();

  if (isAuthenticated) {
    router.replace('/organizations');
    return;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(
      typeof window !== 'undefined' ? window?.location.search : ''
    );
    setInvitationCode(urlParams.get('token') || '');
  }, [window?.location.search]);

  const handleJoinFormChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setJoinForm({ ...joinForm, [name]: value });
    },
    [joinForm]
  );

  const joinEmployeeMutation = useMutation(
    (data: IJoinEmployeePayload) => {
      return joinEmployee(data);
    },
    {
      onSuccess: () => {
        typeof window !== 'undefined' ? (window.location.href = '/') : null;
      },
      onError: ({ response }) => {
        toast({
          title: response.data.non_field_errors[0],
          status: 'error',
          duration: 3000,
          isClosable: false,
          position: 'bottom-left',
        });
      },
    }
  );

  const handleJoinEmployee = useCallback(() => {
    joinEmployeeMutation.mutate({
      ...joinForm,
      invitationCode,
    });
  }, [joinForm, invitationCode]);

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
          Join
        </Heading>
        <Stack spacing={4}>
          <FormControl>
            <Input
              id="firstName"
              name="firstName"
              value={joinForm.firstName}
              onChange={handleJoinFormChange}
              placeholder="First Name"
            />
          </FormControl>
          <FormControl>
            <Input
              id="lastName"
              name="lastName"
              value={joinForm.lastName}
              onChange={handleJoinFormChange}
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={
              joinForm.email.length > 0 && !joinForm.email.includes('@')
            }
          >
            <Input
              id="email"
              type="email"
              name="email"
              value={joinForm.email}
              onChange={handleJoinFormChange}
              placeholder="Email"
            />
          </FormControl>
          <FormControl>
            <Input
              id="username"
              name="username"
              value={joinForm.username}
              onChange={handleJoinFormChange}
              placeholder="Username"
            />
          </FormControl>
          <FormControl
            isInvalid={
              joinForm.password.length > 0 && joinForm.password.length < 8
            }
          >
            <Input
              id="password"
              type="password"
              name="password"
              value={joinForm.password}
              onChange={handleJoinFormChange}
              placeholder="Password (min 8 characters)"
            />
          </FormControl>
          <Button
            colorScheme="purple"
            type="submit"
            onClick={handleJoinEmployee}
            disabled={
              !isValidForm(joinForm) ||
              !joinForm.email.includes('@') ||
              joinEmployeeMutation.isLoading ||
              joinForm.password.length < 8
            }
          >
            Join
          </Button>
        </Stack>
      </Box>
    </AuthWrapper>
  );
};

export default EmployeeJoin;
