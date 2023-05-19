import React, { useMemo, useState } from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import useRemoteOrder from '../components/hooks/remote/useRemoteOrder';
import { generateEntryOptions } from '../components/core/select/helper/entryOptions';
import Select from '../components/core/select';
import DashboardPagination from '../components/dashboard/DashboardPagination';
import { TransactionTypes } from '../utils/enum/TransactionTypes';
import MessageClientNotFoundData from '../utils/MessageClientNotFoundData';
import useAuthUserStore from '../store/useAuthUserStore';
import TableTahapTransaction from '../components/tables/userTable/TableTahapTransaction';
import MessageDataNotFoundClient from '../utils/MessageDataNotFoundClient';
import ButtonTab from '../components/core/ButtonTab';

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
        <title>Daftar Transaksi | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Daftar Transaksi
        </Text>
      </HStack>
      <TableContainer>
        <HStack align="center" spacing={5}>
          <ButtonTab
            label={TransactionTypes.WAITING}
            value={statusPersetujuan}
            onClick={() => setStatusPesetujuan(TransactionTypes.WAITING)}
          >
            Tahap Permintaan
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.ACCEPT}
            value={statusPersetujuan}
            onClick={() => setStatusPesetujuan(TransactionTypes.ACCEPT)}
          >
            Tahap Pembayaran
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.IN_PROGRESS}
            value={statusPersetujuan}
            onClick={() => setStatusPesetujuan(TransactionTypes.IN_PROGRESS)}
          >
            Tahap Pengerjaan
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.DONE}
            value={statusPersetujuan}
            onClick={() => setStatusPesetujuan(TransactionTypes.DONE)}
          >
            Selesai
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.CANCELED}
            value={statusPersetujuan}
            onClick={() => setStatusPesetujuan(TransactionTypes.CANCELED)}
          >
            Dibatalkan
          </ButtonTab>
        </HStack>
      </TableContainer>
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
                <TableTahapTransaction
                  key={i}
                  order={order}
                  isLoading={isLoadingOrdering}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* </Tabs> */}
      {dataOrdering?.totalData === 0 && (
        <MessageDataNotFoundClient>
          Ups? Dalam Tahap ini Data Kosong
        </MessageDataNotFoundClient>
      )}
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
