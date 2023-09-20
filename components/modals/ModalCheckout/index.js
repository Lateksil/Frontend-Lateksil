import React from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useMutationCreateOrder from '../../hooks/mutation/useMutationCreateOrder';
import useAuthUserStore from '../../../store/useAuthUserStore';
import { useRouter } from 'next/router';
import useRemoteUserProfile from '../../hooks/remote/useRemoteUserProfile';
import LoadingData from '../../../utils/LoadingData';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutSchema } from '../../../utils/schema/CheckoutSchema';
import useToastNotification from '../../hooks/useToastNotification';

const ModalCheckout = ({ isOpen, onClose, total_price }) => {
  const showToast = useToastNotification();
  const router = useRouter();
  const userId = useAuthUserStore((state) => state.id);

  const { data: userProfileData, isLoading: isLoadingUserProfile } =
    useRemoteUserProfile();

  const {
    mutateAsync: mutateAsyncCreateOrdering,
    isLoading: isLoadingCreateOrdering,
  } = useMutationCreateOrder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CheckoutSchema),
  });

  const onModalCloseCheckout = () => {
    onClose();
    reset();
  };

  const onSubmit = (data) => {
    const formData = {
      user_id: userId,
      nama_proyek: data.nama_proyek,
      tujuan_proyek: data.tujuan_proyek,
      total_price,
    };

    try {
      mutateAsyncCreateOrdering(formData);
    } catch (error) {
      showToast('Server Sedang Bermasalah', 'error');
    } finally {
      router.push('/order?type=1').then(() => onModalCloseCheckout());
    }
  };

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent
        mx="4"
        overflow="hidden"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        motionPreset="slideInBottom"
      >
        <ModalHeader>
          <Text textAlign="center" fontSize="sm">
            Tambah Data Pesanan
          </Text>
        </ModalHeader>
        <ModalBody>
          {isLoadingUserProfile ? (
            <LoadingData />
          ) : (
            <Stack pb="10">
              <FormControl id="company_name">
                <FormLabel fontSize="xs">Nama Perusahaan</FormLabel>
                <Input
                  fontSize="xs"
                  size="sm"
                  variant="filled"
                  value={userProfileData?.data?.company_name}
                  isDisabled={true}
                  type="text"
                />
              </FormControl>
              <FormControl id="full_name">
                <FormLabel fontSize="xs">Nama Pelanggan</FormLabel>
                <Input
                  variant="filled"
                  fontSize="xs"
                  size="sm"
                  value={userProfileData?.data?.full_name}
                  isDisabled={true}
                  type="text"
                />
              </FormControl>
              <FormControl id="no_whatsapp" isRequired>
                <FormLabel fontSize="xs">No. Hp/WA</FormLabel>
                <Input
                  variant="filled"
                  fontSize="xs"
                  size="sm"
                  value={userProfileData?.data?.no_whatsapp}
                  isDisabled={true}
                />
              </FormControl>
              <FormControl
                id="nama_proyek"
                isInvalid={!!errors.nama_proyek}
                isRequired
              >
                <FormLabel fontSize="xs">Nama Pekerjaan</FormLabel>
                <Input
                  type="text"
                  fontSize="xs"
                  size="sm"
                  placeholder="Nama Pekerjaan yang akan anda pesan"
                  {...register('nama_proyek')}
                />
                <FormErrorMessage fontSize="xx-small">
                  {errors.nama_proyek && errors.nama_proyek.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="tujuan_proyek"
                isInvalid={!!errors.tujuan_proyek}
                isRequired
              >
                <FormLabel fontSize="xs">Tujuan Pengujian</FormLabel>
                <Input
                  type="text"
                  fontSize="xs"
                  size="sm"
                  placeholder="Tujuan Pengujian yang akan anda pesan"
                  {...register('tujuan_proyek')}
                />
                <FormErrorMessage fontSize="xx-small">
                  {errors.tujuan_proyek && errors.tujuan_proyek.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button
              size="sm"
              fontSize="xx-small"
              onClick={onModalCloseCheckout}
              border="1px"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="lateksil-solid"
              isLoading={isLoadingCreateOrdering}
              size="sm"
            >
              Selesai
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCheckout;
