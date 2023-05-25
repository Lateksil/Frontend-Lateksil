import React, { useMemo } from 'react';
import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
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
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsKeuangan } from '../../utils/getServerSidePropsKeuangan';
import TableLaporanPemabayaran from '../../components/tables/keuanganTable/TableLaporanPembayaran';
import Select from '../../components/core/select';
import { FiSearch } from 'react-icons/fi';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemotePayment from '../../components/hooks/remote/useRemotePayment';

const LaporanKeuangan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const {
    data: dataLaporanPembayaran,
    isLoading: isLoadingDataLaporanPembayaran,
    isSuccess,
  } = useRemotePayment({
    page: 1,
    limit: 10,
    search: '',
  });

  console.log('LAPORAN PEMBAYARAN', dataLaporanPembayaran);
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
      <HStack>
        <Text>Show</Text>
        <Select
          isSearchable={false}
          options={showEntryOptions}
          defaultValue={showEntryOptions[0]}
          // onChange={(option) => setDataLimit(option.value)}
        />
        <Text>Entries</Text>
        <Spacer />
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            variant="outline"
            shadow="none"
            // onChange={(e) => setSearchInput(e.target.value)}
            // onKeyPress={handleSearchKeypress}
          />
        </InputGroup>
      </HStack>
      <TableContainer>
        <Table size="md" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Nama Pelanggan</Th>
              <Th textAlign="center">Nama Proyek</Th>
              <Th textAlign="center">Tujuan Proyek</Th>
              <Th textAlign="center">Harga Pesanan</Th>
              <Th textAlign="center">Status Pembayaran</Th>
              <Th textAlign="center">Bukti Pembayaran</Th>
              <Th textAlign="center">Upload Kwitansi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess &&
              dataLaporanPembayaran?.data.map((order, i) => (
                <TableLaporanPemabayaran key={i} order={order} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        flexDir={{ base: 'column', md: 'row', xl: 'row' }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination current={1} total={10} onPageClick={() => {}} />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsKeuangan;

LaporanKeuangan.getLayout = (page) => (
  <DashboardLayout sidebarFor="keuangan">{page}</DashboardLayout>
);

export default LaporanKeuangan;
