import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { BooleanType } from '../../../../utils/enum/BooleanType';

const TableMetodePembayaran = ({ account }) => {
  return (
    <>
      <Tr>
        <Td textAlign="center">{account.bank}</Td>
        <Td textAlign="center">{account.name_bank}</Td>
        <Td textAlign="center">{account.type_transaction}</Td>
        <Td textAlign="center">{account.no_rek}</Td>
        <Td textAlign="center">
          <Button
            colorScheme={
              account.is_Active === BooleanType.TRUE ? 'green' : 'gray'
            }
          >
            {account.is_Active === BooleanType.TRUE ? 'Active' : 'Non-Active'}
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default TableMetodePembayaran;
