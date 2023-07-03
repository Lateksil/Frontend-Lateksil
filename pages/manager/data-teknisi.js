import { HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';

const DataTeknisi = () => {
  return (
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Data Teknisi | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Data Teknisi
        </Text>
        <Spacer />
      </HStack>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

DataTeknisi.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default DataTeknisi;
