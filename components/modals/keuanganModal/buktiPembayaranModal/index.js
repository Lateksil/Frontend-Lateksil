import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const BuktiPembayaranModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader />
        <ModalBody>
          <VStack>
            <Box py="2" borderBottomWidth={2} w="full">
              <Text fontWeight="semibold" fontSize="xl">
                Bukti Pembayaran
              </Text>
            </Box>
            <Box py="2" w="full">
              <Text>Dibawah ini adalah bukti pembayaran </Text>
            </Box>
            <Image
              rounded="md"
              src="http://localhost:3030/bukti-pembayaran/depdep-pt.indonesiasejahtera-7fd0e539-a373-48c5-a38b-a060b61ae57e.jpeg"
              alt="bukti-pembayaran"
            />
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Tutup
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuktiPembayaranModal;
