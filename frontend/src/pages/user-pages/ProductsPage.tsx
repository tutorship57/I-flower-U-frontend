import { useEffect, useState } from "react";
import { useNavBarStore } from "../../stores/navbar-store";
import FilterElement from "../../components/FilterElement";
import ProductGrid from "../../components/ProductGrid";
import { useCartStore } from "../../stores/cart-store";
import { useQuery } from "@tanstack/react-query";
import { getProductsByShop } from "../../api/products-api";
import { productService } from "../../services/product";
import type { ProductSchema2 } from "../../types/product";
import { useNavigate } from "react-router-dom";
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
    colors: [
      { color_id: "8", color_name: "Red" },
      { color_id: "9", color_name: "Pink" },
    ], // Mock data for colors"Red", "Pink"],
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
    colors: [
      { color_id: "1", color_name: "Yellow" },
      { color_id: "2", color_name: "Orange" },
    ],
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
    colors: [
      { color_id: "3", color_name: "White" },
      { color_id: "4", color_name: "Pink" },
    ],
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
    colors: [
      { color_id: "6", color_name: "Purple" },
      { color_id: "3", color_name: "White" },
    ],
    tags: ["Gift", "Premium"],
  },
];

const ProductsPage = ({ setCurrentPage, setSelectedProduct }: any) => {
  const navigate= useNavigate()

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setCartItemCount, cartItemCount } = useNavBarStore();
  const { addItem } = useCartStore();

  const handleSelectProduct = (product: ProductSchema2) => {
    navigate(`/productInfo/${product.product_id}`);
  }
  // const categories = [
  //   "All",
  //   "Bouquets",
  //   "Arrangements",
  //   "Premium",
  //   "Mixed",
  //   "Potted",
  // ];
  const categories = ["All", "Single", "Set", "Premium", "Mixed", "Potted"];
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productRes = await productService.getProducts();
      return productRes.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
  });
  // const [data, setData] = useState<ProductSchema2[]>([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const products = await productService.getProducts();
  //       setData(products.data);
  //       console.log("Fetched products:", products);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  useEffect(() => {
    console.log("Products data updated:", data);
  }, [data]);



  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const filteredProducts =
    selectedCategory === "All"
      ? data
      : data?.filter(
          (p: ProductSchema2) => p.category.category_name === selectedCategory
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
        {!isLoading && <ProductGrid
          filteredProducts={filteredProducts}
          setCurrentPage={setCurrentPage}
          setSelectedProduct={handleSelectProduct}
          setCartItemCount={setCartItemCount}
          cartItemCount={cartItemCount}
          addItem={addItem}
        />} 
      </div>
    </div>
  );
};

export default ProductsPage;
