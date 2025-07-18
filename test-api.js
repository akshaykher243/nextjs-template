// Test script to verify PayloadCMS API connection
// Run this with: node test-api.js

const PAYLOAD_URL = 'http://localhost:3001';

async function testPayloadAPI() {
  try {
    console.log('Testing PayloadCMS API connection...');
    console.log(`Connecting to: ${PAYLOAD_URL}/api/pages`);
    
    // Test pages endpoint
    const response = await fetch(`${PAYLOAD_URL}/api/pages`);
    
    console.log(`Response status: ${response.status}`);
    console.log(`Response status text: ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Successfully connected to PayloadCMS API');
    console.log('📄 Pages found:', data.docs?.length || 0);
    
    if (data.docs && data.docs.length > 0) {
      console.log('📋 Page titles:');
      data.docs.forEach((page, index) => {
        console.log(`   ${index + 1}. ${page.title} (slug: ${page.slug})`);
      });
    } else {
      console.log('ℹ️  No pages found. Add some content in the PayloadCMS admin panel at http://localhost:3001/admin');
    }
    
  } catch (error) {
    console.error('❌ Error connecting to PayloadCMS API:', error.message);
    console.log('🔧 Troubleshooting steps:');
    console.log('   1. Make sure PayloadCMS is running on http://localhost:3001');
    console.log('   2. Check that the Pages collection allows public read access');
    console.log('   3. Verify CORS settings in payload.config.ts');
    console.log('   4. Try accessing http://localhost:3001/api/pages directly in your browser');
  }
}

// Test connection
testPayloadAPI();
