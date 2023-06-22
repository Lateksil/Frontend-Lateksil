import React from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
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

const ModalCheckout = ({ isOpen, onClose, total_price }) => {
  const router = useRouter();
  const userId = useAuthUserStore((state) => state.id);

  const { data: userProfileData, isLoading: isLoadingUserProfile } =
    useRemoteUserProfile();

  const { mutate: mutateCreateOrdering, isLoading: isLoadingCreateOrdering } =
    useMutationCreateOrder();

  const { register, handleSubmit, reset } = useForm();

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

    mutateCreateOrdering(formData);
    onClose();
    reset();

    router.push('/order?type=1');
  };

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent
        mx="4"
        overflow="hidden"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>
          <Text textAlign="center">Tambah Data Pesanan</Text>
        </ModalHeader>
        <ModalBody>
          {isLoadingUserProfile ? (
            <LoadingData />
          ) : (
            <Stack pb="10">
              <FormControl id="company_name">
                <FormLabel>Nama Perusahaan</FormLabel>
                <Input
                  variant="filled"
                  value={userProfileData?.data?.company_name}
                  isDisabled={true}
                  type="text"
                />
              </FormControl>
              <FormControl id="full_name">
                <FormLabel>Nama Pelanggan</FormLabel>
                <Input
                  variant="filled"
                  value={userProfileData?.data?.full_name}
                  isDisabled={true}
                  type="text"
                />
              </FormControl>
              <FormControl id="no_whatsapp" isRequired>
                <FormLabel>No. Hp/WA</FormLabel>
                <Input
                  variant="filled"
                  value={userProfileData?.data?.no_whatsapp}
                  isDisabled={true}
                />
              </FormControl>
              <FormControl id="nama_proyek" isRequired>
                <FormLabel>Nama Proyek</FormLabel>
                <Input
                  type="text"
                  placeholder="Nama Proyek yang akan anda pesan"
                  {...register('nama_proyek')}
                />
              </FormControl>
              <FormControl id="tujuan_proyek" isRequired>
                <FormLabel>Tujuan pegujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Nama Proyek yang akan anda pesan"
                  {...register('tujuan_proyek')}
                />
              </FormControl>
            </Stack>
          )}
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onModalCloseCheckout} border="1px">
              Batal
            </Button>
            <Button
              type="submit"
              variant="solid"
              bg="blue.700"
              _hover={{ bg: 'blue.800' }}
              isLoading={isLoadingCreateOrdering}
              color="white"
              rounded="md"
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
