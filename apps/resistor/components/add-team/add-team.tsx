/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import Drawer from '../drawer/drawer';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { axios, APIKEYS } from '../../utils';
import { useToast } from '@chakra-ui/react';
import { getOrganizations } from '../../api/organization/get-organizations';
import { useCallback } from 'react';

interface ITeamProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeam = ({ isOpen, onClose }: ITeamProps) => {
  const initialFormValue = {
    name: '',
    organization: '',
    manager: '',
  };
  const [formValue, setFormValue] = useState(initialFormValue);

  const [validForm, setValidForm] = useState(false);

  const firstField = useRef();

  const toast = useToast();

  const queryClient = useQueryClient();

  const { data: organizations } = useQuery({
    queryKey: [APIKEYS.ORGANIZATION],
    queryFn: getOrganizations,
  });

  const teamMutation = useMutation({
    mutationFn: (data) => {
      return axios.post('/team/', data);
    },
    onSuccess: (newData) => {
      onClose();
      queryClient.setQueryData([APIKEYS.TEAM], (oldData: any) => {
        return {
          ...oldData,
          data: [...oldData.data, newData.data],
        };
      });
      setFormValue(initialFormValue);
      toast({
        title: 'Team created successfully.',
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

  const handleFormValueChange = useCallback(
    (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
    },
    [formValue]
  );

  const handleTeamSave = () => {
    // @ts-ignore
    teamMutation.mutate({
      name: formValue.name,
      organization: formValue.organization,
      manager: formValue.manager,
    });
  };

  useEffect(() => {
    if (formValue.name && formValue.organization) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [formValue]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Create new team"
        onSubmit={handleTeamSave}
        initialFocusRef={firstField}
        isDisabled={teamMutation.isLoading || !validForm}
      >
        <Stack spacing={4}>
          <Box>
            <FormLabel htmlFor="teamName">Team Name</FormLabel>
            <Input
              ref={firstField}
              id="teamName"
              name="name"
              placeholder="Please enter team name"
              borderColor="#718096"
              value={formValue.name}
              onChange={handleFormValueChange}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="organization">Organization</FormLabel>
            <Select
              id="organization"
              name="organization"
              borderColor="#718096"
              value={formValue.organization}
              onChange={handleFormValueChange}
            >
              <option value="0" selected hidden>
                Select Organization
              </option>
              {organizations?.data?.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <FormLabel htmlFor="teamManager">Team Manager</FormLabel>
            <Select
              id="teamManager"
              borderColor="#718096"
              name="manager"
              value={formValue.manager}
              onChange={handleFormValueChange}
              disabled={!formValue.organization}
            >
              <option value="0" selected hidden>
                Select Team Manager
              </option>
              {organizations?.data
                ?.find(
                  (organization) =>
                    organization.id === Number(formValue.organization)
                )
                ?.employees?.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
            </Select>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};

export default AddTeam;
