import React from 'react';
import { Flex, Td, Text, Tr } from '@chakra-ui/react';

const TableInputPeralatan = ({ pengujian }) => {
  return (
    <>
      <Tr>
        <Td>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.jenis_pengujian}</Text>
            <Text color="orange.600">{pengujian.code}</Text>
          </Flex>
        </Td>
        <Td textAlign="center">{pengujian.category}</Td>
        <Td textAlign="center">
          {pengujian.peralatan.map((alat, i) => (
            <Text key={i}>{alat.nama_alat}</Text>
          ))}
        </Td>
      </Tr>
    </>
  );
};

export default TableInputPeralatan;
