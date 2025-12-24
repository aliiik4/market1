/* استایل‌های پیشرفته برای سیستم حرفه‌ای */

/* ===== تایپوگرافی پیشرفته ===== */
@import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-fontface.css');

:root {
    /* رنگ‌های جدید */
    --ai-color: #8a2be2;
    --portfolio-color: #4facfe;
    --alert-color: #f5576c;
    --report-color: #43e97b;
    --dark-mode-bg: #0f0f23;
    --dark-mode-card: #1a1a2e;
    --gradient-ai: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-portfolio: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-alert: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --gradient-warning: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* ===== حالت تاریک ===== */
body.dark-mode {
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%) !important;
    color: #e0e0e0;
}

body.dark-mode .app-header,
body.dark-mode .main-container,
body.dark-mode .app-footer {
    background: rgba(26, 26, 46, 0.95) !important;
    color: #e0e0e0;
}

body.dark-mode .crypto-card {
    background: var(--dark-mode-card) !important;
    color: #e0e0e0;
    border-color: #2a2a3e;
}

body.dark-mode .search-box input {
    background: #2a2a3e !important;
    color: #e0e0e0 !important;
    border-color: #3a3a4e;
}

/* ===== انیمیشن‌های پیشرفته ===== */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
}

/* ===== کامپوننت‌های پیشرفته ===== */
.ai-indicator {
    position: relative;
    background: var(--gradient-ai);
    background-size: 200% auto;
    animation: shimmer 2s infinite linear;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
}

.portfolio-badge {
    background: var(--gradient-portfolio);
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.alert-badge {
    background: var(--gradient-alert);
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    animation: pulse 2s infinite;
}

/* ===== کارت‌های پیشرفته ===== */
.crypto-card.advanced {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.crypto-card.advanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.7s;
}

.crypto-card.advanced:hover::before {
    left: 100%;
}

.crypto-card.advanced .trend-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-success);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
}

.crypto-card.advanced:hover .trend-line {
    transform: scaleX(1);
}

/* ===== نمودارهای پیشرفته ===== */
.chart-container-3d {
    perspective: 1000px;
}

.chart-3d {
    transform-style: preserve-3d;
    transform: rotateX(5deg);
    transition: transform 0.5s ease;
}

.chart-3d:hover {
    transform: rotateX(0deg);
}

/* ===== پنل تحلیل AI ===== */
.ai-analysis-panel {
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(74, 0, 224, 0.1) 100%);
    border-left: 4px solid var(--ai-color);
    border-radius: var(--border-radius);
    padding: 25px;
    margin: 20px 0;
    position: relative;
    overflow: hidden;
}

.ai-analysis-panel::before {
    content: '🤖';
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 120px;
    opacity: 0.05;
    z-index: 0;
}

.ai-analysis-panel > * {
    position: relative;
    z-index: 1;
}

/* ===== جدول‌های پیشرفته ===== */
.advanced-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.advanced-table th {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 15px;
    text-align: right;
    font-weight: 600;
}

.advanced-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
}

.advanced-table tr:last-child td {
    border-bottom: none;
}

.advanced-table tr:hover {
    background: rgba(138, 43, 226, 0.05);
}

/* ===== دکمه‌های پیشرفته ===== */
.btn-glow {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.btn-glow::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    transform: rotate(45deg);
    transition: transform 0.6s ease;
}

.btn-glow:hover::after {
    transform: rotate(45deg) translate(50%, 50%);
}

.btn-neumorphic {
    background: #f0f0f0;
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 8px 8px 16px #d9d9d9,
                -8px -8px 16px #ffffff;
    transition: all 0.3s ease;
}

.btn-neumorphic:hover {
    box-shadow: 4px 4px 8px #d9d9d9,
                -4px -4px 8px #ffffff;
}

/* ===== اسکلتون‌لودینگ ===== */
.skeleton-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.skeleton-card {
    height: 200px;
    border-radius: var(--border-radius);
    margin-bottom: 20px;
}

/* ===== ترانزیشن‌های صفحه ===== */
.page-transition {
    animation: pageFade 0.5s ease;
}

@keyframes pageFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ===== ناوبری پیشرفته ===== */
.sticky-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9);
}

body.dark-mode .sticky-nav {
    background: rgba(26, 26, 46, 0.9);
}

/* ===== پاپ‌آپ‌های پیشرفته ===== */
.advanced-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    background: white;
    border-radius: var(--border-radius);
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    z-index: 10000;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.advanced-popup.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

.advanced-popup .close-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    background: var(--danger-color);
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.advanced-popup .close-btn:hover {
    transform: rotate(90deg);
}

/* ===== پیش‌بازنمایی (Preview) ===== */
.preview-card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.preview-card:hover {
    transform: rotateY(10deg) rotateX(5deg);
}

/* ===== اسکرول‌بار سفارشی ===== */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) #f0f0f0;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}

/* ===== انیمیشن‌های داده ===== */
.data-stream {
    position: relative;
    overflow: hidden;
}

.data-stream::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    animation: dataFlow 2s infinite linear;
}

@keyframes dataFlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* ===== افکت‌های شیشه‌ای ===== */
.glass-effect {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

body.dark-mode .glass-effect {
    background: rgba(26, 26, 46, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* ===== تگ‌های وضعیت ===== */
.status-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    gap: 6px;
}

.status-tag.online {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-tag.offline {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

.status-tag.warning {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.status-tag.processing {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
}

/* ===== جداکننده‌های پیشرفته ===== */
.separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
}

.separator::before,
.separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
}

.separator span {
    padding: 0 15px;
    color: var(--gray-color);
    font-size: 0.9rem;
}

/* ===== ابزارک‌های آماری ===== */
.stat-widget {
    background: white;
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    border-top: 4px solid transparent;
}

.stat-widget:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.stat-widget.performance {
    border-top-color: var(--success-color);
}

.stat-widget.risk {
    border-top-color: var(--danger-color);
}

.stat-widget.info {
    border-top-color: var(--primary-color);
}

/* ===== نوار پیشرفت ===== */
.progress-bar-advanced {
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.progress-bar-advanced .progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

.progress-bar-advanced .progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
}

/* ===== کارت‌های متحرک ===== */
.floating-card {
    animation: float 6s ease-in-out infinite;
}

.floating-card:nth-child(2n) {
    animation-delay: 1s;
}

.floating-card:nth-child(3n) {
    animation-delay: 2s;
}

/* ===== رسپانسیو پیشرفته ===== */
@media (max-width: 1400px) {
    .crypto-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

@media (max-width: 1200px) {
    .detail-body {
        grid-template-columns: 1fr;
    }
    
    .portfolio-summary {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .crypto-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    .control-buttons {
        flex-direction: column;
    }
    
    .stats {
        flex-direction: column;
        gap: 10px;
    }
    
    .advanced-stats {
        flex-direction: column;
    }
    
    .portfolio-summary {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .crypto-grid {
        grid-template-columns: 1fr;
    }
    
    .app-header h1 {
        font-size: 1.4rem;
    }
    
    .ai-analysis-panel {
        padding: 15px;
    }
}

/* ===== چاپ ===== */
@media print {
    .no-print {
        display: none !important;
    }
    
    .app-header, .main-container, .app-footer {
        box-shadow: none !important;
        border: 1px solid #ddd;
    }
    
    body {
        background: white !important;
        color: black !important;
    }
}
