import React from 'react';
import { Avatar, Badge, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { baseUrl } from '../../../../libs/axios';

const TableDataTeknisi = ({ teknisi }) => {
  const router = useRouter();

  const onGoingStatus = teknisi.TeknisiPengujians.some(
    (item) => item.status_penugasan === '0'
  );

  return (
    <Tr>
      <Td>
        <Flex gap={3}>
          <Avatar
            loading="lazy"
            variant="outline"
            src={`${baseUrl}profile/${teknisi?.image_profile}`}
            name={teknisi?.full_name}
            size={{ base: 'sm', md: 'md' }}
          />
          <Flex direction="column" justify="center">
            <Text fontWeight="bold">{teknisi.company_name}</Text>
            <Text>{teknisi.full_name}</Text>
          </Flex>
        </Flex>
      </Td>
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
