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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useMutationCreatePengujian from "../../../hooks/mutation/useMutationCreatePengujian";

const AddPengujianModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const { mutate: mutateCreatePengujian } = useMutationCreatePengujian();

  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    const requestPayload = {
      jenis_pengujian: data.jenis_pengujian,
      code: data.code,
      description: data.description,
      sampler: data.sampler,
      image: data.image[0],
      price: data.price,
      category: data.category,
      catatan_khusus: data.catatan_khusus,
    };
    mutateCreatePengujian(requestPayload);
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      scrollBehavior="inside"
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" overflowY="auto">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text>Tambah Pengujian</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} w="full" maxW="xl" fontSize="sm" method="POST">
              <FormControl id="jenis_pengujian">
                <FormLabel>Jenis Pengujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Jenis Pengujian"
                  {...register("jenis_pengujian")}
                />
              </FormControl>
              <FormControl id="jenis">
                <FormLabel>Code</FormLabel>
                <Input
                  type="text"
                  placeholder="SNI XX-XXXX-XXXX"
                  {...register("code")}
                />
              </FormControl>
              <FormControl id="category">
                <FormLabel>Kategori Pengujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Kategori Pengujian"
                  {...register("category")}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  placeholder="Deskripsi..."
                  {...register("description")}
                />
              </FormControl>
              <FormControl id="sampler">
                <FormLabel>Min Kuantitas</FormLabel>
                <Input
                  type="number"
                  placeholder="Minimal Kuantitas dalam pengujian "
                  {...register("quantity")}
                />
              </FormControl>
              <FormControl id="sampler">
                <FormLabel>Sampler</FormLabel>
                <Input
                  type="text"
                  placeholder="Contoh: Per Titik / Paket / dll."
                  {...register("sampler")}
                />
              </FormControl>
              <FormControl id="catatan_khusus">
                <FormLabel>catatan khusus</FormLabel>
                <Textarea
                  placeholder="Catatan Khusus Pengujian untuk Costumer"
                  {...register("catatan_khusus")}
                />
              </FormControl>
              <FormControl id="price">
                <FormLabel>Harga Rp.</FormLabel>
                <Input
                  type="number"
                  placeholder="Harga"
                  {...register("price")}
                />
              </FormControl>
              <FormControl id="upload_image">
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" p={0} {...register("image")} />
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
                color="white"
                rounded="md"
              >
                Tambah
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddPengujianModal;
