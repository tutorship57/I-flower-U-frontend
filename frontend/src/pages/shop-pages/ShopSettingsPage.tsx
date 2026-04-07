// import { useState } from 'react';
// import { Store, Package, ShoppingCart, DollarSign, Upload } from 'lucide-react';
// import { useParams, useOutletContext } from 'react-router-dom';
// import { generateMockData } from '../../mock/shop-mock';
// import { useShopInfo } from '../../queries/shop/shop-info.query';
// import ShopInfoBox from '../../components/ShopInfoBox';
// import { shopService } from '../../services/shop.service'; 

// const ShopSettingsPage = () => {
//     const [data] = useState(() => generateMockData());
//     const contextShopId = useOutletContext<string>();
//     const { shopId: paramsShopId } = useParams();
    
//     const shopId = contextShopId || paramsShopId || "";

//     const { data: shopInfo, isLoading, error } = useShopInfo(shopId);

//     const [showToast, setShowToast] = useState(false);

//     // const handleOnSave = async () => {
//     //     console.log("Saving shop settings for ID:", shopId);
//     //     // Logic สำหรับการบันทึกข้อมูลจะอยู่ตรงนี้
//     // };
//     // const handleOnSave = async (updatedData: any) => {
//     //   try {
//     //     await shopService.updateShop(shopId, {
//     //       shop_name: shopInfo.shop_name,
//     //       shop_address: shopInfo.shop_address,
//     //       shop_phone: shopInfo.shop_phone,
//     //       shop_open: shopInfo.shop_open,
//     //       shop_close: shopInfo.shop_close,
//     //     });
//     //     alert("Saved successfully!");
//     //   } catch (err) {
//     //     console.error(err);
//     //     alert("Failed to save.");
//     //   }
//     // };

//     //ยังใช้
//     // const handleOnSave = async (updatedData: any) => {
//     //   try {
//     //     await shopService.updateShop(shopId, {
//     //       shop_name:    updatedData.shop_name,
//     //       shop_address: updatedData.shop_address,
//     //       shop_phone:   updatedData.shop_phone,
//     //       shop_open:    updatedData.shop_open,   
//     //       shop_close:   updatedData.shop_close,  
//     //     });
//     //     alert("Saved successfully!");
//     //   } catch (err) {
//     //     console.error(err);
//     //     alert("Failed to save.");
//     //   }
//     //   console.log(updatedData)
//     // };

//     const handleOnSave = async (updatedData: any) => {
//       try {
//         await shopService.updateShop(shopId, {
//           shop_name:    updatedData.shop_name,
//           shop_address: updatedData.shop_address,
//           shop_phone:   updatedData.shop_phone,
//           shop_open:    updatedData.shop_open,   
//           shop_close:   updatedData.shop_close,  
//         });
        
//         // แสดงเตือน
//         setShowToast(true);
        
//         // หายไปเองใน 3 วินาที
//         setTimeout(() => setShowToast(false), 3000);
        
//       } catch (err) {
//         alert("Failed to save.");
//       }
//     };
    
//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500"></div>
//                 <p className="text-gray-500 font-medium">Loading settings...</p>
//             </div>
//         );
//     }

//     if (error || !shopId) {
//         return (
//             <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
//                 <h2 className="text-red-600 font-bold text-lg">Unable to load settings</h2>
//                 <p className="text-red-400 text-sm mt-1">Please check your URL or Shop ID.</p>
//             </div>
//         );
//     }

//     // คำนวณรายได้รวมแบบหลอกๆ จาก Mock Data
//     const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);

//     return (
//         <div className="space-y-8 animate-in fade-in duration-500 p-1">
//            {showToast && (
//             <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-300">
//               <div className="bg-white border border-rose-100 text-rose-400 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
//                 <span className="font-bold text-sm">Saved successfully!</span>
//               </div>
//             </div>
//           )}
//             {/* Header Section */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Shop Settings</h1>
//                     <p className="text-gray-500 mt-1">Manage your shop profile and view performance.</p>
//                 </div>
//                 <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-400 rounded-lg">
//                     ID: {shopId}
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
//                 {/* คอลัมน์ซ้าย: ฟอร์มแก้ไขข้อมูลร้านค้า */}
//                 <div className="lg:col-span-2">
//                     <ShopInfoBox shopInfo={shopInfo} handleOnSave={handleOnSave} />
//                 </div>

//                 {/* คอลัมน์ขวา: โลโก้ และ สถิติแบบเร็วๆ */}
//                 <div className="space-y-8">
                    
//                     {/* ส่วนจัดการโลโก้ */}
//                     <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
//                         <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
//                             <Store className="w-4 h-4 text-rose-500" /> Shop Logo
//                         </h2>
//                         <div className="flex flex-col items-center text-center">
//                             <div className="relative group mb-6">
//                                 <div className="w-32 h-32 bg-rose-50 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
//                                     <Store className="w-12 h-12 text-rose-300" />
//                                 </div>
//                                 <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-100 cursor-pointer hover:text-rose-500 transition-colors">
//                                     <Upload className="w-4 h-4" />
//                                     <input type="file" className="hidden" />
//                                 </label>
//                             </div>
//                             <p className="text-[10px] text-gray-400 font-medium">JPG, PNG up to 2MB</p>
//                         </div>
//                     </div>

