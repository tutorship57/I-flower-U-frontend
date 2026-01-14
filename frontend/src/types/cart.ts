// import type { Product } from "./product";
// export type CartItem = Product & {
//   quantity: number;
// };


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
export type ProductSchema2 = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  category: { category_name: string };
  productImage: { image_url: string }[];
  colors: {
    color_id: string;
    color_name: string;
  }[];
  productTagEvent:{
    TagEvent:{
      tag_id: string;
      tag_event_name: string;
    }[];
  }
};

export type CartTemp = {
  product_id: string;
  quantity: number;
}