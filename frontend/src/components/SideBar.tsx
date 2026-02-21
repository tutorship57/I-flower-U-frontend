import { BarChart3, Package, ShoppingCart, Settings, Store } from 'lucide-react';
import { useSidebarStore } from '../stores/shop-store';
import type { Page } from '../types/sidebar';
const SideBar = () => {
    const menuItems = [
      { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
      { id: 'products', icon: Package, label: 'Products' },
      { id: 'orders', icon: ShoppingCart, label: 'Orders' },
      { id: 'settings', icon: Settings, label: 'Shop Settings' }
    ];
    const { currentPage, setCurrentPage } = useSidebarStore();
    // const navigate = useNavigate();
    // useEffect(() => {
    //     navigate('/'+ 'shop/' + (currentPage === 'home' ? '' : currentPage));
    //   },[currentPage])
    return (
      <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Bloom Market</h1>
              <p className="text-xs text-gray-600">Seller Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page) }
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  };

export default SideBar;
