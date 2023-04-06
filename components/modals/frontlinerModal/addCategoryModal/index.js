import {
  Box,
  Button,
  ButtonGroup,
  Flex,
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useMutationCreateCategories from "../../../hooks/mutation/useMutationCreateCategories";
import useRemoteCategories from "../../../hooks/remote/useRemoteCategories";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const { data: dataCategories } = useRemoteCategories();
  const [formData, setFormData] = useState({});

  const { mutate } = useMutationCreateCategories(formData);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setFormData(data);
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text>Tambah Kategori</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex flexWrap="wrap">
                {dataCategories?.data.map((category) => (
                  <Box
                    key={category.id}
                    border="1px solid black"
                    w="max"
                    px={2}
                    mb={2}
                    rounded="md"
                    mr={2}
                  >
                    <Text>{category.name_category}</Text>
                  </Box>
                ))}
              </Flex>
              <FormControl id="name_category">
                <FormLabel>Nama Kategori</FormLabel>
                <Input
                  type="text"
                  placeholder="Tambah Pengujian"
                  {...register("name_category")}
                />
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

export default AddCategoryModal;
