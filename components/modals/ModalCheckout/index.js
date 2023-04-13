import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  RadioGroup,
  Radio,
  useDisclosure,
} from "@chakra-ui/react";

const ModalCheckout = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <Box as="form">
          <ModalHeader>
            <Text textAlign="center">Tambah Data Pesanan</Text>
          </ModalHeader>
          <ModalBody>
            <Stack pb="10">
              <FormControl id="company_name">
                <FormLabel>Nama Perusahaan</FormLabel>
                <Input
                  variant="filled"
                  value="PT. Indonesia Sejahtera"
                  isDisabled={true}
                  type="text"
                  placeholder="Nama Perusahaan"
                />
              </FormControl>
              <FormControl id="company_name">
                <FormLabel>Nama Pelanggan</FormLabel>
                <Input
                  variant="filled"
                  value="Deva Aji Saputra"
                  isDisabled={true}
                  type="text"
                  placeholder="Nama Pelanggan"
                />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>Nama Proyek</FormLabel>
                <Input
                  type="text"
                  placeholder="Nama Proyek yang akan anda pesan"
                />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>Tujuan pegujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Nama Proyek yang akan anda pesan"
                />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>No. Hp/WA</FormLabel>
                <Input type="text" placeholder="Masukan nomor Whatsapp anda" />
              </FormControl>
              <FormControl id="company_name" isRequired>
                <FormLabel>Pengujian Lakukan di</FormLabel>
                <RadioGroup defaultValue="2">
                  <Stack spacing={5} direction="row">
                    <Radio value="1">Laboratorium</Radio>
                    <Radio value="2">Lapangan</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onClose} border="1px">
                Batal
              </Button>
              <Button
                type="submit"
                variant="solid"
                bg="blue.700"
                _hover={{ bg: "blue.800"}}
                color="white"
                rounded="md"
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

export default ModalCheckout;
