import React from 'react'
import { X, Upload } from 'lucide-react';
import { useState } from 'react';
import { generateMockData } from '../mock/shop-mock';
const ProductModal = ({ product, onClose, onSave }:any) => {
    const [formData, setFormData] = useState(product || {
      product_name: '',
      product_description: '',
      product_price: '',
      product_stock: '',
      category_id: '',
      colors: [],
      tags: [],
      images: []
    });
    const data = generateMockData();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.product_description}
                  onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.product_price}
                    onChange={(e) => setFormData({ ...formData, product_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.product_stock}
                    onChange={(e) => setFormData({ ...formData, product_stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {data.categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {data.colors.map(color => (
                    <label key={color.color_id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.colors?.includes(color.color_id)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...(formData.colors || []), color.color_id]
                            : formData.colors.filter((id: number) => id !== color.color_id);
                          setFormData({ ...formData, colors: newColors });
                        }}
                        className="rounded text-pink-600"
                      />
                      <span className="text-sm">{color.color_name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Tags</label>
                <div className="flex flex-wrap gap-2">
                  {data.tagEvents.map(tag => (
                    <label key={tag.tag_id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.tags?.includes(tag.tag_id)}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...(formData.tags || []), tag.tag_id]
                            : formData.tags.filter((id: number) => id !== tag.tag_id);
                          setFormData({ ...formData, tags: newTags });
                        }}
                        className="rounded text-pink-600"
                      />
                      <span className="text-sm">{tag.tag_event_name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (up to 5)</label>
                <div className="flex gap-2">
                  <button type="button" className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-500 hover:bg-pink-50">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Click to upload images. You can reorder them by dragging.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                  {product ? 'Save Changes' : 'Add Product'}
                </button>
                <button type="button" onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
export default ProductModal
