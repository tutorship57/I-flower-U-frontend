// import { useEffect ,useState} from 'react'
// import { CircleCheck } from 'lucide-react';
// import { useSearchParams } from 'react-router';
// import { paymentService } from '../../services/payment.service';
// import { orderItemsService } from '../../services/orderItem.service';
// const CheckoutSuccess = () => {
//     const [searchParams,] = useSearchParams();    
//     const session_id = searchParams.get('session_id');
//     const [,setOrderId] = useState<string | null>(null);
//     const [,setOrderItems] = useState([]);

//     useEffect(()=>{
//         const init = async()=>{
//             if(!session_id) return
//             const PaymentResponse = await paymentService.getPaymentBySessionId(session_id);
//             setOrderId(PaymentResponse.data.order_id);
//             const OrderItemsResponse = await orderItemsService.getOrderItemsByOrderId(PaymentResponse.data.order_id);
//             setOrderItems(OrderItemsResponse.data);
//             console.log("this is data Order ",OrderItemsResponse.data);
//         }
//         init();
//     },[session_id])
    

//   return (
//     <div className='flex justify-center items-center h-screen '>
//         <div className='flex flex-col text-center bg-white rounded-lg p-8 h-auto justify-between shadow-md gap-4'>
//             <div>
//                 <button className=' p-2 rounded-full text-green-400'><CircleCheck className='w-16 h-16'/></button>
//             </div>
//             <div className='flex flex-col '>
//                 <h1 className='text-3xl font-bold'>Thank you for your purchase</h1>
//                 <p className='text-xl opacity-30'>Your order has been successfully processed</p>
//                 <div className='mt-4 bg-rose-50  rounded-md p-4'>
//                     <p className='text-lg'>Order ID: 123456789</p>
//                     <p className='text-lg'>Order Date: 2022-01-01</p>
//                     <p className='text-lg'>Order Total: $100.00</p>
//                     <div className='flex flex-col gap-2 '>

//                     </div>
//                 </div>
//             </div>
//             <div className='flex justify-center gap-4'>
//                 <button className='bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-600'>Back to HomePage</button>
//                 <button className='bg-rose-500 p-3 rounded-lg text-white hover:bg-rose-600'>Continue Shopping</button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CheckoutSuccess


// import { useEffect, useState } from 'react'
// import { CircleCheck } from 'lucide-react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { paymentService } from '../../services/payment.service';
// import { orderItemsService } from '../../services/orderItem.service';

// const CheckoutSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const session_id = searchParams.get('session_id');
//   const [orderId, setOrderId] = useState<string | null>(null);
//   const [orderItems, setOrderItems] = useState<any[]>([]);
//   const [totalAmount, setTotalAmount] = useState<number>(0);
//   const [orderDate, setOrderDate] = useState<string>('');

//   useEffect(() => {
//     const init = async () => {
//       if (!session_id) return
//       const PaymentResponse = await paymentService.getPaymentBySessionId(session_id);
//       const order_id = PaymentResponse.data.order_id;
//       setOrderId(order_id);
//       setTotalAmount(PaymentResponse.data.amount);
//       setOrderDate(new Date(PaymentResponse.data.created_at).toLocaleDateString('en-GB'));
//       const OrderItemsResponse = await orderItemsService.getOrderItemsByOrderId(order_id);
//       setOrderItems(OrderItemsResponse.data);
//     }
//     init();
//   }, [session_id])

