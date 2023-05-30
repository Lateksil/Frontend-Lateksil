import {
  Box,
  Button,
  ButtonGroup,
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
  Text,
} from '@chakra-ui/react';
import React from 'react';

const AddPeralatanModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <Box as="form">
          <ModalHeader>
            <Text>Tambah Peralatan</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="5">
            <Stack>
              <FormControl id="name_category" isRequired>
                <FormLabel>Pilih Teknisi</FormLabel>
                <Input type="text" placeholder="Tambah Teknisi Pengujian ini" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onClose} border="1px">
                Batal
              </Button>
              <Button type="submit" colorScheme="green">
                Selesai
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddPeralatanModal;
