import {
  Badge,
  Box,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import formatCurrency from '../../../utils/formatCurrently';
import Select from '../../core/select';
import { generateEntryOptions } from '../../core/select/helper/entryOptions';
import DashboardPagination from '../../dashboard/DashboardPagination';
import useRemoteOrder from '../../hooks/remote/useRemoteOrder';
import ModalTahapPermintaan from '../../modals/userModal/ModalTahapPermintaan';
import LateksilImage from '../../../assets/images/testing-ilustrator.jpg';
import NextImage from '../../core/nextimage';
import useAuthUserStore from '../../../store/useAuthUserStore';

const TableTahapPermintaan = () => {
  const id = useAuthUserStore((state) => state.id);
  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const {
    data: dataOrdering,
    isSuccess,
    isLoading: isLoadingOrdering,
  } = useRemoteOrder();

  const statusOrder = (status) => {
    if (status === '0') {
      return 'orange';
    }
    if (status === '1') {
      return 'red';
    }
  };

  console.log('DATA', dataOrdering);

  if (!id) {
    return (
      <Flex flexDir="column" align="center">
        <Box width={200} height={200}>
          <NextImage
            src={LateksilImage}
            alt="Civil Engginering Illustration"
            layout="responsive"
            placeholder="blur"
          />
        </Box>
        <Text textAlign="center" fontWeight="semibold">
          Belum Ada Order? Silahkan Masuk Terlebih Dahulu
        </Text>
      </Flex>
    );
  }

  return (
    <TabPanel px="0">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Cari tahap permintaan"
          variant="outline"
          shadow="none"
          _placeholder={{ color: '#45414180' }}
        />
      </InputGroup>
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
            {isSuccess &&
              dataOrdering.data?.map((order, i) => (
                <Tr key={i}>
                  <Td textAlign="center">{order.User.full_name}</Td>
                  <Td textAlign="center">{order.User.company_name}</Td>
                  <Td textAlign="center">{order.proyek.nama_proyek}</Td>
                  <Td textAlign="center">Belum ada</Td>
                  <Td textAlign="center" fontWeight="semibold" color="blue.700">
                    Rp{formatCurrency(order.total_price)}
                  </Td>
                  <Td
                    textAlign="center"
                    textDecoration="underline"
                    cursor="pointer"
                    _hover={{ color: 'blue' }}
                    onClick={onOpenDetailHistory}
                  >
                    Detail
                  </Td>
                  <Td textAlign="center">
                    <Badge
                      colorScheme={statusOrder(order.status.status_persetujuan)}
                      rounded="md"
                      px={3}
                      py={1}
                    >
                      Tes
                    </Badge>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoadingOrdering && (
        <Center my="10">
          <Spinner />
        </Center>
      )}
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
        <DashboardPagination current={1} total={1} onPageClick={() => {}} />
      </Flex>
      <ModalTahapPermintaan
        isOpen={isOpenDetailHistory}
        onClose={onCloseDetailHistory}
      />
    </TabPanel>
  );
};

export default TableTahapPermintaan;
