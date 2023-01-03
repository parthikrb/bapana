'use client';

import React, { lazy } from 'react';

const EmployeeJoinComponent = lazy(
  () => import('../../components/employee-join/employee-join')
);

const JoinPage = () => {

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <EmployeeJoinComponent />
    </>
  );
};

export default JoinPage;
