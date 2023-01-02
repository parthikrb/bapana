import { Spinner, Box } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
      }}
      position="absolute"
    >
      <Spinner
        color="purple.500"
        size="xl"
        thickness="6px"
        emptyColor="gray.200"
      />
    </Box>
  );
};

export default Loader;
