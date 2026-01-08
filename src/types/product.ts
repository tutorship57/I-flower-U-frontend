export type Product = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  category: { category_name: string };
  images: { image_url: string }[];
  colors: string[];
  tags: string[];
};

export type ProductSchema = {
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  category_id: string;
  images: { image_url: string }[];
  colors: string[];
  tags: string[];
  product_id?: string;
}