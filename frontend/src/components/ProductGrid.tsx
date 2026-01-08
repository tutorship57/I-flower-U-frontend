import React from 'react'
import { Heart, Star, Plus } from 'lucide-react';
import type { ProductSchema } from '../types/product';

type Props = {
  filteredProducts: ProductSchema[];
  setCurrentPage: (page: string) => void;
  setSelectedProduct: (product: ProductSchema) => void;
  addItem: (product: ProductSchema, quantity: number) => void;
};

const ProductGrid = ({filteredProducts,setCurrentPage,setSelectedProduct,addItem}: any) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: any) => (
            <div
              key={product.product_id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative">
                <img
                  src={product.images[0].image_url}
                  alt={product.product_name}
                  className="w-full h-72 object-cover"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition">
                  <Heart className="w-5 h-5 text-rose-500" />
                </button>
                {product.product_stock < 10 && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                    Only {product.product_stock} left
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {product.category.category_name}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">4.8</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {product.product_name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.product_description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag: any) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-rose-500">
                    ${product.product_price}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentPage("productInfo");
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                    >
                      Details
                    </button>
                    <button
                      // onClick={() => addToCart(product)}
                      onClick={() => addItem(product,1)}
                      className="px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default ProductGrid
