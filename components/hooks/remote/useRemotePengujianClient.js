import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemotePengujianClient = ({ page, limit, category }) => {
  const uri = `/pengujian/client`;

  const { data, ...others } = useQuery(["pengujian", page, limit, category], () =>
    postFetcher(uri, {
      page,
      limit,
      search: "",
      filter: {
        category: category,
      },
    })
  );

  return { data, ...others };
};

export default useRemotePengujianClient;
