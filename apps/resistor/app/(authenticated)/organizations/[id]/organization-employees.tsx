import React, { useState, useEffect } from 'react';
import { Box, Avatar } from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react';

const OrganizationEmployees = ({ employees }) => {
  const [rowData, setRowData] = useState([]);

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
      cellRenderer: (params) => <Avatar size="sm" name={params.value} style={{
        marginTop: '3px',
      }}/>,
    },
    { headerName: 'First Name', field: 'firstName', flex: 1, sortable: true },
    { headerName: 'Last Name', field: 'lastName', flex: 1, sortable: true },
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email', flex: 2 },
  ];
  return (
    <Box className="ag-theme-alpine" w="auto" height="400px">
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
    </Box>
  );
};

export default OrganizationEmployees;
