import { useState } from "react";
import { Search, UserCheck, UserX, ChevronDown } from "lucide-react";

// ─── Types & Mock ─────────────────────────────────────────────────────────────

type UserRole   = "USER" | "SELLER" | "ADMIN";
type UserStatus = "ACTIVE" | "SUSPENDED";

type AppUser = {
  user_id: string;
  user_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  orders: number;
};

const MOCK_USERS: AppUser[] = [
  { user_id: "U001", user_name: "Sarah Johnson", email: "sarah@email.com",  role: "USER",   status: "ACTIVE",    created_at: "2025-01-10", orders: 12 },
  { user_id: "U002", user_name: "Mike Chen",     email: "mike@email.com",   role: "SELLER", status: "ACTIVE",    created_at: "2025-01-15", orders: 3  },
  { user_id: "U003", user_name: "Emily Davis",   email: "emily@email.com",  role: "USER",   status: "ACTIVE",    created_at: "2025-02-01", orders: 7  },
  { user_id: "U004", user_name: "Anna Kim",      email: "anna@email.com",   role: "USER",   status: "SUSPENDED", created_at: "2025-02-14", orders: 1  },
  { user_id: "U005", user_name: "James Lee",     email: "james@email.com",  role: "SELLER", status: "ACTIVE",    created_at: "2025-02-20", orders: 0  },
  { user_id: "U006", user_name: "Yuki Tanaka",   email: "yuki@email.com",   role: "USER",   status: "ACTIVE",    created_at: "2025-03-01", orders: 4  },
  { user_id: "U007", user_name: "Chris Park",    email: "chris@email.com",  role: "USER",   status: "ACTIVE",    created_at: "2025-03-05", orders: 2  },
];

// ─── Badge configs ────────────────────────────────────────────────────────────

const ROLE_STYLE: Record<UserRole, { bg: string; text: string }> = {
  USER:   { bg: "bg-rose-50",   text: "text-rose-500"   },
  SELLER: { bg: "bg-pink-50",   text: "text-pink-500"   },
  ADMIN:  { bg: "bg-purple-50", text: "text-purple-500" },
};

const STATUS_STYLE: Record<UserStatus, { bg: string; text: string }> = {
  ACTIVE:    { bg: "bg-emerald-50", text: "text-emerald-600" },
  SUSPENDED: { bg: "bg-red-50",     text: "text-red-500"     },
};

// ─── Component ────────────────────────────────────────────────────────────────

const AdminManageUsers = () => {
  const [search,     setSearch]     = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [users,      setUsers]      = useState(MOCK_USERS);

  const toggleStatus = (user_id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === user_id
          ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" }
          : u
      )
    );
  };

  const filtered = users.filter((u) => {
    const matchRole   = roleFilter === "ALL" || u.role === roleFilter;
    const matchSearch = search.trim() === "" ||
      u.user_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Manage Users</h1>
        <p className="text-gray-400 text-sm mt-1">
          {users.length} total users · {users.filter((u) => u.status === "ACTIVE").length} active
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2.5 flex-1 shadow-sm">
          <Search className="w-4 h-4 text-gray-300 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
          />
        </div>

        {/* Role filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as "ALL" | UserRole)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-gray-600 outline-none shadow-sm cursor-pointer hover:border-rose-300 transition"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">User</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">User</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Role</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Orders</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Joined</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => {
                const role   = ROLE_STYLE[u.role];
                const status = STATUS_STYLE[u.status];
                return (
                  <tr key={u.user_id} className="hover:bg-gray-50 transition">
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
                        >
                          {u.user_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{u.user_name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${role.bg} ${role.text}`}>
                        {u.role}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                        {u.status}
                      </span>
                    </td>
                    {/* Orders */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium">{u.orders}</span>
                    </td>
                    {/* Joined */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">{u.created_at}</span>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(u.user_id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          u.status === "ACTIVE"
                            ? "bg-red-50 text-red-500 hover:bg-red-100"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }`}
                      >
                        {u.status === "ACTIVE"
                          ? <><UserX className="w-3.5 h-3.5" /> Suspend</>
                          : <><UserCheck className="w-3.5 h-3.5" /> Restore</>
                        }
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            No users found for this search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageUsers;