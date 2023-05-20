import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ModalPayment = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setShowButton(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="3" rounded="xl" overflow="auto">
        <Box flex="1" flexGrow="1">
          <Flex direction="column">
            <VStack bg="#002855" color="white" px="5" pt="5">
              <HStack justify="space-between" w="full" h="full">
                <Text fontWeight="semibold">Proses Pembayaran</Text>
                <Box
                  onClick={onClose}
                  p="1"
                  cursor="pointer"
                  textDecoration="underline"
                >
                  Kembali
                </Box>
              </HStack>
              <Box position="relative" w="full" h="70px">
                <Box
                  bg="white"
                  position="absolute"
                  shadow="base"
                  rounded="md"
                  bottom="-10"
                  w="full"
                  p="5"
                >
                  <Text color="black" fontWeight="semibold">
                    Total
                  </Text>
                  <Text color="#002855" fontWeight="bold" fontSize="2xl">
                    Rp2.134.000
                  </Text>
                </Box>
              </Box>
            </VStack>
            <Flex
              mt="20"
              direction="column"
              borderBottomWidth={1}
              pb="2"
              mx="5"
            >
              <Text color="black" fontWeight="semibold">
                Metode Pembayaran
              </Text>
              <Text color="black">Transfer</Text>
            </Flex>
            <Flex direction="column" borderBottomWidth={1} pb="2" m="5">
              <Text color="black" fontWeight="semibold">
                Bank Tujuan : BRI
              </Text>
              <Text color="black" fontWeight="semibold">
                Atas Nama : Deva Aji Saputra
              </Text>
            </Flex>
            <Flex direction="column" borderBottomWidth={1} pb="2" m="5">
              <Text color="black">No Rekening</Text>
              <Text color="#002855" fontWeight="semibold" fontSize="2xl">
                7488 0100 6986 532
              </Text>
            </Flex>
            <Flex direction="column" pb="2" m="5">
              {selectedImage && (
                <Image src={selectedImage} alt="Selected Image" maxH="500px" />
              )}
              <FormControl>
                <FormLabel htmlFor="image-upload">Pilih Gambar</FormLabel>
                <Input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button as="span" w="full">
                    Upload Bukti Pemabayaran
                  </Button>
                </label>
              </FormControl>
              {showButton && (
                <Button w="full" variant="lateksil-solid" mt="5">
                  Kirim
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default ModalPayment;
