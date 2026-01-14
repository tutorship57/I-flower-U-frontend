import { Clock, Heart, MapPin, Phone } from "lucide-react";
import { useNavBarStore } from '../../stores/navbar-store';
type Product = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  category: { category_name: string };
  images: { image_url: string }[];
  colors: string[];
  tags: string[];
};
const mockShop = {
  shop_name: "Blooming Dreams",
  shop_address: "123 Flower Street, Garden City",
  shop_phone: "+1 (555) 123-4567",
  shop_open: 540,
  shop_close: 1290,
};

// Mock data based on your schema
const mockProducts: Product[] = [
  {
    product_id: "1",
    product_name: "Rose Bouquet",
    product_description: "Beautiful red roses perfect for any occasion",
    product_price: 45.99,
    product_stock: 25,
    category: { category_name: "Bouquets" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500",
      },
    ],
    colors: ["Red", "Pink"],
    tags: ["Valentine", "Romance"],
  },
  {
    product_id: "2",
    product_name: "Tulip Arrangement",
    product_description: "Fresh spring tulips in vibrant colors",
    product_price: 32.5,
    product_stock: 18,
    category: { category_name: "Arrangements" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
      },
    ],
    colors: ["Yellow", "Orange"],
    tags: ["Spring", "Birthday"],
  },
  {
    product_id: "3",
    product_name: "Sunflower Bundle",
    product_description: "Cheerful sunflowers to brighten any room",
    product_price: 28.99,
    product_stock: 30,
    category: { category_name: "Bundles" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=500",
      },
    ],
    colors: ["Yellow"],
    tags: ["Summer", "Cheer"],
  },
  {
    product_id: "4",
    product_name: "Lily Paradise",
    product_description: "Elegant white lilies for special moments",
    product_price: 52.0,
    product_stock: 15,
    category: { category_name: "Premium" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500",
      },
    ],
    colors: ["White", "Pink"],
    tags: ["Wedding", "Elegant"],
  },
  {
    product_id: "5",
    product_name: "Mixed Garden",
    product_description: "Colorful mix of seasonal flowers",
    product_price: 38.75,
    product_stock: 22,
    category: { category_name: "Mixed" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500",
      },
    ],
    colors: ["Mixed"],
    tags: ["Birthday", "Celebration"],
  },
  {
    product_id: "6",
    product_name: "Orchid Elegance",
    product_description: "Exotic orchids in decorative pot",
    product_price: 65.0,
    product_stock: 12,
    category: { category_name: "Potted" },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1551738808-2d0a1f3c6e02?w=500",
      },
    ],
    colors: ["Purple", "White"],
    tags: ["Gift", "Premium"],
  },
];


const HomePage = ({ setSelectedProduct }: { setSelectedProduct: (product: Product) => void }) => {
  const featuredProducts = mockProducts.slice(0, 3);
  const {setCurrentPage} = useNavBarStore();
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Fresh Flowers For Every
                <span className="block text-rose-500">Occasion</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover beautiful blooms delivered fresh to your door. Perfect
                for gifts, events, or brightening your home.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentPage("products")}
                  className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition shadow-lg"
                >
                  Shop Now
                </button>
                <button className="px-8 py-3 bg-white text-rose-500 border-2 border-rose-500 rounded-full hover:bg-rose-50 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600"
                alt="Beautiful flowers"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Bouquets", "Arrangements", "Potted Plants", "Wedding"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCurrentPage("products")}
                  className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl hover:shadow-lg transition text-center"
                >
                  <div className="text-4xl mb-3">🌺</div>
                  <div className="font-semibold text-gray-900">{cat}</div>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Flowers</h2>
            <button
              onClick={() => setCurrentPage("products")}
              className="text-rose-500 hover:text-rose-600 font-semibold"
            >
              View All →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.product_id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={product.images[0].image_url}
                    alt={product.product_name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition">
                    <Heart className="w-5 h-5 text-rose-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {product.category.category_name}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {product.product_name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.product_description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-rose-500">
                      ${product.product_price}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentPage("productInfo");
                      }}
                      className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop Info */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">{mockShop.shop_address}</p>
            </div>
            <div className="p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h3 className="font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Daily 9:00 AM - 9:30 PM</p>
            </div>
            <div className="p-6">
              <Phone className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <h3 className="font-bold mb-2">Contact</h3>
              <p className="text-gray-600">{mockShop.shop_phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage
