import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationAddToCart = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/cart/create';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart').then(() => {
          showToast('Produk Telah Ditambahkan ke Keranjang', 'success');
        });
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationAddToCart;
