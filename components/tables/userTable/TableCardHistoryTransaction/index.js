import React from 'react';
import NextLink from 'next/link';
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
import download from 'downloadjs';
import { FaWallet } from 'react-icons/fa';
import { MdCorporateFare } from 'react-icons/md';
import { baseUrl } from '../../../../libs/axios';
import { BooleanType } from '../../../../utils/enum/BooleanType';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import formatCurrency from '../../../../utils/formatCurrently';
import ParseDate from '../../../core/parseDate';
import StatusOrderTransaction from '../../../core/status/StatusOrderTransaction';
import useToastNotification from '../../../hooks/useToastNotification';
import ModalPayment from '../../../modals/userModal/ModalPayment';
import { useRouter } from 'next/router';

const TableCardHistoryTransaction = ({ order }) => {
  const router = useRouter();
  const showToast = useToastNotification();

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
    message_canceled: order.proyek.keterangan_to_client,
  });

  const getFileExtension = (url) => {
    const extension = url.substring(url.lastIndexOf('.') + 1);
    return extension.toLowerCase();
  };

  const handleDownloadKwitansi = (data) => {
    const ImageURL = `${baseUrl}bukti-kwitansi/` + data;

    fetch(ImageURL)
      .then((response) => response.blob())
      .then((blob) => {
        const fileExtension = getFileExtension(ImageURL);
        const fileName = `bukti-${data}.${fileExtension}`;
        download(blob, fileName);
      })
      .catch(() => {
        showToast('Silahkan Download Lagi nanti', 'error');
      });
  };

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
              <Text fontSize="sm" fontWeight="semibold">
                {order.User.company_name}
              </Text>
            </Flex>
            <HStack align="center">
              <Text fontSize="x-small">Tanggal Pemesanan : </Text>
              <Text fontSize="x-small">{ParseDate(order.createdAt)}</Text>
            </HStack>
          </Flex>
          <Spacer />
          <HStack
            display={{ base: 'none', lg: 'block' }}
            borderRightWidth={1}
            p="1"
          >
            <Text mr="2" fontSize="x-small" color={colorKetTransaction}>
              {textKetTransaction}
            </Text>
          </HStack>
          <Badge p="2" colorScheme={colorStatusTransaction}>
            <Text fontSize="xx-small">{textStatusTransaction}</Text>
          </Badge>
        </HStack>
        <NextLink href={`/order/${order?.id}`} passHref>
          <Flex
            direction="column"
            w="full"
            borderBottomWidth={1}
            cursor="pointer"
          >
            <Box p="1">
              <Text fontSize="xs">Nama Pekerjaan </Text>
              <Text mr="2" fontSize="xs" fontWeight="bold" color="blue.700">
                {order.proyek.nama_proyek}
              </Text>
            </Box>
            <Box p="1">
              <Text fontSize="xs">Tujuan Proyek </Text>
              <Text mr="2" fontSize="xs" color="blue.700">
                {order.proyek.tujuan_proyek}
              </Text>
            </Box>
          </Flex>
        </NextLink>
        {order.status.status_transaction === TransactionTypes.ACCEPT && (
          <Flex
            direction="column"
            w="full"
            borderBottomWidth={1}
            cursor="pointer"
          >
            <Box p="1">
              <Text fontSize="xs">Tanggal Pengerjaan </Text>
              <Text mr="2" fontSize="xs">
                {ParseDate(order.proyek.tanggal_mulai)} s/d{' '}
                {ParseDate(order.proyek.tanggal_selesai)}
              </Text>
            </Box>
          </Flex>
        )}
        {order.status.status_transaction === TransactionTypes.IN_PROGRESS && (
          <Flex
            direction="column"
            w="full"
            borderBottomWidth={1}
            cursor="pointer"
          >
            <Box p="1">
              <Text fontSize="xs">Tanggal Pengerjaan </Text>
              <Text mr="2" fontSize="xs">
                {ParseDate(order.proyek.tanggal_mulai)} s/d{' '}
                {ParseDate(order.proyek.tanggal_selesai)}
              </Text>
            </Box>
          </Flex>
        )}
        <HStack p="2" align="center">
          <Text mr="2" fontSize="x-small" color="blue.600">
            {order.itemOrders.length} Pengujian
          </Text>
          <Spacer />
          <Text fontSize="xs">Total Pesanan : </Text>
          <Text fontWeight="bold" color="blue.700" fontSize="sm">
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
                size="sm"
              >
                {order.status.status_payment === BooleanType.TRUE
                  ? 'Sudah Bayar'
                  : 'Bayar'}
              </Button>
            )}
            {order.status.status_transaction ===
              TransactionTypes.IN_PROGRESS && (
              <Button
                w="full"
                variant="lateksil-solid"
                size="sm"
                onClick={() =>
                  handleDownloadKwitansi(order.payment.image_kwitansi)
                }
              >
                Bukti Kwitansi
              </Button>
            )}
            {order.status.status_transaction === TransactionTypes.DONE && (
              <ButtonGroup>
                <Button
                  w="full"
                  variant="lateksil-solid"
                  size="sm"
                  onClick={() =>
                    handleDownloadKwitansi(order.payment.image_kwitansi)
                  }
                >
                  Bukti Kwitansi
                </Button>
                <Button
                  w="full"
                  variant="lateksil-solid"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `${baseUrl}view-result/download/${order.file_result_pengujian}`
                    )
                  }
                >
                  Download Hasil
                </Button>
              </ButtonGroup>
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
    </>
  );
};

export default TableCardHistoryTransaction;
