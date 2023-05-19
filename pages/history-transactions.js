import React, { useMemo, useState } from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
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
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TableTahapPermintaan from '../components/tables/TableTahapPermintaan';
import { FiSearch } from 'react-icons/fi';
import useRemoteOrder from '../components/hooks/remote/useRemoteOrder';
import { generateEntryOptions } from '../components/core/select/helper/entryOptions';
import Select from '../components/core/select';
import DashboardPagination from '../components/dashboard/DashboardPagination';
import { TransactionTypes } from '../utils/enum/TransactionTypes';
import MessageClientNotFoundData from '../utils/MessageClientNotFoundData';
import useAuthUserStore from '../store/useAuthUserStore';

const HistroyTransactions = () => {
  const id = useAuthUserStore((state) => state.id);
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const [statusPersetujuan, setStatusPesetujuan] = useState(
    TransactionTypes.WAITING
  );

  const { data: dataOrdering, isLoading: isLoadingOrdering } = useRemoteOrder({
    status_transaction: statusPersetujuan,
  });

  return (
    <VStack align="stretch" spacing={5}>
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
            onClick={() => setStatusPesetujuan(TransactionTypes.WAITING)}
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Tahap Permintaan
          </Tab>
          <Tab
            onClick={() => setStatusPesetujuan(TransactionTypes.ACCEPT)}
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Tahap Pembayaran
          </Tab>
          <Tab
            onClick={() => setStatusPesetujuan(TransactionTypes.IN_PROGRESS)}
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Tahap Pengerjaan
          </Tab>
          <Tab
            onClick={() => setStatusPesetujuan(TransactionTypes.DONE)}
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
          >
            Selesai
          </Tab>
          <Tab
            onClick={() => setStatusPesetujuan(TransactionTypes.CANCELED)}
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
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
                {statusPersetujuan === TransactionTypes.ACCEPT && (
                  <Th textAlign="center">Aksi</Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {dataOrdering &&
                dataOrdering.data?.map((order, i) => (
                  <TableTahapPermintaan
                    key={i}
                    order={order}
                    isLoading={isLoadingOrdering}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Tabs>
      {dataOrdering?.totalData === 0 && <Box>Data Kosong</Box>}
      {!id && <MessageClientNotFoundData isLogin={false} />}
      {isLoadingOrdering && id ? (
        <Center my="10">
          <Spinner />
        </Center>
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

HistroyTransactions.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HistroyTransactions;
