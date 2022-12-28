'use client';
import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Add } from 'styled-icons/fa-solid';
import AddOrganization from '../../../components/add-organization/add-organization';
import { useQuery } from '@tanstack/react-query';
import { APIKEYS } from '../../../utils';
import OrganizationCard from '../../../components/organization-card/organization-card';
import { getOrganization } from '../../../api';

const OrganizationPage = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    data: organizations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [APIKEYS.ORGANIZATION],
    queryFn: getOrganization,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: false,
        position: 'bottom-left',
      });
    }
  }, [isError, toast]);

  return (
    <Box position="relative" w="100%" h="calc(100vh - 60px)">
      <AddOrganization isOpen={isOpen} onClose={onClose} />
      <Box display="flex">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="purple.500"
          ml="16px"
          mt="16px"
        >
          Organization
        </Text>
      </Box>
      <Box display="flex" flexDirection="row" ml="16px" flexWrap="wrap">
        {organizations?.data?.map((organization) => (
          <OrganizationCard
            key={organization.id}
            id={organization.id}
            name={organization.name}
            membersCount={organization.employeesCount}
            admin={`${organization.createdBy.firstName} ${organization.createdBy.lastName}`}
          />
        ))}
      </Box>
      <IconButton
        aria-label="Add Organization"
        icon={<Add height={24} />}
        isRound={true}
        position="absolute"
        bottom="16px"
        right="16px"
        onClick={onOpen}
      />
    </Box>
  );
};

export default OrganizationPage;
