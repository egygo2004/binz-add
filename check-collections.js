// Check logs collection attributes
const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3'
};

async function checkLogsSchema() {
    try {
        const response = await fetch(`${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/logs/attributes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
                'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
            }
        });
        const data = await response.json();
        console.log('Logs collection attributes:');
        data.attributes.forEach(a => {
            console.log(`  - ${a.key} (${a.type}, required: ${a.required}, size: ${a.size || 'N/A'})`);
        });

        // Also check cookies collection
        const cookiesResponse = await fetch(`${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/cookies/attributes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
                'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
            }
        });
        const cookiesData = await cookiesResponse.json();
        console.log('\nCookies collection attributes:');
        cookiesData.attributes.forEach(a => {
            console.log(`  - ${a.key} (${a.type}, required: ${a.required}, size: ${a.size || 'N/A'})`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

checkLogsSchema();
