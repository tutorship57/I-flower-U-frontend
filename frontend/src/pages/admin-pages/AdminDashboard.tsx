import { useNavigate } from "react-router-dom";
import { Users, Store, ShoppingBag, TrendingUp } from "lucide-react";
import { MOCK_ORDERS, MOCK_SHOPS } from "../../mock/admin-mock";
import { ORDER_STATUS_STYLE } from "../../types/admin";


const StatCard = ({ icon: Icon, label, value, sub, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md">
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4 shadow-sm text-white`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
    <p className="text-[10px] text-gray-400 mt-1 font-medium">{sub}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Platform overview — IflowerU</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={TrendingUp}  label="Revenue"      value="฿48,290" sub="This month"          color="bg-rose-500"    />
        <StatCard icon={ShoppingBag} label="Orders"       value="1,284"   sub="+8% from last month" color="bg-blue-500"    />
        <StatCard icon={Store}       label="Active Shops" value="38"      sub="3 pending approval"  color="bg-emerald-500" />
        <StatCard icon={Users}       label="Users"        value="5,821"   sub="+210 this month"     color="bg-purple-500"  />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">Recent Orders</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_ORDERS.slice(0, 5).map((o) => {
                const s = ORDER_STATUS_STYLE[o.status] || ORDER_STATUS_STYLE.CREATE;
                return (
                  <tr key={o.order_id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3">
                      <p className="text-sm font-semibold text-gray-700">{o.customer}</p>
                      <p className="text-xs text-gray-400 font-medium">{o.order_id}</p>
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-700">
                      ฿{o.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pending Approvals List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">Pending Shops</h2>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-500 px-2.5 py-1 rounded-full">
              {MOCK_SHOPS.filter(s => s.status === 'PENDING').length} new
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_SHOPS.filter(s => s.status === 'PENDING').map((shop) => (
              <div key={shop.shop_id} className="px-6 py-4 hover:bg-gray-50 transition">
                <p className="text-sm font-bold text-gray-700 truncate">{shop.shop_name}</p>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">{shop.owner}</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-1.5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition">Approve</button>
                  <button className="flex-1 py-1.5 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;