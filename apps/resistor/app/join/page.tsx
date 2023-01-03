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
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { isValidForm } from '@resistor/utils';

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

const JoinPage = () => {
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
    const urlParams = new URLSearchParams(window.location.search);
    setInvitationCode(urlParams.get('token') || '');
  }, [window.location.search]);

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
        window.location.href = '/';
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
    <Box bg="purple.500" display="flex" h="100vh" w="100vw">
      <Box
        h="fit-content"
        bg="white"
        borderRadius="md"
        margin="auto"
        p={4}
        px={8}
      >
        <Heading textAlign="center" color="gray.500" margin={4}>
          Join Resistor
        </Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="firstName">Firstname</FormLabel>
            <Input
              id="firstName"
              name="firstName"
              value={joinForm.firstName}
              onChange={handleJoinFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Lastname</FormLabel>
            <Input
              id="lastName"
              name="lastName"
              value={joinForm.lastName}
              onChange={handleJoinFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={joinForm.email}
              onChange={handleJoinFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              name="username"
              value={joinForm.username}
              onChange={handleJoinFormChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              value={joinForm.password}
              onChange={handleJoinFormChange}
            />
          </FormControl>
          <Button
            colorScheme="purple"
            type="submit"
            onClick={handleJoinEmployee}
            disabled={!isValidForm(joinForm)}
          >
            Join
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default JoinPage;
