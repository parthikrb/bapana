import { Box, Button, Input, Text } from '@chakra-ui/react'
import React from 'react'

const Login = () => {
  return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="10px">
          Login
        </Text>
        <Input placeholder="Email" mb="10px" />
        <Input placeholder="Password" mb="10px" />
        <Button colorScheme="purple" mb="10px">
          Login
        </Button>
        <Text fontSize="sm" fontWeight="bold">
          Don't have an account? Contact your manager.
        </Text>
      </Box>
  )
}

export default Login
