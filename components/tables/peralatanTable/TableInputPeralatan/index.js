import React from 'react';
import { Flex, Td, Text, Tr, Icon } from '@chakra-ui/react';
import { GrFormClose } from 'react-icons/gr';

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
            <Flex
              key={i}
              border="1px solid black"
              justify="space-between"
              rounded="md"
              p="2"
              shadow="sm"
              mb="1"
            >
              <Text>{alat.nama_alat}</Text>
              <Flex alignItems="center" mr={1} cursor="pointer">
                <Icon as={GrFormClose} boxSize={5} />
              </Flex>
            </Flex>
          ))}
        </Td>
      </Tr>
    </>
  );
};

export default TableInputPeralatan;
