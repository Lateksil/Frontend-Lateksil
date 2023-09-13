import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteNotifHistoryTransaction = ({ id }) => {
  const uri = id ? `/notif/history-transaction/${id}` : null;

  const { data, ...others } = useQuery(['notif-transaction', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteNotifHistoryTransaction;
