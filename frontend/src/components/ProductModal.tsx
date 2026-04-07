// import React from 'react'
// import { X, Upload, Package, DollarSign, Layers, Palette, Tag, Image as ImageIcon } from 'lucide-react';
// import { useState } from 'react';
// import type { Color } from '../types/color';
// // import { productService } from '../services/product-service/product';
// // import { productImageService } from '../services/product-service/product-image.service';
// // import { productColorService } from '../services/product-service/product-color.service';
// // import { productTagsService } from '../services/product-service/product-tag.service';
// import type { ProductSchema2 } from '../types/product';
// import type { Category } from '../types/category';
// import type { EventTag } from '../types/event-tags'

// type createProduct = {
//   product_name: string;
//   product_description: string;
//   product_price: number;
//   shop_id: string;
//   category_id: number;
// }

// type ProductModalProps = {
//   product: ProductSchema2 | undefined;
//   onClose: () => void;
//   categories: Category[];
//   colors: Color[];
//   tagEvents: EventTag[];
// }

// const ProductModal = ({ product, onClose, categories, colors, tagEvents }: ProductModalProps) => {
//   const productDestucture = product ? {
//     product_name: product.product_name,
//     product_description: product.product_description,
//     product_price: product.product_price,
//     category_id: product.category.category_id,
//     shop_id: ''
//   } : undefined

//   const [formData, setFormData] = useState<createProduct>(productDestucture || {
//     product_name: '',
//     product_description: '',
//     product_price: 0,
//     shop_id: 'cmk8c98550000tm8vt92a3d4q',
//     category_id: 0,
//   });

//   const [selectedColors, setSelectedColors] = useState<{ color_id: number, color_name: string }[]>(product ? product.colors : []);
//   const [category, setCategory] = useState<string>(product && product.category ? String(product.category.category_id) : '');
//   const [selectedTags, setSelectedTags] = useState<{ tag_id: number }[]>(product ? product.productTagEvent.map((tag: any) => ({ tag_id: tag.TagEvent.tag_id })) : []);
//   const [productStock, setProductStock] = useState<number>(product ? product.productStocks[0].stock_qty : 0)
//   const [images, setImages] = useState<File[]>([]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
//       <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
//         {/* Modal Header */}
//         <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
//               <Package className="w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
//               <p className="text-xs text-gray-400 font-medium">Fill in the details to update your shop</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-8 overflow-y-auto custom-scrollbar">
//           <form onSubmit={handleSubmit} id="product-form" className="space-y-6">
            
//             {/* Basic Info */}
//             <div className="space-y-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Premium Cotton T-Shirt"
//                   value={formData.product_name}
//                   onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   placeholder="Tell more about your product..."
//                   value={formData.product_description}
//                   onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm min-h-[100px]"
//                 />
//               </div>
//             </div>

