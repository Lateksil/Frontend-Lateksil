import React from 'react';
import { Badge, Button, Td, Tr, useDisclosure } from '@chakra-ui/react';

import formatCurrency from '../../../../utils/formatCurrently';

import ModalTahapPermintaan from '../../../modals/userModal/ModalTahapPermintaan';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { FaWallet } from 'react-icons/fa';
import ModalPayment from '../../../modals/userModal/ModalPayment';
dayjs.locale('id');

const TableTahapTransaction = ({ order }) => {
  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();

  const {
    isOpen: isOpenPayment,
    onOpen: onOpenPayment,
    onClose: onClosePayment,
  } = useDisclosure();

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
          {order.status.status_transaction === TransactionTypes.WAITING && (
            <Badge colorScheme="orange" rounded="md" px={3} py={1}>
              Waiting
            </Badge>
          )}
          {order.status.status_transaction === TransactionTypes.CANCELED && (
            <Badge colorScheme="red" rounded="md" px={3} py={1}>
              Canceled
            </Badge>
          )}
          {order.status.status_transaction === TransactionTypes.ACCEPT && (
            <Badge colorScheme="green" rounded="md" px={3} py={1}>
              Accept
            </Badge>
          )}
        </Td>
        {order.status.status_transaction === TransactionTypes.ACCEPT && (
          <Td>
            <Button
              onClick={onOpenPayment}
              leftIcon={<FaWallet />}
              size="sm"
              variant="lateksil-solid"
            >
              Bayar
            </Button>
          </Td>
        )}
      </Tr>
      <ModalPayment
        isOpen={isOpenPayment}
        onClose={onClosePayment}
        id={order.id}
        full_name={order.User.full_name}
        company_name={order.User.company_name}
        total_price={order.total_price}
      />
      <ModalTahapPermintaan
        order={order}
        isOpen={isOpenDetailHistory}
        onClose={onCloseDetailHistory}
      />
    </>
  );
};

export default TableTahapTransaction;
