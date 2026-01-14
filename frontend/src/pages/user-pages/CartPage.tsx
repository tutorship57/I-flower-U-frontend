import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../stores/cart-store';
import { useNavBarStore } from '../../stores/navbar-store';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/product';
import type { ProductPreview } from '../../types/product';
// Shopping Cart Page
const CartPage = () => {
  const { items, updateQuantity, removeFromCart } = useCartStore();
  const { data:productPreview, isLoading, error } = useQuery<[ProductPreview]>({
    queryKey: ['cart-items-details', items],
    queryFn: async () => {
      // Fetch detailed product info for each item in the cart
      const productDetails =await productService.getProductByIds(
        items.map(item => item.product_id)
      );
      return productDetails.data;
    }
  }
  )
  const subtotal = items.reduce((sum:any, item:any) => sum + item.product_price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;
  const { setCurrentPage } = useNavBarStore();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some beautiful flowers to get started!</p>
            <button
              onClick={() => setCurrentPage('products')}
              className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {productPreview?.map((item: ProductPreview) => {
                const quantity = items.find(i => i.product_id === item.product_id)?.quantity || 0;
                return(
                 <div key={item.product_id} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex gap-6">
                    <img
                      src={item.productImage[0].image_url}
                      alt={item.product_name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-xl font-bold">{item.product_name}</h3>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="p-2 hover:bg-red-50 rounded-full transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{item.product_description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.product_id, items[items.findIndex(i => i.product_id === item.product_id)].quantity - 1)}
                            className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, quantity + 1)}
                            className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">${item.product_price} each</div>
                          <div className="text-xl font-bold text-rose-500">
                            ${(item.product_price * quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-rose-500">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition font-semibold text-lg mb-4">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setCurrentPage('products')}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;