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