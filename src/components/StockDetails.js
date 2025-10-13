import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Star, Bell, Share2, Info, RefreshCw } from 'lucide-react';
import StockChart from './StockChart';
import { fetchStockData } from '../services/stockApi';

const StockDetails = ({ stock, onBack }) => {
  const [stockData, setStockData] = useState(stock);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchStockData(stock.symbol);
        setStockData({
          symbol: data.symbol,
          name: stock.name,
          price: data.price,
          change: data.changePercent,
          open: data.open,
          high: data.high,
          low: data.low,
          volume: (data.volume / 1000000).toFixed(1) + 'M',
          previousClose: data.previousClose
        });
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching stock details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [stock.symbol, stock.name]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchStockData(stock.symbol);
      setStockData({
        symbol: data.symbol,
        name: stock.name,
        price: data.price,
        change: data.changePercent,
        open: data.open,
        high: data.high,
        low: data.low,
        volume: (data.volume / 1000000).toFixed(1) + 'M',
        previousClose: data.previousClose
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing stock data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stockData.symbol}</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stockData.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-6 h-6 text-gray-600 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
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
      <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price (Live)</p>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              ₹{stockData.price?.toFixed(2) || 'Loading...'}
            </p>
            {stockData.previousClose && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Previous Close: ₹{stockData.previousClose.toFixed(2)}
              </p>
            )}
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
              {stockData.change >= 0 ? '+' : ''}{stockData.change?.toFixed(2) || '0.00'}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
            <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              ₹{stockData.open?.toFixed(2) || '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
            <p className="text-base md:text-lg font-semibold text-green-600 dark:text-green-400">
              ₹{stockData.high?.toFixed(2) || '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
            <p className="text-base md:text-lg font-semibold text-red-600 dark:text-red-400">
              ₹{stockData.low?.toFixed(2) || '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
            <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              {stockData.volume || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">Price Chart</h2>
        <StockChart symbol={stockData.symbol} />
      </div>

      {/* Fundamentals and Company Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Fundamentals */}
        <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">Key Fundamentals</h2>
          <div className="space-y-3">
            {Object.entries(fundamentals).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <span className="text-sm text-gray-600 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Company Information</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(companyInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">About {stockData.name}</h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {stockData.name} is one of India's largest conglomerates with businesses spanning across energy, 
          petrochemicals, natural gas, retail, telecommunications, mass media, and textiles. The company has 
          consistently been a market leader and continues to drive innovation across multiple sectors. With a 
          strong focus on sustainable growth and digital transformation, the company remains at the forefront 
          of India's economic development.
        </p>
      </div>

    </div>
  );
};

export default StockDetails;
