// import { useState } from 'react'
// import { Plus, Edit2, Trash2, Package, Search, ArrowUpRight } from 'lucide-react';
// import { generateMockData } from '../../mock/shop-mock';
// import ProductModal from '../../components/ProductModal';
// import { useCategories } from '../../queries/category/category.query';
// import { useColors } from '../../queries/color/color.query';
// import { useTagEvents } from '../../queries/tag-event/tag-event.query';
// import type { ProductSchema2 } from '../../types/product';

// const ProductsPage = () => {
//   const [data] = useState(() => generateMockData());
//   const { data: categories, isLoading: isCategoriesLoading } = useCategories();
//   const { data: colors, isLoading: isColorsLoading } = useColors();
//   const { data: tagEvents, isLoading: isTagEventsLoading } = useTagEvents();
  
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<ProductSchema2>();

//   // Modal State Logic
//   if (isProductModalOpen && !isColorsLoading && !isCategoriesLoading && !isTagEventsLoading) {
//     return (
//       <ProductModal
//         onClose={() => setIsProductModalOpen(false)}
//         colors={colors}
//         product={selectedProduct}
//         categories={categories}
//         tagEvents={tagEvents}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-black text-gray-800 tracking-tight">Products</h1>
//           <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
//             <Package className="w-4 h-4" />
//             Manage your store inventory and variations
//           </p>
//         </div>
        
//         <button
//           onClick={() => {
//             setSelectedProduct(undefined);
//             setIsProductModalOpen(true);
//           }}
//           className="bg-rose-500 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-rose-600 transition-all active:scale-95"
//         >
//           <Plus className="w-5 h-5" />
//           Add Product
//         </button>
//       </div>

//       {/* Search & Stats Bar (Optional improvement) */}
//       {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
//         <div className="p-4 flex items-center gap-4">
//           <div className="relative flex-1">
//             <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
//             <input 
//               type="text" 
//               placeholder="Search product name..." 
//               className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none transition"
//             />
//           </div>
//         </div>
//       </div> */}

