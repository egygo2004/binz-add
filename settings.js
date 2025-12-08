// Settings Management for Doc_HEMA Team Extension
console.log('Settings page loaded');

// DOM Elements
const alertContainer = document.getElementById('alert-container');
const loadingScreen = document.getElementById('loading-screen');

// Form Elements
const activeBinForm = document.getElementById('active-bin-form');
const declineBinForm = document.getElementById('decline-bin-form');

// Input Elements
const activeBinInput = document.getElementById('activeBin');
const activeExpiryInput = document.getElementById('activeExpiry');
const activeCvvInput = document.getElementById('activeCvv');
const declineBinInput = document.getElementById('declineBin');
const declineExpiryInput = document.getElementById('declineExpiry');
const declineCvvInput = document.getElementById('declineCvv');
const autoTryIntervalInput = document.getElementById('autoTryInterval');
const autoTryCountInput = document.getElementById('autoTryCount');

// Statistics Elements
const totalBinsElement = document.getElementById('total-bins');
const activeBinsElement = document.getElementById('active-bins');
const declineBinsElement = document.getElementById('decline-bins');

// Initialize settings page
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    await loadStatistics();
    await loadBins();
});

// Load all settings
async function loadSettings() {
    try {
        showLoading();
        
        // Load BIN data
        const binData = await getBinData();
        if (binData.activeBinData) {
            activeBinInput.value = binData.activeBinData.bin || '';
            activeExpiryInput.value = binData.activeBinData.expiryDate || '';
            activeCvvInput.value = binData.activeBinData.cvv || '';
        }
        if (binData.declineBinData) {
            declineBinInput.value = binData.declineBinData.bin || '';
            declineExpiryInput.value = binData.declineBinData.expiryDate || '';
            declineCvvInput.value = binData.declineBinData.cvv || '';
        }

        // Load auto try settings
        const autoTrySettings = await getAutoTrySettings();
        autoTryIntervalInput.value = autoTrySettings.interval || 3;
        autoTryCountInput.value = autoTrySettings.count || 19;

        showAlert('تم تحميل الإعدادات بنجاح', 'success');
    } catch (error) {
        console.error('Load settings error:', error);
        showAlert('خطأ في تحميل الإعدادات', 'error');
    } finally {
        hideLoading();
    }
}

// Get BIN data from storage
async function getBinData() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['activeBinData', 'declineBinData'], (result) => {
            resolve({
                activeBinData: result.activeBinData || {},
                declineBinData: result.declineBinData || {}
            });
        });
    });
}

// Get auto try settings from storage
async function getAutoTrySettings() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['autoTrySettings'], (result) => {
            resolve(result.autoTrySettings || { interval: 3, count: 19 });
        });
    });
}

// Save BIN data to storage
async function saveBinData(data) {
    return new Promise((resolve) => {
        chrome.storage.local.set(data, resolve);
    });
}

// Save auto try settings to storage
async function saveAutoTrySettings(settings) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ autoTrySettings: settings }, resolve);
    });
}

// Load statistics
async function loadStatistics() {
    try {
        const binData = await getBinData();
        const savedBins = await getSavedBins();
        
        const totalBins = savedBins.length;
        const activeBins = savedBins.filter(bin => bin.type === 'active').length;
        const declineBins = savedBins.filter(bin => bin.type === 'decline').length;

        totalBinsElement.textContent = totalBins;
        activeBinsElement.textContent = activeBins;
        declineBinsElement.textContent = declineBins;
    } catch (error) {
        console.error('Load statistics error:', error);
    }
}

// Get saved BINs from storage
async function getSavedBins() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['savedBins'], (result) => {
            resolve(result.savedBins || []);
        });
    });
}

// Save BIN to saved list
async function saveBinToList(binData, type) {
    const savedBins = await getSavedBins();
    const newBin = {
        id: Date.now(),
        bin: binData.bin,
        expiryDate: binData.expiryDate,
        cvv: binData.cvv,
        type: type,
        createdAt: new Date().toISOString()
    };
    
    savedBins.push(newBin);
    
    return new Promise((resolve) => {
        chrome.storage.local.set({ savedBins: savedBins }, resolve);
    });
}

