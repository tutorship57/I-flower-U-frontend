import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto pt-16">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            How would you like your flowers?
          </h1>
          <p className="text-gray-400 text-sm">
            Choose the experience that feels right for you
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">

          {/* Single */}
          <div
            onClick={() => navigate("/products?category=Single")}
            className="group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-stretch overflow-hidden"
          >
            {/* Left block */}
            <div className="w-32 sm:w-40 flex-shrink-0 bg-rose-100 flex items-center justify-center">
              <span className="text-5xl font-black text-rose-300 select-none tracking-tight">01</span>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between flex-1 px-7 py-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800">Single Flower</h2>
                <p className="text-xs text-rose-400 italic">"Sometimes, one flower is enough."</p>
                <p className="text-sm text-gray-400 leading-relaxed mt-1">
                  Simple, elegant, and meaningful.<br />Perfect for subtle moments.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-rose-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-6" />
            </div>
          </div>

          {/* Set */}
          <div
            onClick={() => navigate("/products?category=Set")}
            className="group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-stretch overflow-hidden"
          >
            {/* Left block */}
            <div className="w-32 sm:w-40 flex-shrink-0 bg-pink-100 flex items-center justify-center">
              <span className="text-5xl font-black text-pink-300 select-none tracking-tight">02</span>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between flex-1 px-7 py-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800">Flower Set</h2>
                <p className="text-xs text-rose-400 italic">"Make it unforgettable."</p>
                <p className="text-sm text-gray-400 leading-relaxed mt-1">
                  A complete gift experience,<br />beautifully arranged.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-rose-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-6" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;