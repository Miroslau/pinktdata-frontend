import { useEffect, useState } from 'react';
import useMountedState from './useMountedState';

const useFetch = (getData, setData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useMountedState();

  useEffect(async () => {
    if (isMounted()) {
      try {
        const { data } = await getData();
        setData(data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
  }, [isMounted]);

  return {
    isLoading,
    error,
  };
};

export default useFetch;
