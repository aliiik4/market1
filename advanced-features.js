// ============================================
// سیستم هوش مصنوعی برای تحلیل بازار
// ============================================

class AICryptoAnalyst {
    constructor() {
        this.analysisHistory = [];
        this.marketSentiment = 'neutral';
        this.trendIndicators = {
            btcDominance: 0,
            fearGreedIndex: 50,
            volumeChange: 0
        };
    }

    async analyzeMarket(coinsData) {
        const analysis = {
            timestamp: new Date().toISOString(),
            totalCoins: coinsData.length,
            marketCapTotal: 0,
            averageChange24h: 0,
            topPerformer: null,
            worstPerformer: null,
            volatilityScore: 0,
            recommendations: []
        };

        // محاسبات پیشرفته
        let totalMarketCap = 0;
        let totalChange = 0;
        let changes = [];
        let volumes = [];

        coinsData.forEach(coin => {
            totalMarketCap += coin.market_cap;
            totalChange += coin.price_change_percentage_24h;
            changes.push(Math.abs(coin.price_change_percentage_24h));
            volumes.push(coin.total_volume);
            
            if (!analysis.topPerformer || coin.price_change_percentage_24h > analysis.topPerformer.price_change_percentage_24h) {
                analysis.topPerformer = coin;
            }
            if (!analysis.worstPerformer || coin.price_change_percentage_24h < analysis.worstPerformer.price_change_percentage_24h) {
                analysis.worstPerformer = coin;
            }
        });

        analysis.marketCapTotal = totalMarketCap;
        analysis.averageChange24h = totalChange / coinsData.length;
        
        // محاسبه نوسان (Volatility)
        const avgChange = changes.reduce((a, b) => a + b) / changes.length;
        const variance = changes.map(c => Math.pow(c - avgChange, 2)).reduce((a, b) => a + b) / changes.length;
        analysis.volatilityScore = Math.sqrt(variance);

        // محاسبه شاخص ترس و طمع
        analysis.fearGreedIndex = this.calculateFearGreedIndex(coinsData);
        
        // تحلیل تکنیکال
        analysis.technicalAnalysis = this.technicalAnalysis(coinsData);
        
        // تولید توصیه‌ها
        analysis.recommendations = this.generateRecommendations(analysis);
        
        // پیش‌بینی کوتاه مدت
        analysis.shortTermPrediction = this.generateShortTermPrediction(coinsData);
        
        // تحلیل روند
        analysis.trendAnalysis = this.analyzeTrends(coinsData);

        this.analysisHistory.push(analysis);
        this.saveAnalysis(analysis);
        
        return analysis;
    }

    calculateFearGreedIndex(coinsData) {
        let index = 50; // نقطه شروع خنثی
        
        // محاسبه بر اساس فاکتورها
        const avgChange = coinsData.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / coinsData.length;
        const positiveCoins = coinsData.filter(coin => coin.price_change_percentage_24h > 0).length;
        const ratio = positiveCoins / coinsData.length;
        
        // تنظیم شاخص بر اساس داده‌ها
        if (avgChange > 5) index += 25;
        else if (avgChange > 2) index += 15;
        else if (avgChange < -5) index -= 25;
        else if (avgChange < -2) index -= 15;
        
        if (ratio > 0.7) index += 20;
        else if (ratio < 0.3) index -= 20;
        
        // محدود کردن بین 0 تا 100
        return Math.max(0, Math.min(100, index));
    }

    technicalAnalysis(coinsData) {
        const analysis = {
            supportLevels: [],
            resistanceLevels: [],
            movingAverages: {},
            rsiValues: {},
            macdSignals: {}
        };

        // تحلیل ۱۰ رمزارز برتر
        const topCoins = coinsData.slice(0, 10);
        
        topCoins.forEach(coin => {
            // محاسبه سطوح حمایت و مقاومت
            const currentPrice = coin.current_price;
            const high24h = coin.high_24h;
            const low24h = coin.low_24h;
            
            // سطوح حمایت
            const support1 = currentPrice * 0.95;
            const support2 = currentPrice * 0.90;
            
            // سطوح مقاومت
            const resistance1 = currentPrice * 1.05;
            const resistance2 = currentPrice * 1.10;
            
            analysis.supportLevels.push({
                symbol: coin.symbol.toUpperCase(),
                level1: support1,
                level2: support2
            });
            
            analysis.resistanceLevels.push({
                symbol: coin.symbol.toUpperCase(),
                level1: resistance1,
                level2: resistance2
            });

            // محاسبه RSI ساده
            const change = coin.price_change_percentage_24h;
            analysis.rsiValues[coin.symbol] = this.calculateSimpleRSI(change);
        });

        return analysis;
    }

