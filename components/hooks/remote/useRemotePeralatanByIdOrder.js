import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemotePeralatanByIdOrder = ({ id }) => {
  const uri = id ? `/peralatan/order/${id}` : null;

  const { data, ...others } = useQuery(['peralatan-by-order', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemotePeralatanByIdOrder;
