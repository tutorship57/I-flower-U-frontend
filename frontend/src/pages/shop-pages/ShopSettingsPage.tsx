import { useState} from 'react'
import { Store } from 'lucide-react';
import { generateMockData } from '../../mock/shop-mock';
import { useOutletContext } from 'react-router';
import { useShopInfo } from '../../queries/shop/shop-info.query';
import ShopInfoBox from '../../components/ShopInfoBox';

const ShopSettingsPage = () => {
    const [data,] = useState(()=>generateMockData());
    const shopId = useOutletContext<string>();

    const {data:shopInfo,isLoading,error} = useShopInfo(shopId);

   

    if (isLoading) return <div>กำลังโหลดข้อมูลร้านค้า...</div>;

    if (error) return <div>Something went wrong with the shop setting</div>

    const handleOnSave = async()=>{

    }

   

    const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shop Settings</h1>
          <p className="text-gray-600 mt-1">Manage your shop information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ShopInfoBox shopInfo={shopInfo}  handleOnSave={handleOnSave}/>

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
