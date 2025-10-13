import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import StockChart from './StockChart';
import { fetchMultipleStocks, fetchIndexData } from '../services/stockApi';

const Dashboard = ({ onSelectStock }) => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [niftyData, setNiftyData] = useState({ value: '19,674.25', change: 0.85 });
  const [sensexData, setSensexData] = useState({ value: '65,982.10', change: -0.32 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch index data
        const nifty = await fetchIndexData('NIFTY');
        const sensex = await fetchIndexData('SENSEX');
        
        setNiftyData({
          value: nifty.value.toLocaleString('en-IN'),
          change: nifty.changePercent
        });
        setSensexData({
          value: sensex.value.toLocaleString('en-IN'),
          change: sensex.changePercent
        });

        // Fetch stock data
        const stockSymbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 
                             'BHARTIARTL', 'WIPRO', 'TATAMOTORS', 'AXISBANK', 'SUNPHARMA',
                             'ADANIPORTS', 'LT', 'MARUTI', 'ASIANPAINT'];
        
        const stocksData = await fetchMultipleStocks(stockSymbols);
        
        // Map stock names
        const stockNames = {
          'RELIANCE': 'Reliance Industries',
          'TCS': 'Tata Consultancy Services',
          'HDFCBANK': 'HDFC Bank',
          'INFY': 'Infosys',
          'ICICIBANK': 'ICICI Bank',
          'BHARTIARTL': 'Bharti Airtel',
          'WIPRO': 'Wipro',
          'TATAMOTORS': 'Tata Motors',
          'AXISBANK': 'Axis Bank',
          'SUNPHARMA': 'Sun Pharma',
          'ADANIPORTS': 'Adani Ports',
          'LT': 'Larsen & Toubro',
          'MARUTI': 'Maruti Suzuki',
          'ASIANPAINT': 'Asian Paints'
        };

        const formattedStocks = stocksData.map(stock => ({
          symbol: stock.symbol,
          name: stockNames[stock.symbol] || stock.symbol,
          price: stock.price,
          change: stock.changePercent,
          volume: (stock.volume / 1000000).toFixed(1) + 'M'
        }));

        // Sort by change percentage
        const sorted = [...formattedStocks].sort((a, b) => b.change - a.change);
        
        setTopGainers(sorted.slice(0, 5));
        setTopLosers(sorted.slice(-5).reverse());
        setTrendingStocks(sorted.slice(0, 4));
        
        // Featured stocks with logos
        const logos = ['🏢', '💼', '🏦', '💻', '🏛️'];
        setFeaturedStocks(sorted.slice(0, 5).map((stock, index) => ({
          ...stock,
          totalShares: Math.floor(Math.random() * 20000),
          totalReturn: stock.change,
          logo: logos[index]
        })));

      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-red-500 mr-1" />
            )}
            <span className={`text-xs md:text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <div className={`p-3 md:p-4 rounded-full ${color}`}>
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const StockRow = ({ stock, onClick }) => (
    <div
      onClick={() => onClick(stock)}
      className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">{stock.symbol}</h4>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{stock.name}</p>
      </div>
      <div className="text-right mr-3 md:mr-6">
        <p className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</p>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{stock.volume}</p>
      </div>
      <div className={`flex items-center px-2 md:px-3 py-1 rounded-full ${
        stock.change >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
      }`}>
        {stock.change >= 0 ? (
          <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-600 dark:text-green-400 mr-1" />
        ) : (
          <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-600 dark:text-red-400 mr-1" />
        )}
        <span className={`font-semibold text-xs md:text-sm ${
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Real-time Indian stock market overview</p>
        </div>
        {loading && (
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading...</span>
          </div>
        )}
      </div>

      {/* Featured Stocks - Horizontal Scroll */}
      <div className="relative -mx-4 md:mx-0">
        <div className="flex items-center justify-between mb-4 px-4 md:px-0">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Featured Stocks</h2>
          <button className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-xs md:text-sm">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide snap-x snap-mandatory">
          {featuredStocks.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className="flex-shrink-0 w-56 md:w-64 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-5 border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-xl transition-all snap-start"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                    {stock.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Share</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Return</p>
                    <p className={`text-sm font-semibold ${stock.totalReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {stock.totalReturn >= 0 ? '+' : ''}{stock.totalReturn.toFixed(2)}%
                      {stock.totalReturn >= 0 ? ' ▲' : ' ▼'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="NIFTY 50"
          value={niftyData.value}
          change={niftyData.change}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <StatCard
          title="SENSEX"
          value={sensexData.value}
          change={sensexData.change}
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
      <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">NIFTY 50 - Live Chart</h2>
        <StockChart />
      </div>

      {/* Stock Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top Gainers */}
        <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Top Gainers</h2>
              <div className="flex items-center text-green-500">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
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
        <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Top Losers</h2>
              <div className="flex items-center text-red-500">
                <TrendingDown className="w-4 h-4 md:w-5 md:h-5" />
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
      <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Trending Stocks</h2>
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
