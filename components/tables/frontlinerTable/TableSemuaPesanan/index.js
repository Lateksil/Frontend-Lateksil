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
import DetailPengajuanPesanan from '../../../modals/frontlinerModal/detailPengajuanPesananModal';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

const TableSemuaPesanan = ({ order }) => {
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
    if (status === TransactionTypes.ACCEPT) {
      return 'green';
    }
  };
  return (
    <>
      <Tr>
        <Td onClick={onOpenDetailHistory} cursor="pointer">
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{order.User.full_name}</Text>
            <Text>{order.User.company_name}</Text>
          </Flex>
        </Td>
        <Td onClick={onOpenDetailHistory} textAlign="center" cursor="pointer">
          {order.proyek.nama_proyek}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailHistory}>
          {dayjs(order.createdAt).format('dddd, DD-MM-YYYY')}
        </Td>
        <Td
          onClick={onOpenDetailHistory}
          cursor="pointer"
          textAlign="center"
          fontWeight="semibold"
          color="blue.700"
          isNumeric
        >
          Rp{formatCurrency(order.total_price)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailHistory} cursor="pointer">
          <Badge colorScheme="gray" rounded="md" px={3} py={1}>
            Belum Lunas
          </Badge>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailHistory} cursor="pointer">
          <Badge
            colorScheme={statusOrder(order.status.status_persetujuan)}
            rounded="md"
            px={3}
            cursor="pointer"
            py={1}
          >
            {order.status.status_persetujuan === TransactionTypes.WAITING &&
              'Waiting'}
            {order.status.status_persetujuan === TransactionTypes.CANCELED &&
              'Canceled'}
            {order.status.status_persetujuan === TransactionTypes.ACCEPT &&
              'Accept'}
          </Badge>
        </Td>
        <Td>
          {order.status.status_persetujuan === TransactionTypes.WAITING && (
            <Button w="full" colorScheme="blue" size="md">
              Send Manager
            </Button>
          )}
          {order.status.status_persetujuan === TransactionTypes.CANCELED && (
            <Button w="full" colorScheme="orange" size="md">
              Send Costumer
            </Button>
          )}
          {order.status.status_persetujuan === TransactionTypes.ACCEPT && (
            <Button w="full" isDisabled={true} colorScheme="orange" size="md">
              Send Costumer
            </Button>
          )}
        </Td>
      </Tr>

      <DetailPengajuanPesanan
        isOpen={isOpenDetailHistory}
        onClose={onCloseDetailHistory}
      />
    </>
  );
};

export default TableSemuaPesanan;
