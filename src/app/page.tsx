import Categories from "@/components/Categories";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ProductList from "@/components/ProductList";

export default function Home() {
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
          <SheetContent
            side="left"
            className="p-0 w-72 [&>button>svg]:h-4 [&>button>svg]:w-4 [&>button>svg]:text-black "
          >
            <SheetTitle className="sr-only">Categories Menu</SheetTitle>
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
