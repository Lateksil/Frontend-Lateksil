import React from 'react';
import { Avatar, Badge, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { baseUrl } from '../../../../libs/axios';

const TableDataCostumer = ({ user }) => {
  return (
    <Tr>
      <Td>
        <Flex gap={3}>
          <Avatar
            loading="lazy"
            variant="outline"
            src={`${baseUrl}profile/${user?.image_profile}`}
            name={user?.full_name}
            size={{ base: 'sm', md: 'md' }}
          />
          <Flex direction="column" justify="center">
            <Text fontWeight="bold">{user.company_name}</Text>
            <Text>{user.full_name}</Text>
          </Flex>
        </Flex>
      </Td>
      <Td textAlign="center">{user.email}</Td>
      <Td textAlign="center">{user.no_whatsapp}</Td>
      <Td textAlign="center" w="20%">
        {user.address}
      </Td>
      <Td textAlign="center">
        <Badge
          colorScheme={user.isActive_payment === 'active' ? 'green' : 'red'}
          rounded="md"
          px={3}
          py={1}
        >
          {user.isActive_payment}
        </Badge>
      </Td>
    </Tr>
  );
};

export default TableDataCostumer;
