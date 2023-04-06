import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";
import useToastSuccess from "../useToastSuccess";

const useMutationCreateCategories = (formData) => {
  const queryClient = useQueryClient();
  const showToastSuccess = useToastSuccess();
  
  const uri = "/category/create";
  

  const mutations = useMutation(
    async () => {
      const data = await postFetcher(uri, formData);
      console.log('YESS', data)
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories").then(() => {
          showToastSuccess();
        });
      },
    }
  );

  return mutations;
};

export default useMutationCreateCategories;
