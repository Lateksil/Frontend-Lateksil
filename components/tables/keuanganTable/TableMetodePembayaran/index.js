import React from 'react';
import { Button, IconButton, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { BooleanType } from '../../../../utils/enum/BooleanType';
import { FiTrash } from 'react-icons/fi';
import ActiveMethodModal from '../../../modals/keuanganModal/activeMethodModal';

const TableMetodePembayaran = ({ account }) => {
  const {
    isOpen: isOpenActiveMethod,
    onOpen: onOpenActiveMethod,
    onClose: onCloseActiveMethod,
  } = useDisclosure();

  return (
    <>
      <Tr>
        <Td textAlign="center">{account.bank}</Td>
        <Td textAlign="center">{account.name_bank}</Td>
        <Td textAlign="center">{account.type_transaction}</Td>
        <Td textAlign="center">{account.no_rek}</Td>
        <Td textAlign="center">
          {account.is_Active === BooleanType.TRUE ? (
            <Button w="full" colorScheme="green">
              Active
            </Button>
          ) : (
            <Button w="full" colorScheme="red" onClick={onOpenActiveMethod}>
              Non-Active
            </Button>
          )}
        </Td>
        <Td>
          <IconButton
            aria-label="Delete Method Transaction"
            colorScheme="red"
            icon={<FiTrash />}
          />
        </Td>
      </Tr>
      <ActiveMethodModal
        id={account.id}
        isOpen={isOpenActiveMethod}
        onClose={onCloseActiveMethod}
      />
    </>
  );
};

export default TableMetodePembayaran;
