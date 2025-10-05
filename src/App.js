import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Watchlist from './components/Watchlist';
import MarketOverview from './components/MarketOverview';
import StockDetails from './components/StockDetails';
import Portfolio from './components/Portfolio';
import MarketNews from './components/MarketNews';
import StockComparison from './components/StockComparison';
import PriceAlerts from './components/PriceAlerts';
import Analytics from './components/Analytics';
import StockCalculator from './components/StockCalculator';
import Settings from './components/Settings';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    if (selectedStock) {
      return <StockDetails stock={selectedStock} onBack={() => setSelectedStock(null)} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard onSelectStock={setSelectedStock} />;
      case 'watchlist':
        return <Watchlist onSelectStock={setSelectedStock} />;
      case 'market':
        return <MarketOverview onSelectStock={setSelectedStock} />;
      case 'portfolio':
        return <Portfolio />;
      case 'news':
        return <MarketNews />;
      case 'comparison':
        return <StockComparison />;
      case 'alerts':
        return <PriceAlerts />;
      case 'analytics':
        return <Analytics />;
      case 'calculator':
        return <StockCalculator />;
      case 'settings':
        return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <Dashboard onSelectStock={setSelectedStock} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex">
          <Sidebar 
            currentView={currentView}
            setCurrentView={setCurrentView}
            isOpen={sidebarOpen}
            setSelectedStock={setSelectedStock}
          />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <div className="p-6 pt-20">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
