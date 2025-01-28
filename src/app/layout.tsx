import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartModal from "@/components/CartModal";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "StyleHub - Fashion & Lifestyle",
  description:
    "Your one-stop destination for modern fashion and lifestyle products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <Navbar />
              <div className="flex min-h-screen flex-col">
                {children}
                <CartModal />
                <Toaster position="top-center" />
              </div>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
