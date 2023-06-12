import { Badge, Text, Button, Flex, Td, Tr } from '@chakra-ui/react';
import React from 'react';

const TablePengajuanAlat = () => {
  return (
    <>
      <Tr>
        <Td>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">Deva Aji Saputra</Text>
            <Text color="orange.blue">PT. Depdep</Text>
          </Flex>
        </Td>
        <Td textAlign="center">Pembuatan Kubus</Td>
        <Td>
          <Flex
            direction="column"
            w="100%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="pre-wrap"
          >
            <Text borderBottom="1px solid black" p="1" mb="1">
              Ketebalan Jalan Aspal dengan Alat Core Drill
            </Text>
            <Text borderBottom="1px solid black" p="1" mb="1">
              Ketebalan Jalan
            </Text>
            <Text borderBottom="1px solid black" p="1" mb="1">
              Ketebalan Jalan Aspal dengan Alat Core Drill
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex
            direction="column"
            w="100%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="pre-wrap"
          >
            <Text borderBottom="1px solid black" p="1" mb="1">
              Ketebalan Jalan Aspal dengan Alat Core Drill
            </Text>
            <Text borderBottom="1px solid black" p="1" mb="1">
              Ketebalan Jalan
            </Text>
            <Text borderBottom="1px solid black" p="1" mb="1">
              Ketebalan Jalan Aspal dengan Alat Core Drill
            </Text>
          </Flex>
        </Td>
        <Td textAlign="center">
          <Badge colorScheme="green">Lunas</Badge>
        </Td>
        <Td textAlign="center">
          <Button variant="lateksil-solid">Siapkan</Button>
        </Td>
      </Tr>
    </>
  );
};

export default TablePengajuanAlat;
