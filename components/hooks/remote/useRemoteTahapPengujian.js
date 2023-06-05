import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteTahapPengujian = ({ page, limit, search = '' }) => {
  const uri = `/tahap-pengujian`;

  const { data, ...others } = useQuery(
    ['tahap-pengujian', page, limit, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
      })
  );

  return { data, ...others };
};

export default useRemoteTahapPengujian;
