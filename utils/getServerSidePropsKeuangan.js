import { destroyCookie, parseCookies } from 'nookies';
import { fetcherWithContext } from '../libs/axios';

export const getServerSidePropsKeuangan = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: '/' });

  if (email && accessToken) {
    const url = `/me/${email}`;

    const userResponse = await fetcherWithContext(url, context);

    if (userResponse) {
      if (userResponse.data.role !== 'keuangan')
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
    }

    const returnValue = {
      props: {},
    };

    return returnValue;
  }

  destroyCookie(context, '_id', { path: '/' });
  destroyCookie(context, '_e', { path: '/' });
  destroyCookie(context, '_t', { path: '/' });

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
