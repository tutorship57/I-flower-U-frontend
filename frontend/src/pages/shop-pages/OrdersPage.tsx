import { X, Search, Filter, ArrowUpRight, FileText, Calendar, User, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { generateMockData } from '../../mock/shop-mock';

// ─── Status Config  ───────────────────

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  CREATE:          { bg: "bg-slate-100",   text: "text-slate-600",   label: "Created" },
  RESERVE:         { bg: "bg-blue-50",     text: "text-blue-600",    label: "Reserved" },
  WAITING_PAYMENT: { bg: "bg-amber-50",    text: "text-amber-600",   label: "Pending" },
  PAID:            { bg: "bg-emerald-50",  text: "text-emerald-600",  label: "Paid" },
  EXPIRED:         { bg: "bg-gray-100",    text: "text-gray-400",    label: "Expired" },
  CANCEL:          { bg: "bg-red-50",      text: "text-red-500",     label: "Cancelled" },
  REFUND:          { bg: "bg-purple-50",   text: "text-purple-600",  label: "Refunded" },
};

const OrdersPage = () => { 
  const [data] = useState(() => generateMockData());
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      
      {/* Header  */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Orders</h1>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> 
            Manage and track all transactions
          </p>
        </div>
        
        {/* <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-300 shadow-sm w-full sm:w-64 transition"
            />
          </div>
        </div> */}
      </div>

      {/* Table Container  */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.orders.map((order: any) => {
                const status = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.CREATE;
                return (
                  <tr key={order.order_id} className="hover:bg-rose-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-gray-700">#{order.order_id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-[10px] font-black text-white">
                          {order.user_name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-gray-600">{order.user_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-gray-800">${order.total_amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-white hover:shadow-md rounded-xl text-rose-500 transition-all active:scale-90"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Modal  */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-200">
            
            <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-800">Order Details</h2>
                <p className="text-xs font-bold text-rose-500 mt-1 uppercase tracking-widest">ID: #{selectedOrder.order_id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-10 overflow-y-auto">
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-300" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Customer</p>
                      <p className="text-sm font-bold text-gray-700">{selectedOrder.user_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-300" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Order Date</p>
                      <p className="text-sm font-bold text-gray-700">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase ${STATUS_CONFIG[selectedOrder.order_status]?.bg} ${STATUS_CONFIG[selectedOrder.order_status]?.text}`}>
                      {selectedOrder.order_status}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Grand Total</p>
                    <p className="text-2xl font-black text-gray-800">${selectedOrder.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-[2rem] p-8">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Items List
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center group">
                      <div>
                        <p className="text-sm font-bold text-gray-700">{item.product_name}</p>
                        <p className="text-xs font-bold text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-black text-gray-800">${(item.unit_price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-gray-100 flex gap-4">
              <button className="flex-[2] bg-rose-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition shadow-lg shadow-rose-200 active:scale-95">
                Update Status
              </button>
              <button onClick={() => setSelectedOrder(null)} className="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition active:scale-95">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;