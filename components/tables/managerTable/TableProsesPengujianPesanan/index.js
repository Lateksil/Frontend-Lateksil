import React from 'react';
import {
  Badge,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import formatCurrency from '../../../../utils/formatCurrently';
import { FaTools, FaUserPlus } from 'react-icons/fa';
import PilihTeknisiModal from '../../../modals/managerModal/pilihTeknisiModal';

const TableProsesPengujianPesanan = () => {
  const {
    isOpen: isOpenPilihTeknisi,
    onOpen: onOpenPilihTeknisi,
    onClose: onClosePilihTeknisi,
  } = useDisclosure();
  return (
    <>
      <Tr cursor="pointer">
        <Td>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">Deva Aji Saputra</Text>
            <Text>PT. Indonesia</Text>
          </Flex>
        </Td>
        <Td textAlign="center">Pembuatan Kubus</Td>
        <Td textAlign="center" color="blue.700" fontWeight="semibold">
          Rp{formatCurrency(1500000)}
        </Td>
        <Td textAlign="center">27 Mei 2023</Td>
        <Td textAlign="center">04 Juni 2023</Td>
        <Td textAlign="center">19 Juni 2023</Td>
        <Td textAlign="center">
          <Badge colorScheme="green" px="4" py="2">
            Lunas
          </Badge>
        </Td>

        <Td textAlign="center">
          <Menu placement="left">
            <MenuButton
              as={IconButton}
              icon={<BsThreeDotsVertical />}
              border="1px solid #102D62"
              rounded="xl"
            />
            <MenuList>
              <MenuItem
                icon={<FaUserPlus size={15} />}
                color="green.700"
                fontWeight="semibold"
                onClick={onOpenPilihTeknisi}
              >
                Teknisi
              </MenuItem>
              <MenuItem
                icon={<FaTools size={15} />}
                color="orange.600"
                fontWeight="semibold"
              >
                Peralatan
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <PilihTeknisiModal
        isOpen={isOpenPilihTeknisi}
        onClose={onClosePilihTeknisi}
      />
    </>
  );
};

export default TableProsesPengujianPesanan;