//             {/* Price & Stock */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                   <DollarSign className="w-4 h-4 text-gray-400" /> Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={formData.product_price}
//                   onChange={(e) => setFormData({ ...formData, product_price: parseFloat(e.target.value) })}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm font-bold"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                    Stock Quantity
//                 </label>
//                 <input
//                   type="number"
//                   value={productStock}
//                   onChange={(e) => setProductStock(parseInt(e.target.value))}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm font-bold"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                 <Layers className="w-4 h-4 text-gray-400" /> Category
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => {
//                   setCategory(e.target.value)
//                   setFormData({...formData, category_id: parseInt(e.target.value)})
//                 }}
//                 className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm cursor-pointer"
//                 required
//               >
//                 <option value="">Select category</option>
//                 {categories?.map(cat => (
//                   <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Colors */}
//             <div>
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                 <Palette className="w-4 h-4 text-gray-400" /> Available Colors
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {colors.map((color) => {
//                   const isSelected = selectedColors.some(c => c.color_id === color.color_id);
//                   return (
//                     <label key={color.color_id} className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-all ${isSelected ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={(e) => {
//                           const newColors = e.target.checked
//                             ? [...selectedColors, color]
//                             : selectedColors.filter(c => c.color_id !== color.color_id);
//                           setSelectedColors(newColors);
//                         }}
//                         className="hidden"
//                       />
//                       <span className="text-xs font-bold">{color.color_name}</span>
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Event Tags */}
//             <div>
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                 <Tag className="w-4 h-4 text-gray-400" /> Event Tags
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {tagEvents.map(tag => {
//                   const isSelected = selectedTags.some(t => t.tag_id === tag.tag_id);
//                   return (
//                     <label key={tag.tag_id} className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer border transition-all ${isSelected ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={(e) => {
//                           const newTags = e.target.checked
//                             ? [...selectedTags, { tag_id: tag.tag_id }]
//                             : selectedTags.filter(t => t.tag_id !== tag.tag_id);
//                           setSelectedTags(newTags);
//                         }}
//                         className="hidden"
//                       />
//                       <span className="text-xs font-bold">{tag.tag_event_name}</span>
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div className='space-y-4 pt-2'>
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                 <ImageIcon className="w-4 h-4 text-gray-400" /> Product Images
//               </label>
//               <div className="flex flex-wrap gap-4">
//                 {images.map((image, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={URL.createObjectURL(image)}
//                       alt="Preview"
//                       className="w-24 h-24 object-cover rounded-2xl border border-gray-100 shadow-sm"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setImages(images.filter((_, i) => i !== index))}
//                       className="absolute -top-2 -right-2 bg-white border border-gray-100 rounded-full p-1 shadow-md hover:text-rose-500 transition-colors"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ))}
                
//                 {images.length < 4 && (
//                   <label className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-rose-400 hover:bg-rose-50/50 transition-all text-gray-400 hover:text-rose-500">
//                     <Upload className="w-5 h-5" />
//                     <span className="text-[10px] font-bold">Upload</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       className="hidden"
//                       onChange={(e) => {
//                         if (e.target.files) {
//                           const selectedFiles = Array.from(e.target.files).slice(0, 4 - images.length);
//                           setImages([...images, ...selectedFiles]);
//                         }
//                       }}
//                     />
//                   </label>
//                 )}
//               </div>
//               <p className="text-[11px] text-gray-400 font-medium">Upload up to 4 images. Recommended size: 800x800px.</p>
//             </div>
//           </form>
//         </div>

//         {/* Modal Footer */}
//         <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-3">
//           <button 
//             type="submit" 
//             form="product-form"
//             className="flex-[2] bg-rose-500 text-white py-3.5 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 active:scale-95 text-sm"
//           >
//             {product ? 'Save Changes' : 'Create Product'}
//           </button>
//           <button 
//             type="button" 
//             onClick={onClose} 
//             className="flex-1 bg-white border border-gray-200 text-gray-500 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 text-sm"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;





// import React, { useState } from 'react';
// import { X, Upload, Package, DollarSign, Layers, Palette, Tag, Image as ImageIcon } from 'lucide-react';
// import type { Color } from '../types/color';
// import type { ProductSchema2 } from '../types/product';
// import type { Category } from '../types/category';
// import type { EventTag } from '../types/event-tags';

// type createProduct = {
//   product_name: string;
//   product_description: string;
//   product_price: number;
//   shop_id: string;
//   category_id: number;
// }

// type ProductModalProps = {
//   product: ProductSchema2 | undefined;
//   onClose: () => void;
//   categories: Category[];
//   colors: Color[];
//   tagEvents: EventTag[];
//   onSaveSuccess?: () => void; // เพิ่ม callback เมื่อเซฟสำเร็จ
// }

// const ProductModal = ({ product, onClose, categories, colors, tagEvents, onSaveSuccess }: ProductModalProps) => {
  
//   // 1. ปรับการ Destructure ให้ปลอดภัยขึ้น
//   const initialFormData = product ? {
//     product_name: product.product_name,
//     product_description: product.product_description,
//     product_price: product.product_price,
//     category_id: product.category?.category_id || 0,
//     shop_id: product.shop_id || ''
//   } : {
//     product_name: '',
//     product_description: '',
//     product_price: 0,
//     shop_id: '', 
//     category_id: 0,
//   };

//   const [formData, setFormData] = useState<createProduct>(initialFormData);

//   // 2. แก้ Error .some() โดยการใส่ || [] ทุกจุดที่ทำ Initial State
//   const [selectedColors, setSelectedColors] = useState<any[]>(
//     product?.productColors?.map((c: any) => c.Color) || []
//   );
  
//   const [category, setCategory] = useState<string>(
//     product?.category ? String(product.category.category_id) : ''
//   );

//   const [selectedTags, setSelectedTags] = useState<{ tag_id: number }[]>(
//     product?.productTagEvent?.map((tag: any) => ({ tag_id: tag.TagEvent.tag_id })) || []
//   );

//   const [productStock, setProductStock] = useState<number>(
//     product?.productStocks?.[0]?.stock_qty || 0
//   );
  
//   const [images, setImages] = useState<File[]>([]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // TODO: ยิง API addProduct หรือ updateProduct ที่นี่
//     console.log("Submitting Data:", { formData, selectedColors, selectedTags, productStock });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
//       <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
//         {/* Header */}
//         <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
//               <Package className="w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
//               <p className="text-xs text-gray-400 font-medium">Update your inventory details</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-8 overflow-y-auto custom-scrollbar">
//           <form onSubmit={handleSubmit} id="product-form" className="space-y-6">
            
//             {/* Name & Desc */}
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">Product Name</label>
//                 <input
//                   type="text"
//                   value={formData.product_name}
//                   onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none transition-all text-sm"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">Description</label>
//                 <textarea
//                   value={formData.product_description}
//                   onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none transition-all text-sm min-h-[80px]"
//                 />
//               </div>
//             </div>

//             {/* Price & Stock */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">Price (฿)</label>
//                 <input
//                   type="number"
//                   value={formData.product_price}
//                   onChange={(e) => setFormData({ ...formData, product_price: parseFloat(e.target.value) })}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">Stock</label>
//                 <input
//                   type="number"
//                   value={productStock}
//                   onChange={(e) => setProductStock(parseInt(e.target.value))}
//                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
//               <select
//                 value={category}
//                 onChange={(e) => {
//                   setCategory(e.target.value)
//                   setFormData({...formData, category_id: parseInt(e.target.value)})
//                 }}
//                 className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer"
//                 required
//               >
//                 <option value="">Select category</option>
//                 {categories?.map(cat => (
//                   <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Colors - จุดที่เคย Error */}
//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-3 block">Colors</label>
//               <div className="flex flex-wrap gap-2">
//                 {colors?.map((color) => {
//                   // ใช้ Optional Chaining และ Default Value
//                   const isSelected = (selectedColors || []).some(c => c.color_id === color.color_id);
//                   return (
//                     <label key={color.color_id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer border transition-all ${isSelected ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-gray-400'}`}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={(e) => {
//                           const newColors = e.target.checked
//                             ? [...selectedColors, color]
//                             : selectedColors.filter(c => c.color_id !== color.color_id);
//                           setSelectedColors(newColors);
//                         }}
//                         className="hidden"
//                       />
//                       <div className="w-3 h-3 rounded-full shadow-sm border border-gray-100" style={{ backgroundColor: color.color_code }} />
//                       <span className="text-[10px] font-bold uppercase">{color.color_name}</span>
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Tags */}
//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-3 block">Tags</label>
//               <div className="flex flex-wrap gap-2">
//                 {tagEvents?.map(tag => {
//                   const isSelected = (selectedTags || []).some(t => t.tag_id === tag.tag_id);
//                   return (
//                     <label key={tag.tag_id} className={`px-3 py-1.5 rounded-lg cursor-pointer border text-[10px] font-black uppercase transition-all ${isSelected ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-gray-200 text-gray-400'}`}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={(e) => {
//                           const newTags = e.target.checked
//                             ? [...selectedTags, { tag_id: tag.tag_id }]
//                             : selectedTags.filter(t => t.tag_id !== tag.tag_id);
//                           setSelectedTags(newTags);
//                         }}
//                         className="hidden"
//                       />
//                       {tag.tag_event_name}
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Images */}
//             <div className='space-y-3'>
//               <label className="text-sm font-semibold text-gray-700 block">Images</label>
//               <div className="flex flex-wrap gap-3">
//                 {images.map((image, index) => (
//                   <div key={index} className="relative group">
//                     <img src={URL.createObjectURL(image)} className="w-20 h-20 object-cover rounded-xl border shadow-sm" alt="Preview" />
//                     <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-rose-500 hover:scale-110 transition-transform">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ))}
//                 {images.length < 4 && (
//                   <label className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-rose-400 hover:bg-rose-50 text-gray-400">
//                     <Upload className="w-4 h-4" />
//                     <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && setImages([...images, ...Array.from(e.target.files)].slice(0, 4))} />
//                   </label>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="p-8 border-t border-gray-50 flex gap-3">
//           <button type="submit" form="product-form" className="flex-[2] bg-rose-500 text-white py-3.5 rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100">
//             {product ? 'Save Changes' : 'Create Product'}
//           </button>
//           <button type="button" onClick={onClose} className="flex-1 bg-white border border-gray-200 text-gray-400 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-all">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;




import React, { useState, useEffect } from 'react';
import { X, Upload, Package, DollarSign, Layers, Palette, Tag, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { productService } from '../services/product-service/product';
import { productImageService } from '../services/product-service/product-image.service';

const ProductModal = ({ product, onClose, categories, colors, tagEvents, onSaveSuccess }: any) => {
  
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_price: 0,
    shop_id: 'cmk8c98550000tm8vt92a3d4q',
    category_id: 0,
  });

  const [selectedColorIds, setSelectedColorIds] = useState<number[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [productStock, setProductStock] = useState<number>(0);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{status: 'success' | 'error', message: string} | null>(null);

  useEffect(() => {
    if (product) {
      const currentCatId = product.category?.category_id || product.category_id || 0;

      setFormData({
        product_name: product.product_name || '',
        product_description: product.product_description || '',
        product_price: Number(product.product_price) || 0,
        shop_id: product.shop_id || 'cmk8c98550000tm8vt92a3d4q',
        category_id: Number(currentCatId), 
      });

      setProductStock(product.productStocks?.[0]?.stock_qty || 0);
      setExistingImages(product.productImage || []);
      
      const cols = product.productColors?.map((c: any) => Number(c.Color?.color_id || c.color_id)).filter(id => !isNaN(id)) || [];
      const tags = product.productTagEvent?.map((t: any) => Number(t.TagEvent?.tag_id || t.tag_id)).filter(id => !isNaN(id)) || [];
      setSelectedColorIds(cols);
      setSelectedTagIds(tags);
    }
  }, [product]);

  useEffect(() => {
    if (notification && notification.status === 'success') {
      const timer = setTimeout(() => {
        setNotification(null);
        onSaveSuccess(); 
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [notification, onSaveSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category_id) {
      setNotification({ status: 'error', message: 'Please select a category' });
      return;
    }

    setIsSubmitting(true);
    try {
      let productId = product?.product_id;
      if (product) {
        await productService.updateProduct(productId, formData);
      } else {
        const res = await productService.createProduct(formData);
        productId = res.data.product_id;
      }

      if (newImages.length > 0) {
        const imageFormData = new FormData();
        newImages.forEach(file => imageFormData.append('images', file));
        await productImageService.uploadImages(productId, imageFormData);
      }

      setNotification({ status: 'success', message: product ? 'Updated!' : 'Created!' });
    } catch (error) {
      setNotification({ status: 'error', message: 'Error saving data' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      {notification && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${notification.status === 'success' ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'}`}>
          <span className="font-bold text-xs uppercase tracking-widest">{notification.message}</span>
        </div>
      )}

      <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative border border-gray-100">
        {/* Header - ปรับ Font เป็น Bold พอ ไม่ต้อง Black */}
        <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500"><Package className="w-5 h-5" /></div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">{product ? 'Edit Product' : 'Add New Product'}</h2>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Inventory</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <form onSubmit={handleSubmit} id="product-form" className="space-y-6">
            
            {/* Input Name & Desc */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Product Name</label>
                <input type="text" value={formData.product_name} onChange={(e) => setFormData({ ...formData, product_name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium focus:border-rose-400 focus:bg-white transition-all" required />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Description</label>
                <textarea value={formData.product_description} onChange={(e) => setFormData({ ...formData, product_description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium min-h-[80px] resize-none focus:border-rose-400 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Price (฿)</label>
                <input type="number" value={formData.product_price} onChange={(e) => setFormData({ ...formData, product_price: parseFloat(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm" required />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Stock</label>
                <input type="number" value={productStock} onChange={(e) => setProductStock(parseInt(e.target.value))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-sm" required />
              </div>
            </div>

            {/* Category - Fix: Ensure Type-Safe Comparison */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories?.map((cat: any) => {
                  const isSelected = Number(formData.category_id) === Number(cat.category_id);
                  return (
                    <button
                      key={cat.category_id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category_id: Number(cat.category_id) })}
                      className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase border-2 transition-all ${isSelected ? 'bg-rose-50 border-rose-500 text-rose-500' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      {cat.category_name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Colors</label>
              <div className="flex flex-wrap gap-2">
                {colors?.map((color: any) => (
                  <label key={color.color_id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer border-2 transition-all ${selectedColorIds.includes(Number(color.color_id)) ? 'bg-rose-50 border-rose-400 text-rose-600' : 'bg-white border-gray-100 text-gray-500'}`}>
                    <input type="checkbox" checked={selectedColorIds.includes(Number(color.color_id))} onChange={(e) => setSelectedColorIds(prev => e.target.checked ? [...prev, Number(color.color_id)] : prev.filter(id => id !== Number(color.color_id)))} className="hidden" />
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color.color_code }} />
                    <span className="text-[10px] font-bold uppercase">{color.color_name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Event Tags</label>
              <div className="flex flex-wrap gap-2">
                {tagEvents?.map((tag: any) => (
                  <label key={tag.tag_id} className={`px-4 py-1.5 rounded-lg cursor-pointer border-2 text-[10px] font-bold uppercase transition-all ${selectedTagIds.includes(Number(tag.tag_id)) ? 'bg-purple-50 border-purple-400 text-purple-600' : 'bg-white border-gray-100 text-gray-400'}`}>
                    <input type="checkbox" checked={selectedTagIds.includes(Number(tag.tag_id))} onChange={(e) => setSelectedTagIds(prev => e.target.checked ? [...prev, Number(tag.tag_id)] : prev.filter(id => id !== Number(tag.tag_id)))} className="hidden" />
                    {tag.tag_event_name}
                  </label>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className='pt-2'>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Images</label>
              <div className="flex flex-wrap gap-3">
                {existingImages.map((img, index) => (
                  <div key={`old-${index}`} className="relative">
                    <img src={img.image_url} className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                    <button type="button" onClick={() => setExistingImages(existingImages.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-white border rounded-full p-1 text-rose-500 shadow-sm"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                {newImages.map((file, index) => (
                  <div key={`new-${index}`} className="relative">
                    <img src={URL.createObjectURL(file)} className="w-20 h-20 object-cover rounded-xl border border-rose-200" />
                    <button type="button" onClick={() => setNewImages(newImages.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-white border rounded-full p-1 text-rose-500 shadow-sm"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                {(existingImages.length + newImages.length) < 4 && (
                  <label className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 text-gray-400 transition-all">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && setNewImages([...newImages, ...Array.from(e.target.files)].slice(0, 4 - (existingImages.length + newImages.length)))} />
                  </label>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-50 bg-gray-50/20 flex gap-3">
          <button type="submit" form="product-form" disabled={isSubmitting} className="flex-[2] bg-rose-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-rose-600 transition-all active:scale-95 text-xs uppercase tracking-widest disabled:bg-gray-300">
            {isSubmitting ? 'Saving...' : (product ? 'Update' : 'Create')}
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-white border border-gray-200 text-gray-500 py-3.5 rounded-xl font-bold hover:bg-gray-50 text-xs uppercase tracking-widest transition-all">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;