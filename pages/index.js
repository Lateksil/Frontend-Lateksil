import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Center,
  Flex,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuItem,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { FiSearch } from 'react-icons/fi';
import Slider from 'react-slick';
import { AiOutlineClose } from 'react-icons/ai';
import DashboardPagination from '../components/dashboard/DashboardPagination';
import TableFirstMainPage from '../components/tables/TableFirstMainPage';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';
import useRemoteCategoriesClient from '../components/hooks/remote/useRemoteCategoriesClient';
import useRemotePengujianClient from '../components/hooks/remote/useRemotePengujianClient';
import Select from '../components/core/select';
import { useMemo } from 'react';
import { generateEntryOptions } from '../components/core/select/helper/entryOptions';
import MessageNotFoundData from '../utils/MessageNotFoundData';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MainPenugujianCardGrid from '../components/main/mainPengujianCardGrid';
import MainCardPengujian from '../components/main/mainCardPengujian';

const HomeDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [filterTempatPengujian, setFilterTempatPengujian] = useState('');

  const [dataCat, setDataCat] = useState('Pengujian Aspal');
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const { data: dataCategoryClient, isLoading: isLoadingCategoryClient } =
    useRemoteCategoriesClient();

  const {
    data: dataPengujianClient,
    isLoading: isLoadingPengujianClient,
    isError,
  } = useRemotePengujianClient({
    page: 1,
    limit: 10,
    search: searchText,
    category: dataCat,
  });

  const oddDataMapper =
    dataPengujianClient?.status === 200
      ? dataPengujianClient?.data.filter((_, index) => {
          return index % 2 !== 1;
        })
      : '';

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <VStack align="stretch">
      <Head>
        <title>Halaman Utama | Lateksil</title>
      </Head>
      <Flex
        justifyContent="center"
        flexDir="row"
        overflowX="auto"
        py={{ md: '5' }}
      >
        {dataCategoryClient ? (
          dataCategoryClient?.data.map((category, i) => (
            <React.Fragment key={i}>
              <Box
                cursor="pointer"
                bg={dataCat === category.name_category ? 'blue.700' : '#f5f5f5'}
                color={dataCat === category.name_category ? 'white' : 'black'}
                rounded="md"
                p="4"
                fontSize={{ base: '10px', md: 'md' }}
                onClick={() => setDataCat(category.name_category)}
                fontWeight={
                  dataCat === category.name_category ? 'semibold' : 'normal'
                }
                mx="3"
              >
                <Text w="max-content">{category.name_category}</Text>
              </Box>
            </React.Fragment>
          ))
        ) : (
          <>
            <HStack>
              <Skeleton height="50px" w="180px" />
              <Skeleton height="50px" w="180px" />
              <Skeleton height="50px" w="180px" />
              <Skeleton height="50px" w="180px" />
              <Skeleton height="50px" w="180px" />
            </HStack>
          </>
        )}
      </Flex>
      <Flex justify="center" pb="6">
        <Flex w="full" maxW="3xl">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch />
            </InputLeftElement>
            {searchText !== '' && (
              <InputRightElement>
                <Icon
                  cursor="pointer"
                  as={AiOutlineClose}
                  onClick={() => setSearchText('')}
                />
              </InputRightElement>
            )}
            <Input
              type="text"
              placeholder={`Cari ${dataCat}`}
              variant="outline"
              bg="#f5f5f5"
              _placeholder={{ color: '#45414180' }}
              onChange={(state) => setSearchText(state.target.value)}
              value={searchText}
            />
          </InputGroup>
          <Box ml="3">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {filterTempatPengujian === '' ? 'Semua' : filterTempatPengujian}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setFilterTempatPengujian('')}>
                  Semua
                </MenuItem>
                <MenuItem
                  onClick={() => setFilterTempatPengujian('Laboratorium')}
                >
                  Laboratorium
                </MenuItem>
                <MenuItem onClick={() => setFilterTempatPengujian('Lapangan')}>
                  Lapangan
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <VStack align="stretch" mx="auto" spacing="4">
        <Text fontSize="xl" fontWeight="semibold">
          {dataCat}
        </Text>
        <MainPenugujianCardGrid>
          {dataPengujianClient?.data.map((pengujian, index) => (
            <MainCardPengujian
              key={index}
              pengujian={pengujian}
              isLoading={isLoadingCategoryClient}
            />
          ))}
        </MainPenugujianCardGrid>
      </VStack>
      {isError && <MessageNotFoundData />}
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
        <DashboardPagination
          current={1}
          total={dataPengujianClient ? dataPengujianClient?.totalPages : 0}
          onPageClick={() => {}}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

HomeDashboard.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HomeDashboard;
