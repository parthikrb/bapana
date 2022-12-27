import {
  Drawer as CDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IDrawerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  initialFocusRef?: any;
  onSubmit: () => void;
  isDisabled?: boolean;
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  initialFocusRef,
  title,
  onSubmit,
  isDisabled,
}: IDrawerProps) => {
  return (
    <>
      <CDrawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={initialFocusRef}
        onClose={onClose}
        size="sm"
        closeOnEsc={true}
        closeOnOverlayClick={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="gray.500">
            {title}
          </DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} isDisabled={isDisabled}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </CDrawer>
    </>
  );
};

export default Drawer;
