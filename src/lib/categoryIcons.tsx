// ... existing code ...

import { ShoppingBag, Watch, Shirt, Gem } from "lucide-react";

export function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "electronics":
      return <ShoppingBag className="h-4 w-4" />;
    case "jewelery":
      return <Gem className="h-4 w-4" />;
    case "men's clothing":
      return <Shirt className="h-4 w-4" />;
    case "women's clothing":
      return <Shirt className="h-4 w-4" />;
    default:
      return <Watch className="h-4 w-4" />;
  }
}
