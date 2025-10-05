import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, PieChart, Target, Zap } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

const Analytics = () => {
  const [marketData, setMarketData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [timeframe, setTimeframe] = useState('1M');

  useEffect(() => {
    // Generate market trend data
    const generateMarketData = () => {
      const points = 30;
      return Array.from({ length: points }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (points - i));
        
        return {
          date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          nifty: 19500 + Math.random() * 500 + i * 5,
          sensex: 65000 + Math.random() * 2000 + i * 20,
          volume: Math.floor(Math.random() * 5000000000) + 3000000000
        };
      });
    };

    // Generate volume analysis data
    const generateVolumeData = () => {
      return [
        { name: 'RELIANCE', volume: 12500000, value: 30567 },
        { name: 'TCS', volume: 8200000, value: 30156 },
        { name: 'HDFCBANK', volume: 15700000, value: 25987 },
        { name: 'INFY', volume: 9800000, value: 14267 },
        { name: 'ICICIBANK', volume: 11300000, value: 11159 },
        { name: 'BHARTIARTL', volume: 7500000, value: 6569 },
        { name: 'ITC', volume: 13400000, value: 5234 },
        { name: 'KOTAKBANK', volume: 6200000, value: 11234 }
      ];
    };

    // Generate sector performance data
    const generateSectorData = () => {
      return [
        { sector: 'IT', performance: 2.45, marketCap: 15.2, stocks: 125 },
        { sector: 'Banking', performance: 1.87, marketCap: 22.5, stocks: 234 },
        { sector: 'Pharma', performance: -0.76, marketCap: 8.3, stocks: 89 },
        { sector: 'Auto', performance: 1.34, marketCap: 6.7, stocks: 67 },
        { sector: 'Energy', performance: 3.21, marketCap: 18.9, stocks: 45 },
        { sector: 'FMCG', performance: 0.98, marketCap: 9.8, stocks: 78 },
        { sector: 'Metals', performance: -1.23, marketCap: 5.4, stocks: 56 },
        { sector: 'Telecom', performance: -0.45, marketCap: 4.2, stocks: 34 }
      ];
    };

    setMarketData(generateMarketData());
    setVolumeData(generateVolumeData());
    setSectorData(generateSectorData());
  }, [timeframe]);

  const marketStats = {
    totalMarketCap: '₹285.6T',
    avgDailyVolume: '₹4.2B',
    advanceDecline: 1.25,
    volatilityIndex: 15.8,
    fiiActivity: '+₹2,345Cr',
    diiActivity: '+₹1,876Cr'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Deep market insights and analysis</p>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex space-x-2">
          {['1W', '1M', '3M', '6M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Market Cap</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{marketStats.totalMarketCap}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Avg Volume</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{marketStats.avgDailyVolume}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">A/D Ratio</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{marketStats.advanceDecline}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Volatility</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{marketStats.volatilityIndex}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">FII Flow</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">{marketStats.fiiActivity}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">DII Flow</p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{marketStats.diiActivity}</p>
        </div>
      </div>

      {/* Market Trend Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Market Trend Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis yAxisId="left" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="nifty" 
              fill="#3b82f6" 
              stroke="#3b82f6" 
              fillOpacity={0.2}
              name="NIFTY 50"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="sensex" 
              stroke="#10b981" 
              strokeWidth={2}
              name="SENSEX"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Stocks by Volume</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={volumeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value) => value.toLocaleString('en-IN')}
              />
              <Bar dataKey="volume" fill="#8b5cf6" name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sector Performance</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="sector" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="performance" fill="#f59e0b" name="Performance (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sector Analysis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stocks</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sectorData.map((sector) => (
                <tr key={sector.sector} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{sector.sector}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-semibold ${
                      sector.performance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                    ₹{sector.marketCap}T
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                    {sector.stocks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {sector.performance >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 inline" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400 inline transform rotate-180" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Market Sentiment</h3>
          <p className="text-4xl font-bold mb-2">Bullish</p>
          <p className="text-sm opacity-90">Based on technical indicators and volume analysis</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Best Sector</h3>
          <p className="text-4xl font-bold mb-2">Energy</p>
          <p className="text-sm opacity-90">+3.21% performance with strong momentum</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Market Strength</h3>
          <p className="text-4xl font-bold mb-2">Strong</p>
          <p className="text-sm opacity-90">Advance/Decline ratio at 1.25</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
