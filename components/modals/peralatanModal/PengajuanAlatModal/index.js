import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

const PengajuanAlatModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
    setSelectedFile(URL.createObjectURL(file));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadImage(file);
    setSelectedFile(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="4" as="form">
        <Box>
          <ModalBody>
            <VStack>
              <Box py="2" borderBottomWidth={2} w="full">
                <Text fontWeight="semibold" fontSize="xl">
                  Upload Bukti Pengajuan
                </Text>
              </Box>
              <Box py="2" w="full">
                <Text>Silahkan Unggah Bukti Pengajuan Peralatan</Text>
              </Box>
              <Box
                width="full"
                bg="gray.200"
                py={selectedFile ? '0' : '20'}
                border="2px dashed gray"
                borderRadius="md"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedFile ? (
                  <Image src={selectedFile} alt="Choose File Images" />
                ) : (
                  <>
                    <Text>Tarik dan Lepaskan kesini atau </Text>
                    <Box cursor="pointer" onClick={handleClick}>
                      <Text fontWeight="semibold" textDecoration="underline">
                        Pilih File
                      </Text>
                    </Box>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onClose} border="1px">
                Batal
              </Button>
              <Button type="submit" variant="lateksil-solid">
                Kirim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default PengajuanAlatModal;
