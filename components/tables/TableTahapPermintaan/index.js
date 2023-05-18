import React from 'react';
import { Badge, Td, Tr, useDisclosure } from '@chakra-ui/react';

import formatCurrency from '../../../utils/formatCurrently';

import ModalTahapPermintaan from '../../modals/userModal/ModalTahapPermintaan';
import { TransactionTypes } from '../../../utils/enum/TransactionTypes';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

const TableTahapPermintaan = ({ order }) => {
  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();

  const statusOrder = (status) => {
    if (status === TransactionTypes.WAITING) {
      return 'orange';
    }
    if (status === TransactionTypes.CANCELED) {
      return 'red';
    }
  };
  dayjs.locale('id');

  return (
    <>
      <Tr key={order.id}>
        <Td textAlign="center">{order.User.full_name}</Td>
        <Td textAlign="center">{order.User.company_name}</Td>
        <Td textAlign="center">{order.proyek.nama_proyek}</Td>
        <Td textAlign="center">
          {dayjs(order.createdAt).format('dddd, DD-MM-YYYY')}
        </Td>
        <Td textAlign="center" fontWeight="semibold" color="blue.700">
          Rp{formatCurrency(order.total_price)}
        </Td>
        <Td
          textAlign="center"
          textDecoration="underline"
          cursor="pointer"
          _hover={{ color: 'blue' }}
          onClick={onOpenDetailHistory}
        >
          Detail
        </Td>
        <Td textAlign="center">
          <Badge
            colorScheme={statusOrder(order.status.status_transaction)}
            rounded="md"
            px={3}
            py={1}
          >
            {order.status.status_transaction === TransactionTypes.WAITING
              ? 'Waiting'
              : 'canceled'}
          </Badge>
        </Td>
      </Tr>
      <ModalTahapPermintaan
        order={order}
        isOpen={isOpenDetailHistory}
        onClose={onCloseDetailHistory}
      />
    </>
  );
};

export default TableTahapPermintaan;
