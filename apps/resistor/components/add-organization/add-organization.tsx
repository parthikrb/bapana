/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, FormLabel, Input } from '@chakra-ui/react';
import Drawer from '../../components/drawer/drawer';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axios } from '../../utils/axios';
import { useToast } from '@chakra-ui/react';

interface IAddOrganizationProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrganization = ({ isOpen, onClose }: IAddOrganizationProps) => {
  const [organizationName, setOrganizationName] = useState<string>('');

  const firstField = useRef();

  const toast = useToast();

  const organizationMutation = useMutation({
    mutationFn: (data) => {
      return axios.post('/organization/', data);
    },
  });

  const handleOrganizationSave = () => {
    // @ts-ignore
    organizationMutation.mutate({
      name: organizationName,
    });
  };

  useEffect(() => {
    if (organizationMutation.isError) {
      let errorMessage = 'An error occurred.';
      if (organizationMutation.error?.response.status === 400) {
        errorMessage = 'Bad request. Please check the data and try again.';
      }

      if (organizationMutation.error?.response.status === 500) {
        errorMessage = 'Internal server error.';
      }

      if (organizationMutation.error?.response.status === 401) {
        errorMessage = 'Session Timeout. Please login and try again.';
      }

      toast({
        title: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: false,
        position: 'bottom-left',
      });
    }
  }, [
    organizationMutation.error?.response.status,
    organizationMutation.isError,
    toast,
  ]);

  useEffect(() => {
    if (organizationMutation.isSuccess) {
      toast({
        title: 'Organization created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: false,
        position: 'bottom-left',
      });
      setOrganizationName('');
      onClose();
    }
  }, [organizationMutation.isSuccess, onClose, toast]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Create new organization"
        onSubmit={handleOrganizationSave}
        initialFocusRef={firstField}
        isDisabled={organizationMutation.isLoading || !organizationName}
      >
        <Box>
          <FormLabel htmlFor="organizationName">Organization Name</FormLabel>
          <Input
            ref={firstField}
            id="organizationName"
            placeholder="Please enter organization name"
            borderColor="#718096"
            value={organizationName}
            onChange={(event) => setOrganizationName(event.target.value)}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default AddOrganization;
