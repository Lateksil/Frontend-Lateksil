import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteRiwayatTeknisiOnGoingId = ({ id }) => {
  const uri = id ? `/teknisi/riwayat/on_going/${id}` : null;

  const { data, ...others } = useQuery(['riwayat-ongoing', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteRiwayatTeknisiOnGoingId;
