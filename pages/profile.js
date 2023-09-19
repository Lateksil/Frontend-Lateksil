import React, { useEffect } from 'react';
import {
  Avatar,
  Flex,
  Text,
  Stack,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import useRemoteUserProfile from '../components/hooks/remote/useRemoteUserProfile';
import { getServerSideWithAllAuth } from '../utils/getServerSideWithAllAuth';
import { baseUrl } from '../libs/axios';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import useMutationUpdateProfile from '../components/hooks/mutation/put/useMutationUpdateProfile';
import { useRouter } from 'next/router';
import ModalChangePassword from '../components/modals/userModal/ModalChangePassword';

const ProfileUser = () => {
  const router = useRouter();
  const { data: userProfileData, isSuccess } = useRemoteUserProfile();

  const {
    isOpen: isOpenChangePassword,
    onOpen: onOpenChangePassword,
    onClose: onCloseChangePassword,
  } = useDisclosure();

  const {
    mutateAsync: mutateUpdateProfile,
    isLoading: isLoadingUpdateProfile,
  } = useMutationUpdateProfile();

  const { register, handleSubmit, setValue } = useForm();

  const id_user = userProfileData?.data?.id;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('email', data.email);
    formData.append('no_whatsapp', data.no_whatsapp);
    formData.append('address', data.address);
    formData.append('image_profile', data.image_profile[0]);

    mutateUpdateProfile({ id: id_user, formData: formData }).then(() =>
      router.reload('/profile')
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setValue('full_name', userProfileData?.data.full_name);
      setValue('email', userProfileData?.data.email);
      setValue('no_whatsapp', userProfileData?.data.no_whatsapp);
      setValue('address', userProfileData?.data.address);
    }
  }, [isSuccess]);

  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Management Account | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="2xl">
          Account
        </Text>
      </HStack>
      <Stack
        spacing={4}
        w="full"
        maxW="xl"
        fontSize="sm"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex py="2" bg="gray.100" justify={'center'}>
          <Avatar
            size={'xl'}
            src={`${baseUrl}profile/${userProfileData?.data?.image_profile}`}
            name={userProfileData?.data.full_name}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
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
          <Input
            type="email"
            isDisabled={true}
            placeholder="Email"
            {...register('email')}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <HStack>
            <Text>*******</Text>
            <Box
              onClick={onOpenChangePassword}
              color="blue"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              Ubah kata sandi
            </Box>
          </HStack>
        </FormControl>
        <FormControl id="no_whatsapp">
          <FormLabel>No WA</FormLabel>
          <Input
            type="text"
            placeholder="No WhatsApp"
            {...register('no_whatsapp')}
          />
        </FormControl>
        <FormControl id="address">
          <FormLabel>Alamat</FormLabel>
          <Input type="text" placeholder="Address" {...register('address')} />
        </FormControl>

        <FormControl id="upload_image">
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" p={0} {...register('image_profile')} />
        </FormControl>
        <Button
          type="submit"
          w="full"
          variant="lateksil-solid"
          isLoading={isLoadingUpdateProfile}
        >
          Simpan
        </Button>
      </Stack>
      <ModalChangePassword
        userId={id_user}
        isOpen={isOpenChangePassword}
        onClose={onCloseChangePassword}
      />
    </VStack>
  );
};

export const getServerSideProps = getServerSideWithAllAuth;

ProfileUser.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default ProfileUser;
