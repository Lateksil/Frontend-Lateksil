import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteRiwayatTeknisiStandbyId = ({ id }) => {
  const uri = id ? `/teknisi/riwayat/standby/${id}` : null;

  const { data, ...others } = useQuery(['riwayat-standby', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteRiwayatTeknisiStandbyId;
