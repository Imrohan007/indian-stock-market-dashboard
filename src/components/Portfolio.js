import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Edit, 
  Trash2, 
  PieChart,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState({});
  const [newHolding, setNewHolding] = useState({
    symbol: '',
    quantity: '',
    buyPrice: '',
    buyDate: ''
  });

  useEffect(() => {
    // Load portfolio from localStorage or use default
    const savedPortfolio = localStorage.getItem('portfolio');
    const defaultHoldings = [
      { 
        symbol: 'RELIANCE', 
        name: 'Reliance Industries',
        quantity: 50, 
        buyPrice: 2300.00,
        currentPrice: 2456.75,
        buyDate: '2024-01-15'
      },
      { 
        symbol: 'TCS', 
        name: 'Tata Consultancy Services',
        quantity: 25, 
        buyPrice: 3500.00,
        currentPrice: 3678.90,
        buyDate: '2024-02-20'
      },
      { 
        symbol: 'HDFCBANK', 
        name: 'HDFC Bank',
        quantity: 100, 
        buyPrice: 1600.00,
        currentPrice: 1654.30,
        buyDate: '2024-03-10'
      },
      { 
        symbol: 'INFY', 
        name: 'Infosys',
        quantity: 75, 
        buyPrice: 1480.00,
        currentPrice: 1456.20,
        buyDate: '2024-01-25'
      },
    ];

    const portfolio = savedPortfolio ? JSON.parse(savedPortfolio) : defaultHoldings;
    setHoldings(portfolio);
    calculateStats(portfolio);

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setHoldings(prev => {
        const updated = prev.map(holding => ({
          ...holding,
          currentPrice: holding.currentPrice + (Math.random() - 0.5) * 10
        }));
        calculateStats(updated);
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const calculateStats = (portfolio) => {
    const totalInvested = portfolio.reduce((sum, h) => sum + (h.quantity * h.buyPrice), 0);
    const currentValue = portfolio.reduce((sum, h) => sum + (h.quantity * h.currentPrice), 0);
    const totalGainLoss = currentValue - totalInvested;
    const totalGainLossPercent = ((totalGainLoss / totalInvested) * 100);

    setPortfolioStats({
      totalInvested,
      currentValue,
      totalGainLoss,
      totalGainLossPercent,
      dayChange: (Math.random() - 0.5) * 5000,
      dayChangePercent: (Math.random() - 0.5) * 2
    });
  };

  const addHolding = () => {
    if (newHolding.symbol && newHolding.quantity && newHolding.buyPrice) {
      const holding = {
        ...newHolding,
        name: newHolding.symbol,
        currentPrice: parseFloat(newHolding.buyPrice),
        quantity: parseInt(newHolding.quantity),
        buyPrice: parseFloat(newHolding.buyPrice)
      };
      
      const updated = [...holdings, holding];
      setHoldings(updated);
      localStorage.setItem('portfolio', JSON.stringify(updated));
      calculateStats(updated);
      
      setNewHolding({ symbol: '', quantity: '', buyPrice: '', buyDate: '' });
      setShowAddModal(false);
    }
  };

  const removeHolding = (symbol) => {
    const updated = holdings.filter(h => h.symbol !== symbol);
    setHoldings(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
    calculateStats(updated);
  };

  const calculateHoldingStats = (holding) => {
    const invested = holding.quantity * holding.buyPrice;
    const current = holding.quantity * holding.currentPrice;
    const gainLoss = current - invested;
    const gainLossPercent = ((gainLoss / invested) * 100);
    
    return { invested, current, gainLoss, gainLossPercent };
  };

  // Prepare data for pie chart
  const pieData = holdings.map(h => ({
    name: h.symbol,
    value: h.quantity * h.currentPrice
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Portfolio</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage your investments</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Holding</span>
        </button>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
            <Briefcase className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Invested</p>
          <p className="text-2xl font-bold">₹{portfolioStats.totalInvested?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
            <DollarSign className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Current Value</p>
          <p className="text-2xl font-bold">₹{portfolioStats.currentValue?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>

        <div className={`bg-gradient-to-br rounded-xl shadow-lg p-6 text-white ${
          portfolioStats.totalGainLoss >= 0 ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'
        }`}>
          <div className="flex items-center justify-between mb-2">
            {portfolioStats.totalGainLoss >= 0 ? (
              <TrendingUp className="w-8 h-8" />
            ) : (
              <TrendingDown className="w-8 h-8" />
            )}
            <Percent className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Gain/Loss</p>
          <p className="text-2xl font-bold">
            ₹{Math.abs(portfolioStats.totalGainLoss || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm opacity-90">
            {portfolioStats.totalGainLoss >= 0 ? '+' : '-'}
            {Math.abs(portfolioStats.totalGainLossPercent || 0).toFixed(2)}%
          </p>
        </div>

        <div className={`bg-gradient-to-br rounded-xl shadow-lg p-6 text-white ${
          portfolioStats.dayChange >= 0 ? 'from-purple-500 to-purple-600' : 'from-orange-500 to-orange-600'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8" />
            <TrendingUp className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90 mb-1">Today's Change</p>
          <p className="text-2xl font-bold">
            ₹{Math.abs(portfolioStats.dayChange || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm opacity-90">
            {portfolioStats.dayChange >= 0 ? '+' : '-'}
            {Math.abs(portfolioStats.dayChangePercent || 0).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Portfolio Allocation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Portfolio Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
            </RechartsPie>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-400">Best Performer</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {holdings.length > 0 && holdings.reduce((best, h) => {
                    const stats = calculateHoldingStats(h);
                    const bestStats = calculateHoldingStats(best);
                    return stats.gainLossPercent > bestStats.gainLossPercent ? h : best;
                  }).symbol}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +{holdings.length > 0 && calculateHoldingStats(holdings.reduce((best, h) => {
                    const stats = calculateHoldingStats(h);
                    const bestStats = calculateHoldingStats(best);
                    return stats.gainLossPercent > bestStats.gainLossPercent ? h : best;
                  })).gainLossPercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-400">Worst Performer</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {holdings.length > 0 && holdings.reduce((worst, h) => {
                    const stats = calculateHoldingStats(h);
                    const worstStats = calculateHoldingStats(worst);
                    return stats.gainLossPercent < worstStats.gainLossPercent ? h : worst;
                  }).symbol}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  {holdings.length > 0 && calculateHoldingStats(holdings.reduce((worst, h) => {
                    const stats = calculateHoldingStats(h);
                    const worstStats = calculateHoldingStats(worst);
                    return stats.gainLossPercent < worstStats.gainLossPercent ? h : worst;
                  })).gainLossPercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-400">Total Holdings</span>
              <span className="font-semibold text-gray-900 dark:text-white">{holdings.length}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-400">Avg. Return</span>
              <span className={`font-semibold ${portfolioStats.totalGainLossPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {portfolioStats.totalGainLossPercent >= 0 ? '+' : ''}{portfolioStats.totalGainLossPercent?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invested</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gain/Loss</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {holdings.map((holding) => {
                const stats = calculateHoldingStats(holding);
                return (
                  <tr key={holding.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{holding.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{holding.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      {holding.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      ₹{holding.buyPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      ₹{holding.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      ₹{stats.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      ₹{stats.current.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-semibold ${stats.gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {stats.gainLoss >= 0 ? '+' : ''}₹{stats.gainLoss.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <div className={`text-xs ${stats.gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ({stats.gainLoss >= 0 ? '+' : ''}{stats.gainLossPercent.toFixed(2)}%)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors">
                          <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button 
                          onClick={() => removeHolding(holding.symbol)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Holding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Holding</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock Symbol
                </label>
                <input
                  type="text"
                  value={newHolding.symbol}
                  onChange={(e) => setNewHolding({...newHolding, symbol: e.target.value.toUpperCase()})}
                  placeholder="e.g., RELIANCE"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newHolding.quantity}
                  onChange={(e) => setNewHolding({...newHolding, quantity: e.target.value})}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Buy Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newHolding.buyPrice}
                  onChange={(e) => setNewHolding({...newHolding, buyPrice: e.target.value})}
                  placeholder="e.g., 2300.00"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Buy Date
                </label>
                <input
                  type="date"
                  value={newHolding.buyDate}
                  onChange={(e) => setNewHolding({...newHolding, buyDate: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addHolding}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Add Holding
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

export default Portfolio;
