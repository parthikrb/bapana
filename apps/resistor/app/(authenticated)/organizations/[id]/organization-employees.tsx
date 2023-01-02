import React, { useState, useEffect, lazy } from 'react';
import { Box, Avatar, Button, useDisclosure } from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react';
import { Add } from 'styled-icons/fa-solid';

const InviteEmployeeComponent = lazy(
  () => import('../../../../components/invite-employee/invite-employee')
);

const OrganizationEmployees = ({ employees, organizationId }) => {
  const [rowData, setRowData] = useState([]);

  const {
    isOpen: isInviteEmployeeDrawerOpen,
    onOpen: onInviteEmployeeDrawerOpen,
    onClose: onInviteEmployeeDrawerClose,
  } = useDisclosure();

  useEffect(() => {
    if (employees.length) {
      const newEmployeesList = employees.map((employee) => ({
        ...employee,
        fullName: `${employee.firstName} ${employee.lastName}`,
      }));
      setRowData(newEmployeesList);
    }
  }, [employees]);

  const columnDefs = [
    {
      headerName: '',
      field: 'fullName',
      width: 70,
      cellRenderer: (params) => (
        <Avatar
          size="sm"
          name={params.value}
          style={{
            marginTop: '3px',
          }}
        />
      ),
    },
    { headerName: 'First Name', field: 'firstName', flex: 1, sortable: true },
    { headerName: 'Last Name', field: 'lastName', flex: 1, sortable: true },
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email', flex: 2 },
  ];
  return (
    <Box className="ag-theme-alpine" w="auto" height="400px">
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
      <Button
        leftIcon={<Add size="24" />}
        position="absolute"
        bottom="24px"
        right="24px"
        onClick={onInviteEmployeeDrawerOpen}
      >
        Invite Employee
      </Button>
      <InviteEmployeeComponent
        isOpen={isInviteEmployeeDrawerOpen}
        onClose={onInviteEmployeeDrawerClose}
        organizationId={organizationId}
      />
    </Box>
  );
};

export default OrganizationEmployees;
