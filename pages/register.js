import React, { useState } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Circle,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  PinInput,
  PinInputField,
  Text,
  useBoolean,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsPersonFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../utils/schema/AuthenticationSchema';
import useAxios from '../components/hooks/useAxios';
import { useRouter } from 'next/router';
import AuthenticationLayout from '../components/main/AuthenticationLayout';
import useToastNotification from '../components/hooks/useToastNotification';
import useVerifyCodeStore from '../store/useVerifyCodeStore';

const RegisterPage = () => {
  const router = useRouter();
  const showToast = useToastNotification();
  const [errorMessage, setErrorMessage] = useState();
  const [pinCode, setPinCode] = useState(['', '', '', '']);
  const [isRegisterSuccess, setIsRegisterSuccess] = useBoolean();
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useBoolean();
  const [isLoading, setIsloading] = useBoolean();
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
    useDisclosure();

  const [email, setEmailStorage] = useVerifyCodeStore((state) => [
    state.email,
    state.setEmailStorage,
  ]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [, makeRegister] = useAxios(
    { url: '/auth/register', method: 'POST' },
    { manual: true }
  );

  const [, makeVerify] = useAxios(
    { url: '/auth/verify', method: 'POST' },
    { manual: true }
  );

  const onSubmit = (data) => {
    setIsloading.on();
    makeRegister({ data })
      .then(() => {
        setEmailStorage(data.email);
        setIsRegisterSuccess.on();
      })
      .catch((error) => {
        setIsloading.off();
        setErrorMessage(error.response?.data.message);
      });
  };

  const handleInputCodeChange = (event, index) => {
    const value = event.target.value;
    if (value.length > 1) {
      return;
    }
    const newPinCode = [...pinCode];
    newPinCode[index] = value;
    setPinCode(newPinCode);
    if (value === '' && index > 0) {
      const prevInput = document.getElementsByName(`pinCode-${index - 1}`)[0];
      prevInput.focus();
    } else if (index < 3) {
      const nextInput = document.getElementsByName(`pinCode-${index + 1}`)[0];
      nextInput.focus();
    }
  };

  const onSubmitVerify = async () => {
    await makeVerify({
      data: {
        email: email,
        code: pinCode.join(''),
      },
    })
      .then(() => {
        setIsVerifiedSuccess.on();
      })
      .catch((error) => {
        showToast(error.response?.data.message, 'error');
      });
  };

  if (!isRegisterSuccess)
    return (
      <Box as="form" w="full" maxW="md" onSubmit={handleSubmit(onSubmit)}>
        <VStack mb="3" w="full">
          <Heading fontSize="2xl" w="full">
            Daftar Sekarang
          </Heading>
          <Text mb="8" w="full">
            Sudah memiliki akun?{' '}
            <Link href="/login" color="blue.700" fontWeight="bold">
              Masuk
            </Link>
          </Text>
          {errorMessage && (
            <Alert mt="4" status="error" variant="left-accent">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
        </VStack>
        <VStack w="full" maxW="md">
          <FormControl id="full_name" isInvalid={!!errors.full_name}>
            <FormLabel>Nama Lengkap</FormLabel>
            <Input
              type="text"
              placeholder="Nama Lengkap"
              {...register('full_name')}
            />
            <FormErrorMessage>
              {errors.full_name && errors.full_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="company_name" isInvalid={!!errors.company_name}>
            <FormLabel>Nama Perusahaan</FormLabel>
            <Input
              type="text"
              placeholder="Nama Perusahaan"
              {...register('company_name')}
            />
            <FormErrorMessage>
              {errors.company_name && errors.company_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="address" isInvalid={!!errors.address}>
            <FormLabel>Alamat</FormLabel>
            <Input type="text" placeholder="Alamat" {...register('address')} />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="no_whatsapp" isInvalid={!!errors.no_whatsapp}>
            <FormLabel>No. WhatsApp</FormLabel>
            <Input
              type="text"
              placeholder="No WhatsApp"
              {...register('no_whatsapp')}
            />
            <FormErrorMessage>
              {errors.no_whatsapp && errors.no_whatsapp.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" {...register('email')} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Password"
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
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Button
          mt="8"
          w="full"
          maxW="md"
          type="submit"
          variant="lateksil-solid"
          isLoading={isLoading}
        >
          Daftar
        </Button>
      </Box>
    );

  if (isRegisterSuccess && !isVerifiedSuccess)
    return (
      <Box w="full" maxW="md" shadow="xl" p="5" rounded="md">
        <Center>
          <Circle size="50px" bg="blue.600" color="white">
            <MdEmail size={30} />
          </Circle>
        </Center>
        <Text
          m={5}
          align="center"
          fontSize="xl"
          fontWeight="semibold"
          fontFamily="heading"
        >
          Please Check your Email
        </Text>
        <Center>
          <VStack>
            <Text
              mb={5}
              w="80%"
              align="center"
              fontWeight="medium"
              fontFamily="body"
            >
              Masukan Code yang telah terkirim di Email
            </Text>
            <HStack>
              <PinInput otp type="number">
                <PinInputField
                  onChange={(e) => handleInputCodeChange(e, 0)}
                  name="pinCode-0"
                />
                <PinInputField
                  onChange={(e) => handleInputCodeChange(e, 1)}
                  name="pinCode-1"
                />
                <PinInputField
                  onChange={(e) => handleInputCodeChange(e, 2)}
                  name="pinCode-2"
                />
                <PinInputField
                  onChange={(e) => handleInputCodeChange(e, 3)}
                  name="pinCode-3"
                />
              </PinInput>
            </HStack>
          </VStack>
        </Center>
        <Center mt="5">
          <Button w="100%" colorScheme="blue" onClick={onSubmitVerify}>
            Verify
          </Button>
        </Center>
      </Box>
    );

  if (isVerifiedSuccess)
    return (
      <Box w="full" maxW="md" shadow="xl" p="5" rounded="md">
        <IconButton
          aria-label="back to register"
          variant="ghost"
          onClick={() => router.reload()}
          icon={<ChevronLeftIcon w={6} h={6} />}
        />
        <Center>
          <Circle size="50px" bg="blue.600" color="white">
            <BsPersonFill size={30} />
          </Circle>
        </Center>
        <Text
          m={5}
          align="center"
          fontSize="xl"
          fontWeight="semibold"
          fontFamily="heading"
        >
          Akun Telah Terdaftar
        </Text>
        <Center>
          <Text
            mb={5}
            w="80%"
            align="center"
            fontWeight="medium"
            fontFamily="body"
          >
            Akun telah terdaftar, masuk untuk melanjutkan Pengujian Teknik Sipil
            UBL
          </Text>
        </Center>
        <Center>
          <NextLink href="/login">
            <Button w="100%" colorScheme="blue" type="submit">
              Masuk
            </Button>
          </NextLink>
        </Center>
      </Box>
    );
};

RegisterPage.getLayout = (page) => (
  <AuthenticationLayout>{page}</AuthenticationLayout>
);

export default RegisterPage;
