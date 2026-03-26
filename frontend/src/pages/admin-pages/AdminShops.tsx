import { useState } from "react";
import { Search, CheckCircle, XCircle, PauseCircle, ChevronDown } from "lucide-react";

// ─── Types & Mock ─────────────────────────────────────────────────────────────

type ShopStatus = "ACTIVE" | "PENDING" | "SUSPENDED";

type Shop = {
  shop_id: string;
  shop_name: string;
  owner: string;
  products: number;
  revenue: number;
  rating: number;
  status: ShopStatus;
  created_at: string;
};

const MOCK_SHOPS: Shop[] = [
  { shop_id: "S001", shop_name: "Rose Garden",      owner: "Emma W.",  products: 48, revenue: 12400, rating: 4.8, status: "ACTIVE",    created_at: "2025-01-05" },
  { shop_id: "S002", shop_name: "Bloom House",      owner: "Chris L.", products: 32, revenue: 9800,  rating: 4.6, status: "ACTIVE",    created_at: "2025-01-12" },
  { shop_id: "S003", shop_name: "Petals & Co",      owner: "Nana T.",  products: 28, revenue: 7200,  rating: 4.7, status: "ACTIVE",    created_at: "2025-01-20" },
  { shop_id: "S004", shop_name: "Bloom & Wild Co.", owner: "Sarah K.", products: 0,  revenue: 0,     rating: 0,   status: "PENDING",   created_at: "2025-03-20" },
  { shop_id: "S005", shop_name: "Sakura Florist",   owner: "Yuki T.",  products: 0,  revenue: 0,     rating: 0,   status: "PENDING",   created_at: "2025-03-19" },
  { shop_id: "S006", shop_name: "Old Blooms",       owner: "Bob M.",   products: 5,  revenue: 200,   rating: 2.1, status: "SUSPENDED", created_at: "2024-12-01" },
];

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<ShopStatus, { bg: string; text: string; dot: string }> = {
  ACTIVE:    { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400" },
  PENDING:   { bg: "bg-amber-50",   text: "text-amber-600",   dot: "bg-amber-400"   },
  SUSPENDED: { bg: "bg-red-50",     text: "text-red-500",     dot: "bg-red-400"     },
};

// ─── Component ────────────────────────────────────────────────────────────────

const AdminManageShops = () => {
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ShopStatus>("ALL");
  const [shops,        setShops]        = useState(MOCK_SHOPS);

  const updateStatus = (shop_id: string, newStatus: ShopStatus) => {
    setShops((prev) =>
      prev.map((s) => s.shop_id === shop_id ? { ...s, status: newStatus } : s)
    );
  };

  const filtered = shops.filter((s) => {
    const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
    const matchSearch = search.trim() === "" ||
      s.shop_name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    ACTIVE:    shops.filter((s) => s.status === "ACTIVE").length,
    PENDING:   shops.filter((s) => s.status === "PENDING").length,
    SUSPENDED: shops.filter((s) => s.status === "SUSPENDED").length,
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Manage Shops</h1>
        <p className="text-gray-400 text-sm mt-1">
          {shops.length} shops · {counts.ACTIVE} active · {counts.PENDING} pending · {counts.SUSPENDED} suspended
        </p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {(["ALL", "ACTIVE", "PENDING", "SUSPENDED"] as const).map((s) => {
          const count = s === "ALL" ? shops.length : counts[s];
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
                active
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-500"
              }`}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
              <span className={`ml-1.5 text-xs ${active ? "opacity-70" : "text-gray-400"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2.5 mb-6 shadow-sm">
        <Search className="w-4 h-4 text-gray-300 flex-shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by shop name or owner..."
          className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
        />
      </div>

      {/* Shop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((shop) => {
          const s = STATUS_STYLE[shop.status];
          return (
            <div key={shop.shop_id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">

              {/* Card Header */}
              <div className="px-5 py-4 border-b border-gray-50 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-800 truncate">{shop.shop_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{shop.owner} · {shop.created_at}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${s.bg} ${s.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {shop.status}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 text-center py-3">
                <div>
                  <p className="text-sm font-black text-gray-800">{shop.products}</p>
                  <p className="text-xs text-gray-400">Products</p>
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800">
                    {shop.revenue > 0 ? `฿${shop.revenue.toLocaleString()}` : "—"}
                  </p>
                  <p className="text-xs text-gray-400">Revenue</p>
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800">
                    {shop.rating > 0 ? `⭐ ${shop.rating}` : "—"}
                  </p>
                  <p className="text-xs text-gray-400">Rating</p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-3 border-t border-gray-50 flex gap-2">
                {shop.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateStatus(shop.shop_id, "ACTIVE")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(shop.shop_id, "SUSPENDED")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                )}
                {shop.status === "ACTIVE" && (
                  <button
                    onClick={() => updateStatus(shop.shop_id, "SUSPENDED")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition"
                  >
                    <PauseCircle className="w-3.5 h-3.5" /> Suspend
                  </button>
                )}
                {shop.status === "SUSPENDED" && (
                  <button
                    onClick={() => updateStatus(shop.shop_id, "ACTIVE")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Restore
                  </button>
                )}
              </div>

            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400 text-sm">
            No shops found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageShops;