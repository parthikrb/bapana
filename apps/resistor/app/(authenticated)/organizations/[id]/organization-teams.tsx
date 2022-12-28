import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import TeamCard from '../../../../components/team-card/team-card';

const OrganizationTeams = ({ teams }) => {
  return (
    <Box display="flex">
      {teams?.map((team) => {
        return <TeamCard key={team.id} team={team} />;
      })}
    </Box>
  );
};

export default OrganizationTeams;
