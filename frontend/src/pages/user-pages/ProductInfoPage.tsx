import { useState } from 'react';
import { Star, Plus, Minus, Heart } from 'lucide-react';
import { useCartStore } from '../../stores/cart-store';
import { useNavBarStore } from '../../stores/navbar-store';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product';
import type { ProductSchema2 } from '../../types/product';


// Product Info Page
// const ProductInfoPage = ({ product }: Props) => {
const ProductInfoPage = () => {
  const productId = useParams().productId;
  // const productId = useParams().productId;
  const { data: product, isLoading, error } = useQuery<ProductSchema2>({
    queryKey: [`product-${productId}`, productId],
    queryFn: async() =>{ 
      const productSelected = await productService.getProductById(productId as string)
      return productSelected.data
    },
    staleTime: 3 * 60 *1000,
    gcTime: 10 * 60 * 1000
  });
  
  if (error){
    console.log(error);
  }

  const {setCurrentPage} = useNavBarStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();
  const navigate = useNavigate()
  const handleNavigateBacktoProducts = () => {
    navigate('/products')
  }
  return (
    !isLoading && product &&<div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={handleNavigateBacktoProducts}
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
                  src={product?.productImage?.[selectedImage]?.image_url}
                  alt={product?.product_name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product?.productImage?.map((img: {image_url: string}, idx: number) => (
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
                  {product?.category?.category_name}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product?.product_name}</h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(128 reviews)</span>
              </div>
              <p className="text-gray-600 mb-6 text-lg">{product?.product_description}</p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Available Colors:</h3>
                <div className="flex space-x-3">
                  {product?.colors?.length >0 ? product?.colors?.map(({color_id,color_name}: {color_id: string; color_name: string}) => (
                    <button
                      key={color_id}
                      className="px-4 py-2 border-2 border-gray-200 rounded-full hover:border-rose-500 transition"
                    >
                      {color_name}
                    </button>
                  )) : <button
                      className="px-4 py-2 border-2 border-gray-200 text-gray-300 rounded-full hover:border-rose-500 transition"
                    >
                      {"No color added"}
                    </button>}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Perfect for:</h3>
                <div className="flex flex-wrap gap-2">
                  {product?.productTagEvent?.TagEvent?.length >0 ? product?.productTagEvent?.TagEvent.map(({tag_id,tag_event_name}: {tag_id: string; tag_event_name: string}) => (
                    <span key={tag_id} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full">
                      {tag_event_name}
                    </span>
                  )):
                  <span  className="px-4 py-2 bg-gray-50 text-gray-300 rounded-full">
                      {"no tag added"}
                    </span>
                  }
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-sm text-gray-600">Stock Available:</span>
                  <span className="font-semibold">{product?.product_stock} units</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Price</div>
                    <div className="text-4xl font-bold text-rose-500">${product?.product_price || 0}</div>
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
                      onClick={() => setQuantity(Math.min(product?.product_stock || 0, quantity + 1))}
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