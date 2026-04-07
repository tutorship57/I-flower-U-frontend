import React, { useState, useEffect } from "react";
import type { ShopInfo } from "../types/shop";
import { minutesToTime } from "../utils/calculateTime.util";
import { User, Store, Mail, Phone, MapPin, Clock } from "lucide-react";

type ShopInfoBoxProps = {
  shopInfo: ShopInfo;
  handleOnSave: (data: ShopInfo) => void; // รับ data 
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const ShopInfoBox = ({ shopInfo, handleOnSave }: ShopInfoBoxProps) => {
  const [shopData, setShopData] = useState(shopInfo);

  useEffect(() => {
    setShopData(shopInfo);
  }, [shopInfo]);

  const handleCancel = () => {
    setShopData(shopInfo);
  };

  // ถ้าไม่มีข้อมูลจะแสดง Loading
  if (!shopData) return <div className="p-10 text-center text-gray-400">Loading shop data...</div>;

  return (
    <div className="space-y-8">
      {/* ข้อมูลร้านค้า */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                <Store className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Shop Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              Shop Name
            </label>
            <input
              type="text"
              value={shopData.shop_name || ""}
              onChange={(e) => setShopData({ ...shopData, shop_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" /> Address
            </label>
            <textarea
              value={shopData.shop_address || ""}
              onChange={(e) => setShopData({ ...shopData, shop_address: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm min-h-[100px]"
              rows={3}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-gray-400" /> Phone Number
            </label>
            <input
              type="tel"
              value={shopData.shop_phone || ""}
              onChange={(e) => setShopData({ ...shopData, shop_phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Opening</label>
                <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="time"
                      value={minutesToTime(shopData.shop_open) || "08:00"}
                      //เปลี่ยนเวลา
                      onChange={(e) => setShopData({ ...shopData, shop_open: timeToMinutes(e.target.value) })}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-rose-100 outline-none cursor-pointer"
                    />
                </div>
             </div>
             <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Closing</label>
                <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="time"
                      value={minutesToTime(shopData.shop_close) || "20:00"}
                      // เปลี่ยนเวลา
                      onChange={(e) => setShopData({ ...shopData, shop_close: timeToMinutes(e.target.value) })}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-rose-100 outline-none cursor-pointer"
                    />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ข้อมูลเจ้าของ */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Owner Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              Owner Name
            </label>
            <input
              type="text"
              value={shopData.user?.user_name || ""}
              onChange={(e) =>
                setShopData({
                  ...shopData,
                  user: { ...shopData.user, user_name: e.target.value } as any,
                })
              }
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-gray-400" /> Email Address
            </label>
            <input
              type="email"
              value={shopData.user?.user_email || ""}
              onChange={(e) =>
                setShopData({
                  ...shopData,
                  user: { ...shopData.user, user_email: e.target.value } as any,
                })
              }
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* ปุ่มกดด้านล่าง */}
      <div className="flex justify-end gap-3 pt-4">
        <button 
          type="button"
          onClick={handleCancel} 
          className="px-8 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 text-sm"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleOnSave(shopData)}
          className="px-8 py-3 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-95 text-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ShopInfoBox;