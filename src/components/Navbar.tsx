"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import useCartStore from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, SearchIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/authentication";

const Navbar = () => {
  const { getItemCount } = useCartStore();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
  }, [pathname]);

  const itemCount = getItemCount();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      toast.success("Successfully logged out");
      setMobileMenuOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleSearchComplete = () => {
    setSearchModalOpen(false);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-start gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="StyleHub Logo"
                width={32}
                height={32}
                className="text-blue-600"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">StyleHub</h1>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 flex items-center">
                  Hi, {user?.username}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Log in
                </Button>
              </Link>
            )}
            <Link href="/cart" className="relative">
              <Button variant="outline" className="gap-2">
                <ShoppingBag data-testid="cart-icon" className="h-5 w-5" />
                Cart
                {mounted && itemCount > 0 && (
                  <span
                    data-testid="cart-count"
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchModalOpen(!searchModalOpen)}
            >
              <SearchIcon className="h-6 w-6 text-black" />
            </Button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchModalOpen && (
          <div className="md:hidden px-4 py-2 border-t flex items-center justify-center">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-gray-700">
                  Hi, {user?.username}
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  Log in
                </Button>
              </Link>
            )}
            <Link
              href="/cart"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="outline" className="w-full justify-start gap-2">
                <ShoppingBag data-testid="cart-icon" className="h-5 w-5" />
                Cart
                {mounted && itemCount > 0 && (
                  <span
                    data-testid="cart-count"
                    className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
