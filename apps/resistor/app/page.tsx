'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Login from '../components/login/login';
import { useAuth } from '../hooks/use-auth';

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

const Page = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace('/organizations');
    return;
  }

  return <LoginPage />;
};

export default Page;
