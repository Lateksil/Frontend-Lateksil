import {
  Badge,
  Box,
  Flex,
  HStack,
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import Select from "../../core/select";
import { generateEntryOptions } from "../../core/select/helper/entryOptions";
import DashboardPagination from "../../dashboard/DashboardPagination";

const TableTahapPermintaan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  return (
    <TabPanel px="0">
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
            <Tr>
              <Td textAlign="center">Deva Aji Saputra</Td>
              <Td textAlign="center">PT. LSKK</Td>
              <Td textAlign="center">Pembuatan Kubus</Td>
              <Td textAlign="center">08 Mei 2023</Td>
              <Td textAlign="center" fontWeight="semibold" color="blue.700">
                Rp.50.000.000
              </Td>
              <Td
                textAlign="center"
                textDecoration="underline"
                cursor="pointer"
                _hover={{ color: 'blue'}}
              >
                Detail
              </Td>
              <Td textAlign="center">
                <Badge colorScheme="orange" p={1}>
                  Waiting
                </Badge>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        flexDir={{ base: "column", md: "row", xl: "row" }}
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
        <DashboardPagination current={1} total={10} onPageClick={() => {}} />
      </Flex>
    </TabPanel>
  );
};

export default TableTahapPermintaan;
