import React from 'react';
import { useRouter } from 'next/router';
import { Badge, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import ParseDate from '../../../core/parseDate';
import useMutationProgressTaskPengujian from '../../../hooks/mutation/useMutationProgressTaskPengujian';
import useToastNotification from '../../../hooks/useToastNotification';
import { PengerjaanTypes } from '../../../../utils/enum/PengerjaanTypes';
const TablePengerjaanTask = ({ pengujian }) => {
  const router = useRouter();
  const showToast = useToastNotification();
  const {
    mutateAsync: mutateTaskToComplete,
    isLoading: isLoadingTaskProgress,
  } = useMutationProgressTaskPengujian();

  const onClickTaskToInProgress = async () => {
    try {
      mutateTaskToComplete({
        id: pengujian.id,
        status_pengerjaan: PengerjaanTypes.COMPLETED,
      }).then(() => router.push('/teknisi/pengerjaan'));
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
    }
  };
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
        <Badge colorScheme="pink" p="2" rounded="md" w="full">
          Sedang Dikerjakan
        </Badge>
      </Td>
      <Td textAlign="center" cursor="pointer">
        <Button
          variant="lateksil-solid"
          isLoading={isLoadingTaskProgress}
          onClick={onClickTaskToInProgress}
        >
          Upload
        </Button>
      </Td>
    </Tr>
  );
};

export default TablePengerjaanTask;
