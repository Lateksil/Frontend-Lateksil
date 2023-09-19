import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { AiOutlineLeft } from 'react-icons/ai';
import { FaTasks, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { BsListTask } from 'react-icons/bs';
import {
  MdAssignmentTurnedIn,
  MdCall,
  MdCorporateFare,
  MdEmail,
} from 'react-icons/md';
import useRemoteRiwayatTeknisiStandbyId from '../../../../components/hooks/remote/useRemoteRiwayatTeknisiStandbyId';
import ParseDate from '../../../../components/core/parseDate';
import useRemoteRiwayatTeknisiOnGoingId from '../../../../components/hooks/remote/useRemoteRiwayatTeknisiOnGoingId';
import TableRiwayatTugasPemesanan from '../../../../components/tables/managerTable/TableRiwayatTugasPemesanan';

const RiwayatProyekTeknisi = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: dataRiwayatStandBy } = useRemoteRiwayatTeknisiStandbyId({
    id: id,
  });

  const { data: dataRiwayatOnGoing } = useRemoteRiwayatTeknisiOnGoingId({
    id: id,
  });

  return (
    <React.Fragment>
      <VStack align="stretch" spacing={5}>
        <Head>
          <title>Riwayat Proyek | Lateksil</title>
        </Head>
        <HStack borderBottomWidth="1px" pb="4">
          <NextLink href={`/manager/data-teknisi`} passHref>
            <Flex align="center" gap={1} cursor="pointer">
              <Icon color="blue.700" w={5} h={5} as={AiOutlineLeft} />
              <Text color="blue.700" fontWeight="bold" fontSize="xl">
                Riwayat Tugas Teknisi
              </Text>
            </Flex>
          </NextLink>
        </HStack>
      </VStack>
      <Flex direction="column" mt={8}>
        <Flex align="center" gap={2} borderBottomWidth="1px" pb="4">
          <Icon w={3} h={3} as={FaUser} />
          <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'md' }}>
            Informasi Teknisi
          </Text>
        </Flex>
        <HStack gap={5} mt="2">
          <Avatar src="" name={dataRiwayatStandBy?.data.full_name} size="2xl" />
          <Box mt="2" ml="5">
            <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight="semibold">
              {dataRiwayatStandBy?.data.full_name}
            </Text>
            <HStack>
              <Icon w={5} h={5} as={MdEmail} />
              <Text fontSize={{ base: 'sm', lg: 'md' }}>
                {dataRiwayatStandBy?.data.email}
              </Text>
            </HStack>
            <HStack>
              <Icon w={5} h={5} as={MdCall} />
              <Text fontSize={{ base: 'sm', lg: 'md' }}>
                {dataRiwayatStandBy?.data.no_whatsapp}
              </Text>
            </HStack>
            <HStack>
              <Icon w={5} h={5} as={MdAssignmentTurnedIn} />
              <Text fontSize={{ base: 'sm', lg: 'md' }}>
                {dataRiwayatStandBy?.data.TeknisiPengujians.length} Proyek
              </Text>
            </HStack>
            <Text fontSize={{ base: 'sm', lg: 'md' }}>
              {dataRiwayatStandBy?.data.address}
            </Text>
          </Box>
        </HStack>
      </Flex>
      <Flex direction="column" mt={8}>
        <Flex align="center" gap={2} borderBottomWidth="1px" pb="4">
          <Icon w={3} h={3} as={BsListTask} />
          <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'md' }}>
            Rincian Penugasaan Saat ini
          </Text>
          {dataRiwayatOnGoing?.data?.TeknisiPengujians.length === 0 ? (
            <Badge p="2" alignSelf="start" colorScheme="green" rounded="md">
              Stand-by
            </Badge>
          ) : (
            <Badge p="2" alignSelf="start" colorScheme="yellow" rounded="md">
              on-going
            </Badge>
          )}
        </Flex>
        <Box mt="2">
          {dataRiwayatOnGoing?.data?.TeknisiPengujians.length === 0 && (
            <Text mr="2" fontWeight="bold" color="green.700">
              Saat ini Teknisi sedang Standby. Silahkan untuk memilih teknisi
              ini untuk mengerjakan proyek yang sedang tersedia.
            </Text>
          )}
          {dataRiwayatOnGoing?.data?.TeknisiPengujians.map((dataRiwayat, i) => (
            <Box
              key={i}
              p="3"
              borderWidth={1}
              boxShadow="base"
              cursor="pointer"
            >
              <Tooltip label="Detail Order" hasArrow arrowSize={15}>
                <Flex gap={3}>
                  <Box align="stretch" flexGrow={1} direction="column">
                    <Flex align="center" gap={1} cursor="pointer">
                      <Icon w={5} h={5} as={MdCorporateFare} />
                      <Text fontWeight="semibold" fontSize="lg">
                        {dataRiwayat.order.User.company_name}
                      </Text>
                    </Flex>
                    <Text fontSize="smaller">
                      {dataRiwayat.order.User.full_name}
                    </Text>
                    <Text fontWeight="semibold">
                      Proyek : {dataRiwayat.order.proyek.nama_proyek}
                    </Text>
                    <Flex justify="space-between" align="center">
                      <Badge
                        colorScheme="yellow"
                        w="max"
                        px="2"
                        py="1"
                        rounded="md"
                        mt="2"
                      >
                        on-going
                      </Badge>
                      <Box>
                        <Text textAlign="end" fontSize="smaller">
                          Tanggal Mulai:{' '}
                          {ParseDate(dataRiwayat.order.proyek.tanggal_mulai)}
                        </Text>
                        <Text textAlign="end" fontSize="smaller">
                          Tanggal Selesai:{' '}
                          {ParseDate(dataRiwayat.order.proyek.tanggal_selesai)}
                        </Text>
                      </Box>
                    </Flex>
                    <HStack align="center" mt="2">
                      <Spacer />
                      <ButtonGroup>
                        <Button
                          w="full"
                          isDisabled={true}
                          variant="lateksil-solid"
                        >
                          lihat hasil
                        </Button>
                      </ButtonGroup>
                    </HStack>
                  </Box>
                </Flex>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Flex>
      <Flex direction="column" gap={4} mt={8}>
        <Flex align="center" borderBottomWidth="1px" pb="4" gap={2}>
          <Icon w={3} h={3} as={FaTasks} />
          <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'md' }}>
            Detail Riwayat
          </Text>
        </Flex>
        {dataRiwayatStandBy?.data?.TeknisiPengujians.map((dataRiwayat, i) => (
          <TableRiwayatTugasPemesanan key={i} data={dataRiwayat} />
        ))}
      </Flex>
    </React.Fragment>
  );
};

RiwayatProyekTeknisi.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default RiwayatProyekTeknisi;
