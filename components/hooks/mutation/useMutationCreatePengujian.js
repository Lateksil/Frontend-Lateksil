import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";
import useToastNotification from "../useToastNotification";

const useMutationCreatePengujian = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = "/pengujian/create";

  const { mutate, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("pengujian").then(() => {
          showToast("Berhasil Menambahkan Pengujian", "success");
        });
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationCreatePengujian;
