import React from 'react';
import {
  Badge,
  Box,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import formatCurrency from '../../../utils/formatCurrently';

import ModalTahapPermintaan from '../../modals/userModal/ModalTahapPermintaan';
import LateksilImage from '../../../assets/images/testing-ilustrator.jpg';
import NextImage from '../../core/nextimage';
import useAuthUserStore from '../../../store/useAuthUserStore';
import { TransactionTypes } from '../../../utils/enum/TransactionTypes';

const TableTahapPermintaan = ({ order, isLoading }) => {
  const id = useAuthUserStore((state) => state.id);
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

  if (!id) {
    return (
      <Flex flexDir="column" align="center">
        <Box width={200} height={200}>
          <NextImage
            src={LateksilImage}
            alt="Civil Engginering Illustration"
            layout="responsive"
            placeholder="blur"
          />
        </Box>
        <Text textAlign="center" fontWeight="semibold">
          Belum Ada Order? Silahkan Masuk Terlebih Dahulu
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Tr key={order.id}>
        <Td textAlign="center">{order.User.full_name}</Td>
        <Td textAlign="center">{order.User.company_name}</Td>
        <Td textAlign="center">{order.proyek.nama_proyek}</Td>
        <Td textAlign="center">Belum ada</Td>
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
            colorScheme={statusOrder(order.status.status_persetujuan)}
            rounded="md"
            px={3}
            py={1}
          >
            {order.status.status_persetujuan === TransactionTypes.WAITING
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
