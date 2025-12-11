/**
 * Create Lookup Collections for BIN Database Optimization
 * This script creates separate collections for unique countries, banks, and grades
 * to enable fast dropdown loading without fetching all 38,000+ BIN records
 */

const APPWRITE_CONFIG = {
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '693631c8001ac4fbc231',
    databaseId: '69363201001bc7a64088',
    apiSecret: 'standard_917cef86aef581038cb102a0b6d645aa4574cdccefe56659604f22954dba8b1213ac7a0172d73857e904188fba17e8574f23cfb1f4393301aae31c20b8213b086293b0f8c0f3a581e0862ef5db10ad03b749561368f61778ddf118941af5137eeae8ffc196cdb3f3b8a4ac489dd99a67a059fdfc00afad2893b8858a9ca904e3',
    collections: {
        bins: 'bin_database',
        countries: 'bin_countries',
        banks: 'bin_banks',
        grades: 'bin_grades'
    }
};

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
        'X-Appwrite-Key': APPWRITE_CONFIG.apiSecret
    };
}

// Create a collection
async function createCollection(collectionId, name) {
    try {
        // Check if exists first
        const checkUrl = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}`;
        const checkRes = await fetch(checkUrl, { method: 'GET', headers: getHeaders() });

        if (checkRes.ok) {
            console.log(`Collection ${name} already exists, deleting...`);
            await fetch(checkUrl, { method: 'DELETE', headers: getHeaders() });
            await new Promise(r => setTimeout(r, 2000));
        }
    } catch (e) { }

    const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections`;
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            collectionId: collectionId,
            name: name,
            documentSecurity: false,
            permissions: ['read("any")']
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to create collection ${name}: ${JSON.stringify(error)}`);
    }

    console.log(`✅ Created collection: ${name}`);
    return await response.json();
}

// Create string attribute
async function createAttribute(collectionId, key, size = 200) {
    const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/attributes/string`;
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            key: key,
            size: size,
            required: false
        })
    });

    if (!response.ok) {
        const error = await response.json();
        console.error(`Failed to create attribute ${key}:`, error);
    }
}

// Create integer attribute
async function createIntAttribute(collectionId, key) {
    const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/attributes/integer`;
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            key: key,
            required: false
        })
    });

    if (!response.ok) {
        const error = await response.json();
        console.error(`Failed to create attribute ${key}:`, error);
    }
}

// Fetch all unique values from bin_database
async function fetchAllBins() {
    const allDocs = [];
    let offset = 0;
    const batchSize = 5000;

    console.log('📊 Fetching all BIN records...');

    while (true) {
        const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${APPWRITE_CONFIG.collections.bins}/documents?queries[]=${encodeURIComponent(JSON.stringify({ method: 'limit', values: [batchSize] }))}&queries[]=${encodeURIComponent(JSON.stringify({ method: 'offset', values: [offset] }))}`;

        const response = await fetch(url, { method: 'GET', headers: getHeaders() });

        if (!response.ok) {
            console.error('Failed to fetch bins');
            break;
        }

        const result = await response.json();
        const docs = result.documents || [];
        allDocs.push(...docs);

        console.log(`  Fetched ${allDocs.length} records...`);

        if (docs.length < batchSize) break;
        offset += batchSize;
    }

    return allDocs;
}

// Extract unique values
function extractUniqueValues(documents) {
    const countries = new Map(); // name -> count
    const banks = new Map();
    const grades = new Map();

    documents.forEach(doc => {
        if (doc.country) {
            countries.set(doc.country, (countries.get(doc.country) || 0) + 1);
        }
        if (doc.bank) {
            banks.set(doc.bank, (banks.get(doc.bank) || 0) + 1);
        }
        if (doc.grade) {
            grades.set(doc.grade, (grades.get(doc.grade) || 0) + 1);
        }
    });

    return { countries, banks, grades };
}

// Create document
async function createDocument(collectionId, data) {
    const url = `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/${collectionId}/documents`;
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            documentId: 'unique()',
            data: data
        })
    });

    return response.ok;
}

// Main function
async function main() {
    console.log('🚀 Starting Lookup Collections Setup...\n');

    // Step 1: Fetch all BIN records
    const allDocs = await fetchAllBins();
    console.log(`\n📊 Total BIN records: ${allDocs.length}\n`);

    // Step 2: Extract unique values
    const { countries, banks, grades } = extractUniqueValues(allDocs);
    console.log(`📍 Unique Countries: ${countries.size}`);
    console.log(`🏦 Unique Banks: ${banks.size}`);
    console.log(`⭐ Unique Grades: ${grades.size}\n`);

    // Step 3: Create lookup collections
    console.log('📁 Creating lookup collections...\n');

    // Countries collection
    await createCollection(APPWRITE_CONFIG.collections.countries, 'BIN Countries');
    await createAttribute(APPWRITE_CONFIG.collections.countries, 'name', 100);
    await createIntAttribute(APPWRITE_CONFIG.collections.countries, 'count');

    // Banks collection
    await createCollection(APPWRITE_CONFIG.collections.banks, 'BIN Banks');
    await createAttribute(APPWRITE_CONFIG.collections.banks, 'name', 300);
    await createIntAttribute(APPWRITE_CONFIG.collections.banks, 'count');

    // Grades collection
    await createCollection(APPWRITE_CONFIG.collections.grades, 'BIN Grades');
    await createAttribute(APPWRITE_CONFIG.collections.grades, 'name', 50);
    await createIntAttribute(APPWRITE_CONFIG.collections.grades, 'count');

    // Wait for attributes to be ready
    console.log('\n⏳ Waiting 20 seconds for attributes to be ready...\n');
    await new Promise(r => setTimeout(r, 20000));

    // Step 4: Populate countries
    console.log('🌍 Populating countries...');
    let countryCount = 0;
    for (const [name, count] of [...countries.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        const success = await createDocument(APPWRITE_CONFIG.collections.countries, { name, count });
        if (success) countryCount++;
        if (countryCount % 50 === 0) console.log(`  ${countryCount} countries added...`);
    }
    console.log(`✅ Added ${countryCount} countries\n`);

    // Step 5: Populate banks
    console.log('🏦 Populating banks...');
    let bankCount = 0;
    for (const [name, count] of [...banks.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        const success = await createDocument(APPWRITE_CONFIG.collections.banks, { name, count });
        if (success) bankCount++;
        if (bankCount % 100 === 0) console.log(`  ${bankCount} banks added...`);
    }
    console.log(`✅ Added ${bankCount} banks\n`);

    // Step 6: Populate grades
    console.log('⭐ Populating grades...');
    let gradeCount = 0;
    for (const [name, count] of [...grades.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        const success = await createDocument(APPWRITE_CONFIG.collections.grades, { name, count });
        if (success) gradeCount++;
    }
    console.log(`✅ Added ${gradeCount} grades\n`);

    console.log('🎉 Done! Lookup collections created successfully!');
    console.log(`   Countries: ${countryCount}`);
    console.log(`   Banks: ${bankCount}`);
    console.log(`   Grades: ${gradeCount}`);
}

main().catch(console.error);
