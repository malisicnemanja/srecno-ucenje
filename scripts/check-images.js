const { client } = require('../sanity/client.js')
const fs = require('fs')
const path = require('path')

/**
 * Proveri status slika u CMS-u
 */
async function checkImagesStatus() {
  console.log('🔍 Proveravam status slika u Sanity CMS...\\n')
  
  try {
    // 1. Proveri About Author slike
    console.log('👤 About Author slike:')
    const aboutAuthor = await client.fetch('*[_type == "aboutAuthor"][0]')
    
    if (aboutAuthor) {
      if (aboutAuthor.heroImage?.asset) {
        const heroImage = await client.fetch(`*[_id == "${aboutAuthor.heroImage.asset._ref}"][0]`)
        console.log(`✅ Hero slika: ${heroImage.originalFilename} (${heroImage.mimeType})`)
      } else {
        console.log('❌ Hero slika nije postavljena')
      }
      
      if (aboutAuthor.heroBackground?.asset) {
        const bgImage = await client.fetch(`*[_id == "${aboutAuthor.heroBackground.asset._ref}"][0]`)
        console.log(`✅ Pozadinska slika: ${bgImage.originalFilename} (${bgImage.mimeType})`)
      } else {
        console.log('❌ Pozadinska slika nije postavljena')
      }
    }
    
    // 2. Proveri knjige
    console.log('\\n📚 Knjige:')
    const books = await client.fetch('*[_type == "book"]')
    
    for (const book of books) {
      console.log(`\\n📖 ${book.title}:`)
      
      if (book.coverImage?.asset) {
        const coverImage = await client.fetch(`*[_id == "${book.coverImage.asset._ref}"][0]`)
        console.log(`  ✅ Cover: ${coverImage.originalFilename} (${coverImage.mimeType})`)
      } else {
        console.log('  ❌ Cover slika nije postavljena')
      }
      
      if (book.illustrationGallery && book.illustrationGallery.length > 0) {
        console.log(`  📸 Galerija: ${book.illustrationGallery.length} slika`)
        for (const img of book.illustrationGallery) {
          if (img.asset) {
            const galleryImage = await client.fetch(`*[_id == "${img.asset._ref}"][0]`)
            console.log(`    - ${galleryImage.originalFilename} (${galleryImage.mimeType})`)
          }
        }
      } else {
        console.log('  ⚠️  Galerija je prazna')
      }
    }
    
    // 3. Proveri lokalne WebP fajlove
    console.log('\\n🗂️ Lokalni WebP fajlovi:')
    const imageDir = path.join(__dirname, '../public/images')
    
    function checkWebPFiles(dir, prefix = '') {
      const files = fs.readdirSync(dir)
      
      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          checkWebPFiles(filePath, `${prefix}${file}/`)
        } else if (file.endsWith('.webp')) {
          const size = (stat.size / 1024).toFixed(2)
          console.log(`  ✅ ${prefix}${file} (${size} KB)`)
        }
      }
    }
    
    checkWebPFiles(imageDir)
    
    // 4. Statistika
    console.log('\\n📊 Statistika:')
    const allImages = await client.fetch('*[_type == "sanity.imageAsset"]')
    const webpImages = allImages.filter(img => img.mimeType === 'image/webp')
    
    console.log(`  - Ukupno slika u CMS: ${allImages.length}`)
    console.log(`  - WebP slika: ${webpImages.length}`)
    console.log(`  - Drugih formata: ${allImages.length - webpImages.length}`)
    
    const totalSize = allImages.reduce((sum, img) => sum + (img.size || 0), 0)
    const webpSize = webpImages.reduce((sum, img) => sum + (img.size || 0), 0)
    
    console.log(`  - Ukupna veličina: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`  - WebP veličina: ${(webpSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`  - Ušteda: ${((totalSize - webpSize) / totalSize * 100).toFixed(1)}%`)
    
  } catch (error) {
    console.error('❌ Greška pri proveri:', error.message)
  }
}

// Pokreni
if (require.main === module) {
  checkImagesStatus()
}

module.exports = { checkImagesStatus }