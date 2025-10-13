import axios from 'axios';

// Using Yahoo Finance API alternative (free)
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || 'demo'; // Add your key in .env file
const BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

// Indian stock symbols mapping
const STOCK_SYMBOLS = {
  'RELIANCE': 'RELIANCE.NS',
  'TCS': 'TCS.NS',
  'HDFCBANK': 'HDFCBANK.NS',
  'INFY': 'INFY.NS',
  'ICICIBANK': 'ICICIBANK.NS',
  'BHARTIARTL': 'BHARTIARTL.NS',
  'WIPRO': 'WIPRO.NS',
  'TATAMOTORS': 'TATAMOTORS.NS',
  'AXISBANK': 'AXISBANK.NS',
  'SUNPHARMA': 'SUNPHARMA.NS',
  'ADANIPORTS': 'ADANIPORTS.NS',
  'LT': 'LT.NS',
  'MARUTI': 'MARUTI.NS',
  'ASIANPAINT': 'ASIANPAINT.NS'
};

// Fetch stock data from Yahoo Finance
export const fetchStockData = async (symbol) => {
  try {
    const yahooSymbol = STOCK_SYMBOLS[symbol] || `${symbol}.NS`;
    const response = await axios.get(`${BASE_URL}${yahooSymbol}`, {
      params: {
        interval: '1d',
        range: '1d'
      }
    });

    const result = response.data.chart.result[0];
    const quote = result.indicators.quote[0];
    const meta = result.meta;

    return {
      symbol: symbol,
      price: meta.regularMarketPrice || quote.close[quote.close.length - 1],
      previousClose: meta.previousClose,
      change: meta.regularMarketPrice - meta.previousClose,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
      volume: quote.volume[quote.volume.length - 1],
      high: meta.regularMarketDayHigh,
      low: meta.regularMarketDayLow,
      open: meta.regularMarketOpen
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    // Return mock data as fallback
    return generateMockData(symbol);
  }
};

// Fetch multiple stocks
export const fetchMultipleStocks = async (symbols) => {
  try {
    const promises = symbols.map(symbol => fetchStockData(symbol));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching multiple stocks:', error);
    return symbols.map(symbol => generateMockData(symbol));
  }
};

// Fetch index data (NIFTY, SENSEX)
export const fetchIndexData = async (index) => {
  try {
    const indexSymbol = index === 'NIFTY' ? '^NSEI' : '^BSESN';
    const response = await axios.get(`${BASE_URL}${indexSymbol}`, {
      params: {
        interval: '1d',
        range: '1d'
      }
    });

    const result = response.data.chart.result[0];
    const meta = result.meta;

    return {
      name: index,
      value: meta.regularMarketPrice,
      change: meta.regularMarketPrice - meta.previousClose,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100
    };
  } catch (error) {
    console.error(`Error fetching ${index} data:`, error);
    return {
      name: index,
      value: index === 'NIFTY' ? 19674.25 : 65982.10,
      change: index === 'NIFTY' ? 167.50 : -210.35,
      changePercent: index === 'NIFTY' ? 0.85 : -0.32
    };
  }
};

// Generate mock data as fallback
const generateMockData = (symbol) => {
  const basePrice = Math.random() * 3000 + 500;
  const change = (Math.random() - 0.5) * 100;
  
  return {
    symbol: symbol,
    price: basePrice,
    previousClose: basePrice - change,
    change: change,
    changePercent: (change / (basePrice - change)) * 100,
    volume: Math.floor(Math.random() * 20000000),
    high: basePrice + Math.random() * 50,
    low: basePrice - Math.random() * 50,
    open: basePrice - (Math.random() - 0.5) * 30
  };
};

// Alternative: Using Alpha Vantage (requires API key)
export const fetchStockDataAlphaVantage = async (symbol) => {
  const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY;
  if (!API_KEY) {
    console.warn('Alpha Vantage API key not found');
    return generateMockData(symbol);
  }

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: `${symbol}.BSE`,
        apikey: API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    return {
      symbol: symbol,
      price: parseFloat(quote['05. price']),
      previousClose: parseFloat(quote['08. previous close']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open'])
    };
  } catch (error) {
    console.error('Error fetching from Alpha Vantage:', error);
    return generateMockData(symbol);
  }
};

export default {
  fetchStockData,
  fetchMultipleStocks,
  fetchIndexData,
  fetchStockDataAlphaVantage
};
