import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useMutationProgressTaskPengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/teknisi/progress_task';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teknisi');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationProgressTaskPengujian;
