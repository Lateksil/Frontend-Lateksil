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
import React, { useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemoteOrderByIdTeknisi from '../../components/hooks/remote/useRemoteOrderByIdTeknisi';
import TableTaskPengujian from '../../components/tables/teknisiTable/TableTaskPengujian';
import { TaskTeknisiTypes } from '../../utils/enum/TaskTeknisiType';
import { getServerSidePropsTeknisi } from '../../utils/getServerSidePropsTeknisi';
import LoadingData from '../../utils/LoadingData';

const TaskTeknisi = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const { data: dataPengujianTeknisi, isLoading: isLoadingPengujianTeknisi } =
    useRemoteOrderByIdTeknisi({
      status_task: TaskTeknisiTypes.TASK_PENDING,
    });

  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Task Teknisi | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="2xl">
          Task Pengujian
        </Text>
      </HStack>
      <HStack>
        <Text>Show</Text>
        <Select
          isSearchable={false}
          options={showEntryOptions}
          defaultValue={showEntryOptions[0]}
          //   onChange={(option) => setDataLimit(option.value)}
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
              <Th textAlign="center">No Surat</Th>
              <Th textAlign="center">Nama Proyek</Th>
              <Th textAlign="center">Tujuan Proyek</Th>
              <Th textAlign="center">Tanggal Mulai</Th>
              <Th textAlign="center">Tanggal Selesai</Th>
              <Th textAlign="center">Status Task</Th>
              <Th textAlign="center">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPengujianTeknisi?.data.map((pengujian, i) => (
              <TableTaskPengujian key={i} pengujian={pengujian} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoadingPengujianTeknisi && <LoadingData />}
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

export const getServerSideProps = getServerSidePropsTeknisi;

TaskTeknisi.getLayout = (page) => (
  <DashboardLayout sidebarFor="teknisi">{page}</DashboardLayout>
);

export default TaskTeknisi;
