// Test Appwrite Function - Using API Endpoint (Wrapped Body)
const FUNCTION_ID = '6955cd8900241eacc995'; // Provided function ID
const PROJECT_ID = '693631c8001ac4fbc231';
const API_ENDPOINT = `https://nyc.cloud.appwrite.io/v1/functions/${FUNCTION_ID}/executions`;

async function testFunctionAPI() {
    console.log('🧪 Testing Appwrite Function via API Endpoint...');
    console.log('URL:', API_ENDPOINT);

    const innerPayload = {
        userId: 'test_api_' + Date.now(),
        type: 'TEST_SAVE',
        data: {
            message: 'API Endpoint Test',
            time: new Date().toISOString()
        }
    };

    // Wrap payload for executions API
    const requestBody = {
        body: JSON.stringify(innerPayload), // Inner payload as string
        async: false // Wait for execution result
    };

    console.log('Request Request Body:', JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': PROJECT_ID
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Status:', response.status, response.statusText);

        if (response.status === 201) {
            const result = await response.json();
            console.log('\n✅ Execution Created!');
            console.log('Execution ID:', result.$id);
            console.log('Status:', result.status);
            console.log('Response Body:', result.responseBody);

            try {
                const parsedBody = JSON.parse(result.responseBody);
                console.log('\n📋 Function Response:', JSON.stringify(parsedBody, null, 2));
            } catch (e) {
                console.log('Could not parse response body JSON');
            }
        } else {
            const text = await response.text();
            console.log('Error Response:', text);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testFunctionAPI();
