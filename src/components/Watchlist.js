import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, TrendingDown, Plus, Trash2, Eye } from 'lucide-react';

const Watchlist = ({ onSelectStock }) => {
  const [watchlistStocks, setWatchlistStocks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: ''
  });

  // Available stocks to add
  const availableStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1654.30 },
    { symbol: 'INFY', name: 'Infosys', price: 1456.20 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.65 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 876.45 },
    { symbol: 'WIPRO', name: 'Wipro', price: 432.10 },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 654.75 },
    { symbol: 'AXISBANK', name: 'Axis Bank', price: 1023.45 },
    { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1145.80 },
    { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 789.30 },
    { symbol: 'LT', name: 'Larsen & Toubro', price: 3234.50 },
    { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 9876.45 },
    { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3456.20 },
    { symbol: 'ITC', name: 'ITC Limited', price: 456.30 },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1876.50 },
  ];

  useEffect(() => {
    // Load watchlist from localStorage or use default
    const savedWatchlist = localStorage.getItem('watchlist');
    const defaultWatchlist = [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 3.45, dayHigh: 2478.90, dayLow: 2432.10 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90, change: 2.87, dayHigh: 3698.50, dayLow: 3645.20 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1654.30, change: 2.34, dayHigh: 1668.75, dayLow: 1642.80 },
      { symbol: 'INFY', name: 'Infosys', price: 1456.20, change: -1.98, dayHigh: 1478.90, dayLow: 1445.30 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.65, change: 1.76, dayHigh: 995.40, dayLow: 978.20 },
    ];

    setWatchlistStocks(savedWatchlist ? JSON.parse(savedWatchlist) : defaultWatchlist);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setWatchlistStocks(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 10,
        change: stock.change + (Math.random() - 0.5) * 0.5
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const removeFromWatchlist = (symbol) => {
    const updated = watchlistStocks.filter(stock => stock.symbol !== symbol);
    setWatchlistStocks(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const addStock = () => {
    if (newStock.symbol) {
      // Find the stock from available stocks
      const stockToAdd = availableStocks.find(s => s.symbol === newStock.symbol);
      
      if (stockToAdd) {
        // Check if already in watchlist
        const alreadyExists = watchlistStocks.find(s => s.symbol === stockToAdd.symbol);
        
        if (!alreadyExists) {
          const stock = {
            symbol: stockToAdd.symbol,
            name: stockToAdd.name,
            price: stockToAdd.price,
            change: (Math.random() - 0.5) * 5, // Random change between -2.5% to +2.5%
            dayHigh: stockToAdd.price * 1.02,
            dayLow: stockToAdd.price * 0.98
          };
          
          const updated = [...watchlistStocks, stock];
          setWatchlistStocks(updated);
          localStorage.setItem('watchlist', JSON.stringify(updated));
          
          // Reset form and close modal
          setNewStock({ symbol: '', name: '' });
          setShowAddModal(false);
        } else {
          alert('Stock already in watchlist!');
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Watchlist</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your favorite stocks</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Watchlist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {watchlistStocks.map((stock) => (
          <div
            key={stock.symbol}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Star className="w-6 h-6 text-blue-600 dark:text-blue-400 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onSelectStock(stock)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(stock.symbol)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{stock.price.toFixed(2)}
                    </p>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full ${
                    stock.change >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
                    )}
                    <span className={`font-semibold text-sm ${
                      stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Day High</p>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ₹{stock.dayHigh.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Day Low</p>
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      ₹{stock.dayLow.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {watchlistStocks.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start adding stocks to track them here
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add Your First Stock
          </button>
        </div>
      )}

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Stock to Watchlist</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Stock
                </label>
                <select
                  value={newStock.symbol}
                  onChange={(e) => {
                    const selected = availableStocks.find(s => s.symbol === e.target.value);
                    setNewStock({
                      symbol: e.target.value,
                      name: selected ? selected.name : ''
                    });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a stock...</option>
                  {availableStocks
                    .filter(stock => !watchlistStocks.find(w => w.symbol === stock.symbol))
                    .map(stock => (
                      <option key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name} (₹{stock.price.toFixed(2)})
                      </option>
                    ))}
                </select>
              </div>

              {newStock.symbol && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Selected:</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{newStock.symbol}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{newStock.name}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addStock}
                disabled={!newStock.symbol}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Add to Watchlist
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewStock({ symbol: '', name: '' });
                }}
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

export default Watchlist;
