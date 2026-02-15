import { useEffect, useState } from "react";
import { useNavBarStore } from "../../stores/navbar-store";
import FilterElement from "../../components/FilterElement";
import ProductGrid from "../../components/ProductGrid";
import { useCartStore } from "../../stores/cart-store";
import type { ProductSchema2 } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../queries/product/product.query";
import { useCategories } from "../../queries/category/category.query";
import { cartItemService } from "../../services/cart-item.service";

const ProductsPage = () => {
  const navigate= useNavigate()

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setCartItemCount, cartItemCount } = useNavBarStore();
  const { addItem,items } = useCartStore();
  const { cart_id, setCart_id} = useCartStore();

  const handleSelectProduct = (product: ProductSchema2) => {
    navigate(`/productInfo/${product.product_id}`);
  }

  const handleAddItem = async(product: ProductSchema2,quantity: number) => {
   const productSelected = items.find((item) => item.product_id === product.product_id);
    const quantitySelected = productSelected ? productSelected.quantity : 0;
    if(cart_id === null){
      addItem(product, quantity);
      return
    }
    try {
      if(quantitySelected >= 1 && productSelected){
        await cartItemService.updateItem(cart_id,productSelected.product_id,{quantity: quantitySelected + quantity})
        addItem(product, quantity);
        return
      }
      await cartItemService.addItems(cart_id,{quantity: quantitySelected + quantity,product_id: product.product_id,unit_price: product.product_price})
      addItem(product, quantity);
        
    } catch (error) {
      console.log("ProductsPage Error")
      console.log(error)
    }
  }
  // const categories = [
  //   "All",
  //   "Bouquets",
  //   "Arrangements",
  //   "Premium",
  //   "Mixed",
  //   "Potted",
  // ];
  // const categories = ["All", "Single", "Set", "Premium", "Mixed", "Potted"];
  const {data: categories, isLoading:isCategoriesLoading,isError:isCategoriesError, error:categoriesError} = useCategories();
  const { data, isLoading, isError, error } = useProducts();

  useEffect(() => {
    console.log("Products data updated:", data);
    console.log("Categories data:", categories);
  }, [data,categories]);



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
        {!isCategoriesLoading && <FilterElement
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />}

        {/* Products Grid */}
        {!isLoading && <ProductGrid
          filteredProducts={filteredProducts}
          setSelectedProduct={handleSelectProduct}
          setCartItemCount={setCartItemCount}
          cartItemCount={cartItemCount}
          handleAddItem={handleAddItem}
        />} 
      </div>
    </div>
  );
};

export default ProductsPage;
