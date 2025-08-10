#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const migrationDir = path.join(__dirname, 'migration');
const files = fs.readdirSync(migrationDir).filter(f => f.startsWith('migrate-') && f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(migrationDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract the target schema name from filename
  const targetName = file.replace('migrate-', '').replace('.js', '');
  
  // Fix the targetName reference
  const regex = /\$\{targetName\}/g;
  content = content.replace(regex, targetName);
  
  // Write back
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${file} - target: ${targetName}`);
});

console.log('✅ All migration scripts fixed!');