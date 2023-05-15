import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FaWallet } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdLoop } from 'react-icons/md';
import formatCurrency from '../../../utils/formatCurrently';
import Select from '../../core/select';
import { generateEntryOptions } from '../../core/select/helper/entryOptions';
import DashboardPagination from '../../dashboard/DashboardPagination';

const TableTahapPengerjaan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const dataHistoryTransactions = [
    {
      full_name: 'Deva Aji Saputra',
      company_name: 'PT. Pindad',
      name_project: 'Pembuatan Kubus',
      tanggal_pemesanan: '08 Mei 2023',
      total_price: '1050000',
      status_order: 'Accepted',
      status_payment: 'Lunas',
    },
    {
      full_name: 'Deva Aji Saputra',
      company_name: 'PT. Pindad',
      name_project: 'Pembuatan Kubus',
      tanggal_pemesanan: '08 Mei 2023',
      total_price: '1050000',
      status_order: 'Accepted',
      status_payment: 'Lunas',
    },
    {
      full_name: 'Deva Aji Saputra',
      company_name: 'PT. Pindad',
      name_project: 'Pembuatan Kubus',
      tanggal_pemesanan: '08 Mei 2023',
      total_price: '1050000',
      status_order: 'Accepted',
      status_payment: 'Lunas',
    },
  ];

  return (
    <TabPanel px="0">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Cari tahap pengerjaan"
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
              <Th textAlign="center">Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataHistoryTransactions.map((order, i) => (
              <Tr key={i}>
                <Td textAlign="center">{order.full_name}</Td>
                <Td textAlign="center">{order.company_name}</Td>
                <Td textAlign="center">{order.name_project}</Td>
                <Td textAlign="center">{order.tanggal_pemesanan}</Td>
                <Td textAlign="center" fontWeight="semibold" color="blue.700">
                  Rp{formatCurrency(order.total_price)}
                </Td>
                <Td
                  textAlign="center"
                  textDecoration="underline"
                  cursor="pointer"
                  _hover={{ color: 'blue' }}
                >
                  Detail
                </Td>
                <Td textAlign="center">
                  <Badge colorScheme="green" p={1}>
                    {order.status_payment}
                  </Badge>
                </Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<MdLoop />}
                    size="sm"
                    bg="#E44E69"
                    color="white"
                    _hover={{ bg: 'blue.800' }}
                  >
                    In Progress
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
    </TabPanel>
  );
};

export default TableTahapPengerjaan;