    calculateSimpleRSI(change) {
        // محاسبه RSI ساده شده
        if (change > 10) return 70; // Overbought
        if (change > 5) return 60;
        if (change > 0) return 55;
        if (change > -5) return 45;
        if (change > -10) return 40;
        return 30; // Oversold
    }

    generateRecommendations(analysis) {
        const recommendations = [];
        
        if (analysis.averageChange24h > 3) {
            recommendations.push({
                type: 'warning',
                message: '⚠️ بازار در وضعیت گرم - مراقب اصلاح قیمت باشید',
                action: 'consider_taking_profits'
            });
        } else if (analysis.averageChange24h < -3) {
            recommendations.push({
                type: 'opportunity',
                message: '💡 بازار در وضعیت اصلاح - فرصت خرید احتمالی',
                action: 'research_buying_opportunities'
            });
        }

        if (analysis.volatilityScore > 15) {
            recommendations.push({
                type: 'warning',
                message: '📊 نوسان بالا - ریسک معاملات افزایش یافته',
                action: 'reduce_position_size'
            });
        }

        if (analysis.fearGreedIndex > 70) {
            recommendations.push({
                type: 'danger',
                message: '😨 شاخص طمع بالا - احتمال اصلاح بازار',
                action: 'be_cautious'
            });
        } else if (analysis.fearGreedIndex < 30) {
            recommendations.push({
                type: 'opportunity',
                message: '📈 شاخص ترس بالا - فرصت‌های خرید',
                action: 'accumulate_quality_assets'
            });
        }

        return recommendations;
    }

    generateShortTermPrediction(coinsData) {
        const btc = coinsData.find(coin => coin.symbol === 'btc');
        const eth = coinsData.find(coin => coin.symbol === 'eth');
        
        if (!btc || !eth) return null;

        const prediction = {
            timeframe: '24 ساعت آینده',
            btc: {
                direction: btc.price_change_percentage_24h > 0 ? 'صعودی' : 'نزولی',
                confidence: Math.min(80, Math.abs(btc.price_change_percentage_24h) * 3),
                target: btc.current_price * (1 + (btc.price_change_percentage_24h / 100) * 0.7)
            },
            eth: {
                direction: eth.price_change_percentage_24h > 0 ? 'صعودی' : 'نزولی',
                confidence: Math.min(80, Math.abs(eth.price_change_percentage_24h) * 3),
                target: eth.current_price * (1 + (eth.price_change_percentage_24h / 100) * 0.7)
            },
            marketOutlook: this.getMarketOutlook(coinsData)
        };

        return prediction;
    }

    getMarketOutlook(coinsData) {
        const positive = coinsData.filter(c => c.price_change_percentage_24h > 0).length;
        const ratio = positive / coinsData.length;
        
        if (ratio > 0.7) return 'قوی صعودی 📈';
        if (ratio > 0.55) return 'صعودی ↗️';
        if (ratio > 0.45) return 'خنثی ➡️';
        if (ratio > 0.3) return 'نزولی ↘️';
        return 'قوی نزولی 📉';
    }

    analyzeTrends(coinsData) {
        const trends = {
            dominanceShift: false,
            sectorPerformance: {},
            emergingTrends: []
        };

        // تحلیل تسلط
        const btc = coinsData.find(c => c.symbol === 'btc');
        const eth = coinsData.find(c => c.symbol === 'eth');
        
        if (btc && eth) {
            const btcDominance = btc.market_cap / (btc.market_cap + eth.market_cap) * 100;
            trends.dominanceShift = btcDominance > 50 ? 'بیت‌کوین' : 'اتریوم';
        }

        // شناسایی روندهای نوظهور
        const gainers = coinsData
            .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
            .slice(0, 5);
            
        gainers.forEach(coin => {
            if (coin.price_change_percentage_24h > 15) {
                trends.emergingTrends.push({
                    symbol: coin.symbol.toUpperCase(),
                    name: coin.name,
                    gain: coin.price_change_percentage_24h.toFixed(2) + '%',
                    potential: 'بالا'
                });
            }
        });

        return trends;
    }

