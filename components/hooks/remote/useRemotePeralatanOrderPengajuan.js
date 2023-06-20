import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePeralatanOrderPengajuan = ({ page = 1, limit = 10 }) => {
  const uri = `/peralatan/pengajuan`;

  const { data, ...others } = useQuery(['peralatan', page, limit], () =>
    postFetcher(uri, {
      page,
      limit,
    })
  );

  return { data, ...others };
};

export default useRemotePeralatanOrderPengajuan;
