import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
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
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

const DetailTeknisiProgress = ({ isOpen, onClose }) => {
  const onModalClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      size="xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>
          <Text>Detail Progress Teknisi</Text>
        </ModalHeader>
        <ModalCloseButton />
        <Box overflow="auto">
          <ModalBody py="5">
            <Flex>
              <TableContainer>
                <Table size="md" variant="striped">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Nama Teknisi</Th>
                      <Th textAlign="center">Status</Th>
                      <Th textAlign="center">File</Th>
                    </Tr>
                  </Thead>
                  <Tbody borderWidth={2}>
                    <Tr>
                      <Td>Teknisi 1</Td>
                      <Td textAlign="center">
                        <Badge colorScheme="pink" p="2" rounded="md" w="full">
                          Proses Pengerjaan
                        </Badge>
                      </Td>
                      <Td>
                        <Button isDisabled={true} colorScheme="blue">
                          Download File
                        </Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Teknisi 2</Td>
                      <Td textAlign="center">
                        <Badge colorScheme="green" p="2" rounded="md" w="full">
                          Selesai
                        </Badge>
                      </Td>
                      <Td>
                        <Button colorScheme="blue">Download File</Button>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </ModalBody>
        </Box>
        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onModalClose} border="1px">
              Batal
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailTeknisiProgress;
