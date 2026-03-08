import { Link, useNavigate } from "react-router-dom";
import type { Page } from "../types/navbar";

type HeroSectionProps = {
    setCurrentPage:(page:Page)=> void
}

export default function HeroSection({setCurrentPage}:HeroSectionProps) {
    const navigate = useNavigate();
  return <div className="relative bg-pink-50 pb-30 nf-fade-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="">
            
              <h1 className="text-5xl font-bold text-gray-900 mb-6 ">
                Fresh Flowers For Every
                <span className="block text-rose-500">Occasion</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover beautiful blooms delivered fresh to your door. Perfect
                for gifts, events, or brightening your home.
              </p>
              <div className="flex space-x-4 ">
                <button
                  onClick={() => {
                    setCurrentPage("products")
                    navigate('/products')
                }}
                  className="nf-btn-lift relative z-30 px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition shadow-lg cursor-pointer "
                >
                  Shop Now
                </button>

                <Link
                  to="/recommend"
                  className="nf-btn-lift relative z-30 px-8 py-3 bg-white text-rose-500 border-2 border-rose-500 rounded-full hover:bg-rose-50 transition inline-block"
                >
                  Find flowers for you
                </Link>

              </div>
            </div>
            <div className="relative pt-5 z-30 animate-float ">
              <img
                src="https://png.pngtree.com/png-clipart/20240902/original/pngtree-free-psd-cartoon-flower-bouquet-png-image_15915324.png"
                alt="Beautiful flowers"
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* ส่วนโค้ง */}
        <div className=" absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 120"
            preserveAspectRatio="none"
            className="relative block w-full h-87.5"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>

      </div>
}
