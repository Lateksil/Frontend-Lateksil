import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Icon,
  ModalFooter,
} from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi2";
import useRemoteUserProfile from "../../hooks/remote/useRemoteUserProfile";
import { useRouter } from "next/router";

const ModalDetailPengujian = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data } = useRemoteUserProfile();

  const handleAddExamination = async () => {
    if (data) {
      window.alert("Bisa Tambah Keranjang");
    } else {
      router.push("/login");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader>Detail Pengujian</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5}>
            <Flex w="full">
              <Text fontWeight="bold" fontSize="xl">
                Core Drill Aspal
              </Text>
            </Flex>
            <Flex w="full">
              <Box flex={0.8}>
                <AspectRatio w="full" ratio={1}>
                  <Image
                    src="https://glints.com/id/lowongan/wp-content/uploads/2018/02/architect-engineer-working-office-construction-concept.jpg"
                    alt=""
                    objectFit="cover"
                  />
                </AspectRatio>
              </Box>
              <VStack flex={1.2} px="4">
                <Text w="full" fontWeight="semibold">
                  Deskripsi
                </Text>
                <Text>
                  Core Drill merupakan bor berbentuk silinder yang digunakan
                  untuk membuat lobang di permukaan, terbuat dari logam dan pada
                  ujung bor biasanya dilapisi dengan berlian atau karbida.
                </Text>
              </VStack>
            </Flex>
            <Flex w="full">
              <Text fontWeight="semibold">Catatan Khusus</Text>
            </Flex>
            <Flex w="full" justify="end">
              <Text mr="3" fontWeight="semibold">
                Subtotal
              </Text>
              <Text fontWeight="bold" fontSize="xl" color="blue.700">
                Rp1050.000
              </Text>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup w="full" justifyContent="end">
            <Button
              onClick={onClose}
              rounded="md"
              variant="outline"
              border="1px"
            >
              Batal
            </Button>
            <Button
              variant="solid"
              bg="blue.700"
              color="white"
              rounded="md"
              onClick={handleAddExamination}
              leftIcon={<Icon as={HiShoppingCart} fontSize="xl" />}
            >
              Tambah Pengujian
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailPengujian;
