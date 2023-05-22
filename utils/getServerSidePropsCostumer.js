import { parseCookies } from 'nookies';
import { fetcherWithContext } from '../libs/axios';

export const getServerSidePropsCostumer = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: '/' });

  if (email && accessToken) {
    const url = `/me/${email}`;

    const userResponse = await fetcherWithContext(url, context);

    console.log('DATA RESPON', userResponse);

    if (userResponse) {
      if (userResponse.data.role === 'frontliner')
        return {
          redirect: {
            destination: '/frontliner',
            permanent: false,
          },
        };

      if (userResponse.data.role === 'manager')
        return {
          redirect: {
            destination: '/manager',
            permanent: false,
          },
        };

      if (userResponse.data.role === 'keuangan')
        return {
          redirect: {
            destination: '/keuangan',
            permanent: false,
          },
        };
    }
  }

  return {
    props: {},
  };
};
