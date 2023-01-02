'use client';

import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { APIKEYS } from '../../../../utils';
import { getOrganizationById } from '../../../../api';
import OrganizationOverview from './organization-overview';
import OrganizationTeams from './organization-teams';
import OrganizationEmployees from './organization-employees';

const OrganizationDetailsPage = ({ params }) => {
  const { id } = params;

  const { data: organization } = useQuery(
    [APIKEYS.ORGANIZATION, id],
    getOrganizationById
  );

  return (
    <StyledBox>
      <Breadcrumb>
        <BreadcrumbItem>
          <StyledLink href="/organizations">Organizations</StyledLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <StyledLink href={`/organizations/${id}`}>{id}</StyledLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box display="flex">
        <Text fontSize="2xl" fontWeight="bold" color="purple.500" mt="16px">
          {organization?.data?.name}
        </Text>
      </Box>

      <Tabs
        variant="soft-rounded"
        colorScheme={'purple'}
        isLazy={true}
        defaultIndex={0}
        ringColor={'purple.500'}
        outlineColor={'purple.500'}
      >
        <TabList>
          <StyledTab>Overview</StyledTab>
          <StyledTab>Teams</StyledTab>
          <StyledTab>Employees</StyledTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OrganizationOverview organization={organization?.data} />
          </TabPanel>
          <TabPanel>
            <OrganizationTeams teams={organization?.data?.teams} />
          </TabPanel>
          <TabPanel>
            <OrganizationEmployees employees={organization?.data?.employees} organizationId={id}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </StyledBox>
  );
};

export default OrganizationDetailsPage;

const StyledLink = styled(Link)`
  color: var(--chakra-colors-gray-500);
`;

const StyledBox = styled(Box)`
  padding: 16px;

  ol {
    margin: 0;
    padding: 0px !important;
  }

  li > span[role='presentation'] {
    color: var(--chakra-colors-gray-500);
  }

  div[role='tabpanel'] {
    padding: 0px;
    padding-top: 16px;
  }
`;

const StyledTab = styled(Tab)`
  border: none;
  margin-right: 16px;
`;
