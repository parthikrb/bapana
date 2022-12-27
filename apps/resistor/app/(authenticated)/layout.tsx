'use client';
import React, { ReactNode } from 'react';
import Header from '../../components/header/header';
import SideNav from '../../components/sidenav/sidenav';
import { Box } from '@chakra-ui/react';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/navigation';

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace('/');
    return;
  }

  return (
    <>
      <Header />
      <Box display="flex" flexDirection="row">
        <SideNav />
        <Box w={'100%'}>{children}</Box>
      </Box>
    </>
  );
};

export default AuthenticatedLayout;
