import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemotePengujian = () => {
  const uri = `/pengujian`;

  const { data, ...others } = useQuery(["pengujian", 1, 10], () =>
    postFetcher(uri, {
      page: 1,
      limit: 10,
    })
  );

  return { data, ...others };
};

export default useRemotePengujian;
