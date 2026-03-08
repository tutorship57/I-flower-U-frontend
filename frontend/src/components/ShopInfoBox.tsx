import React from "react";
import type { ShopInfo } from "../types/shop";
import { minutesToTime } from "../utils/calculateTime.util";
import { useState } from "react";
type ShopInfoBoxProps = {
  shopInfo: ShopInfo;
  handleOnSave: () => void;
};

const ShopInfoBox = ({ shopInfo, handleOnSave }: ShopInfoBoxProps) => {
  const [shopData, setShopData] = useState(shopInfo);

  const handleCancel = ()=>{
    setShopData(shopInfo)
  }
  console.log("this is", shopData);
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Shop Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              value={shopData.shop_name}
              onChange={(e) =>
                setShopData({ ...shopData, shop_name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={shopData.shop_address}
              onChange={(e) =>
                setShopData({ ...shopData, shop_address: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={shopData.shop_phone}
              onChange={(e) =>
                setShopData({ ...shopData, shop_phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Time
              </label>
              <input
                type="time"
                value={minutesToTime(shopData.shop_open)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Time
              </label>
              <input
                type="time"
                value={minutesToTime(shopData.shop_close)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Owner Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={shopData.user.user_name}
              onChange={(e) =>
                setShopData({
                  ...shopData,
                  user: { ...shopData.user, user_name: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={shopData.user.user_email}
              onChange={(e) =>
                setShopData({
                  ...shopData,
                  user: { ...shopData.user, user_email: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={handleCancel} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button
          onClick={handleOnSave}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ShopInfoBox;
