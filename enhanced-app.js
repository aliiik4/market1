class EnhancedCryptoApp extends CryptoApp {
    constructor() {
        super();
        this.aiAnalyst = new AICryptoAnalyst();
        this.portfolioManager = new PortfolioManager();
        this.alertSystem = new AlertSystem();
        this.reportingSystem = new AdvancedReporting();
        
        // ویژگی‌های جدید
        this.favorites = new Set(JSON.parse(localStorage.getItem('favorite_coins') || '[]'));
        this.watchlist = JSON.parse(localStorage.getItem('crypto_watchlist') || '[]');
        this.userPreferences = this.loadUserPreferences();
    }

    async init() {
        await super.init();
        
        // مقداردهی اولیه ویژگی‌های جدید
        this.initAdvancedUI();
        this.setupAdvancedEventListeners();
        this.startAdvancedFeatures();
        
        // شروع مانیتورینگ هشدارها
        this.alertSystem.startMonitoring(45000); // هر 45 ثانیه
    }

    initAdvancedUI() {
        // اضافه کردن بخش‌های جدید UI
        this.addAdvancedControls();
        this.createPortfolioModal();
        this.createAlertsModal();
        this.createAnalysisPanel();
    }

    addAdvancedControls() {
        const controls = document.querySelector('.control-buttons');
        
        const advancedButtons = `
            <button id="btnAIanalysis" class="btn-ai">
                <i data-lucide="brain"></i> تحلیل هوشمند
            </button>
            <button id="btnPortfolio" class="btn-portfolio">
                <i data-lucide="briefcase"></i> پرتفوی من
            </button>
            <button id="btnAlerts" class="btn-alerts">
                <i data-lucide="bell"></i> هشدارها
            </button>
            <button id="btnReports" class="btn-reports">
                <i data-lucide="file-text"></i> گزارش‌ها
            </button>
        `;
        
        controls.insertAdjacentHTML('beforeend', advancedButtons);
        
        // اضافه کردن استایل‌های جدید
        this.addAdvancedStyles();
    }

    addAdvancedStyles() {
        const styles = `
            .btn-ai {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .btn-portfolio {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
            }
            
            .btn-alerts {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
            }
            
            .btn-reports {
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                color: white;
            }
            
            .favorite-star {
                cursor: pointer;
                transition: all 0.3s ease;
                color: #ffd700;
            }
            
            .favorite-star:hover {
                transform: scale(1.2);
            }
            
            .advanced-panel {
                background: rgba(255, 255, 255, 0.98);
                border-radius: var(--border-radius);
                padding: 25px;
                margin-top: 25px;
                box-shadow: var(--box-shadow);
                border: 2px solid var(--primary-color);
            }
            
            .ai-analysis-result {
                background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                color: #333;
                padding: 20px;
                border-radius: 10px;
                margin: 15px 0;
            }
            
            .portfolio-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            
            .portfolio-item {
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            
            .modal-content {
                background: white;
                border-radius: var(--border-radius);
                padding: 30px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    setupAdvancedEventListeners() {
        // دکمه تحلیل هوشمند
        document.getElementById('btnAIanalysis').addEventListener('click', () => {
            this.runAIAnalysis();
        });

        // دکمه پرتفوی
        document.getElementById('btnPortfolio').addEventListener('click', () => {
            this.showPortfolioModal();
        });

        // دکمه هشدارها
        document.getElementById('btnAlerts').addEventListener('click', () => {
            this.showAlertsModal();
        });

        // دکمه گزارش‌ها
        document.getElementById('btnReports').addEventListener('click', () => {
            this.generateReport();
        });
    }

    async runAIAnalysis() {
        try {
            this.showToast('در حال تحلیل بازار با هوش مصنوعی...', 'info');
            
            const analysis = await this.aiAnalyst.analyzeMarket(this.currentData);
            
            // نمایش نتایج
            this.displayAIAnalysis(analysis);
            
            this.showToast('تحلیل هوش مصنوعی کامل شد', 'success');
        } catch (error) {
            console.error('خطا در تحلیل هوش مصنوعی:', error);
            this.showToast('خطا در تحلیل هوش مصنوعی', 'error');
        }
    }

    displayAIAnalysis(analysis) {
        const analysisHTML = `
            <div class="advanced-panel">
                <div class="panel-header">
                    <h3><i data-lucide="brain"></i> تحلیل هوشمند بازار</h3>
                    <small>${new Date(analysis.timestamp).toLocaleString('fa-IR')}</small>
                </div>
                
                <div class="ai-analysis-result">
                    <h4>📊 خلاصه بازار</h4>
                    <p>ارزش کل بازار: $${(analysis.marketCapTotal / 1e12).toFixed(2)} تریلیون</p>
                    <p>میانگین تغییر 24h: ${analysis.averageChange24h.toFixed(2)}%</p>
                    <p>شاخص ترس و طمع: ${analysis.fearGreedIndex} (${this.getFearGreedLabel(analysis.fearGreedIndex)})</p>
                    <p>ریسک نوسان: ${analysis.volatilityScore.toFixed(2)}</p>
                </div>
                
                <div class="recommendations">
                    <h4><i data-lucide="lightbulb"></i> توصیه‌های معاملاتی</h4>
                    ${analysis.recommendations.map(rec => `
                        <div class="recommendation ${rec.type}">
                            <strong>${rec.type === 'opportunity' ? '💡 فرصت' : '⚠️ هشدار'}:</strong>
                            ${rec.message}
                        </div>
                    `).join('')}
                </div>
                
                ${analysis.shortTermPrediction ? `
                    <div class="prediction">
                        <h4><i data-lucide="trending-up"></i> پیش‌بینی کوتاه‌مدت</h4>
                        <div class="prediction-grid">
                            <div class="prediction-item">
                                <strong>بیت‌کوین:</strong>
                                <span class="${analysis.shortTermPrediction.btc.direction === 'صعودی' ? 'positive' : 'negative'}">
                                    ${analysis.shortTermPrediction.btc.direction} 
                                    (${analysis.shortTermPrediction.btc.confidence.toFixed(0)}% اطمینان)
                                </span>
                            </div>
                            <div class="prediction-item">
                                <strong>اتریوم:</strong>
                                <span class="${analysis.shortTermPrediction.eth.direction === 'صعودی' ? 'positive' : 'negative'}">
                                    ${analysis.shortTermPrediction.eth.direction} 
                                    (${analysis.shortTermPrediction.eth.confidence.toFixed(0)}% اطمینان)
                                </span>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="trend-analysis">
                    <h4><i data-lucide="bar-chart-3"></i> تحلیل روندها</h4>
                    <p>وضعیت کلی: ${analysis.trendAnalysis.marketOutlook}</p>
                    ${analysis.trendAnalysis.emergingTrends.length > 0 ? `
                        <p>روندهای نوظهور:</p>
                        <ul>
                            ${analysis.trendAnalysis.emergingTrends.map(trend => `
                                <li>${trend.symbol} - رشد ${trend.gain}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
                
                <div class="creator-signature">
                    <hr>
                    <p style="text-align: center; margin-top: 15px; font-style: italic;">
                        <i data-lucide="sparkles"></i> تحلیل تولید شده توسط سیستم هوشمند علی
                    </p>
                </div>
            </div>
        `;
        
        // اضافه کردن به صفحه
        const contentSection = document.querySelector('.content');
        const existingAnalysis = contentSection.querySelector('.advanced-panel');
        if (existingAnalysis) {
            existingAnalysis.remove();
        }
        
        contentSection.insertAdjacentHTML('beforeend', analysisHTML);
        lucide.createIcons();
    }

    getFearGreedLabel(score) {
        if (score >= 75) return 'طمع شدید';
        if (score >= 55) return 'طمع';
        if (score >= 45) return 'خنثی';
        if (score >= 25) return 'ترس';
        return 'ترس شدید';
    }

    createPortfolioModal() {
        const modalHTML = `
            <div id="portfolioModal" class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i data-lucide="briefcase"></i> مدیریت پرتفوی</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="portfolio-controls">
                            <button id="btnAddToPortfolio" class="btn-primary">
                                <i data-lucide="plus"></i> افزودن رمزارز
                            </button>
                            <button id="btnExportPortfolio" class="btn-secondary">
                                <i data-lucide="download"></i> خروجی JSON
                            </button>
                            <button id="btnImportPortfolio" class="btn-secondary">
                                <i data-lucide="upload"></i> ورودی JSON
                            </button>
                        </div>
                        
                        <div id="portfolioSummary" class="portfolio-summary">
                            <!-- خلاصه پرتفوی اینجا نمایش داده می‌شود -->
                        </div>
                        
                        <div id="portfolioDetails">
                            <!-- جزئیات پرتفوی -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // اضافه کردن event listeners برای مودال
        document.getElementById('portfolioModal').querySelector('.close-modal').addEventListener('click', () => {
            this.hideModal('portfolioModal');
        });
        
        document.getElementById('btnAddToPortfolio').addEventListener('click', () => {
            this.showAddToPortfolioForm();
        });
        
        document.getElementById('btnExportPortfolio').addEventListener('click', () => {
            this.portfolioManager.exportPortfolio();
        });
    }

    async showPortfolioModal() {
        const modal = document.getElementById('portfolioModal');
        modal.style.display = 'flex';
        
        // بروزرسانی اطلاعات پرتفوی
        await this.updatePortfolioDisplay();
    }

    async updatePortfolioDisplay() {
        const summaryElement = document.getElementById('portfolioSummary');
        const detailsElement = document.getElementById('portfolioDetails');
        
        // محاسبه ارزش فعلی
        const prices = {};
        this.currentData.forEach(coin => {
            prices[coin.id] = coin.current_price;
        });
        
        const portfolioValue = await this.portfolioManager.calculatePortfolioValue(prices);
        
        // نمایش خلاصه
        summaryElement.innerHTML = `
            <div class="portfolio-item">
                <h4>ارزش کل پرتفوی</h4>
                <p class="total-value">$${portfolioValue.totalValue.toLocaleString()}</p>
            </div>
            <div class="portfolio-item">
                <h4>سود/زیان کل</h4>
                <p class="${portfolioValue.totalProfitLoss >= 0 ? 'positive' : 'negative'}">
                    $${portfolioValue.totalProfitLoss.toLocaleString()}
                    (${portfolioValue.totalProfitLossPercentage.toFixed(2)}%)
                </p>
            </div>
            <div class="portfolio-item">
                <h4>تعداد دارایی‌ها</h4>
                <p>${portfolioValue.coins.length} رمزارز</p>
            </div>
            <div class="portfolio-item">
                <h4>نرخ برد</h4>
                <p>${portfolioValue.performance.winRate.toFixed(1)}%</p>
            </div>
        `;
        
        // نمایش جزئیات
        if (portfolioValue.coins.length > 0) {
            detailsElement.innerHTML = `
                <h4>جزئیات دارایی‌ها</h4>
                <table class="portfolio-table">
                    <thead>
                        <tr>
                            <th>رمزارز</th>
                            <th>مقدار</th>
                            <th>میانگین قیمت</th>
                            <th>قیمت فعلی</th>
                            <th>ارزش فعلی</th>
                            <th>سود/زیان</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${portfolioValue.coins.map(coin => `
                            <tr>
                                <td>${coin.coinId.toUpperCase()}</td>
                                <td>${coin.amount.toFixed(6)}</td>
                                <td>$${coin.averagePrice.toFixed(2)}</td>
                                <td>$${coin.currentPrice.toLocaleString()}</td>
                                <td>$${coin.currentValue.toLocaleString()}</td>
                                <td class="${coin.profitLoss >= 0 ? 'positive' : 'negative'}">
                                    $${coin.profitLoss.toLocaleString()}
                                    (${coin.profitLossPercentage.toFixed(2)}%)
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            detailsElement.innerHTML = `
                <div class="empty-portfolio">
                    <i data-lucide="briefcase" style="font-size: 48px; opacity: 0.3;"></i>
                    <p>پرتفوی شما خالی است</p>
                    <button id="btnStartPortfolio" class="btn-primary">
                        شروع ساخت پرتفوی
                    </button>
                </div>
            `;
        }
        
        lucide.createIcons();
    }

    showAddToPortfolioForm() {
        // ایجاد فرم افزودن رمزارز به پرتفوی
        const formHTML = `
            <div class="add-portfolio-form">
                <h4>افزودن رمزارز به پرتفوی</h4>
                <select id="portfolioCoinSelect">
                    <option value="">انتخاب رمزارز...</option>
                    ${this.currentData.map(coin => `
                        <option value="${coin.id}" data-price="${coin.current_price}">
                            ${coin.name} (${coin.symbol.toUpperCase()}) - $${coin.current_price}
                        </option>
                    `).join('')}
                </select>
                <input type="number" id="portfolioAmount" placeholder="مقدار" step="0.000001" min="0.000001">
                <input type="number" id="portfolioPrice" placeholder="قیمت خرید (USD)" step="0.01" min="0.01">
                <textarea id="portfolioNotes" placeholder="یادداشت (اختیاری)"></textarea>
                <button id="btnConfirmAdd" class="btn-primary">افزودن</button>
            </div>
        `;
        
        // نمایش فرم
        // (کد نمایش مودال)
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    async generateReport() {
        try {
            const report = await this.reportingSystem.generateDailyReport(this.currentData);
            
            // نمایش گزارش
            this.displayReport(report);
            
            // گزینه‌های خروجی
            const exportOptions = `
                <div class="export-options">
                    <button onclick="app.exportReportAsPDF()" class="btn-secondary">
                        <i data-lucide="file-text"></i> خروجی PDF
                    </button>
                    <button onclick="app.exportReportAsExcel()" class="btn-secondary">
                        <i data-lucide="file-spreadsheet"></i> خروجی Excel
                    </button>
                    <button onclick="app.shareReport()" class="btn-secondary">
                        <i data-lucide="share-2"></i> اشتراک‌گذاری
                    </button>
                </div>
            `;
            
            // اضافه کردن گزینه‌های خروجی به گزارش
            const reportElement = document.querySelector('.report-container');
            reportElement.insertAdjacentHTML('beforeend', exportOptions);
            
        } catch (error) {
            console.error('خطا در تولید گزارش:', error);
            this.showToast('خطا در تولید گزارش', 'error');
        }
    }

    displayReport(report) {
        const reportHTML = `
            <div class="advanced-panel report-container">
                <div class="report-header">
                    <h3><i data-lucide="file-text"></i> ${report.title}</h3>
                    <p>تاریخ: ${report.date}</p>
                </div>
                
                <div class="executive-summary">
                    <h4>خلاصه اجرایی</h4>
                    <p>${report.executiveSummary}</p>
                </div>
                
                <div class="market-metrics">
                    <h4>شاخص‌های کلیدی بازار</h4>
                    <div class="metrics-grid">
                        ${Object.entries(report.marketOverview).map(([key, value]) => `
                            <div class="metric-item">
                                <span class="metric-label">${this.translateMetric(key)}</span>
                                <span class="metric-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="top-performers">
                    <h4>برترین عملکردهای بازار</h4>
                    <table class="performers-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>رمزارز</th>
                                <th>قیمت</th>
                                <th>تغییر</th>
                                <th>حجم</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${report.topPerformers.map((coin, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>
                                        <strong>${coin.symbol}</strong>
                                        <small>${coin.name}</small>
                                    </td>
                                    <td>${coin.price}</td>
                                    <td class="${coin.change.includes('-') ? 'negative' : 'positive'}">
                                        ${coin.change}
                                    </td>
                                    <td>${coin.volume}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="recommendations-section">
                    <h4>توصیه‌های معاملاتی</h4>
                    ${report.recommendations.length > 0 ? `
                        <ul class="recommendations-list">
                            ${report.recommendations.map(rec => `
                                <li class="recommendation-item ${rec.priority}">
                                    <span class="rec-priority">${rec.priority}</span>
                                    <span class="rec-action">${rec.action}</span>
                                    <span class="rec-reason">${rec.reason}</span>
                                </li>
                            `).join('')}
                        </ul>
                    ` : '<p>هیچ توصیه ویژه‌ای برای امروز وجود ندارد.</p>'}
                </div>
                
                <div class="report-footer">
                    <p>این گزارش توسط سیستم تحلیل حرفه‌ای رمزارز تولید شده است.</p>
                    <p class="signature">تحلیلگر: علی - ${new Date().toLocaleDateString('fa-IR')}</p>
                </div>
            </div>
        `;
        
        // اضافه کردن به صفحه
        const contentSection = document.querySelector('.content');
        const existingReport = contentSection.querySelector('.report-container');
        if (existingReport) {
            existingReport.remove();
        }
        
        contentSection.insertAdjacentHTML('beforeend', reportHTML);
    }

    translateMetric(key) {
        const translations = {
            'totalMarketCap': 'ارزش کل بازار',
            'totalVolume': 'حجم معاملات',
            'averageChange': 'میانگین تغییر',
            'fearGreedIndex': 'شاخص ترس و طمع'
        };
        return translations[key] || key;
    }

    exportReportAsPDF() {
        this.reportingSystem.exportReportToPDF(this.currentReport);
        this.showToast('گزارش در حال تولید PDF...', 'info');
    }

    exportReportAsExcel() {
        this.reportingSystem.exportReportToExcel(this.currentReport);
        this.showToast('گزارش در حال تولید Excel...', 'info');
    }

    shareReport() {
        if (navigator.share) {
            navigator.share({
                title: 'گزارش تحلیل بازار رمزارزها',
                text: 'گزارش کامل تحلیل بازار رمزارزها توسط سیستم تحلیل حرفه‌ای',
                url: window.location.href
            });
        } else {
            this.showToast('امکان اشتراک در مرورگر شما وجود ندارد', 'warning');
        }
    }

    startAdvancedFeatures() {
        // شروع ویژگی‌های پیشرفته
        this.checkAlertsPeriodically();
        this.updateAdvancedStats();
    }

    async checkAlertsPeriodically() {
        setInterval(async () => {
            try {
                // جمع‌آوری قیمت‌ها و تغییرات
                const prices = {};
                const changes = {};
                
                this.currentData.forEach(coin => {
                    prices[coin.id] = coin.current_price;
                    changes[coin.id] = coin.price_change_percentage_24h;
                });
                
                // بررسی هشدارها
                await this.alertSystem.checkAlerts(prices, changes);
            } catch (error) {
                console.error('خطا در بررسی هشدارها:', error);
            }
        }, 60000); // هر 1 دقیقه
    }

    updateAdvancedStats() {
        // بروزرسانی آمار پیشرفته
        setInterval(() => {
            const cachedCount = this.service.getCachedCount();
            const analysisCount = this.aiAnalyst.getAnalysisHistory().length;
            const portfolioValue = Object.keys(this.portfolioManager.portfolio).length;
            
            // نمایش در UI
            this.updateAdvancedStatsDisplay(cachedCount, analysisCount, portfolioValue);
        }, 30000);
    }

    updateAdvancedStatsDisplay(cachedCount, analysisCount, portfolioValue) {
        const statsHTML = `
            <div class="advanced-stats">
                <span><i data-lucide="database"></i> داده‌های کش شده: ${cachedCount}</span>
                <span><i data-lucide="brain"></i> تحلیل‌های ذخیره شده: ${analysisCount}</span>
                <span><i data-lucide="briefcase"></i> دارایی‌های پرتفوی: ${portfolioValue}</span>
                <span><i data-lucide="bell"></i> هشدارهای فعال: ${this.alertSystem.alerts.filter(a => a.active).length}</span>
            </div>
        `;
        
        // اضافه کردن یا بروزرسانی
        let statsContainer = document.querySelector('.advanced-stats');
        if (!statsContainer) {
            statsContainer = document.createElement('div');
            statsContainer.className = 'advanced-stats';
            document.querySelector('.stats').appendChild(statsContainer);
        }
        statsContainer.innerHTML = statsHTML;
    }

    loadUserPreferences() {
        return JSON.parse(localStorage.getItem('user_preferences') || JSON.stringify({
            theme: 'light',
            currency: 'usd',
            notifications: true,
            autoRefresh: true,
            language: 'fa'
        }));
    }

    saveUserPreferences() {
        localStorage.setItem('user_preferences', JSON.stringify(this.userPreferences));
    }

    // متدهای اضافی برای کار با علاقه‌مندی‌ها
    toggleFavorite(coinId) {
        if (this.favorites.has(coinId)) {
            this.favorites.delete(coinId);
        } else {
            this.favorites.add(coinId);
        }
        
        localStorage.setItem('favorite_coins', JSON.stringify([...this.favorites]));
        this.showToast('لیست علاقه‌مندی‌ها به‌روزرسانی شد', 'success');
        return this.favorites.has(coinId);
    }

    getFavorites() {
        return [...this.favorites];
    }

    showFavoriteCoins() {
        const favoriteCoins = this.currentData.filter(coin => this.favorites.has(coin.id));
        this.renderCryptoCards(favoriteCoins);
        this.showToast('رمزارزهای مورد علاقه نمایش داده شدند', 'info');
    }
}

// راه‌اندازی اپلیکیشن پیشرفته
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EnhancedCryptoApp();
    
    // اضافه کردن منوی کاربر
    createUserMenu();
});

function createUserMenu() {
    const menuHTML = `
        <div class="user-menu">
            <div class="user-avatar">
                <i data-lucide="user"></i>
            </div>
            <div class="user-info">
                <span class="user-name">کاربر: علی</span>
                <span class="user-role">تحلیلگر حرفه‌ای</span>
            </div>
            <div class="menu-dropdown">
                <a href="#"><i data-lucide="settings"></i> تنظیمات</a>
                <a href="#" id="btnFavorites"><i data-lucide="star"></i> علاقه‌مندی‌ها</a>
                <a href="#" id="btnHistory"><i data-lucide="history"></i> تاریخچه تحلیل‌ها</a>
                <hr>
                <a href="#" id="btnLogout"><i data-lucide="log-out"></i> خروج</a>
            </div>
        </div>
    `;
    
    const header = document.querySelector('.app-header');
    header.insertAdjacentHTML('beforeend', menuHTML);
    
    // رندر آیکون‌ها
    lucide.createIcons();
}
