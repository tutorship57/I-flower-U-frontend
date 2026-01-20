import { useEffect, useState } from "react";
import { useNavBarStore } from "../../stores/navbar-store";
import FilterElement from "../../components/FilterElement";
import ProductGrid from "../../components/ProductGrid";
import { useCartStore } from "../../stores/cart-store";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product-service/product";
import type { ProductSchema2 } from "../../types/product";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
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
