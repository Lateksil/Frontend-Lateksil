import React from 'react';
import { Badge, Td, Text, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const TableDataTeknisi = ({ teknisi }) => {
  const router = useRouter();

  const onGoingStatus = teknisi.TeknisiPengujians.some(
    (item) => item.status_penugasan === '0'
  );

  return (
    <Tr>
      <Td textAlign="center">{teknisi.full_name}</Td>
      <Td textAlign="center">{teknisi.email}</Td>
      <Td textAlign="center">{teknisi.no_whatsapp}</Td>
      <Td textAlign="center">{teknisi.TeknisiPengujians.length}</Td>
      <Td textAlign="center">
        <Text
          color="blackAlpha.700"
          fontWeight="semibold"
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
          onClick={() => router.push(`/manager/data-teknisi/${teknisi.id}`)}
        >
          Lihat
        </Text>
      </Td>
      <Td textAlign="center">
        <Badge
          p="2"
          alignSelf="start"
          colorScheme={onGoingStatus ? 'yellow' : 'green'}
          rounded="md"
        >
          {onGoingStatus ? 'on-going' : 'stand-by'}
        </Badge>
      </Td>
    </Tr>
  );
};

export default TableDataTeknisi;
