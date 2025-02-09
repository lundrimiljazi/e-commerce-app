"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";

export default function OrderSummary() {
  const { getCartTotal, isProcessing } = useCartStore();
  return (
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
            <span className="text-gray-800">Calculated at checkout</span>
          </div>
          <Separator className="bg-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-700">Total</span>
            <span className="text-xl font-bold text-blue-600">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <Link href="/cart/checkout">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
