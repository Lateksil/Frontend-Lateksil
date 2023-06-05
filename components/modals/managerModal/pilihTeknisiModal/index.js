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
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GrFormClose } from 'react-icons/gr';
import Select from '../../../core/select';
import useMutationAddTeknisiPengujian from '../../../hooks/mutation/useMutationAddTeknisiPengujian';
import useRemoteTeknisibyOrderId from '../../../hooks/remote/useRemoteTeknisibyOrderId';
import useRemoteTeknisiOptions from '../../../hooks/remote/useRemoteTeknisiOptions';

const PilihTeknisiModal = ({ id, isOpen, onClose }) => {
  const { data: dataTeknisi, isLoading: isLoadingDataTeknisi } =
    useRemoteTeknisibyOrderId({ id });

  const { data: teknisiDataOption } = useRemoteTeknisiOptions();

  const {
    mutate: mutateAddTeknisiPengujian,
    isLoading: isLoadingTeknisiPengujian,
  } = useMutationAddTeknisiPengujian();

  const { control, handleSubmit, reset } = useForm();

  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    const formData = {
      order_id: id,
      teknisi_id: data.teknisi.value,
    };

    mutateAddTeknisiPengujian(formData);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} isCentered>
      <ModalOverlay />
      <ModalContent mx="4" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <ModalHeader>
            <Text>Tambah Teknisi</Text>
          </ModalHeader>
          <ModalCloseButton />
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
            </Flex>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onModalClose} border="1px">
                Batal
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isLoadingTeknisiPengujian}
              >
                Selesai
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default PilihTeknisiModal;
