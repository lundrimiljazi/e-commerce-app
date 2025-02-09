import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';


export const fetchSingleProduct = (id:string) => {
  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    product: data || [],
    isLoading,
    error: error ? 'Failed to fetch product' : null,
  };
}; 
export const fetchAllProducts = () => {
  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    product: data || [],
    isLoading,
    error: error ? 'Failed to fetch product' : null,
  };
}; 