import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemotePengujian = ({ page, limit }) => {
  const uri = `/pengujian`;

  const { data, ...others } = useQuery(["pengujian", page, page], () =>
    postFetcher(uri, {
      page,
      limit,
    })
  );

  return { data, ...others };
};

export default useRemotePengujian;
