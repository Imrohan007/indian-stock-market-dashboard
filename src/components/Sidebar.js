import React from 'react';
import { 
  LayoutDashboard, 
  Star, 
  TrendingUp, 
  BarChart3, 
  Newspaper,
  Settings,
  HelpCircle,
  ChevronRight,
  Briefcase,
  GitCompare,
  Bell,
  Calculator
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, isOpen, setSelectedStock }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'watchlist', label: 'Watchlist', icon: Star },
    { id: 'market', label: 'Market Overview', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Price Alerts', icon: Bell },
    { id: 'calculator', label: 'Calculators', icon: Calculator },
    { id: 'news', label: 'Market News', icon: Newspaper },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleMenuClick = (id) => {
    setCurrentView(id);
    setSelectedStock(null);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Main Menu */}
          <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
            <nav className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 px-3">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">NIFTY 50</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">+0.85%</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    19,674.25
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">SENSEX</span>
                    <span className="text-xs text-red-600 dark:text-red-400 font-semibold">-0.32%</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    65,982.10
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Menu */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-4 px-3">
            <nav className="space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
