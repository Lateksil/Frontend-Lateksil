import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Spacer,
  useBoolean,
  FormErrorMessage,
  Alert,
  AlertIcon,
  useDisclosure,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useForm } from "react-hook-form";
import { getServerSidePropsWithNoAuth } from "../utils/getServerSidePropsWithNoAuth";
import { loginSchema } from "../utils/schema/AuthenticationSchema";
import useAxios from "../components/hooks/useAxios";
import { useState } from "react";
import useAuthUserStore from "../store/useAuthUserStore";
import useNoAuth from "../components/hooks/useNoAuth";

export default function LoginPage() {
  useNoAuth();
  const router = useRouter();
  const [errors, setErrors] = useState();
  const [isLoading, setIsloading] = useBoolean();
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
  useDisclosure();


  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [, makeLogin] = useAxios(
    { url: "/auth/login", method: "POST" },
    { manual: true }
  );

  const setLogin = useAuthUserStore((state) => state.setLogin);

  const onSubmit = async (data) => {
    setIsloading.on();
    await makeLogin({ data })
      .then((response) => {
        const { email, createToken } = response.data;
        setLogin(email, createToken);
        router.reload("/");
      })
      .catch((error) => {
        setIsloading.off();
        setErrors(error.response?.data.message);
      });
  };

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        p={8}
        flex={1}
        align="center"
        justify="center"
      >
        <Stack spacing={4} w="full" maxW="md">
          <Heading fontSize="2xl">Masuk</Heading>
          {errors && (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              {errors}
            </Alert>
          )}
          <FormControl
            id="email"
            isInvalid={!!formState.errors?.email}
            errortext={formState.errors?.email?.message}
          >
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" {...register("email")} />
            <FormErrorMessage fontSize="xs">
              {formState.errors?.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isInvalid={!!formState.errors?.password}
            errortext={formState.errors?.password?.message}
          >
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
                        isPasswordOpen ? (
                          <BsFillEyeFill />
                        ) : (
                          <BsFillEyeSlashFill />
                        )
                      }
                      onClick={onPasswordToggle}
                    />
                  </InputRightElement>
                </InputGroup>
            <FormErrorMessage fontSize="xs">
              {formState.errors?.password?.message}
            </FormErrorMessage>
          </FormControl>
          <Flex>
            <Spacer />
            <Link color="blue.500">Lupa Password?</Link>
          </Flex>
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
            variant="solid"
          >
            Masuk
          </Button>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}

export const getServerSideProps = getServerSidePropsWithNoAuth;
