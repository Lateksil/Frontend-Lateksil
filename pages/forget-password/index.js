import {
  Button,
  Center,
  Circle,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { MdMailLock } from 'react-icons/md';
import AuthenticationLayout from '../../components/main/AuthenticationLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../../utils/schema/AuthenticationSchema';

const MainForgetPassword = () => {
  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <Stack
      spacing={4}
      w="full"
      maxW="md"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Center>
        <VStack>
          <Circle size="50px" bg="blue.700" color="white">
            <MdMailLock size={30} />
          </Circle>
          <Heading fontSize="2xl">Lupa Kata Sandi?</Heading>
          <Text
            mb={5}
            w="80%"
            align="center"
            fontWeight="medium"
            fontFamily="body"
          >
            Masukan email yang terdaftar di akun Lateksil kamu dan kami akan
            mengirimkan email untuk mereset kata sandi baru
          </Text>
        </VStack>
      </Center>
      <FormControl
        id="email"
        isInvalid={!!formState.errors?.email}
        errortext={formState.errors?.email?.message}
      >
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" {...register('email')} />
        <FormErrorMessage fontSize="xs">
          {formState.errors?.email?.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" variant="lateksil-solid">
        Kirim
      </Button>
    </Stack>
  );
};

MainForgetPassword.getLayout = (page) => (
  <AuthenticationLayout>{page}</AuthenticationLayout>
);

export default MainForgetPassword;
