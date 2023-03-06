import { useEffect, useState } from 'react';

const useFetch = (func, param = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await func(param);
        setData(response);
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
