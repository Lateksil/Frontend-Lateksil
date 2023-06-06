import React from 'react';
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import DetailProsesPengujian from '../../../modals/managerModal/detailProsesPengujian';

const TableTahapPengujianPesanan = ({ pengujian }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  return (
    <>
      <Tr cursor="pointer">
        <Td onClick={onOpenDetailPengujian}>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.User.full_name}</Text>
            <Text>{pengujian.User.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {pengujian.proyek.nama_proyek}
        </Td>
        <Td
          textAlign="center"
          color="blue.700"
          fontWeight="semibold"
          onClick={onOpenDetailPengujian}
        >
          Rp{formatCurrency(pengujian.total_price)}
        </Td>
        <Td textAlign="center">Lihat</Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          <Badge colorScheme="pink" px="4" py="2">
            On Progress
          </Badge>
        </Td>
        <Td textAlign="center">
          <Button variant="lateksil-solid">Upload</Button>
        </Td>
      </Tr>
      <DetailProsesPengujian
        id={pengujian.id}
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
    </>
  );
};

export default TableTahapPengujianPesanan;