    saveAnalysis(analysis) {
        const saved = JSON.parse(localStorage.getItem('ai_analysis_history') || '[]');
        saved.push(analysis);
        if (saved.length > 50) saved.shift(); // نگهداری فقط ۵۰ تحلیل اخیر
        localStorage.setItem('ai_analysis_history', JSON.stringify(saved));
    }

    getAnalysisHistory() {
        return JSON.parse(localStorage.getItem('ai_analysis_history') || '[]');
    }

    generatePortfolioAdvice(portfolio) {
        const advice = {
            diversificationScore: 0,
            riskAssessment: 'متوسط',
            rebalancingSuggestions: [],
            performanceProjection: {}
        };

        // محاسبه امتیاز تنوع
        const coinsCount = Object.keys(portfolio).length;
        advice.diversificationScore = Math.min(100, coinsCount * 20);

        // ارزیابی ریسک
        if (coinsCount < 3) advice.riskAssessment = 'بالا';
        else if (coinsCount < 6) advice.riskAssessment = 'متوسط';
        else advice.riskAssessment = 'پایین';

        return advice;
    }
}

// ============================================
// سیستم مدیریت پرتفوی
// ============================================

class PortfolioManager {
    constructor() {
        this.portfolio = this.loadPortfolio();
        this.transactionHistory = this.loadTransactions();
    }

    loadPortfolio() {
        return JSON.parse(localStorage.getItem('crypto_portfolio') || '{}');
    }

    loadTransactions() {
        return JSON.parse(localStorage.getItem('portfolio_transactions') || '[]');
    }

    addCoin(coinId, amount, buyPrice) {
        const transaction = {
            id: Date.now(),
            type: 'BUY',
            coinId,
            amount,
            price: buyPrice,
            total: amount * buyPrice,
            timestamp: new Date().toISOString(),
            notes: ''
        };

        if (!this.portfolio[coinId]) {
            this.portfolio[coinId] = {
                totalAmount: 0,
                averagePrice: 0,
                totalInvested: 0
            };
        }

        const coin = this.portfolio[coinId];
        const totalValue = coin.totalAmount * coin.averagePrice + transaction.total;
        coin.totalAmount += amount;
        coin.averagePrice = totalValue / coin.totalAmount;
        coin.totalInvested += transaction.total;

        this.transactionHistory.push(transaction);
        this.savePortfolio();
        this.saveTransactions();

        return transaction;
    }

    removeCoin(coinId, amount, sellPrice) {
        if (!this.portfolio[coinId] || this.portfolio[coinId].totalAmount < amount) {
            throw new Error('مقدار کافی از این رمزارز در پرتفوی وجود ندارد');
        }

        const transaction = {
            id: Date.now(),
            type: 'SELL',
            coinId,
            amount,
            price: sellPrice,
            total: amount * sellPrice,
            timestamp: new Date().toISOString(),
            profitLoss: (sellPrice - this.portfolio[coinId].averagePrice) * amount
        };

        this.portfolio[coinId].totalAmount -= amount;
        if (this.portfolio[coinId].totalAmount === 0) {
            delete this.portfolio[coinId];
        }

        this.transactionHistory.push(transaction);
        this.savePortfolio();
        this.saveTransactions();

        return transaction;
    }

    async calculatePortfolioValue(currentPrices) {
        let totalValue = 0;
        let totalInvested = 0;
        const coins = [];

        for (const [coinId, data] of Object.entries(this.portfolio)) {
            const currentPrice = currentPrices[coinId] || 0;
            const currentValue = data.totalAmount * currentPrice;
            const profitLoss = currentValue - data.totalInvested;
            const profitLossPercentage = (profitLoss / data.totalInvested) * 100;

            coins.push({
                coinId,
                amount: data.totalAmount,
                averagePrice: data.averagePrice,
                currentPrice,
                currentValue,
                invested: data.totalInvested,
                profitLoss,
                profitLossPercentage
            });

            totalValue += currentValue;
            totalInvested += data.totalInvested;
        }

        const totalProfitLoss = totalValue - totalInvested;
        const totalProfitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

        return {
            totalValue,
            totalInvested,
            totalProfitLoss,
            totalProfitLossPercentage,
            coins,
            performance: this.calculatePerformanceMetrics()
        };
    }

    calculatePerformanceMetrics() {
        const metrics = {
            sharpeRatio: 0,
            volatility: 0,
            maxDrawdown: 0,
            winRate: 0
        };

        // محاسبات ساده شده
        if (this.transactionHistory.length > 0) {
            const profitableTrades = this.transactionHistory.filter(t => t.profitLoss > 0);
            metrics.winRate = (profitableTrades.length / this.transactionHistory.length) * 100;
        }

        return metrics;
    }

