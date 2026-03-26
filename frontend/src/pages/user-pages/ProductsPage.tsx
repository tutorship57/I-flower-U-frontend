// import { useState } from "react";
// import FilterElement from "../../components/FilterElement";
// import ProductGrid from "../../components/ProductGrid";
// import { useCartStore } from "../../stores/cart-store";
// import type { ProductSchema2 } from "../../types/product";
// import { useNavigate } from "react-router-dom";
// import { useProducts } from "../../queries/product/product.query";
// import { useCategories } from "../../queries/category/category.query";
// import { cartItemService } from "../../services/cart-item.service";
// import ProductGridSkeleton from "../../components/ProductGridSkeleton";
// //เพิ่ม
// import { useSearchParams } from "react-router-dom";
// import { useEffect } from "react";

// const ProductsPage = () => {
//   const navigate= useNavigate()

//   const [searchParams] = useSearchParams(); //เพิ่ม
//   const categoryFromURL = searchParams.get("category");

//   const [selectedCategory, setSelectedCategory] = useState(
//     categoryFromURL || "All"
//   );

//   useEffect(() => {
//   if (categoryFromURL) {
//     setSelectedCategory(categoryFromURL);
//   }
// }, [categoryFromURL]);

//   // const [selectedCategory, setSelectedCategory] = useState("All");
//   const { addItem,items } = useCartStore();
//   const { cart_id } = useCartStore();

//   const handleSelectProduct = (product: ProductSchema2) => {
//     navigate(`/productInfo/${product.product_id}`);
//   }

//   const handleAddItem = async(product: ProductSchema2,quantity: number) => {
//    const productSelected = items.find((item) => item.product_id === product.product_id);
//     const quantitySelected = productSelected ? productSelected.quantity : 0;
//     if(cart_id === null){
//       addItem(product, quantity);
//       return
//     }
//     try {
//       if(quantitySelected >= 1 && productSelected){
//         await cartItemService.updateItem(cart_id,productSelected.product_id,{quantity: quantitySelected + quantity})
//         addItem(product, quantity);
//         return
//       }
//       await cartItemService.addItems(cart_id,{quantity: quantitySelected + quantity,product_id: product.product_id,unit_price: product.product_price})
//       addItem(product, quantity);
        
//     } catch (error) {
//       console.log("ProductsPage Error")
//       console.log(error)
//     }
//   }
  
//   const {data: categories, isLoading:isCategoriesLoading} = useCategories();
//   const { data, isLoading, isError, error } = useProducts();





//   if (isError) {
//     return <div>Error: {(error as Error).message}</div>;
//   }

//   const filteredProducts =
//     selectedCategory === "All"
//       ? data
//       : data?.filter(
//           (p: ProductSchema2) => p.category.category_name === selectedCategory
//         );

//   return (
//     <div className="min-h-screen nf-fade-3 bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold mb-8">Our Collection</h1>

//         {/* Filters */}
//         {!isCategoriesLoading && <FilterElement
//           categories={categories}
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />}

//         {/* Products Grid */}
//         {!isLoading ? <ProductGrid
//           filteredProducts={filteredProducts}
//           setSelectedProduct={handleSelectProduct}
//           handleAddItem={handleAddItem}
//         /> : <ProductGridSkeleton/>} 
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;

import { useState, useEffect } from "react";
import FilterElement from "../../components/FilterElement";
import ProductGrid from "../../components/ProductGrid";
import { useCartStore } from "../../stores/cart-store";
import type { ProductSchema2 } from "../../types/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../../queries/product/product.query";
import { useCategories } from "../../queries/category/category.query";
import { cartItemService } from "../../services/cart-item.service";
import ProductGridSkeleton from "../../components/ProductGridSkeleton";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");
  const searchFromURL = searchParams.get("search");   // ← รับ search param

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "All"
  );

  useEffect(() => {
    if (categoryFromURL) setSelectedCategory(categoryFromURL);
    else if (searchFromURL) setSelectedCategory("All"); // reset category เมื่อ search
  }, [categoryFromURL, searchFromURL]);

  const { addItem, items, cart_id } = useCartStore();

  const handleSelectProduct = (product: ProductSchema2) => {
    navigate(`/productInfo/${product.product_id}`);
  };

  const handleAddItem = async (product: ProductSchema2, quantity: number) => {
    const productSelected = items.find((item) => item.product_id === product.product_id);
    const quantitySelected = productSelected ? productSelected.quantity : 0;

    if (cart_id === null) {
      addItem(product, quantity);
      return;
    }
    try {
      if (quantitySelected >= 1 && productSelected) {
        await cartItemService.updateItem(cart_id, productSelected.product_id, {
          quantity: quantitySelected + quantity,
        });
        addItem(product, quantity);
        return;
      }
      await cartItemService.addItems(cart_id, {
        quantity: quantitySelected + quantity,
        product_id: product.product_id,
        unit_price: product.product_price,
      });
      addItem(product, quantity);
    } catch (error) {
      console.log("ProductsPage Error", error);
    }
  };

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data, isLoading, isError, error } = useProducts();

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  // ── Filter logic ──────────────────────────────────────────────────────────
  let filteredProducts = data as ProductSchema2[] | undefined;

  // 1. filter by search keyword (ถ้ามี)
  if (searchFromURL?.trim()) {
    const keyword = searchFromURL.toLowerCase();
    filteredProducts = filteredProducts?.filter((p) =>
      p.product_name.toLowerCase().includes(keyword) ||
      p.category?.category_name.toLowerCase().includes(keyword)
    );
  }

  // 2. filter by category (ถ้าไม่ใช่ All)
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts?.filter(
      (p) => p.category.category_name === selectedCategory
    );
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen nf-fade-3 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title — แสดงคำที่ค้นหาถ้ามี */}
        {searchFromURL ? (
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Search Results</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Showing results for{" "}
              <span className="text-rose-500 font-semibold">"{searchFromURL}"</span>
              {filteredProducts && (
                <span className="ml-2 text-gray-400">
                  — {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                </span>
              )}
            </p>
          </div>
        ) : (
          <h1 className="text-4xl font-bold mb-8">Our Collection</h1>
        )}

        {/* Filters — ซ่อนตอน search */}
        {!searchFromURL && !isCategoriesLoading && (
          <FilterElement
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {/* Products Grid */}
        {!isLoading ? (
          <ProductGrid
            filteredProducts={filteredProducts}
            setSelectedProduct={handleSelectProduct}
            handleAddItem={handleAddItem}
          />
        ) : (
          <ProductGridSkeleton />
        )}

      </div>
    </div>
  );
};

export default ProductsPage;