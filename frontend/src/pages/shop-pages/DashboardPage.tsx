// import { Plus, DollarSign, ShoppingCart, Package, Users, AlertCircle, ArrowUpRight } from 'lucide-react';
// import { useState } from 'react';
// import { generateMockData } from '../../mock/shop-mock';
// import StatCard from '../../components/StatCard';


// // ─── Main Component ───────────────────────────────────────────────────────────

// const DashboardPage = () => {
//   const [data] = useState(() => generateMockData());

//   const totalRevenue = data.products.reduce((sum, p) => sum + (p.product_price * p.sold), 0);
//   const totalOrders = data.orders.length;
//   const totalProducts = data.products.length;
//   const newCustomers = 342;
//   const lowStockProducts = data.products.filter(p => p.productStocks[0].stock_qty < 10);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-black text-gray-800">Shop Overview</h1>
//           <p className="text-gray-400 text-sm mt-1">Welcome back! Monitoring your store performance.</p>
//         </div>
//         {/* <button className="bg-rose-500 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-rose-600 transition-all active:scale-95">
//           <Plus className="w-5 h-5" />
//           Add Product
//         </button> */}
//       </div>

//       {/* Stat Cards Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           icon={DollarSign}
//           label="Total Revenue"
//           value={`$${totalRevenue.toLocaleString()}`}
//           sub="Monthly earnings"
//           color="bg-rose-500"
//         />
//         <StatCard
//           icon={ShoppingCart}
//           label="Total Orders"
//           value={totalOrders.toLocaleString()}
//           sub="+8.2% from last week"
//           color="bg-blue-500"
//         />
//         <StatCard
//           icon={Package}
//           label="Products"
//           value={totalProducts}
//           sub="Items in inventory"
//           color="bg-emerald-500"
//         />
//         <StatCard
//           icon={Users}
//           label="New Customers"
//           value={newCustomers}
//           sub="Total reached"
//           color="bg-purple-500"
//         />
//       </div>

//       {/* Low Stock Alert */}
//       {lowStockProducts.length > 0 && (
//         <div className="mb-8 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
//           <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
//           <div className="min-w-0">
//             <h3 className="font-bold text-amber-800">Low Stock Alert</h3>
//             <p className="text-sm text-amber-700 mt-0.5 truncate">
//               {lowStockProducts.length} items need attention: 
//               <span className="font-semibold ml-1">
//                 {lowStockProducts.slice(0, 2).map(p => p.product_name).join(', ')}
//                 {lowStockProducts.length > 2 ? '...' : ''}
//               </span>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Charts & Status Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* Revenue Trends Chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-base font-bold text-gray-800">Revenue Trends</h2>
//             <div className="flex bg-gray-100 p-1 rounded-xl">
//               <button className="px-3 py-1 text-xs font-bold bg-white text-rose-500 rounded-lg shadow-sm">Daily</button>
//               <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-600 transition px-3">Weekly</button>
//             </div>
//           </div>
//           <div className="h-64 flex items-end gap-3 px-2">
//             {[3000, 3500, 2800, 4200, 4500, 5000, 4800].map((val, idx) => (
//               <div 
//                 key={idx} 
//                 className="flex-1 bg-rose-100 hover:bg-rose-500 transition-all duration-300 rounded-t-lg relative group" 
//                 style={{ height: `${(val / 5000) * 100}%` }}
//               >
//                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-xl z-10 font-bold">
//                   ${val.toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
//             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
//           </div>
//         </div>

//         {/* Order Status Progress */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//           <h2 className="text-base font-bold text-gray-800 mb-6">Order Status</h2>
//           <div className="space-y-6">
//             {[
//               { label: 'Shipped', color: 'bg-emerald-500', val: '22.5%' },
//               { label: 'Processing', color: 'bg-blue-500', val: '39.1%' },
//               { label: 'Pending', color: 'bg-amber-500', val: '16.1%' },
//               { label: 'Delivered', color: 'bg-rose-500', val: '22.3%' },
//             ].map((item) => (
//               <div key={item.label}>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-semibold text-gray-500">{item.label}</span>
//                   <span className="text-sm font-black text-gray-800">{item.val}</span>
//                 </div>
//                 <div className="w-full bg-gray-100 rounded-full h-2">
//                   <div className={`${item.color} h-2 rounded-full shadow-sm`} style={{ width: item.val }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Lists Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Selling Products */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-base font-bold text-gray-800">Top Selling Products</h2>
//             <button className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:underline">
//               View All <ArrowUpRight className="w-3 h-3" />
//             </button>
//           </div>
//           <div className="space-y-5">
//             {data.products.slice(0, 4).map(product => (
//               <div key={product.product_id} className="flex items-center gap-4 group cursor-pointer">
//                 <img 
//                   src={product.productImage[0].image_url} 
//                   alt={product.product_name} 
//                   className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:ring-2 group-ring-rose-100 transition-all" 
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="font-bold text-sm text-gray-800 truncate group-hover:text-rose-500 transition-colors">{product.product_name}</p>
//                   <p className="text-xs text-gray-400">Sold {product.sold} units</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-black text-sm text-gray-800">${product.product_price.toLocaleString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Category Performance */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//           <h2 className="text-base font-bold text-gray-800 mb-6">Category Performance</h2>
//           <div className="space-y-5">
//             {data.categories.slice(0, 5).map((category, idx) => {
//               const values = [8000, 6000, 4500, 3200, 2000];
//               const percent = (values[idx] / 8000) * 100;
//               return (
//                 <div key={category.category_id}>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-semibold text-gray-500">{category.category_name}</span>
//                     <span className="text-sm font-black text-gray-800">${values[idx].toLocaleString()}</span>
//                   </div>
//                   <div className="w-full bg-gray-100 rounded-full h-2">
//                     <div className="bg-rose-400 h-2 rounded-full" style={{ width: `${percent}%` }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { Plus, DollarSign, ShoppingCart, Package, Users, AlertCircle, ArrowUpRight, BarChart3 } from 'lucide-react';
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import { useProducts } from '../../queries/product/product.query';
import { useCategories } from '../../queries/category/category.query';

const DashboardPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  
  const { data: products, isLoading: isProdLoading } = useProducts(shopId);
  const { data: categories, isLoading: isCatLoading } = useCategories();

  const stats = useMemo(() => {
    if (!products) return { totalRevenue: 0, totalSold: 0, totalProducts: 0, lowStock: [], topProducts: [] };

    const totalRevenue = products.reduce((sum: number, p: any) => sum + (Number(p.product_price) * (p.sold || 0)), 0);
    const totalSold = products.reduce((sum: number, p: any) => sum + (Number(p.sold) || 0), 0);
    const lowStock = products.filter((p: any) => (Number(p.productStocks?.[0]?.stock_qty) || 0) < 10);
    
    const topProducts = [...products]
      .sort((a, b) => (Number(b.sold) || 0) - (Number(a.sold) || 0))
      .slice(0, 4);

    return { totalRevenue, totalSold, totalProducts: products.length, lowStock, topProducts };
  }, [products]);

  if (isProdLoading || isCatLoading) return <div className="p-8 text-rose-500 font-bold uppercase text-xs tracking-widest animate-pulse">Loading Dashboard...</div>;

  const hasSalesData = products && products.some((p: any) => (Number(p.sold) || 0) > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Shop Overview</h1>
        <p className="text-gray-500 text-sm mt-1 font-semibold">Welcome back! Monitoring your live store performance.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={DollarSign} label="Total Revenue" value={`฿${stats.totalRevenue.toLocaleString()}`} color="bg-rose-500" />
        <StatCard icon={ShoppingCart} label="Total Sold" value={stats.totalSold.toLocaleString()} color="bg-blue-500" />
        <StatCard icon={Package} label="Products" value={stats.totalProducts} color="bg-emerald-500" />
        <StatCard icon={AlertCircle} label="Low Stock" value={stats.lowStock.length} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col relative">
          <h2 className="text-base font-bold text-gray-800 mb-6">Revenue Trends (Top Products)</h2>
          
          <div className="h-64 flex-1 flex items-end gap-3 px-2 relative">
            {!hasSalesData ? (
              // ✅ ปรับสี Empty Graph ให้เข้มขึ้น (Gray-400/500)
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <BarChart3 className="w-14 h-14 mb-3 text-gray-400 opacity-60" />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">No Sales Data Yet</p>
                <p className="text-xs text-gray-400 mt-1">Start selling to track performance</p>
              </div>
            ) : (
              products?.slice(0, 7).map((p: any, idx: number) => {
                const val = Number(p.product_price) * (Number(p.sold) || 0);
                const maxVal = Math.max(...products.map((p: any) => Number(p.product_price) * (Number(p.sold) || 0)));
                return (
                  <div key={idx} className="flex-1 bg-rose-100 hover:bg-rose-500 transition-all duration-300 rounded-t-lg relative group" style={{ height: `${(val / (maxVal || 1)) * 100}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 font-bold z-10 whitespace-nowrap">฿{val.toLocaleString()}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-6">Order Status</h2>
          <div className="space-y-6">
            {[
              { label: 'Shipped', color: 'bg-emerald-500', val: '22%' },
              { label: 'Processing', color: 'bg-blue-500', val: '39%' },
              { label: 'Pending', color: 'bg-amber-500', val: '16%' },
              { label: 'Delivered', color: 'bg-rose-500', val: '23%' },
            ].map((item) => (
              <div key={item.label} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">{item.label}</span>
                  <span className="text-xs font-bold text-gray-800">{item.val}</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000 group-hover:brightness-90`} style={{ width: item.val }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-6">Best Selling Items</h2>
          <div className="space-y-5">
            {stats.topProducts.length > 0 ? stats.topProducts.map((product: any) => (
              <div key={product.product_id} className="flex items-center gap-4 hover:bg-gray-50 p-1 rounded-xl transition-colors">
                <img src={product.productImage?.[0]?.image_url || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{product.product_name}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Sold {product.sold || 0} Units</p>
                </div>
                <p className="font-black text-sm text-gray-800">฿{Number(product.product_price).toLocaleString()}</p>
              </div>
            )) : <div className="text-center py-10 font-bold text-gray-300">NO RECENT SALES</div>}
          </div>
        </div>

        {/* ✅ Mockup Category Performance: Set 1, Single 4 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-6">Category Distribution</h2>
          <div className="space-y-6">
            {[
              { name: 'Set Items', count: 1, percent: '20%' },
              { name: 'Single Items', count: 4, percent: '80%' },
            ].map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{cat.name}</span>
                  <span className="text-xs font-bold text-gray-800">{cat.count} Items</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden border border-gray-100">
                  <div className="bg-rose-400 h-full rounded-full transition-all duration-700" style={{ width: cat.percent }} />
                </div>
              </div>
            ))}
            {/* ข้อความบอกใบ้ว่าใช้ Mockup */}
            <p className="text-[9px] text-gray-300 font-bold mt-4 uppercase text-center italic tracking-widest">
              Previewing Mockup Data for Categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;