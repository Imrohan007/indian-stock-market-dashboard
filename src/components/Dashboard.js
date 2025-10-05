import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StockChart from './StockChart';

const Dashboard = ({ onSelectStock }) => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [trendingStocks, setTrendingStocks] = useState([]);

  useEffect(() => {
    // Simulated Indian stock data - In production, replace with real API
    const gainers = [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 3.45, volume: '12.5M' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90, change: 2.87, volume: '8.2M' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1654.30, change: 2.34, volume: '15.7M' },
      { symbol: 'INFY', name: 'Infosys', price: 1456.20, change: 1.98, volume: '9.8M' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.65, change: 1.76, volume: '11.3M' },
    ];

    const losers = [
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 876.45, change: -2.34, volume: '7.5M' },
      { symbol: 'WIPRO', name: 'Wipro', price: 432.10, change: -1.87, volume: '6.2M' },
      { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 654.75, change: -1.65, volume: '10.4M' },
      { symbol: 'AXISBANK', name: 'Axis Bank', price: 1023.45, change: -1.43, volume: '8.9M' },
      { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1145.80, change: -1.21, volume: '5.6M' },
    ];

    const trending = [
      { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 789.30, change: 4.56, volume: '14.2M' },
      { symbol: 'LT', name: 'Larsen & Toubro', price: 3234.50, change: 3.21, volume: '6.8M' },
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 9876.45, change: -0.87, volume: '4.5M' },
      { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3456.20, change: 2.15, volume: '5.3M' },
    ];

    setTopGainers(gainers);
    setTopLosers(losers);
    setTrendingStocks(trending);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTopGainers(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 10,
        change: stock.change + (Math.random() - 0.5) * 0.5
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const StockRow = ({ stock, onClick }) => (
    <div
      onClick={() => onClick(stock)}
      className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
    >
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
      </div>
      <div className="text-right mr-6">
        <p className="font-semibold text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{stock.volume}</p>
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
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time Indian stock market overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="NIFTY 50"
          value="19,674.25"
          change={0.85}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <StatCard
          title="SENSEX"
          value="65,982.10"
          change={-0.32}
          icon={Activity}
          color="bg-purple-500"
        />
        <StatCard
          title="Market Cap"
          value="₹285.6T"
          change={1.24}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Volume"
          value="4.2B"
          change={2.15}
          icon={BarChart3}
          color="bg-orange-500"
        />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">NIFTY 50 - Live Chart</h2>
        <StockChart />
      </div>

      {/* Stock Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Gainers</h2>
              <div className="flex items-center text-green-500">
                <TrendingUp className="w-5 h-5 mr-1" />
                <span className="text-sm font-semibold">Today</span>
              </div>
            </div>
          </div>
          <div className="p-2">
            {topGainers.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} onClick={onSelectStock} />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Losers</h2>
              <div className="flex items-center text-red-500">
                <TrendingDown className="w-5 h-5 mr-1" />
                <span className="text-sm font-semibold">Today</span>
              </div>
            </div>
          </div>
          <div className="p-2">
            {topLosers.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} onClick={onSelectStock} />
            ))}
          </div>
        </div>
      </div>

      {/* Trending Stocks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trending Stocks</h2>
        </div>
        <div className="p-2">
          {trendingStocks.map((stock) => (
            <StockRow key={stock.symbol} stock={stock} onClick={onSelectStock} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
