import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../libs/axios";
import useAuthUserStore from "../../../store/useAuthUserStore";

const useRemoteUserProfile = () => {
  const email = useAuthUserStore((state) => state.email);

  const uri = email ? `/me/${email}` : null;

  const { data, ...others } = useQuery(["info-user"], () => fetcher(uri));

  return { data, ...others };
};

export default useRemoteUserProfile;
