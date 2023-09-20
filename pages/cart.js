import React from 'react';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { FiTrash } from 'react-icons/fi';
import InputQuantitas from '../components/core/InputQuantitas';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import useRemoteCart from '../components/hooks/remote/useRemoteCart';
import formatCurrency from '../utils/formatCurrently';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';
import useMutationDeleteCart from '../components/hooks/mutation/delete/useMutationDeleteCart';
import ModalCheckout from '../components/modals/ModalCheckout';
import { baseUrl } from '../libs/axios';
import MessageClientNotFoundData from '../utils/MessageClientNotFoundData';
import useAuthUserStore from '../store/useAuthUserStore';

const CartPage = () => {
  const { data: dataCartUserId, isLoading: isLoadingDataCartUserId } =
    useRemoteCart();
  const { mutate: mutateDeleteCart } = useMutationDeleteCart();

  const id = useAuthUserStore((state) => state.id);

  const {
    isOpen: isOpenCheckout,
    onOpen: onOpenCheckout,
    onClose: onCloseCheckout,
  } = useDisclosure();

  let total = 0;
  dataCartUserId?.data?.forEach((product) => {
    total += product.quantity * product.Pengujian.price;
  });

  const handleDeleteCart = (id) => {
    mutateDeleteCart(id);
  };

  return (
    <VStack align="stretch" h="85vh" overflow="auto">
      <Head>
        <title>Keranjang | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="3">
        <Text color="blue.700" fontWeight="bold" fontSize="md">
          Keranjang
        </Text>
        <Spacer />
      </HStack>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <VStack flex={1.3} mr={{ base: 0, md: 2 }}>
          {dataCartUserId?.data.map((cart) => (
            <Box w="full" borderWidth={2} key={cart.id}>
              <Flex borderBottomWidth={1} p="2">
                <VStack w="full" spacing={0}>
                  <Flex w="full">
                    <Box>
                      <Image
                        src={
                          cart.Pengujian.image
                            ? `${baseUrl}uploads/${cart.Pengujian.image}`
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaf-A9g3WCySkL8QBaTArVm5ELMy8NkXmb3tAmG0&s'
                        }
                        boxSize="120px"
                        alt="Pengujian"
                        objectFit="cover"
                        rounded="md"
                      />
                    </Box>
                    <VStack
                      flex={{ base: 1.2, md: 1 }}
                      w="full"
                      align="start"
                      px="2"
                    >
                      <Text fontWeight="semibold" fontSize="sm">
                        {cart.Pengujian.jenis_pengujian}
                      </Text>
                      <Badge
                        colorScheme={
                          cart.Pengujian.tempat_pengujian === 'Lapangan'
                            ? 'blue'
                            : 'green'
                        }
                      >
                        <Text fontSize="xx-small">
                          {cart.Pengujian.tempat_pengujian}
                        </Text>
                      </Badge>
                      <Flex>
                        <Text fontSize="xs"> Jumlah : {cart.quantity}</Text>
                        <Text ml="2" fontSize="xs">
                          {cart.Pengujian.sampler}
                        </Text>
                      </Flex>
                      <Text fontWeight="semibold" fontSize="xs">
                        Harga Satuan : Rp{formatCurrency(cart.Pengujian.price)}
                      </Text>
                    </VStack>
                  </Flex>
                  <Flex w="full" justify="space-between">
                    <Flex align="center" textAlign="center">
                      <InputQuantitas cart={cart} total={total} />
                    </Flex>
                    <Flex align="center" justifyContent="center">
                      <Tooltip
                        label="Delete"
                        bg="gray.300"
                        color="black"
                        hasArrow
                      >
                        <IconButton
                          size="sm"
                          onClick={() => handleDeleteCart(cart.id)}
                          variant="none"
                          color="red"
                          icon={<FiTrash fontSize={10} />}
                        />
                      </Tooltip>
                    </Flex>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
          ))}
          {dataCartUserId && dataCartUserId?.data.length == 0 && (
            <MessageClientNotFoundData isLogin={true} />
          )}
          {isLoadingDataCartUserId && (
            <Center my="10">
              <Spinner />
            </Center>
          )}
          {!id && !isLoadingDataCartUserId && (
            <MessageClientNotFoundData isLogin={false} />
          )}
        </VStack>
        <Box
          borderWidth={2}
          flex={0.6}
          p={5}
          mt={{ base: '5', md: 0 }}
          w="full"
          bg="white"
          top={0}
          h="max-content"
          position="sticky"
        >
          <Text fontWeight="semibold" fontSize="sm">
            Ringkasan Pengujian
          </Text>
          <Flex justifyContent="space-between" borderBottomWidth={1} py={3}>
            <Text fontSize="xs">{`Total Harga (${
              dataCartUserId ? dataCartUserId?.data.length : 0
            } Pengujian)`}</Text>
            <Text fontSize="xs">Rp{formatCurrency(total)}</Text>
          </Flex>
          <Flex justifyContent="space-between" py={3}>
            <Text fontWeight="semibold" fontSize="xs">
              Total Harga
            </Text>
            <Text fontWeight="bold" fontSize="sm" color="blue.700">
              Rp{formatCurrency(total)}
            </Text>
          </Flex>
          <Button
            isDisabled={
              dataCartUserId ? dataCartUserId?.data.length == 0 && true : true
            }
            w="full"
            bg="green.500"
            color="white"
            fontSize="x-small"
            size="sm"
            onClick={onOpenCheckout}
            _hover={{ bg: 'green.600' }}
          >
            Checkout
          </Button>
        </Box>
      </Flex>
      <ModalCheckout
        isOpen={isOpenCheckout}
        onClose={onCloseCheckout}
        total_price={total}
      />
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

CartPage.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default CartPage;
