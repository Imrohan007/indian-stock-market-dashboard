import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Shield, 
  Database, 
  Palette,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Save,
  Moon,
  Sun
} from 'lucide-react';

const Settings = ({ darkMode, toggleDarkMode }) => {
  const [settings, setSettings] = useState({
    // User Settings
    userName: 'Stock Trader',
    userEmail: 'trader@example.com',
    
    // Notification Settings
    priceAlerts: true,
    portfolioUpdates: true,
    newsNotifications: false,
    emailNotifications: false,
    
    // Display Settings
    currency: 'INR',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'indian',
    
    // Data Settings
    autoRefresh: true,
    refreshInterval: 3,
    dataRetention: 30,
    
    // Privacy Settings
    shareData: false,
    analytics: true,
    
    // Advanced Settings
    apiEndpoint: 'default',
    cacheEnabled: true,
    debugMode: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = {
        userName: 'Stock Trader',
        userEmail: 'trader@example.com',
        priceAlerts: true,
        portfolioUpdates: true,
        newsNotifications: false,
        emailNotifications: false,
        currency: 'INR',
        language: 'en',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: 'indian',
        autoRefresh: true,
        refreshInterval: 3,
        dataRetention: 30,
        shareData: false,
        analytics: true,
        apiEndpoint: 'default',
        cacheEnabled: true,
        debugMode: false
      };
      setSettings(defaultSettings);
      localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
      setHasChanges(false);
      alert('Settings reset to default!');
    }
  };

  const exportData = () => {
    const data = {
      settings: settings,
      portfolio: JSON.parse(localStorage.getItem('portfolio') || '[]'),
      watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
      alerts: JSON.parse(localStorage.getItem('priceAlerts') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.settings) localStorage.setItem('appSettings', JSON.stringify(data.settings));
          if (data.portfolio) localStorage.setItem('portfolio', JSON.stringify(data.portfolio));
          if (data.watchlist) localStorage.setItem('watchlist', JSON.stringify(data.watchlist));
          if (data.alerts) localStorage.setItem('priceAlerts', JSON.stringify(data.alerts));
          alert('Data imported successfully! Please refresh the page.');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm('⚠️ WARNING: This will delete ALL your data including portfolio, watchlist, and alerts. This action cannot be undone. Are you sure?')) {
      if (window.confirm('Are you ABSOLUTELY sure? This is your last chance!')) {
        localStorage.removeItem('portfolio');
        localStorage.removeItem('watchlist');
        localStorage.removeItem('priceAlerts');
        localStorage.removeItem('appSettings');
        alert('All data cleared! The page will reload.');
        window.location.reload();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <SettingsIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Customize your dashboard experience</p>
          </div>
        </div>
        
        {hasChanges && (
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        )}
      </div>

      {/* User Profile Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Profile</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={settings.userName}
              onChange={(e) => handleSettingChange('userName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={settings.userEmail}
              onChange={(e) => handleSettingChange('userEmail', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              >
                {darkMode ? (
                  <Moon className="w-4 h-4 text-blue-600 m-1" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-500 m-1" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Price Alerts</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when price targets are reached</p>
            </div>
            <input
              type="checkbox"
              checked={settings.priceAlerts}
              onChange={(e) => handleSettingChange('priceAlerts', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Portfolio Updates</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates on portfolio performance</p>
            </div>
            <input
              type="checkbox"
              checked={settings.portfolioUpdates}
              onChange={(e) => handleSettingChange('portfolioUpdates', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">News Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about market news</p>
            </div>
            <input
              type="checkbox"
              checked={settings.newsNotifications}
              onChange={(e) => handleSettingChange('newsNotifications', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Display Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INR">₹ INR - Indian Rupee</option>
              <option value="USD">$ USD - US Dollar</option>
              <option value="EUR">€ EUR - Euro</option>
              <option value="GBP">£ GBP - British Pound</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number Format
            </label>
            <select
              value={settings.numberFormat}
              onChange={(e) => handleSettingChange('numberFormat', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="indian">Indian (1,00,000)</option>
              <option value="international">International (100,000)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data & Refresh Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data & Refresh</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Auto Refresh</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically refresh stock prices</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoRefresh}
              onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {settings.autoRefresh && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Refresh Interval (seconds)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={settings.refreshInterval}
                onChange={(e) => handleSettingChange('refreshInterval', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>1s</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{settings.refreshInterval}s</span>
                <span>10s</span>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Retention (days)
            </label>
            <input
              type="number"
              min="7"
              max="365"
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy & Security</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Share Anonymous Data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Help improve the app by sharing usage data</p>
            </div>
            <input
              type="checkbox"
              checked={settings.shareData}
              onChange={(e) => handleSettingChange('shareData', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enable analytics tracking</p>
            </div>
            <input
              type="checkbox"
              checked={settings.analytics}
              onChange={(e) => handleSettingChange('analytics', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data Management</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={exportData}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
            
            <label className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>Import Data</span>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
          
          <button
            onClick={resetSettings}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset to Default Settings</span>
          </button>
          
          <button
            onClick={clearAllData}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear All Data</span>
          </button>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>⚠️ Warning:</strong> Clearing all data will permanently delete your portfolio, watchlist, alerts, and settings. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <SettingsIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advanced</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Endpoint
            </label>
            <select
              value={settings.apiEndpoint}
              onChange={(e) => handleSettingChange('apiEndpoint', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default (Simulated)</option>
              <option value="nse">NSE India</option>
              <option value="bse">BSE India</option>
              <option value="custom">Custom API</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Enable Cache</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cache data for faster loading</p>
            </div>
            <input
              type="checkbox"
              checked={settings.cacheEnabled}
              onChange={(e) => handleSettingChange('cacheEnabled', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Debug Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Show console logs and debug info</p>
            </div>
            <input
              type="checkbox"
              checked={settings.debugMode}
              onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4">App Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-90">Version</p>
            <p className="text-lg font-semibold">1.0.0</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Last Updated</p>
            <p className="text-lg font-semibold">Oct 2025</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Build</p>
            <p className="text-lg font-semibold">Production</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Status</p>
            <p className="text-lg font-semibold">✅ Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
