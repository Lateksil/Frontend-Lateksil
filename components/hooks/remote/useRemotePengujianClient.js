import { useInfiniteQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePengujianClient = ({ page, limit, search, category }) => {
  const uri = `/pengujian/client`;

  const { data, ...others } = useInfiniteQuery(
    ['pengujian', page, limit, category, search],
    ({ pageParam = 1 }) =>
      postFetcher(uri, {
        page: pageParam,
        limit,
        search,
        filter: {
          category: category,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        if (allPages.length < lastPage.totalPages) {
          return lastPage.data?.length !== 0 ? nextPage : undefined;
        }
      },
    }
  );

  return { data, ...others };
};

export default useRemotePengujianClient;
