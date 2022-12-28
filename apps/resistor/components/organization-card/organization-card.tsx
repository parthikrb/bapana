import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { APIKEYS } from '../../utils';
import { getOrganizationById } from '../../api';

interface IOrganizationCardProps {
  id: number;
  name: string;
  admin: string;
  membersCount: number;
}

const OrganizationCard = ({
  id,
  name,
  admin,
  membersCount,
}: IOrganizationCardProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleNavigation = () => {
    router.push(`/organizations/${id}`);
    queryClient.prefetchQuery([APIKEYS.ORGANIZATION, id], getOrganizationById);
  };
  return (
    <Card w="300px" mr="16px" mb="16px" onClick={handleNavigation}>
      <CardHeader fontSize="xl" fontWeight="bold" pb="8px">
        {name}
      </CardHeader>
      <CardBody pt={0}>
        <p>Admin: {admin}</p>
        <p>Members: {membersCount}</p>
      </CardBody>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default OrganizationCard;
