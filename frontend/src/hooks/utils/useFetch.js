import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        console.log('Fetched data:', result); 
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetching error:', error); 
        setError(error);
        setLoading(false);
      });
  }, [url, options]);

  return { data, error, loading };
};

export default useFetch;
