import React from 'react';
import {
  Td,
  Tr,
  Avatar,
  Text,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import RolePermissionsModal from '../../../modals/managerModal/rolePermissionsModal';
import { baseUrl } from '../../../../libs/axios';

const TableRolePermissions = ({ user }) => {
  const {
    isOpen: isOpenChangeRole,
    onOpen: onOpenChangeRole,
    onClose: onCloseChangeRole,
  } = useDisclosure();
  return (
    <>
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
        <Td textAlign="center">{user.role}</Td>
        <Td textAlign="center">
          <IconButton
            aria-label="edit roles"
            variant="lateksil-solid"
            onClick={onOpenChangeRole}
            icon={<FaRegEdit size={15} />}
          />
        </Td>
      </Tr>
      <RolePermissionsModal
        id={user.id}
        role={user.role}
        isOpen={isOpenChangeRole}
        onClose={onCloseChangeRole}
      />
    </>
  );
};

export default TableRolePermissions;
