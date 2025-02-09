import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';


export const useCategories = () => {
  const { data, error, isLoading } = useSWR(
    'https://fakestoreapi.com/products/categories',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    categories: data || [],
    isLoading,
    error: error ? 'Failed to fetch categories' : null,
  };
}; 