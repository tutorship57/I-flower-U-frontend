import React, { useState,useEffect } from 'react';
import { Star, Plus, Minus, Heart } from 'lucide-react';
import { useCartStore } from '../../stores/cart-store';
import { useNavBarStore } from '../../stores/navbar-store';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product';

type Product = {
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

type Props = {
  product: Product;
};  
// Product Info Page
// const ProductInfoPage = ({ product }: Props) => {
const ProductInfoPage = ({selectedProduct}:any) => {
  const product = selectedProduct;
  // const productId = useParams().productId;
  // const { data: product, isLoading, error } = useQuery({
  //   queryKey: [`product-${productId}`, productId],
  //   queryFn: () => productService.getProductById(productId as string),
  //   enabled: !!productId
  // });

  // useEffect(() => {
  //   if (isLoading) {
  //     return;
  //   }
  //   document.title = product?.product_name || 'Product';
  // }, [isLoading, product?.product_name]);
  // useEffect(() => {
  //    if (error) {
  //     console.log(error.message);
  //     return;}
  // }, [error]);

  const {setCurrentPage} = useNavBarStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentPage('products')}
          className="mb-6 text-gray-600 hover:text-rose-500 transition"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div>
              <div className="mb-4 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]?.image_url}
                  alt={product.product_name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: any, idx: any) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-rose-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img.image_url} alt="" className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                  {product.category.category_name}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.product_name}</h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(128 reviews)</span>
              </div>
              <p className="text-gray-600 mb-6 text-lg">{product.product_description}</p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Available Colors:</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      className="px-4 py-2 border-2 border-gray-200 rounded-full hover:border-rose-500 transition"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Perfect for:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag:string ) => (
                    <span key={tag} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-sm text-gray-600">Stock Available:</span>
                  <span className="font-semibold">{product.product_stock} units</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Price</div>
                    <div className="text-4xl font-bold text-rose-500">${product.product_price}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.product_stock, quantity + 1))}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    // onClick={() => {
                    //   for (let i = 0; i < quantity; i++) {
                    //     addToCart(product);
                    //   }
                    //   setCurrentPage('cart');
                    // }}
                    onClick={() => {
                      addItem({...product},quantity);
                      setCurrentPage('cart');
                    }}
                    className="flex-1 py-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition font-semibold text-lg"
                  >
                    Add to Cart
                  </button>
                  <button className="p-4 border-2 border-rose-500 text-rose-500 rounded-full hover:bg-rose-50 transition">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPage;