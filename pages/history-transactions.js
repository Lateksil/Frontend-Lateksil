import React, { useMemo } from 'react';
import {
  Box,
  Center,
  Flex,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TableTahapPembayaran from '../components/tables/TableTahapPembayaran';
import TableTahapPengerjaan from '../components/tables/TableTahapPengerjaan';
import TableTahapPenyelesaian from '../components/tables/TableTahapPenyelesaian';
import TableTahapPermintaan from '../components/tables/TableTahapPermintaan';
import { FiSearch } from 'react-icons/fi';
import useRemoteOrder from '../components/hooks/remote/useRemoteOrder';
import { generateEntryOptions } from '../components/core/select/helper/entryOptions';
import Select from '../components/core/select';
import DashboardPagination from '../components/dashboard/DashboardPagination';

const HistroyTransactions = () => {
  const {
    data: dataOrdering,
    isError,
    isLoading: isLoadingOrdering,
  } = useRemoteOrder();

  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

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
      <Tabs variant="line" isFitted>
        <TabList color="gray.500" flexWrap="wrap" justifyContent="center">
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
          <TabPanel px="0">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Cari tahap permintaan"
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
                    <Th textAlign="center">Nama Perusahaan</Th>
                    <Th textAlign="center">Nama Proyek</Th>
                    <Th textAlign="center">Tanggal Pemesanan</Th>
                    <Th textAlign="center">Total Harga</Th>
                    <Th textAlign="center">Pesanan</Th>
                    <Th textAlign="center">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataOrdering &&
                    dataOrdering.data?.map((order) => (
                      <TableTahapPermintaan
                        order={order}
                        isLoading={isLoadingOrdering}
                      />
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            {isLoadingOrdering && !isError && (
              <Center my="10">
                <Spinner />
              </Center>
            )}
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
              <DashboardPagination
                current={1}
                total={1}
                onPageClick={() => {}}
              />
            </Flex>
          </TabPanel>
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
