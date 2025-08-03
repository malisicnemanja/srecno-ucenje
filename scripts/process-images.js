const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Konfiguracija za optimizaciju slika
const IMAGE_CONFIG = {
  // WebP kvalitet za različite tipove slika
  cover: { quality: 85, width: 400, height: 600 },
  hero: { quality: 80, width: 1200, height: 800 },
  gallery: { quality: 75, width: 800, height: 600 },
  thumbnail: { quality: 70, width: 200, height: 150 },
  
  // Općenito WebP podešavanje
  webp: {
    quality: 80,
    effort: 6, // Maksimalna kompresija
    lossless: false
  }
};

// Struktura foldera za svaku knjigu
const BOOK_FOLDERS = {
  'jesenja-gozba': {
    slug: 'jesenja-gozba',
    theme: 'yellow',
    expectedFiles: ['cover.jpg', 'hero.jpg', 'vila-bosiljcica.jpg']
  },
  'zimski-mir': {
    slug: 'zimski-mir', 
    theme: 'blue',
    expectedFiles: ['cover.jpg', 'hero.jpg', 'vila-bozica.jpg']
  },
  'prolecna-zurba': {
    slug: 'prolecna-zurba',
    theme: 'green', 
    expectedFiles: ['cover.jpg', 'hero.jpg', 'vila-djurdjica.jpg']
  },
  'letnja-vreva': {
    slug: 'letnja-vreva',
    theme: 'red',
    expectedFiles: ['cover.jpg', 'hero.jpg', 'vila-suncica.jpg']
  }
};

/**
 * Glavna funkcija za procesiranje slika
 */
async function processImages() {
  console.log('🚀 Započinje procesiranje slika za knjige...\n');
  
  const sourceDir = './srecno-ucenje-slike';
  const targetDir = './public/images/knjige';
  
  // Proverava da li source direktorij postoji
  if (!await fs.pathExists(sourceDir)) {
    console.error(`❌ Source direktorij nije pronađen: ${sourceDir}`);
    console.log('💡 Molimo postavite "srecno-ucenje-slike" folder u root direktorij projekta');
    process.exit(1);
  }
  
  // Kreira target direktorij
  await fs.ensureDir(targetDir);
  
  let totalProcessed = 0;
  let errors = [];
  
  // Procesira svaku knjigu
  for (const [folderName, bookConfig] of Object.entries(BOOK_FOLDERS)) {
    console.log(`📖 Procesiranje knjige: ${folderName}`);
    
    const bookSourceDir = path.join(sourceDir, folderName);
    const bookTargetDir = path.join(targetDir, bookConfig.slug);
    
    try {
      const processed = await processBookImages(bookSourceDir, bookTargetDir, bookConfig);
      totalProcessed += processed;
      console.log(`✅ ${folderName}: ${processed} slika procesurano\n`);
    } catch (error) {
      errors.push(`${folderName}: ${error.message}`);
      console.error(`❌ Greška kod ${folderName}: ${error.message}\n`);
    }
  }
  
  // Rezultat
  console.log(`\n🎉 Procesiranje završeno!`);
  console.log(`📊 Ukupno procesurano: ${totalProcessed} slika`);
  
  if (errors.length > 0) {
    console.log(`⚠️  Greške (${errors.length}):`);
    errors.forEach(error => console.log(`   - ${error}`));
  }
  
  console.log(`\n📁 Slike su sačuvane u: ${targetDir}`);
  console.log(`🔗 URL format: /images/knjige/[book-slug]/[image-name].webp`);
}

/**
 * Procesira slike za jednu knjigu
 */
async function processBookImages(sourceDir, targetDir, bookConfig) {
  if (!await fs.pathExists(sourceDir)) {
    throw new Error(`Folder knjige ne postoji: ${sourceDir}`);
  }
  
  await fs.ensureDir(targetDir);
  
  // Čita sve fajlove iz source foldera
  const files = await fs.readdir(sourceDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
  );
  
  if (imageFiles.length === 0) {
    throw new Error('Nema pronađenih slika u folderu');
  }
  
  let processed = 0;
  
  // Procesira svaku sliku
  for (const file of imageFiles) {
    const sourcePath = path.join(sourceDir, file);
    const fileName = path.parse(file).name;
    const targetPath = path.join(targetDir, `${fileName}.webp`);
    
    try {
      await processImage(sourcePath, targetPath, fileName);
      processed++;
    } catch (error) {
      console.error(`   ⚠️  ${file}: ${error.message}`);
    }
  }
  
  return processed;
}

