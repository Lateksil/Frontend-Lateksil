import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteAllUser = ({ page, limit, search, role }) => {
  const uri = `/users`;

  const { data, ...others } = useQuery(
    ['users', page, limit, search, role],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
        role,
      })
  );

  return { data, ...others };
};

export default useRemoteAllUser;
