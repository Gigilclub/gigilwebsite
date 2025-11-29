/**
 * Environment Setup Helper Script
 * Helps create .env.local file with proper configuration
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const envPath = path.join(process.cwd(), '.env.local');
const examplePath = path.join(process.cwd(), '.env.example');

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setupEnv() {
  console.log('\n🚀 Gigil Frontend - Environment Setup\n');
  console.log('This script will help you create your .env.local file.\n');

  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    const overwrite = await question(
      '.env.local already exists. Do you want to overwrite it? (y/n): '
    );
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  // Get Express API URL
  const expressPort = await question(
    'Enter Express API port (default: 3001): '
  ) || '3001';
  const expressUrl = `http://localhost:${expressPort}/api`;

  // Get Strapi API URL
  const strapiPort = await question(
    'Enter Strapi CMS port (default: 1337): '
  ) || '1337';
  const strapiUrl = `http://localhost:${strapiPort}/api`;

  // Get app name
  const appName = await question(
    'Enter app name (default: Gigil): '
  ) || 'Gigil';

  // Create .env.local content
  const envContent = `# Express API (Gifting API)
NEXT_PUBLIC_EXPRESS_API_URL=${expressUrl}

# Strapi CMS (Blog API)
NEXT_PUBLIC_STRAPI_API_URL=${strapiUrl}

# App Configuration
NEXT_PUBLIC_APP_NAME=${appName}
`;

  // Write file
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env.local file created successfully!\n');
    console.log('Configuration:');
    console.log(`  Express API: ${expressUrl}`);
    console.log(`  Strapi CMS: ${strapiUrl}`);
    console.log(`  App Name: ${appName}\n`);
    console.log('Next steps:');
    console.log('  1. Make sure your backend services are running');
    console.log('  2. Start your frontend: npm run dev');
    console.log('  3. Check if the connection works!\n');
  } catch (error) {
    console.error('❌ Error creating .env.local:', error.message);
  }

  rl.close();
}

setupEnv();




