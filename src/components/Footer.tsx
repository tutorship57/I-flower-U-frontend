import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🌸</span>
                </div>
                <span className="text-xl font-bold">Blooming Dreams</span>
              </div>
              <p className="text-gray-400">
                Fresh flowers delivered with love for every occasion.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition">
                    All Products
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition">
                    Bouquets
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition">
                    Arrangements
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition">
                    Wedding
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition">
                    Delivery Info
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition">
                    Returns
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition">FAQ</button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe for special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-full text-gray-900 focus:outline-none"
                />
                <button className="px-6 py-2 bg-rose-500 hover:bg-rose-600 rounded-r-full transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Blooming Dreams. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
