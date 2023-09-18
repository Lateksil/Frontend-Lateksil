import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import useMutationChangeRoleUser from '../../../hooks/mutation/useMutationChangeRoleUser';
import useToastNotification from '../../../hooks/useToastNotification';

const RolePermissionsModal = ({ id, role, isOpen, onClose }) => {
  const showToast = useToastNotification();
  const [value, setValue] = useState(role || 'user');

  const { mutateAsync: mutateUpdateRole, isLoading: isLoadingUpdateRole } =
    useMutationChangeRoleUser();

  const onClickUpdateRoleUser = () => {
    try {
      mutateUpdateRole({
        id,
        role: value,
      }).then(() => onClose());
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader />
        <ModalBody>
          <Box py="2" borderBottomWidth={2} w="full">
            <Text fontWeight="semibold" fontSize="xl">
              Perubahan Role
            </Text>
          </Box>
          <Box py="2" w="full">
            <Text>
              Berikut ini adalah perbuahan status role akan diberlakukan:{' '}
            </Text>
          </Box>
          <RadioGroup onChange={setValue} value={value} mt="10px" size="lg">
            <VStack w="full" alignItems="normal">
              <Radio value="user" colorScheme="green">
                Costumer
              </Radio>
              <Radio value="frontliner">Frontliner</Radio>
              <Radio value="keuangan">Keuangan</Radio>
              <Radio value="manager">Manager</Radio>
              <Radio value="teknisi">Teknisi</Radio>
              <Radio value="peralatan">Peralatan</Radio>
            </VStack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Kembali
            </Button>
            <Button
              flexGrow={1}
              rounded="md"
              variant="lateksil-solid"
              isLoading={isLoadingUpdateRole}
              onClick={onClickUpdateRoleUser}
            >
              Ubah Role
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RolePermissionsModal;
