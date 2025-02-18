"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import useCheckoutStore from "@/store/useCheckoutStore";
import { useEffect } from "react";

export default function ErrorPage() {
  const { resetCheckoutState } = useCheckoutStore();

  useEffect(() => {
    return () => {
      resetCheckoutState();
    };
  }, [resetCheckoutState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-700">
            Order Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            Something went wrong while processing your order. Please try again
            or contact our support team if the issue persists.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/cart/checkout">Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
