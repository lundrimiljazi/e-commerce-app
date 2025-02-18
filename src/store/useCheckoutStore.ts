import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutStore {
  isCheckoutComplete: boolean;
  isPaymentFailed: boolean;
  setCheckoutComplete: (status: boolean) => void;
  setPaymentFailed: (status: boolean) => void;
  resetCheckoutState: () => void;
}

const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      isCheckoutComplete: false,
      isPaymentFailed: false,
      setCheckoutComplete: (status) => set({ isCheckoutComplete: status }),
      setPaymentFailed: (status) => set({ isPaymentFailed: status }),
      resetCheckoutState: () => 
        set({ isCheckoutComplete: false, isPaymentFailed: false }),
    }),
    {
      name: "checkout-storage",
    }
  )
);

export default useCheckoutStore;