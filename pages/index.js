import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
} from '@chakra-ui/react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { FiSearch } from 'react-icons/fi';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';
import useRemoteCategoriesClient from '../components/hooks/remote/useRemoteCategoriesClient';
import useRemotePengujianClient from '../components/hooks/remote/useRemotePengujianClient';
import MessageNotFoundData from '../utils/MessageNotFoundData';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MainPenugujianCardGrid from '../components/main/mainPengujianCardGrid';
import MainCardPengujian from '../components/main/mainCardPengujian';
import Slider from 'react-slick';

const HomeDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [filterTempatPengujian, setFilterTempatPengujian] = useState('');

  const [dataCat, setDataCat] = useState('Pengujian Aspal');
  const { data: dataCategoryClient } = useRemoteCategoriesClient();

  const {
    data: dataPengujianClient,
    isLoading: isLoadingPengujianClient,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useRemotePengujianClient({
    page: page,
    limit: 10,
    search: searchText,
    category: dataCat,
    tempat_pengujian: filterTempatPengujian,
  });

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <Box
        cursor="pointer"
        position="absolute"
        bgColor="rgba(78, 74, 81, 0.689)"
        color="white"
        top="25%"
        right={0}
        p="2"
        rounded="full"
        onClick={onClick}
      >
        <BsChevronRight />
      </Box>
    );
  }
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <Box
        cursor="pointer"
        position="absolute"
        bgColor="rgba(78, 74, 81, 0.689)"
        color="white"
        top="25%"
        zIndex={3}
        left={0}
        p="2"
        rounded="full"
        onClick={onClick}
      >
        <BsChevronLeft />
      </Box>
    );
  }

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6.1,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow onClick />,
    prevArrow: <PrevArrow onClick />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          arrows: false,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3.5,
          arrows: false,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: false,
          speed: 220,
          slidesToShow: 2.5,
          arrows: false,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <VStack align="stretch">
      <Head>
        <title>Halaman Utama | Lateksil</title>
      </Head>
      <Box borderBottomWidth={2}>
        <Flex justifyContent="center" flexDir="row" py={{ md: '5' }}>
          <Box w="full">
            <Slider {...settings}>
              {dataCategoryClient &&
                dataCategoryClient?.data.map((category, i) => (
                  <React.Fragment key={i}>
                    <Box
                      w="max-content"
                      cursor="pointer"
                      bg={
                        dataCat === category.name_category
                          ? 'blue.700'
                          : '#f5f5f5'
                      }
                      color={
                        dataCat === category.name_category ? 'white' : 'black'
                      }
                      rounded="md"
                      p="4"
                      fontSize={{ base: '10px', md: 'md' }}
                      onClick={() => setDataCat(category.name_category)}
                      fontWeight={
                        dataCat === category.name_category
                          ? 'semibold'
                          : 'normal'
                      }
                      mx="3"
                    >
                      <Text textAlign="center">{category.name_category}</Text>
                    </Box>
                  </React.Fragment>
                ))}
            </Slider>
          </Box>
        </Flex>
        <Flex justify="center" pb="6" mt="4">
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
                  {filterTempatPengujian === ''
                    ? 'Semua'
                    : filterTempatPengujian}
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
                  <MenuItem
                    onClick={() => setFilterTempatPengujian('Lapangan')}
                  >
                    Lapangan
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <VStack align="stretch" mx="auto" spacing="4">
        <Text fontSize="xl" fontWeight="semibold">
          {dataCat}
        </Text>
        <MainPenugujianCardGrid>
          {dataPengujianClient?.pages.map((page) =>
            page.data?.map((pengujian, index) => (
              <>
                <MainCardPengujian
                  key={index}
                  pengujian={pengujian}
                  isLoading={isLoadingPengujianClient}
                />
              </>
            ))
          )}
        </MainPenugujianCardGrid>
      </VStack>
      {isError && <MessageNotFoundData />}
      <Flex justify="center" py="2">
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading...'
              : hasNextPage
              ? 'Load more'
              : 'Nothing more to load'}
          </Button>
        )}
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

HomeDashboard.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HomeDashboard;
