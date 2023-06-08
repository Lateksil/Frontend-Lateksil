import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  Icon,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GrFormClose } from 'react-icons/gr';
import Select from '../../../core/select';
import useMutationAddTeknisiPengujian from '../../../hooks/mutation/useMutationAddTeknisiPengujian';
import useRemotePeralatanByIdOrder from '../../../hooks/remote/useRemotePeralatanByIdOrder';
import useRemoteTeknisibyOrderId from '../../../hooks/remote/useRemoteTeknisibyOrderId';
import useRemoteTeknisiOptions from '../../../hooks/remote/useRemoteTeknisiOptions';

const AddTeknisiAndPeralatanModal = ({ id, isOpen, onClose }) => {
  const [dataNamaAlat, setDataNamaAlat] = useState([]);

  const { data: dataTeknisi, isLoading: isLoadingDataTeknisi } =
    useRemoteTeknisibyOrderId({ id });

  const { data: teknisiDataOption } = useRemoteTeknisiOptions();

  const { data: dataPermintaanAlat } = useRemotePeralatanByIdOrder({
    id: id,
  });

  const {
    mutate: mutateAddTeknisiPengujian,
    isLoading: isLoadingTeknisiPengujian,
  } = useMutationAddTeknisiPengujian();

  const { control, handleSubmit, reset } = useForm();

  const onModalClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    const mergedArray = Array.from(
      new Set(
        dataPermintaanAlat?.data.itemOrders
          .map((pengujian) =>
            pengujian.Pengujian.peralatan.map((alat) => alat.nama_alat)
          )
          .flat()
      )
    );
    setDataNamaAlat(mergedArray);
  }, [isOpen]);

  const onSubmit = async (data) => {
    const formData = {
      order_id: id,
      teknisi_id: data.teknisi.value,
    };

    mutateAddTeknisiPengujian(formData);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      size="lg"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Text>Tambah Teknisi dan Peralatan</Text>
        </ModalHeader>
        <ModalCloseButton />
        <Box overflow="auto">
          <ModalBody py="5">
            <Flex direction="column" gap={5}>
              <Flex direction="column">
                <Text fontWeight="semibold">Nama Teknisi Yang Diajukan</Text>
                {isLoadingDataTeknisi && (
                  <Stack>
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                  </Stack>
                )}

                <Box mb="5" mt="2" overflow="auto">
                  <TableContainer>
                    <Table size="md" variant="striped">
                      <Tbody borderWidth={2}>
                        {dataTeknisi?.data.length === 0 && (
                          <Flex overflow="hidden" p="5" justify="center">
                            <Text fontWeight="semibold">
                              Silahkan Tambah Teknisi
                            </Text>
                          </Flex>
                        )}
                        {dataTeknisi?.data?.map((users, i) => (
                          <Tr key={i}>
                            <Td>
                              <Flex justify="space-between">
                                <Text>{users.teknisi.full_name}</Text>
                                <Icon
                                  as={GrFormClose}
                                  boxSize={5}
                                  cursor="pointer"
                                />
                              </Flex>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Flex>
              <FormControl id="teknisi" isRequired>
                <FormLabel>Pilih Teknisi</FormLabel>
                <Controller
                  name="teknisi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      placeholder="Pilih Teknisi Untuk Pengujian"
                      options={teknisiDataOption}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isLoadingTeknisiPengujian}
              >
                Tambah Teknisi
              </Button>
            </Flex>

            <Flex direction="column" mt="5">
              <Text mb="2" fontWeight="semibold">
                Jenis Pengujian
              </Text>
              <Box mb="5" h="150px" borderWidth={2} overflow="auto">
                <TableContainer>
                  <Table size="md" variant="striped">
                    <Tbody>
                      {dataPermintaanAlat?.data.itemOrders.map(
                        (pengujian, i) => (
                          <Tr key={i}>
                            <Td>{pengujian.Pengujian.jenis_pengujian}</Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Text mb="2" fontWeight="semibold">
                Alat Pengujian
              </Text>
              <Box mb="5" h="150px" borderWidth={2} overflow="auto">
                <TableContainer>
                  <Table size="md" variant="striped">
                    <Tbody>
                      {dataNamaAlat.map((alat, i) => (
                        <Tr key={i}>
                          <Td>{alat}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <FormControl id="name_category">
                <FormLabel>Catatan Ke Peralatan</FormLabel>
                <Input
                  type="text"
                  placeholder="Tambah Alat yang ingin anda tambahkan"
                />
              </FormControl>
            </Flex>
          </ModalBody>
        </Box>
        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onModalClose} border="1px">
              Batal
            </Button>
            <Button type="submit" variant="lateksil-solid">
              Kirim
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTeknisiAndPeralatanModal;
