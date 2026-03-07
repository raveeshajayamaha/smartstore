// src/types/product.ts
export interface Product {
  id: number;
  title: string;
  description: string;  // Added
  price: number;
  thumbnail: string;
  category: string;     // Added
}