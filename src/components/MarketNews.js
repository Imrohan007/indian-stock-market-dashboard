import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, Clock, ExternalLink, Filter, Search } from 'lucide-react';

const MarketNews = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Sample news data - Replace with real API
    const newsData = [
      {
        id: 1,
        title: 'Reliance Industries announces Q3 results, beats estimates',
        summary: 'Reliance Industries reported strong quarterly earnings, surpassing market expectations with a 15% YoY growth.',
        category: 'earnings',
        source: 'Economic Times',
        time: '2 hours ago',
        image: 'https://via.placeholder.com/400x200?text=Reliance+News',
        sentiment: 'positive'
      },
      {
        id: 2,
        title: 'RBI keeps repo rate unchanged at 6.5%',
        summary: 'The Reserve Bank of India maintains status quo on interest rates, focusing on inflation management.',
        category: 'economy',
        source: 'Business Standard',
        time: '4 hours ago',
        image: 'https://via.placeholder.com/400x200?text=RBI+Policy',
        sentiment: 'neutral'
      },
      {
        id: 3,
        title: 'IT sector sees major hiring surge in Q4',
        summary: 'Indian IT companies plan to hire over 50,000 employees in the coming quarter amid strong demand.',
        category: 'sector',
        source: 'Mint',
        time: '5 hours ago',
        image: 'https://via.placeholder.com/400x200?text=IT+Hiring',
        sentiment: 'positive'
      },
      {
        id: 4,
        title: 'Nifty 50 reaches new all-time high',
        summary: 'Indian benchmark index Nifty 50 crosses 20,000 mark for the first time, driven by strong FII inflows.',
        category: 'market',
        source: 'CNBC TV18',
        time: '6 hours ago',
        image: 'https://via.placeholder.com/400x200?text=Nifty+ATH',
        sentiment: 'positive'
      },
      {
        id: 5,
        title: 'Banking sector faces regulatory scrutiny',
        summary: 'SEBI announces new compliance requirements for banking stocks following recent irregularities.',
        category: 'regulation',
        source: 'Financial Express',
        time: '8 hours ago',
        image: 'https://via.placeholder.com/400x200?text=Banking+News',
        sentiment: 'negative'
      },
      {
        id: 6,
        title: 'EV stocks rally on government incentives',
        summary: 'Electric vehicle manufacturers see stock prices surge after announcement of new subsidy schemes.',
        category: 'sector',
        source: 'Bloomberg Quint',
        time: '10 hours ago',
        image: 'https://via.placeholder.com/400x200?text=EV+Rally',
        sentiment: 'positive'
      },
      {
        id: 7,
        title: 'FII outflows continue for third consecutive week',
        summary: 'Foreign institutional investors pull out ₹5,000 crore from Indian markets amid global uncertainties.',
        category: 'market',
        source: 'Moneycontrol',
        time: '12 hours ago',
        image: 'https://via.placeholder.com/400x200?text=FII+Outflow',
        sentiment: 'negative'
      },
      {
        id: 8,
        title: 'Pharma exports hit record high',
        summary: 'Indian pharmaceutical companies report record export revenues, driven by strong international demand.',
        category: 'sector',
        source: 'Hindu Business Line',
        time: '1 day ago',
        image: 'https://via.placeholder.com/400x200?text=Pharma+Exports',
        sentiment: 'positive'
      }
    ];

    setNews(newsData);
    setFilteredNews(newsData);
  }, []);

  useEffect(() => {
    let filtered = news;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [selectedCategory, searchQuery, news]);

  const categories = [
    { id: 'all', label: 'All News', count: news.length },
    { id: 'market', label: 'Market', count: news.filter(n => n.category === 'market').length },
    { id: 'earnings', label: 'Earnings', count: news.filter(n => n.category === 'earnings').length },
    { id: 'sector', label: 'Sector', count: news.filter(n => n.category === 'sector').length },
    { id: 'economy', label: 'Economy', count: news.filter(n => n.category === 'economy').length },
    { id: 'regulation', label: 'Regulation', count: news.filter(n => n.category === 'regulation').length },
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Newspaper className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market News</h1>
            <p className="text-gray-600 dark:text-gray-400">Latest updates from Indian markets</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Filter by:</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <Newspaper className="w-16 h-16" />
              </div>
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getSentimentColor(item.sentiment)}`}>
                {item.sentiment}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded">
                  {item.category.toUpperCase()}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {item.time}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {item.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.source}</span>
                <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  <span className="text-sm font-semibold">Read more</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No news found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketNews;
