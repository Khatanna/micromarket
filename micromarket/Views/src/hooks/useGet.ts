import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const useGet = <T>(url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    instance.get(url).then(({ data }) => {
      setData(data);
    }).catch(setError).finally(() => setIsLoading(false));
  }, [])

  return {
    data,
    isLoading,
    error
  }
}