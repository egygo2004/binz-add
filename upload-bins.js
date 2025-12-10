// Upload BIN Data to Appwrite
// ============================
// This script reads BIN data from 裸资.txt and 全资.txt files
// and uploads them to Appwrite database

const fs = require('fs');
const path = require('path');

// Appwrite Configuration
const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3',
    collectionId: 'bin_database'
};

// Get headers for API requests
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
        'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
    };
}

// Create collection if it doesn't exist
async function createCollection() {
    console.log('📦 Setting up bin_database collection...');

    try {
        // First check if collection exists
        const checkResponse = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collectionId}`,
            {
                method: 'GET',
                headers: getHeaders()
            }
        );

        if (checkResponse.ok) {
            console.log('⚠️ Collection already exists - deleting to recreate...');

            // Delete existing collection
            const deleteResponse = await fetch(
                `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collectionId}`,
                {
                    method: 'DELETE',
                    headers: getHeaders()
                }
            );

            if (deleteResponse.ok) {
                console.log('✅ Old collection deleted');
            } else {
                console.log('⚠️ Could not delete old collection, will try to use it');
                // Wait for attributes to be available anyway
                console.log('⏳ Waiting 15 seconds for attributes to be ready...');
                await sleep(15000);
                return true;
            }

            // Wait a bit before recreating
            await sleep(2000);
        }

        // Create collection
        const createResponse = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    collectionId: APPWRITE_CONFIG.collectionId,
                    name: 'BIN Database',
                    permissions: ['read("any")']
                })
            }
        );

        if (!createResponse.ok) {
            const error = await createResponse.json();
            throw new Error(error.message);
        }

        console.log('✅ Collection created successfully');

        // Create attributes
        const attributes = [
            { key: 'bin', type: 'string', size: 10, required: false },
            { key: 'count', type: 'integer', required: false },
            { key: 'country', type: 'string', size: 100, required: false },
            { key: 'cardType', type: 'string', size: 20, required: false },
            { key: 'brand', type: 'string', size: 50, required: false },
            { key: 'grade', type: 'string', size: 50, required: false },
            { key: 'bank', type: 'string', size: 200, required: false },
            { key: 'source', type: 'string', size: 20, required: false }
        ];

        for (const attr of attributes) {
            console.log(`  📝 Creating attribute: ${attr.key}`);

            const url = attr.type === 'integer'
                ? `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collectionId}/attributes/integer`
                : `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collectionId}/attributes/string`;

            // Don't set default for required attributes
            let body;
            if (attr.type === 'integer') {
                body = { key: attr.key, required: attr.required };
                if (!attr.required) body.default = 0;
            } else {
                body = { key: attr.key, size: attr.size, required: attr.required };
                if (!attr.required) body.default = '';
            }

            const attrResponse = await fetch(url, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(body)
            });

            if (!attrResponse.ok) {
                const error = await attrResponse.json();
                console.log(`  ⚠️ Attribute ${attr.key}: ${error.message}`);
            } else {
                console.log(`  ✅ Attribute ${attr.key} created`);
            }

            // Wait a bit between attribute creation
            await sleep(500);
        }

        // Create index on bin field
        console.log('  📇 Creating index on bin field...');
        const indexResponse = await fetch(
            `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collectionId}/indexes`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    key: 'bin_index',
                    type: 'key',
                    attributes: ['bin']
                })
            }
        );

        if (indexResponse.ok) {
            console.log('  ✅ Index created');
        }

        // Wait for attributes to be ready
        console.log('⏳ Waiting 30 seconds for attributes to be ready...');
        await sleep(30000);

        return true;
    } catch (error) {
        console.error('❌ Error creating collection:', error.message);
        return false;
    }
}

// Parse a line from the BIN file
function parseLine(line, source) {
    const parts = line.split('\t');
    if (parts.length < 5) return null;

    return {
        bin: (parts[0] || '').trim(),
        count: parseInt(parts[1] || '0') || 0,
        country: (parts[2] || '').trim(),
        cardType: (parts[3] || '').trim(),
        brand: (parts[4] || '').trim(),
        grade: (parts[5] || '').trim(),
        bank: (parts[6] || '').trim().substring(0, 200), // Limit bank name length
        source: source
    };
}

// Read and parse BIN file
function readBinFile(filePath, source) {
    console.log(`📂 Reading ${path.basename(filePath)}...`);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const bins = [];

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            const parsed = parseLine(trimmedLine, source);
            if (parsed && parsed.bin) {
                bins.push(parsed);
            }
        }

        console.log(`  ✅ Found ${bins.length} BINs`);
        return bins;
    } catch (error) {
        console.error(`  ❌ Error reading file: ${error.message}`);
        return [];
    }
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Upload a single document
async function uploadDocument(data) {
    const response = await fetch(
        `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collectionId}/documents`,
        {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                documentId: 'unique()',
                data: data
            })
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return await response.json();
}

// Upload BINs in batches
async function uploadBins(bins) {
    console.log(`\n📤 Uploading ${bins.length} BINs to Appwrite...`);

    let uploaded = 0;
    let failed = 0;
    const batchSize = 10;
    const delayBetweenBatches = 1000; // 1 second

    for (let i = 0; i < bins.length; i += batchSize) {
        const batch = bins.slice(i, i + batchSize);

        const promises = batch.map(async (bin) => {
            try {
                await uploadDocument(bin);
                return true;
            } catch (error) {
                // Skip duplicates silently
                if (!error.message.includes('already exists')) {
                    console.log(`  ⚠️ Failed to upload BIN ${bin.bin}: ${error.message}`);
                }
                return false;
            }
        });

        const results = await Promise.all(promises);
        uploaded += results.filter(r => r).length;
        failed += results.filter(r => !r).length;

        // Progress update every 100 uploads
        if ((i + batchSize) % 100 === 0 || i + batchSize >= bins.length) {
            const progress = Math.min(100, Math.round(((i + batchSize) / bins.length) * 100));
            console.log(`  📊 Progress: ${progress}% (${uploaded} uploaded, ${failed} failed)`);
        }

        // Delay between batches to avoid rate limiting
        await sleep(delayBetweenBatches);
    }

    console.log(`\n✅ Upload complete: ${uploaded} uploaded, ${failed} failed`);
    return { uploaded, failed };
}

// Main function
async function main() {
    console.log('🚀 BIN Database Upload Script');
    console.log('==============================\n');

    // Create collection
    const collectionCreated = await createCollection();
    if (!collectionCreated) {
        console.log('❌ Failed to create collection. Exiting...');
        process.exit(1);
    }

    // Read BIN files
    const luoziBins = readBinFile(path.join(__dirname, '裸资.txt'), 'luozi');
    const quanziBins = readBinFile(path.join(__dirname, '全资.txt'), 'quanzi');

    const allBins = [...luoziBins, ...quanziBins];
    console.log(`\n📊 Total BINs to upload: ${allBins.length}`);

    if (allBins.length === 0) {
        console.log('❌ No BINs found. Exiting...');
        process.exit(1);
    }

    // Upload BINs
    const result = await uploadBins(allBins);

    console.log('\n🎉 Done!');
    console.log(`   Total uploaded: ${result.uploaded}`);
    console.log(`   Total failed: ${result.failed}`);
}

// Run the script
main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
