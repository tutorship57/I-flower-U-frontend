import { useState } from "react";
import { Search, CheckCircle, XCircle, PauseCircle } from "lucide-react";
// --- Import Mock & Types ---
import { MOCK_SHOPS } from "../../mock/admin-mock";
import { SHOP_STATUS_STYLE } from "../../types/admin";
import type { ShopStatus, Shop } from "../../types/admin";

const AdminManageShops = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ShopStatus>("ALL");
  const [shops, setShops] = useState<Shop[]>(MOCK_SHOPS);

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

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800">Manage Shops</h1>
        <p className="text-gray-400 text-sm mt-1">{shops.length} shops total</p>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(["ALL", "ACTIVE", "PENDING", "SUSPENDED"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
                statusFilter === s
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-500"
              }`}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2.5 shadow-sm flex-1">
          <Search className="w-4 h-4 text-gray-300 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shop or owner..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Shop</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No shops found.
                </td>
              </tr>
            ) : filtered.map((shop) => {
              const s = SHOP_STATUS_STYLE[shop.status];
              return (
                <tr key={shop.shop_id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{shop.shop_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{shop.created_at}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{shop.owner}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {shop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {shop.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => updateStatus(shop.shop_id, "ACTIVE")}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => updateStatus(shop.shop_id, "SUSPENDED")}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      )}
                      {shop.status === "ACTIVE" && (
                        <button
                          onClick={() => updateStatus(shop.shop_id, "SUSPENDED")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition"
                        >
                          <PauseCircle className="w-3.5 h-3.5" /> Suspend
                        </button>
                      )}
                      {shop.status === "SUSPENDED" && (
                        <button
                          onClick={() => updateStatus(shop.shop_id, "ACTIVE")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminManageShops;