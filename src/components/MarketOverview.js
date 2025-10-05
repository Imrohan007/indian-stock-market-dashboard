import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Globe } from 'lucide-react';

const MarketOverview = ({ onSelectStock }) => {
  const [indices, setIndices] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [marketStats, setMarketStats] = useState({});

  useEffect(() => {
    // Indian market indices
    const indicesData = [
      { name: 'NIFTY 50', value: 19674.25, change: 0.85, volume: '245.6B' },
      { name: 'SENSEX', value: 65982.10, change: -0.32, volume: '189.3B' },
      { name: 'NIFTY BANK', value: 44567.80, change: 1.24, volume: '78.5B' },
      { name: 'NIFTY IT', value: 31234.50, change: 2.15, volume: '45.2B' },
      { name: 'NIFTY PHARMA', value: 14567.30, change: -0.87, volume: '23.8B' },
      { name: 'NIFTY AUTO', value: 13890.45, change: 1.56, volume: '34.6B' },
    ];

    // Sector performance
    const sectorsData = [
      { name: 'Information Technology', change: 2.45, stocks: 125, icon: '💻' },
      { name: 'Banking & Finance', change: 1.87, stocks: 234, icon: '🏦' },
      { name: 'Pharmaceuticals', change: -0.76, stocks: 89, icon: '💊' },
      { name: 'Automobiles', change: 1.34, stocks: 67, icon: '🚗' },
      { name: 'Energy', change: 3.21, stocks: 45, icon: '⚡' },
      { name: 'FMCG', change: 0.98, stocks: 78, icon: '🛒' },
      { name: 'Metals & Mining', change: -1.23, stocks: 56, icon: '⛏️' },
      { name: 'Telecommunications', change: -0.45, stocks: 34, icon: '📱' },
    ];

    const stats = {
      totalMarketCap: '₹285.6T',
      advances: 1234,
      declines: 987,
      unchanged: 156,
      totalVolume: '4.2B',
      activeStocks: 2377
    };

    setIndices(indicesData);
    setSectors(sectorsData);
    setMarketStats(stats);

    // Real-time updates
    const interval = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        value: index.value + (Math.random() - 0.5) * 50,
        change: index.change + (Math.random() - 0.5) * 0.2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const IndexCard = ({ index }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{index.name}</h3>
        <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${index.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {index.change >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="font-semibold">
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Vol: {index.volume}</span>
        </div>
      </div>
    </div>
  );

  const SectorCard = ({ sector }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{sector.icon}</div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{sector.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{sector.stocks} stocks</p>
          </div>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full ${
          sector.change >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
        }`}>
          {sector.change >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" />
          )}
          <span className={`font-semibold text-sm ${
            sector.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Market Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Complete view of Indian stock market</p>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
            <Globe className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Market Cap</p>
          <p className="text-2xl font-bold">{marketStats.totalMarketCap}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
            <Activity className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Advances</p>
          <p className="text-2xl font-bold">{marketStats.advances}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-8 h-8" />
            <Activity className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Declines</p>
          <p className="text-2xl font-bold">{marketStats.declines}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8" />
            <Activity className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Active Stocks</p>
          <p className="text-2xl font-bold">{marketStats.activeStocks}</p>
        </div>
      </div>

      {/* Major Indices */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Major Indices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indices.map((index) => (
            <IndexCard key={index.name} index={index} />
          ))}
        </div>
      </div>

      {/* Sector Performance */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sector Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectors.map((sector) => (
            <SectorCard key={sector.name} sector={sector} />
          ))}
        </div>
      </div>

      {/* Market Breadth */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Market Breadth</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Advances vs Declines</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {marketStats.advances} / {marketStats.declines}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500"
                style={{ width: `${(marketStats.advances / (marketStats.advances + marketStats.declines)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{marketStats.advances}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advances</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{marketStats.unchanged}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unchanged</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{marketStats.declines}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Declines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
