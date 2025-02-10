import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import useProductStore from "@/store/useProductStore";

const SortProducts: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSort, selectedSort } = useProductStore();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "default") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    return params.toString();
  };

  const handleSort = (value: string) => {
    const queryString = createQueryString("sort", value);
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
    setSort(value);
  };

  React.useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSort(sortParam);
    } else {
      setSort("default");
    }
  }, [searchParams, setSort]);

  const currentSort = searchParams.get("sort") || selectedSort || "default";

  return (
    <Select value={currentSort} onValueChange={handleSort}>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="text-black">
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="price_asc">Price: Low to High</SelectItem>
        <SelectItem value="price_desc">Price: High to Low</SelectItem>
        <SelectItem value="rating_desc">Highest Rated</SelectItem>
        <SelectItem value="rating_asc">Lowest Rated</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortProducts;