    savePortfolio() {
        localStorage.setItem('crypto_portfolio', JSON.stringify(this.portfolio));
    }

    saveTransactions() {
        localStorage.setItem('portfolio_transactions', JSON.stringify(this.transactionHistory));
    }

    exportPortfolio() {
        const data = {
            portfolio: this.portfolio,
            transactions: this.transactionHistory,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio_export_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importPortfolio(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.portfolio = data.portfolio || {};
            this.transactionHistory = data.transactions || [];
            this.savePortfolio();
            this.saveTransactions();
            return true;
        } catch (error) {
            console.error('خطا در وارد کردن پرتفوی:', error);
            return false;
        }
    }
}

// ============================================
// سیستم هشدار و نوتیفیکیشن
// ============================================

class AlertSystem {
    constructor() {
        this.alerts = this.loadAlerts();
        this.notificationPermission = Notification.permission;
        this.checkAlertsInterval = null;
    }

    loadAlerts() {
        return JSON.parse(localStorage.getItem('price_alerts') || '[]');
    }

    createAlert(coinId, condition, value, notificationType = 'browser') {
        const alert = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            coinId,
            condition, // 'above', 'below', 'change_up', 'change_down'
            value,
            notificationType,
            active: true,
            createdAt: new Date().toISOString(),
            triggered: false,
            triggeredAt: null
        };

        this.alerts.push(alert);
        this.saveAlerts();
        return alert;
    }

    async checkAlerts(currentPrices, priceChanges) {
        const triggeredAlerts = [];

        for (const alert of this.alerts) {
            if (!alert.active || alert.triggered) continue;

            const currentPrice = currentPrices[alert.coinId];
            if (!currentPrice) continue;

            let triggered = false;
            const priceChange = priceChanges[alert.coinId] || 0;

            switch (alert.condition) {
                case 'above':
                    triggered = currentPrice >= alert.value;
                    break;
                case 'below':
                    triggered = currentPrice <= alert.value;
                    break;
                case 'change_up':
                    triggered = priceChange >= alert.value;
                    break;
                case 'change_down':
                    triggered = priceChange <= alert.value;
                    break;
            }

            if (triggered) {
                alert.triggered = true;
                alert.triggeredAt = new Date().toISOString();
                triggeredAlerts.push(alert);
                
                await this.sendNotification(alert, currentPrice, priceChange);
            }
        }

        if (triggeredAlerts.length > 0) {
            this.saveAlerts();
            this.showAlertSummary(triggeredAlerts);
        }

        return triggeredAlerts;
    }

    async sendNotification(alert, currentPrice, priceChange) {
        const title = `🚨 هشدار قیمت فعال شد!`;
        const body = this.generateAlertMessage(alert, currentPrice, priceChange);

        // Browser Notification
        if (this.notificationPermission === 'granted') {
            new Notification(title, {
                body,
                icon: '/icon.png',
                badge: '/badge.png'
            });
        }

        // درون‌برنامه‌ای
        this.showInAppNotification(title, body);
    }

    generateAlertMessage(alert, currentPrice, priceChange) {
        const coinName = alert.coinId.toUpperCase();
        const conditionMap = {
            'above': 'بالاتر از',
            'below': 'پایین‌تر از',
            'change_up': 'رشد بیشتر از',
            'change_down': 'افت بیشتر از'
        };

        return `${coinName} به ${currentPrice.toLocaleString()} دلار رسید (${conditionMap[alert.condition]} ${alert.value}${alert.condition.includes('change') ? '%' : '$'})`;
    }

