import { useMutation } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useMutationSendEmailReset = () => {
  const uri = '/auth/forgot-password';

  const { mutateAsync, ...others } = useMutation(async (formData) => {
    const data = await postFetcher(uri, formData);
    return data;
  });

  return { mutateAsync, ...others };
};

export default useMutationSendEmailReset;
