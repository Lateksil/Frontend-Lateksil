import axios from "axios";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import useAuthUserStore from "../store/useAuthUserStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030/",
});

axiosInstance.interceptors.request.use((config) => {
  let newConfig;

  if (typeof window !== "undefined") {
    newConfig = config;

    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `bearer ${useAuthUserStore.getState().accessToken}`,
    };
  }

  return newConfig || config;
}, undefined);

export const fetcher = (resource, init) =>
  axiosInstance
    .get(resource, init)
    .then((res) => res.data)
    .catch((err) => {
      destroyCookie(null, "_e", { path: "/" });
      destroyCookie(null, "_t", { path: "/" });
      useRouter().push("/login");
    });

export const postFetcher = (resource, init) =>
  axiosInstance
    .post(resource, init)
    .then((res) => res.data)
    .catch((err) => {
      destroyCookie(null, "_e", { path: "/" });
      destroyCookie(null, "_t", { path: "/" });
      useRouter().push("/login");
    });

export const fetcherWithContext = async (resource, context) => {
  const { _t: accessToken } = parseCookies(context);

  try {
    const response = await axiosInstance.get(
      resource,
      accessToken
        ? {
            headers: {
              Authorization: `bearer ${accessToken}`,
            },
          }
        : undefined
    );

    return response.data;
  } catch (error) {
    return undefined;
  }
};

export default axiosInstance;
