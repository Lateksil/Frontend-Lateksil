import React from 'react';
import Head from 'next/head';
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
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Select from '../../components/core/select';
import { FiSearch } from 'react-icons/fi';
import { useMemo } from 'react';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import TableProsesPengujian from '../../components/tables/frontlinerTable/TableProsesPengujian';
import DashboardPagination from '../../components/dashboard/DashboardPagination';

const ProsesPengujian = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  return (
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Proses Pengujian | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Proses Pengujian
        </Text>
        <Spacer />
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
              <Th textAlign="center">No. Surat</Th>
              <Th textAlign="center">Status</Th>
              <Th textAlign="center">Data Teknisi</Th>
              <Th textAlign="center">Progress</Th>
              <Th textAlign="center">Result</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TableProsesPengujian />
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

ProsesPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default ProsesPengujian;
