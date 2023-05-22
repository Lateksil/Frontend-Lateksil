import React from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsKeuangan } from '../../utils/getServerSidePropsKeuangan';

const LaporanKeuangan = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Laporan Pembayaran | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Laporan Pembayaran
        </Text>
      </HStack>
      <HStack>Laporan Keuangan</HStack>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsKeuangan;

LaporanKeuangan.getLayout = (page) => (
  <DashboardLayout sidebarFor="keuangan">{page}</DashboardLayout>
);

export default LaporanKeuangan;
