// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { paymentService } from "../../services/payment.service";
// import { useAuthStore } from "../../stores/auth-store";

// const PaymentPage = () => {
//   const { order_id } = useParams();
//   const { user_id } = useAuthStore();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const redirectedRef = useRef(false);
//   // เพิ่มชั่วคราวเพื่อ debug
//     console.log("order_id:", order_id);
//     console.log("user_id:", user_id);
//   useEffect(() => {
//     if (!order_id || !user_id) return;

//     let attempts = 0;
//     // เพิ่มชั่วคราวเพื่อ debug
//     const interval = setInterval(async () => {
//       attempts++;

//       if (attempts > 5) {
//         clearInterval(interval);
//         setError("Payment service timeout. Please try again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await paymentService.getPaymentByOrderId(order_id);

//         if (!res.data || redirectedRef.current) return;

//         redirectedRef.current = true;
//         clearInterval(interval);

//         // 🚀 redirect ไปจ่ายเงินจริง
//         window.location.href = res.data.payment_url;

//       } catch (err) {
//         console.log(err);
//         setError("Something went wrong.");
//         setLoading(false);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [order_id, user_id]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-rose-50">
//       <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full">

//         {loading && (
//           <>
//             <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-6"></div>
//             <h2 className="text-xl font-bold text-gray-800">
//               Redirecting to Payment...
//             </h2>
//             <p className="text-gray-500 mt-2 text-sm">
//               Please wait while we connect you to payment gateway
//             </p>
//           </>
//         )}

//         {!loading && error && (
//           <>
//             <h2 className="text-xl font-bold text-red-500 mb-3">
//               Payment Error
//             </h2>
//             <p className="text-gray-600">{error}</p>
//           </>
//         )}
//       </div>
//     </div>
    
//   );
// };

// export default PaymentPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  // Mock — นับถอยหลัง 3 วิ แล้วไป success
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/payment/success");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full">
        <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-bold text-gray-800">
          Redirecting to Payment...
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          Redirecting in {countdown} seconds
        </p>
        <p className="text-xs text-gray-300 mt-6">Order: {order_id}</p>
      </div>
    </div>
  );
};

export default PaymentPage;