import React from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Icon,
  Avatar,
  VStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import { MdCall, MdCorporateFare, MdEmail } from 'react-icons/md';
import useRemoteOrderById from '../../../hooks/remote/useRemoteOrderById';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import TableToName from '../../../core/tableToName';
import ParseDate from '../../../core/parseDate';

const DetailPengajuanPesanan = ({ id, isOpen, onClose }) => {
  const {
    data: dataDetailOrder,
    isSuccess,
    isLoading: isLoadingDetailOrder,
  } = useRemoteOrderById({ id });

  const detailOrder = dataDetailOrder?.data;

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

  console.log('Detail ', detailOrder);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="4xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalCloseButton />
        <ModalHeader>
          <Text>Detail Pengajuan</Text>
        </ModalHeader>
        <ModalBody>
          <Stack pb="10" spacing={10}>
            {isLoadingDetailOrder ? (
              <Center my="1">
                <Spinner />
              </Center>
            ) : (
              <Flex direction="column">
                <Flex w="full" borderBottomWidth={2} py="2">
                  <Text fontWeight="semibold" fontSize="xl">
                    Data Pelanggan
                  </Text>
                  <Spacer />
                  <Flex align="center">
                    <Icon w={5} h={5} as={MdCorporateFare} />
                    <Text ml={2}> {detailOrder.User.company_name}</Text>
                  </Flex>
                </Flex>
                <Box py="2">
                  <Flex>
                    <Flex flex={0.5} justify="center" align="center">
                      <Avatar src="" name="Deva Aji Saputra" size="xl" />
                    </Flex>
                    <Box h="full" flex={1.5}>
                      <VStack w="full" align="start">
                        <Text fontSize="xl" fontWeight="semibold">
                          {detailOrder.User.full_name}
                        </Text>
                        <HStack>
                          <Icon w={5} h={5} as={MdEmail} />
                          <Text>{detailOrder.User.email}</Text>
                        </HStack>
                        <HStack>
                          <Icon w={5} h={5} as={MdCall} />
                          <Text>{detailOrder.proyek.no_whatsApp_proyek}</Text>
                        </HStack>
                        <Text>{detailOrder?.User.address}</Text>
                      </VStack>
                    </Box>
                  </Flex>
                </Box>
                <Flex w="full" borderBottomWidth={2} py="2">
                  <Text fontWeight="semibold">Detail Produk</Text>
                  <Spacer />
                  <HStack>
                    <Badge colorScheme="gray" rounded="md" px={3} py={1}>
                      Belum Lunas
                    </Badge>
                    <Badge
                      colorScheme={statusOrder(
                        detailOrder.status.status_persetujuan
                      )}
                      rounded="md"
                      px={3}
                      cursor="pointer"
                      py={1}
                    >
                      {detailOrder.status.status_persetujuan ===
                        TransactionTypes.WAITING && 'Waiting'}
                      {detailOrder.status.status_persetujuan ===
                        TransactionTypes.CANCELED && 'Canceled'}
                      {detailOrder.status.status_persetujuan ===
                        TransactionTypes.ACCEPT && 'Accept'}
                    </Badge>
                  </HStack>
                </Flex>
                <TableToName
                  label="Nama Proyek"
                  value={detailOrder.proyek.nama_proyek}
                />
                <TableToName
                  label="Tujuan Pengujian"
                  value={detailOrder.proyek.tujuan_proyek}
                />

                <TableToName
                  label="No. Refrensi"
                  value={detailOrder.proyek.keterangan_to_client}
                />
                <Flex mt="5">
                  <Box flex={1}>
                    <TableToName
                      label="No. Refrensi"
                      value={detailOrder.proyek.no_refrensi}
                    />
                    <TableToName
                      label="No. Surat"
                      value={detailOrder.proyek.no_surat}
                    />
                    <TableToName
                      label="No. Identifikasi"
                      value={detailOrder.proyek.no_identifikasi}
                    />
                  </Box>
                  <Box flex={1}>
                    <TableToName
                      label="Tanggal Pendaftaran"
                      value={ParseDate(detailOrder.createdAt)}
                    />
                    <TableToName
                      label="Tanggal Mulai"
                      value={ParseDate(detailOrder.proyek.tanggal_mulai)}
                    />
                    <TableToName
                      label="Tanggal Selesai"
                      value={ParseDate(detailOrder.proyek.tanggal_selesai)}
                    />
                  </Box>
                </Flex>
                <TableContainer w="full" mt="25px">
                  <Table size="sm" variant="striped" colorScheme="facebook">
                    <Thead>
                      <Tr>
                        <Th>Jenis Pengujian</Th>
                        <Th isNumeric>Harga Satuan</Th>
                        <Th textAlign="center">Pengujian</Th>
                        <Th textAlign="center">jumlah</Th>
                        <Th isNumeric>Total</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {isSuccess &&
                        detailOrder.itemOrders.map((item, i) => (
                          <Tr key={i}>
                            <Td>
                              <Flex direction="column">
                                <Text fontWeight="semibold">
                                  {item.Pengujian.jenis_pengujian}
                                </Text>
                                <Text>{item.Pengujian.code}</Text>
                              </Flex>
                            </Td>
                            <Td isNumeric>
                              Rp{formatCurrency(item.Pengujian.price)}
                            </Td>
                            <Td textAlign="center">
                              {item.Pengujian.tempat_pengujian}
                            </Td>
                            <Td textAlign="center">
                              {item.OrderPengujian.quantity}{' '}
                              {item.Pengujian.sampler}
                            </Td>
                            <Td isNumeric fontWeight="semibold">
                              Rp
                              {formatCurrency(
                                parseInt(item.OrderPengujian.quantity) *
                                  parseInt(item.Pengujian.price)
                              )}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex w="full" justify="end" py="3">
                  <Text fontSize="xl" fontWeight="bold">
                    Total Harga: Rp{formatCurrency(detailOrder.total_price)}
                  </Text>
                </Flex>
              </Flex>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onClose} border="1px">
              Tutup
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailPengajuanPesanan;
