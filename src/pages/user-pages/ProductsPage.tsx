import React, { useState } from "react";
import { Star, Plus, Heart } from "lucide-react";
import { useNavBarStore } from "../../stores/navbar-store";
import FilterElement from "../../components/FilterElement";
import ProductGrid from "../../components/ProductGrid";
import { useCartStore } from "../../stores/cart-store";
type Product = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  category: { category_name: string };
  images: { image_url: string }[];
  colors: {
    color_id: string;
    color_name: string;
  }[];
  tags: string[];
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
    colors: [{ color_id: "8", color_name: "Red" }, { color_id: "9", color_name: "Pink" }], // Mock data for colors"Red", "Pink"],
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
    colors: [{ color_id: "1", color_name: "Yellow" }, { color_id: "2", color_name: "Orange" }],
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
    colors: [{ color_id: "1", color_name: "Yellow" }],
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
    colors: [{ color_id: "3", color_name: "White" }, { color_id: "4", color_name: "Pink" }],
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
    colors: [{ color_id: "5", color_name: "Mixed" }],
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
    colors: [{ color_id: "6", color_name: "Purple" }, { color_id: "3", color_name: "White" }],
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

const ProductsPage = ({
  setCurrentPage,
  setSelectedProduct,
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
  const { setCartItemCount, cartItemCount } = useNavBarStore();
  const filteredProducts =
    selectedCategory === "All"
      ? mockProducts
      : mockProducts.filter(
          (p) => p.category.category_name === selectedCategory
        );
  const {addItem} = useCartStore();

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

export default ProductsPage;
