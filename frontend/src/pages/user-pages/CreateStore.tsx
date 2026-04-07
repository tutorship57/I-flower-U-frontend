// import { useState, useRef, ChangeEvent } from "react";
// import { useNavigate } from "react-router";
// import { useAuthStore } from "../../stores/auth-store";
// import { Plus,Clock, MapPin, Phone, Store} from 'lucide-react';

// const CreateStore: React.FC = () => {
//   const navigate = useNavigate();
//   const { fetchCurrentUser, setShop } = useAuthStore();
  
//   const [storeName, setStoreName] = useState<string>("");
//   const [storeAddress, setStoreAddress] = useState<string>("");
//   const [storePhone, setStorePhone] = useState<string>("");
//   const [storeOpen, setStoreOpen] = useState<string>("09:00");
//   const [storeClose, setStoreClose] = useState<string>("20:00");
  
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string>("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };

//   // const handleSubmit = async () => {
//   //   if (!storeName.trim() || !storePhone.trim() || !storeAddress.trim()) {
//   //     setError("Please fill in all required fields (*)");
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const res = await fetch("http://localhost:3000/api/shop", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({
//   //         shop_name: storeName,
//   //         shop_address: storeAddress,
//   //         shop_phone: storePhone,
//   //         shop_open: storeOpen,
//   //         shop_close: storeClose,
//   //       }),
//   //     });

//   //     if (!res.ok) {
//   //       const errorData = await res.json();
//   //       throw new Error(errorData.message || "Failed to create shop");
//   //     }

//   //     const result = await res.json();
//   //     const newShopId = result.data?.shop_id || result.data?.id;

//   //     if (newShopId) {
//   //       setShop(newShopId, storeName); 
//   //       await fetchCurrentUser(); 
//   //       navigate(`/shop/${newShopId}/dashboard`, { replace: true });
//   //     }
//   //   } catch (err: any) {
//   //     setError(err.message || "Something went wrong.");
//   //   }
//   // };

//     const handleSubmit = async () => {
//     if (!storeName.trim() || !storePhone.trim() || !storeAddress.trim()) {
//       setError("Please fill in all required fields (*)");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:3000/api/shop", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           shop_name: storeName,
//           shop_address: storeAddress,
//           shop_phone: storePhone,
//           shop_open: storeOpen,
//           shop_close: storeClose,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to create shop");
//       }

//       const result = await res.json();
//       const newShopId = result.data?.shop_id || result.data?.id;

//       if (newShopId) {
//         // 1. อัปเดตข้อมูลเบื้องต้นลง Store
//         setShop(newShopId, storeName); 
        
//         // 2. ดึง Profile ล่าสุดเพื่อเปลี่ยน Role เป็น SELLER
//         await fetchCurrentUser(); 

//         // 3. บังคับโหลดหน้าใหม่ไปยัง Dashboard เพื่อล้าง State เก่าที่ค้างอยู่
//         // วิธีนี้จะช่วยแก้ปัญหา "เด้งไปหน้า Login" ได้ชัวร์กว่า navigate
//         window.location.href = `/shop/${newShopId}/dashboard`;
        
//       } else {
//         setError("Shop created but ID not found.");
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-rose-50 overflow-x-hidden">
//       <div className="flex-1 flex items-start justify-center px-4 py-12 pb-20">
//         <div className="w-full max-w-lg">
          
//           <div className="mb-6 px-1">
//             <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Create Your Store</h1>
//             <p className="text-rose-400 text-sm font-medium mt-1">Let's get your store started.</p>
//           </div>

//           <div className="bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-xl shadow-rose-200/40">
//             <div className="px-8 py-8 flex flex-col gap-6">
              
//               {/* IMG Upload */}
//               <div className="flex flex-col items-center gap-3">
//                 <div 
//                   onClick={() => fileInputRef.current?.click()} 
//                   className="relative w-24 h-24 rounded-full bg-white border-2 border-dashed border-rose-200 flex items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all group"
//                 >
//                    {previewUrl ? (
//                      <img src={previewUrl} className="w-full h-full object-cover rounded-full" alt="Preview" />
//                    ) : (
//                      <Store className="w-8 h-8 text-rose-200 group-hover:text-rose-400" />
//                    )}
//                    <div className="absolute bottom-0 right-0 bg-rose-500 p-1.5 rounded-full border-2 border-white shadow-sm">
//                       <Plus className="w-3 h-3 text-white rotate-[-90deg]" />
//                    </div>
//                 </div>
//                 <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
//                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Store Profile Image</p>
//               </div>

//               <div className="border-t border-gray-50" />

//               {/* Store Name */}
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
//                   <Store className="w-3.5 h-3.5 text-rose-400" /> Store Name <span className="text-rose-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={storeName}
//                   onChange={(e) => setStoreName(e.target.value)}
//                   placeholder="Enter your shop name"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-rose-100 focus:border-rose-300 outline-none transition-all"
//                 />
//               </div>

//               {/* Phone Number */}
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
//                   <Phone className="w-3.5 h-3.5 text-rose-400" /> Contact Number <span className="text-rose-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   value={storePhone}
//                   onChange={(e) => setStorePhone(e.target.value)}
//                   placeholder="08X-XXX-XXXX"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:border-rose-300 outline-none transition-all"
//                 />
//               </div>

//               {/* Business Hours */}
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
//                   <Clock className="w-3.5 h-3.5 text-rose-400" /> Operating Hours
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-300 uppercase">Open</span>
//                     <input 
//                       type="time" 
//                       value={storeOpen} 
//                       onChange={(e) => setStoreOpen(e.target.value)} 
//                       className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:border-rose-300 outline-none" 
//                     />
//                   </div>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-300 uppercase">Close</span>
//                     <input 
//                       type="time" 
//                       value={storeClose} 
//                       onChange={(e) => setStoreClose(e.target.value)} 
//                       className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:border-rose-300 outline-none" 
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
//                   <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location <span className="text-rose-500">*</span>
//                 </label>
//                 <textarea
//                   value={storeAddress}
//                   onChange={(e) => setStoreAddress(e.target.value)}
//                   placeholder="Street name, District, Province..."
//                   rows={3}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:border-rose-300 outline-none resize-none transition-all"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold flex items-center gap-2">
//                    <div className="w-1 h-1 rounded-full bg-rose-500" /> {error}
//                 </div>
//               )}

//               <button
//                 onClick={handleSubmit}
//                 className="w-full py-4 px-6 text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-0.5 active:translate-y-0 mt-2"
//                 style={{ background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" }}
//               >
//                 Create Store
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateStore;


import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth-store";
import { Plus, Clock, MapPin, Phone, Store } from 'lucide-react';

const CreateStore: React.FC = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser, setShop } = useAuthStore();
  
  const [storeName, setStoreName] = useState<string>("");
  const [storeAddress, setStoreAddress] = useState<string>("");
  const [storePhone, setStorePhone] = useState<string>("");
  const [storeOpen, setStoreOpen] = useState<string>("09:00");
  const [storeClose, setStoreClose] = useState<string>("20:00");
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (!storeName.trim() || !storePhone.trim() || !storeAddress.trim()) {
      setError("Please fill in all required fields (*)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shop_name: storeName,
          shop_address: storeAddress,
          shop_phone: storePhone,
          shop_open: storeOpen,
          shop_close: storeClose,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create shop");
      }

      const result = await res.json();
      
      const newShopId = result.data?.shop_id || result.data?.id || result.shop_id || result.id;

      if (newShopId) {
 
        setShop(newShopId, storeName); 

        await fetchCurrentUser(); 

        window.location.href = `/shop/${newShopId}/dashboard`;
        
      } else {
        setError("Shop created but ID not found in response. Please try refreshing.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-rose-50 overflow-x-hidden">
      <div className="flex-1 flex items-start justify-center px-4 py-12 pb-20">
        <div className="w-full max-w-lg">
          
          <div className="mb-6 px-1">
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Create Your Store</h1>
            <p className="text-rose-400 text-sm font-medium mt-1">Let's get your store started.</p>
          </div>

          <div className="bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-xl shadow-rose-200/40">
            <div className="px-8 py-8 flex flex-col gap-6">
              
              {/* Image Upload */}
              <div className="flex flex-col items-center gap-3">
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="relative w-24 h-24 rounded-full bg-white border-2 border-dashed border-rose-200 flex items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all group"
                >
                   {previewUrl ? (
                     <img src={previewUrl} className="w-full h-full object-cover rounded-full" alt="Preview" />
                   ) : (
                     <Store className="w-8 h-8 text-rose-200 group-hover:text-rose-400" />
                   )}
                   <div className="absolute bottom-0 right-0 bg-rose-500 p-1.5 rounded-full border-2 border-white shadow-sm">
                      <Plus className="w-3 h-3 text-white" />
                   </div>
                </div>
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Store Profile Image</p>
              </div>

              <div className="border-t border-gray-50" />

              {/* Store Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-rose-400" /> Store Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Enter your shop name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-rose-100 focus:border-rose-300 outline-none transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-rose-400" /> Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:border-rose-300 outline-none transition-all"
                />
              </div>

              {/* Business Hours */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-rose-400" /> Operating Hours
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-300 uppercase">Open</span>
                    <input 
                      type="time" 
                      value={storeOpen} 
                      onChange={(e) => setStoreOpen(e.target.value)} 
                      className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:border-rose-300 outline-none" 
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-300 uppercase">Close</span>
                    <input 
                      type="time" 
                      value={storeClose} 
                      onChange={(e) => setStoreClose(e.target.value)} 
                      className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:border-rose-300 outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  placeholder="Street name, District, Province..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:bg-white focus:border-rose-300 outline-none resize-none transition-all"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-rose-500" /> {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 px-6 text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:shadow-lg mt-2 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-rose-200 hover:-translate-y-0.5'}`}
                style={{ background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" }}
              >
                {isLoading ? "Creating Store..." : "Create Store"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;