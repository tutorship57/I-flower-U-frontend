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

export type ProductPreview = {
  product_id: string;
  product_name: string;
  product_price: number;
  product_description: string;
  productImage: { image_url: string }[];
}

export type productInfo = ProductSchema2 
// export type productInfo = ProductSchema2 &{
//     shop_id: string;
//     shop_name: string;
//     shop_address: string;
//     shop_contact: string;
// }