//                     {/* ส่วนสถิติย่อ */}
//                     <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
//                         <h2 className="text-sm font-bold text-gray-800 mb-6">Quick Stats</h2>
//                         <div className="space-y-5">
//                             <div className="flex justify-between items-center">
//                                 <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
//                                     <Package className="w-4 h-4 opacity-40" /> Products
//                                 </span>
//                                 <span className="font-bold text-gray-900">{data.products.length}</span>
//                             </div>
                            
//                             <div className="flex justify-between items-center">
//                                 <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
//                                     <ShoppingCart className="w-4 h-4 opacity-40" /> Orders
//                                 </span>
//                                 <span className="font-bold text-gray-900">{data.orders.length}</span>
//                             </div>

//                             <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
//                                 <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
//                                     <DollarSign className="w-4 h-4 opacity-40" /> Revenue
//                                 </span>
//                                 <span className="text-lg font-bold text-emerald-600">
//                                     ${totalRevenue.toLocaleString()}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShopSettingsPage;

import { useState, useMemo } from 'react';
import { Store, Package, ShoppingCart, DollarSign, Upload } from 'lucide-react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useShopInfo } from '../../queries/shop/shop-info.query';
import { useProducts } from '../../queries/product/product.query'; // ดึงมานับจำนวนจริง
import ShopInfoBox from '../../components/ShopInfoBox';
import { shopService } from '../../services/shop.service'; 

const ShopSettingsPage = () => {
    const contextShopId = useOutletContext<string>();
    const { shopId: paramsShopId } = useParams();
    const shopId = contextShopId || paramsShopId || "";

    // 1. ดึงข้อมูลร้านค้า (API จริง)
    const { data: shopInfo, isLoading: isShopLoading, error, refetch } = useShopInfo(shopId);
    
    // 2. ดึงข้อมูลสินค้า (เพื่อเอาไว้นับจำนวนที่แท้จริงให้ตรงกับ Dashboard)
    const { data: products, isLoading: isProdLoading } = useProducts(shopId);

    const [showToast, setShowToast] = useState(false);

    // ─── การคำนวณ Data จาก API จริง (Memoized) ────────────────────────────────
    // นับจำนวนสินค้าจริงจาก products length
    const realProductCount = useMemo(() => products?.length || 0, [products]);

    // คำนวณรายได้จริงจาก products sold * price
    const realRevenue = useMemo(() => {
        return products?.reduce((sum: number, p: any) => sum + (Number(p.product_price) * (p.sold || 0)), 0) || 0;
    }, [products]);

    const handleOnSave = async (updatedData: any) => {
      try {
        await shopService.updateShop(shopId, {
          shop_name:    updatedData.shop_name,
          shop_address: updatedData.shop_address,
          shop_phone:   updatedData.shop_phone,
          shop_open:    updatedData.shop_open,   
          shop_close:   updatedData.shop_close,  
        });
        
        // สั่งดึงข้อมูลใหม่เพื่อให้ Sidebar และ Stats อัปเดต
        refetch();

        // แสดงเตือนสีชมพูเรียบๆ
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
      } catch (err) {
        console.error(err);
        alert("Failed to save.");
      }
    };
    
    // รอโหลดทั้งคู่
    if (isShopLoading || isProdLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500"></div>
                <p className="text-gray-500 font-medium">Loading settings...</p>
            </div>
        );
    }

    if (error || !shopId) {
        return (
            <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
                <h2 className="text-red-600 font-bold text-lg">Unable to load settings</h2>
                <p className="text-red-400 text-sm mt-1">Please check your URL or Shop ID.</p>
            </div>
        );
    }

    // 🎨 UI Section (Back to Original UI Style)
    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-1 relative">
            
            {/* Toast Notification (Original) */}
            {showToast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-300">
                    <div className="bg-white border border-rose-100 text-rose-500 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
                        <div className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-bold text-sm">Saved successfully!</span>
                    </div>
                </div>
            )}

            {/* Header Section (Original) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Shop Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your shop profile and view performance.</p>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-400 rounded-lg">
                    ID: {shopId}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Right Column: Form (Original) */}
                <div className="lg:col-span-2">
                    <ShopInfoBox shopInfo={shopInfo} handleOnSave={handleOnSave} />
                </div>

                {/* Left Column: Logo & Stats (Original) */}
                <div className="space-y-8">
                    
                    {/* Logo Box (Original) */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Store className="w-4 h-4 text-rose-500" /> Shop Logo
                        </h2>
                        <div className="flex flex-col items-center text-center">
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 bg-rose-50 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
                                    <Store className="w-12 h-12 text-rose-300" />
                                </div>
                                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-100 cursor-pointer hover:text-rose-500 transition-colors">
                                    <Upload className="w-4 h-4" />
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">JPG, PNG up to 2MB</p>
                        </div>
                    </div>

                    {/* Quick Stats (Original UI but using real Product Count) */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-6">Quick Stats</h2>
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <Package className="w-4 h-4 opacity-40" /> Products
                                </span>
                                {/* ✅ แก้จุดนี้: ใช้ realProductCount แทน shopInfo */}
                                <span className="font-bold text-gray-900">{realProductCount}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4 opacity-40" /> Orders
                                </span>
                                <span className="font-bold text-gray-900">{shopInfo?.order_count ?? 0}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 opacity-40" /> Revenue
                                </span>
                                <span className="text-lg font-bold text-emerald-600">
                                    ฿{realRevenue.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShopSettingsPage;