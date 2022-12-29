import React, { ReactNode } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface MenuItemProps {
  icon: ReactNode;
  name: string;
  isExpanded?: boolean;
}

const MenuItem = ({ icon, name, isExpanded }: MenuItemProps) => {
  const router = useRouter();

  return (
    <Box
      w="100%"
      h="48px"
      display="flex"
      color="white"
      _hover={{
        bg: 'purple.600',
      }}
      alignItems="center"
      cursor="pointer"
      onClick={() => router.push(`/${name.replaceAll(' ', '-').toLowerCase()}`)}
    >
      <Box as="span" ml="16px">
        {icon}
      </Box>
      {isExpanded && (
        <Text
          fontSize={'l'}
          ml="16px"
          color="white"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <StyledLink href={`/${name.replaceAll(' ', '-').toLowerCase()}`}>
            {name}
          </StyledLink>
        </Text>
      )}
    </Box>
  );
};

export default MenuItem;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
