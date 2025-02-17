import ClientCategories from "./ClientCategories";
import { fetchCategories } from "@/lib/actions";

export default async function Categories() {
  const { categories, error } = await fetchCategories();

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="h-full bg-white">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <p className="text-sm text-gray-500 mt-1">Browse by category</p>
      </div>
      <div className="p-4 space-y-2"></div>
      <ClientCategories categories={categories} />
    </div>
  );
}
