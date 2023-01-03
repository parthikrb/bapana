import { FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { IInviteEmployeePayload, inviteEmployee } from '@resistor/api';
import { useMutation } from '@tanstack/react-query';
import React, { memo, useCallback, useRef, useState } from 'react';
import Drawer from '../drawer/drawer';

interface IInviteEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: number;
}

const InviteEmployee = ({
  isOpen,
  onClose,
  organizationId,
}: IInviteEmployeeProps) => {
  const emailFieldRef = useRef();

  const [email, setEmail] = useState<string>('');

  const toast = useToast();

  const inviteEmployeeMutation = useMutation(
    (data: IInviteEmployeePayload) => {
      return inviteEmployee(data);
    },
    {
      onSuccess: () => {
        onClose();
        setEmail('');
        toast({
          title: 'Employee invited successfully.',
          status: 'success',
          duration: 3000,
          isClosable: false,
          position: 'bottom-left',
        });
      },
    }
  );

  const handleInviteEmployee = useCallback(() => {
    inviteEmployeeMutation.mutate({
      email,
      organization: Number(organizationId),
    });
  }, [email]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Employee"
      initialFocusRef={emailFieldRef}
      onSubmit={handleInviteEmployee}
    >
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter employee email"
          ref={emailFieldRef}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>
    </Drawer>
  );
};

export default memo(InviteEmployee);
