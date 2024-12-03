import { useEffect } from 'react';
import { useRefreshAuthTokenMutation } from '../services/user';

function useAuthTokenRefresh() {
  const [refreshAuthToken] = useRefreshAuthTokenMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAuthToken()
        .unwrap()
        .then(() => console.log('Token refreshed'))
        .catch((error) => console.error('Token refresh failed:', error));
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshAuthToken]);
}

export default useAuthTokenRefresh;

