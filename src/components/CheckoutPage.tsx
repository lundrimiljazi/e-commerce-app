"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";
import { CheckoutForm } from "@/components/CheckoutForm";
import { OrderSummary } from "@/components/OrderSummary";
import type { CheckoutFormData } from "@/schema/checkoutSchema";

export default function CheckoutContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { cart, handleCheckout, getCartTotal } = useCartStore();

  const total = getCartTotal();

  const onSubmit = async (data: CheckoutFormData) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      await handleCheckout();
      toast.success("Order placed successfully!");
      router.push("/cart/checkout/success");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      router.push("/cart/checkout/error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-2xl rounded-3xl overflow-hidden"
    >
      <div className="md:flex">
        <CheckoutForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          total={total}
        />
        <OrderSummary cart={cart} total={total} />
      </div>
    </motion.div>
  );
}
