import { useEffect, useState } from 'react';
import useMountedState from './useMountedState';

const useFetch = (getData, setData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useMountedState();

  useEffect(async () => {
    if (isLoading) {
      try {
        const { data } = await getData();
        if (isMounted()) setData(data);
      } catch (err) {
        if (isMounted()) setError(err.message);
      } finally {
        if (isMounted()) setIsLoading(false);
      }
    }
  }, [isMounted]);

  return {
    isLoading,
    error,
  };
};

export default useFetch;
