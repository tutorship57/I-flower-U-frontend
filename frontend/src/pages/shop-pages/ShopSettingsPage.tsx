import {useState} from 'react'
import { Store } from 'lucide-react';
import { generateMockData } from '../../mock/shop-mock';
const ShopSettingsPage = () => {
    const [data,] = useState(()=>generateMockData());
    const [shopData, setShopData] = useState(data.shop);
    const minutesToTime = (minutes:any) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shop Settings</h1>
          <p className="text-gray-600 mt-1">Manage your shop information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Shop Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                  <input
                    type="text"
                    value={shopData.shop_name}
                    onChange={(e) => setShopData({ ...shopData, shop_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={shopData.shop_address}
                    onChange={(e) => setShopData({ ...shopData, shop_address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={shopData.shop_phone}
                    onChange={(e) => setShopData({ ...shopData, shop_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                    <input
                      type="time"
                      value={minutesToTime(shopData.shop_open)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={shopData.user.user_name}
                    onChange={(e) => setShopData({ 
                      ...shopData, 
                      user: { ...shopData.user, user_name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={shopData.user.user_email}
                    onChange={(e) => setShopData({ 
                      ...shopData, 
                      user: { ...shopData.user, user_email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Save Changes
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Shop Logo</h2>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Store className="w-12 h-12 text-pink-600" />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  Upload Logo
                </button>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 2MB</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-semibold">{data.products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Orders</span>
                  <span className="font-semibold">{data.orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default ShopSettingsPage
