import React from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import useRemoteOrderById from '../../../hooks/remote/useRemoteOrderById';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';

const ModalTahapPermintaan = ({ order, isOpen, onClose }) => {
  const {
    data: dataDetailOrder,
    isSuccess,
    isLoading: isLoadingDetailOrder,
  } = useRemoteOrderById({ id: order.id });

  const detailOrder = dataDetailOrder?.data;

  const statusOrder = (status) => {
    if (status === TransactionTypes.WAITING) {
      return 'orange';
    }
    if (status === TransactionTypes.CANCELED) {
      return 'red';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalCloseButton />
        <ModalHeader>
          <Text>Detail Pemesanan</Text>
        </ModalHeader>
        <ModalBody>
          <Stack pb="10">
            {isLoadingDetailOrder ? (
              <Center my="1">
                <Spinner />
              </Center>
            ) : (
              <VStack>
                <Flex w="full" borderBottomWidth={2} py="2">
                  <Text fontWeight="semibold">Status Pemesanan</Text>
                  <Spacer />
                  <Badge
                    ml="3"
                    colorScheme={statusOrder(
                      detailOrder.status.status_persetujuan
                    )}
                    rounded="md"
                    px={3}
                    py={1}
                  >
                    {detailOrder.status.status_persetujuan ===
                    TransactionTypes.WAITING
                      ? 'Waiting'
                      : 'canceled'}
                  </Badge>
                </Flex>
                <Box w="full" py="2">
                  {detailOrder.status.status_persetujuan ===
                  TransactionTypes.WAITING ? (
                    <Text
                      fontWeight="semibold"
                      color={
                        detailOrder.status.status_persetujuan ===
                        TransactionTypes.WAITING
                          ? 'yellow.600'
                          : 'red.600'
                      }
                    >
                      Pada Tahap ini sedang Menunggu Persetujuan, Mohon ditunggu
                      ya.
                    </Text>
                  ) : (
                    <Box>
                      <Text>
                        Mohon Maaf Atas Nama {detailOrder.User.full_name} dari
                        Perusahaan {detailOrder.User.company_name}, Keterangan
                      </Text>{' '}
                      <Text as="span" fontWeight="semibold" color="red.600">
                        Ditolak
                      </Text>{' '}
                      Karena
                      <Text as="span" color="red.600" fontWeight="semibold">
                        {' '}
                        &quot; Tidak dapat di uji untuk saat ini &quot;
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box w="full" borderBottomWidth={2} py="2">
                  <Text fontWeight="semibold">Detail Produk</Text>
                </Box>
                <HStack mt="1" w="full" align="flex-start">
                  <Box fontSize="sm" w="150px">
                    <Flex justify="space-between">
                      <Text>Nama Proyek</Text>
                      <Text>:</Text>
                    </Flex>
                  </Box>
                  <Box fontSize="sm" w="250px" wordBreak="break-word">
                    <Text fontWeight="semibold">Pembuatan Kubus</Text>
                  </Box>
                </HStack>
                <HStack mt="1" w="full" align="flex-start">
                  <Box fontSize="sm" w="150px">
                    <Flex justify="space-between">
                      <Text>Tujuan Pengujian</Text>
                      <Text>:</Text>
                    </Flex>
                  </Box>
                  <Box fontSize="sm" w="250px" wordBreak="break-word">
                    <Text fontWeight="semibold">Untuk Penelitian</Text>
                  </Box>
                </HStack>
                <TableContainer w="full">
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
              </VStack>
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

export default ModalTahapPermintaan;
