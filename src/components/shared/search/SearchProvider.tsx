import { getProducts } from "@/lib/api";
import SearchOverlay from "./SearchOverlay";

export default async function SearchProvider() {
  const products = await getProducts();
  return <SearchOverlay products={products} />;
}
