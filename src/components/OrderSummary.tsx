import { CartItem } from "@/types/cartItemType";
import { motion } from "framer-motion";
import { CreditCard, Truck } from "lucide-react";
import Image from "next/image";

type OrderSummaryProps = {
  cart: CartItem[];
  total: number;
};

export function OrderSummary({ cart, total }: OrderSummaryProps) {
  return (
    <div className="md:w-1/2 bg-gray-50 p-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-700">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Truck className="text-black" />
          <span>Free shipping worldwide</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
          <CreditCard className="text-white" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
}
