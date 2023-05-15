import { parseCookies } from 'nookies';
import { fetcherWithContext } from '../libs/axios';

export const getServerSidePropsCostumer = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: '/' });

  if (email && accessToken) {
    const url = `/me/${email}`;

    const userResponse = await fetcherWithContext(url, context);

    if (userResponse) {
      if (userResponse.data.role === 'frontliner')
        return {
          redirect: {
            destination: '/frontliner',
            permanent: false,
          },
        };
    }
  }

  return {
    props: {},
  };
};
