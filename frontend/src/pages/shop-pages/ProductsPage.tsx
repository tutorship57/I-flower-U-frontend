import React,{use, useState}from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { generateMockData } from '../../mock/shop-mock';
import ProductModal from '../../components/ProductModal';
 const ProductsPage = () =>{
    const [data, setData] = useState(generateMockData());
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
   
    
    return isProductModalOpen ?
    (
    <ProductModal
      isOpen={isProductModalOpen}
      onClose={() => setIsProductModalOpen(false)}
      product={selectedProduct}
      categories={data.categories}
      tagEvents={data.tagEvents}
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
            setSelectedProduct(null);
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
                    <img src={product.images[0]} alt={product.product_name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm">{product.product_name}</p>
                      <div className="flex gap-1 mt-1">
                        {product.tags.map(tagId => {
                          const tag = data.tagEvents.find(t => t.tag_id === tagId);
                          return (
                            <span key={tagId} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              {tag?.tag_event_name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {data.categories.find(c => c.category_id === product.category_id)?.category_name}
                </td>
                <td className="px-6 py-4 text-sm font-medium">${product.product_price}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${product.product_stock < 10 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {product.product_stock}
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
