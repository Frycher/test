import { API_ENDPOINTS } from '@/api/endpoints';
import { httpClient } from '@/api/http';
import { Post } from '@/types/post';
import { useEffect, useState } from 'react';

export const usePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get(API_ENDPOINTS.POSTS)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading, data, error };
};
