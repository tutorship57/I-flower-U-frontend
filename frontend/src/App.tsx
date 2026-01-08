

// export default App;
import InputField from "./components/InputField";
import LoginPage from "./pages/user-pages/LoginPage";
import React, { useState } from "react";
import ShopProductsPage from "./pages/shop-pages/ProductsPage";
import { ToastContainer } from 'react-toastify';
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  Menu,
  X,
  Star,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Clock,
  Phone,
  Route as RouteIcon,
} from "lucide-react";
import AdminRoute from "./routes/AdminRoute";
import ShopRoute from "./routes/ShopRoute";
import UserRoute from "./routes/UserRoute";
import Navbar from "./components/Navbar";
import { useNavBarStore } from "./stores/navbar-store";

import FilterElement from "./components/FilterElement";
import ProductGrid from "./components/ProductGrid";
import ProductInfoPage from "./pages/user-pages/ProductInfoPage";
import CartPage from "./pages/user-pages/CartPage";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { useCartStore } from "./stores/cart-store";
import { BrowserRouter} from "react-router";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/shop-pages/DashboardPage";
import OrdersPage from "./pages/shop-pages/OrdersPage";
import ShopSettingsPage from "./pages/shop-pages/ShopSettingsPage";
type Props = {
  product: any;
  addToCart: (p: any) => void;
  setCurrentPage: (page: string) => void;
};

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

type Shop = {
  shop_name: string;
  shop_address: string;
  shop_phone: string;
  shop_open: number;
  shop_close: number;
};

// Mock data based on your schema
const mockProducts: Product[] = [
  {
    product_id: "1",
    product_name: "Rose Bouquet",
    product_description: "Beautiful red roses perfect for any occasion",
    product_price: 45.99,
    product_stock: 25,
    category: { category_name: "Bouquets" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500",
      },
    ],
    colors: ["Red", "Pink"],
    tags: ["Valentine", "Romance"],
  },
  {
    product_id: "2",
    product_name: "Tulip Arrangement",
    product_description: "Fresh spring tulips in vibrant colors",
    product_price: 32.5,
    product_stock: 18,
    category: { category_name: "Arrangements" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
      },
    ],
    colors: ["Yellow", "Orange"],
    tags: ["Spring", "Birthday"],
  },
  {
    product_id: "3",
    product_name: "Sunflower Bundle",
    product_description: "Cheerful sunflowers to brighten any room",
    product_price: 28.99,
    product_stock: 30,
    category: { category_name: "Bundles" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=500",
      },
    ],
    colors: ["Yellow"],
    tags: ["Summer", "Cheer"],
  },
  {
    product_id: "4",
    product_name: "Lily Paradise",
    product_description: "Elegant white lilies for special moments",
    product_price: 52.0,
    product_stock: 15,
    category: { category_name: "Premium" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500",
      },
    ],
    colors: ["White", "Pink"],
    tags: ["Wedding", "Elegant"],
  },
  {
    product_id: "5",
    product_name: "Mixed Garden",
    product_description: "Colorful mix of seasonal flowers",
    product_price: 38.75,
    product_stock: 22,
    category: { category_name: "Mixed" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500",
      },
    ],
    colors: ["Mixed"],
    tags: ["Birthday", "Celebration"],
  },
  {
    product_id: "6",
    product_name: "Orchid Elegance",
    product_description: "Exotic orchids in decorative pot",
    product_price: 65.0,
    product_stock: 12,
    category: { category_name: "Potted" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1551738808-2d0a1f3c6e02?w=500",
      },
    ],
    colors: ["Purple", "White"],
    tags: ["Gift", "Premium"],
  },
];

const mockShop = {
  shop_name: "Blooming Dreams",
  shop_address: "123 Flower Street, Garden City",
  shop_phone: "+1 (555) 123-4567",
  shop_open: 540,
  shop_close: 1290,
};

