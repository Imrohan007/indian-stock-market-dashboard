import React, { useState, useEffect, useRef } from 'react';
import { Menu, Moon, Sun, TrendingUp, User, Settings, LogOut, UserCircle, Briefcase, HelpCircle } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0f1419] shadow-lg border-b border-gray-200 dark:border-gray-900">
      <div className="flex">
        {/* Sidebar Logo Section - Desktop Only */}
        <div className="hidden md:flex w-64 items-center px-6 py-3 bg-gray-900 dark:bg-[#0f1419] border-r border-gray-800 dark:border-gray-900">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          <span className="ml-3 text-xl font-bold text-white">StockMarket</span>
        </div>
        
        {/* Main Navbar Content */}
        <div className="flex-1 px-4 py-3">
          <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">StockMarket</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Market Status */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Market Open
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Stock Trader</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">trader@example.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to profile
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <UserCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">My Profile</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">View and edit profile</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to portfolio
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <Briefcase className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">My Portfolio</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">View your investments</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to settings
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Settings</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Customize your experience</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to help
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Help & Support</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get help and support</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        if (window.confirm('Are you sure you want to logout?')) {
                          // Handle logout
                          alert('Logout functionality - Coming soon!');
                        }
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">Logout</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
