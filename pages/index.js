import React, { useState } from "react";
import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { FiSearch } from "react-icons/fi";
import DashboardPagination from "../components/dashboard/DashboardPagination";
import TableFirstMainPage from "../components/tables/TableFirstMainPage";
import { getServerSidePropsCostumer } from "../utils/getServerSidePropsCostumer";
import useRemoteCategoriesClient from "../components/hooks/remote/useRemoteCategoriesClient";
import useRemotePengujianClient from "../components/hooks/remote/useRemotePengujianClient";
import Select from "../components/core/select";
import { useMemo } from "react";
import { generateEntryOptions } from "../components/core/select/helper/entryOptions";
import MessageNotFoundData from "../utils/MessageNotFoundData";

const HomeDashboard = () => {
  const [dataCat, setDataCat] = useState("Pengujian Aspal");
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const { data: dataCategoryClient } = useRemoteCategoriesClient();

  const {
    data: dataPengujianClient,
    isLoading: isLoadingPengujianClient,
    isError,
  } = useRemotePengujianClient({
    page: 1,
    limit: 10,
    category: dataCat,
  });

  const oddDataMapper =
  dataPengujianClient?.status === 200
      ? dataPengujianClient?.data.filter((_, index) => {
          return index % 2 !== 1;
        })
      : '';

  return (
    <VStack align="stretch">
      <Head>
        <title>Halaman Utama | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Halaman Utama
        </Text>
      </HStack>
      <Tabs variant="line">
        <TabList color="gray.500">
          {dataCategoryClient?.data.map((catergory, index) => (
            <React.Fragment key={index}>
              <Tab
                onClick={() => setDataCat(catergory.name_category)}
                _hover={{ bg: "gray.100" }}
                _selected={{ color: "white", bg: "blue.700" }}
              >
                {catergory.name_category}
              </Tab>
            </React.Fragment>
          ))}
        </TabList>
        <TabPanels>
          {dataCategoryClient?.data.map((catergory, index) => (
            <React.Fragment key={index}>
              <TabPanel px="0">
                <VStack>
                  <InputGroup as="form">
                    <InputLeftElement pointerEvents="none">
                      <FiSearch />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder={`Cari Jenis ${catergory.name_category}`}
                      variant="outline"
                      shadow="none"
                    />
                  </InputGroup>
                  <Flex bg="gray.300" w="full" rounded="lg" p="2">
                    <GridItem textAlign="center" alignSelf="center" w="55%">
                      <Flex h="full" direction="column" justifyContent="center">
                        <Text fontWeight="semibold" fontSize="small">
                          JENIS PENGUJIAN
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem textAlign="center" alignSelf="center" w="25%">
                      <Flex h="full" direction="column" justifyContent="center">
                        <Text fontWeight="semibold" fontSize="small">
                          KUANTITAS
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem textAlign="center" alignSelf="center" w="25%">
                      <Flex h="full" direction="column" justifyContent="center">
                        <Text fontWeight="semibold" fontSize="small">
                          KETERANGAN
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem textAlign="center" alignSelf="center" w="25%">
                      <Flex h="full" direction="column" justifyContent="center">
                        <Text fontWeight="semibold" fontSize="small">
                          HARGA
                        </Text>
                      </Flex>
                    </GridItem>
                  </Flex>
                  {dataPengujianClient?.data.map((pengujian, index) => (
                    <TableFirstMainPage key={index} pengujian={pengujian} odds={oddDataMapper} />
                  ))}
                  {isLoadingPengujianClient && (
                    <Center my="6">
                      <Spinner />
                    </Center>
                  )}
                  {isError && <MessageNotFoundData />}
                </VStack>
              </TabPanel>
            </React.Fragment>
          ))}
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
            <DashboardPagination
              current={1}
              total={dataPengujianClient ? dataPengujianClient?.totalPages : 0}
              onPageClick={() => {}}
            />
          </Flex>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

HomeDashboard.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HomeDashboard;
