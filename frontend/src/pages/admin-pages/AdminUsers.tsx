import { useState } from "react";
import { Search, UserCheck, UserX, ChevronDown } from "lucide-react";
import { MOCK_USERS } from "../../mock/admin-mock";
import { USER_ROLE_STYLE, USER_STATUS_STYLE } from "../../types/admin";
import type { UserRole } from "../../types/admin";

const AdminManageUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [users, setUsers] = useState(MOCK_USERS);

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
    if (u.role === "ADMIN") return false;
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchSearch = u.user_name.toLowerCase().includes(search.toLowerCase()) || 
                       u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Manage Users</h1>
        <p className="text-gray-400 text-sm mt-1">Platform user control panel</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2.5 flex-1 shadow-sm">
          <Search className="w-4 h-4 text-gray-300" />
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by name or email..." 
            className="flex-1 text-sm outline-none bg-transparent" 
          />
        </div>
        <div className="relative min-w-[140px]">
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value as any)} 
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 appearance-none text-sm font-bold text-gray-600 outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">User</option>
            <option value="SELLER">Seller</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              <th className="text-left px-6 py-4">User</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((u) => (
              <tr key={u.user_id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-black">
                      {u.user_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{u.user_name}</p>
                      <p className="text-xs text-gray-400 font-medium">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${USER_ROLE_STYLE[u.role].bg} ${USER_ROLE_STYLE[u.role].text}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${USER_STATUS_STYLE[u.status].bg} ${USER_STATUS_STYLE[u.status].text}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(u.user_id)}
                    className={`p-2 rounded-lg transition ${u.status === 'ACTIVE' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                  >
                    {u.status === 'ACTIVE' ? <UserX size={16} /> : <UserCheck size={16} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;