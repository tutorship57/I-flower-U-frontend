import { useNavigate } from "react-router-dom";
import { Users, Store, ShoppingBag, TrendingUp, ArrowUpRight, Clock } from "lucide-react";

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-2xl font-black text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  PAID:            { bg: "bg-emerald-50", text: "text-emerald-600" },
  SHIPPED:         { bg: "bg-blue-50",   text: "text-blue-600"    },
  WAITING_PAYMENT: { bg: "bg-amber-50",  text: "text-amber-600"   },
  CANCEL:          { bg: "bg-red-50",    text: "text-red-500"     },
};

const RECENT_ORDERS = [
  { order_id: "ORD-001", customer: "Sarah J.", shop: "Rose Garden",  amount: 890,  status: "PAID"            },
  { order_id: "ORD-002", customer: "Mike C.",  shop: "Bloom House",  amount: 499,  status: "SHIPPED"         },
  { order_id: "ORD-003", customer: "Emily D.", shop: "Petals & Co",  amount: 320,  status: "WAITING_PAYMENT" },
  { order_id: "ORD-004", customer: "Anna K.",  shop: "Rose Garden",  amount: 1250, status: "PAID"            },
  { order_id: "ORD-005", customer: "James L.", shop: "Flower Box",   amount: 599,  status: "CANCEL"          },
];

const PENDING_SHOPS = [
  { shop_name: "Bloom & Wild Co.",  owner: "Sarah K.", submitted: "2025-03-20" },
  { shop_name: "Sakura Florist",    owner: "Yuki T.",  submitted: "2025-03-19" },
  { shop_name: "Green Leaf Studio", owner: "Chris M.", submitted: "2025-03-18" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 ">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Platform overview — IflowerU</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={TrendingUp}  label="Revenue"      value="฿48,290" sub="This month"          color="bg-rose-500"    />
        <StatCard icon={ShoppingBag} label="Orders"       value="1,284"   sub="+8% from last month" color="bg-blue-500"   />
        <StatCard icon={Store}       label="Active Shops" value="38"      sub="3 pending approval"  color="bg-emerald-500"/>
        <StatCard icon={Users}       label="Users"        value="5,821"   sub="+210 this month"     color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">Recent Orders</h2>
            <button
              onClick={() => navigate("/admin/orders")}
              className="flex items-center gap-1 text-xs text-rose-500 font-semibold hover:underline"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_ORDERS.map((o) => {
              const s = STATUS_STYLE[o.status] ?? STATUS_STYLE.CANCEL;
              return (
                <div key={o.order_id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.order_id} · {o.shop}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                    <span className="text-sm font-bold text-gray-700">฿{o.amount.toLocaleString()}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                      {o.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Shop Approvals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">Pending Shops</h2>
            <span className="text-xs font-bold bg-amber-50 text-amber-500 px-2.5 py-1 rounded-full">
              {PENDING_SHOPS.length} new
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {PENDING_SHOPS.map((shop, i) => (
              <div key={i} className="px-6 py-4 hover:bg-gray-50 transition">
                <p className="text-sm font-semibold text-gray-700 truncate">{shop.shop_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{shop.owner}</p>
                <p className="text-xs text-gray-300 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {shop.submitted}
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-1.5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition">
                    Approve
                  </button>
                  <button className="flex-1 py-1.5 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4">
            <button
              onClick={() => navigate("/admin/shops")}
              className="w-full py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition"
            >
              View all shops →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;