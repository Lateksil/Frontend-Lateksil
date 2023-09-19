import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeNewPasswordSchema } from '../../../../utils/schema/AuthenticationSchema';
import useMutationChangeOldPassword from '../../../hooks/mutation/useMutationChangeOldPassword';
import useToastNotification from '../../../hooks/useToastNotification';

const ModalChangePassword = ({ userId, isOpen, onClose }) => {
  const showToast = useToastNotification();
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
    useDisclosure();

  const { register, formState, handleSubmit, setError, reset } = useForm({
    resolver: yupResolver(changeNewPasswordSchema),
  });

  const onModalClose = () => {
    onClose();
    reset();
  };

  const {
    mutateAsync: mutateChangePassword,
    isLoading: isLoadingChangePassword,
  } = useMutationChangeOldPassword();

  const onSubmit = async (data) => {
    try {
      mutateChangePassword({
        id: userId,
        old_password: data.old_password,
        new_password: data.new_password,
      })
        .then(() => {
          onModalClose(), showToast('Berhasil Merubah Password', 'success');
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setError('old_password', { message: error.response.data.message });
          }
        });
    } catch (error) {
      showToast('Server Sedang Bermasalah', 'error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      motionPreset="slideInBottom"
      onClose={onModalClose}
      closeOnOverlayClick={false}
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
          <Text>Ubah Kata Sandi</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4} w="full" maxW="xl" fontSize="sm" method="POST">
            <FormControl
              id="old_password"
              isInvalid={!!formState.errors?.old_password}
              errortext={formState.errors?.old_password?.message}
            >
              <FormLabel>Kata Sandi Lama</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Kata Sandi Lama"
                  type="password"
                  {...register('old_password')}
                />
              </InputGroup>
              <FormErrorMessage fontSize="xs">
                {formState.errors?.old_password?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="new_password"
              isInvalid={!!formState.errors?.new_password}
              errortext={formState.errors?.new_password?.message}
            >
              <FormLabel>Kata Sandi Baru</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Kata Sandi Baru"
                  type={isPasswordOpen ? 'text' : 'password'}
                  {...register('new_password')}
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
                {formState.errors?.new_password?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="new_repassword"
              isInvalid={!!formState.errors?.new_repassword}
              errortext={formState.errors?.new_repassword?.message}
            >
              <FormLabel>Konfirmasi kata sandi baru</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Konfirmasi kata sandi baru"
                  type={isPasswordOpen ? 'text' : 'password'}
                  {...register('new_repassword')}
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
                {formState.errors?.new_repassword?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter bg="gray.100">
          <Button
            type="submit"
            isLoading={isLoadingChangePassword}
            w="full"
            variant="lateksil-solid"
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalChangePassword;
