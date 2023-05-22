import { Badge, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';

const TableProsesPengujian = () => {
  return (
    <Tr>
      <Td>
        <Flex direction="column" w="full">
          <Text fontWeight="semibold">Deva Aji Saputra</Text>
          <Text>PT. Devlops</Text>
        </Flex>
      </Td>
      <Td textAlign="center">PT. Depdep</Td>
      <Td textAlign="center">SK/12/23/V-III</Td>
      <Td textAlign="center">
        <Badge w="full" colorScheme="green" rounded="md" px={3} py={1}>
          Lunas
        </Badge>
      </Td>
      <Td textAlign="center">
        <Button w="full" colorScheme="green" size="md">
          Lihat
        </Button>
      </Td>
      <Td textAlign="center" w="15%">
        <Button w="full" colorScheme="pink" size="md">
          In Proggress
        </Button>
      </Td>
      <Td textAlign="center">
        <Button w="full" variant="lateksil-solid" size="md">
          Kirim
        </Button>
      </Td>
    </Tr>
  );
};

export default TableProsesPengujian;
