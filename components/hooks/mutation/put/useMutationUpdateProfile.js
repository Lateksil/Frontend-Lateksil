import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationUpdateProfile = () => {
  const queryClient = useQueryClient();

  const uri = '/users/';

  async function updateData({ id, formData }) {
    const response = await axiosInstance.put(uri + id, formData);
    return response.data;
  }

  const { mutateAsync, ...others } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('info-user');
    },
  });

  return { mutateAsync, ...others };
};

export default useMutationUpdateProfile;
