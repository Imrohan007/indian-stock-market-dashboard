# 📖 User Guide - Indian Stock Market Dashboard

## Table of Contents
1. [Getting Started](#getting-started)
2. [Navigation](#navigation)
3. [Feature Walkthroughs](#feature-walkthroughs)
4. [Tips & Tricks](#tips--tricks)
5. [Keyboard Shortcuts](#keyboard-shortcuts)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

### First Launch
1. Open your terminal in the project directory
2. Run `npm install` (first time only)
3. Run `npm start`
4. Browser opens automatically at `http://localhost:3000`
5. The dashboard loads with default data

### Initial Setup
- **Dark Mode:** Click the moon/sun icon in the navbar
- **Sidebar:** Click the menu icon to toggle sidebar
- **Search:** Use the search bar to find stocks quickly

---

## Navigation

### Navbar (Top Bar)
- **Menu Icon (☰):** Toggle sidebar visibility
- **Logo & Title:** Indian Stock Market branding
- **Search Bar:** Quick stock search (desktop)
- **Time Display:** Current time and date
- **Market Status:** Live/Closed indicator
- **Notifications (🔔):** Alert notifications
- **Theme Toggle (🌙/☀️):** Switch dark/light mode
- **User Profile:** Account settings

### Sidebar (Left Panel)
**Main Menu:**
1. 📊 Dashboard - Market overview
2. 💼 Portfolio - Your investments
3. ⭐ Watchlist - Favorite stocks
4. 📈 Market Overview - Indices & sectors
5. 📊 Analytics - Advanced insights
6. ⚖️ Compare Stocks - Side-by-side comparison
7. 🔔 Price Alerts - Custom alerts
8. 🧮 Calculators - Investment tools
9. 📰 Market News - Latest updates

**Bottom Menu:**
- ⚙️ Settings
- ❓ Help & Support

---

## Feature Walkthroughs

### 1. Dashboard 📊

**What You See:**
- 4 stat cards showing key market metrics
- Interactive NIFTY 50 chart
- Top 5 gainers (green cards)
- Top 5 losers (red cards)
- Trending stocks section

**How to Use:**
1. View real-time market indices at the top
2. Click timeframe buttons (1D, 1W, 1M, etc.) on chart
3. Click any stock card to view detailed information
4. Prices update automatically every 3 seconds

**Pro Tips:**
- Hover over chart to see exact values
- Green = gaining stocks, Red = losing stocks
- Click stock symbols for full details

---

### 2. Portfolio Management 💼

**Setting Up Your Portfolio:**

1. **Add Your First Holding:**
   - Click "Add Holding" button
   - Enter stock symbol (e.g., RELIANCE)
   - Enter quantity (number of shares)
   - Enter buy price (₹)
   - Select buy date
   - Click "Add Holding"

2. **View Portfolio Stats:**
   - **Total Invested:** Your initial investment
   - **Current Value:** Today's portfolio worth
   - **Total Gain/Loss:** Profit or loss amount
   - **Today's Change:** Daily movement

3. **Analyze Allocation:**
   - Pie chart shows portfolio distribution
   - Each stock has a different color
   - Percentages show allocation

4. **Track Performance:**
   - Best Performer card (highest ROE)
   - Worst Performer card (needs attention)
   - Holdings table with all details

5. **Manage Holdings:**
   - ✏️ Edit icon to modify holding
   - 🗑️ Trash icon to remove holding
   - All changes save automatically

**Understanding the Table:**
- **Qty:** Number of shares owned
- **Avg. Price:** Your purchase price
- **Current Price:** Live market price
- **Invested:** Total money invested
- **Current Value:** Today's worth
- **Gain/Loss:** Profit/loss with percentage

---

### 3. Watchlist ⭐

**Adding Stocks:**
1. Click "Add Stock" button
2. Type stock symbol in the input field
3. Stock appears in your watchlist
4. Saved automatically

**Watchlist Cards Show:**
- Stock symbol and name
- Current price (large)
- Change percentage (color-coded)
- Day high and day low
- Action buttons (view/remove)

**Quick Actions:**
- 👁️ Eye icon: View stock details
- 🗑️ Trash icon: Remove from watchlist

---

### 4. Market News 📰

**Finding News:**
1. Use search bar to find specific topics
2. Click category buttons to filter:
   - All News
   - Market
   - Earnings
   - Sector
   - Economy
   - Regulation

**News Cards Include:**
- Category tag (colored)
- Time posted (relative)
- Headline (clickable)
- Summary text
- Source name
- Sentiment badge (positive/negative/neutral)
- "Read more" link

**Pro Tips:**
- Green badge = Positive news
- Red badge = Negative news
- Gray badge = Neutral news

---

### 5. Price Alerts 🔔

**Creating an Alert:**
1. Click "Create Alert" button
2. Select stock from dropdown
3. Choose condition:
   - "Price goes above" - for target selling
   - "Price goes below" - for buying opportunity
4. Enter target price
5. Click "Create Alert"

**Alert Dashboard Shows:**
- Total alerts count
- Active alerts (monitoring)
- Triggered alerts (target reached)
- Near target alerts (90%+ progress)

**Alert Cards Display:**
- Stock symbol and name
- Condition and target price
- Current price
- Distance to target
- Progress bar (visual indicator)
- Created date

**When Alert Triggers:**
- Green banner appears at top
- Shows triggered price
- Dismiss button to acknowledge

**Color Coding:**
- 🔵 Blue border: Active, far from target
- 🟡 Yellow border: Near target (90%+)
- 🟢 Green border: Triggered!

---

### 6. Advanced Analytics 📊

**Market Metrics:**
- Total Market Cap
- Average Daily Volume
- Advance/Decline Ratio
- Volatility Index
- FII/DII Activity

**Market Trend Chart:**
- Shows NIFTY 50 and SENSEX together
- Select timeframe: 1W, 1M, 3M, 6M, 1Y
- Hover for exact values

**Volume Analysis:**
- Bar chart of top 8 stocks by volume
- Helps identify high-activity stocks

**Sector Performance:**
- Bar chart showing sector returns
- Table with detailed metrics
- Positive/negative indicators

**Market Insights:**
- Sentiment gauge (Bullish/Bearish)
- Best performing sector
- Market strength indicator

---

### 7. Stock Comparison ⚖️

**Comparing Stocks:**

1. **Add Stocks (up to 4):**
   - Type in the search box
   - Click stock from dropdown
   - Each stock gets a unique color

2. **Remove Stocks:**
   - Click X button on stock chip

3. **View Comparisons:**
   - **Price Cards:** Current prices side-by-side
   - **Fundamentals Chart:** Bar chart comparing metrics
   - **Radar Chart:** Visual performance comparison
   - **Detailed Table:** All metrics in rows

4. **Winner Analysis:**
   - Best Value: Lowest P/E ratio
   - Best Returns: Highest ROE
   - Best Dividend: Highest dividend yield

**Metrics Compared:**
- Current Price
- Market Cap
- P/E Ratio
- EPS (Earnings Per Share)
- Dividend Yield
- ROE (Return on Equity)
- Debt/Equity Ratio

---

### 8. Stock Calculators 🧮

#### SIP Calculator
**Purpose:** Plan monthly investments

**Inputs:**
- Monthly Investment: ₹500 - ₹100,000
- Expected Return: 1% - 30% per year
- Time Period: 1 - 30 years

**Outputs:**
- Total Investment
- Expected Returns
- Future Value

**Example:**
- Invest ₹10,000/month
- At 12% return
- For 10 years
- = ₹23.23 lakhs

#### Lumpsum Calculator
**Purpose:** One-time investment returns

**Inputs:**
- Investment Amount
- Expected Return Rate
- Time Period

**Outputs:**
- Investment Amount
- Expected Returns
- Future Value

#### Target Calculator
**Purpose:** Achieve financial goals

**Inputs:**
- Target Amount (goal)
- Current Amount (if any)
- Expected Return Rate
- Time Period

**Outputs:**
- Monthly SIP Required
- Current Investment Growth
- Gap to Target
- Achievability Status

#### Profit/Loss Calculator
**Purpose:** Calculate trading P/L

**Inputs:**
- Buy Price per share
- Sell Price per share
- Quantity of shares
- Brokerage percentage

**Outputs:**
- Buy Value
- Sell Value
- Brokerage Cost
- Net Profit/Loss
- P/L Percentage

**Pro Tip:** Use sliders for quick adjustments!

---

### 9. Market Overview 📈

**Market Stats:**
- Total Market Cap
- Advances (gaining stocks)
- Declines (losing stocks)
- Active Stocks

**Major Indices:**
- NIFTY 50
- SENSEX
- NIFTY BANK
- NIFTY IT
- NIFTY PHARMA
- NIFTY AUTO

**Sector Performance:**
8 major sectors with:
- Sector icon
- Performance percentage
- Number of stocks
- Clickable cards

**Market Breadth:**
- Visual progress bar
- Advances vs Declines ratio
- Unchanged stocks count

---

### 10. Stock Details 💡

**Accessing Details:**
- Click any stock from Dashboard
- Click eye icon in Watchlist
- Search and select stock

**Information Displayed:**

1. **Header:**
   - Stock symbol (large)
   - Company name
   - Star icon (add to watchlist)
   - Bell icon (set alert)
   - Share icon

2. **Price Section:**
   - Current Price (large)
   - Change percentage (colored)
   - Open, High, Low, Volume

3. **Interactive Chart:**
   - Multiple timeframes
   - Real-time updates
   - Hover for details

4. **Key Fundamentals:**
   - Market Cap
   - P/E Ratio
   - EPS
   - Book Value
   - Dividend Yield
   - Face Value
   - 52-Week High/Low

5. **Company Information:**
   - Sector & Industry
   - Number of Employees
   - Founded Year
   - CEO Name
   - Headquarters Location

6. **About Section:**
   - Company description
   - Business overview

7. **Action Buttons:**
   - 🟢 Buy (green)
   - 🔴 Sell (red)
   - Add to Portfolio (gray)

---

## Tips & Tricks

### Performance Tips
1. **Close unused tabs** for better performance
2. **Refresh page** if data seems stuck
3. **Clear browser cache** if issues persist

### Data Management
1. **Portfolio & Watchlist** save automatically
2. **Export data** (coming soon)
3. **Backup localStorage** for safety

### Best Practices
1. **Set realistic alerts** to avoid spam
2. **Diversify portfolio** across sectors
3. **Use calculators** before investing
4. **Check news** before trading
5. **Compare stocks** before buying

### Hidden Features
1. **Double-click** chart for fullscreen (coming soon)
2. **Ctrl+K** for quick search (coming soon)
3. **Drag to reorder** watchlist (coming soon)

---

## Keyboard Shortcuts

### Navigation (Coming Soon)
- `Ctrl + D` - Dashboard
- `Ctrl + P` - Portfolio
- `Ctrl + W` - Watchlist
- `Ctrl + N` - News
- `Ctrl + K` - Search
- `Ctrl + /` - Help

### Actions (Coming Soon)
- `Esc` - Close modals
- `Enter` - Confirm actions
- `Tab` - Navigate forms
- `Space` - Toggle checkboxes

---

## Troubleshooting

### Common Issues

**Problem: App won't start**
- Solution: Run `npm install` first
- Check Node.js version (v14+)
- Delete `node_modules` and reinstall

**Problem: Prices not updating**
- Solution: Check internet connection
- Refresh the page
- Clear browser cache

**Problem: Dark mode not saving**
- Solution: Enable browser localStorage
- Check browser settings
- Try incognito mode to test

**Problem: Charts not displaying**
- Solution: Update browser to latest version
- Enable JavaScript
- Disable ad blockers

**Problem: Data lost after refresh**
- Solution: Check localStorage is enabled
- Don't use incognito mode
- Export data regularly (when available)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance Issues
If app is slow:
1. Close other browser tabs
2. Disable browser extensions
3. Clear browser cache
4. Restart browser
5. Check system resources

---

## Getting Help

### Resources
- 📖 README.md - Setup instructions
- 🚀 FEATURES.md - Complete feature list
- 📧 Support - (Add your email)
- 🐛 Issues - GitHub Issues page

### Community
- Discord Server (coming soon)
- Reddit Community (coming soon)
- Twitter Updates (coming soon)

---

## Updates & Changelog

### Current Version: 1.0.0
- ✅ All core features implemented
- ✅ Dark mode support
- ✅ Real-time updates
- ✅ Responsive design

### Coming Soon
- 🔄 Real API integration
- 📱 Mobile app
- 🔔 Email notifications
- 📊 More chart types
- 🤖 AI insights

---

**Happy Trading! 📈💰**

*Remember: This is a demo application. Always do your own research before making investment decisions.*
