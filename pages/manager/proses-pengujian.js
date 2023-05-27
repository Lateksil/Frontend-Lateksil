import React, { useMemo } from 'react';
import {
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
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import TableProsesPengujianPesanan from '../../components/tables/managerTable/TableProsesPengujianPesanan';

const ProsesPengujian = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Proses Pengujian | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="2xl">
          Proses Pengujian
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
            placeholder="Search ..."
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
              <Th textAlign="center">Harga</Th>
              <Th textAlign="center">Tanggal Daftar</Th>
              <Th textAlign="center">Mulai</Th>
              <Th textAlign="center">Selesai</Th>
              <Th textAlign="center">Status Pembayaran</Th>
              <Th textAlign="center">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableProsesPengujianPesanan />
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

ProsesPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default ProsesPengujian;
