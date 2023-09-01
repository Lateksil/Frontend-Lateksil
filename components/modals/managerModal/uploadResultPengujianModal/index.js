import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import useToastNotification from '../../../hooks/useToastNotification';
import useMutationAddResultPengujian from '../../../hooks/mutation/useMutationAddResultPengujian';

const UploadResultPengujianModal = ({ id, isOpen, onClose }) => {
  const showToast = useToastNotification();
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    mutateAsync: mutateUploadResultFilePengujian,
    isLoading: isLoadingUploadResultPengujian,
  } = useMutationAddResultPengujian();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const onCloseUploaded = () => {
    setSelectedFile(null);
    onClose();
  };

  const handleUploadResultPengujian = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file_result_pengujian', selectedFile);

    try {
      await mutateUploadResultFilePengujian(formData);
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
    } finally {
      onCloseUploaded();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseUploaded}
      isCentered
      size="3xl"
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
                Upload File Pengujian
              </Text>
            </Box>
            <Box p={4} w="full">
              <VStack spacing={4} align="stretch">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{
                    border: '1px solid gray',
                    padding: '8px',
                    borderRadius: '10px',
                  }}
                />
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Tutup
            </Button>
            <Button
              isDisabled={selectedFile ? false : true}
              flexGrow={1}
              rounded="md"
              variant="lateksil-solid"
              isLoading={isLoadingUploadResultPengujian}
              onClick={handleUploadResultPengujian}
            >
              Upload
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadResultPengujianModal;
