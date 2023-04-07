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

  const { mutate: mutateCreatePengujian, isLoading } =
    useMutationCreatePengujian();

  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("jenis_pengujian", data.jenis_pengujian);
    formData.append("code", data.code);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("sampler", data.sampler);
    formData.append("price", data.price);
    formData.append("catatan_khusus", data.catatan_khusus);
    formData.append("image", data.image[0]);

    mutateCreatePengujian(formData);
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
                isLoading={isLoading}
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
