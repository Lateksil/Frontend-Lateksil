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

const DetailPengajuanPesanan = ({ id, isOpen, onClose }) => {
  const {
    data: dataDetailOrder,
    isSuccess,
    isLoading: isLoadingDetailOrder,
  } = useRemoteOrderById({ id });

  const detailOrder = dataDetailOrder?.data;

  console.log('DETAIL', detailOrder);

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
                        <Text>
                         {detailOrder?.User.address}
                        </Text>
                      </VStack>
                    </Box>
                  </Flex>
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
                <HStack mt="1" w="full" align="flex-start">
                  <Box fontSize="sm" w="150px">
                    <Flex justify="space-between">
                      <Text>No. Refrensi</Text>
                      <Text>:</Text>
                    </Flex>
                  </Box>
                  <Box fontSize="sm" w="250px" wordBreak="break-word">
                    <Text fontWeight="semibold">-</Text>
                  </Box>
                </HStack>
                <HStack mt="1" w="full" align="flex-start">
                  <Box fontSize="sm" w="150px">
                    <Flex justify="space-between">
                      <Text>No. Surat</Text>
                      <Text>:</Text>
                    </Flex>
                  </Box>
                  <Box fontSize="sm" w="250px" wordBreak="break-word">
                    <Text fontWeight="semibold">-</Text>
                  </Box>
                </HStack>
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
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Flex direction="column">
                            <Text fontWeight="semibold">Core Drill Aspal</Text>
                            <Text>(SNI 06-6890-2002)</Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>Rp{formatCurrency(15000)}</Td>
                        <Td textAlign="center">Laboratorium</Td>
                        <Td textAlign="center">7 titik</Td>
                        <Td isNumeric>Rp{formatCurrency(1050000)}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <Flex justify="end" py="3">
                    <Text fontSize="xl" fontWeight="semibold">
                      Total : Rp{formatCurrency(15000000)}
                    </Text>
                  </Flex>
                </TableContainer>
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
