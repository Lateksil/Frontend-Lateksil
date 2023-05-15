import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Table,
  TableContainer,
  TabList,
  Tabs,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemoteOrders from '../../components/hooks/remote/useRemoteOrders';
import { getServerSidePropsFrontliner } from '../../utils/getServerSidePropsFrontliner';
import LoadingData from '../../utils/LoadingData';
import MessageNotFoundData from '../../utils/MessageNotFoundData';
import TablePengajuanPesanan from '../../components/tables/frontlinerTable/TablePengajuanPesanan';
import { TransactionTypes } from '../../utils/enum/TransactionTypes';

const HomeDashboardFrontliner = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const [statusPersetujuan, setStatusPesetujuan] = useState('');

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isSuccess: isSuccessOrder,
  } = useRemoteOrders({
    status_persetujuan: statusPersetujuan,
  });

  console.log('depdep');
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
      <Tabs variant="line" isFitted>
        <TabList color="gray.500">
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan('')}
          >
            Semua Pemesanan
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan(TransactionTypes.WAITING)}
          >
            Proses
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan(TransactionTypes.ACCEPT)}
          >
            Diterima
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan(TransactionTypes.CANCELED)}
          >
            Dibatalkan
          </Tab>
        </TabList>
        <InputGroup my="5">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Cari Pengajuan Pemesanan"
            variant="outline"
            shadow="none"
            _placeholder={{ color: '#45414180' }}
          />
        </InputGroup>
        <TableContainer>
          <Table size="md" variant="striped">
            <Thead>
              <Tr>
                <Th textAlign="center">Nama Pelanggan</Th>
                <Th textAlign="center">Nama Proyek</Th>
                <Th textAlign="center">Tanggal Pendaftaran</Th>
                <Th textAlign="center" isNumeric>
                  Total Harga
                </Th>
                <Th textAlign="center">Status Pembayaran</Th>
                <Th textAlign="center">Status Persetujuan</Th>
                <Th textAlign="center">Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isSuccessOrder &&
                dataOrders?.data?.map((order) => (
                  <TablePengajuanPesanan key={order.id} order={order} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Tabs>
      {isLoadingOrders && <LoadingData />}
      {dataOrders?.totalData === 0 ? (
        <MessageNotFoundData />
      ) : (
        <Flex
          flexDir={{ base: 'column', md: 'row', xl: 'row' }}
          justifyContent="space-between"
          borderTopWidth="1px"
          alignItems="center"
          py="2"
        >
          <Box display="flex" fontSize="sm" alignItems="center">
            <HStack>
              <Text>Show</Text>
              <Select
                isSearchable={false}
                options={showEntryOptions}
                defaultValue={showEntryOptions[0]}
                onChange={() => {}}
              />
              <Text>Entries</Text>
            </HStack>
          </Box>
          <DashboardPagination current={1} total={1} onPageClick={() => {}} />
        </Flex>
      )}
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsFrontliner;

HomeDashboardFrontliner.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default HomeDashboardFrontliner;
