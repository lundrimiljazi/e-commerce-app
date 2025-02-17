import { create } from 'zustand'
import { Product } from '@/types/productType';



interface ProductState {
  filteredProducts: Product[];
  paginatedProducts: Product[];
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  selectedProduct: Product | null;
  searchQuery: string;
  selectedSort: string;
}

interface ProductActions {
  setCategory: (category: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  updateUrl: () => void;
  setSort: (sort: string) => void;
}

const initialState: ProductState = {
  filteredProducts: [],
  paginatedProducts: [],
  selectedCategory: 'All',
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 9,
  selectedProduct: null,
  searchQuery: '',
  selectedSort: "default",
};

const useProductStore = create<ProductState & ProductActions>((set, get) => ({
  ...initialState,

  setCategory: (category: string) => {
    if (category !== get().selectedCategory) {
      set({ 
        selectedCategory: category,
        currentPage: 1,
      });
      const currentSort = get().selectedSort;
      if (currentSort && currentSort !== 'default') {
        set({ selectedSort: currentSort });
      }
      get().updateUrl();
    }
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setCurrentPage: (page) => {
    const { filteredProducts, itemsPerPage } = get();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    set({ 
      currentPage: page,
      paginatedProducts: filteredProducts.slice(start, end)
    });
    
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    
    const category = params.get('category');
    const search = params.get('search');
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    get().updateUrl();
  },

  updateUrl: () => {
    const { currentPage, selectedCategory, searchQuery, selectedSort } = get();
    const params = new URLSearchParams(window.location.search);
    
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (selectedSort && selectedSort !== 'default') params.set('sort', selectedSort);

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);
  },

  setSort: (sort) => set({ selectedSort: sort }),
}));

export default useProductStore;