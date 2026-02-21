import { Plus, DollarSign, ShoppingCart, Package, Users, AlertCircle} from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useState } from 'react';
import { generateMockData } from '../../mock/shop-mock';
 const DashboardPage = () => {
    const [data, ] = useState(()=>generateMockData());
  
    const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);
    const totalOrders = data.orders.length;
    const totalProducts = data.products.length;
    const newCustomers = 342;
    const lowStockProducts = data.products.filter(p => p.product_stock < 10);
    
    return(
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your shop today.</p>
        </div>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+12.5%"
          color="bg-pink-600"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={totalOrders.toLocaleString()}
          change="+8.2%"
          color="bg-purple-600"
        />
        <StatCard
          icon={Package}
          label="Products Listed"
          value={totalProducts}
          change="-2.4%"
          color="bg-orange-600"
        />
        <StatCard
          icon={Users}
          label="New Customers"
          value={newCustomers}
          change="+15.3%"
          color="bg-green-600"
        />
      </div>

      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Low Stock Alert</h3>
              <p className="text-sm text-yellow-800 mt-1">
                {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} running low on stock:
                {' '}{lowStockProducts.map(p => p.product_name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Revenue Trends</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded">Daily</button>
              <button className="px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-100">Weekly</button>
              <button className="px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-100">Monthly</button>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2">
            {[3000, 3500, 2800, 4200, 4500, 5000, 4800].map((val, idx) => (
              <div key={idx} className="flex-1 bg-pink-200 rounded-t" style={{ height: `${(val / 5000) * 100}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Shipped</span>
              <span className="text-sm font-semibold">22.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '22.5%' }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Processing</span>
              <span className="text-sm font-semibold">39.1%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '39.1%' }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-sm font-semibold">16.1%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '16.1%' }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivered</span>
              <span className="text-sm font-semibold">22.3%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '22.3%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Selling Products</h2>
            <button className="text-pink-600 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {data.products.slice(0, 4).map(product => (
              <div key={product.product_id} className="flex items-center gap-4">
                <img src={product.images[0]} alt={product.product_name} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.product_name}</p>
                  <p className="text-xs text-gray-600">Category: {data.categories.find(c => c.category_id === product.category_id)?.category_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${product.product_price}</p>
                  <p className="text-xs text-gray-600">{product.sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Category Performance</h2>
          <div className="space-y-3">
            {data.categories.map((category, idx) => {
              const values = [8000, 6000, 4500, 3200, 2000];
              return (
                <div key={category.category_id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{category.category_name}</span>
                    <span className="text-sm font-semibold">${values[idx]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${(values[idx] / 8000) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )};


export default DashboardPage
