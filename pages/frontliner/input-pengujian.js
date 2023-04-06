import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { FiSearch } from "react-icons/fi";
import CreateNewInputPengujian from "../../components/create/frontlinerCreate/CreateNewPengujian";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardPagination from "../../components/dashboard/DashboardPagination";
import PengujianTableFrontliner from "../../components/tables/frontlinerTable/pengujianTable";
import { getServerSidePropsFrontliner } from "../../utils/getServerSidePropsFrontliner";

const InputPengujian = () => {
  return (
    <VStack align="stretch">
      <Head>
        <title>Input Pengujian | Lateksil</title>
      </Head>
      <CreateNewInputPengujian />
      <HStack>
        <Text>Show 1 Entries</Text>
        <Spacer />
        <InputGroup maxW="xs" as="form">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search ..."
            variant="outline"
            shadow="none"
          />
        </InputGroup>
      </HStack>
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Jenis Pengujian</Th>
              <Th>Kategori Pengujian</Th>
              <Th>Deskripsi</Th>
              <Th>Min Kuantitas</Th>
              <Th>Sampler</Th>
              <Th>Catatan Khusus</Th>
              <Th>Harga</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody is>
            <PengujianTableFrontliner />
          </Tbody>
        </Table>
      </Box>
      <Flex
        flexDir={{ base: "column", md: "row", xl: "row" }}
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

export const getServerSideProps = getServerSidePropsFrontliner;

InputPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default InputPengujian;
