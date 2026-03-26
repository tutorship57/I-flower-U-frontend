import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-emerald-400" />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-black text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Thank you for your order.{" "}
          Your flowers are on their way!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 text-gray-400 hover:text-gray-600 text-sm transition"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccessPage;