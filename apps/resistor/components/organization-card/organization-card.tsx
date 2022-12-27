import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

interface IOrganizationCardProps {
  name: string;
  admin: string;
  membersCount: number;
}

const OrganizationCard = ({
  name,
  admin,
  membersCount,
}: IOrganizationCardProps) => {
  return (
    <Card w='300px' mr='16px' mb='16px'>
      <CardHeader fontSize='xl' fontWeight='bold' pb='8px'>{name}</CardHeader>
      <CardBody pt={0}>
        <p>Admin: {admin}</p>
        <p>Members: {membersCount}</p>
      </CardBody>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default OrganizationCard;
