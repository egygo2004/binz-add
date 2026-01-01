// =============================================
// 🔒 SECURE CONFIGURATION - Doc_HEMA Team
// =============================================
// This file contains ONLY non-sensitive config
// API Key is stored securely on Appwrite Function server

const SECURE_CONFIG = {
    // Function URL (replace with your deployed function URL)
    functionUrl: 'https://nyc.cloud.appwrite.io/v1/functions/YOUR_FUNCTION_ID/executions',

    // Project ID (not secret - needed for Function calls)
    projectId: '693631c8001ac4fbc231',

    // Collection names (not secret)
    collections: {
        users: 'users',
        subscriptions: 'subscriptions',
        bins: 'bins',
        cookies: 'cookies',
        logs: 'logs'
    },

    // Rate limit settings (for client-side throttling)
    rateLimit: {
        maxRequestsPerMinute: 20,
        minIntervalMs: 3000
    }
};

// ⚠️ IMPORTANT: Update functionUrl after deploying the Appwrite Function!
// Steps:
// 1. Deploy functions/save-data to Appwrite
// 2. Get the Function ID from Appwrite Console
// 3. Replace YOUR_FUNCTION_ID above with the actual ID

if (typeof module !== 'undefined') {
    module.exports = { SECURE_CONFIG };
}
