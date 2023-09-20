import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import LoadingData from '../../utils/LoadingData';
import MessageSearchNotFound from '../../utils/MessageSearchNotFound';
import useRemoteTahapPengerjaan from '../../components/hooks/remote/useRemoteTahapPengerjaan';
import TableTahapPengerjaanPesanan from '../../components/tables/managerTable/TableTahapPengerjaanPesanan';
import MessageNotFoundData from '../../utils/MessageNotFoundData';

const TahapPengerjaan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const pengujianListRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const {
    data: dataProsePengujian,
    isLoading: isLoadingProsesPengujian,
    error,
  } = useRemoteTahapPengerjaan({
    page: pageIndex,
    limit: dataLimit,
  });

  useEffect(() => {
    setPageIndex(1);
  }, [dataLimit]);

  useEffect(() => {
    if (error == null && pageIndex > 1) setPageIndex(pageIndex - 1);
  }, [error]);

  const handlePageClick = (page) => {
    setPageIndex(page);

    if (pengujianListRef && pengujianListRef.current) {
      pengujianListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Tahap Pengerjaan | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="md">
          Tahap Pengerjaan
        </Text>
      </HStack>
      <HStack fontSize="xx-small">
        <Text display={{ base: 'none', md: 'block' }}>Show</Text>
        <Box w={{ base: '100px', md: '80px' }}>
          <Select
            isSearchable={false}
            options={showEntryOptions}
            defaultValue={showEntryOptions[0]}
            onChange={(option) => setDataLimit(option.value)}
          />
        </Box>
        <Text display={{ base: 'none', md: 'block' }}>Entries</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            fontSize="xs"
            placeholder="Search ..."
            variant="outline"
            shadow="none"
            // onChange={(e) => setSearchInput(e.target.value)}
            // onKeyPress={handleSearchKeypress}
          />
        </InputGroup>
      </HStack>
      <TableContainer>
        <Table size="md" fontSize="xs" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="xx-small">
                Nama Pelanggan
              </Th>
              <Th textAlign="center" fontSize="xx-small">
                Nama Proyek
              </Th>
              <Th textAlign="center" fontSize="xx-small">
                No Surat
              </Th>
              <Th textAlign="center" fontSize="xx-small">
                Teknisi
              </Th>
              <Th textAlign="center" fontSize="xx-small">
                Progress
              </Th>
              <Th textAlign="center" fontSize="xx-small">
                Result
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataProsePengujian?.data?.map((pengujian, i) => (
              <TableTahapPengerjaanPesanan pengujian={pengujian} key={i} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {dataProsePengujian?.data === null && <MessageSearchNotFound />}
      {isLoadingProsesPengujian && <LoadingData />}
      {dataProsePengujian?.totalData === 0 ? (
        <MessageNotFoundData />
      ) : (
        <Flex
          flexDir={{ base: 'column', md: 'row', xl: 'row' }}
          justifyContent="end"
          borderTopWidth="1px"
          alignItems="center"
          py="2"
        >
          <DashboardPagination
            current={pageIndex}
            total={dataProsePengujian ? dataProsePengujian?.totalPages : 0}
            onPageClick={handlePageClick}
          />
        </Flex>
      )}
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

TahapPengerjaan.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default TahapPengerjaan;
