import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, Target, PieChart } from 'lucide-react';

const StockCalculator = () => {
  const [activeCalculator, setActiveCalculator] = useState('sip');
  
  // SIP Calculator State
  const [sipData, setSipData] = useState({
    monthlyInvestment: 10000,
    expectedReturn: 12,
    timePeriod: 10
  });

  // Lumpsum Calculator State
  const [lumpsumData, setLumpsumData] = useState({
    investment: 100000,
    expectedReturn: 12,
    timePeriod: 5
  });

  // Target Calculator State
  const [targetData, setTargetData] = useState({
    targetAmount: 1000000,
    currentAmount: 100000,
    expectedReturn: 12,
    timePeriod: 10
  });

  // Profit/Loss Calculator State
  const [plData, setPlData] = useState({
    buyPrice: 100,
    sellPrice: 120,
    quantity: 100,
    brokerage: 0.5
  });

  // Calculate SIP Returns
  const calculateSIP = () => {
    const monthlyRate = sipData.expectedReturn / 12 / 100;
    const months = sipData.timePeriod * 12;
    const futureValue = sipData.monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const invested = sipData.monthlyInvestment * months;
    const returns = futureValue - invested;
    
    return {
      futureValue: futureValue.toFixed(2),
      invested: invested.toFixed(2),
      returns: returns.toFixed(2),
      returnPercent: ((returns / invested) * 100).toFixed(2)
    };
  };

  // Calculate Lumpsum Returns
  const calculateLumpsum = () => {
    const futureValue = lumpsumData.investment * 
      Math.pow(1 + lumpsumData.expectedReturn / 100, lumpsumData.timePeriod);
    const returns = futureValue - lumpsumData.investment;
    
    return {
      futureValue: futureValue.toFixed(2),
      invested: lumpsumData.investment.toFixed(2),
      returns: returns.toFixed(2),
      returnPercent: ((returns / lumpsumData.investment) * 100).toFixed(2)
    };
  };

  // Calculate Target Achievement
  const calculateTarget = () => {
    const monthlyRate = targetData.expectedReturn / 12 / 100;
    const months = targetData.timePeriod * 12;
    const futureValueOfCurrent = targetData.currentAmount * 
      Math.pow(1 + targetData.expectedReturn / 100, targetData.timePeriod);
    
    const remainingAmount = targetData.targetAmount - futureValueOfCurrent;
    const monthlyRequired = remainingAmount / 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    return {
      monthlyRequired: monthlyRequired > 0 ? monthlyRequired.toFixed(2) : 0,
      currentGrowth: futureValueOfCurrent.toFixed(2),
      gap: remainingAmount > 0 ? remainingAmount.toFixed(2) : 0,
      achievable: remainingAmount <= 0
    };
  };

  // Calculate Profit/Loss
  const calculatePL = () => {
    const buyValue = plData.buyPrice * plData.quantity;
    const sellValue = plData.sellPrice * plData.quantity;
    const brokerageAmount = (buyValue + sellValue) * (plData.brokerage / 100);
    const netPL = sellValue - buyValue - brokerageAmount;
    const plPercent = ((netPL / buyValue) * 100);
    
    return {
      buyValue: buyValue.toFixed(2),
      sellValue: sellValue.toFixed(2),
      brokerage: brokerageAmount.toFixed(2),
      netPL: netPL.toFixed(2),
      plPercent: plPercent.toFixed(2),
      isProfit: netPL >= 0
    };
  };

  const calculators = [
    { id: 'sip', label: 'SIP Calculator', icon: TrendingUp },
    { id: 'lumpsum', label: 'Lumpsum', icon: DollarSign },
    { id: 'target', label: 'Target', icon: Target },
    { id: 'pl', label: 'Profit/Loss', icon: Percent }
  ];

  const sipResults = calculateSIP();
  const lumpsumResults = calculateLumpsum();
  const targetResults = calculateTarget();
  const plResults = calculatePL();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
          <Calculator className="w-8 h-8 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stock Calculators</h1>
          <p className="text-gray-600 dark:text-gray-400">Plan your investments with precision</p>
        </div>
      </div>

      {/* Calculator Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === calc.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{calc.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIP Calculator */}
      {activeCalculator === 'sip' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">SIP Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Investment (₹)
                </label>
                <input
                  type="number"
                  value={sipData.monthlyInvestment}
                  onChange={(e) => setSipData({...sipData, monthlyInvestment: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={sipData.monthlyInvestment}
                  onChange={(e) => setSipData({...sipData, monthlyInvestment: parseFloat(e.target.value)})}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Return (% p.a.)
                </label>
                <input
                  type="number"
                  value={sipData.expectedReturn}
                  onChange={(e) => setSipData({...sipData, expectedReturn: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={sipData.expectedReturn}
                  onChange={(e) => setSipData({...sipData, expectedReturn: parseFloat(e.target.value)})}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={sipData.timePeriod}
                  onChange={(e) => setSipData({...sipData, timePeriod: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={sipData.timePeriod}
                  onChange={(e) => setSipData({...sipData, timePeriod: parseFloat(e.target.value)})}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-6">Results</h2>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Total Investment</p>
                <p className="text-3xl font-bold">₹{parseFloat(sipResults.invested).toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Expected Returns</p>
                <p className="text-3xl font-bold">₹{parseFloat(sipResults.returns).toLocaleString('en-IN')}</p>
                <p className="text-sm opacity-90 mt-1">+{sipResults.returnPercent}%</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Future Value</p>
                <p className="text-4xl font-bold">₹{parseFloat(sipResults.futureValue).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lumpsum Calculator */}
      {activeCalculator === 'lumpsum' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lumpsum Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Amount (₹)
                </label>
                <input
                  type="number"
                  value={lumpsumData.investment}
                  onChange={(e) => setLumpsumData({...lumpsumData, investment: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Return (% p.a.)
                </label>
                <input
                  type="number"
                  value={lumpsumData.expectedReturn}
                  onChange={(e) => setLumpsumData({...lumpsumData, expectedReturn: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={lumpsumData.timePeriod}
                  onChange={(e) => setLumpsumData({...lumpsumData, timePeriod: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-6">Results</h2>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Investment</p>
                <p className="text-3xl font-bold">₹{parseFloat(lumpsumResults.invested).toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Expected Returns</p>
                <p className="text-3xl font-bold">₹{parseFloat(lumpsumResults.returns).toLocaleString('en-IN')}</p>
                <p className="text-sm opacity-90 mt-1">+{lumpsumResults.returnPercent}%</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Future Value</p>
                <p className="text-4xl font-bold">₹{parseFloat(lumpsumResults.futureValue).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Calculator */}
      {activeCalculator === 'target' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Target Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetData.targetAmount}
                  onChange={(e) => setTargetData({...targetData, targetAmount: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetData.currentAmount}
                  onChange={(e) => setTargetData({...targetData, currentAmount: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Return (% p.a.)
                </label>
                <input
                  type="number"
                  value={targetData.expectedReturn}
                  onChange={(e) => setTargetData({...targetData, expectedReturn: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={targetData.timePeriod}
                  onChange={(e) => setTargetData({...targetData, timePeriod: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-6">Results</h2>
            <div className="space-y-4">
              {targetResults.achievable ? (
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-lg mb-2">🎉 Target Achievable!</p>
                  <p className="text-sm opacity-90">Your current investment will grow to exceed your target.</p>
                </div>
              ) : (
                <>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">Monthly SIP Required</p>
                    <p className="text-3xl font-bold">₹{parseFloat(targetResults.monthlyRequired).toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">Current Investment Growth</p>
                    <p className="text-2xl font-bold">₹{parseFloat(targetResults.currentGrowth).toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">Gap to Target</p>
                    <p className="text-2xl font-bold">₹{parseFloat(targetResults.gap).toLocaleString('en-IN')}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profit/Loss Calculator */}
      {activeCalculator === 'pl' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profit/Loss Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Buy Price (₹)
                </label>
                <input
                  type="number"
                  value={plData.buyPrice}
                  onChange={(e) => setPlData({...plData, buyPrice: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sell Price (₹)
                </label>
                <input
                  type="number"
                  value={plData.sellPrice}
                  onChange={(e) => setPlData({...plData, sellPrice: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={plData.quantity}
                  onChange={(e) => setPlData({...plData, quantity: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brokerage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={plData.brokerage}
                  onChange={(e) => setPlData({...plData, brokerage: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br rounded-xl shadow-lg p-6 text-white ${
            plResults.isProfit ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'
          }`}>
            <h2 className="text-xl font-bold mb-6">Results</h2>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Buy Value</p>
                <p className="text-2xl font-bold">₹{parseFloat(plResults.buyValue).toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Sell Value</p>
                <p className="text-2xl font-bold">₹{parseFloat(plResults.sellValue).toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Brokerage</p>
                <p className="text-xl font-bold">₹{parseFloat(plResults.brokerage).toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Net {plResults.isProfit ? 'Profit' : 'Loss'}</p>
                <p className="text-4xl font-bold">₹{Math.abs(parseFloat(plResults.netPL)).toLocaleString('en-IN')}</p>
                <p className="text-lg opacity-90 mt-1">{plResults.isProfit ? '+' : ''}{plResults.plPercent}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockCalculator;
