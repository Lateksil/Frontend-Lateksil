import React, { useEffect, useMemo, useState } from 'react';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import {
  Box,
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
import Select from '../../components/core/select';
import { FiSearch } from 'react-icons/fi';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import TableRolePermissions from '../../components/tables/managerTable/TableRolePermissions';
import useRemoteAllUser from '../../components/hooks/remote/useRemoteAllUser';
import LoadingData from '../../utils/LoadingData';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import MessageSearchNotFound from '../../utils/MessageSearchNotFound';
import { generateOptionsRoles } from '../../utils/entryOptions/generateEntryRoles';

const RolePermissons = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const showEntryRoles = useMemo(() => generateOptionsRoles(), []);

  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');

  const [activeRoles, setActiveRoles] = useState('');

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    error,
  } = useRemoteAllUser({
    page: pageIndex,
    limit: dataLimit,
    search: filter ? filter.found : '',
    role: activeRoles,
  });

  useEffect(() => {
    setPageIndex(1);
  }, [dataLimit]);

  useEffect(() => {
    if (error == null && pageIndex > 1) setPageIndex(pageIndex - 1);
  }, [error]);

  const handlePageClick = (page) => {
    setPageIndex(page);
  };

  const handleSearchKeypress = (e) => {
    if (e.key === 'Enter' && searchInput !== '') {
      setFilter((prev) => ({
        ...prev,
        found: searchInput,
      }));
      setPageIndex(1);
    }
  };

  useEffect(() => {
    if (searchInput === '') {
      setFilter('');
    }
  }, [searchInput]);
  return (
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Role Permissions | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Role Permissions
        </Text>
        <Spacer />
      </HStack>
      <HStack>
        <Text>Show</Text>
        <Select
          isSearchable={false}
          options={showEntryOptions}
          defaultValue={showEntryOptions[0]}
          onChange={(option) => setDataLimit(option.value)}
        />
        <Spacer />
        <Box ml="3">
          <Select
            isSearchable={false}
            options={showEntryRoles}
            defaultValue={showEntryRoles[0]}
            onChange={(option) => setActiveRoles(option.value)}
          />
        </Box>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            variant="outline"
            shadow="none"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeypress}
          />
        </InputGroup>
      </HStack>
      <TableContainer>
        <Table size="md" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Nama Perusahaan</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">No. Telp</Th>
              <Th textAlign="center">Role</Th>
              <Th textAlign="center">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataUsers &&
              dataUsers?.data?.map((user, i) => (
                <TableRolePermissions key={i} user={user} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {dataUsers?.data === null && <MessageSearchNotFound />}
      {isLoadingUsers ? (
        <LoadingData />
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
            total={dataUsers ? dataUsers?.totalPages : 0}
            onPageClick={handlePageClick}
          />
        </Flex>
      )}
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

RolePermissons.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default RolePermissons;
