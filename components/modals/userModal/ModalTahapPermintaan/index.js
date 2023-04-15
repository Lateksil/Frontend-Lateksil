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
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';

const ModalTahapPermintaan = ({ isOpen, onClose }) => {
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
            <VStack>
              <Flex
                w="full"
                borderBottomWidth={2}
                py="2"
              >
                <Text fontWeight="semibold">Status Pemesanan</Text>
                <Spacer/>
                <Badge ml="3" colorScheme="orange" rounded="md" px={3} py={1}>
                  Waiting
                </Badge>
              </Flex>
              <Box w="full" py="2">
                <Text fontWeight="semibold" color="yellow.600">
                  Pada Tahap ini sedang Menunggu Persetujuan, Mohon ditunggu ya.
                </Text>
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
            </VStack>
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
