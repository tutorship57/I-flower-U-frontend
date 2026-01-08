import React from "react";

import { Heart } from "lucide-react";
import type { Product } from "../types/product";
interface Props {
  product: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const ProductCard = ({ product, setSelectedProduct, setCurrentPage }: Props) => {
  return (
    <div
      key={product.product_id}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      <div className="relative">
        <img
          src={product.images[0].image_url}
          alt={product.product_name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition">
          <Heart className="w-5 h-5 text-rose-500" />
        </button>
      </div>
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {product.category.category_name}
        </div>
        <h3 className="text-xl font-bold mb-2">{product.product_name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.product_description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-rose-500">
            ${product.product_price}
          </span>
          <button
            onClick={() => {
              setSelectedProduct(product);
              setCurrentPage("productInfo");
            }}
            className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
