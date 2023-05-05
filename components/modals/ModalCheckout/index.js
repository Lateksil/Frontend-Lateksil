import React from 'react';
import {
  Box,
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
  RadioGroup,
  Radio,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useMutationCreateOrder from '../../hooks/mutation/useMutationCreateOrder';
import useAuthUserStore from '../../../store/useAuthUserStore';

const ModalCheckout = ({ isOpen, onClose, total_price }) => {
  const userId = useAuthUserStore((state) => state.id);

  const { mutate: mutateCreateOrdering } = useMutationCreateOrder();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onModalCloseCheckout = () => {
    onClose();
    reset();
  };

  const onSubmit = (data) => {
    console.log(data);
    const formData = {
      user_id: userId,
      nama_proyek: data.nama_proyek,
      tujuan_proyek: data.tujuan_proyek,
      no_whatsApp_proyek: data.no_whatsApp_proyek,
      total_price,
    };

    mutateCreateOrdering(formData);
    onClose();
    reset();
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
          <Stack pb="10">
            <FormControl id="company_name">
              <FormLabel>Nama Perusahaan</FormLabel>
              <Input
                variant="filled"
                value="PT. Indonesia Sejahtera"
                isDisabled={true}
                type="text"
                placeholder="Nama Perusahaan"
              />
            </FormControl>
            <FormControl id="company_name">
              <FormLabel>Nama Pelanggan</FormLabel>
              <Input
                variant="filled"
                value="Deva Aji Saputra"
                isDisabled={true}
                type="text"
                placeholder="Nama Pelanggan"
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
            <FormControl id="company_name" isRequired>
              <FormLabel>No. Hp/WA</FormLabel>
              <Input
                type="text"
                placeholder="Masukan nomor Whatsapp anda"
                {...register('no_whatsApp_proyek')}
              />
            </FormControl>
          </Stack>
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
