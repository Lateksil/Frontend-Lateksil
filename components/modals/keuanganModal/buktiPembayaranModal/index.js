import React from 'react';
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
import useRemoteBuktiPembayaranById from '../../../hooks/remote/useRemoteBuktiPembayarById';
import LoadingData from '../../../../utils/LoadingData';

const BuktiPembayaranModal = ({ id, isOpen, onClose }) => {
  const {
    data: dataBuktiPembayaran,
    isSuccess,
    isLoading: isLoadingBuktiPembayaran,
  } = useRemoteBuktiPembayaranById({
    id: id,
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
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
            {isLoadingBuktiPembayaran && <LoadingData />}
            {isSuccess && (
              <>
                <Box py="2" w="full">
                  <Text>Dibawah ini adalah bukti pembayaran </Text>
                </Box>
                <Image
                  rounded="md"
                  src={
                    isSuccess
                      ? `http://localhost:3030/bukti-pembayaran/${dataBuktiPembayaran?.data.image_payment}`
                      : null
                  }
                  alt="bukti-pembayaran"
                />
              </>
            )}
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
