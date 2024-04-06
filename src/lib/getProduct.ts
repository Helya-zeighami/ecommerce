import { Product } from "@/types/products";

export default async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }

  const product: Product = await response.json();
  return product;
}
