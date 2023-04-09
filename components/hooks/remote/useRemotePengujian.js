import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemotePengujian = ({ page, limit, search }) => {
  const uri = `/pengujian`;

  const { data, ...others } = useQuery(["pengujian", page, page, search], () =>
    postFetcher(uri, {
      page,
      limit,
      search,
      filter: {
        category: "",
      },
    })
  );

  return { data, ...others };
};

export default useRemotePengujian;