//       {/* Products Table */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-50/50 border-b border-gray-100">
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Stock</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sold</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {data.products.map(product => (
//                 <tr key={product.product_id} className="hover:bg-rose-50/20 transition-colors group">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <img 
//                           src={product.productImage[0].image_url} 
//                           alt={product.product_name} 
//                           className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition duration-200" 
//                         />
//                       </div>
//                       <div className="min-w-0">
//                         <p className="font-bold text-gray-800 text-sm truncate group-hover:text-rose-500 transition-colors">
//                           {product.product_name}
//                         </p>
//                         <div className="flex flex-wrap gap-1 mt-1.5">
//                           {product.productTagEvent.map(({ TagEvent: { tag_id } }) => {
//                             const tag = data.tagEvents.find(t => t.tag_id === tag_id);
//                             return (
//                               <span key={tag_id} className="text-[9px] font-black uppercase tracking-tighter bg-purple-50 text-purple-500 px-2 py-0.5 rounded-lg border border-purple-100">
//                                 {tag?.tag_event_name}
//                               </span>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-semibold text-gray-500">
//                       {data.categories.find(c => c.category_id === product.category.category_id)?.category_name}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-black text-gray-800 tracking-tight">
//                       ${product.product_price.toLocaleString()}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <span className={`text-sm font-black px-3 py-1 rounded-xl ${
//                       product.productStocks[0].stock_qty < 10 
//                         ? 'bg-red-50 text-red-500 border border-red-100' 
//                         : 'text-gray-600'
//                     }`}>
//                       {product.productStocks[0].stock_qty}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <span className="text-sm font-bold text-gray-400 italic">
//                       {product.sold} <span className="text-[10px] uppercase font-black not-italic ml-0.5">sold</span>
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                       <button
//                         onClick={() => {
//                           setSelectedProduct(product);
//                           setIsProductModalOpen(true);
//                         }}
//                         className="p-2 hover:bg-rose-50 rounded-xl text-gray-400 hover:text-rose-500 transition-colors"
//                         title="Edit Product"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button 
//                         className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
//                         title="Delete Product"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Empty State */}
//         {data.products.length === 0 && (
//           <div className="py-20 text-center">
//             <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No products listed</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// };

// export default ProductsPage;




// import { useState } from 'react'
// import { Plus, Edit2, Trash2, Package } from 'lucide-react';
// import { useParams } from 'react-router-dom'; 
// import ProductModal from '../../components/ProductModal';
// import { useCategories } from '../../queries/category/category.query';
// import { useColors } from '../../queries/color/color.query';
// import { useTagEvents } from '../../queries/tag-event/tag-event.query';
// import { useProducts } from '../../queries/product/product.query';
// import { productService } from '../../services/product-service/product';
// import type { ProductSchema2 } from '../../types/product';

// const ProductsPage = () => {
//   // 1. ดึง shopId จาก URL
//   const { shopId } = useParams<{ shopId: string }>();
  
//   // 2. ประกาศ State สำหรับ Modal และการเลือกสินค้า
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<ProductSchema2 | undefined>();
//   const { data: products, isLoading: isProductsLoading, refetch } = useProducts(shopId);
//   const { data: categories, isLoading: isCategoriesLoading } = useCategories();
//   const { data: colors, isLoading: isColorsLoading } = useColors();
//   const { data: tagEvents, isLoading: isTagEventsLoading } = useTagEvents();
  
//   // ฟังก์ชันลบสินค้า
//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await productService.deleteProduct(id);
//         refetch(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
//       } catch (err) {
//         console.error(err);
//         alert("Failed to delete product");
//       }
//     }
//   };

//   // 4. หน้าจอตอนโหลดข้อมูล
//   if (isProductsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
//           <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Products...</p>
//         </div>
//       </div>
//     );
//   }

//   // 5. แสดงผล Modal เมื่อกดปุ่ม (และรอข้อมูลพื้นฐานโหลดเสร็จ)
//   if (isProductModalOpen && !isColorsLoading && !isCategoriesLoading && !isTagEventsLoading) {
//     return (
//       <ProductModal
//         onClose={() => {
//           setIsProductModalOpen(false);
//           setSelectedProduct(undefined);
//         }}
//         colors={colors}
//         product={selectedProduct}
//         categories={categories}
//         tagEvents={tagEvents}
//         // เพิ่ม refetch เผื่อมีการเซฟข้อมูลใน Modal
//         onSaveSuccess={() => {
//           refetch();
//           setIsProductModalOpen(false);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8 animate-in fade-in duration-500">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-black text-gray-800 tracking-tight">Products</h1>
//           <p className="text-gray-400 text-sm mt-1 flex items-center gap-2 font-medium">
//             <Package className="w-4 h-4 text-rose-400" />
//             Inventory Management
//           </p>
//         </div>
        
//         <button
//           onClick={() => {
//             setSelectedProduct(undefined);
//             setIsProductModalOpen(true);
//           }}
//           className="bg-rose-500 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
//         >
//           <Plus className="w-5 h-5" />
//           Add Product
//         </button>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-gray-50/50 border-b border-gray-100">
//                 <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Info</th>
//                 <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Attributes</th>
//                 <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
//                 <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {products && products.length > 0 ? (
//                 products.map((product: any) => (
//                   <tr key={product.product_id} className="hover:bg-rose-50/20 transition-colors group">
//                     <td className="px-8 py-5">
//                       <div className="flex items-center gap-4">
//                         <img 
//                           src={product.productImage?.[0]?.image_url || 'https://via.placeholder.com/150'} 
//                           alt="" 
//                           className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-white group-hover:scale-105 transition-transform duration-300" 
//                         />
//                         <div>
//                           <p className="font-bold text-gray-800 text-sm group-hover:text-rose-500 transition-colors">
//                             {product.product_name}
//                           </p>
//                           <div className="flex flex-wrap gap-1 mt-1.5">
//                              {product.productTagEvent?.map((t: any, idx: number) => (
//                                <span key={idx} className="text-[8px] bg-purple-50 text-purple-500 px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter">
//                                  {t.TagEvent?.tag_event_name || 'Event'}
//                                </span>
//                              ))}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-8 py-5">
//                        <div className="flex gap-1.5 mb-2">
//                           {product.productColors?.map((c: any, idx: number) => (
//                             <div 
//                               key={idx} 
//                               className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" 
//                               style={{ backgroundColor: c.Color?.color_code || '#ddd' }} 
//                               title={c.Color?.color_name}
//                             />
//                           ))}
//                           {(!product.productColors || product.productColors.length === 0) && <span className="text-[10px] text-gray-300">No colors</span>}
//                        </div>
//                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
//                          STOCK: <span className={product.productStocks?.[0]?.stock_qty < 5 ? 'text-red-500' : 'text-gray-600'}>
//                            {product.productStocks?.[0]?.stock_qty ?? 0}
//                          </span>
//                        </p>
//                     </td>
//                     <td className="px-8 py-5 font-black text-gray-800">
//                       ฿{Number(product.product_price).toLocaleString()}
//                     </td>
//                     <td className="px-8 py-5 text-right">
//                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                           <button 
//                             onClick={() => { 
//                               setSelectedProduct(product); 
//                               setIsProductModalOpen(true); 
//                             }} 
//                             className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-500 transition-all hover:bg-white hover:shadow-xl active:scale-90"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button 
//                             onClick={() => handleDelete(product.product_id)} 
//                             className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition-all hover:bg-white hover:shadow-xl active:scale-90"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                        </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="py-24 text-center">
//                     <div className="flex flex-col items-center gap-2">
//                       <Package className="w-10 h-10 text-gray-200" />
//                       <p className="text-gray-400 font-bold italic text-sm">No products found in this shop.</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;




// import { useState } from 'react'
// import { Plus, Edit2, Trash2, Package } from 'lucide-react';
// import { useParams } from 'react-router-dom'; 
// import ProductModal from '../../components/ProductModal';
// import { useCategories } from '../../queries/category/category.query';
// import { useColors } from '../../queries/color/color.query';
// import { useTagEvents } from '../../queries/tag-event/tag-event.query';
// import { useProducts } from '../../queries/product/product.query'; // ใช้ชื่อเดิมไม่กระทบหน้า Home
// import { productService } from '../../services/product-service/product';
// import type { ProductSchema2 } from '../../types/product';

// const ProductsPage = () => {
//   const { shopId } = useParams<{ shopId: string }>();
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<ProductSchema2 | undefined>();

//   const { data: products, isLoading: isProductsLoading, refetch } = useProducts(shopId);
//   const { data: categories, isLoading: isCategoriesLoading } = useCategories();
//   const { data: colors, isLoading: isColorsLoading } = useColors();
//   const { data: tagEvents, isLoading: isTagEventsLoading } = useTagEvents();
  
//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         await productService.deleteProduct(id);
//         refetch();
//       } catch (err) { alert("Delete failed"); }
//     }
//   };

//   if (isProductsLoading) return <div className="p-20 text-center font-bold">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-black text-gray-800">Shop Inventory</h1>
//         <button onClick={() => { setSelectedProduct(undefined); setIsProductModalOpen(true); }} className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-rose-100">+ Add Product</button>
//       </div>

//       <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50/50 border-b border-gray-100">
//             <tr>
//               <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
//               <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock/Colors</th>
//               <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
//               <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {products?.map((product: any) => (
//               <tr key={product.product_id} className="hover:bg-rose-50/20 group transition-all">
//                 <td className="px-8 py-5">
//                   <div className="flex items-center gap-4">
//                     <img src={product.productImage?.[0]?.image_url || 'https://via.placeholder.com/150'} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
//                     <div>
//                       <p className="font-bold text-gray-800 text-sm">{product.product_name}</p>
//                       {/* ✅ ลูป Tag เฉพาะของสินค้าตัวนี้ */}
//                       <div className="flex flex-wrap gap-1 mt-1">
//                         {product.productTagEvent?.map((t: any, idx: number) => (
//                           <span key={idx} className="text-[8px] bg-purple-50 text-purple-500 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
//                             {t.TagEvent?.tag_event_name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-8 py-5 text-center">
//                   <div className="flex justify-center gap-1 mb-1">
//                     {product.productColors?.map((c: any, i: number) => (
//                       <div key={i} className="w-3 h-3 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: c.Color?.color_code }} />
//                     ))}
//                   </div>
//                   <p className="text-[10px] font-black text-gray-400">QTY: {product.productStocks?.[0]?.stock_qty ?? 0}</p>
//                 </td>
//                 <td className="px-8 py-5 font-black text-gray-800">฿{Number(product.product_price).toLocaleString()}</td>
//                 <td className="px-8 py-5 text-right">
//                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                     <button onClick={() => { setSelectedProduct(product); setIsProductModalOpen(true); }} className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-500 transition-all hover:bg-white hover:shadow-md"><Edit2 className="w-4 h-4" /></button>
//                     <button onClick={() => handleDelete(product.product_id)} className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition-all hover:bg-white hover:shadow-md"><Trash2 className="w-4 h-4" /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isProductModalOpen && !isColorsLoading && !isCategoriesLoading && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => { setIsProductModalOpen(false); setSelectedProduct(undefined); }}
//           categories={categories || []}
//           colors={colors || []}
//           tagEvents={tagEvents || []}
//           onSaveSuccess={() => { refetch(); setIsProductModalOpen(false); }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductsPage;



import { useState } from 'react'
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ProductModal from '../../components/ProductModal';
import { useCategories } from '../../queries/category/category.query';
import { useColors } from '../../queries/color/color.query';
import { useTagEvents } from '../../queries/tag-event/tag-event.query';
import { useProducts } from '../../queries/product/product.query';
import { productService } from '../../services/product-service/product';
import type { ProductSchema2 } from '../../types/product';

const ProductsPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  
  // API Queries
  const { data: products, isLoading: isProductsLoading, refetch } = useProducts(shopId);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: colors, isLoading: isColorsLoading } = useColors();
  const { data: tagEvents, isLoading: isTagEventsLoading } = useTagEvents();
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSchema2 | undefined>();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(id);
        refetch();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // Loading State
  if (isProductsLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="font-black text-rose-500 animate-pulse tracking-widest uppercase">Loading Inventory...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section - Original Style */}
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

      {/* Products Table - Original Design */}
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
              {products?.map((product: any) => (
                <tr key={product.product_id} className="hover:bg-rose-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={product.productImage?.[0]?.image_url || 'https://via.placeholder.com/150'} 
                          alt={product.product_name} 
                          className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition duration-200" 
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate group-hover:text-rose-500 transition-colors">
                          {product.product_name}
                        </p>
                        {/* Tags Logic - ดึงจากตัวสินค้าจริง */}
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {product.productTagEvent?.map((t: any, i: number) => (
                            <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-purple-50 text-purple-500 px-2 py-0.5 rounded-lg border border-purple-100">
                              {t.TagEvent?.tag_event_name || t.tag_name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-500">
                      {product.category?.category_name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-gray-800 tracking-tight">
                      ฿{Number(product.product_price).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-black px-3 py-1 rounded-xl ${
                      (product.productStocks?.[0]?.stock_qty || 0) < 10 
                        ? 'bg-red-50 text-red-500 border border-red-100' 
                        : 'text-gray-600'
                    }`}>
                      {product.productStocks?.[0]?.stock_qty || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-gray-400 italic">
                      {product.sold || 0} <span className="text-[10px] uppercase font-black not-italic ml-0.5">sold</span>
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
                        onClick={() => handleDelete(product.product_id)}
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
        {products?.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No products listed</p>
          </div>
        )}
      </div>

      {/* Modal Section */}
      {isProductModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsProductModalOpen(false)}
          categories={categories || []}
          colors={colors || []}
          tagEvents={tagEvents || []}
          onSaveSuccess={() => {
            refetch();
            setIsProductModalOpen(false);
          }}
        />
      )}
    </div>
  )
};

export default ProductsPage;