import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemotePengujianClient = ({ page, limit, search, category }) => {
  const uri = `/pengujian/client`;

  const { data, ...others } = useQuery(
    ["pengujian", page, limit, category, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
        filter: {
          category: category,
        },
      })
  );

  return { data, ...others };
};

export default useRemotePengujianClient;
