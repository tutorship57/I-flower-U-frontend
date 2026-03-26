import React from 'react'
import { X, Upload, Package, DollarSign, Layers, Palette, Tag, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import type { Color } from '../types/color';
import type { ProductSchema2 } from '../types/product';
import type { Category } from '../types/category';
import type { EventTag } from '../types/event-tags'

type createProduct = {
  product_name: string;
  product_description: string;
  product_price: number;
  shop_id: string;
  category_id: number;
}

type ProductModalProps = {
  product: ProductSchema2 | undefined;
  onClose: () => void;
  categories: Category[];
  colors: Color[];
  tagEvents: EventTag[];
}

const ProductModal = ({ product, onClose, categories, colors, tagEvents }: ProductModalProps) => {
  const productDestucture = product ? {
    product_name: product.product_name,
    product_description: product.product_description,
    product_price: product.product_price,
    category_id: product.category.category_id,
    shop_id: ''
  } : undefined

  const [formData, setFormData] = useState<createProduct>(productDestucture || {
    product_name: '',
    product_description: '',
    product_price: 0,
    shop_id: 'cmk8c98550000tm8vt92a3d4q',
    category_id: 0,
  });

  const [selectedColors, setSelectedColors] = useState<{ color_id: number, color_name: string }[]>(product ? product.colors : []);
  const [category, setCategory] = useState<string>(product && product.category ? String(product.category.category_id) : '');
  const [selectedTags, setSelectedTags] = useState<{ tag_id: number }[]>(product ? product.productTagEvent.map((tag: any) => ({ tag_id: tag.TagEvent.tag_id })) : []);
  const [productStock, setProductStock] = useState<number>(product ? product.productStocks[0].stock_qty : 0)
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
              <p className="text-xs text-gray-400 font-medium">Fill in the details to update your shop</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} id="product-form" className="space-y-6">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium Cotton T-Shirt"
                  value={formData.product_name}
                  onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Tell more about your product..."
                  value={formData.product_description}
                  onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm min-h-[100px]"
                />
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-400" /> Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.product_price}
                  onChange={(e) => setFormData({ ...formData, product_price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm font-bold"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                   Stock Quantity
                </label>
                <input
                  type="number"
                  value={productStock}
                  onChange={(e) => setProductStock(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm font-bold"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Layers className="w-4 h-4 text-gray-400" /> Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setFormData({...formData, category_id: parseInt(e.target.value)})
                }}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm cursor-pointer"
                required
              >
                <option value="">Select category</option>
                {categories?.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                ))}
              </select>
            </div>

            {/* Colors */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Palette className="w-4 h-4 text-gray-400" /> Available Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                  const isSelected = selectedColors.some(c => c.color_id === color.color_id);
                  return (
                    <label key={color.color_id} className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-all ${isSelected ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...selectedColors, color]
                            : selectedColors.filter(c => c.color_id !== color.color_id);
                          setSelectedColors(newColors);
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-bold">{color.color_name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Event Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Tag className="w-4 h-4 text-gray-400" /> Event Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tagEvents.map(tag => {
                  const isSelected = selectedTags.some(t => t.tag_id === tag.tag_id);
                  return (
                    <label key={tag.tag_id} className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-all ${isSelected ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...selectedTags, { tag_id: tag.tag_id }]
                            : selectedTags.filter(t => t.tag_id !== tag.tag_id);
                          setSelectedTags(newTags);
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-bold">{tag.tag_event_name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Image Upload */}
            <div className='space-y-4 pt-2'>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImageIcon className="w-4 h-4 text-gray-400" /> Product Images
              </label>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-2xl border border-gray-100 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-white border border-gray-100 rounded-full p-1 shadow-md hover:text-rose-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {images.length < 4 && (
                  <label className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-rose-400 hover:bg-rose-50/50 transition-all text-gray-400 hover:text-rose-500">
                    <Upload className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          const selectedFiles = Array.from(e.target.files).slice(0, 4 - images.length);
                          setImages([...images, ...selectedFiles]);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Upload up to 4 images. Recommended size: 800x800px.</p>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-3">
          <button 
            type="submit" 
            form="product-form"
            className="flex-[2] bg-rose-500 text-white py-3.5 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 active:scale-95 text-sm"
          >
            {product ? 'Save Changes' : 'Create Product'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 bg-white border border-gray-200 text-gray-500 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;