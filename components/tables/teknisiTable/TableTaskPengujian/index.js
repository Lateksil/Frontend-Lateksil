import React from 'react';
import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import ParseDate from '../../../core/parseDate';

const TableTaskPengujian = ({ pengujian }) => {
  return (
    <Tr>
      <Td cursor="pointer">
        <Flex direction="column" w="full">
          <Text fontWeight="semibold">{pengujian.order.User.full_name}</Text>
          <Text>{pengujian.order.User.company_name}</Text>
        </Flex>
      </Td>
      <Td textAlign="center" cursor="pointer">
        {pengujian.order.proyek.no_surat}
      </Td>
      <Td textAlign="center" cursor="pointer">
        {pengujian.order.proyek.nama_proyek}
      </Td>
      <Td textAlign="center" cursor="pointer">
        {pengujian.order.proyek.tujuan_proyek}
      </Td>
      <Td textAlign="center" cursor="pointer">
        {ParseDate(pengujian.order.proyek.tanggal_mulai)}
      </Td>
      <Td textAlign="center" cursor="pointer">
        {ParseDate(pengujian.order.proyek.tanggal_selesai)}
      </Td>
      <Td textAlign="center" cursor="pointer">
        <Button variant="lateksil-solid">Kerjakan</Button>
      </Td>
    </Tr>
  );
};

export default TableTaskPengujian;
