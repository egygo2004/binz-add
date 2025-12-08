const translations = {
  ar: {
    mainTitle: 'Doc_HEMA Team',
    declineBin: 'رفض BIN',
    activeBin: 'BIN نشط',
    autoTry: 'تشغيل المحاولة التلقائية (Auto Try)',
    addBin: 'إضافة BIN',
    quickUse: 'استخدام BIN في النموذج',
    setting: 'الإعدادات',
    cardAutoSave: 'حفظ البطاقة تلقائيًا',
    activeBinLabel: 'Active BIN',
    declineBinLabel: 'Decline BIN',
    saveBtn: 'حفظ BIN',
    addBinSection: 'إضافة BIN جديد',
    quickBinSection: 'استخدام BIN سريع',
    savedBinsSection: 'BINs المحفوظة',
    newBinInputLabel: 'رقم BIN (6-16 رقم، استخدم X للمجهول)',
    newBinInputPh: 'مثال: 123456XXXXXX1234',
    newCardNumberLabel: 'رقم البطاقة الكامل (اختياري)',
    newCardNumberPh: '1234567890123456',
    newExpiryDateLabel: 'تاريخ الانتهاء (اختياري)',
    newExpiryDatePh: 'MM/YY',
    newCvcLabel: 'CVC (اختياري)',
    newCvcPh: '123',
    newBinNameLabel: 'اسم BIN (اختياري)',
    newBinNamePh: 'اسم البطاقة',
    binHelp: 'استخدم X للأرقام المجهولة، سيتم توليد أرقام عشوائية. إذا أدخلت رقم بطاقة كامل سيتم استخدامه.',
    quickBinInputLabel: 'أدخل BIN للاستخدام السريع',
    quickBinInputPh: 'BIN سريع (6-16 رقم)',
    quickBinHelp: 'سيتم توليد البيانات وملؤها مباشرة في فيسبوك',
    cardAutoSaveLabel: 'حفظ البطاقة تلقائيًا',
    activeBinInputLabel: 'Active BIN',
    activeBinInputPh: 'أدخل Active BIN',
    expireActiveDateInputLabel: 'تاريخ انتهاء Active BIN',
    expireActiveDateInputPh: 'MMYY',
    activeCvvInputLabel: 'Active BIN CVV',
    activeCvvInputPh: 'CVV',
    declineBinInputLabel: 'Decline BIN',
    declineBinInputPh: 'أدخل Decline BIN',
    expireDeclineDateInputLabel: 'تاريخ انتهاء Decline BIN',
    expireDeclineDateInputPh: 'MMYY',
    declineCvvInputLabel: 'Decline BIN CVV',
    declineCvvInputPh: 'CVV',
    saveBinBtn: 'حفظ BIN',
    useBtn: 'استخدام',
    deleteBtn: 'حذف',
    fullNumberIndicator: 'رقم كامل',
    expiryIndicator: 'تاريخ',
    cvcIndicator: 'CVC',
    noSavedBins: 'لا توجد BINs محفوظة',
    logsEmpty: 'لا يوجد عمليات بعد.',
    shortcutDecline: 'اختصار: Ctrl+Shift+X',
    shortcutActive: 'اختصار: Ctrl+Shift+V',
    madeBy: '(Made by Doc_HEMA)',
    enterBin: 'يرجى إدخال رقم BIN',
    binLength: 'يجب أن يكون طول BIN من 6 إلى 16 رقم',
    binPattern: 'يجب أن يحتوي BIN على أرقام و X فقط',
    cardNumberLength: 'رقم البطاقة يجب أن يكون 16 رقم',
    expiryFormat: 'صيغة التاريخ غير صحيحة (MM/YY)',
    cvcLength: 'CVC يجب أن يكون 3 أرقام',
    binAdded: bin => `تم إضافة BIN: ${bin}`,
    binUsed: bin => `تم استخدام BIN: ${bin}`,
    binDeleted: bin => `تم حذف BIN: ${bin}`,
    binNotFound: 'لم يتم العثور على BIN',
    quickBinSuccess: (bin, number, expiry, cvc) => `BIN ${bin}: ${number} | التاريخ: ${expiry} | CVC: ${cvc}`,
    error: 'حدث خطأ',
    success: 'تمت العملية بنجاح',
    autoSaveOn: '✅ Auto Save مفعل',
    autoSaveOff: '❌ Auto Save معطل',
  },
  en: {
    mainTitle: 'Doc_HEMA Team',
    declineBin: 'Decline Bin',
    activeBin: 'Active Bin',
    autoTry: 'Enable Auto Try',
    addBin: 'Add BIN',
    quickUse: 'Use BIN in Form',
    setting: 'Settings',
    cardAutoSave: 'Card Auto Save',
    activeBinLabel: 'Active BIN',
    declineBinLabel: 'Decline BIN',
    saveBtn: 'Save Bin',
    addBinSection: 'Add New BIN',
    quickBinSection: 'Quick BIN Use',
    savedBinsSection: 'Saved BINs',
    newBinInputLabel: 'BIN Number (6-16 digits, use X for unknown)',
    newBinInputPh: 'e.g. 123456XXXXXX1234',
    newCardNumberLabel: 'Full Card Number (optional)',
    newCardNumberPh: '1234567890123456',
    newExpiryDateLabel: 'Expiry Date (optional)',
    newExpiryDatePh: 'MM/YY',
    newCvcLabel: 'CVC (optional)',
    newCvcPh: '123',
    newBinNameLabel: 'BIN Name (optional)',
    newBinNamePh: 'Card Name',
    binHelp: 'Use X for unknown digits, random numbers will be generated. If you enter a full card number, it will be used instead.',
    quickBinInputLabel: 'Enter BIN for quick use',
    quickBinInputPh: 'Quick BIN (6-16 digits)',
    quickBinHelp: 'Data will be generated and filled directly in Facebook',
    cardAutoSaveLabel: 'Card Auto Save',
    activeBinInputLabel: 'Active BIN',
    activeBinInputPh: 'Enter Active BIN',
    expireActiveDateInputLabel: 'Active BIN Expire Date',
    expireActiveDateInputPh: 'MMYY',
    activeCvvInputLabel: 'Active BIN CVV',
    activeCvvInputPh: 'CVV',
    declineBinInputLabel: 'Decline BIN',
    declineBinInputPh: 'Enter Decline BIN',
    expireDeclineDateInputLabel: 'Decline BIN Expire Date',
    expireDeclineDateInputPh: 'MMYY',
    declineCvvInputLabel: 'Decline BIN CVV',
    declineCvvInputPh: 'CVV',
    saveBinBtn: 'Save Bin',
    useBtn: 'Use',
    deleteBtn: 'Delete',
    fullNumberIndicator: 'Full Number',
    expiryIndicator: 'Expiry',
    cvcIndicator: 'CVC',
    noSavedBins: 'No saved BINs',
    logsEmpty: 'No operations yet.',
    shortcutDecline: 'Shortcut: Ctrl+Shift+X',
    shortcutActive: 'Shortcut: Ctrl+Shift+V',
    madeBy: '(Made by Doc_HEMA)',
    enterBin: 'Please enter a BIN number',
    binLength: 'BIN length must be 6 to 16 digits',
    binPattern: 'BIN must contain only numbers and X',
    cardNumberLength: 'Card number must be 16 digits',
    expiryFormat: 'Invalid date format (MM/YY)',
    cvcLength: 'CVC must be 3 digits',
    binAdded: bin => `BIN added: ${bin}`,
    binUsed: bin => `BIN used: ${bin}`,
    binDeleted: bin => `BIN deleted: ${bin}`,
    binNotFound: 'BIN not found',
    quickBinSuccess: (bin, number, expiry, cvc) => `BIN ${bin}: ${number} | Expiry: ${expiry} | CVC: ${cvc}`,
    error: 'An error occurred',
    success: 'Operation successful',
    autoSaveOn: '✅ Auto Save ON',
    autoSaveOff: '❌ Auto Save OFF',
  },
  bn: {
    mainTitle: 'Doc_HEMA Team',
    declineBin: 'বিন বাতিল করুন',
    activeBin: 'সক্রিয় BIN',
    autoTry: 'অটো ট্রাই চালু করুন',
    addBin: 'BIN যোগ করুন',
    quickUse: 'ফর্মে BIN ব্যবহার করুন',
    setting: 'সেটিংস',
    cardAutoSave: 'কার্ড অটো সেভ',
    activeBinLabel: 'সক্রিয় BIN',
    declineBinLabel: 'বাতিল BIN',
    saveBtn: 'BIN সংরক্ষণ করুন',
    addBinSection: 'নতুন BIN যোগ করুন',
    quickBinSection: 'দ্রুত BIN ব্যবহার',
    savedBinsSection: 'সংরক্ষিত BINs',
    newBinInputLabel: 'BIN নম্বর (6-16 সংখ্যা, অজানা জন্য X ব্যবহার করুন)',
    newBinInputPh: 'উদাহরণ: 123456XXXXXX1234',
    newCardNumberLabel: 'সম্পূর্ণ কার্ড নম্বর (ঐচ্ছিক)',
    newCardNumberPh: '1234567890123456',
    newExpiryDateLabel: 'মেয়াদ শেষের তারিখ (ঐচ্ছিক)',
    newExpiryDatePh: 'MM/YY',
    newCvcLabel: 'CVC (ঐচ্ছিক)',
    newCvcPh: '123',
    newBinNameLabel: 'BIN নাম (ঐচ্ছিক)',
    newBinNamePh: 'কার্ডের নাম',
    binHelp: 'অজানা সংখ্যার জন্য X ব্যবহার করুন, র্যান্ডম সংখ্যা তৈরি হবে। আপনি যদি সম্পূর্ণ কার্ড নম্বর দেন, সেটি ব্যবহৃত হবে।',
    quickBinInputLabel: 'দ্রুত ব্যবহারের জন্য BIN লিখুন',
    quickBinInputPh: 'দ্রুত BIN (6-16 সংখ্যা)',
    quickBinHelp: 'ডেটা তৈরি হবে এবং সরাসরি ফেসবুকে পূরণ হবে',
    cardAutoSaveLabel: 'কার্ড অটো সেভ',
    activeBinInputLabel: 'সক্রিয় BIN',
    activeBinInputPh: 'সক্রিয় BIN লিখুন',
    expireActiveDateInputLabel: 'সক্রিয় BIN মেয়াদ শেষের তারিখ',
    expireActiveDateInputPh: 'MMYY',
    activeCvvInputLabel: 'সক্রিয় BIN CVC',
    activeCvvInputPh: 'CVV',
    declineBinInputLabel: 'বাতিল BIN',
    declineBinInputPh: 'বাতিল BIN লিখুন',
    expireDeclineDateInputLabel: 'বাতিল BIN মেয়াদ শেষের তারিখ',
    expireDeclineDateInputPh: 'MMYY',
    declineCvvInputLabel: 'বাতিল BIN CVC',
    declineCvvInputPh: 'CVV',
    saveBinBtn: 'BIN সংরক্ষণ করুন',
    useBtn: 'ব্যবহার করুন',
    deleteBtn: 'মুছুন',
    fullNumberIndicator: 'সম্পূর্ণ নম্বর',
    expiryIndicator: 'মেয়াদ',
    cvcIndicator: 'CVC',
    noSavedBins: 'কোনও সংরক্ষিত BIN নেই',
    logsEmpty: 'এখনও কোনও অপারেশন নেই।',
    shortcutDecline: 'শর্টকাট: Ctrl+Shift+X',
    shortcutActive: 'শর্টকাট: Ctrl+Shift+V',
    madeBy: '(Doc_HEMA দ্বারা তৈরি)',
    enterBin: 'অনুগ্রহ করে BIN নম্বর লিখুন',
    binLength: 'BIN দৈর্ঘ্য 6 থেকে 16 সংখ্যা হতে হবে',
    binPattern: 'BIN শুধুমাত্র সংখ্যা এবং X থাকতে হবে',
    cardNumberLength: 'কার্ড নম্বর 16 সংখ্যা হতে হবে',
    expiryFormat: 'ভুল তারিখ ফরম্যাট (MM/YY)',
    cvcLength: 'CVC 3 সংখ্যা হতে হবে',
    binAdded: bin => `BIN যোগ হয়েছে: ${bin}`,
    binUsed: bin => `BIN ব্যবহৃত হয়েছে: ${bin}`,
    binDeleted: bin => `BIN মুছে ফেলা হয়েছে: ${bin}`,
    binNotFound: 'BIN পাওয়া যায়নি',
    quickBinSuccess: (bin, number, expiry, cvc) => `BIN ${bin}: ${number} | মেয়াদ: ${expiry} | CVC: ${cvc}`,
    error: 'একটি ত্রুটি ঘটেছে',
    success: 'অপারেশন সফল হয়েছে',
    autoSaveOn: '✅ অটো সেভ চালু',
    autoSaveOff: '❌ অটো সেভ বন্ধ',
  }
};

