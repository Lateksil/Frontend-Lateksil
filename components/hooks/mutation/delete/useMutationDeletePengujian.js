import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFetcher } from "../../../../libs/axios";
import useToastNotification from "../../useToastNotification";

const useMutationDeletePengujian = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = "/pengujian/";
  

  const { mutate, ...others } = useMutation(
    async (id) => {
      const data = await deleteFetcher(uri + id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories").then(() => {
            showToast("delete pengujian successfully", "warning");
        });
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationDeletePengujian;
