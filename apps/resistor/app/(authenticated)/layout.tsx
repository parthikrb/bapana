'use client';
import React, { ReactNode } from 'react';
import Header from '../../components/header/header';
import SideNav from '../../components/sidenav/sidenav';
import { Box } from '@chakra-ui/react';
import { useAuth } from '../../hooks/use-auth';
import Login from '../../components/login/login';

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
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
