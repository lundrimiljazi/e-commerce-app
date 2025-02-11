import { Suspense } from "react";
import { Metadata } from "next";
import CheckoutContent from "@/components/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | StyleHub",
  description: "Complete your purchase",
};

export default function CheckoutPage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CheckoutContent />
      </div>
    </div>
  );
}
