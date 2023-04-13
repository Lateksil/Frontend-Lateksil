import React from "react";
import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { FiTrash } from "react-icons/fi";
import InputQuantitas from "../components/core/InputQuantitas";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import useRemoteCart from "../components/hooks/remote/useRemoteCart";
import formatCurrency from "../utils/formatCurrently";
import { getServerSidePropsCostumer } from "../utils/getServerSidePropsCostumer";
import useMutationDeleteCart from "../components/hooks/mutation/delete/useMutationDeleteCart";
import ModalCheckout from "../components/modals/ModalCheckout";

const CartPage = () => {
  const { data: dataCartUserId } = useRemoteCart();
  const { mutate: mutateDeleteCart } = useMutationDeleteCart();

  const {
    isOpen: isOpenCheckout,
    onOpen: onOpenCheckout,
    onClose: onCloseCheckout,
  } = useDisclosure();

  let total = 0;
  dataCartUserId?.data.forEach((product) => {
    console.log((total += product.quantity * product.Pengujian.price));
  });

  const handleDeleteCart = (id) => {
    mutateDeleteCart(id);
  };

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

          {dataCartUserId?.data.map((cart) => (
            <Box w="full" borderWidth={2} key={cart.id}>
              <Flex py={3} borderBottomWidth={1}>
                <Box w="25%">
                  <Text textAlign="center" fontWeight="medium">
                    {cart.Pengujian.jenis_pengujian}
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {cart.Pengujian.code}
                  </Text>
                </Box>
                <Flex w="20%" align="center" justifyContent="center">
                  <Text fontWeight="semibold">
                    Rp{formatCurrency(cart.Pengujian.price)}
                  </Text>
                </Flex>
                <InputQuantitas cart={cart} total={total} />
                <Flex w="10%" align="center" justifyContent="center">
                  <Tooltip label="Delete" hasArrow>
                    <IconButton
                      onClick={() => handleDeleteCart(cart.id)}
                      variant="none"
                      color="red"
                      icon={<FiTrash />}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </Box>
          ))}
          {dataCartUserId ? (
            dataCartUserId?.data.length == 0 && <Box>Keranjang Anda Kosong</Box>
          ) : (
            <Box>Silahkan Login Terlebih Dahulu</Box>
          )}
        </VStack>
        <Box borderWidth={2} flex={0.6} p={5} h="max-content">
          <Text fontWeight="semibold">Ringkasan Belanja</Text>
          <Flex justifyContent="space-between" borderBottomWidth={1} py={3}>
            <Text>{`Total Harga (${
              dataCartUserId ? dataCartUserId?.data.length : 0
            } Barang)`}</Text>
            <Text>Rp{formatCurrency(total)}</Text>
          </Flex>
          <Flex justifyContent="space-between" py={3}>
            <Text fontWeight="semibold">Total Harga</Text>
            <Text fontWeight="semibold">Rp{formatCurrency(total)}</Text>
          </Flex>
          <Button
            isDisabled={
              dataCartUserId ? dataCartUserId?.data.length == 0 && true : true
            }
            w="full"
            bg="green.500"
            color="white"
            onClick={onOpenCheckout}
            _hover={{ bg: "green.600" }}
          >
            Checkout
          </Button>
        </Box>
      </Flex>
      <ModalCheckout
        isOpen={isOpenCheckout}
        onClose={onCloseCheckout}
      />
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

CartPage.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default CartPage;
