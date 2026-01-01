// Test Appwrite Function
const FUNCTION_URL = 'https://nyc.cloud.appwrite.io/v1/functions/6955cd8900241eacc995/executions';
const PROJECT_ID = '693631c8001ac4fbc231';

async function testFunction() {
    console.log('🧪 Testing Appwrite Function...');
    console.log('URL:', FUNCTION_URL);

    const payload = {
        userId: 'test_direct_' + Date.now(),
        type: 'TEST_SAVE',
        data: {
            message: 'Direct test from script',
            time: new Date().toISOString()
        }
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': PROJECT_ID
            },
            body: JSON.stringify(payload)
        });

        console.log('Status:', response.status, response.statusText);

        const result = await response.json();
        console.log('Response:', JSON.stringify(result, null, 2));

        // Parse function result
        if (result.responseBody) {
            const functionResult = typeof result.responseBody === 'string'
                ? JSON.parse(result.responseBody)
                : result.responseBody;
            console.log('\n📋 Function Result:', JSON.stringify(functionResult, null, 2));

            if (functionResult.success) {
                console.log('\n✅ SUCCESS! Data saved with ID:', functionResult.logId);
            } else {
                console.log('\n❌ FAILED:', functionResult.error);
            }
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testFunction();
