# 🚀 نشر Appwrite Function

## الخطوة 1: إعداد Appwrite CLI

```bash
# تثبيت Appwrite CLI
npm install -g appwrite-cli

# تسجيل الدخول
appwrite login
```

## الخطوة 2: إنشاء Function في Appwrite Console

1. افتح [Appwrite Console](https://cloud.appwrite.io)
2. اذهب لـ **Functions** → **Create Function**
3. اختر:
   - **Name:** `save-data`
   - **Runtime:** `Node.js 18.0`
   - **Entrypoint:** `src/main.js`

## الخطوة 3: إضافة Environment Variables

في إعدادات الـ Function، أضف:

| Variable | Value |
|----------|-------|
| `APPWRITE_ENDPOINT` | `https://nyc.cloud.appwrite.io/v1` |
| `APPWRITE_PROJECT_ID` | `693631c8001ac4fbc231` |
| `APPWRITE_DATABASE_ID` | `69363201001bc7a64088` |
| `APPWRITE_API_KEY` | `[API KEY الخاص بك]` |

## الخطوة 4: رفع الكود

### الطريقة 1: من Appwrite Console
1. اضغط **Create Deployment**
2. اختر **Manual**
3. ارفع ملفات المجلد `functions/save-data`

### الطريقة 2: من CLI
```bash
cd functions/save-data
appwrite functions createDeployment --functionId=save-data --entrypoint=src/main.js --commands="npm install" --code=.
```

## الخطوة 5: الحصول على Function URL

بعد النشر، ستحصل على URL مثل:
```
https://nyc.cloud.appwrite.io/v1/functions/[FUNCTION_ID]/executions
```

احفظ هذا الـ URL، سنستخدمه في الإكستنشن!

---

## ⚠️ مهم: تحديث الإكستنشن

بعد نشر الـ Function، حدث ملف `background.js` بـ:
1. إزالة `apiSecret` نهائياً
2. استخدام Function URL الجديد
