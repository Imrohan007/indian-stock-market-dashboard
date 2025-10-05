import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Check, X, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [triggeredAlerts, setTriggeredAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    condition: 'above',
    targetPrice: '',
    currentPrice: 0
  });

  const availableStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1654.30 },
    { symbol: 'INFY', name: 'Infosys', price: 1456.20 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.65 },
  ];

  useEffect(() => {
    // Load alerts from localStorage
    const savedAlerts = localStorage.getItem('priceAlerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    } else {
      const defaultAlerts = [
        {
          id: 1,
          symbol: 'RELIANCE',
          name: 'Reliance Industries',
          condition: 'above',
          targetPrice: 2500,
          currentPrice: 2456.75,
          createdAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 2,
          symbol: 'TCS',
          name: 'Tata Consultancy Services',
          condition: 'below',
          targetPrice: 3600,
          currentPrice: 3678.90,
          createdAt: new Date().toISOString(),
          status: 'active'
        }
      ];
      setAlerts(defaultAlerts);
    }

    // Simulate price updates and check alerts
    const interval = setInterval(() => {
      setAlerts(prevAlerts => {
        const updatedAlerts = prevAlerts.map(alert => {
          const priceChange = (Math.random() - 0.5) * 20;
          const newPrice = alert.currentPrice + priceChange;
          
          // Check if alert should be triggered
          const shouldTrigger = 
            (alert.condition === 'above' && newPrice >= alert.targetPrice) ||
            (alert.condition === 'below' && newPrice <= alert.targetPrice);

          if (shouldTrigger && alert.status === 'active') {
            setTriggeredAlerts(prev => [...prev, { ...alert, triggeredPrice: newPrice }]);
            return { ...alert, currentPrice: newPrice, status: 'triggered' };
          }

          return { ...alert, currentPrice: newPrice };
        });

        localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
        return updatedAlerts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addAlert = () => {
    if (newAlert.symbol && newAlert.targetPrice) {
      const stock = availableStocks.find(s => s.symbol === newAlert.symbol);
      const alert = {
        id: Date.now(),
        symbol: newAlert.symbol,
        name: stock.name,
        condition: newAlert.condition,
        targetPrice: parseFloat(newAlert.targetPrice),
        currentPrice: stock.price,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      const updatedAlerts = [...alerts, alert];
      setAlerts(updatedAlerts);
      localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));

      setNewAlert({ symbol: '', condition: 'above', targetPrice: '', currentPrice: 0 });
      setShowAddModal(false);
    }
  };

  const deleteAlert = (id) => {
    const updatedAlerts = alerts.filter(a => a.id !== id);
    setAlerts(updatedAlerts);
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
  };

  const dismissTriggeredAlert = (id) => {
    setTriggeredAlerts(prev => prev.filter(a => a.id !== id));
  };

  const getAlertProgress = (alert) => {
    if (alert.condition === 'above') {
      return Math.min(((alert.currentPrice / alert.targetPrice) * 100), 100);
    } else {
      return Math.min(((alert.targetPrice / alert.currentPrice) * 100), 100);
    }
  };

  const getAlertColor = (alert) => {
    const progress = getAlertProgress(alert);
    if (alert.status === 'triggered') return 'border-green-500';
    if (progress >= 90) return 'border-yellow-500';
    return 'border-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Bell className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Price Alerts</h1>
            <p className="text-gray-600 dark:text-gray-400">Get notified when stocks hit your target price</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Alert</span>
        </button>
      </div>

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div className="space-y-3">
          {triggeredAlerts.map(alert => (
            <div
              key={alert.id}
              className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4 flex items-center justify-between animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-full">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Alert Triggered! {alert.symbol}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Price went {alert.condition} ₹{alert.targetPrice.toFixed(2)} - Current: ₹{alert.triggeredPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dismissTriggeredAlert(alert.id)}
                className="p-2 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Alerts</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{alerts.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {alerts.filter(a => a.status === 'active').length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Triggered</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {alerts.filter(a => a.status === 'triggered').length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Near Target</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {alerts.filter(a => getAlertProgress(a) >= 90 && a.status === 'active').length}
          </p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 ${getAlertColor(alert)} transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  alert.status === 'triggered' 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-blue-100 dark:bg-blue-900'
                }`}>
                  {alert.condition === 'above' ? (
                    <TrendingUp className={`w-6 h-6 ${
                      alert.status === 'triggered' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  ) : (
                    <TrendingDown className={`w-6 h-6 ${
                      alert.status === 'triggered' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{alert.symbol}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{alert.name}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {alert.status === 'triggered' && (
                  <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                    TRIGGERED
                  </div>
                )}
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Condition</span>
                <span className="font-semibold text-gray-900 dark:text-white capitalize">
                  {alert.condition} ₹{alert.targetPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Price</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{alert.currentPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Distance</span>
                <span className={`font-semibold ${
                  Math.abs(alert.currentPrice - alert.targetPrice) < 50 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  ₹{Math.abs(alert.currentPrice - alert.targetPrice).toFixed(2)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{getAlertProgress(alert).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      alert.status === 'triggered' 
                        ? 'bg-green-500' 
                        : getAlertProgress(alert) >= 90 
                          ? 'bg-yellow-500' 
                          : 'bg-blue-500'
                    }`}
                    style={{ width: `${getAlertProgress(alert)}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {new Date(alert.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No alerts set
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first price alert to get notified
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            Create Alert
          </button>
        </div>
      )}

      {/* Add Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create Price Alert</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Stock
                </label>
                <select
                  value={newAlert.symbol}
                  onChange={(e) => {
                    const stock = availableStocks.find(s => s.symbol === e.target.value);
                    setNewAlert({...newAlert, symbol: e.target.value, currentPrice: stock?.price || 0});
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Choose a stock...</option>
                  {availableStocks.map(stock => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} - ₹{stock.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Condition
                </label>
                <select
                  value={newAlert.condition}
                  onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="above">Price goes above</option>
                  <option value="below">Price goes below</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                  placeholder="e.g., 2500.00"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {newAlert.symbol && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Current price: ₹{newAlert.currentPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addAlert}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Create Alert
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;
