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
import { useQuery } from '@tanstack/react-query';
import { APIKEYS } from '../../../utils';
import { getTeams } from '../../../api';
import AddTeam from '../../../components/add-team/add-team';
import TeamCard from '../../../components/team-card/team-card';

const TeamsPage = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { data: teams, isError } = useQuery({
    queryKey: [APIKEYS.TEAM],
    queryFn: getTeams,
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
      <AddTeam isOpen={isOpen} onClose={onClose} />
      <Box display="flex">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="purple.500"
          ml="16px"
          mt="16px"
        >
          Team
        </Text>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {teams?.data?.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </Box>
      <IconButton
        aria-label="Add Team"
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

export default TeamsPage;
