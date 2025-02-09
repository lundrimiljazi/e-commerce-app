'use server';

import { Product } from "@/types/productType";

export async function searchProducts(query: string): Promise<{
  products: Product[];
  error?: string;
}> {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: {
        revalidate: 3600 
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    const filteredProducts = products.filter((product: Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      products: filteredProducts
    };
  } catch (error) {
    return {
      products: [],
      error: 'Failed to fetch products'
    };
  }

  }
  export async function getProduct(id: string): Promise<Product> {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    } catch (error) {
      throw new Error("Failed to fetch product");
    }
  }



export async function fetchCategories() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories", {
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();
    return {
      categories: ['All', ...categories],
      error: null
    };
  } catch (error) {
    console.error('Fetch categories error:', error);
    return {
      categories: [],
      error: 'Failed to fetch categories'
    };
  }
}