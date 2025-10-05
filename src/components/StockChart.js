import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockChart = ({ symbol = 'NIFTY' }) => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    // Generate sample data - In production, replace with real API
    const generateData = () => {
      const basePrice = 19674;
      const points = timeframe === '1D' ? 50 : timeframe === '1W' ? 100 : 200;
      
      return Array.from({ length: points }, (_, i) => {
        const time = new Date();
        if (timeframe === '1D') {
          time.setMinutes(time.getMinutes() - (points - i) * 5);
        } else if (timeframe === '1W') {
          time.setHours(time.getHours() - (points - i) * 2);
        } else {
          time.setDate(time.getDate() - (points - i));
        }

        const variance = (Math.random() - 0.5) * 200;
        const price = basePrice + variance + (i * 2);

        return {
          time: time.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            ...(timeframe !== '1D' && { month: 'short', day: 'numeric' })
          }),
          price: parseFloat(price.toFixed(2)),
          volume: Math.floor(Math.random() * 1000000)
        };
      });
    };

    setData(generateData());

    // Simulate real-time updates for 1D view
    if (timeframe === '1D') {
      const interval = setInterval(() => {
        setData(prevData => {
          const newData = [...prevData.slice(1)];
          const lastPrice = prevData[prevData.length - 1].price;
          const newPrice = lastPrice + (Math.random() - 0.5) * 50;
          
          newData.push({
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            price: parseFloat(newPrice.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000)
          });
          
          return newData;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [timeframe]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">{payload[0].payload.time}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Vol: {(payload[0].payload.volume / 1000000).toFixed(2)}M
          </p>
        </div>
      );
    }
    return null;
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div>
      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-4">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeframe === tf
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fill="url(#colorPrice)" 
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Chart Info */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Open: </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ₹{data[0]?.price.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">High: </span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              ₹{Math.max(...data.map(d => d.price)).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Low: </span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              ₹{Math.min(...data.map(d => d.price)).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-gray-600 dark:text-gray-400">Live</span>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
