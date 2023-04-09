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
import { Controller, useForm } from "react-hook-form";
import useMutationCreatePengujian from "../../../hooks/mutation/useMutationCreatePengujian";
import Select from "../../../core/select";
import useRemoteCategoriesOptions from "../../../hooks/remote/useRemoteCategoriesOptions";

const AddPengujianModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, control } = useForm();

  const { data: categoryDataOption } = useRemoteCategoriesOptions();

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
    formData.append("category", data.category.value);
    formData.append("description", data.description);
    formData.append("min_quantity", data.min_quantity);
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
      <ModalContent
        mx="4"
        overflowY="auto"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Pilih Kategori Pengujian"
                    options={categoryDataOption}
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                placeholder="Deskripsi..."
                {...register("description")}
              />
            </FormControl>
            <FormControl id="min_quantity">
              <FormLabel>Min Kuantitas</FormLabel>
              <Input
                type="number"
                placeholder="Minimal Kuantitas dalam pengujian "
                {...register("min_quantity")}
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
              <Input type="number" placeholder="Harga" {...register("price")} />
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
      </ModalContent>
    </Modal>
  );
};

export default AddPengujianModal;
