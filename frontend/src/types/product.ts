export type ProductSchema2 = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  productStocks:{
    stock_id: string
    stock_qty: number
    reserved_qty: number
  }[]
  category: { category_id: number;  category_name: string };
  productImage: { image_url: string }[];
  colors: {
    color_id: number;
    color_name: string;
  }[];
  productTagEvent:{
    TagEvent:{
      tag_id: number;
      tag_event_name: string;
    };
  }[]
};
export interface ProductSchemaShop extends ProductSchema2 {
  sold: number;
}

export type ProductPreview = {
  product_id: string;
  product_name: string;
  product_price: number;
  product_description: string;
  productImage: { image_url: string }[];
}

export type productInfo = ProductSchema2 
