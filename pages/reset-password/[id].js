import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
  useDisclosure,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Center,
  VStack,
  Circle,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { getServerSidePropsWithNoAuth } from '../../utils/getServerSidePropsWithNoAuth';
import { changePasswordSchema } from '../../utils/schema/AuthenticationSchema';
import { MdMailLock } from 'react-icons/md';

const ResetPasswordPage = () => {
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
    useDisclosure();

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Flex p={8} flex={1} align="center" justify="center" flexDir="column">
      <Head>
        <title>Konfirmasi Reset Password | Lateksil</title>
      </Head>
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
            <Heading fontSize="2xl">Kata Sandi Baru</Heading>
            <Text
              mb={5}
              w="80%"
              align="center"
              fontWeight="medium"
              fontFamily="body"
            >
              Buat Kata sandi baru dengan memasukan password dan konfimasi
              password terbaru.
            </Text>
          </VStack>
        </Center>
        <FormControl
          id="password"
          isInvalid={!!formState.errors?.password}
          errortext={formState.errors?.password?.message}
        >
          <FormLabel>Kata Sandi Baru</FormLabel>
          <InputGroup>
            <Input
              placeholder="Kata Sandi Baru"
              type={isPasswordOpen ? 'text' : 'password'}
              {...register('password')}
            />
            <InputRightElement>
              <IconButton
                bg="transparent"
                _hover={{ bg: 'transparent' }}
                variant="ghost"
                color="ims-linebox"
                aria-label={
                  isPasswordOpen ? 'Mask password' : 'Reveal password'
                }
                icon={
                  isPasswordOpen ? <BsFillEyeFill /> : <BsFillEyeSlashFill />
                }
                onClick={onPasswordToggle}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="xs">
            {formState.errors?.password?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="repassword"
          isInvalid={!!formState.errors?.repassword}
          errortext={formState.errors?.repassword?.message}
        >
          <FormLabel>Konfirmasi kata sandi baru</FormLabel>
          <InputGroup>
            <Input
              placeholder="Konfirmasi kata sandi baru"
              type={isPasswordOpen ? 'text' : 'password'}
              {...register('repassword')}
            />
            <InputRightElement>
              <IconButton
                bg="transparent"
                _hover={{ bg: 'transparent' }}
                variant="ghost"
                color="ims-linebox"
                aria-label={
                  isPasswordOpen ? 'Mask password' : 'Reveal password'
                }
                icon={
                  isPasswordOpen ? <BsFillEyeFill /> : <BsFillEyeSlashFill />
                }
                onClick={onPasswordToggle}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="xs">
            {formState.errors?.repassword?.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" variant="lateksil-solid">
          Simpan
        </Button>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps = getServerSidePropsWithNoAuth;

export default ResetPasswordPage;
