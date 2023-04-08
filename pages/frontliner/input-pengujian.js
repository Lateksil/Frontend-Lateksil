import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import CreateNewInputPengujian from "../../components/create/frontlinerCreate/CreateNewPengujian";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardPagination from "../../components/dashboard/DashboardPagination";
import useRemotePengujian from "../../components/hooks/remote/useRemotePengujian";
import PengujianTableFrontliner from "../../components/tables/frontlinerTable/pengujianTable";
import { getServerSidePropsFrontliner } from "../../utils/getServerSidePropsFrontliner";
import MessageNotFoundData from "../../utils/MessageNotFoundData";

const InputPengujian = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const {
    data: dataPengujian,
    isLoading: isLoadingDataPengujian,
    error,
    isError,
  } = useRemotePengujian({
    page: pageIndex,
    limit: dataLimit,
  });

  console.log(isError);

  const pengujianListRef = useRef(null);

  useEffect(() => {
    setPageIndex(1);
  }, [dataLimit]);

  useEffect(() => {
    if (error && pageIndex > 1) setPageIndex(pageIndex - 1);
  }, [error, pageIndex]);

  const handlePageClick = (page) => {
    setPageIndex(page);

    if (pengujianListRef && pengujianListRef.current) {
      pengujianListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              <Th textAlign="center" w="30%">Jenis Pengujian</Th>
              <Th textAlign="center">Kategori Pengujian</Th>
              <Th textAlign="center">Deskripsi</Th>
              <Th textAlign="center" w="5%">Min Kuantitas</Th>
              <Th textAlign="center">Sampler</Th>
              <Th textAlign="center">Catatan Khusus</Th>
              <Th textAlign="center">Harga</Th>
              <Th textAlign="center">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPengujian?.data.map((pengujian, i) => (
              <PengujianTableFrontliner key={i} pengujian={pengujian} />
            ))}
          </Tbody>
        </Table>
        {isLoadingDataPengujian && (
          <Center my="6">
            <Spinner />
          </Center>
        )}
        {isError && <MessageNotFoundData />}
      </Box>
      <Flex
        flexDir={{ base: "column", md: "row", xl: "row" }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination
          current={pageIndex}
          total={dataPengujian ? dataPengujian?.totalPages : 0}
          onPageClick={handlePageClick}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsFrontliner;

InputPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default InputPengujian;