/**
 * Procesira jednu sliku sa optimizacijom
 */
async function processImage(sourcePath, targetPath, fileName) {
  // Određuje tip slike na osnovu naziva fajla
  let config = IMAGE_CONFIG.gallery; // default
  
  if (fileName.toLowerCase().includes('cover')) {
    config = IMAGE_CONFIG.cover;
  } else if (fileName.toLowerCase().includes('hero')) {
    config = IMAGE_CONFIG.hero;
  } else if (fileName.toLowerCase().includes('thumb')) {
    config = IMAGE_CONFIG.thumbnail;
  }
  
  // Čita originalne dimenzije
  const metadata = await sharp(sourcePath).metadata();
  console.log(`   🔄 ${path.basename(sourcePath)} (${metadata.width}x${metadata.height}) → WebP`);
  
  // Procesira sliku
  let pipeline = sharp(sourcePath);
  
  // Resize ako je potrebno (zadržava aspect ratio)
  if (config.width && config.height) {
    pipeline = pipeline.resize(config.width, config.height, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }
  
  // Konvertuje u WebP sa optimizacijom
  await pipeline
    .webp({
      quality: config.quality,
      effort: IMAGE_CONFIG.webp.effort,
      lossless: IMAGE_CONFIG.webp.lossless
    })
    .toFile(targetPath);
  
  // Proverava veličinu fajla
  const originalSize = (await fs.stat(sourcePath)).size;
  const newSize = (await fs.stat(targetPath)).size;
  const savings = Math.round((1 - newSize / originalSize) * 100);
  
  console.log(`   💾 ${path.basename(targetPath)} - ušteda: ${savings}%`);
}

/**
 * Kreira manifest fajl sa informacijama o slikama
 */
async function createImageManifest() {
  const targetDir = './public/images/knjige';
  const manifest = {};
  
  for (const [folderName, bookConfig] of Object.entries(BOOK_FOLDERS)) {
    const bookDir = path.join(targetDir, bookConfig.slug);
    
    if (await fs.pathExists(bookDir)) {
      const files = await fs.readdir(bookDir);
      const webpFiles = files.filter(file => file.endsWith('.webp'));
      
      manifest[bookConfig.slug] = {
        theme: bookConfig.theme,
        images: webpFiles.map(file => ({
          name: path.parse(file).name,
          url: `/images/knjige/${bookConfig.slug}/${file}`,
          type: determineImageType(file)
        }))
      };
    }
  }
  
  const manifestPath = path.join(targetDir, 'manifest.json');
  await fs.writeJSON(manifestPath, manifest, { spaces: 2 });
  
  console.log(`📋 Manifest kreiran: ${manifestPath}`);
  return manifest;
}

/**
 * Određuje tip slike na osnovu naziva
 */
function determineImageType(fileName) {
  const name = fileName.toLowerCase();
  
  if (name.includes('cover')) return 'cover';
  if (name.includes('hero')) return 'hero';
  if (name.includes('vila')) return 'character';
  if (name.includes('thumb')) return 'thumbnail';
  
  return 'gallery';
}

/**
 * Validira strukture foldera
 */
async function validateImageStructure() {
  console.log('🔍 Validacija strukture foldera...\n');
  
  const sourceDir = './srecno-ucenje-slike';
  const issues = [];
  
  for (const [folderName, bookConfig] of Object.entries(BOOK_FOLDERS)) {
    const bookDir = path.join(sourceDir, folderName);
    
    if (!await fs.pathExists(bookDir)) {
      issues.push(`❌ Nedostaje folder: ${folderName}`);
      continue;
    }
    
    const files = await fs.readdir(bookDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
    );
    
    if (imageFiles.length === 0) {
      issues.push(`⚠️  ${folderName}: Nema slika`);
    } else {
      console.log(`✅ ${folderName}: ${imageFiles.length} slika pronađeno`);
      imageFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
    }
    
    console.log('');
  }
  
  if (issues.length > 0) {
    console.log('🚨 Problemi sa strukturom:');
    issues.forEach(issue => console.log(`   ${issue}`));
    console.log('');
  }
  
  return issues.length === 0;
}

// CLI interfejs
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'validate':
      validateImageStructure();
      break;
      
    case 'manifest':
      createImageManifest();
      break;
      
    case 'process':
    default:
      processImages();
      break;
  }
}

module.exports = {
  processImages,
  createImageManifest,
  validateImageStructure,
  IMAGE_CONFIG,
  BOOK_FOLDERS
};