function setLang(lang) {
  const t = translations[lang] || translations['ar'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (typeof t[key] === 'function') return;
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key]) el.setAttribute('placeholder', t[key]);
  });
  const logsBox = document.getElementById('logsBox');
  if (logsBox && (!logsBox.innerHTML || logsBox.innerHTML.includes('D\u0006' + ' J\u0006H\u0006,\u0006/\u0006 9\u0006E\u0006D\u0006J\u0006' + '*\u0006 (\u00069\u0006/\u0006.') || logsBox.innerHTML.includes('No operations yet.') || logsBox.innerHTML.includes('\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\td\t'))) {
    logsBox.innerHTML = `<span style="color:#666">${t.logsEmpty}</span>`;
  }
}

function t(key, ...args) {
  const lang = localStorage.getItem('uiLang') || 'ar';
  const dict = translations[lang] || translations['ar'];
  if (typeof dict[key] === 'function') return dict[key](...args);
  return dict[key] || key;
}

// Event listeners for main functionality
document.addEventListener('DOMContentLoaded', () => {
  // Decline button
  const declineBtn = document.getElementById('declineBtn');
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ 'action': 'fillCard', 'type': 'decline' });
    });
  }

  // Active button
  const activeBtn = document.getElementById('activeBtn');
  let autoTryRunning = false;
  let autoTryCount = 0;
  const autoTryCountdown = document.getElementById('autoTryCountdown');

  if (activeBtn) {
    console.log('تم تسجيل معالج زر Active Bin في بداية الملف');

    const updateActiveBtn = () => {
      if (autoTryRunning) {
        activeBtn.style.background = '#f44336';
        activeBtn.style.color = '#fff';
        activeBtn.textContent = 'إيقاف Auto Try';
      } else {
        activeBtn.style.background = '#4CAF50';
        activeBtn.style.color = '#fff';
        activeBtn.textContent = 'Active Bin';
      }
    };

    updateActiveBtn();

    activeBtn.addEventListener('click', () => {
      try {
        console.log('تم النقر على زر Active Bin');

        const intervalInput = document.getElementById('activeTryInterval');
        const countInput = document.getElementById('activeTryCount');
        let interval = 3000;
        let maxCount = 19;

        if (intervalInput && !isNaN(parseInt(intervalInput.value))) {
          interval = Math.max(1, parseInt(intervalInput.value)) * 1000;
        }
        if (countInput && !isNaN(parseInt(countInput.value))) {
          maxCount = Math.max(1, parseInt(countInput.value));
        }

        console.log('إعدادات Auto Try:', { interval, maxCount });

        if (autoTryRunning) {
          console.log('إيقاف Auto Try...');
          if (window.autoTryInterval) {
            clearInterval(window.autoTryInterval);
            window.autoTryInterval = null;
          }
          autoTryRunning = false;
          autoTryCount = 0;
          if (autoTryCountdown) autoTryCountdown.textContent = '';
          updateActiveBtn();
          return;
        }

        console.log('بدء Auto Try...');
        autoTryRunning = true;
        autoTryCount = 0;
        updateActiveBtn();

        if (autoTryCountdown) autoTryCountdown.textContent = `المتبقي: ${maxCount} محاولة`;

        chrome.runtime.sendMessage({ 'action': 'fillCard', 'type': 'active' });

        window.autoTryInterval = setInterval(() => {
          chrome.runtime.sendMessage({ 'action': 'fillCard', 'type': 'active', 'noBackend': true });
          autoTryCount++;
          if (autoTryCountdown) autoTryCountdown.textContent = `المتبقي: ${maxCount - autoTryCount} محاولة`;

          if (autoTryCount >= maxCount) {
            console.log('انتهت المحاولات التلقائية');
            clearInterval(window.autoTryInterval);
            window.autoTryInterval = null;
            autoTryRunning = false;
            autoTryCount = 0;
            if (autoTryCountdown) autoTryCountdown.textContent = '';
            updateActiveBtn();
          }
        }, interval);
      } catch (error) {
        console.error('خطأ في معالج زر Active Bin:', error);
        console.error('تفاصيل الخطأ:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
    });
  } else {
    console.error('زر Active Bin غير موجود في بداية الملف');
  }

  // Stop Try button
  const stopTryBtn = document.getElementById('stopTryBtn');
  if (stopTryBtn) {
    console.log('تم تسجيل معالج زر إيقاف المحاولة');
    stopTryBtn.addEventListener('click', () => {
      try {
        console.log('تم النقر على زر إيقاف المحاولة');
        if (window.autoTryInterval) {
          clearInterval(window.autoTryInterval);
          window.autoTryInterval = null;
          console.log('تم إيقاف الفاصل الزمني');
        }
      } catch (error) {
        console.error('خطأ في معالج زر إيقاف المحاولة:', error);
        console.error('تفاصيل الخطأ:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
    });
  } else {
    console.error('زر إيقاف المحاولة غير موجود');
  }

  // Join Telegram button
  const jointeleBtn = document.getElementById('jointeleBtn');
  if (jointeleBtn) {
    console.log('تم تسجيل معالج زر الانضمام للتليجرام');
    jointeleBtn.addEventListener('click', function () {
      try {
        console.log('تم النقر على زر الانضمام للتليجرام');
        window.open('https://t.me/baba_elmgal2', '_blank');
      } catch (error) {
        console.error('خطأ في فتح رابط التليجرام:', error);
        console.error('تفاصيل الخطأ:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
    });
  } else {
    console.error('زر الانضمام للتليجرام غير موجود');
  }


  // =============================================
  // Card List Testing Feature
  // =============================================

  // Card list testing state
  let cardListTestRunning = false;
  let cardListTestInterval = null;
  let cardListTestIndex = 0;
  let parsedCardList = [];

  // Parse card list from textarea (format: card|month|year|cvv)
  function parseCardList(text) {
    const lines = text.trim().split('\n');
    const cards = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      const parts = trimmedLine.split('|');
      if (parts.length >= 4) {
        const cardNumber = parts[0].trim();
        const month = parts[1].trim().padStart(2, '0');
        const year = parts[2].trim();
        const cvv = parts[3].trim();

        // Validate card number (should be 13-19 digits)
        if (cardNumber.length >= 13 && cardNumber.length <= 19 && /^\d+$/.test(cardNumber)) {
          // Format expiry as MM/YY
          const shortYear = year.length === 4 ? year.slice(-2) : year;
          const expiry = `${month}/${shortYear}`;

          cards.push({
            number: cardNumber,
            expiry: expiry,
            cvv: cvv,
            raw: trimmedLine
          });
        }
      }
    }

    return cards;
  }

  // Update card count display
  function updateCardListCount() {
    const cardListInput = document.getElementById('cardListInput');
    const cardListCount = document.getElementById('cardListCount');

    if (cardListInput && cardListCount) {
      const cards = parseCardList(cardListInput.value);
      cardListCount.textContent = `${cards.length} بطاقة`;
    }
  }

  // Start card list testing
  function startCardListTest() {
    const cardListInput = document.getElementById('cardListInput');
    const cardTestDelay = document.getElementById('cardTestDelay');
    const startBtn = document.getElementById('startCardListTest');
    const stopBtn = document.getElementById('stopCardListTest');
    const progressDiv = document.getElementById('cardListProgress');

    if (!cardListInput) return;

    parsedCardList = parseCardList(cardListInput.value);

    if (parsedCardList.length === 0) {
      showNotification('لا توجد بطاقات صالحة في القائمة', 'error');
      return;
    }

    cardListTestRunning = true;
    cardListTestIndex = 0;

    // Update UI
    if (startBtn) startBtn.style.display = 'none';
    if (stopBtn) stopBtn.style.display = 'block';
    if (progressDiv) progressDiv.innerHTML = '';

    const delay = parseInt(cardTestDelay?.value || '3') * 1000;

    // Test first card immediately
    testNextCard(progressDiv);

    // Set interval for remaining cards
    cardListTestInterval = setInterval(() => {
      if (!cardListTestRunning || cardListTestIndex >= parsedCardList.length) {
        stopCardListTest();
        return;
      }
      testNextCard(progressDiv);
    }, delay);
  }

  // Test next card in list
  function testNextCard(progressDiv) {
    if (cardListTestIndex >= parsedCardList.length) {
      stopCardListTest();
      if (progressDiv) {
        progressDiv.innerHTML += '<div style="color: #4CAF50; margin-top: 5px;">✅ انتهى اختبار جميع البطاقات</div>';
      }
      return;
    }

    const card = parsedCardList[cardListTestIndex];
    const cardNum = cardListTestIndex + 1;
    const total = parsedCardList.length;

    // Update progress
    if (progressDiv) {
      progressDiv.innerHTML = `<div>🔄 جاري اختبار البطاقة ${cardNum}/${total}: ${card.number.slice(0, 6)}****${card.number.slice(-4)}</div>`;
      progressDiv.scrollTop = progressDiv.scrollHeight;
    }

    // Generate name for card
    const cardName = generateCardName();

    // Send card data to background script
    const cardData = {
      number: card.number,
      expiry: card.expiry,
      cvv: card.cvv,
      name: cardName,
      isQuickBin: true,
      binPattern: card.number.slice(0, 6)
    };

    chrome.runtime.sendMessage({
      'action': 'fillCardWithData',
      'data': cardData
    }, (response) => {
      if (response && response.success) {
        addLog('اختبار بطاقة', {
          cardNumber: card.number.slice(0, 6) + '****' + card.number.slice(-4),
          index: cardNum
        });
      }
    });

    cardListTestIndex++;
  }

  // Stop card list testing
  function stopCardListTest() {
    cardListTestRunning = false;

    if (cardListTestInterval) {
      clearInterval(cardListTestInterval);
      cardListTestInterval = null;
    }

    const startBtn = document.getElementById('startCardListTest');
    const stopBtn = document.getElementById('stopCardListTest');

    if (startBtn) startBtn.style.display = 'block';
    if (stopBtn) stopBtn.style.display = 'none';
  }

  // Clear card list
  function clearCardList() {
    const cardListInput = document.getElementById('cardListInput');
    const progressDiv = document.getElementById('cardListProgress');

    if (cardListInput) cardListInput.value = '';
    if (progressDiv) progressDiv.innerHTML = '';

    updateCardListCount();
    stopCardListTest();
  }

  // Initialize card list testing event listeners
  document.addEventListener('DOMContentLoaded', () => {
    const cardListInput = document.getElementById('cardListInput');
    const startBtn = document.getElementById('startCardListTest');
    const stopBtn = document.getElementById('stopCardListTest');
    const clearBtn = document.getElementById('clearCardList');

    if (cardListInput) {
      cardListInput.addEventListener('input', updateCardListCount);
      cardListInput.addEventListener('paste', () => {
        setTimeout(updateCardListCount, 100);
      });
    }

    if (startBtn) {
      startBtn.addEventListener('click', startCardListTest);
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', stopCardListTest);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', clearCardList);
    }
  });


  // Settings toggle
  const settingBtn = document.getElementById('Setting');
  if (settingBtn) {
    settingBtn.addEventListener('click', function () {
      const inputdiv = document.querySelector('.inputdiv');
      if (inputdiv) {
        inputdiv.style.display = inputdiv.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

  // Auto Try toggle
  const autoTryToggle = document.getElementById('autoTryToggle');
  if (autoTryToggle) {
    autoTryToggle.checked = localStorage.getItem('autoTryEnabled') === 'true';
    autoTryToggle.addEventListener('change', () => {
      localStorage.setItem('autoTryEnabled', autoTryToggle.checked ? 'true' : 'false');
    });
  }

  // دعم تغيير اللغة
  const langSwitcher = document.getElementById('langSwitcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('change', function () {
      setLang(this.value);
      localStorage.setItem('uiLang', this.value);
    });
    // تحميل اللغة المحفوظة
    const savedLang = localStorage.getItem('uiLang') || 'ar';
    langSwitcher.value = savedLang;
    setLang(savedLang);
  } else {
    setLang('ar');
  }

  // تكبير/تصغير الواجهة
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  let zoomLevel = 1;
  if (zoomInBtn && zoomOutBtn) {
    zoomInBtn.addEventListener('click', () => {
      zoomLevel = Math.min(zoomLevel + 0.1, 1.5);
      document.body.style.transform = `scale(${zoomLevel})`;
      document.body.style.transformOrigin = 'top center';
    });
    zoomOutBtn.addEventListener('click', () => {
      zoomLevel = Math.max(zoomLevel - 0.1, 0.7);
      document.body.style.transform = `scale(${zoomLevel})`;
      document.body.style.transformOrigin = 'top center';
    });
  }
});

// Allow only numbers and X in BIN input
function allowBinInput(input) {
  input.addEventListener('input', () => {
    let value = input.value.toUpperCase();
    // السماح فقط بالأرقام و X
    value = value.replace(/[^0-9X]/g, '');
    input.value = value;
  });
}

// توليد رقم عشوائي
function generateRandomDigit() {
  return Math.floor(Math.random() * 10);
}

// توليد رقم بطاقة كامل صحيح حسب خوارزمية Luhn
function generateLuhnCard(binPattern) {
  // binPattern: 16 خانة (أرقام أو X)
  let cardArr = binPattern.split('');
  // أكمل كل X بأرقام عشوائية ما عدا آخر خانة (تُحسب لاحقًا)
  for (let i = 0; i < 15; i++) {
    if (cardArr[i] === 'X') cardArr[i] = generateRandomDigit().toString();
  }
  // احسب رقم التحقق الأخير (Luhn)
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(cardArr[i]);
    if ((i % 2) === 0) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  let checkDigit = (10 - (sum % 10)) % 10;
  cardArr[15] = checkDigit.toString();
  return cardArr.join('');
}

// عدل منطق التوليد ليستخدم Luhn
function generateFullBinLuhn(binPattern) {
  // أكمل النمط إلى 16 خانة بـ X
  binPattern = binPattern.padEnd(16, 'X');
  return generateLuhnCard(binPattern);
}

// توليد تاريخ عشوائي
function generateExpiry() {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(Math.random() * 5) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
}

// توليد CVC عشوائي
function generateCVV() {
  return Math.floor(Math.random() * 900) + 100;
}

// توليد اسم عشوائي للبطاقة
function generateCardName() {
  const randomWords = [
    'Khan', 'Ahmed', 'Patel', 'Chowdhury', 'Sheikh',
    'Malik', 'Roy', 'Das', 'Hussain', 'Verma',
    'Singh', 'Rahman', 'Sharma', 'Jahan', 'Iqbal',
    'Mondal', 'Rana', 'Mitra', 'Siddiqui', 'Bhattacharya'
  ];

  const randoName = [
    // Male Names
    "Aarav", "Arjun", "Kabir", "Ravi", "Vikram", "Raj", "Ayan", "Zayan", "Rehan", "Tariq",
    "Nasir", "Adeel", "Faizan", "Imran", "Nadeem", "Sameer", "Rahul", "Amit", "Vikas", "Karan",
    "Rohit", "Siddharth", "Manoj", "Abdul", "Yusuf", "Asif", "Irfan", "Shahid", "Kamran", "Waqas",
    // Female Names
    "Ayesha", "Fatima", "Zara", "Anika", "Nusrat", "Priya", "Puja", "Madhuri", "Ameena", "Sadia",
    "Rima", "Sumaiya", "Mehjabin", "Shila", "Nadia", "Sharmin", "Mousumi", "Lamia", "Tasmia", "Hafsa"
  ];

  const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  const randomName = randoName[Math.floor(Math.random() * randoName.length)];

  return `${randomName} ${randomWord}`;
}

// Allow only numbers in input fields
function allowOnlyNumbers(input, maxLength) {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(0, maxLength);
  });
}

// إضافة BIN جديد
const newBinInput = document.getElementById('newBinInput');
const newCardNumber = document.getElementById('newCardNumber');
const newExpiryDate = document.getElementById('newExpiryDate');
const newCvc = document.getElementById('newCvc');
const newBinName = document.getElementById('newBinName');
const addBinBtn = document.getElementById('addBinBtn');

// استخدام BIN سريع
const quickBinInput = document.getElementById('quickBinInput');
const quickUseBinBtn = document.getElementById('quickUseBinBtn');

// تطبيق قيود الإدخال على BIN
if (newBinInput) allowBinInput(newBinInput);
if (quickBinInput) allowBinInput(quickBinInput);

// تطبيق قيود الإدخال على رقم البطاقة
if (newCardNumber) allowOnlyNumbers(newCardNumber, 16);

// تطبيق قيود الإدخال على التاريخ
if (newExpiryDate) {
  newExpiryDate.addEventListener('input', () => {
    let value = newExpiryDate.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    newExpiryDate.value = value;
  });
}

// تطبيق قيود الإدخال على CVC
if (newCvc) allowOnlyNumbers(newCvc, 3);

if (addBinBtn) {
  addBinBtn.addEventListener('click', () => {
    let binPattern = newBinInput.value.trim().toUpperCase();
    const cardNumber = newCardNumber.value.trim();
    const expiryDate = newExpiryDate.value.trim();
    const cvc = newCvc.value.trim();
    const name = newBinName.value.trim();

    if (!binPattern) {
      showNotification(t('enterBin'), 'error');
      return;
    }

    if (binPattern.length < 6 || binPattern.length > 16) {
      showNotification(t('binLength'), 'error');
      return;
    }

    if (!/^[0-9X]+$/.test(binPattern)) {
      showNotification(t('binPattern'), 'error');
      return;
    }

    if (binPattern.length < 16) {
      binPattern = binPattern.padEnd(16, 'X');
    }

    if (cardNumber && cardNumber.length !== 16) {
      showNotification(t('cardNumberLength'), 'error');
      return;
    }

    if (expiryDate && !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      showNotification(t('expiryFormat'), 'error');
      return;
    }

    if (cvc && cvc.length !== 3) {
      showNotification(t('cvcLength'), 'error');
      return;
    }

    const fullBin = cardNumber || generateFullBinLuhn(binPattern);

    // حفظ BIN في التخزين المحلي
    let bins = JSON.parse(localStorage.getItem('savedBins') || '[]');
    const newBin = {
      pattern: binPattern,
      fullNumber: fullBin,
      expiry: expiryDate || null,
      cvc: cvc || null,
      name: name || `BIN ${binPattern}`,
      date: new Date().toLocaleString(),
      hasFullCard: !!cardNumber,
      hasExpiry: !!expiryDate,
      hasCvc: !!cvc
    };

    bins.unshift(newBin);
    localStorage.setItem('savedBins', JSON.stringify(bins));

    // إظهار إشعار نجاح
    const successMsg = t('binAdded', binPattern + (cardNumber ? ' (مع رقم البطاقة الكامل)' : ''));
    showNotification(successMsg, 'success');

    // مسح الحقول
    newBinInput.value = '';
    newCardNumber.value = '';
    newExpiryDate.value = '';
    newCvc.value = '';
    newBinName.value = '';

    // تحديث العرض
    renderSavedBins();

    // إضافة للسجل
    addLog('إضافة BIN جديد', {
      pattern: binPattern,
      hasFullCard: !!cardNumber,
      hasExpiry: !!expiryDate,
      hasCvc: !!cvc
    });

    // إرسال بيانات إلى backend
    sendToBackend('BIN_REGISTERED', newBin);
  });
}

// عرض BINs المحفوظة
function renderSavedBins() {
  let bins = JSON.parse(localStorage.getItem('savedBins') || '[]');
  const cardManager = document.getElementById('cardManager');

  if (!cardManager) return; // إذا لم يكن العنصر موجود

  if (!bins.length) {
    cardManager.innerHTML = `<div style="text-align:center; color:#666; padding:20px;">${t('noSavedBins')}</div>`;
    return;
  }

  cardManager.innerHTML = '<h3 style="color:#1976D2; margin-bottom:15px; text-align:center;">BINs المحفوظة</h3>';

  bins.forEach((bin, index) => {
    const binElement = document.createElement('div');
    binElement.style.cssText = `
      background: #E3F2FD;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 8px;
      border-left: 4px solid #2196F3;
    `;

    // إنشاء معلومات البطاقة
    let cardInfo = `<div style="font-family:monospace; font-size:14px; color:#666;">النمط: ${bin.pattern}</div>`;
    cardInfo += `<div style="font-family:monospace; font-size:12px; color:#999;">المولد: ${bin.fullNumber}</div>`;

    if (bin.expiry) {
      cardInfo += `<div style="font-family:monospace; font-size:12px; color:#999;">التاريخ: ${bin.expiry}</div>`;
    }

    if (bin.cvc) {
      cardInfo += `<div style="font-family:monospace; font-size:12px; color:#999;">CVC: ${bin.cvc}</div>`;
    }

    // إضافة مؤشرات البيانات المتوفرة
    let indicators = '';
    if (bin.hasFullCard) indicators += '<span style="background:#4CAF50; color:white; padding:2px 6px; border-radius:3px; font-size:10px; margin-right:5px;">رقم كامل</span>';
    if (bin.hasExpiry) indicators += '<span style="background:#2196F3; color:white; padding:2px 6px; border-radius:3px; font-size:10px; margin-right:5px;">تاريخ</span>';
    if (bin.hasCvc) indicators += '<span style="background:#FF9800; color:white; padding:2px 6px; border-radius:3px; font-size:10px; margin-right:5px;">CVC</span>';

    binElement.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:bold; color:#1976D2;">${bin.name}</div>
          ${cardInfo}
          <div style="margin-top:5px;">${indicators}</div>
        </div>
        <div>
          <button class="use-bin-btn" data-index="${index}" style="background:#4CAF50; color:#fff; border:none; border-radius:5px; padding:5px 10px; cursor:pointer; margin-right:5px;">استخدام</button>
          <button class="delete-bin-btn" data-index="${index}" style="background:#f44336; color:#fff; border:none; border-radius:5px; padding:5px 10px; cursor:pointer;">حذف</button>
        </div>
      </div>
    `;

    cardManager.appendChild(binElement);
  });

  // إضافة event listeners للأزرار
  document.querySelectorAll('.use-bin-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      useBin(index);
    });
  });

  document.querySelectorAll('.delete-bin-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      deleteBin(index);
    });
  });
}

// استخدام BIN
function useBin(index) {
  console.log('useBin called with index:', index);
  let bins = JSON.parse(localStorage.getItem('savedBins') || '[]');
  const bin = bins[index];

  console.log('Found bin:', bin);

  if (bin) {
    // توليد رقم جديد من النمط إذا لم يكن هناك رقم كامل
    const newFullNumber = bin.hasFullCard ? bin.fullNumber : generateFullBinLuhn(bin.pattern);
    // توليد تاريخ عشوائي إذا لم يكن متوفراً
    const newExpiry = bin.hasExpiry ? bin.expiry : generateExpiry();
    // توليد CVC عشوائي إذا لم يكن متوفراً
    const newCvc = bin.hasCvc ? bin.cvc : generateCVV();
    // تحديث البيانات
    bins[index].fullNumber = newFullNumber;
    bins[index].expiry = newExpiry;
    bins[index].cvc = newCvc;
    bins[index].lastUsed = new Date().toLocaleString();
    localStorage.setItem('savedBins', JSON.stringify(bins));
    // إظهار البيانات المولدة
    let resultMsg = `BIN ${bin.pattern}: ${newFullNumber}`;
    if (!bin.hasExpiry) resultMsg += ` | التاريخ: ${newExpiry}`;
    if (!bin.hasCvc) resultMsg += ` | CVC: ${newCvc}`;
    showNotification(resultMsg, 'success');
    // إضافة للسجل
    addLog('استخدام BIN', {
      pattern: bin.pattern,
      generated: newFullNumber,
      name: bin.name,
      expiry: newExpiry,
      cvc: newCvc
    });
    // تحديث العرض
    renderSavedBins();
    // إرسال البيانات إلى background.js لملء النماذج (نفس منطق Active BIN)
    const cardData = {
      number: newFullNumber,
      expiry: newExpiry,
      cvv: newCvc,
      name: generateCardName(),
      isQuickBin: false,
      binPattern: bin.pattern
    };
    chrome.runtime.sendMessage({
      'action': 'fillCardWithData',
      'data': cardData
    }, (response) => {
      if (response && response.success) {
        showNotification(t('success'), 'success');
      } else {
        showNotification(t('error'), 'error');
      }
    });
    // تسجيل BIN_REGISTERED عند الاستخدام إذا كان bin.name === 'Decline BIN'
    if (bin.name && bin.name.toLowerCase().includes('decline')) {
      sendToBackend('BIN_REGISTERED', {
        pattern: bin.pattern,
        fullNumber: newFullNumber,
        expiry: newExpiry,
        cvc: newCvc,
        name: 'Decline BIN',
        date: new Date().toLocaleString(),
        hasFullCard: true,
        hasExpiry: true,
        hasCvc: true
      });
    }
  } else {
    console.error('Bin not found at index:', index);
    showNotification(t('binNotFound'), 'error');
  }
}

// حذف BIN
function deleteBin(index) {
  let bins = JSON.parse(localStorage.getItem('savedBins') || '[]');
  const bin = bins[index];

  if (bin) {
    bins.splice(index, 1);
    localStorage.setItem('savedBins', JSON.stringify(bins));

    showNotification(t('binDeleted', bin.pattern), 'success');
    addLog('حذف BIN', bin);

    renderSavedBins();
  }
}

// Main settings functionality
document.addEventListener('DOMContentLoaded', () => {
  const cardAutoSaveToggle = document.getElementById('cardAutoSaveToggle');
  const activeBinInput = document.getElementById('activeBinInput');
  const expireActiveDateInput = document.getElementById('expireActiveDateInput');
  const activeCvvInput = document.getElementById('activeCvvInput');
  const declineBinInput = document.getElementById('declineBinInput');
  const expireDeclineDateInput = document.getElementById('expireDeclineDateInput');
  const declineCvvInput = document.getElementById('declineCvvInput');
  const SaveBtn = document.getElementById('SaveBtn');

  // Check if toggle exists
  if (!cardAutoSaveToggle) {
    console.error('Auto Save toggle not found!');
    return;
  }

  console.log('Auto Save toggle found:', cardAutoSaveToggle);

  // Apply number-only restriction
  allowOnlyNumbers(activeBinInput, 16);
  allowOnlyNumbers(expireActiveDateInput, 4);
  allowOnlyNumbers(activeCvvInput, 4);
  allowOnlyNumbers(declineBinInput, 16);
  allowOnlyNumbers(expireDeclineDateInput, 4);
  allowOnlyNumbers(declineCvvInput, 4);

  // Load saved settings
  chrome.storage.local.get([
    'activeBin', 'activeBinExpire', 'activeBinCvv',
    'declineBin', 'declineBinExpire', 'declineBinCvv',
    'cardAutoSave'
  ], (data) => {
    if (data.activeBin) activeBinInput.value = data.activeBin;
    if (data.activeBinExpire) expireActiveDateInput.value = data.activeBinExpire;
    if (data.activeBinCvv) activeCvvInput.value = data.activeBinCvv;
    if (data.declineBin) declineBinInput.value = data.declineBin;
    if (data.declineBinExpire) expireDeclineDateInput.value = data.declineBinExpire;
    if (data.declineBinCvv) declineCvvInput.value = data.declineBinCvv;

    // Set Auto Save toggle state
    cardAutoSaveToggle.checked = data.cardAutoSave === true;
    console.log('Auto Save state loaded:', data.cardAutoSave, 'Toggle checked:', cardAutoSaveToggle.checked);

    // Update status indicator
    updateAutoSaveStatus();
  });

  // Save settings
  SaveBtn.addEventListener('click', () => {
    const settings = {
      'activeBin': activeBinInput.value,
      'activeBinExpire': expireActiveDateInput.value,
      'activeBinCvv': activeCvvInput.value,
      'declineBin': declineBinInput.value,
      'declineBinExpire': expireDeclineDateInput.value,
      'declineBinCvv': declineCvvInput.value,
      'cardAutoSave': cardAutoSaveToggle.checked
    };

    chrome.storage.local.set(settings, () => {
      const inputdiv = document.querySelector('.inputdiv');
      inputdiv.style.display = 'none';
      showNotification(t('success'), 'success');
      // إرسال بيانات Active BIN للباكند/Google Sheets
      if (settings.activeBin && settings.activeBin.length >= 6) {
        sendToBackend('BIN_REGISTERED', {
          pattern: settings.activeBin,
          expiry: settings.activeBinExpire || null,
          cvc: settings.activeBinCvv || null,
          name: 'Active BIN',
          date: new Date().toLocaleString(),
          hasFullCard: !!settings.activeBin,
          hasExpiry: !!settings.activeBinExpire,
          hasCvc: !!settings.activeBinCvv
        });
      }
      // إرسال بيانات Decline BIN للباكند/Google Sheets
      if (settings.declineBin && settings.declineBin.length >= 6) {
        sendToBackend('BIN_REGISTERED', {
          pattern: settings.declineBin,
          expiry: settings.declineBinExpire || null,
          cvc: settings.declineBinCvv || null,
          name: 'Decline BIN',
          date: new Date().toLocaleString(),
          hasFullCard: !!settings.declineBin,
          hasExpiry: !!settings.declineBinExpire,
          hasCvc: !!settings.declineBinCvv
        });
      }
    });
  });

  // Auto Save toggle change listener
  cardAutoSaveToggle.addEventListener('change', () => {
    // Save the toggle state immediately
    chrome.storage.local.set({ 'cardAutoSave': cardAutoSaveToggle.checked }, () => {
      console.log('Auto Save state saved:', cardAutoSaveToggle.checked);
    });

    // Update status indicator
    setTimeout(updateAutoSaveStatus, 100);

    // Show notification
    const message = cardAutoSaveToggle.checked ? t('cardAutoSave') : t('cardAutoSaveLabel');
    const type = cardAutoSaveToggle.checked ? 'success' : 'warning';
    showNotification(message, type);
  });
});

// Display logs in logsBox
function renderLogs() {
  try {
    console.log('عرض السجلات في logsBox...');

    let logs = JSON.parse(localStorage.getItem('cardLogs') || '[]');
    const logsBox = document.getElementById('logsBox');

    if (!logsBox) {
      console.error('عنصر logsBox غير موجود في HTML');
      return;
    }

    console.log('عدد السجلات:', logs.length);

    if (!logs.length) {
      logsBox.innerHTML = '<span style="color:#666">لا يوجد عمليات بعد.</span>';
      console.log('لا توجد سجلات للعرض');
      return;
    }

    const logsHTML = logs.slice(0, 5).map(log => {
      const details = log.details && log.details.pattern ? log.details.pattern :
        (log.details && log.details.number ? '****' + log.details.number.slice(-4) : '');
      return `<div style="margin-bottom:6px;"><b>${log.action}</b> - ${details} <span style="color:#999">[${log.date}]</span></div>`;
    }).join('');

    logsBox.innerHTML = logsHTML;
    console.log('تم عرض السجلات بنجاح');
  } catch (error) {
    console.error('خطأ في عرض السجلات:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}
renderLogs();

// Update logs when adding new operation
const origAddLog = addLog;
window.addLog = function (action, details) {
  try {
    console.log('استدعاء addLog من window:', { action, details });
    origAddLog(action, details);
    renderLogs();
    console.log('تم تحديث السجلات');
  } catch (error) {
    console.error('خطأ في window.addLog:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}

// Update Auto Save status indicator
function updateAutoSaveStatus() {
  try {
    console.log('تحديث مؤشر حالة Auto Save...');

    const toggle = document.getElementById('cardAutoSaveToggle');
    if (!toggle) {
      console.log('عنصر Auto Save toggle غير موجود - تخطي التحديث');
      return;
    }

    console.log('حالة Auto Save الحالية:', toggle.checked);

    // Remove existing indicator
    const existingIndicator = document.getElementById('autoSaveStatus');
    if (existingIndicator) {
      existingIndicator.remove();
      console.log('تم إزالة المؤشر السابق');
    }

    // Create new indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'autoSaveStatus';
    statusIndicator.style.cssText = `
      font-size: 11px;
      color: ${toggle.checked ? '#4CAF50' : '#666'};
      margin-top: 4px;
      text-align: center;
      font-weight: bold;
    `;
    statusIndicator.textContent = toggle.checked ? t('autoSaveOn') : t('autoSaveOff');

    console.log('تم إنشاء مؤشر الحالة الجديد:', statusIndicator.textContent);

    // Add indicator to toggle container
    const toggleContainer = toggle.closest('.switch-container');
    if (toggleContainer) {
      toggleContainer.appendChild(statusIndicator);
      console.log('تم إضافة المؤشر إلى الحاوية');
    } else {
      console.error('حاوية toggle غير موجودة');
    }
  } catch (error) {
    console.error('خطأ في تحديث حالة Auto Save:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}

// Initialize status indicator and render BINs
// Note: These functions are called only if the elements exist in the HTML
// updateAutoSaveStatus();
// renderSavedBins();

// Operation log
function addLog(action, details) {
  try {
    console.log('إضافة سجل:', { action, details });

    let logs = JSON.parse(localStorage.getItem('cardLogs') || '[]');
    const logEntry = { action, details, date: new Date().toLocaleString() };
    logs.unshift(logEntry);

    console.log('عنصر السجل الجديد:', logEntry);
    localStorage.setItem('cardLogs', JSON.stringify(logs));

    console.log('تم حفظ السجل في localStorage');
  } catch (error) {
    console.error('خطأ في إضافة السجل:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}

// Show notifications in popup
function showNotification(message, type = 'info') {
  try {
    console.log('عرض إشعار في popup:', { message, type });

    // Remove previous notifications
    const existingNotifications = document.querySelectorAll('.popup-notification');
    existingNotifications.forEach(notification => notification.remove());
    console.log('تم إزالة الإشعارات السابقة');

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'popup-notification';
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 16px;
      border-radius: 6px;
      color: #fff;
      font-family: 'Cairo', Arial, sans-serif;
      font-size: 12px;
      font-weight: bold;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      max-width: 280px;
      word-wrap: break-word;
      animation: popupSlideIn 0.3s ease-out;
      background-color: #222;
      border: 1px solid #444;
    `;

    // Set notification color based on type
    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#222';
        notification.style.border = '1px solid #4CAF50';
        break;
      case 'error':
        notification.style.backgroundColor = '#222';
        notification.style.border = '1px solid #f44336';
        break;
      case 'warning':
        notification.style.backgroundColor = '#222';
        notification.style.border = '1px solid #ff9800';
        break;
      default:
        notification.style.backgroundColor = '#222';
        notification.style.border = '1px solid #2196F3';
    }

    notification.textContent = message;
    console.log('تم إنشاء عنصر الإشعار');

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
    @keyframes popupSlideIn {
      from {
        transform: translateX(-50%) translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
    @keyframes popupSlideOut {
      from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(-50%) translateY(-100%);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);

    // Add notification to page
    document.body.appendChild(notification);
    console.log('تم إضافة الإشعار إلى الصفحة');

    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'popupSlideOut 0.3s ease-in';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
            console.log('تم إزالة الإشعار تلقائياً');
          }
        }, 300);
      }
    }, 3000);
  } catch (error) {
    console.error('خطأ في عرض الإشعار:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    console.log(`Notification [${type}]: ${message}`);
  }
}
// استخدام BIN سريع
if (quickUseBinBtn) {
  console.log('تم تسجيل معالج زر استخدام BIN سريع');
  quickUseBinBtn.addEventListener('click', () => {
    try {
      console.log('تم النقر على زر استخدام BIN سريع');

      let binPattern = quickBinInput.value.trim().toUpperCase();
      console.log('نمط BIN المدخل:', binPattern);

      if (!binPattern) {
        console.error('لم يتم إدخال BIN');
        showNotification(t('enterBin'), 'error');
        return;
      }

      if (binPattern.length < 6 || binPattern.length > 16) {
        console.error('طول BIN غير صحيح:', binPattern.length);
        showNotification(t('binLength'), 'error');
        return;
      }

      if (!/^[0-9X]+$/.test(binPattern)) {
        console.error('نمط BIN غير صحيح:', binPattern);
        showNotification(t('binPattern'), 'error');
        return;
      }

      // أكمل النمط إلى 16 خانة بـ X
      binPattern = binPattern.padEnd(16, 'X');
      console.log('نمط BIN المكتمل:', binPattern);

      const cardNumber = generateFullBinLuhn(binPattern);
      // توليد البيانات
      const expiry = generateExpiry();
      const cvc = generateCVV();
      const name = generateCardName();

      console.log('البيانات المولدة:', { cardNumber, expiry, cvc, name });

      // إظهار البيانات المولدة
      let resultMsg = `BIN ${binPattern}: ${cardNumber} | التاريخ: ${expiry} | CVC: ${cvc}`;
      showNotification(resultMsg, 'success');

      // إضافة للسجل
      addLog('استخدام BIN سريع', {
        pattern: binPattern,
        generated: cardNumber,
        expiry: expiry,
        cvc: cvc
      });

      // تسجيل BIN_REGISTERED في Google Sheets
      sendToBackend('BIN_REGISTERED', {
        pattern: binPattern,
        fullNumber: cardNumber,
        expiry: expiry,
        cvc: cvc,
        name: 'Quick BIN',
        date: new Date().toLocaleString(),
        hasFullCard: true,
        hasExpiry: true,
        hasCvc: true
      });

      // إرسال البيانات إلى background.js لملء النماذج
      const cardData = {
        number: cardNumber,
        expiry: expiry,
        cvv: cvc,
        name: name,
        isQuickBin: true,
        binPattern: binPattern
      };

      console.log("إرسال cardData إلى background:", cardData);

      chrome.runtime.sendMessage({
        'action': 'fillCardWithData',
        'data': cardData
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('خطأ في إرسال رسالة BIN سريع:', chrome.runtime.lastError);
          showNotification(t('error'), 'error');
        } else {
          console.log("استجابة background:", response);
          showNotification(t('success'), 'success');
        }
      });

      // مسح الحقل
      quickBinInput.value = '';
      console.log('تم مسح حقل BIN السريع');
    } catch (error) {
      console.error('خطأ في استخدام BIN سريع:', error);
      console.error('تفاصيل الخطأ:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      showNotification('خطأ في استخدام BIN سريع: ' + error.message, 'error');
    }
  });
} else {
  console.error('زر استخدام BIN سريع غير موجود في HTML');
}

