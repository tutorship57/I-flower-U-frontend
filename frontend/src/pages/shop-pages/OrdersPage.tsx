// import { X, Search, Filter, ArrowUpRight, FileText, Calendar, User, ShoppingBag, MoreHorizontal } from 'lucide-react';
// import { useState } from 'react';
// import { generateMockData } from '../../mock/shop-mock';

// // ─── Status Config  ───────────────────

// const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
//   CREATE:          { bg: "bg-slate-100",   text: "text-slate-600",   label: "Created" },
//   RESERVE:         { bg: "bg-blue-50",     text: "text-blue-600",    label: "Reserved" },
//   WAITING_PAYMENT: { bg: "bg-amber-50",    text: "text-amber-600",   label: "Pending" },
//   PAID:            { bg: "bg-emerald-50",  text: "text-emerald-600",  label: "Paid" },
//   EXPIRED:         { bg: "bg-gray-100",    text: "text-gray-400",    label: "Expired" },
//   CANCEL:          { bg: "bg-red-50",      text: "text-red-500",     label: "Cancelled" },
//   REFUND:          { bg: "bg-purple-50",   text: "text-purple-600",  label: "Refunded" },
// };

// const OrdersPage = () => { 
//   const [data] = useState(() => generateMockData());
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
      
//       {/* Header  */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-black text-gray-800">Orders</h1>
//           <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
//             <ShoppingBag className="w-4 h-4" /> 
//             Manage and track all transactions
//           </p>
//         </div>
        
//         {/* <div className="flex gap-3">
//           <div className="relative">
//             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input 
//               type="text"
//               placeholder="Search orders..."
//               className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-300 shadow-sm w-full sm:w-64 transition"
//             />
//           </div>
//         </div> */}
//       </div>

//       {/* Table Container  */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50/50 border-b border-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {data.orders.map((order: any) => {
//                 const status = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.CREATE;
//                 return (
//                   <tr key={order.order_id} className="hover:bg-rose-50/30 transition-colors group">
//                     <td className="px-6 py-4">
//                       <span className="text-sm font-black text-gray-700">#{order.order_id}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-[10px] font-black text-white">
//                           {order.user_name.charAt(0)}
//                         </div>
//                         <span className="text-sm font-bold text-gray-600">{order.user_name}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-400 font-medium">
//                       {new Date(order.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm font-black text-gray-800">${order.total_amount.toLocaleString()}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${status.bg} ${status.text}`}>
//                         {status.label}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button
//                         onClick={() => setSelectedOrder(order)}
//                         className="p-2 hover:bg-white hover:shadow-md rounded-xl text-rose-500 transition-all active:scale-90"
//                       >
//                         <MoreHorizontal className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modern Modal  */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-200">
            
//             <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-black text-gray-800">Order Details</h2>
//                 <p className="text-xs font-bold text-rose-500 mt-1 uppercase tracking-widest">ID: #{selectedOrder.order_id}</p>
//               </div>
//               <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="p-10 overflow-y-auto">
//               <div className="grid grid-cols-2 gap-8 mb-10">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <User className="w-5 h-5 text-gray-300" />
//                     <div>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase">Customer</p>
//                       <p className="text-sm font-bold text-gray-700">{selectedOrder.user_name}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar className="w-5 h-5 text-gray-300" />
//                     <div>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase">Order Date</p>
//                       <p className="text-sm font-bold text-gray-700">{new Date(selectedOrder.created_at).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
//                     <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase ${STATUS_CONFIG[selectedOrder.order_status]?.bg} ${STATUS_CONFIG[selectedOrder.order_status]?.text}`}>
//                       {selectedOrder.order_status}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Grand Total</p>
//                     <p className="text-2xl font-black text-gray-800">${selectedOrder.total_amount.toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-[2rem] p-8">
//                 <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
//                   <FileText className="w-4 h-4" /> Items List
//                 </h3>
//                 <div className="space-y-4">
//                   {selectedOrder.items.map((item: any, idx: number) => (
//                     <div key={idx} className="flex justify-between items-center group">
//                       <div>
//                         <p className="text-sm font-bold text-gray-700">{item.product_name}</p>
//                         <p className="text-xs font-bold text-gray-400">Quantity: {item.quantity}</p>
//                       </div>
//                       <p className="text-sm font-black text-gray-800">${(item.unit_price * item.quantity).toLocaleString()}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="p-10 border-t border-gray-100 flex gap-4">
//               <button className="flex-[2] bg-rose-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition shadow-lg shadow-rose-200 active:scale-95">
//                 Update Status
//               </button>
//               <button onClick={() => setSelectedOrder(null)} className="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition active:scale-95">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;

import { X, User, FileText, Calendar, ShoppingBag, MoreHorizontal, Clock } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShopOrders } from '../../queries/order/order.query';

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
  const { shopId } = useParams();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data: orders, isLoading, error } = useShopOrders(shopId || "");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Fetching Orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center">
          <p className="font-bold">Failed to load orders</p>
          <p className="text-xs mt-1">Please try again later or check your connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-in fade-in duration-500">
      
      {/* Header  */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Orders</h1>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-2 font-medium">
            <ShoppingBag className="w-4 h-4 text-rose-400" /> 
            Manage and track all transactions
          </p>
        </div>
      </div>

      {/* Table Container  */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders && orders.length > 0 ? (
                orders?.map((order: any) => {
                  const status = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.CREATE;
                  return (
                    <tr key={order.order_id} className="hover:bg-rose-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-gray-700">#{order.order_id}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-rose-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-rose-100">
                            {order.user_name?.charAt(0) || 'U'}
                          </div>
                          <span className="text-sm font-bold text-gray-600">{order.user_name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-400 font-bold">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-gray-800">
                           ฿{Number(order.total_amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2.5 hover:bg-white hover:shadow-xl rounded-2xl text-rose-500 transition-all active:scale-90 border border-transparent hover:border-rose-100"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-bold text-sm italic">
                    No orders found for this shop.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Modal  */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-300 border border-white">
            
            <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Order Details</h2>
                <p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-[0.2em]">Transaction ID: #{selectedOrder.order_id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-rose-50 hover:text-rose-500 rounded-[1.2rem] transition-all text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-10 mb-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</p>
                      <p className="text-sm font-bold text-gray-700">{selectedOrder.user_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Date</p>
                      <p className="text-sm font-bold text-gray-700">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status</p>
                    <span className={`inline-flex px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${STATUS_CONFIG[selectedOrder.order_status]?.bg} ${STATUS_CONFIG[selectedOrder.order_status]?.text}`}>
                      {selectedOrder.order_status}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Grand Total</p>
                    <p className="text-3xl font-black text-rose-500">฿{Number(selectedOrder.total_amount).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50/50 rounded-[2.5rem] p-8 border border-rose-100/50">
                <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Items List
                </h3>
                <div className="space-y-5">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl border border-rose-100 flex items-center justify-center overflow-hidden">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ShoppingBag className="w-5 h-5 text-rose-200" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-700">{item.product_name}</p>
                            <p className="text-[10px] font-black text-rose-400 uppercase">QTY: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-black text-gray-800">฿{(item.unit_price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                     <p className="text-xs text-gray-400 italic text-center py-4 underline decoration-dotted underline-offset-4">No item details found for this order.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-gray-50 flex gap-4 bg-white">
              <button className="flex-[2] bg-rose-500 text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-600 transition shadow-xl shadow-rose-200 active:scale-95 flex items-center justify-center gap-2 group">
                <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Update Status
              </button>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="flex-1 border-2 border-gray-100 text-gray-400 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-50 hover:text-gray-600 transition active:scale-95"
              >
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