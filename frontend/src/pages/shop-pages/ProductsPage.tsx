import { useState}from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { generateMockData } from '../../mock/shop-mock';
import ProductModal from '../../components/ProductModal';
import { useCategories } from '../../queries/category/category.query';
import { useColors } from '../../queries/color/color.query';
import { useTagEvents } from '../../queries/tag-event/tag-event.query';
import type {ProductSchema2} from '../../types/product';
 const ProductsPage = () =>{
    const [data,] = useState(()=>generateMockData());
    const {data:categories,isLoading:isCategoriesLoading} = useCategories();
    const {data: colors,isLoading:isColorsLoading} = useColors();
    const {data: tagEvents,isLoading:isTagEventsLoading} = useTagEvents();
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductSchema2>();
    
    
    return isProductModalOpen && !isColorsLoading && !isCategoriesLoading && !isTagEventsLoading ?
    (
    selectedProduct &&<ProductModal
      // isOpen={isProductModalOpen}
      onClose={() => setIsProductModalOpen(false)}
      colors={colors} 
      product={selectedProduct}
      categories={categories}
      tagEvents={tagEvents}
    />
  ) : (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(undefined);
            setIsProductModalOpen(true);
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sold</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.products.map(product => (
              <tr key={product.product_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.productImage[0].image_url} alt={product.product_name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm">{product.product_name}</p>
                      <div className="flex gap-1 mt-1">
                        {product.productTagEvent.map(({TagEvent:{tag_id}}) => {
                          const tag = data.tagEvents.find(t => t.tag_id === tag_id);
                          return (
                            <span key={tag_id} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              {tag?.tag_event_name}
                            </span>
                          );  
                        })}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {data.categories.find(c => c.category_id === product.category.category_id)?.category_name}
                </td>
                <td className="px-6 py-4 text-sm font-medium">${product.product_price}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${product.productStocks[0].stock_qty < 10 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {product.productStocks[0].stock_qty }
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.sold}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsProductModalOpen(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default ProductsPage