    showInAppNotification(title, body) {
        const notification = document.createElement('div');
        notification.className = 'alert-notification';
        notification.innerHTML = `
            <div class="alert-header">
                <i data-lucide="bell-ring"></i>
                <h4>${title}</h4>
                <button class="close-alert">&times;</button>
            </div>
            <div class="alert-body">
                <p>${body}</p>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 99999;
            max-width: 400px;
            animation: slideInLeft 0.5s ease;
        `;

        document.body.appendChild(notification);

        // آیکون‌ها
        lucide.createIcons();

        // بسته شدن خودکار
        setTimeout(() => {
            notification.style.animation = 'slideOutLeft 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 5000);

        // بسته شدن دستی
        notification.querySelector('.close-alert').addEventListener('click', () => {
            notification.remove();
        });
    }

    showAlertSummary(alerts) {
        const summary = document.createElement('div');
        summary.className = 'alert-summary';
        summary.innerHTML = `
            <div class="summary-header">
                <i data-lucide="alert-triangle"></i>
                <h4>${alerts.length} هشدار فعال شد</h4>
            </div>
            <div class="summary-list">
                ${alerts.map(alert => `
                    <div class="alert-item">
                        <strong>${alert.coinId.toUpperCase()}</strong>
                        <span>${this.generateAlertMessage(alert, 0, 0)}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // استایل و اضافه کردن به صفحه
        // (کد استایل مشابه showInAppNotification)
    }

    saveAlerts() {
        localStorage.setItem('price_alerts', JSON.stringify(this.alerts));
    }

    startMonitoring(interval = 30000) {
        if (this.checkAlertsInterval) {
            clearInterval(this.checkAlertsInterval);
        }
        
        this.checkAlertsInterval = setInterval(async () => {
            // این تابع باید توسط اپلیکیشن اصلی فراخوانی شود
            // با داده‌های فعلی قیمت‌ها
        }, interval);
    }

    stopMonitoring() {
        if (this.checkAlertsInterval) {
            clearInterval(this.checkAlertsInterval);
            this.checkAlertsInterval = null;
        }
    }
}

// ============================================
// سیستم گزارش‌گیری پیشرفته
// ============================================

class AdvancedReporting {
    constructor() {
        this.reportTemplates = {
            daily: this.generateDailyReport,
            weekly: this.generateWeeklyReport,
            monthly: this.generateMonthlyReport,
            portfolio: this.generatePortfolioReport
        };
    }

    async generateDailyReport(data) {
        const report = {
            title: 'گزارش روزانه بازار رمزارزها',
            date: new Date().toLocaleDateString('fa-IR'),
            executiveSummary: '',
            marketOverview: {},
            topPerformers: [],
            technicalAnalysis: {},
            recommendations: []
        };

        // جمع‌آوری داده‌ها
        const totalMarketCap = data.reduce((sum, coin) => sum + coin.market_cap, 0);
        const totalVolume = data.reduce((sum, coin) => sum + coin.total_volume, 0);
        const avgChange = data.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / data.length;

        report.marketOverview = {
            totalMarketCap: this.formatCurrency(totalMarketCap),
            totalVolume: this.formatCurrency(totalVolume),
            averageChange: avgChange.toFixed(2) + '%',
            fearGreedIndex: this.calculateFearGreedIndex(data)
        };

        // بهترین‌ها
        report.topPerformers = data
            .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
            .slice(0, 5)
            .map(coin => ({
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                price: `$${coin.current_price.toLocaleString()}`,
                change: coin.price_change_percentage_24h.toFixed(2) + '%',
                volume: `$${(coin.total_volume / 1000000).toFixed(2)}M`
            }));

        // تحلیل تکنیکال
        report.technicalAnalysis = this.performTechnicalAnalysis(data);

        // جمع‌بندی
        report.executiveSummary = this.generateExecutiveSummary(report);
        report.recommendations = this.generateReportRecommendations(report);

        return report;
    }

    formatCurrency(value) {
        if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
        return `$${value.toLocaleString()}`;
    }

    calculateFearGreedIndex(data) {
        // محاسبات پیچیده‌تر از تحلیلگر ساده
        let score = 50;
        
        const avgChange = data.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / data.length;
        const positiveRatio = data.filter(c => c.price_change_percentage_24h > 0).length / data.length;
        const volatility = this.calculateVolatility(data);
        
        // وزن‌دهی عوامل
        score += avgChange * 2;
        score += (positiveRatio - 0.5) * 40;
        score -= volatility * 0.5;
        
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    calculateVolatility(data) {
        const changes = data.map(c => Math.abs(c.price_change_percentage_24h));
        const mean = changes.reduce((a, b) => a + b) / changes.length;
        const variance = changes.map(c => Math.pow(c - mean, 2)).reduce((a, b) => a + b) / changes.length;
        return Math.sqrt(variance);
    }

    performTechnicalAnalysis(data) {
        const analysis = {
            trend: this.determineMarketTrend(data),
            supportResistance: this.calculateSupportResistance(data),
            indicators: this.calculateTechnicalIndicators(data),
            marketCycles: this.analyzeMarketCycles(data)
        };
        return analysis;
    }

    determineMarketTrend(data) {
        const btc = data.find(c => c.symbol === 'btc');
        const eth = data.find(c => c.symbol === 'eth');
        
        if (!btc || !eth) return 'نامشخص';
        
        const btcTrend = btc.price_change_percentage_24h > 2 ? 'صعودی' : btc.price_change_percentage_24h < -2 ? 'نزولی' : 'خنثی';
        const ethTrend = eth.price_change_percentage_24h > 2 ? 'صعودی' : eth.price_change_percentage_24h < -2 ? 'نزولی' : 'خنثی';
        
        if (btcTrend === 'صعودی' && ethTrend === 'صعودی') return 'صعودی قوی';
        if (btcTrend === 'نزولی' && ethTrend === 'نزولی') return 'نزولی قوی';
        return 'متلاطم';
    }

    generateExecutiveSummary(report) {
        const { marketOverview, topPerformers } = report;
        
        let summary = `بازار رمزارزها در 24 ساعت گذشته `;
        
        if (marketOverview.averageChange.includes('-')) {
            summary += `با کاهش ${marketOverview.averageChange} مواجه شده است. `;
        } else {
            summary += `رشدی ${marketOverview.averageChange} را تجربه کرده است. `;
        }
        
        summary += `شاخص ترس و طمع در سطح ${marketOverview.fearGreedIndex} قرار دارد که نشان‌دهنده `;
        
        if (marketOverview.fearGreedIndex > 70) summary += 'حالت طمع شدید است. ';
        else if (marketOverview.fearGreedIndex > 55) summary += 'حالت طمع است. ';
        else if (marketOverview.fearGreedIndex > 45) summary += 'حالت خنثی است. ';
        else if (marketOverview.fearGreedIndex > 30) summary += 'حالت ترس است. ';
        else summary += 'حالت ترس شدید است. ';
        
        if (topPerformers.length > 0) {
            summary += `برترین عملکرد مربوط به ${topPerformers[0].name} با رشد ${topPerformers[0].change} بوده است.`;
        }
        
        return summary;
    }

    generateReportRecommendations(report) {
        const recommendations = [];
        const { marketOverview, technicalAnalysis } = report;
        
        if (marketOverview.fearGreedIndex > 75) {
            recommendations.push({
                priority: 'بالا',
                action: 'کاهش مواضع خرید',
                reason: 'بازار در منطقه بیش‌خرید قرار دارد'
            });
        }
        
        if (technicalAnalysis.trend === 'نزولی قوی') {
            recommendations.push({
                priority: 'متوسط',
                action: 'انتظار برای تأیید برگشت روند',
                reason: 'روند نزولی قوی حاکم است'
            });
        }
        
        return recommendations;
    }

    exportReportToPDF(report) {
        // پیاده‌سازی خروجی PDF با jsPDF
        console.log('خروجی PDF:', report);
        // در اینجا می‌توان از کتابخانه‌هایی مانند jsPDF استفاده کرد
    }

    exportReportToExcel(report) {
        // پیاده‌سازی خروجی Excel
        const data = [
            ['گزارش بازار رمزارزها', report.date],
            ['', ''],
            ['خلاصه اجرایی', report.executiveSummary],
            ['', ''],
            ['نمای کلی بازار', ''],
            ['ارزش کل بازار', report.marketOverview.totalMarketCap],
            ['حجم معاملات', report.marketOverview.totalVolume],
            ['میانگین تغییر', report.marketOverview.averageChange],
            ['شاخص ترس و طمع', report.marketOverview.fearGreedIndex],
            ['', ''],
            ['برترین عملکردها', '']
        ];
        
        // اضافه کردن داده‌های برترین‌ها
        report.topPerformers.forEach((performer, index) => {
            data.push([
                `${index + 1}. ${performer.name}`,
                `${performer.price} (${performer.change})`
            ]);
        });
        
        // ایجاد فایل Excel
        this.generateExcelFile(data, `گزارش_بازار_${Date.now()}.xlsx`);
    }

    generateExcelFile(data, filename) {
        // کد تولید فایل Excel با SheetJS
        console.log('ایجاد فایل Excel:', { data, filename });
    }
}

// ============================================
// اکسپورت کلاس‌ها
// ============================================

window.AICryptoAnalyst = AICryptoAnalyst;
window.PortfolioManager = PortfolioManager;
window.AlertSystem = AlertSystem;
window.AdvancedReporting = AdvancedReporting;

console.log('✅ سیستم‌های پیشرفته بارگذاری شدند');
