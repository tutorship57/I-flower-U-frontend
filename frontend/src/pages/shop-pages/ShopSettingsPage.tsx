// import { useState} from 'react'
// import { Store } from 'lucide-react';
// import { generateMockData } from '../../mock/shop-mock';
// import { useOutletContext , useParams} from 'react-router';
// import { useShopInfo } from '../../queries/shop/shop-info.query';
// import ShopInfoBox from '../../components/ShopInfoBox';

// const ShopSettingsPage = () => {
//     const [data,] = useState(()=>generateMockData());
//     const shopId = useOutletContext<string>();

//     const {data:shopInfo,isLoading,error} = useShopInfo(shopId);

//     if (isLoading) return <div>กำลังโหลดข้อมูลร้านค้า...</div>;

//     if (error) return <div>Something went wrong with the shop setting</div>

//     const handleOnSave = async()=>{

//     }

//     const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Shop Settings</h1>
//           <p className="text-gray-600 mt-1">Manage your shop information and preferences</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <ShopInfoBox shopInfo={shopInfo}  handleOnSave={handleOnSave}/>

//           <div className="space-y-6">
//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <h2 className="text-lg font-semibold mb-4">Shop Logo</h2>
//               <div className="flex flex-col items-center">
//                 <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center mb-4">
//                   <Store className="w-12 h-12 text-rose-600" />
//                 </div>
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
//                   Upload Logo
//                 </button>
//                 <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 2MB</p>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-6 shadow-sm">
//               <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Products</span>
//                   <span className="font-semibold">{data.products.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Active Orders</span>
//                   <span className="font-semibold">{data.orders.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Revenue</span>
//                   <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };



// export default ShopSettingsPage

import { useState } from 'react';
import { Store, Package, ShoppingCart, DollarSign, Upload } from 'lucide-react';
import { useParams, useOutletContext } from 'react-router-dom';
import { generateMockData } from '../../mock/shop-mock';
import { useShopInfo } from '../../queries/shop/shop-info.query';
import ShopInfoBox from '../../components/ShopInfoBox';

const ShopSettingsPage = () => {
    // 1. ดึงข้อมูล Mock และ ID จาก Context/Params (กันเหนียว)
    const [data] = useState(() => generateMockData());
    const contextShopId = useOutletContext<string>();
    const { shopId: paramsShopId } = useParams();
    
    // กำหนดค่า shopId โดยลองดึงจากทั้ง 2 แหล่ง
    const shopId = contextShopId || paramsShopId || "";

    // 2. ดึงข้อมูล Shop Info จาก API โดยใช้ shopId ที่ได้มา
    const { data: shopInfo, isLoading, error } = useShopInfo(shopId);

    const handleOnSave = async () => {
        console.log("Saving shop settings for ID:", shopId);
        // Logic สำหรับการบันทึกข้อมูลจะอยู่ตรงนี้
    };

    // 3. ป้องกันหน้าขาวด้วย Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500"></div>
                <p className="text-gray-500 font-medium">Loading settings...</p>
            </div>
        );
    }

    // 4. ป้องกันหน้าขาวด้วย Error State (ถ้าหา shopId ไม่เจอ หรือ API พัง)
    if (error || !shopId) {
        return (
            <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
                <h2 className="text-red-600 font-bold text-lg">Unable to load settings</h2>
                <p className="text-red-400 text-sm mt-1">Please check your URL or Shop ID.</p>
            </div>
        );
    }

    // คำนวณรายได้รวมแบบหลอกๆ จาก Mock Data
    const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 p-1">
            {/* Header Section */}
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
                
                {/* คอลัมน์ซ้าย: ฟอร์มแก้ไขข้อมูลร้านค้า */}
                <div className="lg:col-span-2">
                    <ShopInfoBox shopInfo={shopInfo} handleOnSave={handleOnSave} />
                </div>

                {/* คอลัมน์ขวา: โลโก้ และ สถิติแบบเร็วๆ */}
                <div className="space-y-8">
                    
                    {/* ส่วนจัดการโลโก้ */}
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

                    {/* ส่วนสถิติย่อ */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-6">Quick Stats</h2>
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <Package className="w-4 h-4 opacity-40" /> Products
                                </span>
                                <span className="font-bold text-gray-900">{data.products.length}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4 opacity-40" /> Orders
                                </span>
                                <span className="font-bold text-gray-900">{data.orders.length}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 opacity-40" /> Revenue
                                </span>
                                <span className="text-lg font-bold text-emerald-600">
                                    ${totalRevenue.toLocaleString()}
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
