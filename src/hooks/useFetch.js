import { useEffect, useState } from 'react';

const useFetch = (func, param = null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const result = await func(param);
        setData(result);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [func, param]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
