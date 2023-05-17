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
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useForm } from 'react-hook-form';
import useMutationUpdateProyek from '../../../hooks/mutation/put/useMutationUpdateProyek';
dayjs.locale('id');

const TablePengajuanPesananManager = ({ order }) => {
  const { mutate: mutateSendToManager } = useMutationUpdateProyek();
  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();

  const { register, handleSubmit, reset } = useForm();

  const {
    isOpen: isOpenSendToManager,
    onOpen: onOpenSendToManager,
    onClose: onCLoseSendToManager,
  } = useDisclosure();

  const onSubmit = (data) => {
    const formData = {
      id: order.id,
      no_refrensi: data.no_refrensi,
      no_identifikasi: data.no_identifikasi,
      no_surat: data.no_surat,
      tanggal_mulai: data.tanggal_mulai,
      tanggal_selesai: data.tanggal_selesai,
    };
    mutateSendToManager({ formData: formData });

    onCLoseSendToManager();
    reset();
  };

  console.log('ORDER', order);

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
          {dayjs(order.proyek.tanggal_mulai).format('dddd, DD-MM-YYYY')}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailHistory} cursor="pointer">
          {dayjs(order.proyek.tanggal_selesai).format('dddd, DD-MM-YYYY')}
        </Td>
        <Td>aksi</Td>
      </Tr>

      <Modal
        isOpen={isOpenSendToManager}
        onClose={onCLoseSendToManager}
        scrollBehavior="inside"
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          overflow="hidden"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalCloseButton />
          <ModalHeader>
            <Text>Input Pengajuan Pemesanan</Text>
          </ModalHeader>
          <ModalBody>
            <Stack pb="10">
              <FormControl id="no_refrensi" isRequired>
                <FormLabel>No. Refrensi</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Refrensi"
                  {...register('no_refrensi')}
                />
              </FormControl>
              <FormControl id="no_identifikasi" isRequired>
                <FormLabel>No. Identifikasi</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Identifikasi"
                  {...register('no_identifikasi')}
                />
              </FormControl>
              <FormControl id="no_surat" isRequired>
                <FormLabel>No. Surat</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Surat"
                  {...register('no_surat')}
                />
              </FormControl>
              <FormControl id="tanggal_mulai" isRequired>
                <FormLabel>Tanggal Mulai</FormLabel>
                <Input type="datetime-local" {...register('tanggal_mulai')} />
              </FormControl>
              <FormControl id="tanggal_selesai" isRequired>
                <FormLabel>Tanggal Selesai</FormLabel>
                <Input type="datetime-local" {...register('tanggal_selesai')} />
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

export default TablePengajuanPesananManager;
