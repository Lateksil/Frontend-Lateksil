import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import formatCurrency from "../utils/formatCurrently";
import { getServerSidePropsCostumer } from "../utils/getServerSidePropsCostumer";

const CartPage = () => {
  const [value, setValue] = useState(1);

  const hargaSatuan = 743200 
  const totalPrice = hargaSatuan * value

  function handleIncrement() {
    setValue((prevState) => prevState + 1);
    if (value < 1) {
      setValue(1);
    }
  }

  function handleDecrement() {
    setValue((prevState) => prevState - 1);
  }
  return (
    <VStack align="stretch">
      <Head>
        <title>Keranjang | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="3">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Keranjang
        </Text>
        <Spacer />
      </HStack>
      <Flex direction="row">
        <VStack flex={1.3} mr={3}>
          <Box w="full" mb={2} borderWidth={2}>
            <Flex py={3}>
              <GridItem w="25%">
                <Text textAlign="center" fontWeight="semibold">
                  Produk
                </Text>
              </GridItem>
              <GridItem w="20%">
                <Text textAlign="center" fontWeight="semibold">
                  Harga Satuan
                </Text>
              </GridItem>
              <GridItem w="25%">
                <Text textAlign="center" fontWeight="semibold">
                  Kuantitas
                </Text>
              </GridItem>
              <GridItem w="20%">
                <Text textAlign="center" fontWeight="semibold">
                  Harga Total
                </Text>
              </GridItem>
              <GridItem w="10%">
                <Text textAlign="center" fontWeight="semibold">
                  Aksi
                </Text>
              </GridItem>
            </Flex>
          </Box>
          <Box w="full" borderWidth={2}>
            <Flex py={3} borderBottomWidth={1}>
              <Box w="25%">
                <Text textAlign="center" fontWeight="medium">
                  Ketebalan Jalan Aspal
                </Text>
                <Text textAlign="center" fontSize="sm">
                  (SNI 06-6890-2002)
                </Text>
              </Box>
              <Flex w="20%" align="center" justifyContent="center">
                <Text fontWeight="semibold">Rp{formatCurrency(hargaSatuan)}</Text>
              </Flex>
              <Flex w="25%" align="center" justifyContent="center">
                <InputGroup width="150px">
                  <InputLeftElement>
                    <Button size="sm" onClick={handleDecrement}>
                      -
                    </Button>
                  </InputLeftElement>
                  <Input
                    type="number"
                    textAlign="center"
                    max={999}
                    min={1}
                    value={value}
                    onChange={(e) => {
                      let newValue = parseInt(e.target.value);
                      if (newValue < 1) {
                        newValue = 1;
                      } else if (newValue > 999) {
                        newValue = 999;
                      }
                      setValue(newValue);
                    }}
                  />
                  <InputRightElement>
                    <Button size="sm" onClick={handleIncrement}>
                      +
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text ml="2">titik</Text>
              </Flex>
              <Flex w="20%" align="center" justifyContent="center">
                <Text textAlign="center" color="blue.700" fontWeight="semibold">
                  Rp{formatCurrency(totalPrice)}
                </Text>
              </Flex>
              <Flex w="10%" align="center" justifyContent="center">
                <IconButton variant="none" color="red" icon={<FiTrash />} />
              </Flex>
            </Flex>
          </Box>
        </VStack>
        <Box borderWidth={2} flex={0.6} p={3}>
          <Text fontWeight="semibold">Ringkasan Belanja</Text>
          <Flex justifyContent="space-between" borderBottomWidth={1} py={3}>
            <Text>Total Harga (0 Barang)</Text>
            <Text>Rp0</Text>
          </Flex>
          <Flex justifyContent="space-between" py={3}>
            <Text fontWeight="semibold">Total Harga</Text>
            <Text fontWeight="semibold">Rp0</Text>
          </Flex>
          <Button
            isDisabled={false}
            w="full"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
          >
            Checkout
          </Button>
        </Box>
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

CartPage.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default CartPage;
