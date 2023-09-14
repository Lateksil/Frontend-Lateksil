import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteCostumer = ({ page, limit, isActive, search }) => {
  const uri = `/costumers`;

  const { data, ...others } = useQuery(
    ['costumers', page, limit, isActive, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
        isActive_payment: isActive,
      })
  );

  return { data, ...others };
};

export default useRemoteCostumer;
