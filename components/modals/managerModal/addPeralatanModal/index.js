import React, { useEffect, useState } from 'react';
import {
  Box,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import useRemotePeralatanByIdOrder from '../../../hooks/remote/useRemotePeralatanByIdOrder';

const AddPeralatanModal = ({ id, isOpen, onClose }) => {
  const [dataNamaAlat, setDataNamaAlat] = useState([]);

  const { data: dataPermintaanAlat } = useRemotePeralatanByIdOrder({
    id: id,
  });

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <Box as="form">
          <ModalHeader py="5">
            <Text color="orange.500">
              Ajukan Permintaan Penyediaan Peralatan
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="5">
            <Flex direction="column">
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
                <FormLabel>Tambah Alat Pengujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Tambah Alat yang ingin anda tambahkan"
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onClose} border="1px">
                Batal
              </Button>
              <Button type="submit" colorScheme="orange">
                Ajukan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddPeralatanModal;
