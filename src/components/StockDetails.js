import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Star, Bell, Share2, Info } from 'lucide-react';
import StockChart from './StockChart';

const StockDetails = ({ stock, onBack }) => {
  const [stockData, setStockData] = useState(stock);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setStockData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 10,
        change: prev.change + (Math.random() - 0.5) * 0.3
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fundamentals = {
    marketCap: '₹15.2T',
    peRatio: '24.5',
    eps: '₹98.45',
    bookValue: '₹1,234.50',
    dividendYield: '0.85%',
    faceValue: '₹10',
    '52WeekHigh': '₹2,856.30',
    '52WeekLow': '₹2,124.75',
  };

  const companyInfo = {
    sector: 'Oil & Gas',
    industry: 'Refineries',
    employees: '347,362',
    founded: '1973',
    ceo: 'Mukesh D. Ambani',
    headquarters: 'Mumbai, Maharashtra'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{stockData.symbol}</h1>
            <p className="text-gray-600 dark:text-gray-400">{stockData.name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsWatchlisted(!isWatchlisted)}
            className={`p-2 rounded-lg transition-colors ${
              isWatchlisted 
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Star className={`w-6 h-6 ${isWatchlisted ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Share2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              ₹{stockData.price.toFixed(2)}
            </p>
          </div>
          <div className={`flex items-center px-4 py-2 rounded-full ${
            stockData.change >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
          }`}>
            {stockData.change >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            )}
            <span className={`font-bold text-lg ${
              stockData.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{(stockData.price - 23.45).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">₹{(stockData.price + 45.30).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">₹{(stockData.price - 67.80).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">12.5M</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Price Chart</h2>
        <StockChart symbol={stockData.symbol} />
      </div>

      {/* Fundamentals and Company Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fundamentals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Fundamentals</h2>
          <div className="space-y-3">
            {Object.entries(fundamentals).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <span className="text-gray-600 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Company Information</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(companyInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                <span className="font-semibold text-gray-900 dark:text-white text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About {stockData.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {stockData.name} is one of India's largest conglomerates with businesses spanning across energy, 
          petrochemicals, natural gas, retail, telecommunications, mass media, and textiles. The company has 
          consistently been a market leader and continues to drive innovation across multiple sectors. With a 
          strong focus on sustainable growth and digital transformation, the company remains at the forefront 
          of India's economic development.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
          Buy
        </button>
        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
          Sell
        </button>
        <button className="px-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors">
          Add to Portfolio
        </button>
      </div>
    </div>
  );
};

export default StockDetails;
