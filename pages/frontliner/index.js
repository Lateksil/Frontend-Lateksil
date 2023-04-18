import {
  HStack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SemuaPemesananTable from '../../components/tables/frontlinerTable/semuaPesananTable';
import TableTahapPembayaran from '../../components/tables/TableTahapPembayaran';
import TableTahapPengerjaan from '../../components/tables/TableTahapPengerjaan';
import TableTahapPenyelesaian from '../../components/tables/TableTahapPenyelesaian';
import TableTahapPermintaan from '../../components/tables/TableTahapPermintaan';
import { getServerSidePropsFrontliner } from '../../utils/getServerSidePropsFrontliner';

const HomeDashboardFrontliner = () => {
  return (
    <VStack align="stretch">
      <Head>
        <title>Pengajuan Pemesanan | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Pengajuan Pemesanan
        </Text>
      </HStack>
      <Tabs variant="line">
        <TabList color="gray.500">
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Semua Pemesanan
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Proses
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Diterima
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Dibatalkan
          </Tab>
        </TabList>
        <TabPanels>
          <SemuaPemesananTable />
          <TableTahapPembayaran />
          <TableTahapPengerjaan />
          <TableTahapPenyelesaian />
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsFrontliner;

HomeDashboardFrontliner.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default HomeDashboardFrontliner;
