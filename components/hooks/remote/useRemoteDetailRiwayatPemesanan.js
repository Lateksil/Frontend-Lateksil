import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteDetailRiwayatPemesanan = ({ id }) => {
  const uri = id ? `/teknisi/riwayat/${id}` : null;

  const { data, ...others } = useQuery(['detail-riwayat', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteDetailRiwayatPemesanan;
