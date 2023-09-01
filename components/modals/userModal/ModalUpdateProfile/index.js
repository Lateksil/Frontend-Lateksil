import React, { useEffect } from 'react';
import {
  Button,
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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useMutationUpdateProfile from '../../../hooks/mutation/put/useMutationUpdateProfile';

const ModalUpdateProfile = ({ data, isOpen, onClose }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const id_user = data?.id;

  const {
    mutateAsync: mutateUpdateProfile,
    isLoading: isLoadingUpdateProfile,
  } = useMutationUpdateProfile();

  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('email', data.email);
    formData.append('no_whatsapp', data.no_whatsapp);
    formData.append('address', data.address);
    formData.append('image_profile', data.image_profile[0]);

    mutateUpdateProfile({ id: id_user, formData: formData }).then(() =>
      onClose()
    );
  };

  useEffect(() => {
    if (isOpen) {
      setValue('full_name', data.full_name);
      setValue('email', data.email);
      setValue('no_whatsapp', data.no_whatsapp);
      setValue('address', data.address);
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      scrollBehavior="inside"
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        mx="4"
        overflowY="auto"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <ModalHeader>
          <Text>Ubah Profile</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4} w="full" maxW="xl" fontSize="sm" method="POST">
            <FormControl id="full_name">
              <FormLabel>Nama Lengkap</FormLabel>
              <Input
                type="text"
                placeholder="Nama Lengkap"
                {...register('full_name')}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="email" {...register('email')} />
            </FormControl>
            <FormControl id="no_whatsapp">
              <FormLabel>No WA</FormLabel>
              <Input
                type="text"
                placeholder="no_whatsapp"
                {...register('no_whatsapp')}
              />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Alamat</FormLabel>
              <Input
                type="text"
                placeholder="address"
                {...register('address')}
              />
            </FormControl>

            <FormControl id="upload_image">
              <FormLabel>Upload Image</FormLabel>
              <Input type="file" p={0} {...register('image_profile')} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter bg="gray.100">
          <Button
            type="submit"
            w="full"
            variant="lateksil-solid"
            isLoading={isLoadingUpdateProfile}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdateProfile;
