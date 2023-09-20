import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemotePengujianById = ({ id }) => {
  const uri = id ? `/pengujian/${id}` : null;

  const { data, ...others } = useQuery(['detail-pengujian', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemotePengujianById;
