import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';

const TableTaskPengujian = () => {
  return (
    <Tr>
      <Td cursor="pointer">
        <Flex direction="column" w="full">
          <Text fontWeight="semibold">Nama Lengkap</Text>
          <Text>Perusahaan</Text>
        </Flex>
      </Td>
      <Td textAlign="center" cursor="pointer">
        SK/12/23/V-III
      </Td>
      <Td textAlign="center" cursor="pointer">
        Pembuatan Kubus
      </Td>
      <Td textAlign="center" cursor="pointer">
        Pembuatan Kubus
      </Td>
      <Td textAlign="center" cursor="pointer">
        Pembuatan Kubus
      </Td>
      <Td textAlign="center" cursor="pointer">
        Pembuatan Kubus
      </Td>
      <Td textAlign="center" cursor="pointer">
        <Button variant="lateksil-solid">Kerjakan</Button>
      </Td>
    </Tr>
  );
};

export default TableTaskPengujian;
