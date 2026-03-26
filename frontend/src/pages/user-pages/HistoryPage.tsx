import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Search, ChevronRight, RefreshCw, Package } from "lucide-react";
import { userOrders} from "../../mock/user-order-mock";
import { type UserOrder, type OrderStatus } from "../../types/user-order";

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string; dot: string }> = {
  PAID:            { label: "Paid",             bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400" },
  SHIPPED:         { label: "Shipped",          bg: "bg-blue-50",    text: "text-blue-600",    dot: "bg-blue-400"    },
  WAITING_PAYMENT: { label: "Awaiting Payment", bg: "bg-amber-50",   text: "text-amber-600",   dot: "bg-amber-400"   },
  CANCEL:          { label: "Cancelled",        bg: "bg-red-50",     text: "text-red-500",     dot: "bg-red-400"     },
};

const FILTER_OPTIONS: { label: string; value: "ALL" | OrderStatus }[] = [
  { label: "All Orders", value: "ALL"             },
  { label: "Paid",       value: "PAID"            },
  { label: "Shipped",    value: "SHIPPED"         },
  { label: "Awaiting",   value: "WAITING_PAYMENT" },
  { label: "Cancelled",  value: "CANCEL"          },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const s = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  );
};

// ─── Order Card ───────────────────────────────────────────────────────────────

const OrderCard = ({ order, onViewDetails, onReorder }: {
  order: UserOrder;
  onViewDetails: () => void;
  onReorder: () => void;
}) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
          {order.order_id}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(order.created_at)}
        </p>
      </div>
      <StatusBadge status={order.order_status} />
    </div>

    {/* Items */}
    <div className="px-6 py-4 flex flex-col gap-3">
      {order.items.slice(0, 2).map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">🌸</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {item.product_name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Qty: {item.quantity} · ฿{item.unit_price.toLocaleString()} each
            </p>
          </div>
        </div>
      ))}
      {order.items.length > 2 && (
        <p className="text-xs text-gray-400">
          +{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}
        </p>
      )}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
      <div>
        <p className="text-xs text-gray-400">Total</p>
        <p className="text-xl font-bold text-rose-500">
          ฿{order.total_amount.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {order.order_status !== "CANCEL" && (
          <button
            onClick={onReorder}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 hover:border-rose-200 hover:text-rose-500 transition"
          >
            <RefreshCw className="w-3 h-3" />
            Reorder
          </button>
        )}
        <button
          onClick={onViewDetails}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition"
        >
          View Details
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ onBrowse }: { onBrowse: () => void }) => (
  <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center">
      <Package className="w-10 h-10 text-rose-200" />
    </div>
    <h3 className="text-xl font-bold text-gray-700">No orders yet</h3>
    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
      Start shopping to see your orders here.
    </p>
    <button
      onClick={onBrowse}
      className="mt-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-full transition"
    >
      Browse Products
    </button>
  </div>
);

// ─── History Page ─────────────────────────────────────────────────────────────

const HistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | OrderStatus>("ALL");

  // ปลี่ยนเป็น const { data: orders = [] } = useOrders(); เมื่อมี API 
  const orders = userOrders;

  const filtered = orders.filter((order) => {
    const matchFilter = activeFilter === "ALL" || order.order_status === activeFilter;
    const matchSearch = search.trim() === "" ||
      order.order_id.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((i) => i.product_name.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          {/* <ShoppingBag className="w-7 h-7 text-rose-400" /> */}
          <h1 className="text-4xl font-bold">Order History</h1>
        </div>
        <p className="text-gray-400 text-sm mb-8 ml-10">
          Track your past orders and purchases
        </p>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-5">
          <Search className="w-4 h-4 text-gray-300 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or product name..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-gray-400 hover:text-rose-500 font-medium transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
                activeFilter === f.value
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-500"
              }`}
            >
              {f.label}
              {f.value !== "ALL" && (
                <span className={`ml-1.5 text-xs ${activeFilter === f.value ? "opacity-70" : "text-gray-400"}`}>
                  ({orders.filter((o) => o.order_status === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Result count */}
        {filtered.length > 0 && (
          <p className="text-sm text-gray-400 mb-5">
            {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Orders / Empty */}
        {filtered.length === 0 ? (
          <EmptyState onBrowse={() => navigate("/products")} />
        ) : (
          <div className="grid gap-6">
            {filtered.map((order) => (
              <OrderCard
                key={order.order_id}
                order={order}
                onViewDetails={() => navigate(`/orders/${order.order_id}`)}
                onReorder={() => navigate("/products")}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HistoryPage;