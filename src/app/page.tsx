"use client";

import { ProductList } from "@/components/ProductList";
import Categories from "@/components/Categories";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { Button } from "@/ui/button";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useProductStore from "@/store/useProductStore";

export default function Home() {
  const searchParams = useSearchParams();
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);
  const setCategory = useProductStore((state) => state.setCategory);

  useEffect(() => {
    const page = searchParams.get("page");
    const category = searchParams.get("category");

    if (category) {
      if (category !== useProductStore.getState().selectedCategory) {
        setCategory(category);
      }
    }

    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams, setCurrentPage, setCategory]);

  return (
    <main className="flex  bg-white">
      <aside className="w-72 border-r bg-white hidden md:block sticky top-0">
        <Categories />
      </aside>

      <div className="md:hidden fixed top-16 left-4 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-black">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Categories />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 px-4 py-6 lg:px-8">
        <ProductList />
      </div>
    </main>
  );
}
