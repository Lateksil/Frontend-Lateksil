import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePayment = ({ page, limit, search }) => {
  const uri = `/payment`;

  const { data, ...others } = useQuery(['payment', page, limit, search], () =>
    postFetcher(uri, {
      page,
      limit,
      search,
    })
  );

  return { data, ...others };
};

export default useRemotePayment;
