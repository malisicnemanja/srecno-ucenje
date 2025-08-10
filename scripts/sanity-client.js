/**
 * SANITY CLIENT CONFIGURATION FOR MIGRATION
 * 
 * This configuration provides a Sanity client for migration scripts.
 * It reads configuration from your existing Sanity setup.
 */

const { createClient } = require('@sanity/client');
const path = require('path');
const fs = require('fs');

// Try to load Sanity config from various locations
function loadSanityConfig() {
  const configPaths = [
    path.join(__dirname, '../sanity.config.ts'),
    path.join(__dirname, '../sanity.config.js'),
    path.join(__dirname, '../sanity.json'),
    path.join(__dirname, '../sanity.cli.js')
  ];

  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        // For TypeScript configs, we'll need to extract values manually
        const content = fs.readFileSync(configPath, 'utf8');
        
        // Extract project ID
        const projectIdMatch = content.match(/projectId:\s*['"`]([^'"`]+)['"`]/);
        const datasetMatch = content.match(/dataset:\s*['"`]([^'"`]+)['"`]/);
        
        if (projectIdMatch && datasetMatch) {
          return {
            projectId: projectIdMatch[1],
            dataset: datasetMatch[1]
          };
        }
      } catch (error) {
        console.warn(`Failed to parse config from ${configPath}:`, error.message);
      }
    }
  }

  // Fallback to environment variables
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
  };
}

// Load configuration
const config = loadSanityConfig();

if (!config.projectId) {
  console.error('❌ Sanity project ID not found. Please check your configuration.');
  console.error('Available options:');
  console.error('1. Set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
  console.error('2. Set SANITY_PROJECT_ID environment variable');
  console.error('3. Ensure sanity.config.ts contains projectId');
  process.exit(1);
}

// Create Sanity client with migration-friendly settings
const sanityClient = createClient({
  ...config,
  useCdn: false, // Don't use CDN for migrations (need fresh data)
  apiVersion: '2023-08-01', // Use recent API version
  token: process.env.SANITY_AUTH_TOKEN, // Required for write operations
});

// Validate client configuration
async function validateClient() {
  try {
    // Test connection by fetching project info
    await sanityClient.request({
      url: '/projects/' + config.projectId
    });
    
    console.log(`✅ Sanity client connected to project: ${config.projectId}`);
    console.log(`   Dataset: ${config.dataset}`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Sanity:', error.message);
    
    if (error.message.includes('401')) {
      console.error('   Authentication failed. Please set SANITY_AUTH_TOKEN environment variable.');
    } else if (error.message.includes('404')) {
      console.error('   Project not found. Please check SANITY_PROJECT_ID.');
    }
    
    return false;
  }
}

// Utility functions for migration
const migrationUtils = {
  // Safely get documents by type
  async getDocumentsByType(type) {
    try {
      const query = `*[_type == "${type}"]`;
      const documents = await sanityClient.fetch(query);
      return documents || [];
    } catch (error) {
      console.warn(`⚠️  No documents found for type: ${type} (${error.message})`);
      return [];
    }
  },

  // Batch create documents
  async batchCreate(documents, batchSize = 10) {
    const results = [];
    
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      const transaction = sanityClient.transaction();
      
      batch.forEach(doc => {
        transaction.create(doc);
      });
      
      try {
        const result = await transaction.commit();
        results.push(...result);
        console.log(`  ✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)} (${batch.length} documents)`);
      } catch (error) {
        console.error(`  ❌ Failed to create batch: ${error.message}`);
        throw error;
      }
    }
    
    return results;
  },

  // Safely delete documents by type (for cleanup)
  async deleteDocumentsByType(type) {
    try {
      const documents = await this.getDocumentsByType(type);
      
      if (documents.length === 0) {
        return { deleted: 0 };
      }

      const transaction = sanityClient.transaction();
      documents.forEach(doc => {
        transaction.delete(doc._id);
      });

      await transaction.commit();
      return { deleted: documents.length };
    } catch (error) {
      console.error(`Failed to delete documents of type ${type}:`, error.message);
      throw error;
    }
  },

  // Check if schema type exists
  async schemaTypeExists(type) {
    try {
      const docs = await this.getDocumentsByType(type);
      return docs.length > 0;
    } catch (error) {
      return false;
    }
  }
};

module.exports = {
  sanityClient,
  validateClient,
  migrationUtils,
  config
};

// If run directly, validate the connection
if (require.main === module) {
  validateClient().then(success => {
    if (success) {
      console.log('🎉 Sanity client ready for migrations!');
    } else {
      console.log('❌ Client validation failed');
      process.exit(1);
    }
  });
}