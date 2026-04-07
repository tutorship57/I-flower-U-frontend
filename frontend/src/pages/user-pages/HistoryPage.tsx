// 

import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, RefreshCw, Package, CheckCircle2 } from "lucide-react";
import { type UserOrder } from "../../types/user-order";
import { useOrders } from "../../queries/order/order.query";

// ─── การตั้งค่าสถานะ (เหลือแค่ Paid เป็นหลัก) ──────────────────────────────────
const STATUS_CONFIG = {
  label: "Paid",
  bg: "bg-emerald-50",
  text: "text-emerald-600",
  dot: "bg-emerald-400"
};

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

// ─── Status Badge (ปรับให้เป็น Paid เสมอ) ──────────────────────────────────────
const StatusBadge = () => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_CONFIG.bg} ${STATUS_CONFIG.text}`}>
    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_CONFIG.dot}`} />
    {STATUS_CONFIG.label}
  </span>
);

// ─── Order Card ───────────────────────────────────────────────────────────────
const OrderCard = ({ order }: { order: UserOrder }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">#{order.order_id}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.created_at)}</p>
      </div>
      <StatusBadge />
    </div>

    <div className="px-6 py-4 flex flex-col gap-3">
      {(order.items ?? []).map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
            {item.image_url ? (
              <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl bg-rose-50">🌸</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{item.product_name}</p>
            <p className="text-xs text-gray-400">Qty: {item.quantity} · ${item.unit_price.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t border-gray-100">
      <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Total Paid</p>
        <p className="text-lg font-bold text-emerald-600">${order.total_amount.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-1 text-emerald-600">
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-xs font-bold">Success</span>
      </div>
    </div>
  </div>
);

// ─── History Page ─────────────────────────────────────────────────────────────
const HistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: orders = [], isLoading } = useOrders();

  // กรองเฉพาะการค้นหาชื่อสินค้า และเรียงลำดับใหม่ล่าสุด
  const filtered = [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .filter((order) => 
      search.trim() === "" || 
      order.order_id.toLowerCase().includes(search.toLowerCase()) ||
      (order.items ?? []).some(i => i.product_name.toLowerCase().includes(search.toLowerCase()))
    );

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-500 text-sm mb-8">View your successful purchases</p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your orders..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No successful orders found</p>
            <button onClick={() => navigate("/products")} className="mt-4 text-rose-500 text-sm font-bold">Start Shopping</button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((order) => (
              <OrderCard key={order.order_id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;