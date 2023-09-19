import React from 'react';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import ParseDate from '../../../core/parseDate';
import { baseUrl } from '../../../../libs/axios';
import { MdCorporateFare } from 'react-icons/md';
import DetailRiwayatDataPemesananModal from '../../../modals/managerModal/detailRiwayatDataPemesananModal';

const TableRiwayatTugasPemesanan = ({ data }) => {
  const router = useRouter();

  const {
    isOpen: isOpenDetailRiwayat,
    onOpen: onOpenDetailRiwayat,
    onClose: onCloseDetailRiwayat,
  } = useDisclosure();

  return (
    <>
      <Box p="3" borderWidth={1} boxShadow="base">
        <Flex gap={3}>
          <Box align="stretch" flexGrow={1} direction="column">
            <Box cursor="pointer" onClick={onOpenDetailRiwayat}>
              <Flex align="center" gap={1}>
                <Icon w={5} h={5} as={MdCorporateFare} />
                <Text fontWeight="semibold" fontSize="lg">
                  {data.order.User.company_name}
                </Text>
              </Flex>
              <Text fontSize="smaller">{data.order.User.full_name}</Text>
              <Text fontWeight="semibold">
                Proyek : {data.order.proyek.nama_proyek}
              </Text>
              <Flex justify="space-between" align="center">
                <Badge
                  colorScheme={
                    data.status_penugasan === '1' ? 'green' : 'yellow'
                  }
                  w="max"
                  px="2"
                  py="1"
                  rounded="md"
                  mt="2"
                >
                  {data.status_penugasan === '1' ? 'Selesai' : 'On-going'}
                </Badge>
                <Box>
                  <Text textAlign="end" fontSize="smaller">
                    Tanggal Mulai: {ParseDate(data.order.proyek.tanggal_mulai)}
                  </Text>
                  <Text textAlign="end" fontSize="smaller">
                    Tanggal Selesai:{' '}
                    {ParseDate(data.order.proyek.tanggal_selesai)}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <HStack align="center" mt="2">
              <Spacer />
              <ButtonGroup>
                <Button
                  w="full"
                  isDisabled={data.status_penugasan === '1' ? false : true}
                  variant="lateksil-solid"
                  onClick={() =>
                    router.push(
                      `${baseUrl}view-task/${data.file_task_pengujian}`
                    )
                  }
                >
                  lihat hasil
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
        </Flex>
      </Box>
      <DetailRiwayatDataPemesananModal
        id={data.id}
        isOpen={isOpenDetailRiwayat}
        onClose={onCloseDetailRiwayat}
      />
    </>
  );
};

export default TableRiwayatTugasPemesanan;
