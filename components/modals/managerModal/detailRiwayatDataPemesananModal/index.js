import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaTasks, FaUser } from 'react-icons/fa';
import { MdCall, MdCorporateFare, MdEmail } from 'react-icons/md';
import { AiOutlineProject } from 'react-icons/ai';
import useRemoteDetailRiwayatPemesanan from '../../../hooks/remote/useRemoteDetailRiwayatPemesanan';
import formatCurrency from '../../../../utils/formatCurrently';
import { useRouter } from 'next/router';
import { baseUrl } from '../../../../libs/axios';

const DetailRiwayatDataPemesananModal = ({ id, isOpen, onClose }) => {
  const router = useRouter();
  const { data: dataDetailRiwayatPemesanan } = useRemoteDetailRiwayatPemesanan({
    id: id,
  });

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        motionPreset="slideInBottom"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Pemesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={5}>
              <Flex
                bg={
                  dataDetailRiwayatPemesanan?.data?.status_penugasan === '1'
                    ? `green.100`
                    : `orange.100`
                }
                rounded="md"
                direction="column"
                gap={3}
                borderBottomWidth="1px"
                p="4"
              >
                <Badge
                  p="2"
                  alignSelf="start"
                  colorScheme={
                    dataDetailRiwayatPemesanan?.data?.status_penugasan === '1'
                      ? `green`
                      : `orange`
                  }
                  variant="outline"
                  rounded="md"
                >
                  {dataDetailRiwayatPemesanan?.data?.status_penugasan === '1'
                    ? `Selesai`
                    : `on-going`}
                </Badge>
                <Text
                  color={
                    dataDetailRiwayatPemesanan?.data?.status_penugasan === '1'
                      ? `green.600`
                      : `orange.600`
                  }
                >
                  {dataDetailRiwayatPemesanan?.data?.status_penugasan === '1'
                    ? `Teknisi telah berhasil menyelesaikan pesanan ini! Adapun riwayat pengerjaan dapat di lihat pada detail pesanan di bawah ini`
                    : `Teknisi Sedang Mengerjakan Pengujian ini, adapun spesifikasi pengerjaan dapat dilihat pada detail pemesanan di bawah ini`}
                </Text>
              </Flex>
              <Flex direction="column" mt={8}>
                <Flex align="center" gap={2} borderBottomWidth="1px" pb="4">
                  <Icon w={3} h={3} as={FaUser} />
                  <Text
                    fontWeight="semibold"
                    fontSize={{ base: 'sm', lg: 'md' }}
                  >
                    Informasi Pelanggan
                  </Text>
                </Flex>
                <HStack gap={5} mt="2">
                  <Avatar src="" name="Deva Aji saputra" size="xl" />
                  <Box mt="2" ml="5">
                    <Text
                      fontWeight="semibold"
                      fontSize={{ base: 'sm', lg: 'md' }}
                    >
                      {dataDetailRiwayatPemesanan?.data?.order.User.full_name}
                    </Text>
                    <HStack>
                      <Icon w={5} h={5} as={MdCorporateFare} />
                      <Text
                        fontWeight="semibold"
                        fontSize={{ base: 'sm', lg: 'md' }}
                      >
                        {
                          dataDetailRiwayatPemesanan?.data?.order.User
                            .company_name
                        }
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon w={5} h={5} as={MdEmail} />
                      <Text fontSize={{ base: 'sm', lg: 'md' }}>
                        {dataDetailRiwayatPemesanan?.data?.order.User.email}
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon w={5} h={5} as={MdCall} />
                      <Text fontSize={{ base: 'sm', lg: 'md' }}>
                        {
                          dataDetailRiwayatPemesanan?.data?.order.User
                            .no_whatsapp
                        }
                      </Text>
                    </HStack>
                    <Text fontSize={{ base: 'sm', lg: 'md' }}>
                      {dataDetailRiwayatPemesanan?.data?.order.User.address}
                    </Text>
                  </Box>
                </HStack>
              </Flex>
              <Flex direction="column">
                <Flex align="center" gap={2} borderBottomWidth="1px" pb="4">
                  <Icon w={3} h={3} as={AiOutlineProject} />
                  <Text
                    fontWeight="semibold"
                    fontSize={{ base: 'sm', lg: 'md' }}
                  >
                    Proyek
                  </Text>
                </Flex>
                <Flex direction={{ base: 'column', lg: 'row' }}>
                  <Box flex={1}>
                    <Box mt="2" ml="5">
                      <Text fontSize="sm">Nama Pekerjaan</Text>
                      <Text mr="2" fontWeight="bold" color="blue.700">
                        {
                          dataDetailRiwayatPemesanan?.data?.order.proyek
                            .nama_proyek
                        }
                      </Text>
                    </Box>
                    <Box mt="2" ml="5">
                      <Text fontSize="sm">Tujuan Proyek</Text>
                      <Text mr="2" color="blue.700">
                        {
                          dataDetailRiwayatPemesanan?.data?.order.proyek
                            .tujuan_proyek
                        }
                      </Text>
                    </Box>
                    <Box mt="2" ml="5">
                      <Text fontSize="sm">Tanggal Pengerjaan</Text>
                      <Text mr="2" fontSize="sm">
                        12 Juni 2022 s/d 13 Juli 2024
                      </Text>
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <Box mt="2" ml="5">
                      <Text fontSize="sm">No Refrensi</Text>
                      <Text mr="2" color="orange.600">
                        {
                          dataDetailRiwayatPemesanan?.data?.order.proyek
                            .no_refrensi
                        }
                      </Text>
                    </Box>
                    <Box mt="2" ml="5">
                      <Text fontSize="sm">No Surat</Text>
                      <Text mr="2" color="orange.600">
                        {
                          dataDetailRiwayatPemesanan?.data?.order.proyek
                            .no_surat
                        }
                      </Text>
                    </Box>
                    <Box mt="2" ml="5">
                      <Text fontSize="sm">No Identifikasi</Text>
                      <Text mr="2" fontSize="sm" color="orange.600">
                        {
                          dataDetailRiwayatPemesanan?.data?.order.proyek
                            .no_identifikasi
                        }
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
              <Flex direction="column" gap={4}>
                <Flex align="center" borderBottomWidth="1px" pb="4" gap={2}>
                  <Icon w={3} h={3} as={FaTasks} />
                  <Text
                    fontWeight="semibold"
                    fontSize={{ base: 'sm', lg: 'md' }}
                  >
                    Detail Pengujian (
                    {dataDetailRiwayatPemesanan?.data?.order.itemOrders.length}{' '}
                    Pengujian)
                  </Text>
                </Flex>
                {dataDetailRiwayatPemesanan?.data?.order.itemOrders.map(
                  (item, i) => (
                    <Box key={i} p="3" borderWidth={1} boxShadow="base">
                      <Flex gap={3}>
                        <Box align="stretch" flexGrow={1} direction="column">
                          <Box>
                            <Text fontWeight="semibold">
                              {item.Pengujian.jenis_pengujian}
                            </Text>
                          </Box>
                          <Text fontSize="smaller" color="orange.600">
                            {item.Pengujian.code}
                          </Text>
                          <Flex justify="space-between" align="center">
                            <Badge
                              colorScheme={
                                item.Pengujian.tempat_pengujian === 'Lapangan'
                                  ? 'blue'
                                  : 'green'
                              }
                              w="max"
                              px="2"
                              py="1"
                              rounded="md"
                              mt="2"
                            >
                              {item.Pengujian.tempat_pengujian}
                            </Badge>
                            <Box>
                              <Text textAlign="end" fontSize="smaller">
                                {item.OrderPengujian.quantity}{' '}
                                {item.Pengujian.sampler}
                              </Text>
                            </Box>
                          </Flex>
                          <HStack align="center">
                            <Spacer />
                            <Text fontSize="x-small">Harga : </Text>
                            <Text fontWeight="semibold" color="blue.700">
                              Rp
                              {formatCurrency(
                                parseInt(item.Pengujian.price) *
                                  parseInt(item.OrderPengujian.quantity)
                              )}
                            </Text>
                          </HStack>
                        </Box>
                      </Flex>
                    </Box>
                  )
                )}
                <HStack p="2" align="center">
                  <Text fontSize="sm">Total Pesanan : </Text>
                  <Text
                    fontWeight="bold"
                    color="blue.700"
                    fontSize={{ base: 'md', lg: '2xl' }}
                  >
                    Rp
                    {formatCurrency(
                      dataDetailRiwayatPemesanan?.data?.order.total_price
                    )}
                  </Text>
                  <Spacer />
                  <ButtonGroup>
                    <Button
                      w="full"
                      isDisabled={
                        dataDetailRiwayatPemesanan?.data?.status_penugasan ===
                        '1'
                          ? false
                          : true
                      }
                      variant="lateksil-solid"
                      onClick={() =>
                        router.push(
                          `${baseUrl}view-task/${dataDetailRiwayatPemesanan?.data?.file_task_pengujian}`
                        )
                      }
                    >
                      Lihat Hasil
                    </Button>
                  </ButtonGroup>
                </HStack>
              </Flex>
            </VStack>
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
    </>
  );
};

export default DetailRiwayatDataPemesananModal;
