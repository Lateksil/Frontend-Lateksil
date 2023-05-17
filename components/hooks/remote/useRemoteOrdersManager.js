import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteOrdersManager = ({ status_persetujuan }) => {
  const uri = `/m/orders`;

  const { data, ...others } = useQuery(['order', status_persetujuan], () =>
    postFetcher(uri, {
      page: 1,
      limit: 10,
      status_persetujuan,
    })
  );

  return { data, ...others };
};

export default useRemoteOrdersManager;
