import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const DetailPengujianModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader>
          <Text>Detail Pengujian</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>Detail</ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button border="1px">Batal</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailPengujianModal;