// Navigation Component
const Navigation = ({
  currentPage,
  setCurrentPage,
  cartItemCount,
  isLoggedIn,
  setIsLoggedIn,
}: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🌸</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                IFLOWERU
              </span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`${
                currentPage === "home"
                  ? "text-rose-500"
                  : "text-gray-700 hover:text-rose-500"
              } transition`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("products")}
              className={`${
                currentPage === "products"
                  ? "text-rose-500"
                  : "text-gray-700 hover:text-rose-500"
              } transition`}
            >
              Products
            </button>
            <button className="text-gray-700 hover:text-rose-500 transition">
              Categories
            </button>
            <button className="text-gray-700 hover:text-rose-500 transition">
              About
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setCurrentPage("cart")}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() =>
                isLoggedIn ? setIsLoggedIn(false) : setCurrentPage("login")
              }
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <button
              onClick={() => {
                setCurrentPage("home");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage("products");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Products
            </button>
            <button
              onClick={() => {
                setCurrentPage("cart");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cart ({cartItemCount})
            </button>
            <button
              onClick={() => {
                isLoggedIn ? setIsLoggedIn(false) : setCurrentPage("login");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page
const HomePage = ({  setSelectedProduct }: any) => {
  const featuredProducts = mockProducts.slice(0, 3);
  const { setCurrentPage } = useNavBarStore();
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Fresh Flowers For Every
                <span className="block text-rose-500">Occasion</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover beautiful blooms delivered fresh to your door. Perfect
                for gifts, events, or brightening your home.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentPage("products")}
                  className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition shadow-lg"
                >
                  Shop Now
                </button>
                <button className="px-8 py-3 bg-white text-rose-500 border-2 border-rose-500 rounded-full hover:bg-rose-50 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600"
                alt="Beautiful flowers"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Bouquets", "Arrangements", "Potted Plants", "Wedding"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCurrentPage("products")}
                  className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl hover:shadow-lg transition text-center"
                >
                  <div className="text-4xl mb-3">🌺</div>
                  <div className="font-semibold text-gray-900">{cat}</div>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Flowers</h2>
            <button
              onClick={() => setCurrentPage("products")}
              className="text-rose-500 hover:text-rose-600 font-semibold"
            >
              View All →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                setSelectedProduct={setSelectedProduct}
                setCurrentPage={setCurrentPage}
              />
              // <div
              //   key={product.product_id}
              //   className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              // >
              //   <div className="relative">
              //     <img
              //       src={product.images[0].image_url}
              //       alt={product.product_name}
              //       className="w-full h-64 object-cover"
              //     />
              //     <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition">
              //       <Heart className="w-5 h-5 text-rose-500" />
              //     </button>
              //   </div>
              //   <div className="p-6">
              //     <div className="text-sm text-gray-500 mb-2">
              //       {product.category.category_name}
              //     </div>
              //     <h3 className="text-xl font-bold mb-2">
              //       {product.product_name}
              //     </h3>
              //     <p className="text-gray-600 mb-4 line-clamp-2">
              //       {product.product_description}
              //     </p>
              //     <div className="flex justify-between items-center">
              //       <span className="text-2xl font-bold text-rose-500">
              //         ${product.product_price}
              //       </span>
              //       <button
              //         onClick={() => {
              //           setSelectedProduct(product);
              //           setCurrentPage("productInfo");
              //         }}
              //         className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
              //       >
              //         View Details
              //       </button>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">{mockShop.shop_address}</p>
            </div>
            <div className="p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h3 className="font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Daily 9:00 AM - 9:30 PM</p>
            </div>
            <div className="p-6">
              <Phone className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h3 className="font-bold mb-2">Contact</h3>
              <p className="text-gray-600">{mockShop.shop_phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Products Page
const ProductsPage = ({
  setCurrentPage,
  setSelectedProduct
}: any) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Bouquets",
    "Arrangements",
    "Premium",
    "Mixed",
    "Potted",
  ];
  const {addItem} = useCartStore(); 
  const { setCartItemCount, cartItemCount } = useNavBarStore();
  const filteredProducts =
    selectedCategory === "All"
      ? mockProducts
      : mockProducts.filter(
          (p) => p.category.category_name === selectedCategory
        );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Our Collection</h1>

        {/* Filters */}
         <FilterElement
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
         />

        {/* Products Grid */}
          <ProductGrid
            filteredProducts={filteredProducts}
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
            setCartItemCount={setCartItemCount}
            cartItemCount={cartItemCount}
            addItem={addItem}
          /> 
      </div>
    </div>
  );
};

// // Product Info Page
// const ProductInfoPage2 = ({ product, addToCart, setCurrentPage }: Props) => {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <button
//           onClick={() => setCurrentPage("products")}
//           className="mb-6 text-gray-600 hover:text-rose-500 transition"
//         >
//           ← Back to Products
//         </button>

//         <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
//           <div className="grid md:grid-cols-2 gap-8 p-8">
//             {/* Images */}
//             <div>
//               <div className="mb-4 rounded-2xl overflow-hidden">
//                 <img
//                   src={product.images[selectedImage]?.image_url}
//                   alt={product.product_name}
//                   className="w-full h-96 object-cover"
//                 />
//               </div>
//               <div className="grid grid-cols-4 gap-4">
//                 {product.images.map((img: any, idx: any) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`rounded-lg overflow-hidden border-2 ${
//                       selectedImage === idx
//                         ? "border-rose-500"
//                         : "border-transparent"
//                     }`}
//                   >
//                     <img
//                       src={img.image_url}
//                       alt=""
//                       className="w-full h-20 object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Details */}
//             <div>
//               <div className="mb-4">
//                 <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
//                   {product.category.category_name}
//                 </span>
//               </div>
//               <h1 className="text-4xl font-bold mb-4">
//                 {product.product_name}
//               </h1>
//               <div className="flex items-center mb-6">
//                 <div className="flex items-center mr-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-5 h-5 text-yellow-400 fill-current"
//                     />
//                   ))}
//                 </div>
//                 <span className="text-gray-600">(128 reviews)</span>
//               </div>
//               <p className="text-gray-600 mb-6 text-lg">
//                 {product.product_description}
//               </p>

//               <div className="mb-6">
//                 <h3 className="font-semibold mb-2">Available Colors:</h3>
//                 <div className="flex space-x-3">
//                   {product.colors.map((color: string) => (
//                     <button
//                       key={color}
//                       className="px-4 py-2 border-2 border-gray-200 rounded-full hover:border-rose-500 transition"
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h3 className="font-semibold mb-2">Perfect for:</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {product.tags.map((tag: string) => (
//                     <span
//                       key={tag}
//                       className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
//                   <span className="text-sm text-gray-600">
//                     Stock Available:
//                   </span>
//                   <span className="font-semibold">
//                     {product.product_stock} units
//                   </span>
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <div className="text-sm text-gray-500 mb-1">Price</div>
//                     <div className="text-4xl font-bold text-rose-500">
//                       ${product.product_price}
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//                     >
//                       <Minus className="w-5 h-5" />
//                     </button>
//                     <span className="text-2xl font-semibold w-12 text-center">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() =>
//                         setQuantity(
//                           Math.min(product.product_stock, quantity + 1)
//                         )
//                       }
//                       className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//                     >
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => {
//                       for (let i = 0; i < quantity; i++) {
//                         addToCart(product);
//                       }
//                       setCurrentPage("cart");
//                     }}
//                     className="flex-1 py-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition font-semibold text-lg"
//                   >
//                     Add to Cart
//                   </button>
//                   <button className="p-4 border-2 border-rose-500 text-rose-500 rounded-full hover:bg-rose-50 transition">
//                     <Heart className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Shopping Cart Page
// const CartPage = ({
//   cart,
//   updateQuantity,
//   removeFromCart,
//   setCurrentPage,
// }: any) => {
//   const subtotal = cart.reduce(
//     (sum: any, item: any) => sum + item.unit_price * item.quantity,
//     0
//   );
//   const shipping = 5.99;
//   const total = subtotal + shipping;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

//         {cart.length === 0 ? (
//           <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
//             <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
//             <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">
//               Add some beautiful flowers to get started!
//             </p>
//             <button
//               onClick={() => setCurrentPage("products")}
//               className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
//             >
//               Browse Products
//             </button>
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-4">
//               {cart.map((item: any) => (
//                 <div
//                   key={item.cart_item_id}
//                   className="bg-white rounded-2xl shadow-md p-6"
//                 >
//                   <div className="flex gap-6">
//                     <img
//                       src={item.Product.images[0].image_url}
//                       alt={item.Product.product_name}
//                       className="w-32 h-32 object-cover rounded-xl"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between mb-2">
//                         <h3 className="text-xl font-bold">
//                           {item.Product.product_name}
//                         </h3>
//                         <button
//                           onClick={() => removeFromCart(item.cart_item_id)}
//                           className="p-2 hover:bg-red-50 rounded-full transition"
//                         >
//                           <Trash2 className="w-5 h-5 text-red-500" />
//                         </button>
//                       </div>
//                       <p className="text-gray-600 mb-4">
//                         {item.Product.product_description}
//                       </p>
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center space-x-3">
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 item.cart_item_id,
//                                 item.quantity - 1
//                               )
//                             }
//                             className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//                           >
//                             <Minus className="w-4 h-4" />
//                           </button>
//                           <span className="font-semibold w-8 text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 item.cart_item_id,
//                                 item.quantity + 1
//                               )
//                             }
//                             className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//                           >
//                             <Plus className="w-4 h-4" />
//                           </button>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-sm text-gray-500">
//                             ${item.unit_price} each
//                           </div>
//                           <div className="text-xl font-bold text-rose-500">
//                             ${(item.unit_price * item.quantity).toFixed(2)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
//                 <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-semibold">
//                       ${subtotal.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-semibold">
//                       ${shipping.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="border-t pt-4 flex justify-between text-lg">
//                     <span className="font-bold">Total</span>
//                     <span className="font-bold text-rose-500">
//                       ${total.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//                 <button className="w-full py-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition font-semibold text-lg mb-4">
//                   Proceed to Checkout
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage("products")}
//                   className="w-full py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
//};

// Login Page
// const LoginPage = () => {
//   const {setCurrentPage} = useNavBarStore();
  
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//   });

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     setCurrentPage("home");
//   };

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-pink-50 to-rose-50 py-12 px-4">
//       <div className="max-w-md mx-auto ">
//         <AuthHeader isSignUp={isSignUp} />
//         <div className="bg-white rounded-3xl shadow-xl p-8">
//           <AuthForm
//             handleSubmit={handleSubmit}
//             isSignUp={isSignUp}
//             formData={formData}
//             setFormData={setFormData}
//           />
//           <AuthFooter isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
//         </div>

//       </div>
//     </div>
//   );
// };

// Main App Component
const App = () => {
  const {
    currentPage,
    setCurrentPage,
    isLoggedIn,
    setIsLoggedIn,
    cartItemCount,
    setCartItemCount,
  } = useNavBarStore();
  // const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart]: any = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (product: any) => {
    const existingItem = cart.find(
      (item: any) => item.product_id === product.product_id
    );

    if (existingItem) {
      setCart(
        cart.map((item: any) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newCartItem = {
        cart_item_id: `cart_${Date.now()}`,
        product_id: product.product_id,
        quantity: 1,
        unit_price: product.product_price,
        Product: product,
      };
      setCart([...cart, newCartItem] as any);
    }
  };

  const updateQuantity = (cartItemId: any, newQuantity: any) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart(
        cart.map((item: any) =>
          item.cart_item_id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (cartItemId: any) => {
    setCart(cart.filter((item: any) => item.cart_item_id !== cartItemId));
  };

  // const cartItemCount = cart.reduce((sum:any, item:any) => sum + item.quantity, 0);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UserRoute/>}>
          <Route path="" element={<HomePage/>} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="products" element={<ProductsPage/>}/>
          <Route path="productInfo/:productId" element={<ProductInfoPage />}/>
          <Route path="cart" element={<CartPage/>}/>
        </Route>

        <Route path="/admin/*" element={<AdminRoute/>}>

        </Route>

        <Route path="/shop" element={<ShopRoute/>}>
          <Route path="dashboard" element={<DashboardPage/>} />
          <Route path="products" element={<ShopProductsPage/>} />
          <Route path="orders" element={<OrdersPage/>} />
          <Route path="settings" element={<ShopSettingsPage/>} />
        </Route>
      </Routes>
    </>
  )
  // return (
  //   <div className="min-h-screen bg-gray-50">
      
  //     <Navbar />

  //     {currentPage === "home" && (
  //       <HomePage
  //         setSelectedProduct={setSelectedProduct}
  //       />
  //     )}

  //     {currentPage === "products" && (
  //       <ProductsPage
  //         setCurrentPage={setCurrentPage}
  //         setSelectedProduct={setSelectedProduct}
  //         addToCart={addToCart}
  //       />
  //     )}

  //     {currentPage === "productInfo" && selectedProduct && (
  //       <ProductInfoPage
  //         product={selectedProduct}
  //       />
  //     )}

  //     {currentPage === "cart" && (
  //       // <CartPage
  //       //   cart={cart}
  //       //   updateQuantity={updateQuantity}
  //       //   removeFromCart={removeFromCart}
  //       //   setCurrentPage={setCurrentPage}
  //       // />
  //       <CartPage/>
  //     )}

  //     {currentPage === "login" && (
  //       <LoginPage/>
  //     )}

  //     {/* Footer */}
  //     <Footer />
  //   </div>
  // );
};

export default App;
