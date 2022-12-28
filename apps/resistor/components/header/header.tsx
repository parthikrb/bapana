import React from 'react';
import { Avatar, AvatarGroup, Box, Text } from '@chakra-ui/react';
import { Power } from '@styled-icons/typicons';
import { useAuth } from '../../hooks/use-auth';

const Header = () => {
  const { logout } = useAuth();
  return (
    <Box
      w="100%"
      h="60px"
      bg="white"
      display="flex"
      alignItems="center"
      px="16px"
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
      }}
    >
      <Text
        fontSize={'2xl'}
        fontWeight="bold"
        color="purple.500"
        display="flex"
        flexGrow={1}
      >
        Resistor
      </Text>

      <AvatarGroup size="md" max={2}>
        <Avatar name="Parthiban Baskar" bg="purple.500" color="white" />
        <Avatar
          bg="red.500"
          icon={<Power height={36} />}
          onClick={logout}
          _hover={{ cursor: 'pointer', bg: 'red.600' }}
        />
      </AvatarGroup>
    </Box>
  );
};

export default Header;