//   return (
//     <div className='flex justify-center items-center h-screen'>
//       <div className='flex flex-col text-center bg-white rounded-lg p-8 h-auto justify-between shadow-md gap-4'>
//         <div>
//           <button className='p-2 rounded-full text-green-400'>
//             <CircleCheck className='w-16 h-16'/>
//           </button>
//         </div>
//         <div className='flex flex-col'>
//           <h1 className='text-3xl font-bold'>Thank you for your purchase</h1>
//           <p className='text-xl opacity-30'>Your order has been successfully processed</p>
//           <div className='mt-4 bg-rose-50 rounded-md p-4 text-left'>
//             <p className='text-lg'>Order ID: {orderId || '-'}</p>
//             <p className='text-lg'>Order Date: {orderDate || '-'}</p>
//             <p className='text-lg'>Order Total: ${totalAmount || '-'}</p>
//             <div className='flex flex-col gap-2 mt-2'>
//               {orderItems.map((item: any, i: number) => (
//                 <div key={i} className='flex justify-between text-sm text-gray-600'>
//                   <span>{item.product?.product_name} x{item.quantity}</span>
//                   <span>${item.unit_price}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className='flex justify-center gap-4'>
//           <button
//             onClick={() => navigate('/')}
//             className='bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-600'>
//             Back to HomePage
//           </button>
//           <button
//             onClick={() => navigate('/products')}
//             className='bg-rose-500 p-3 rounded-lg text-white hover:bg-rose-600'>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CheckoutSuccess

import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/payment.service';
import { orderItemsService } from '../../services/orderItem.service';
import { useCartStore } from '../../stores/cart-store'

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clear } = useCartStore()  //  เพิ่ม
  const session_id = searchParams.get('session_id');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [orderDate, setOrderDate] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      if (!session_id) return
      clear()
      const PaymentResponse = await paymentService.getPaymentBySessionId(session_id);
      const order_id = PaymentResponse.data.order_id;
      setOrderId(order_id);
      setTotalAmount(PaymentResponse.data.amount);
      setOrderDate(new Date(PaymentResponse.data.created_at).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      }));
      const OrderItemsResponse = await orderItemsService.getOrderItemsByOrderId(order_id);
      setOrderItems(OrderItemsResponse.data);
    }
    init();
  }, [session_id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">



      <div className="relative w-full max-w-lg">

        {/* card */}
        <div className="bg-white rounded-[32px] shadow-2xl shadow-rose-100 overflow-hidden">

          {/* top banner */}
          <div className="bg-[#e63956] px-8 pt-10 pb-16 text-center relative">
            <div className="absolute inset-0 opacity-10"
              style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',backgroundSize: '30px 30px'}}
            />
            {/* checkmark */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
              <svg className="w-10 h-10 text-[#e63956]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Order Confirmed!</h1>
            <p className="text-rose-100 text-sm">Thank you for your purchase</p>
          </div>

          {/* order info card — overlapping banner */}
          <div className="mx-6 -mt-8 bg-rose-50 rounded-2xl p-5 border border-rose-100 relative z-10">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">Order ID</p>
                <p className="text-xs font-semibold text-gray-700 truncate">{orderId ? `#${orderId.slice(-8).toUpperCase()}` : '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Order Date</p>
                <p className="text-xs font-semibold text-gray-700">{orderDate || '-'}</p>
              </div>
            </div>
          </div>

          {/* items */}
          <div className="px-6 pt-5 pb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Items Ordered</p>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {orderItems.length === 0 ? (
                <div className="text-center py-4 text-gray-300 text-sm">Loading items...</div>
              ) : orderItems.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  {item.product?.productImage?.[0]?.image_url ? (
                    <img
                      src={item.product.productImage[0].image_url}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-xl flex-shrink-0">🌸</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.product?.product_name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-[#e63956]">${Number(item.unit_price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* divider + total */}
          <div className="mx-6 my-4 border-t border-dashed border-rose-100" />
          <div className="px-6 pb-2 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Total Paid</span>
            <span className="text-2xl font-bold text-[#e63956]">${Number(totalAmount).toFixed(2)}</span>
          </div>

          {/* buttons */}
          <div className="px-6 pb-8 pt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/')}
              className="py-3 rounded-full border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-rose-300 hover:text-rose-500 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/products')}
              className="py-3 rounded-full bg-[#e63956] text-white text-sm font-semibold shadow-lg shadow-rose-200 hover:scale-105 transition"
            >
              Shop More
            </button>
          </div>

        </div>

        {/* bottom text */}
        <p className="text-center text-gray-400 text-xs mt-5">
          A confirmation has been saved to your order history 
        </p>

      </div>
    </div>
  )
}

export default CheckoutSuccess