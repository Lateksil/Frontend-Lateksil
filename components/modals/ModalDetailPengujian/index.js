import React, { useEffect, useState } from 'react';
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
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { HiShoppingCart } from 'react-icons/hi2';
import useRemoteUserProfile from '../../hooks/remote/useRemoteUserProfile';
import { useRouter } from 'next/router';
import formatCurrency from '../../../utils/formatCurrently';
import useMutationAddToCart from '../../hooks/mutation/useMutationAddToCart';
import useAuthUserStore from '../../../store/useAuthUserStore';
import { baseUrl } from '../../../libs/axios';
import useRemotePengujianById from '../../hooks/remote/useRemotePengujianById';

const ModalDetailPengujian = ({
  pengujianId,
  minQuantity,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { data } = useRemoteUserProfile();
  const { mutateAsync: mutateAddToCart, isLoading: isLoadingAddCart } =
    useMutationAddToCart();

  const {
    data: dataPengujian,
    isLoading: isLoadingDataPengujian,
    isSuccess,
  } = useRemotePengujianById({
    id: pengujianId,
  });

  const minKuantitas = parseInt(minQuantity);
  const [value, setValue] = useState(minKuantitas);
  const [isDescrement, setIsDescrement] = useState(false);

  const totalPrice = parseInt(dataPengujian?.data?.price) * value;

  function handleIncrement() {
    setValue((prevState) => prevState + 1);
    if (value < 1) {
      setValue(1);
    }
  }

  const userId = useAuthUserStore((state) => state.id);

  useEffect(() => {
    if (minKuantitas === value) {
      setIsDescrement(true);
    } else {
      setIsDescrement(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, value]);

  function handleDecrement() {
    setValue((prevState) => prevState - 1);
  }

  const onMoveToCart = async () => {
    if (data) {
      mutateAddToCart({
        user_id: userId,
        pengujian_id: pengujianId,
        quantity: value,
      }).then(() => router.push('/cart'));
    } else {
      router.push('/login');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'full', md: 'md' }}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader fontSize="sm">Detail Pengujian</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5}>
            <Flex w="full">
              {isLoadingDataPengujian && <Skeleton w="full" h="8" />}
              <Text fontWeight="bold" fontSize="md">
                {dataPengujian?.data?.jenis_pengujian}
              </Text>
            </Flex>
            <Flex w="full" direction={{ base: 'column', md: 'row' }}>
              <Box flex={0.8}>
                <AspectRatio w="full" ratio={1}>
                  <Image
                    src={
                      dataPengujian?.data?.image
                        ? `${baseUrl}uploads/${dataPengujian?.data?.image}`
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaf-A9g3WCySkL8QBaTArVm5ELMy8NkXmb3tAmG0&s'
                    }
                    alt={dataPengujian?.data?.jenis_pengujian}
                    objectFit="cover"
                    rounded="md"
                  />
                </AspectRatio>
              </Box>
              <VStack
                flex={1.2}
                ml={{ base: 0, md: 3 }}
                py={{ base: 2, md: 0 }}
              >
                <Text w="full" fontSize="xs" fontWeight="semibold">
                  Deskripsi
                </Text>
                {isLoadingDataPengujian && (
                  <SkeletonText noOfLines={4} w="full" />
                )}
                <Text w="full" fontSize="xs">
                  {dataPengujian?.data?.description}
                </Text>
              </VStack>
            </Flex>
            <Flex w="full" direction="column">
              <Text fontWeight="semibold" fontSize="xs">
                Catatan Khusus
              </Text>
              {isLoadingDataPengujian && (
                <SkeletonText noOfLines={2} w="full" />
              )}
              <Text whiteSpace="pre-line" fontSize="xs">
                {dataPengujian?.data?.catatan_khusus}
              </Text>
            </Flex>
            {isLoadingDataPengujian ? (
              <Flex w="full">
                <Skeleton w="50%" h="7" />
              </Flex>
            ) : (
              <Flex w="full" align="center">
                <InputGroup width="150px" size="sm">
                  <InputLeftElement>
                    <Button
                      size="sm"
                      isDisabled={isDescrement}
                      onClick={handleDecrement}
                    >
                      -
                    </Button>
                  </InputLeftElement>
                  <Input
                    type="number"
                    textAlign="center"
                    fontSize="xs"
                    max={999}
                    min={1}
                    value={value}
                    onChange={(e) => {
                      let newValue = parseInt(e.target.value);
                      if (newValue < minKuantitas) {
                        newValue = minKuantitas;
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
                <Text ml="2" fontSize="xs">
                  {dataPengujian?.data?.sampler}
                </Text>
              </Flex>
            )}
            <Flex w="full" justify="start">
              {isLoadingDataPengujian ? (
                <Skeleton w="50%" h="7" />
              ) : (
                <>
                  <Text mr="3" fontWeight="medium" fontSize="xs">
                    Harga Per {dataPengujian?.data?.sampler} :
                  </Text>
                  <Text color="blue.700" fontWeight="medium" fontSize="sm">
                    Rp{formatCurrency(dataPengujian?.data?.price)}
                  </Text>
                </>
              )}
            </Flex>
            {isLoadingDataPengujian ? (
              <Flex w="full" justify="end">
                <Skeleton w="50%" h="8" />
              </Flex>
            ) : (
              <Flex w="full" justify="end">
                <Text mr="3" fontWeight="semibold" fontSize="xs">
                  Total
                </Text>
                <Text fontWeight="bold" fontSize="md" color="blue.700">
                  Rp{formatCurrency(totalPrice)}
                </Text>
              </Flex>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup w="full" justifyContent="end">
            <Button
              onClick={onClose}
              rounded="md"
              size="sm"
              fontSize="xs"
              variant="outline"
              border="1px"
            >
              Batal
            </Button>
            <Button
              variant="lateksil-solid"
              size="sm"
              isDisabled={isLoadingDataPengujian ? true : false}
              onClick={onMoveToCart}
              isLoading={isLoadingAddCart}
              leftIcon={<Icon as={HiShoppingCart} fontSize="xl" />}
            >
              Tambah Keranjang
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailPengujian;
