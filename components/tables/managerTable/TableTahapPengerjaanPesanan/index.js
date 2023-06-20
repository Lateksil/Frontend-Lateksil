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
import DetailTeknisiProgress from '../../../modals/managerModal/detailTeknisiProgress';
import DetailTahapPengerjaan from '../../../modals/managerModal/detailTahapPengerjaan';

const TableTahapPengerjaanPesanan = ({ pengujian }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const {
    isOpen: isOpenTeknisiProgress,
    onOpen: onOpenTeknisiProgress,
    onClose: onCloseTeknisiProgress,
  } = useDisclosure();

  // const isDone = dataTeknisi?.data.every(
  //   (status) => status.status_pengerjaan === PengerjaanTypes.COMPLETED
  // );

  // if (isDone) {
  //   console.log('done');
  // } else {
  //   console.log('progress');
  // }

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
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {pengujian.proyek.no_identifikasi}
        </Td>
        <Td textAlign="center">
          <Button variant="lateksil-solid" onClick={onOpenTeknisiProgress}>
            Lihat
          </Button>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          <Badge colorScheme="pink" px="4" py="2">
            On Progress
          </Badge>
        </Td>
        <Td textAlign="center">
          <Button variant="lateksil-solid">Upload</Button>
        </Td>
      </Tr>
      <DetailTahapPengerjaan
        id={pengujian.id}
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
      <DetailTeknisiProgress
        id={pengujian.id}
        isOpen={isOpenTeknisiProgress}
        onClose={onCloseTeknisiProgress}
      />
    </>
  );
};

export default TableTahapPengerjaanPesanan;
