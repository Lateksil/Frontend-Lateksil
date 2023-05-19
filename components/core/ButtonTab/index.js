import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const ButtonTab = ({ label, value, children, ...props }) => {
  return (
    <Box
      w="max-content"
      cursor="pointer"
      rounded="xl"
      border={label === value ? '1px solid #102D62' : '1px solid gray'}
      p="3"
      bg={label === value ? 'blue.700' : 'gray.100'}
      {...props}
    >
      <Text
        textAlign="center"
        color={label === value ? 'white' : 'gray.500'}
        fontWeight="semibold"
      >
        {children}
      </Text>
    </Box>
  );
};

export default ButtonTab;
