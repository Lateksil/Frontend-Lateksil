import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationResetPassword = ({ id }) => {
  const uri = id ? `/auth/reset-password/${id}` : null;

  const { mutateAsync, ...others } = useMutation(async (formData) => {
    const response = await axiosInstance.put(uri, formData);
    return response.data;
  });

  return { mutateAsync, ...others };
};

export default useMutationResetPassword;
