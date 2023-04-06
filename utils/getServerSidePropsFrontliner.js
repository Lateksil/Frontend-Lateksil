import { destroyCookie, parseCookies } from "nookies";
import { fetcherWithContext } from "../libs/axios";

export const getServerSidePropsFrontliner = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: "/" });

  if (email && accessToken) {
    const url = `/me/${email}`;

    const userResponse = await fetcherWithContext(url, context);

    if (userResponse) {
      if (userResponse.data.role !== "frontliner")
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
    }

    const returnValue = {
      props: {
        // fallback: {
        //   [url]: userResponse,
        // },
      },
    };

    return returnValue;
  }

  destroyCookie(context, "_e", { path: "/" });
  destroyCookie(context, "_t", { path: "/" });

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
