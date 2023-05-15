import React from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
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

const TablePengajuanPesanan = ({ order }) => {
  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();

  const {
    isOpen: isOpenSendToManager,
    onOpen: onOpenSendToManager,
    onClose: onCLoseSendToManager,
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
            <Button
              w="full"
              colorScheme="blue"
              size="md"
              onClick={onOpenSendToManager}
              isDisabled={order.status.is_send_manager}
            >
              {order.status.is_send_manager ? 'Terikirim' : 'Send Manager'}
            </Button>
          )}
          {order.status.status_persetujuan === TransactionTypes.CANCELED && (
            <Button
              w="full"
              colorScheme="orange"
              size="md"
              isDisabled={order.status.is_send_costumer}
            >
              {order.status.is_send_costumer ? 'Terikirim' : 'Send Costumer'}
            </Button>
          )}
          {order.status.status_persetujuan === TransactionTypes.ACCEPT && (
            <Button
              w="full"
              colorScheme="orange"
              size="md"
              isDisabled={order.status.is_send_costumer}
            >
              {order.status.is_send_costumer ? 'Terikirim' : 'Send Costumer'}
            </Button>
          )}
        </Td>
      </Tr>

      <Modal
        isOpen={isOpenSendToManager}
        onClose={onCLoseSendToManager}
        scrollBehavior="inside"
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent mx="4" overflow="hidden">
          <ModalCloseButton />
          <ModalHeader>
            <Text>Input Pengajuan Pemesanan</Text>
          </ModalHeader>
          <ModalBody>
            <Stack pb="10">
              <FormControl id="company_name" isRequired>
                <FormLabel>No. Refrensi</FormLabel>
                <Input
                  value="123UBL2019"
                  type="text"
                  placeholder="Nama Perusahaan"
                />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>No. Identifikasi</FormLabel>
                <Input
                  value="CE76843DE"
                  type="text"
                  placeholder="Nama Perusahaan"
                />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>No. Surat</FormLabel>
                <Input
                  value="SK/12/23/V-III"
                  type="text"
                  placeholder="Nama Perusahaan"
                />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>Tanggal Mulai</FormLabel>
                <Input type="date" placeholder="Nama Perusahaan" />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>Tanggal Selesai</FormLabel>
                <Input type="date" placeholder="Nama Perusahaan" />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button border="1px" onClick={onCLoseSendToManager}>
                Batal
              </Button>
              <Button
                type="submit"
                variant="solid"
                bg="blue.700"
                _hover={{ bg: 'blue.800' }}
                color="white"
                rounded="md"
              >
                Kirim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DetailPengajuanPesanan
        id={order.id}
        isOpen={isOpenDetailHistory}
        onClose={onCloseDetailHistory}
      />
    </>
  );
};

export default TablePengajuanPesanan;
