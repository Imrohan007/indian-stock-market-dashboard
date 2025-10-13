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
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSelectedStock(null)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-[65px] h-[calc(100vh-65px)] bg-gray-900 dark:bg-[#0f1419] border-r border-gray-800 dark:border-gray-900 transition-transform duration-300 z-40 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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
                        : 'text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-400 group-hover:text-blue-400 dark:group-hover:text-blue-400'}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 px-3">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider px-4 mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="bg-green-900/30 dark:bg-green-900/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 dark:text-gray-400">NIFTY 50</span>
                    <span className="text-xs text-green-400 dark:text-green-400 font-semibold">+0.85%</span>
                  </div>
                  <div className="text-lg font-bold text-white dark:text-white mt-1">
                    19,674.25
                  </div>
                </div>
                
                <div className="bg-red-900/30 dark:bg-red-900/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 dark:text-gray-400">SENSEX</span>
                    <span className="text-xs text-red-400 dark:text-red-400 font-semibold">-0.32%</span>
                  </div>
                  <div className="text-lg font-bold text-white dark:text-white mt-1">
                    65,982.10
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Menu */}
          <div className="border-t border-gray-800 dark:border-gray-900 py-4 px-3">
            <nav className="space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-400 dark:text-gray-400" />
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
