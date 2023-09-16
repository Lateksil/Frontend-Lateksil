import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationChangeRoleUser = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/users/role';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users').then(() => {
          showToast('Perubahan Izin Akses Berhasil', 'success');
        });
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationChangeRoleUser;