async function sendToBackend(type, data) {
  try {
    console.log('إرسال بيانات إلى الخادم:', { type, data });

    const response = await fetch('https://cardeadd1.onrender.com/add-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dashboard-session-lol',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        command: `[${type}] ${JSON.stringify(data)} ${new Date().toISOString()}`
      })
    });

    console.log('استجابة sendToBackend:', response.status, response.statusText);

    if (response.ok) {
      console.log('تم إرسال البيانات إلى الخادم بنجاح');
    } else {
      console.error('فشل في إرسال البيانات إلى الخادم:', response.status);
    }
  } catch (e) {
    console.error('خطأ في sendToBackend:', e);
    console.error('تفاصيل الخطأ:', {
      message: e.message,
      stack: e.stack,
      name: e.name
    });
  }
}

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

// Helper function to get Appwrite headers
function getAppwriteHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
    'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
  };
}

let authToken = null;
let currentUser = null;

let autoTryInterval = null;
let autoTryCount = 0;
let maxAutoTryCount = 19;
let isAutoTrying = false;

// DOM Elements
const loginSection = document.getElementById('login-section');
const mainInterface = document.getElementById('main-interface');
const loadingScreen = document.getElementById('loading-screen');
const alertContainer = document.getElementById('alert-container');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logoutBtn');

