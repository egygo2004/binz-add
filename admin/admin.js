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
        let url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/documents`;

        if (queries.length > 0) {
            const queryParams = queries.map(q => `queries[]=${encodeURIComponent(q)}`).join('&');
            url += `?${queryParams}`;
        }

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
                sessionStorage.setItem('adminLoggedIn', 'true');
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
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
});

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.currentTarget.getAttribute('data-section');
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

// BINs Data
async function loadBinsData() {
    const tbody = document.getElementById('bins-tbody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">جاري التحميل...</td></tr>';

    try {
        const result = await fetchDocuments(APPWRITE_CONFIG.collections.bins, ['limit(100)']);
        const docs = result.documents || [];

        if (docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="loading">لا توجد BINs</td></tr>';
            return;
        }

        tbody.innerHTML = docs.map(bin => `
      <tr>
        <td>${bin.userId || '-'}</td>
        <td style="font-family: monospace;">${bin.pattern}</td>
        <td>${bin.name || '-'}</td>
        <td>${bin.expiry || '-'}</td>
        <td>${new Date(bin.createdAt || bin.$createdAt).toLocaleString('ar-EG')}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteBin('${bin.$id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">خطأ في التحميل</td></tr>';
    }
}

// Cookies Data
async function loadCookiesData() {
    const tbody = document.getElementById('cookies-tbody');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">جاري التحميل...</td></tr>';

    try {
        const result = await fetchDocuments(APPWRITE_CONFIG.collections.cookies, ['limit(100)']);
        const docs = result.documents || [];

        if (docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">لا توجد Cookies</td></tr>';
            return;
        }

        tbody.innerHTML = docs.map(cookie => `
      <tr>
        <td>${cookie.userId || '-'}</td>
        <td>${cookie.ip || '-'}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;">${cookie.url || '-'}</td>
        <td>${new Date(cookie.capturedAt || cookie.$createdAt).toLocaleString('ar-EG')}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewCookie('${cookie.$id}')">👁️</button>
          <button class="btn btn-sm btn-danger" onclick="deleteCookie('${cookie.$id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">خطأ في التحميل</td></tr>';
    }
}

// Logs Data
async function loadLogsData() {
    const tbody = document.getElementById('logs-tbody');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">جاري التحميل...</td></tr>';

    try {
        const result = await fetchDocuments(APPWRITE_CONFIG.collections.logs, ['limit(200)']);
        const docs = result.documents || [];

        if (docs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">لا توجد سجلات</td></tr>';
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
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">خطأ في التحميل</td></tr>';
    }
}

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
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
});
