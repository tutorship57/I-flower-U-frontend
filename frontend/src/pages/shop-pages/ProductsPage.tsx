import { useState } from 'react'
import { Plus, Edit2, Trash2, Package, Search, ArrowUpRight } from 'lucide-react';
import { generateMockData } from '../../mock/shop-mock';
import ProductModal from '../../components/ProductModal';
import { useCategories } from '../../queries/category/category.query';
import { useColors } from '../../queries/color/color.query';
import { useTagEvents } from '../../queries/tag-event/tag-event.query';
import type { ProductSchema2 } from '../../types/product';

const ProductsPage = () => {
  const [data] = useState(() => generateMockData());
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: colors, isLoading: isColorsLoading } = useColors();
  const { data: tagEvents, isLoading: isTagEventsLoading } = useTagEvents();
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSchema2>();

  // Modal State Logic
  if (isProductModalOpen && !isColorsLoading && !isCategoriesLoading && !isTagEventsLoading) {
    return (
      <ProductModal
        onClose={() => setIsProductModalOpen(false)}
        colors={colors}
        product={selectedProduct}
        categories={categories}
        tagEvents={tagEvents}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Products</h1>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Manage your store inventory and variations
          </p>
        </div>
        
        <button
          onClick={() => {
            setSelectedProduct(undefined);
            setIsProductModalOpen(true);
          }}
          className="bg-rose-500 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-rose-600 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search & Stats Bar (Optional improvement) */}
      {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search product name..." 
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none transition"
            />
          </div>
        </div>
      </div> */}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sold</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.products.map(product => (
                <tr key={product.product_id} className="hover:bg-rose-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={product.productImage[0].image_url} 
                          alt={product.product_name} 
                          className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition duration-200" 
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate group-hover:text-rose-500 transition-colors">
                          {product.product_name}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {product.productTagEvent.map(({ TagEvent: { tag_id } }) => {
                            const tag = data.tagEvents.find(t => t.tag_id === tag_id);
                            return (
                              <span key={tag_id} className="text-[9px] font-black uppercase tracking-tighter bg-purple-50 text-purple-500 px-2 py-0.5 rounded-lg border border-purple-100">
                                {tag?.tag_event_name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-500">
                      {data.categories.find(c => c.category_id === product.category.category_id)?.category_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-gray-800 tracking-tight">
                      ${product.product_price.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-black px-3 py-1 rounded-xl ${
                      product.productStocks[0].stock_qty < 10 
                        ? 'bg-red-50 text-red-500 border border-red-100' 
                        : 'text-gray-600'
                    }`}>
                      {product.productStocks[0].stock_qty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-gray-400 italic">
                      {product.sold} <span className="text-[10px] uppercase font-black not-italic ml-0.5">sold</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsProductModalOpen(true);
                        }}
                        className="p-2 hover:bg-rose-50 rounded-xl text-gray-400 hover:text-rose-500 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {data.products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No products listed</p>
          </div>
        )}
      </div>
    </div>
  )
};

export default ProductsPage;