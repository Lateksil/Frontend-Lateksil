import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import UploadKwitansiModal from '../../../modals/keuanganModal/uploadKwitansiModal';

const TableLaporanPemabayaran = () => {
  const {
    isOpen: isOpenUploadKwitansi,
    onOpen: onOpenUploadKwitansi,
    onClose: onCloseUploadKwitansi,
  } = useDisclosure();
  return (
    <>
      <Tr>
        <Td>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">Deva Aji Saputra</Text>
            <Text>PT. Devlops</Text>
          </Flex>
        </Td>
        <Td textAlign="center">PT. Depdep</Td>
        <Td textAlign="center">15 Mei 2023</Td>
        <Td textAlign="center">
          <Text color="blue.700" fontWeight="semibold">
            Rp15000.0000
          </Text>
        </Td>
        <Td textAlign="center">
          <Badge w="full" colorScheme="green" rounded="md" px={3} py={1}>
            Lunas
          </Badge>
        </Td>
        <Td textAlign="center" w="15%">
          Lihat
        </Td>
        <Td textAlign="center">
          <Button
            onClick={onOpenUploadKwitansi}
            w="full"
            variant="lateksil-solid"
            size="md"
          >
            Upload
          </Button>
        </Td>
      </Tr>
      <UploadKwitansiModal
        isOpen={isOpenUploadKwitansi}
        onClose={onCloseUploadKwitansi}
      />
    </>
  );
};

export default TableLaporanPemabayaran;
