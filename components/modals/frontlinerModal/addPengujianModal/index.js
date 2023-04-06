import {
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
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postFetcher } from "../../../../libs/axios";
import useAxios from "../../../hooks/useAxios";

const AddPengujianModal = ({ isOpen, onClose }) => {
  const { register, formState, handleSubmit } = useForm();

  const addData = useMutation(
    async (newData) => {
      const { data } = postFetcher("/pengujian/create", newData);
      return data;
    },
    {
      onSuccess: () => {
        console.log("SUCCESSFULL");
      },
    }
  );

  const [, executeAddPengujian] = useAxios(
    { url: "/pengujian/create", method: "POST" },
    { manual: true }
  );

  const onSubmit = async (data) => {
    const {
      jenis_pengujian,
      code,
      description,
      image,
      sampler,
      price,
      category,
      catatan_khusus,
    } = data;
    // const requestPayload = {
    //   jenis_pengujian: data.jenis_pengujian,
    //   code: data.code,
    //   description: data.description,
    //   image: data.image[0],
    //   sampler: data.sampler,
    //   price: data.price,
    //   category: data.category,
    //   catatan_khusus: data.catatan_khusus,
    // };

    // await executeAddPengujian({ data: requestPayload });

    const upload = URL.createObjectURL(image[0]);
    console.log("URL", image.name);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader>
          <Text fontSize="sm">Tambah Pengujian</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            spacing={4}
            w="full"
            maxW="xl"
            fontSize="sm"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >
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
              <Input
                type="text"
                placeholder="Deskripsi Pengujian"
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
              <Input
                type="text"
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
            <ButtonGroup>
              <Button border="1px" onClick={onClose}>
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
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPengujianModal;
