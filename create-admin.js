// Create admin user script
const data = {
    userId: 'admin_001',
    username: 'admin',
    email: 'admin@dochema.com',
    password: 'admin123',
    deviceName: 'Admin Device',
    machineId: 'admin-machine',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
};

const APPWRITE = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiKey: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3'
};

async function createAdmin() {
    try {
        // Create user
        console.log('Creating admin user...');
        const userRes = await fetch(`${APPWRITE.endpoint}/databases/${APPWRITE.databaseId}/collections/users/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': APPWRITE.projectId,
                'X-Appwrite-Key': APPWRITE.apiKey
            },
            body: JSON.stringify({
                documentId: 'unique()',
                data: data
            })
        });

        const user = await userRes.json();
        console.log('User result:', user);

        // Create subscription
        console.log('Creating subscription...');
        const subData = {
            userId: 'admin_001',
            isActive: true,
            expiryDate: '2099-12-31T23:59:59.000Z',
            plan: 'lifetime',
            createdAt: new Date().toISOString()
        };

        const subRes = await fetch(`${APPWRITE.endpoint}/databases/${APPWRITE.databaseId}/collections/subscriptions/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': APPWRITE.projectId,
                'X-Appwrite-Key': APPWRITE.apiKey
            },
            body: JSON.stringify({
                documentId: 'unique()',
                data: subData
            })
        });

        const sub = await subRes.json();
        console.log('Subscription result:', sub);

        console.log('\n✅ Admin created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error:', error);
    }
}

createAdmin();