// Load BINs list
async function loadBins() {
    try {
        const savedBins = await getSavedBins();
        const binListElement = document.getElementById('bin-list');
        
        if (savedBins.length === 0) {
            binListElement.innerHTML = '<p style="text-align: center; color: #ccc;">لا توجد BIN محفوظة</p>';
            return;
        }

        binListElement.innerHTML = savedBins.map(bin => `
            <div class="bin-item">
                <div class="bin-info">
                    <div class="bin-number">${bin.bin}</div>
                    <div class="bin-details">
                        انتهاء: ${bin.expiryDate || 'غير محدد'} | 
                        CVV: ${bin.cvv || 'غير محدد'} | 
                        النوع: ${bin.type === 'active' ? 'نشط' : 'مرفوض'}
                    </div>
                </div>
                <div class="bin-actions">
                    <button class="btn btn-small btn-secondary" onclick="useBin('${bin.id}')">استخدام</button>
                    <button class="btn btn-small btn-danger" onclick="deleteBin('${bin.id}')">حذف</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Load BINs error:', error);
        showAlert('خطأ في تحميل قائمة BIN', 'error');
    }
}

// Use BIN
async function useBin(binId) {
    try {
        const savedBins = await getSavedBins();
        const bin = savedBins.find(b => b.id.toString() === binId);
        
        if (!bin) {
            showAlert('BIN غير موجود', 'error');
            return;
        }

        if (bin.type === 'active') {
            activeBinInput.value = bin.bin;
            activeExpiryInput.value = bin.expiryDate || '';
            activeCvvInput.value = bin.cvv || '';
            showAlert('تم تحميل BIN النشط', 'success');
        } else {
            declineBinInput.value = bin.bin;
            declineExpiryInput.value = bin.expiryDate || '';
            declineCvvInput.value = bin.cvv || '';
            showAlert('تم تحميل BIN المرفوض', 'success');
        }
    } catch (error) {
        console.error('Use BIN error:', error);
        showAlert('خطأ في استخدام BIN', 'error');
    }
}

// Delete BIN
async function deleteBin(binId) {
    try {
        const savedBins = await getSavedBins();
        const updatedBins = savedBins.filter(b => b.id.toString() !== binId);
        
        await new Promise((resolve) => {
            chrome.storage.local.set({ savedBins: updatedBins }, resolve);
        });

        await loadBins();
        await loadStatistics();
        showAlert('تم حذف BIN بنجاح', 'success');
    } catch (error) {
        console.error('Delete BIN error:', error);
        showAlert('خطأ في حذف BIN', 'error');
    }
}

// Clear all BINs
async function clearAllBins() {
    if (!confirm('هل أنت متأكد من حذف جميع BIN المحفوظة؟')) {
        return;
    }

    try {
        await new Promise((resolve) => {
            chrome.storage.local.set({ savedBins: [] }, resolve);
        });

        await loadBins();
        await loadStatistics();
        showAlert('تم مسح جميع BIN بنجاح', 'success');
    } catch (error) {
        console.error('Clear all BINs error:', error);
        showAlert('خطأ في مسح BIN', 'error');
    }
}

// Test Active BIN
async function testActiveBin() {
    try {
        const bin = activeBinInput.value.trim();
        const expiry = activeExpiryInput.value.trim();
        const cvv = activeCvvInput.value.trim();

        if (!bin) {
            showAlert('يرجى إدخال رقم BIN', 'error');
            return;
        }

        // Send message to background script to test
        const response = await chrome.runtime.sendMessage({
            action: 'testActiveBin',
            data: { bin, expiry, cvv }
        });

        if (response.success) {
            showAlert('تم اختبار BIN النشط بنجاح', 'success');
        } else {
            showAlert(response.error || 'خطأ في اختبار BIN', 'error');
        }
    } catch (error) {
        console.error('Test active BIN error:', error);
        showAlert('خطأ في اختبار BIN', 'error');
    }
}

// Test Decline BIN
async function testDeclineBin() {
    try {
        const bin = declineBinInput.value.trim();
        const expiry = declineExpiryInput.value.trim();
        const cvv = declineCvvInput.value.trim();

        if (!bin) {
            showAlert('يرجى إدخال رقم BIN', 'error');
            return;
        }

        // Send message to background script to test
        const response = await chrome.runtime.sendMessage({
            action: 'testDeclineBin',
            data: { bin, expiry, cvv }
        });

        if (response.success) {
            showAlert('تم اختبار BIN المرفوض بنجاح', 'success');
        } else {
            showAlert(response.error || 'خطأ في اختبار BIN', 'error');
        }
    } catch (error) {
        console.error('Test decline BIN error:', error);
        showAlert('خطأ في اختبار BIN', 'error');
    }
}

// Save auto try settings
async function saveAutoTrySettings() {
    try {
        const interval = parseInt(autoTryIntervalInput.value);
        const count = parseInt(autoTryCountInput.value);

        if (interval < 1 || interval > 120) {
            showAlert('الفاصل الزمني يجب أن يكون بين 1 و 120 ثانية', 'error');
            return;
        }

        if (count < 1 || count > 100) {
            showAlert('عدد المحاولات يجب أن يكون بين 1 و 100', 'error');
            return;
        }

        await saveAutoTrySettings({ interval, count });
        showAlert('تم حفظ إعدادات المحاولة التلقائية', 'success');
    } catch (error) {
        console.error('Save auto try settings error:', error);
        showAlert('خطأ في حفظ الإعدادات', 'error');
    }
}

// Export settings
async function exportSettings() {
    try {
        const binData = await getBinData();
        const autoTrySettings = await getAutoTrySettings();
        const savedBins = await getSavedBins();

        const exportData = {
            binData,
            autoTrySettings,
            savedBins,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `doc-hema-settings-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        showAlert('تم تصدير الإعدادات بنجاح', 'success');
    } catch (error) {
        console.error('Export settings error:', error);
        showAlert('خطأ في تصدير الإعدادات', 'error');
    }
}

// Import settings
async function importSettings() {
    try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    if (importData.binData) {
                        await saveBinData(importData.binData);
                    }
                    
                    if (importData.autoTrySettings) {
                        await saveAutoTrySettings(importData.autoTrySettings);
                    }
                    
                    if (importData.savedBins) {
                        await new Promise((resolve) => {
                            chrome.storage.local.set({ savedBins: importData.savedBins }, resolve);
                        });
                    }

                    await loadSettings();
                    await loadStatistics();
                    await loadBins();
                    
                    showAlert('تم استيراد الإعدادات بنجاح', 'success');
                } catch (error) {
                    console.error('Import settings error:', error);
                    showAlert('خطأ في استيراد الإعدادات', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    } catch (error) {
        console.error('Import settings error:', error);
        showAlert('خطأ في استيراد الإعدادات', 'error');
    }
}

// Reset settings
async function resetSettings() {
    if (!confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        return;
    }

    try {
        await new Promise((resolve) => {
            chrome.storage.local.clear(resolve);
        });

        await loadSettings();
        await loadStatistics();
        await loadBins();
        
        showAlert('تم إعادة تعيين الإعدادات بنجاح', 'success');
    } catch (error) {
        console.error('Reset settings error:', error);
        showAlert('خطأ في إعادة تعيين الإعدادات', 'error');
    }
}

// Event Listeners
activeBinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const binData = {
        bin: activeBinInput.value.trim(),
        expiryDate: activeExpiryInput.value.trim(),
        cvv: activeCvvInput.value.trim()
    };

    if (!binData.bin) {
        showAlert('يرجى إدخال رقم BIN', 'error');
        return;
    }

    try {
        await saveBinData({ activeBinData: binData });
        await saveBinToList(binData, 'active');
        await loadStatistics();
        showAlert('تم حفظ BIN النشط بنجاح', 'success');
    } catch (error) {
        console.error('Save active BIN error:', error);
        showAlert('خطأ في حفظ BIN النشط', 'error');
    }
});

declineBinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const binData = {
        bin: declineBinInput.value.trim(),
        expiryDate: declineExpiryInput.value.trim(),
        cvv: declineCvvInput.value.trim()
    };

    if (!binData.bin) {
        showAlert('يرجى إدخال رقم BIN', 'error');
        return;
    }

    try {
        await saveBinData({ declineBinData: binData });
        await saveBinToList(binData, 'decline');
        await loadStatistics();
        showAlert('تم حفظ BIN المرفوض بنجاح', 'success');
    } catch (error) {
        console.error('Save decline BIN error:', error);
        showAlert('خطأ في حفظ BIN المرفوض', 'error');
    }
});

// UI Functions
function showLoading() {
    loadingScreen.style.display = 'block';
}

function hideLoading() {
    loadingScreen.style.display = 'none';
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    alertContainer.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Make functions globally available
window.testActiveBin = testActiveBin;
window.testDeclineBin = testDeclineBin;
window.saveAutoTrySettings = saveAutoTrySettings;
window.exportSettings = exportSettings;
window.importSettings = importSettings;
window.resetSettings = resetSettings;
window.loadBins = loadBins;
window.clearAllBins = clearAllBins;
window.useBin = useBin;
window.deleteBin = deleteBin; 