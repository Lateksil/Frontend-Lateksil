import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemotePengujianClient = ({ page, limit }) => {
  const uri = `/pengujian/client`;

  const { data, ...others } = useQuery(["pengujian", page, limit], () =>
    postFetcher(uri, {
      page,
      limit,
      search: "",
      filter: {
        category: "",
      },
    })
  );

  return { data, ...others };
};

export default useRemotePengujianClient;