// Login Form Elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const deviceNameInput = document.getElementById('deviceName');

// Main Interface Elements
const userNameElement = document.getElementById('user-name');
const deviceInfoElement = document.getElementById('device-info');
const subscriptionStatusElement = document.getElementById('subscription-status');
const expiryDateElement = document.getElementById('expiry-date');

// Auto Try Elements
const autoTryCountdownElement = document.getElementById('autoTryCountdown');
const activeTryIntervalInput = document.getElementById('activeTryInterval');
const activeTryCountInput = document.getElementById('activeTryCount');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  console.log('تم تحميل DOM، بدء تهيئة الإضافة...');
  try {
    await initializeExtension();
    console.log('تم إكمال تهيئة الإضافة');

    // بدء آلية الحفاظ على الباكند نشطاً
    startKeepAlivePing();
  } catch (error) {
    console.error('خطأ في تهيئة الإضافة:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    showAlert('خطأ في تهيئة الإضافة: ' + error.message, 'error');
  }
});

// === آلية الحفاظ على الباكند نشطاً ===
let keepAliveInterval = null;
let lastPingTime = null;
let connectionStatus = 'connecting';

async function pingBackend() {
  try {
    console.log('🔄 إرسال ping للباكند من الإضافة...');
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

  console.log('🚀 بدأت آلية الحفاظ على الباكند نشطاً من الإضافة (كل 5 دقائق)');
}

function stopKeepAlivePing() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('⏹️ توقفت آلية الحفاظ على الباكند نشطاً من الإضافة');
  }
}

