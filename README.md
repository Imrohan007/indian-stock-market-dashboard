# 🇮🇳 Indian Stock Market Dashboard

A modern, real-time Indian stock market dashboard built with React, featuring dark mode, interactive charts, and comprehensive market data visualization.

![Dashboard Screenshot](./screenshots/dashboard.png)

## 🎥 Live Demo

Check out the live demo: [https://Imrohan007.github.io/indian-stock-market-dashboard](https://Imrohan007.github.io/indian-stock-market-dashboard)

## ✨ Features

### Core Features
- **📊 Real-time Stock Data** - Live updates for NSE & BSE stocks
- **🌓 Dark/Light Mode** - Seamless theme switching with persistent preferences
- **📈 Interactive Charts** - Beautiful, responsive charts using Recharts
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Modern UI** - Built with TailwindCSS and Lucide icons
- **🔍 Search Functionality** - Quick stock search in navbar

### Advanced Features
- **💼 Portfolio Management** - Track your investments with detailed analytics
- **⭐ Watchlist** - Monitor your favorite stocks with real-time updates
- **📰 Market News** - Latest market news with category filters
- **🔔 Price Alerts** - Set custom price alerts for any stock
- **📊 Advanced Analytics** - Deep market insights with sector analysis
- **⚖️ Stock Comparison** - Compare up to 4 stocks side by side
- **🧮 Stock Calculators** - SIP, Lumpsum, Target, and P/L calculators
- **📈 Market Overview** - Complete view of indices and sectors
- **💡 Stock Details** - Comprehensive stock information and fundamentals

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically build and deploy your app
   - Your site will be available at: `https://Imrohan007.github.io/indian-stock-market-dashboard`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
# Then upload the build folder to your hosting service
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js           # Top navigation bar with search and theme toggle
│   ├── Sidebar.js          # Side menu with navigation
│   ├── Dashboard.js        # Main dashboard with market overview
│   ├── Portfolio.js        # Portfolio management with analytics
│   ├── Watchlist.js        # User's watchlist
│   ├── MarketOverview.js   # Detailed market statistics
│   ├── MarketNews.js       # Market news with filters
│   ├── PriceAlerts.js      # Price alert management
│   ├── Analytics.js        # Advanced market analytics
│   ├── StockComparison.js  # Compare multiple stocks
│   ├── StockCalculator.js  # Investment calculators
│   ├── StockChart.js       # Interactive stock charts
│   └── StockDetails.js     # Detailed stock information
├── App.js                  # Main application component
├── index.js               # Application entry point
└── index.css              # Global styles with Tailwind
```

## 🎨 Features Overview

### 📊 Dashboard
- Market indices (NIFTY 50, SENSEX, etc.)
- Top gainers and losers
- Trending stocks
- Real-time price updates
- Interactive charts

### 💼 Portfolio Management
- Track all your holdings
- Real-time profit/loss calculation
- Portfolio allocation pie chart
- Performance analytics
- Add/edit/delete holdings
- Best/worst performer identification

### ⭐ Watchlist
- Add/remove stocks
- Real-time price tracking
- Quick access to favorite stocks
- Day high/low indicators
- Persistent storage

### 📰 Market News
- Latest market updates
- Category-based filtering
- Search functionality
- Sentiment indicators
- Multiple news sources

### 🔔 Price Alerts
- Custom price alerts
- Above/below conditions
- Real-time monitoring
- Alert notifications
- Progress tracking

### 📊 Advanced Analytics
- Market trend analysis
- Volume analysis
- Sector performance
- FII/DII activity tracking
- Market sentiment indicators

### ⚖️ Stock Comparison
- Compare up to 4 stocks
- Side-by-side metrics
- Radar chart visualization
- Fundamental comparison
- Winner analysis

### 🧮 Stock Calculators
- **SIP Calculator** - Plan systematic investments
- **Lumpsum Calculator** - One-time investment returns
- **Target Calculator** - Achieve financial goals
- **P/L Calculator** - Calculate profit/loss with brokerage

### 📈 Market Overview
- Major indices performance
- Sector-wise analysis
- Market breadth indicators
- Advance/decline ratio

### 💡 Stock Details
- Real-time price updates
- Interactive price charts
- Key fundamentals
- Company information
- Buy/Sell actions

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client (ready for API integration)

## 🔌 API Integration

The app now fetches **real-time stock data** from Yahoo Finance API!

### Current Implementation

The app uses the following data sources:
- **Yahoo Finance API** - Real-time NSE/BSE stock prices (no API key required)
- **NIFTY 50 & SENSEX** - Live index data
- **Auto-refresh** - Data updates every 60 seconds

### API Configuration (Optional)

For enhanced data or alternative sources, you can add API keys:

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API keys (optional):**
   ```env
   REACT_APP_ALPHA_VANTAGE_KEY=your_key_here
   ```

3. **Get free API keys:**
   - Alpha Vantage: [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

### API Service Structure

The app includes a dedicated API service (`src/services/stockApi.js`) with:
- `fetchStockData(symbol)` - Get individual stock data
- `fetchMultipleStocks(symbols)` - Batch fetch multiple stocks
- `fetchIndexData(index)` - Get NIFTY/SENSEX data
- Automatic fallback to mock data if API fails

### Supported Stocks

Currently tracking 14 major Indian stocks:
- RELIANCE, TCS, HDFCBANK, INFY, ICICIBANK
- BHARTIARTL, WIPRO, TATAMOTORS, AXISBANK, SUNPHARMA
- ADANIPORTS, LT, MARUTI, ASIANPAINT

## 🎯 Key Features Explained

### Dark Mode
- Persistent theme preference using localStorage
- Smooth transitions between themes
- System-wide dark mode support

### Real-time Updates
- Live stock prices from Yahoo Finance API
- Auto-refresh every 60 seconds
- Loading indicators during data fetch
- Graceful fallback to mock data if API fails

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Portfolio management
- [ ] Price alerts and notifications
- [ ] Advanced charting tools
- [ ] News integration
- [ ] Stock comparison
- [ ] Export data functionality
- [ ] Multiple watchlists
- [ ] Technical indicators

## 📝 Notes

- This is a demo application with simulated data
- For production use, integrate with real stock market APIs
- Ensure compliance with data provider terms of service
- Consider rate limiting and caching for API calls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Stock data structure inspired by NSE/BSE
- UI design inspired by modern trading platforms
- Icons by Lucide
- Charts by Recharts

---

**Made with ❤️ for Indian Stock Market Enthusiasts**
