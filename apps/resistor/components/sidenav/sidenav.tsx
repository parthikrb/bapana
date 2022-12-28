import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import MenuItem from './menu-item';
import { Organization } from '@styled-icons/octicons';
import { CalendarWeek } from '@styled-icons/bootstrap';
import { CollapseLeft, ExpandLeft } from '@styled-icons/open-iconic';

const SideNav = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [sidenavWidth, setSidenavWidth] = React.useState('240px');

  const iconHeight = isExpanded ? 16 : 24;

  const menuList = [
    { icon: <Organization height={iconHeight} />, name: 'Organizations' },
    {
      icon: <CalendarWeek height={iconHeight} />,
      name: 'Capacity Planner',
    },
  ];

  useEffect(() => {
    setSidenavWidth(isExpanded ? '260px' : '60px');
  }, [isExpanded]);

  return (
    <Box
      w={sidenavWidth}
      h="calc(100vh - 60px)"
      bg="purple.500"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{
        transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out',
      }}
    >
      {menuList.map((item, index) => (
        <MenuItem
          name={item.name}
          icon={item.icon}
          key={`${index}-${name}`}
          isExpanded={isExpanded}
        />
      ))}
      <Box flexGrow={1}></Box>
      <Box
        w="100%"
        h="48px"
        display="flex"
        color="white"
        _hover={{
          bg: 'purple.600',
        }}
        alignItems="center"
        justifyContent="center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box as="span">
          {isExpanded ? (
            <CollapseLeft height={16} />
          ) : (
            <ExpandLeft height={16} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
