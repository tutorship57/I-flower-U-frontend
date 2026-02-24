// import type { Product } from "./product";
// export type CartItem = Product & {
//   quantity: number;
// };
import type { ProductSchema2 } from "./product";
export type CartItem = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  category: { category_name: string };
  images: { image_url: string }[];
  quantity: number;
};

export interface CartTemp  extends ProductSchema2{
  quantity: number;
}