import React from 'react';
import { AvatarGroup, Avatar, Box, Text, Tooltip } from '@chakra-ui/react';
import styled from 'styled-components';

const TeamCard = ({ team }) => {
  return (
    <CardContainer
      w={250}
      borderRadius="lg"
      display="flex"
      p="16px"
      cursor="pointer"
      flexDirection="column"
      ml="16px"
      mb="16px"
      boxShadow="var(--chakra-shadows-base)"
      _hover={{
        boxShadow: 'var(--chakra-shadows-lg)',
      }}
    >
      <Text
        fontSize="lg"
        fontWeight="bold"
        width={100}
        color="purple.500"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {team.name}
      </Text>

      <Box display="flex" flexDirection="row" mt={4}>
        <Text fontSize="md" width={100}>
          Manager
        </Text>
        <Text fontWeight="bold">
          {`${team.manager.firstName} ${team.manager.lastName}`}
        </Text>
      </Box>

      <Box display="flex" flexDirection="row" mt={4} alignItems="center">
        <Text fontSize="md" width={100}>
          Members
        </Text>
        <AvatarGroup size="sm" max={3} mt={2}>
          {team.employees.map((employee) => (
            // <Tooltip
            //   key={employee.id}
            //   label={`${employee.firstName} ${employee.lastName}`}
            //   placement="bottom"
            // >
            <Avatar
              key={employee.id}
              size="sm"
              name={`${employee.firstName} ${employee.lastName}`}
            />
            // </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
    </CardContainer>
  );
};

export default TeamCard;

const CardContainer = styled(Box)`
  p {
    margin: 0;
  }
`;
