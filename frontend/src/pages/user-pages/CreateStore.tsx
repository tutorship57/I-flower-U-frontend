import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth-store";

const CreateStore: React.FC = () => {
  const navigate = useNavigate();
  // const { fetchCurrentUser } = useAuthStore();
  const { fetchCurrentUser, setShop } = useAuthStore();
  const [storeName, setStoreName] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

//   const handleSubmit = async () => {
//   if (!storeName.trim()) {
//     setError("Store name is required.");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:3000/api/shop", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         shop_name: storeName,
//         shop_description: storeDescription,
//       }),
//     });

//     const data = await res.json();
//     setShop(data.shop_id);//เพิ่ม
//     await fetchCurrentUser(); 

//    navigate(`/shop/${data.shop_id}/dashboard`); 
//   } catch (err) {
//     console.error(err);
//   }
// };

// const handleSubmit = async () => {
//   if (!storeName.trim()) {
//     setError("Store name is required.");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:3000/api/shop", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         shop_name: storeName,
//         shop_description: storeDescription,
//       }),
//     });

//     if (!res.ok) throw new Error("Failed to create shop");

//     const data = await res.json();

//     // 1. อัปเดตข้อมูลเบื้องต้นลง Store ทันที
//     setShop(data.shop_id, storeName); 

//     // 2. สำคัญมาก: ดึง Profile ใหม่จาก Server 
//     // เพื่อให้ Role เปลี่ยนจาก USER เป็น SELLER และได้ข้อมูลที่ถูกต้องจาก DB
//     await fetchCurrentUser(); 

//     // 3. ย้ายหน้า (ใช้ replace เพื่อไม่ให้กด Back กลับมาหน้าสร้างร้านได้)
//     navigate(`/shop/${data.shop_id}/dashboard`, { replace: true });

//   } catch (err) {
//     console.error("Create Store Error:", err);
//     setError("Something went wrong. Please try again.");
//   }
// };

const handleSubmit = async () => {
  // 1. Validate ข้อมูลเบื้องต้น
  if (!storeName.trim()) {
    setError("Store name is required.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    
    // 2. ส่งข้อมูลไป Backend
    const res = await fetch("http://localhost:3000/api/shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shop_name: storeName,
        shop_description: storeDescription,
      }),
    });

    // 3. เช็คว่า Response OK ไหม
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create shop");
    }

    // 4. แกะ JSON (ตามโครงสร้าง Backend: { data: { shop_id: ... } })
    const result = await res.json();
    console.log("Backend Raw Response:", result); // ดูโครงสร้างจริงใน Console

    // ดึง ID ออกมา (เผื่อไว้ทั้ง shop_id หรือ id)
    const newShopId = result.data?.shop_id || result.data?.id;

    if (newShopId) {
      console.log("Successfully found Shop ID:", newShopId);

      // 5. อัปเดตข้อมูลลง Store ทันที (Client-side sync)
      setShop(newShopId, storeName); 

      // 6. ดึง Profile ล่าสุดเพื่อให้ Role เปลี่ยนเป็น SELLER ในระบบ
      // ต้องรอ (await) ให้เสร็จก่อนเพื่อความชัวร์
      await fetchCurrentUser(); 

      // 7. เปลี่ยนหน้าไปยัง Dashboard ของร้านที่เพิ่งสร้าง
      // ใช้ replace: true เพื่อไม่ให้ผู้ใช้กด Back กลับมาหน้าสร้างร้านซ้ำ
      navigate(`/shop/${newShopId}/dashboard`, { replace: true });
      
    } else {
      // กรณี Backend ส่งสำเร็จแต่ไม่มี ID กลับมา (Error ที่ Logic หลังบ้าน)
      console.error("Shop ID is missing in result.data:", result);
      setError("Server returned success but no Shop ID found.");
    }

  } catch (err: any) {
    console.error("Create Store Error:", err);
    setError(err.message || "Something went wrong. Please try again.");
  }
};


  return (
    <div
      className="min-h-screen flex flex-col bg-rose-50 overflow-x-hidden"
    >
      <div className="flex-1 flex items-start justify-center px-4 py-12 pb-20">
        <div className="w-full max-w-lg">

          {/* Title above card */}
          <div className="mb-6 px-1">
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              Create Your Store
            </h1>
            {/* <p className="text-sm text-rose-400 mt-1 font-medium">
              Set up your flower shop and start selling today
            </p> */}
          </div>

          {/* Card — white with visible shadow against pink bg */}
          <div
            className="bg-white rounded-3xl border border-rose-100 overflow-hidden"
            style={{
              boxShadow:
                "0 8px 40px rgba(244, 63, 94, 0.15), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="px-8 py-8 flex flex-col gap-6">

              {/* Logo Upload */}
              <div className="flex flex-col items-center gap-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-full bg-white border-2 border-dashed border-rose-300 flex items-center justify-center cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all group overflow-hidden"
                  style={{ boxShadow: "0 2px 12px rgba(244,63,94,0.12)" }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Store logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-rose-300 group-hover:text-rose-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                      />
                    </svg>
                  )}
                  {previewUrl && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536M9 11l6.071-6.071a2.5 2.5 0 0 1 3.536 3.536L12 15H9v-3z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-gray-400 font-medium">
                  Click to upload store logo
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Store Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">
                  Store Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => {
                    setStoreName(e.target.value);
                    if (e.target.value.trim()) setError("");
                  }}
                  placeholder="e.g. Rose Garden Florist"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-700 placeholder-gray-300 outline-none transition-all bg-gray-50
                    focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100
                    ${
                      error
                        ? "border-rose-400 bg-rose-50 ring-2 ring-rose-100"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                />
                {error && (
                  <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              {/* Store Description */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">
                  Store Description
                </label>
                <textarea
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Tell customers about your shop, what you sell, and what makes you special..."
                  rows={4}
                  maxLength={300}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-300 bg-gray-50 outline-none resize-none transition-all
                    hover:border-rose-300
                    focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
                <p className="text-xs text-gray-400 text-right font-medium">
                  {storeDescription.length} / 300
                </p>
              </div>

              {/* Info Banner */}
              <div
                className="rounded-2xl px-4 py-3 flex items-start gap-3"
                style={{ backgroundColor: "#fff1f2", border: "1px solid #fecdd3" }}
              >
                <span className="text-lg mt-0.5">🌷</span>
                <p
                  className="text-xs font-semibold leading-relaxed"
                  style={{ color: "#f43f5e" }}
                >
                  Your store will be reviewed and activated within 24 hours. You
                  can add products right after creation.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3.5 px-6 text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
                  boxShadow: "0 4px 20px rgba(244, 63, 94, 0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 6px 28px rgba(244, 63, 94, 0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 20px rgba(244, 63, 94, 0.4)";
                }}
              >
                <span>Create Store</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <p className="text-center text-xs text-gray-400">
                By creating a store, you agree to our{" "}
                <span className="text-rose-500 hover:underline cursor-pointer font-semibold">
                  Seller Terms
                </span>{" "}
                and{" "}
                <span className="text-rose-500 hover:underline cursor-pointer font-semibold">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;