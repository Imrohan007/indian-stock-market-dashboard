import React, { useState, useEffect } from 'react';
import { GitCompare, Plus, X, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StockComparison = () => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [availableStocks, setAvailableStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    // Sample stock data
    const stocks = [
      { 
        symbol: 'RELIANCE', 
        name: 'Reliance Industries',
        price: 2456.75,
        change: 3.45,
        marketCap: 16.5,
        pe: 24.5,
        eps: 98.45,
        dividend: 0.85,
        roe: 12.5,
        debt: 1.2
      },
      { 
        symbol: 'TCS', 
        name: 'Tata Consultancy Services',
        price: 3678.90,
        change: 2.87,
        marketCap: 13.4,
        pe: 28.3,
        eps: 130.20,
        dividend: 1.2,
        roe: 42.5,
        debt: 0.1
      },
      { 
        symbol: 'HDFCBANK', 
        name: 'HDFC Bank',
        price: 1654.30,
        change: 2.34,
        marketCap: 9.2,
        pe: 18.7,
        eps: 88.50,
        dividend: 0.95,
        roe: 16.8,
        debt: 0.8
      },
      { 
        symbol: 'INFY', 
        name: 'Infosys',
        price: 1456.20,
        change: -1.98,
        marketCap: 6.1,
        pe: 22.4,
        eps: 65.00,
        dividend: 1.5,
        roe: 28.3,
        debt: 0.05
      },
      { 
        symbol: 'ICICIBANK', 
        name: 'ICICI Bank',
        price: 987.65,
        change: 1.76,
        marketCap: 6.9,
        pe: 16.2,
        eps: 60.95,
        dividend: 1.1,
        roe: 15.2,
        debt: 0.9
      },
    ];

    setAvailableStocks(stocks);
    setSelectedStocks([stocks[0], stocks[1]]);
  }, []);

  useEffect(() => {
    if (selectedStocks.length > 0) {
      // Prepare comparison data
      const metrics = [
        { metric: 'Market Cap (₹T)', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: stock.marketCap }), {}) },
        { metric: 'P/E Ratio', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: stock.pe }), {}) },
        { metric: 'EPS (₹)', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: stock.eps }), {}) },
        { metric: 'Dividend Yield (%)', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: stock.dividend }), {}) },
        { metric: 'ROE (%)', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: stock.roe }), {}) },
      ];
      setComparisonData(metrics);
    }
  }, [selectedStocks]);

  const addStock = (stock) => {
    if (selectedStocks.length < 4 && !selectedStocks.find(s => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
    setSearchQuery('');
  };

  const removeStock = (symbol) => {
    setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol));
  };

  const filteredStocks = availableStocks.filter(stock =>
    (stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    !selectedStocks.find(s => s.symbol === stock.symbol)
  );

  // Prepare radar chart data
  const radarData = [
    { metric: 'P/E', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: (stock.pe / 30) * 100 }), {}) },
    { metric: 'ROE', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: (stock.roe / 50) * 100 }), {}) },
    { metric: 'Dividend', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: (stock.dividend / 2) * 100 }), {}) },
    { metric: 'Growth', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: Math.abs(stock.change) * 20 }), {}) },
    { metric: 'Debt', ...selectedStocks.reduce((acc, stock) => ({ ...acc, [stock.symbol]: (2 - stock.debt) * 50 }), {}) },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <GitCompare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stock Comparison</h1>
            <p className="text-gray-600 dark:text-gray-400">Compare up to 4 stocks side by side</p>
          </div>
        </div>
      </div>

      {/* Stock Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Selected Stocks ({selectedStocks.length}/4)</h2>
        
        {/* Selected Stocks */}
        <div className="flex flex-wrap gap-3 mb-4">
          {selectedStocks.map((stock, index) => (
            <div
              key={stock.symbol}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2"
              style={{ borderColor: COLORS[index] }}
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">₹{stock.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeStock(stock.symbol)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          ))}
          
          {selectedStocks.length < 4 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Add stock..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              {searchQuery && filteredStocks.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 max-h-60 overflow-y-auto">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => addStock(stock)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Price Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Price & Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedStocks.map((stock, index) => (
            <div
              key={stock.symbol}
              className="p-4 rounded-lg border-2"
              style={{ borderColor: COLORS[index] }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                ₹{stock.price.toFixed(2)}
              </p>
              <p className={`text-sm font-semibold ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fundamentals Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Fundamentals Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="metric" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            {selectedStocks.map((stock, index) => (
              <Bar key={stock.symbol} dataKey={stock.symbol} fill={COLORS[index]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance Radar</h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
            <PolarRadiusAxis stroke="#9ca3af" />
            {selectedStocks.map((stock, index) => (
              <Radar
                key={stock.symbol}
                name={stock.symbol}
                dataKey={stock.symbol}
                stroke={COLORS[index]}
                fill={COLORS[index]}
                fillOpacity={0.3}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Detailed Metrics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Metric
                </th>
                {selectedStocks.map((stock, index) => (
                  <th
                    key={stock.symbol}
                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                    style={{ color: COLORS[index] }}
                  >
                    {stock.symbol}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Current Price</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    ₹{stock.price.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Market Cap</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    ₹{stock.marketCap}T
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">P/E Ratio</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    {stock.pe}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">EPS</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    ₹{stock.eps}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Dividend Yield</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    {stock.dividend}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">ROE</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    {stock.roe}%
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Debt/Equity</td>
                {selectedStocks.map(stock => (
                  <td key={stock.symbol} className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white">
                    {stock.debt}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Winner Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Best Value</h3>
          <p className="text-3xl font-bold">
            {selectedStocks.reduce((best, stock) => 
              stock.pe < best.pe ? stock : best
            ).symbol}
          </p>
          <p className="text-sm opacity-90 mt-2">Lowest P/E Ratio</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Best Returns</h3>
          <p className="text-3xl font-bold">
            {selectedStocks.reduce((best, stock) => 
              stock.roe > best.roe ? stock : best
            ).symbol}
          </p>
          <p className="text-sm opacity-90 mt-2">Highest ROE</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Best Dividend</h3>
          <p className="text-3xl font-bold">
            {selectedStocks.reduce((best, stock) => 
              stock.dividend > best.dividend ? stock : best
            ).symbol}
          </p>
          <p className="text-sm opacity-90 mt-2">Highest Dividend Yield</p>
        </div>
      </div>
    </div>
  );
};

export default StockComparison;
