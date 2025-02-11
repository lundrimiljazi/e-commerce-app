import type { CartItem } from "@/types/cartItemType";
import { motion } from "framer-motion";
import { CreditCard, Truck, Package } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type OrderSummaryProps = {
  cart: CartItem[];
  total: number;
};

export function OrderSummary({ cart, total }: OrderSummaryProps) {
  return (
    <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-700">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
              <p className="font-bold text-gray-900 ml-4">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      <Separator className="my-6" />
      <div className="space-y-2">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span className="text-2xl text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <Truck className="text-gray-400" size={20} />
          <span>Free shipping worldwide</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <CreditCard className="text-gray-400" size={20} />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <Package className="text-gray-400" size={20} />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
}
