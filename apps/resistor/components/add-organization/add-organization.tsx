/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, FormLabel, Input, Stack } from '@chakra-ui/react';
import Drawer from '../../hocs/drawer/drawer';
import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios, APIKEYS } from '../../utils';
import { useToast } from '@chakra-ui/react';

interface IAddOrganizationProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrganization = ({ isOpen, onClose }: IAddOrganizationProps) => {
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationManager, setOrganizationManager] = useState<string>('');

  const firstField = useRef();

  const toast = useToast();

  const queryClient = useQueryClient();

  const organizationMutation = useMutation({
    mutationFn: (data) => {
      return axios.post('/organization/', data);
    },
    onSuccess: (newData) => {
      onClose();
      setOrganizationName('');
      queryClient.setQueryData([APIKEYS.ORGANIZATION], (oldData: any) => {
        return {
          ...oldData,
          data: [...oldData.data, newData.data],
        };
      });

      toast({
        title: 'Organization created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: false,
        position: 'bottom-left',
      });
    },

    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: false,
        position: 'bottom-left',
      });
    },
  });

  const handleOrganizationSave = () => {
    // @ts-ignore
    organizationMutation.mutate({
      name: organizationName,
      manager: organizationManager || 1,
    });
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Create new organization"
        onSubmit={handleOrganizationSave}
        initialFocusRef={firstField}
        isDisabled={
          organizationMutation.isLoading ||
          !organizationName
        }
      >
        <Stack spacing={4}>
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
          {/* <Box>
            <FormLabel htmlFor="organizationManager">
              Organization Manager
            </FormLabel>
            <Input
              id="organizationManager"
              placeholder="Please enter organization manager"
              borderColor="#718096"
              value={organizationManager}
              onChange={(event) => setOrganizationManager(event.target.value)}
            />
          </Box> */}
        </Stack>
      </Drawer>
    </>
  );
};

export default AddOrganization;
