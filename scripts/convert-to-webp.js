const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// Konfiguracija za konverziju
const CONFIG = {
  quality: 85, // Kvalitet WebP slika (0-100)
  formats: ['.jpg', '.jpeg', '.png'], // Formati za konverziju
  skipEmpty: true // Preskoči prazne fajlove
}

// Folder sa slikama
const FOLDERS = [
  { 
    source: path.join(__dirname, '../public/images'),
    recursive: true
  },
  {
    source: path.join(__dirname, '../public/images/autorka'),
    recursive: false
  }
]

/**
 * Konvertuj sliku u WebP format
 */
async function convertToWebP(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath)
    
    // Preskoči prazne fajlove
    if (stats.size === 0) {
      console.log(`⚠️  Preskačem prazan fajl: ${path.basename(inputPath)}`)
      return false
    }
    
    // Proveri da li WebP već postoji
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  WebP već postoji: ${path.basename(outputPath)}`)
      return true
    }
    
    console.log(`🔄 Konvertujem: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`)
    
    await sharp(inputPath)
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath)
    
    console.log(`✅ Konvertovano: ${path.basename(outputPath)}`)
    return true
    
  } catch (error) {
    console.error(`❌ Greška pri konverziji ${path.basename(inputPath)}:`, error.message)
    return false
  }
}

/**
 * Generiši responsive verzije slike
 */
async function generateResponsiveImages(inputPath) {
  try {
    const sizes = [
      { width: 400, suffix: 'sm' },
      { width: 800, suffix: 'md' },
      { width: 1200, suffix: 'lg' },
      { width: 1920, suffix: 'xl' }
    ]
    
    const fileName = path.basename(inputPath, path.extname(inputPath))
    const dirName = path.dirname(inputPath)
    
    for (const size of sizes) {
      const outputPath = path.join(dirName, `${fileName}-${size.suffix}.webp`)
      
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  Responsive verzija već postoji: ${path.basename(outputPath)}`)
        continue
      }
      
      console.log(`📐 Kreiram responsive verziju: ${size.width}px`)
      
      await sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside' 
        })
        .webp({ quality: CONFIG.quality })
        .toFile(outputPath)
    }
    
    console.log(`✅ Responsive verzije kreirane za: ${fileName}`)
    
  } catch (error) {
    console.error(`❌ Greška pri kreiranju responsive verzija:`, error.message)
  }
}

/**
 * Obradi sve slike u folderu
 */
async function processFolder(folderPath, recursive = false) {
  console.log(`\n📁 Obrađujem folder: ${folderPath}`)
  
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder ne postoji: ${folderPath}`)
    return
  }
  
  const stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    failed: 0
  }
  
  const files = fs.readdirSync(folderPath)
  
  for (const file of files) {
    const filePath = path.join(folderPath, file)
    const stat = fs.statSync(filePath)
    
    // Ako je folder i recursive je true
    if (stat.isDirectory() && recursive) {
      await processFolder(filePath, recursive)
      continue
    }
    
    // Proveri ekstenziju
    const ext = path.extname(file).toLowerCase()
    if (!CONFIG.formats.includes(ext)) continue
    
    stats.total++
    
    // Generiši WebP putanju
    const webpPath = filePath.replace(ext, '.webp')
    
    // Konvertuj u WebP
    const success = await convertToWebP(filePath, webpPath)
    
    if (success) {
      stats.converted++
      
      // Generiši responsive verzije za cover slike
      if (file.includes('cover') || file.includes('hero')) {
        await generateResponsiveImages(webpPath)
      }
    } else {
      stats.failed++
    }
  }
  
  console.log(`\n📊 Rezultati za ${path.basename(folderPath)}:`)
  console.log(`   - Ukupno fajlova: ${stats.total}`)
  console.log(`   - Konvertovano: ${stats.converted}`)
  console.log(`   - Preskočeno: ${stats.skipped}`)
  console.log(`   - Neuspešno: ${stats.failed}`)
  
  return stats
}

/**
 * Kopiraj nedostajuće slike iz source foldera
 */
async function copyMissingImages() {
  console.log('\n🔍 Tražim nedostajuće slike...')
  
  const missingImages = [
    {
      source: '/Users/nemanjamalisic/Desktop/srecno-ucenje-slike/zimski-mir/vera.png',
      dest: '/Users/nemanjamalisic/Desktop/srecno-ucenje/public/images/zimski-mir/sava-alternative.png',
      description: 'Alternativa za praznu sava.png sliku'
    },
    {
      source: '/Users/nemanjamalisic/Desktop/srecno-ucenje-slike/letnja-vreva/ilina.png', 
      dest: '/Users/nemanjamalisic/Desktop/srecno-ucenje/public/images/letnja-vreva/vida-alternative.png',
      description: 'Alternativa za praznu vida.png sliku'
    }
  ]
  
  for (const img of missingImages) {
    if (fs.existsSync(img.source)) {
      const destDir = path.dirname(img.dest)
      
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      
      fs.copyFileSync(img.source, img.dest)
      console.log(`✅ Kopirano: ${img.description}`)
    }
  }
}

/**
 * Glavna funkcija
 */
async function main() {
  console.log('🚀 Započinje konverzija slika u WebP format...\n')
  
  // Instaliraj sharp ako nije instaliran
  try {
    require('sharp')
  } catch (error) {
    console.log('📦 Instaliram sharp paket...')
    const { execSync } = require('child_process')
    execSync('npm install sharp', { stdio: 'inherit' })
  }
  
  // Kopiraj nedostajuće slike
  await copyMissingImages()
  
  // Obradi sve foldere
  let totalStats = {
    total: 0,
    converted: 0,
    skipped: 0,
    failed: 0
  }
  
  for (const folder of FOLDERS) {
    const stats = await processFolder(folder.source, folder.recursive)
    if (stats) {
      totalStats.total += stats.total
      totalStats.converted += stats.converted
      totalStats.skipped += stats.skipped
      totalStats.failed += stats.failed
    }
  }
  
  console.log('\n🎉 Konverzija završena!')
  console.log('📊 Ukupni rezultati:')
  console.log(`   - Ukupno fajlova: ${totalStats.total}`)
  console.log(`   - Konvertovano: ${totalStats.converted}`)
  console.log(`   - Preskočeno: ${totalStats.skipped}`)
  console.log(`   - Neuspešno: ${totalStats.failed}`)
}

// Pokreni
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { convertToWebP, generateResponsiveImages }