import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const OrganizationOverview = ({ organization }) => {
  return (
    <Box display="flex">
      <Text fontSize="md" width={100}>Manager</Text>
      <Text fontWeight="bold">{`${organization?.createdBy?.firstName} ${organization?.createdBy?.lastName}`}</Text>
    </Box>
  );
};

export default OrganizationOverview;
