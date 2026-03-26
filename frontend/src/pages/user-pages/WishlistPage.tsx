import { useNavigate } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useWishlistStore } from "../../stores/wishlist-store";
import { useCartStore } from "../../stores/cart-store";
import { cartItemService } from "../../services/cart-item.service";
import type { ProductSchema2 } from "../../types/product";
import ProductGrid from "../../components/ProductGrid"; 

const WishlistPage = () => {
  const navigate = useNavigate();
  const { items, clearWishlist } = useWishlistStore();
  const { addItem, items: cartItems, cart_id } = useCartStore();

  const handleSelectProduct = (product: ProductSchema2) => {
    navigate(`/productInfo/${product.product_id}`);
  };

  const handleAddItem = async (product: ProductSchema2, quantity: number) => {
    const existing = cartItems.find((i) => i.product_id === product.product_id);
    const currentQty = existing ? existing.quantity : 0;

    if (cart_id === null) {
      addItem(product, quantity);
      return;
    }

    try {
      if (currentQty >= 1 && existing) {
        await cartItemService.updateItem(cart_id, product.product_id, {
          quantity: currentQty + quantity,
        });
      } else {
        await cartItemService.addItems(cart_id, {
          quantity,
          product_id: product.product_id,
          unit_price: product.product_price,
        });
      }
      addItem(product, quantity);
    } catch (err) {
      console.error("WishlistPage addToCart error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
            {items.length > 0 && (
              <p className="text-gray-400 mt-1 text-sm">
                {items.length} item{items.length !== 1 ? "s" : ""} saved
              </p>
            )}
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-500 transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-rose-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">
              Your wishlist is empty
            </h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Save flowers you love by tapping the heart icon on any product.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-full transition"
            >
              Browse Products
            </button>
          </div>
        ) : (

          <ProductGrid
            filteredProducts={items}
            setSelectedProduct={handleSelectProduct}
            handleAddItem={handleAddItem}
          />
        )}

      </div>
    </div>
  );
};

export default WishlistPage;