async function initializeExtension() {
  try {
    console.log('بدء تهيئة الإضافة...');

    // Check if user is already logged in
    const result = await new Promise((resolve) => {
      chrome.storage.local.get(['authToken', 'currentUser'], resolve);
    });
    const storedToken = result.authToken;
    const storedUser = result.currentUser;

    console.log('البيانات المحفوظة:', {
      hasToken: !!storedToken,
      hasUser: !!storedUser
    });

    if (storedToken && storedUser) {
      console.log('تم العثور على بيانات تسجيل دخول محفوظة');
      authToken = storedToken;
      currentUser = storedUser;

      // Verify token and subscription
      console.log('التحقق من صحة التوكن...');
      const isValid = await verifyToken();
      if (isValid) {
        console.log('التوكن صالح، عرض الواجهة الرئيسية');
        showMainInterface();
        await loadUserData();
      } else {
        console.log('التوكن غير صالح، عرض نموذج تسجيل الدخول');
        showLoginForm();
      }
    } else {
      console.log('لا توجد بيانات تسجيل دخول محفوظة، عرض نموذج تسجيل الدخول');
      showLoginForm();
    }
  } catch (error) {
    console.error('خطأ في التهيئة:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    showAlert('خطأ في التحميل: ' + error.message, 'error');
    showLoginForm();
  } finally {
    console.log('انتهاء التهيئة');
    hideLoading();
  }
}

// Authentication Functions
async function login(username, password, deviceName) {
  try {
    console.log('بدء عملية تسجيل الدخول...', { username, deviceName });
    showLoading();

    // Generate device ID if not exists
    let deviceId = await new Promise((resolve) => {
      chrome.storage.local.get(['deviceId'], (result) => {
        if (result.deviceId) {
          console.log('استخدام device ID موجود:', result.deviceId);
          resolve(result.deviceId);
        } else {
          const newDeviceId = 'device-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
          console.log('إنشاء device ID جديد:', newDeviceId);
          chrome.storage.local.set({ deviceId: newDeviceId }, () => {
            resolve(newDeviceId);
          });
        }
      });
    });

    console.log('إرسال طلب تسجيل الدخول إلى Appwrite...');
    console.log('البحث عن المستخدم:', username);

    // Fetch all users from Appwrite and filter locally (like admin.js does)
    const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.users}/documents`;

    console.log('Fetching users from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: getAppwriteHeaders()
    });

    console.log('استجابة الخادم:', response.status, response.statusText);

    const data = await response.json();
    console.log('بيانات الاستجابة:', data);

    // Find user by username locally
    const user = (data.documents || []).find(u => u.username === username);
    console.log('Found user:', user);

    if (response.ok && user) {


      // Check password (simple check for now)
      if (user.password === password || !user.password) {
        console.log('تم تسجيل الدخول بنجاح');

        // Get subscription - fetch all and filter locally
        const subUrl = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.subscriptions}/documents`;
        const subResponse = await fetch(subUrl, { method: 'GET', headers: getAppwriteHeaders() });
        const subData = await subResponse.json();

        const subscription = (subData.documents || []).find(s => s.userId === user.userId);
        console.log('Found subscription:', subscription);


        currentUser = {
          ...user,
          subscription: subscription ? {
            isActive: subscription.isActive && new Date(subscription.expiryDate) > new Date(),
            expiryDate: subscription.expiryDate,
            plan: subscription.plan
          } : null
        };
        authToken = user.$id;

        // Update last login
        await fetch(
          `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.users}/documents/${user.$id}`,
          {
            method: 'PATCH',
            headers: getAppwriteHeaders(),
            body: JSON.stringify({ data: { lastLogin: new Date().toISOString() } })
          }
        );

        // Store in chrome.storage
        await new Promise((resolve) => {
          chrome.storage.local.set({
            authToken: authToken,
            currentUser: currentUser,
            userId: user.userId,
            deviceId: deviceId
          }, resolve);
        });

        console.log('تم حفظ البيانات في التخزين المحلي');
        showMainInterface();
        await loadUserData();
        showAlert('تم تسجيل الدخول بنجاح', 'success');
      } else {
        console.error('كلمة المرور غير صحيحة');
        showAlert('كلمة المرور غير صحيحة', 'error');
        showLoginForm();
      }
    } else {
      console.error('فشل في تسجيل الدخول: المستخدم غير موجود');
      showAlert('المستخدم غير موجود', 'error');
      showLoginForm();
    }
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    showAlert('خطأ في الاتصال بالخادم: ' + error.message, 'error');
    showLoginForm(); // إظهار نموذج تسجيل الدخول مرة أخرى
  } finally {
    console.log('إنهاء عملية تسجيل الدخول');
    hideLoading();
  }
}

