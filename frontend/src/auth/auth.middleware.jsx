import { Spin } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRefreshTokenMutation } from '../api/users.api';
import { parseExpiryTokenTime } from '../utils/parse-expiry-token-time.util';
import { setCredentials } from './auth.slice';

export default function AuthMiddleware({ children }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken] = useRefreshTokenMutation();

  useLayoutEffect(() => {
    let intervalId;
    const accessToken = localStorage.getItem('jwt');

    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    refreshToken()
      .unwrap()
      .then((response) => {
        const newAccessToken = response.accessToken;

        if (!newAccessToken) {
          return;
        }

        dispatch(setCredentials(response));

        const expiryTokenTime = parseExpiryTokenTime(newAccessToken);

        intervalId = setInterval(() => {
          refreshToken().unwrap();
        }, expiryTokenTime - 3 * 60 * 1000);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));

    return () => {
      intervalId && clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spin fullscreen tip='Looading ...' />;
  }

  return children;
}
