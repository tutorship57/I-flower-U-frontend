import React from 'react'
import { X, Upload } from 'lucide-react';
import { useState } from 'react';
import { generateMockData } from '../mock/shop-mock';
import { productService } from '../services/product-service/product';
import { productImageService } from '../services/product-service/product-image.service';
import { productColorService } from '../services/product-service/product-color.service';
import { productTagsService } from '../services/product-service/product-tag.service';
import { useCategories } from '../queries/category/category.query';
import { useColors } from '../queries/color/color.query';
const ProductModal = ({ product, onClose,categories,colors,tagEvents,isOpen}:any) => {
    const [formData, setFormData] = useState<any>(product || {
      product_name: '',
      product_description: '',
      product_price: 0,
      product_stock: 0,
      shop_id: 'cmk8c98550000tm8vt92a3d4q',
      category_id: 0,
    });
    const [selectedColors, setSelectedColors] = useState<{color_id: number}[]>(product ? product.colors : []);
    console.log("🚀 ~ ProductModal ~ selectedColors:", selectedColors)
    const [category,setCategory] = useState<string>(product && product.category ? product.category.category_name : ''); 
    const [selectedTags, setSelectedTags] = useState<{tag_id: number}[]>(product ? product.tags : []);
    console.log("🚀 ~ ProductModal ~ selectedTags:", selectedTags)
    const [images, setImages] = useState<File[]>(product ? product.productImage : []);
    const data = generateMockData();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const productResponse = await productService.addProduct(formData);
      const data = productResponse.data;
      const {product_id} = data;
      console.log("this is product id",product_id);
      await Promise.all([
        // productCategoryService.addCategory(product_id, String(category)),
        productColorService.addColors(product_id, colors),
        productTagsService.addProductTags(product_id, tags),
        productImageService.addImages(product_id, images),
      ]);
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
                    onChange={(e) => setFormData({ ...formData, product_price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.product_stock}
                    onChange={(e) => setFormData({ ...formData, product_stock: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category ? category : ''}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value={''} className={''}>Select category</option>
                  {categories?.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {/* {data.colors.map(color => ( */}
                    {colors.map(color => (
                    <label key={color.color_id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedColors?.includes(color.color_id)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...selectedColors, color.color_id]
                            : selectedColors.filter((id: number) => id !== color.color_id);
                          setSelectedColors(newColors);
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
                  {tagEvents.map(tag => (
                    <label key={tag.tag_id} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedTags?.includes(tag.tag_id)}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...selectedTags, tag.tag_id]
                            : selectedTags.filter((id: number) => id !== tag.tag_id);
                          setSelectedTags(newTags);
                        }}
                        className="rounded text-pink-600"
                      />
                      <span className="text-sm">{tag.tag_event_name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images (up to 4)</label>
                </div>
                <div className='flex '>
                  {images.map((image, index) => (
                    <div key={index} className="relative mr-4">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = images.filter((_, i) => i !== index);
                          setImages(newImages);
                        }}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 ">
                  <button type="button" className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-500 hover:bg-pink-50">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          const selectedFiles = Array.from(e.target.files).slice(0, 4 - images.length);
                          setImages([...images, ...selectedFiles]);
                        }
                      }}
                    />
                    
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Click to upload images. You can reorder them by dragging.</p>
              </div>

              <div className="flex gap-3">
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
