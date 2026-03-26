import { Link } from "react-router-dom";
import { Flower2, ShoppingBag, Store, Mail, ArrowRight, CheckCircle } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="bg-rose-50 border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-rose-100 rounded-full text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">
            <Flower2 className="w-3.5 h-3.5" />
            About IflowerU
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-800 leading-tight mb-5">
            Your local flower market,{" "}
            <span className="text-rose-500">now online</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
            IflowerU is a flower marketplace that brings together local flower shops
            in one place — making it easy to discover, compare, and order fresh flowers
            for any occasion.
          </p>
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-14">
            How it works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <ShoppingBag className="w-6 h-6 text-rose-400" />,
                title: "Browse",
                desc: "Explore flowers and gift sets from multiple local shops all in one place.",
              },
              {
                step: "02",
                icon: <CheckCircle className="w-6 h-6 text-rose-400" />,
                title: "Order",
                desc: "Choose your favourites, place an order, and pay securely in a few taps.",
              },
              {
                step: "03",
                icon: <Flower2 className="w-6 h-6 text-rose-400" />,
                title: "Receive",
                desc: "Fresh flowers delivered straight to your door, exactly as pictured.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-4 p-7 bg-rose-50 rounded-2xl border border-rose-100">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white border border-rose-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-rose-100 tracking-tight">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why IflowerU ── */}
      <div className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-14">
            Why IflowerU?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Multiple shops, one platform", desc: "Compare prices and styles from different local florists without opening a dozen tabs." },
              { title: "Always fresh", desc: "Every shop on our platform is committed to delivering fresh, quality flowers." },
              { title: "For every occasion", desc: "From a single stem to a full gift set — we have something for every moment." },
              { title: "Support local sellers", desc: "Every order goes directly to a local flower shop in your area." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── For Sellers ── */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-50 border border-rose-100 rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-4">
                <Store className="w-3.5 h-3.5" />
                For Sellers
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-3 leading-snug">
                Own a flower shop?<br />Sell with us.
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-md">
                Join IflowerU and reach more customers online. Set up your shop,
                list your products, and start taking orders — it's free to get started.
              </p>
              <Link to="/create-store">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-full transition">
                  Open Your Store
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>

      {/* ── Contact ── */}
      <div className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Get in touch</h2>
          <p className="text-sm text-gray-400 mb-6">
            Have a question or need help? We're here for you.
          </p>
          <a
            href="mailto:hello@ifloweru.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:shadow-md transition"
          >
            <Mail className="w-4 h-4 text-rose-400" />
            hello@ifloweru.com
          </a>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;