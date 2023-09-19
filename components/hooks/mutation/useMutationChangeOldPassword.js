import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useMutationChangeOldPassword = () => {
  const queryClient = useQueryClient();

  const uri = '/auth/change-password';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('info-user');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationChangeOldPassword;
