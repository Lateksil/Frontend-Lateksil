import { useQuery } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useRemoteCategoriesClient = () => {
  const uri = `/categories/client`;

  const { data, ...others } = useQuery(["categories", 1, 10], () =>
    postFetcher(uri, {
      page: 1,
      limit: 10,
      search: "",
      filter: {
        name_category: "",
      },
    })
  );

  return { data, ...others };
};

export default useRemoteCategoriesClient;
