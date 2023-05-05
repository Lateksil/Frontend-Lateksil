import React from 'react';
import {
  Box,
  Flex,
  GridItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TableTahapPembayaran from '../components/tables/TableTahapPembayaran';
import TableTahapPengerjaan from '../components/tables/TableTahapPengerjaan';
import TableTahapPenyelesaian from '../components/tables/TableTahapPenyelesaian';
import TableTahapPermintaan from '../components/tables/TableTahapPermintaan';

const HistroyTransactions = () => {
  return (
    <VStack align="stretch">
      <Head>
        <title>Riwayat Transaksi | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Riwayat Transaksi
        </Text>
      </HStack>
      <Tabs variant="line">
        <TabList color="gray.500">
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Tahap Permintaan
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Tahap Pembayaran
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Tahap Pengerjaan
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Selesai
          </Tab>
        </TabList>
        <TabPanels>
          <TableTahapPermintaan />
          <TableTahapPembayaran />
          <TableTahapPengerjaan />
          <TableTahapPenyelesaian />
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

HistroyTransactions.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HistroyTransactions;
