import { create } from "zustand";
import { persist } from "zustand/middleware";
import { simulatePurchase } from "@/lib/mockApi";
import { toast } from "sonner";
import { Product } from "@/types/productType";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  isCartOpen: boolean;
  isProcessing: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  handleCheckout: () => Promise<void>;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      isProcessing: false,

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        });
        toast.success("Item added to cart");
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
        toast.error("Item removed from cart");
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      getCartTotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().cart.length;
      },

      handleCheckout: async () => {
        set({ isProcessing: true });
        try {
          await simulatePurchase();
          get().clearCart();
          set({ isCartOpen: false });
        } catch (error) {
          throw error;
        } finally {
          set({ isProcessing: false });
        }
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
      
    }
  )
);

export default useCartStore;
