import React, { useState } from "react";
import NextImage from ".././components/core/nextimage";
import LateksilImage from ".././assets/images/civil-engginering.jpg";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/schema/AuthenticationSchema";
import useAxios from "../components/hooks/useAxios";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsloading] = useBoolean();
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
    useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  console.log(errorMessage);
  const [, makeRegister] = useAxios(
    { url: "/auth/register", method: "POST" },
    { manual: true }
  );

  const onSubmit = (data) => {
    setIsloading.on();
    makeRegister({ data })
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        setIsloading.off();
        setErrorMessage(error.response?.data.message);
      });
  };
  return (
    <Stack minH="100vh" direction={{ base: "column-reverse", md: "row" }}>
      <Flex
        flex={1}
        align="center"
        shadow="xl"
        p="5"
        direction="column"
        justifyContent="center"
      >
        <Heading size={{ base: "md", md: "xl" }} color="blue.700">
          LABORATORIUM TEKNIK SIPIL
        </Heading>
        <Text fontWeight="semibold">
          Laboratorium Pengujian Teknik Sipil UBL
        </Text>
        <Box h="max">
          <Link href="/">
            <NextImage
              src={LateksilImage}
              alt="Civil Engginering Illustration"
              width="326"
              height="345"
              layout="responsive"
              placeholder="blur"
            />
          </Link>
        </Box>
      </Flex>
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        p={8}
        flex={1}
        align="center"
        justify="center"
        flexDir="column"
      >
        <VStack mb="3" w="full" maxW="md">
          <Heading fontSize="2xl" w="full">
            Daftar Sekarang
          </Heading>
          <Text mb="8" w="full">
            Sudah memiliki akun?{" "}
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
              {...register("full_name")}
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
              {...register("company_name")}
            />
            <FormErrorMessage>
              {errors.company_name && errors.company_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="address" isInvalid={!!errors.no_whatsapp}>
            <FormLabel>Alamat</FormLabel>
            <Input type="text" placeholder="Alamat" {...register("address")} />
            <FormErrorMessage>
              {errors.no_whatsapp && errors.no_whatsapp.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="no_whatsapp" isInvalid={!!errors.no_whatsapp}>
            <FormLabel>No. WhatsApp</FormLabel>
            <Input
              type="text"
              placeholder="No WhatsApp"
              {...register("no_whatsapp")}
            />
            <FormErrorMessage>
              {errors.no_whatsapp && errors.no_whatsapp.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" {...register("email")} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Password"
                type={isPasswordOpen ? "text" : "password"}
                {...register("password")}
              />

              <InputRightElement>
                <IconButton
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  variant="ghost"
                  color="ims-linebox"
                  aria-label={
                    isPasswordOpen ? "Mask password" : "Reveal password"
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
          colorScheme="blue"
          variant="solid"
          isLoading={isLoading}
        >
          Daftar
        </Button>
      </Flex>
    </Stack>
  );
};

export default RegisterPage;
