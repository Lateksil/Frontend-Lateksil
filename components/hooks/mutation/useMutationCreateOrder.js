import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationCreateOrder = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/order/create';

  const { mutate, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order').then(() => {
          showToast('Sukses Ordering!!', 'success');
        });
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationCreateOrder;
