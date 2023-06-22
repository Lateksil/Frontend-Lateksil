import {
  Badge,
  Box,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  Icon,
  Button,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { MdCorporateFare } from 'react-icons/md';
import { BooleanType } from '../../../../utils/enum/BooleanType';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import formatCurrency from '../../../../utils/formatCurrently';
import ParseDate from '../../../core/parseDate';
import StatusOrderTransaction from '../../../core/status/StatusOrderTransaction';
import ModalPayment from '../../../modals/userModal/ModalPayment';
import ModalTahapPermintaan from '../../../modals/userModal/ModalTahapPermintaan';

const TableCardHistoryTransaction = ({ order }) => {
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

  const {
    color: colorStatusTransaction,
    text: textStatusTransaction,
    color_ket: colorKetTransaction,
    text_ket: textKetTransaction,
  } = StatusOrderTransaction({
    status: order.status.status_transaction,
  });

  return (
    <>
      <Stack
        boxShadow="base"
        w="full"
        p={{ base: '2', lg: '5' }}
        borderWidth={2}
        rounded="md"
      >
        <HStack p="2" align="center" borderBottomWidth={1}>
          <Flex direction="column">
            <Flex align="center" gap={2}>
              <Icon w={5} h={5} as={MdCorporateFare} />
              <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'xl' }}>
                {order.User.company_name}
              </Text>
            </Flex>
            <HStack align="center">
              <Text fontSize={{ base: 'x-small', lg: 'sm' }}>
                Tanggal Pemesanan :{' '}
              </Text>
              <Text fontSize={{ base: 'x-small', lg: 'sm' }}>
                {ParseDate(order.createdAt)}
              </Text>
            </HStack>
          </Flex>
          <Spacer />
          <HStack
            display={{ base: 'none', lg: 'block' }}
            borderRightWidth={1}
            p="1"
          >
            <Text mr="2" fontSize="sm" color={colorKetTransaction}>
              {textKetTransaction}
            </Text>
          </HStack>
          <Badge p="2" colorScheme={colorStatusTransaction}>
            {textStatusTransaction}
          </Badge>
        </HStack>
        <Flex
          direction="column"
          w="full"
          borderBottomWidth={1}
          cursor="pointer"
          onClick={onOpenDetailHistory}
        >
          <Box p="1">
            <Text fontSize="sm">Nama Proyek </Text>
            <Text mr="2" fontWeight="bold" color="blue.700">
              {order.proyek.nama_proyek}
            </Text>
          </Box>
          <Box p="1">
            <Text fontSize="sm">Tujuan Proyek </Text>
            <Text mr="2" color="blue.700">
              {order.proyek.tujuan_proyek}
            </Text>
          </Box>
        </Flex>
        {order.status.status_transaction === TransactionTypes.ACCEPT && (
          <Flex
            direction="column"
            w="full"
            borderBottomWidth={1}
            cursor="pointer"
          >
            <Box p="1">
              <Text fontSize="sm">Tanggal Pengerjaan </Text>
              <Text mr="2" fontSize="sm">
                {ParseDate(order.proyek.tanggal_mulai)} s/d{' '}
                {ParseDate(order.proyek.tanggal_selesai)}
              </Text>
            </Box>
          </Flex>
        )}
        <HStack
          display={{ base: 'block', lg: 'none' }}
          borderBottomWidth={1}
          p="2"
        >
          <Text mr="2" fontSize="x-small" color="orange.600">
            Sedang Menunggu Persetujuan, Mohon ditunggu ya
          </Text>
        </HStack>

        <HStack p="2" align="center">
          <Spacer />
          <Text fontSize="sm">Total Pesanan : </Text>
          <Text
            fontWeight="bold"
            color="blue.700"
            fontSize={{ base: 'md', lg: '2xl' }}
          >
            Rp{formatCurrency(order.total_price)}
          </Text>
        </HStack>
        <HStack>
          <Spacer />
          <ButtonGroup>
            {order.status.status_transaction === TransactionTypes.ACCEPT && (
              <Button
                w="full"
                isDisabled={
                  order.status.status_payment === BooleanType.TRUE
                    ? true
                    : false
                }
                onClick={onOpenPayment}
                leftIcon={<FaWallet />}
                variant="lateksil-solid"
              >
                {order.status.status_payment === BooleanType.TRUE
                  ? 'Sudah Bayar'
                  : 'Bayar'}
              </Button>
            )}
          </ButtonGroup>
        </HStack>
      </Stack>
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

export default TableCardHistoryTransaction;
