"use client";

import useCartStore from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-black hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Link>
        <Card className="min-h-[60vh] flex flex-col items-center justify-center p-4">
          <CardContent className="flex flex-col items-center pt-6">
            <ShoppingBag className="w-16 h-16 text-black mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mt-2">Add some items to get started!</p>
            <Button asChild className="mt-6 bg-black hover:bg-gray-700">
              <Link href="/">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=" max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-black hover:text-gray-700 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="h-[calc(80vh-5rem)] pr-4 overflow-y-scroll scrollbar-thin ">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-4 overflow-hidden border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={120}
                          height={120}
                          className="w-28 h-28 object-cover rounded-md"
                          priority
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-black font-medium mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-600"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium text-gray-700">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-600"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="font-bold text-sm text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">Free</span>
                </div>
                <Separator className="bg-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-700">
                    Total
                  </span>
                  <span className="text-xl font-bold text-black">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Link href="/cart/checkout">
                  <Button
                    className="w-full bg-black hover:bg-gray-700 text-white"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
