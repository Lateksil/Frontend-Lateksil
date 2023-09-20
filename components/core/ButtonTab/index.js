import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ButtonTab = ({ label, count = 0, value, children, ...props }) => {
  return (
    <Box
      w="max-content"
      cursor="pointer"
      rounded="md"
      display="flex"
      alignItems="center"
      border={label === value ? '1px solid #102D62' : '1px solid gray'}
      p="3"
      bg={label === value ? 'blue.700' : 'gray.100'}
      {...props}
    >
      <Text
        textAlign="center"
        fontSize="xx-small"
        color={label === value ? 'white' : 'gray.500'}
        fontWeight="normal"
      >
        {children}
      </Text>
      {count !== 0 && (
        <Box
          color={label === value ? 'white' : 'gray.500'}
          top={-2}
          px="1"
          ml="1"
          right={-1}
          zIndex={11}
          rounded="sm"
        >
          <Text fontWeight="bold" fontSize="xx-small">
            {count}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ButtonTab;
