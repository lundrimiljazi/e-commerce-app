import { create } from 'zustand';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

interface CategoryStore {
  categories: string[];
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
}

const useCategoryStore = create<CategoryStore>((set) => {
  const { data: categories, error } = useSWR('https://fakestoreapi.com/products/categories', fetcher);

  return {
    categories: categories || [],
    selectedCategory: 'All',
    isLoading: !categories && !error,
    error: error ? 'Failed to fetch categories' : null,
    fetchCategories: async () => {}, 
    setSelectedCategory: (category) => set({ selectedCategory: category }),
  };
});

export default useCategoryStore;