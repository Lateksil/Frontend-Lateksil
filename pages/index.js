import React, { useState } from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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

const HomeDashboard = () => {
  const { data: dataCategoryClient } = useRemoteCategoriesClient();

  const DataPengujian = [
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
    { jenis_pengujian: "Core Drill Aspal", kuantitas: 7, harga: "RP1050.000" },
  ];

  const readDataFirstCategory = dataCategoryClient?.data[0].name_category;

  const [dataCat, setDataCat] = useState(readDataFirstCategory);

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
                    <GridItem textAlign="center" alignSelf="center" w="25%">
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
                          HARGA
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
                  </Flex>
                  {DataPengujian.map((pengujian, index) => (
                    <Flex key={index} bg="#E9F0F2" w="full" rounded="lg" p="2">
                      <TableFirstMainPage pengujian={pengujian} />
                    </Flex>
                  ))}
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

                <Text>Entries</Text>
              </HStack>
            </Box>
            <DashboardPagination
              current={1}
              total={10}
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
