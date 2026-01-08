import React from 'react'
import { X } from 'lucide-react';
import { useState } from 'react';
import { generateMockData } from '../../mock/shop-mock';
import { orders } from '../../mock/order-mock';
    const OrdersPage = () =>{ 
    const [data, setData] = useState(generateMockData());

    const [selectedOrder, setSelectedOrder]: any = useState(null);
    const orderStatusColors = {
      CREATE: 'bg-gray-500',
      RESERVE: 'bg-blue-500',
      WAITING_PAYMENT: 'bg-yellow-500',
      PAID: 'bg-green-500',
      EXPIRED: 'bg-red-500',
      CANCEL: 'bg-red-600',
      REFUND: 'bg-purple-500'
    };
    type OrderStatus = keyof typeof orderStatusColors;

    return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all orders</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Statuses</option>
            <option>CREATE</option>
            <option>PAID</option>
            <option>WAITING_PAYMENT</option>
            <option>CANCEL</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.orders.map((order: any) => (
              <tr key={order.order_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">#{order.order_id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.user_name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.created_at.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">${order.total_amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`${orderStatusColors[order.order_status as OrderStatus]} text-white text-xs px-2 py-1 rounded`}>
                    {order.order_status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-pink-600 hover:underline text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Order Details #{selectedOrder.order_id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{selectedOrder.user_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{selectedOrder.created_at.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`${orderStatusColors[selectedOrder.order_statusฟ as OrderStatus]} text-white text-xs px-2 py-1 rounded inline-block`}>
                      {selectedOrder.order_status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium text-lg">${selectedOrder.total_amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.unit_price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                    Update Status
                  </button>
                  <button onClick={() => setSelectedOrder(null)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )};

export default OrdersPage
