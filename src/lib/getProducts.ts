import { Products } from "@/types/products";

export default async function getProducts(): Promise<Products[]> {
  const response = await fetch('https://dummyjson.com/products');
  const products: Products[] = await response.json();
  return products;
}