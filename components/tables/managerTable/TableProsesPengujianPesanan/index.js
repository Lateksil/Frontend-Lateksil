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
import ParseDate from '../../../core/parseDate';
import AddPeralatanModal from '../../../modals/managerModal/addPeralatanModal';

const TableProsesPengujianPesanan = ({ pengujian }) => {
  const {
    isOpen: isOpenAddPeralatan,
    onOpen: onOpenAddPeralatan,
    onClose: onCloseAddPeralatan,
  } = useDisclosure();

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
            <Text fontWeight="semibold">{pengujian.User.full_name}</Text>
            <Text>{pengujian.User.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center">{pengujian.proyek.nama_proyek}</Td>
        <Td textAlign="center" color="blue.700" fontWeight="semibold">
          Rp{formatCurrency(pengujian.total_price)}
        </Td>
        <Td textAlign="center">{ParseDate(pengujian.createdAt)}</Td>
        <Td textAlign="center">{ParseDate(pengujian.proyek.tanggal_mulai)}</Td>
        <Td textAlign="center">
          {ParseDate(pengujian.proyek.tanggal_selesai)}
        </Td>
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
                onClick={onOpenAddPeralatan}
              >
                Peralatan
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <AddPeralatanModal
        isOpen={isOpenAddPeralatan}
        onClose={onCloseAddPeralatan}
      />
      <PilihTeknisiModal
        isOpen={isOpenPilihTeknisi}
        onClose={onClosePilihTeknisi}
      />
    </>
  );
};

export default TableProsesPengujianPesanan;
