import React from 'react';
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import formatCurrency from '../../../../utils/formatCurrently';

import ModalTahapPermintaan from '../../../modals/userModal/ModalTahapPermintaan';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import { BooleanType } from '../../../../utils/enum/BooleanType';
import { FaWallet } from 'react-icons/fa';
import ModalPayment from '../../../modals/userModal/ModalPayment';
import ParseDate from '../../../core/parseDate';
import { MdLoop } from 'react-icons/md';

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
        <Td textAlign="center">{ParseDate(order.createdAt)}</Td>
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
          {order.status.status_transaction === TransactionTypes.IN_PROGRESS && (
            <Badge colorScheme="green" rounded="md" px={3} py={1}>
              Accept
            </Badge>
          )}
        </Td>
        {order.status.status_transaction === TransactionTypes.ACCEPT && (
          <Td>
            <Button
              w="full"
              isDisabled={
                order.status.status_payment === BooleanType.TRUE ? true : false
              }
              onClick={onOpenPayment}
              leftIcon={<FaWallet />}
              size="sm"
              variant="lateksil-solid"
            >
              {order.status.status_payment === BooleanType.TRUE
                ? 'Sudah Bayar'
                : 'Bayar'}
            </Button>
          </Td>
        )}
        {order.status.status_transaction === TransactionTypes.IN_PROGRESS && (
          <Td>
            <Flex
              justify="center"
              alignItems="center"
              p="2"
              bg="#E44E69"
              rounded="md"
              gap={2}
            >
              <MdLoop color="white" />
              <Text color="white">In Progress</Text>
            </Flex>
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