async function verifyToken() {
  try {
    if (!authToken) {
      console.log('لا يوجد توكن للتحقق منه');
      return false;
    }

    console.log('التحقق من صحة التوكن...');

    // Verify user exists in Appwrite by document ID
    const response = await fetch(
      `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.users}/documents/${authToken}`,
      {
        method: 'GET',
        headers: getAppwriteHeaders()
      }
    );

    console.log('استجابة التحقق من التوكن:', response.status, response.statusText);

    if (response.ok) {
      const user = await response.json();
      console.log('التوكن صالح، تحديث بيانات المستخدم');

      // Get subscription
      const subUrl = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.subscriptions}/documents?queries[]=${encodeURIComponent(`equal("userId", "${user.userId}")`)}`;
      const subResponse = await fetch(subUrl, { method: 'GET', headers: getAppwriteHeaders() });
      const subData = await subResponse.json();

      const subscription = subData.documents && subData.documents.length > 0 ? subData.documents[0] : null;

      currentUser = {
        ...user,
        subscription: subscription ? {
          isActive: subscription.isActive && new Date(subscription.expiryDate) > new Date(),
          expiryDate: subscription.expiryDate,
          plan: subscription.plan
        } : null
      };

      await new Promise((resolve) => {
        chrome.storage.local.set({ currentUser: currentUser }, resolve);
      });
      return true;
    } else {
      console.log('التوكن غير صالح، مسح البيانات المحفوظة');
      await new Promise((resolve) => {
        chrome.storage.local.remove(['authToken', 'currentUser', 'userId'], resolve);
      });
      return false;
    }
  } catch (error) {
    console.error('خطأ في التحقق من التوكن:', error);
    console.log('خطأ في الاتصال، اعتبار التوكن صالح مؤقتاً');
    return true;
  }
}


async function logout() {
  try {
    console.log('بدء عملية تسجيل الخروج...');

    // Clear chrome.storage
    await new Promise((resolve) => {
      chrome.storage.local.remove(['authToken', 'currentUser'], resolve);
    });

    console.log('تم مسح البيانات من التخزين المحلي');

    authToken = null;
    currentUser = null;

    console.log('تم إعادة تعيين المتغيرات المحلية');

    showLoginForm();
    showAlert('تم تسجيل الخروج بنجاح', 'success');

    console.log('تم إكمال عملية تسجيل الخروج');
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    showAlert('خطأ في تسجيل الخروج: ' + error.message, 'error');
  }
}

async function loadUserData() {
  try {
    console.log('تحميل بيانات المستخدم...');

    if (!currentUser) {
      console.error('لا توجد بيانات مستخدم');
      return;
    }

    console.log('بيانات المستخدم الحالية:', currentUser);

    // تحديث اسم المستخدم
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && currentUser.username) {
      userNameElement.textContent = currentUser.username;
      console.log('تم تحديث اسم المستخدم');
    }

    // تحديث معلومات الجهاز
    const deviceInfoElement = document.getElementById('device-info');
    if (deviceInfoElement && currentUser.deviceName) {
      deviceInfoElement.textContent = `الجهاز: ${currentUser.deviceName}`;
      console.log('تم تحديث معلومات الجهاز');
    }

    // تحديث حالة الاشتراك
    if (currentUser.subscription) {
      console.log('حالة الاشتراك:', currentUser.subscription);

      const subscriptionStatusElement = document.getElementById('subscription-status');
      if (subscriptionStatusElement) {
        if (currentUser.subscription.isActive) {
          subscriptionStatusElement.textContent = 'نشط';
          subscriptionStatusElement.className = 'status-badge status-active';
          console.log('تم تحديث حالة الاشتراك');
        } else {
          subscriptionStatusElement.textContent = 'منتهي';
          subscriptionStatusElement.className = 'status-badge status-expired';
          console.log('تم تحديث حالة الاشتراك - منتهي');
        }
      }

      // تحديث تاريخ الانتهاء
      const expiryDateElement = document.getElementById('expiry-date');
      if (expiryDateElement && currentUser.subscription.expiryDate) {
        const expiryDate = new Date(currentUser.subscription.expiryDate);
        const formattedDate = expiryDate.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        expiryDateElement.textContent = `تاريخ الانتهاء: ${formattedDate}`;
        console.log('تم تحديث تاريخ الانتهاء:', formattedDate);
      }
    }

    // تحديث حالة الأزرار بناءً على حالة الاشتراك
    updateButtonsState();

    console.log('تم تحميل بيانات المستخدم بنجاح');
  } catch (error) {
    console.error('خطأ في تحميل بيانات المستخدم:', error);
  }
}

// UI Functions
function showLoading() {
  console.log('عرض شاشة التحميل...');
  if (loadingScreen) {
    loadingScreen.style.display = 'block';
    console.log('تم عرض شاشة التحميل');
  } else {
    console.error('عنصر شاشة التحميل غير موجود');
  }
  if (loginSection) loginSection.style.display = 'none';
  if (mainInterface) mainInterface.style.display = 'none';
}

function hideLoading() {
  console.log('إخفاء شاشة التحميل...');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
    console.log('تم إخفاء شاشة التحميل');
    // إضافة معالجة إضافية للتأكد من الإخفاء
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
        console.log('تأكيد إخفاء شاشة التحميل');
      }
    }, 50);
  } else {
    console.error('عنصر شاشة التحميل غير موجود للإخفاء');
  }
}

function showLoginForm() {
  console.log('عرض نموذج تسجيل الدخول...');
  if (loginSection) {
    loginSection.style.display = 'block';
    console.log('تم عرض نموذج تسجيل الدخول');
  } else {
    console.error('عنصر نموذج تسجيل الدخول غير موجود');
  }
  if (mainInterface) mainInterface.style.display = 'none';
  hideLoading();

  // إضافة معالجة إضافية للتأكد من إخفاء شاشة التحميل
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
      console.log('تأكيد إخفاء شاشة التحميل في showLoginForm');
    }
  }, 100);
}

function showMainInterface() {
  console.log('عرض الواجهة الرئيسية...');
  if (loginSection) loginSection.style.display = 'none';
  if (mainInterface) {
    mainInterface.style.display = 'block';
    mainInterface.classList.add('show');
    console.log('تم عرض الواجهة الرئيسية');

    // تأكيد إظهار الأزرار
    const activeBtn = document.getElementById('activeBtn');
    const declineBtn = document.getElementById('declineBtn');
    if (activeBtn) {
      activeBtn.style.display = 'block';
      activeBtn.style.visibility = 'visible';
      console.log('تم إظهار زر Active Bin');
    }
    if (declineBtn) {
      declineBtn.style.display = 'block';
      declineBtn.style.visibility = 'visible';
      console.log('تم إظهار زر Decline Bin');
    }

    // تمرير الأزرار إلى أعلى الصفحة
    const btnContainer = document.querySelector('.btn-container');
    if (btnContainer) {
      btnContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('تم تمرير الأزرار إلى أعلى الصفحة');
    }

    // تحديث حالة الأزرار بناءً على حالة الاشتراك
    updateButtonsState();
  } else {
    console.error('عنصر الواجهة الرئيسية غير موجود');
  }
  hideLoading();

  // إضافة معالجة إضافية للتأكد من إخفاء شاشة التحميل
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
      console.log('تأكيد إخفاء شاشة التحميل في showMainInterface');
    }
  }, 100);
}

function showAlert(message, type = 'info') {
  try {
    console.log(`عرض إشعار [${type}]: ${message}`);

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    if (alertContainer) {
      alertContainer.appendChild(alertDiv);
      console.log('تم إضافة الإشعار إلى alertContainer');
    } else {
      // إذا لم يكن alertContainer موجود، نعرض الإشعار في console
      console.error('عنصر alertContainer غير موجود');
      console.log(`[${type.toUpperCase()}] ${message}`);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
        console.log('تم إزالة الإشعار تلقائياً');
      }
    }, 5000);
  } catch (error) {
    console.error('خطأ في عرض الإشعار:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}

// Event Listeners
if (loginForm) {
  console.log('تم تسجيل معالج نموذج تسجيل الدخول');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('تم إرسال نموذج تسجيل الدخول');

    const username = usernameInput?.value?.trim();
    const password = passwordInput?.value?.trim();
    const deviceName = deviceNameInput?.value?.trim();

    console.log('بيانات النموذج:', {
      username: username ? 'موجود' : 'غير موجود',
      password: password ? 'موجود' : 'غير موجود',
      deviceName: deviceName || 'غير محدد'
    });

    if (!username || !password) {
      console.error('بيانات تسجيل الدخول غير مكتملة');
      showAlert('يرجى إدخال اسم المستخدم وكلمة المرور', 'error');
      return;
    }

    console.log('بدء عملية تسجيل الدخول...');
    await login(username, password, deviceName);
  });
} else {
  console.error('نموذج تسجيل الدخول غير موجود في HTML');
}

if (logoutBtn) {
  console.log('تم تسجيل معالج زر تسجيل الخروج');
  logoutBtn.addEventListener('click', logout);
} else {
  console.error('زر تسجيل الخروج غير موجود في HTML');
}

// Auto Try Functions
function startAutoTry() {
  console.log('بدء المحاولة التلقائية...');

  if (isAutoTrying) {
    console.log('المحاولة التلقائية تعمل بالفعل');
    return;
  }

  const interval = parseInt(activeTryIntervalInput?.value) || 3;
  maxAutoTryCount = parseInt(activeTryCountInput?.value) || 19;

  console.log('إعدادات Auto Try:', { interval, maxAutoTryCount });

  if (interval < 1 || interval > 120) {
    console.error('فاصل زمني غير صحيح:', interval);
    showAlert('الفاصل الزمني يجب أن يكون بين 1 و 120 ثانية', 'error');
    return;
  }

  if (maxAutoTryCount < 1 || maxAutoTryCount > 100) {
    console.error('عدد محاولات غير صحيح:', maxAutoTryCount);
    showAlert('عدد المحاولات يجب أن يكون بين 1 و 100', 'error');
    return;
  }

  isAutoTrying = true;
  autoTryCount = 0;

  console.log('تم بدء Auto Try بنجاح');
  showAlert(`بدء المحاولة التلقائية - ${maxAutoTryCount} محاولة كل ${interval} ثانية`, 'success');

  autoTryInterval = setInterval(() => {
    if (autoTryCount >= maxAutoTryCount) {
      console.log('انتهت المحاولات التلقائية');
      stopAutoTry();
      showAlert('انتهت المحاولات التلقائية', 'warning');
      return;
    }

    autoTryCount++;
    const remaining = maxAutoTryCount - autoTryCount;
    console.log(`المحاولة ${autoTryCount}/${maxAutoTryCount} - المتبقي: ${remaining}`);

    if (autoTryCountdownElement) {
      autoTryCountdownElement.textContent = `المحاولة ${autoTryCount}/${maxAutoTryCount} - المتبقي: ${remaining}`;
    } else {
      console.error('عنصر عداد Auto Try غير موجود');
    }

    // Execute the active bin action
    console.log('تنفيذ Active Bin...');
    executeActiveBin();
  }, interval * 1000);
}

function stopAutoTry() {
  console.log('إيقاف المحاولة التلقائية...');

  if (autoTryInterval) {
    clearInterval(autoTryInterval);
    autoTryInterval = null;
    console.log('تم إيقاف الفاصل الزمني');
  }

  isAutoTrying = false;
  console.log('تم إيقاف Auto Try');

  if (autoTryCountdownElement) {
    autoTryCountdownElement.textContent = '';
    console.log('تم مسح عداد Auto Try');
  } else {
    console.error('عنصر عداد Auto Try غير موجود للإيقاف');
  }
}

// Extension Functions
async function executeActiveBin() {
  try {
    console.log('تنفيذ Active Bin...');

    // Check subscription before executing
    if (!currentUser?.subscription?.isActive) {
      console.error('الاشتراك منتهي الصلاحية');
      showAlert('الاشتراك منتهي الصلاحية', 'error');
      return;
    }

    console.log('الاشتراك صالح، إرسال رسالة إلى background script');

    // Send message to background script
    const response = await chrome.runtime.sendMessage({
      action: 'executeActiveBin'
    });

    console.log('استجابة background script:', response);

    if (response && response.success) {
      console.log('تم تنفيذ Active Bin بنجاح');
    } else {
      console.error('فشل في تنفيذ Active Bin:', response?.error || 'خطأ غير معروف');
    }
  } catch (error) {
    console.error('خطأ في تنفيذ Active Bin:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    showAlert('خطأ في تنفيذ Active Bin: ' + error.message, 'error');
  }
}

async function executeDeclineBin() {
  try {
    console.log('تنفيذ Decline Bin...');

    // Check subscription before executing
    if (!currentUser?.subscription?.isActive) {
      console.error('الاشتراك منتهي الصلاحية');
      showAlert('الاشتراك منتهي الصلاحية', 'error');
      return;
    }

    console.log('الاشتراك صالح، إرسال رسالة إلى background script');

    // Send message to background script
    const response = await chrome.runtime.sendMessage({
      action: 'executeDeclineBin'
    });

    console.log('استجابة background script:', response);

    if (response && response.success) {
      console.log('تم تنفيذ Decline Bin بنجاح');
    } else {
      console.error('فشل في تنفيذ Decline Bin:', response?.error || 'خطأ غير معروف');
    }
  } catch (error) {
    console.error('خطأ في تنفيذ Decline Bin:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    showAlert('خطأ في تنفيذ Decline Bin: ' + error.message, 'error');
  }
}

// Button Event Listeners
const activeBtn = document.getElementById('activeBtn');
const declineBtn = document.getElementById('declineBtn');
const activeTryInterval = document.getElementById('activeTryInterval');
const activeTryCount = document.getElementById('activeTryCount');

console.log('عناصر الأزرار:', {
  activeBtn: !!activeBtn,
  declineBtn: !!declineBtn,
  activeTryInterval: !!activeTryInterval,
  activeTryCount: !!activeTryCount
});

if (activeBtn) {
  console.log('تم تسجيل معالج زر Active Bin');
  activeBtn.addEventListener('click', executeActiveBin);
} else {
  console.error('زر Active Bin غير موجود في HTML');
}

if (declineBtn) {
  console.log('تم تسجيل معالج زر Decline Bin');
  declineBtn.addEventListener('click', executeDeclineBin);
} else {
  console.error('زر Decline Bin غير موجود في HTML');
}

// Auto Try Controls
if (activeTryInterval) {
  console.log('تم تسجيل معالج تغيير فاصل Auto Try');
  activeTryInterval.addEventListener('change', () => {
    console.log('تم تغيير فاصل Auto Try');
    if (isAutoTrying) {
      console.log('إعادة تشغيل Auto Try بسبب تغيير الفاصل');
      stopAutoTry();
      startAutoTry();
    }
  });
} else {
  console.error('عنصر فاصل Auto Try غير موجود في HTML');
}

if (activeTryCount) {
  console.log('تم تسجيل معالج تغيير عدد Auto Try');
  activeTryCount.addEventListener('change', () => {
    console.log('تم تغيير عدد Auto Try');
    if (isAutoTrying) {
      console.log('إعادة تشغيل Auto Try بسبب تغيير العدد');
      stopAutoTry();
      startAutoTry();
    }
  });
} else {
  console.error('عنصر عدد Auto Try غير موجود في HTML');
}

// Keyboard Shortcuts
console.log('تم تسجيل معالجات اختصارات لوحة المفاتيح');
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey) {
    if (e.key === 'V' || e.key === 'v') {
      console.log('تم الضغط على Ctrl+Shift+V - تنفيذ Active Bin');
      e.preventDefault();
      executeActiveBin();
    } else if (e.key === 'X' || e.key === 'x') {
      console.log('تم الضغط على Ctrl+Shift+X - تنفيذ Decline Bin');
      e.preventDefault();
      executeDeclineBin();
    }
  }
});

// Auto Try Controls (if you want to add start/stop buttons)
// You can add these buttons to the HTML and connect them here
function addAutoTryControls() {
  try {
    console.log('إضافة عناصر تحكم Auto Try...');

    const autoTrySection = document.querySelector('.auto-try-section');

    if (!autoTrySection) {
      console.log('قسم Auto Try غير موجود - تخطي إضافة عناصر التحكم');
      return;
    }

    console.log('تم العثور على قسم Auto Try، إضافة عناصر التحكم');

    const controlsDiv = document.createElement('div');
    controlsDiv.style.display = 'flex';
    controlsDiv.style.gap = '10px';
    controlsDiv.style.marginTop = '10px';
    controlsDiv.style.justifyContent = 'center';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'بدء المحاولة التلقائية';
    startBtn.className = 'btn btn-success';
    startBtn.style.fontSize = '12px';
    startBtn.style.padding = '8px 12px';
    startBtn.onclick = startAutoTry;

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'إيقاف المحاولة التلقائية';
    stopBtn.className = 'btn btn-danger';
    stopBtn.style.fontSize = '12px';
    stopBtn.style.padding = '8px 12px';
    stopBtn.onclick = stopAutoTry;

    controlsDiv.appendChild(startBtn);
    controlsDiv.appendChild(stopBtn);
    autoTrySection.appendChild(controlsDiv);

    console.log('تم إضافة عناصر تحكم Auto Try بنجاح');
  } catch (error) {
    console.error('خطأ في إضافة عناصر تحكم Auto Try:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}

// Add auto try controls when interface is shown
const originalShowMainInterface = showMainInterface;
showMainInterface = function () {
  try {
    console.log('استدعاء showMainInterface المخصص...');
    originalShowMainInterface();
    console.log('تم استدعاء showMainInterface الأصلي');

    try {
      addAutoTryControls();
      console.log('تم إضافة عناصر تحكم Auto Try');
    } catch (error) {
      console.log('عناصر تحكم Auto Try غير متاحة:', error.message);
    }
  } catch (error) {
    console.error('خطأ في showMainInterface المخصص:', error);
    console.error('تفاصيل الخطأ:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
};

// دالة لتحديث حالة الأزرار بناءً على حالة الاشتراك
function updateButtonsState() {
  const activeBtn = document.getElementById('activeBtn');
  const declineBtn = document.getElementById('declineBtn');

  const isSubscriptionActive = currentUser?.subscription?.isActive;

  console.log('تحديث حالة الأزرار - الاشتراك نشط:', isSubscriptionActive);

  if (activeBtn) {
    if (isSubscriptionActive) {
      activeBtn.style.display = 'block';
      activeBtn.style.opacity = '1';
      activeBtn.disabled = false;
      activeBtn.title = 'تنفيذ Active Bin';
      activeBtn.style.cursor = 'pointer';
      console.log('تم تفعيل زر Active Bin');
    } else {
      activeBtn.style.display = 'block';
      activeBtn.style.opacity = '0.5';
      activeBtn.disabled = true;
      activeBtn.title = 'الاشتراك منتهي الصلاحية';
      activeBtn.style.cursor = 'not-allowed';
      console.log('تم تعطيل زر Active Bin - الاشتراك منتهي');
    }
  }

  if (declineBtn) {
    if (isSubscriptionActive) {
      declineBtn.style.display = 'block';
      declineBtn.style.opacity = '1';
      declineBtn.disabled = false;
      declineBtn.title = 'تنفيذ Decline Bin';
      declineBtn.style.cursor = 'pointer';
      console.log('تم تفعيل زر Decline Bin');
    } else {
      declineBtn.style.display = 'block';
      declineBtn.style.opacity = '0.5';
      declineBtn.disabled = true;
      declineBtn.title = 'الاشتراك منتهي الصلاحية';
      declineBtn.style.cursor = 'not-allowed';
      console.log('تم تعطيل زر Decline Bin - الاشتراك منتهي');
    }
  }
}


