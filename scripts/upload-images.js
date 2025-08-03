const { client } = require('../sanity/client.js')
const fs = require('fs')
const path = require('path')

// Mapiranje slika na dokumente
const IMAGE_MAPPINGS = {
  // Autorka slike - WebP verzije
  'zeljana-fotografija.webp': {
    title: 'Željana Radojičić Lukić - Profesionalna fotografija',
    description: 'Profesionalna fotografija autorke',
    documentType: 'aboutAuthor',
    field: 'heroImage'
  },
  'zeljana-ilustracija.webp': {
    title: 'Željana Radojičić Lukić - Ilustracija',
    description: 'Ilustracija autorke sa knjigama',
    documentType: 'aboutAuthor',
    field: 'heroBackground'
  },
  
  // Knjige cover slike - WebP verzije
  'jesenja-gozba-cover.webp': {
    title: 'Jesenja gozba - Cover',
    description: 'Cover slika knjige Jesenja gozba',
    documentType: 'book',
    documentSlug: 'jesenja-gozba',
    field: 'coverImage'
  },
  'zimski-mir-cover.webp': {
    title: 'Zimski mir - Cover',
    description: 'Cover slika knjige Zimski mir',
    documentType: 'book',
    documentSlug: 'zimski-mir',
    field: 'coverImage'
  },
  'prolecna-zurba-cover.webp': {
    title: 'Prolećna žurba - Cover',
    description: 'Cover slika knjige Prolećna žurba',
    documentType: 'book',
    documentSlug: 'prolecna-zurba',
    field: 'coverImage'
  },
  'letnja-vreva-cover.webp': {
    title: 'Letnja vreva - Cover',
    description: 'Cover slika knjige Letnja vreva',
    documentType: 'book',
    documentSlug: 'letnja-vreva',
    field: 'coverImage'
  }
}

/**
 * Upload slika u Sanity
 */
async function uploadImageToSanity(filePath, metadata) {
  try {
    console.log(`📤 Uploadujem: ${metadata.title}...`)
    
    // Čitaj fajl
    const fileBuffer = fs.readFileSync(filePath)
    
    // Upload u Sanity
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: path.basename(filePath),
      description: metadata.description,
      title: metadata.title
    })
    
    console.log(`✅ Uploadovano: ${metadata.title} (ID: ${asset._id})`)
    
    return asset
  } catch (error) {
    console.error(`❌ Greška pri upload-u ${metadata.title}:`, error.message)
    return null
  }
}

/**
 * Poveži sliku sa dokumentom
 */
async function linkImageToDocument(assetId, metadata) {
  try {
    let query
    let document
    
    if (metadata.documentType === 'aboutAuthor') {
      // Pronađi about author dokument
      query = '*[_type == "aboutAuthor"][0]'
      document = await client.fetch(query)
    } else if (metadata.documentType === 'book') {
      // Pronađi knjigu po slug-u
      query = `*[_type == "book" && slug.current == $slug][0]`
      document = await client.fetch(query, { slug: metadata.documentSlug })
    }
    
    if (!document) {
      console.log(`⚠️  Dokument nije pronađen za ${metadata.title}`)
      return
    }
    
    // Ažuriraj dokument sa slikom
    const imageData = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId
      },
      alt: metadata.description
    }
    
    await client.patch(document._id)
      .set({ [metadata.field]: imageData })
      .commit()
    
    console.log(`🔗 Povezano: ${metadata.title} sa dokumentom ${document._id}`)
    
  } catch (error) {
    console.error(`❌ Greška pri povezivanju ${metadata.title}:`, error.message)
  }
}

/**
 * Proveri da li slika već postoji u Sanity
 */
async function checkIfImageExists(filename) {
  try {
    const query = `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]`
    const existing = await client.fetch(query, { filename })
    return existing
  } catch (error) {
    return null
  }
}

/**
 * Glavna funkcija za upload svih slika
 */
async function uploadAllImages() {
  console.log('🚀 Započinje automatski upload slika u Sanity...\\n')
  
  const results = {
    uploaded: 0,
    skipped: 0,
    failed: 0,
    linked: 0
  }
  
  // Folder putanje
  const folders = [
    { path: path.join(__dirname, '../public/images/autorka'), prefix: '' },
    { path: path.join(__dirname, '../public/images'), prefix: '' }
  ]
  
  for (const folder of folders) {
    if (!fs.existsSync(folder.path)) {
      console.log(`⚠️  Folder ne postoji: ${folder.path}`)
      continue
    }
    
    const files = fs.readdirSync(folder.path)
    
    for (const file of files) {
      const metadata = IMAGE_MAPPINGS[file]
      
      if (!metadata) {
        console.log(`⏭️  Preskačem: ${file} (nema mapiranje)`)
        continue
      }
      
      const filePath = path.join(folder.path, file)
      
      // Proveri da li je fajl
      const stat = fs.statSync(filePath)
      if (!stat.isFile()) continue
      
      // Proveri da li slika već postoji
      const existing = await checkIfImageExists(file)
      
      if (existing) {
        console.log(`⏭️  Već postoji: ${metadata.title} (ID: ${existing._id})`)
        results.skipped++
        
        // Samo poveži sa dokumentom
        await linkImageToDocument(existing._id, metadata)
        results.linked++
        continue
      }
      
      // Upload sliku
      const asset = await uploadImageToSanity(filePath, metadata)
      
      if (asset) {
        results.uploaded++
        
        // Poveži sa dokumentom
        await linkImageToDocument(asset._id, metadata)
        results.linked++
      } else {
        results.failed++
      }
    }
  }
  
  // Dodatno: Upload galerije slika za knjige
  console.log('\\n📚 Uploadujem galerije slika za knjige...')
  await uploadBookGalleries()
  
  console.log('\\n🎉 Upload završen!')
  console.log('📊 Rezultati:')
  console.log(`   - Uploadovano: ${results.uploaded} slika`)
  console.log(`   - Preskočeno: ${results.skipped} slika (već postoje)`)
  console.log(`   - Neuspešno: ${results.failed} slika`)
  console.log(`   - Povezano: ${results.linked} slika sa dokumentima`)
}

/**
 * Upload galerija slika za knjige
 */
async function uploadBookGalleries() {
  const bookFolders = {
    'jesenja-gozba': {
      slug: 'jesenja-gozba',
      sourceFolder: 'jesenja-gozba',
      images: [
        { source: 'vila_bosiljcica.jpg', name: 'vila-jeseni.webp' },
        { source: 'luka.png', name: 'decak-luka.webp' },
        { source: 'mitra.png', name: 'mitra.webp' }
      ]
    },
    'zimski-mir': {
      slug: 'zimski-mir',
      sourceFolder: 'zimski-mir',
      images: [
        { source: 'vila_bozica.jpg', name: 'vila-zime.webp' },
        { source: 'sava-alternative.png', name: 'sava.webp' },
        { source: 'vera.png', name: 'vera.webp' }
      ]
    },
    'prolecna-zurba': {
      slug: 'prolecna-zurba',
      sourceFolder: 'prolecna-zurba',
      images: [
        { source: 'vila_djurdjica.png', name: 'vila-proleca.webp' },
        { source: 'nada.png', name: 'nada.webp' },
        { source: 'dragoljupce.png', name: 'dragoljupce.webp' }
      ]
    },
    'letnja-vreva': {
      slug: 'letnja-vreva',
      sourceFolder: 'letnja-vreva',
      images: [
        { source: 'letnja_fairy.png', name: 'vila-leta.webp' },
        { source: 'petar.png', name: 'petar.webp' },
        { source: 'vida-alternative.png', name: 'vida.webp' }
      ]
    }
  }
  
  for (const [folderName, bookData] of Object.entries(bookFolders)) {
    const folderPath = path.join(__dirname, '../public/images', folderName)
    const sourcePath = path.join(__dirname, '../../srecno-ucenje-slike', bookData.sourceFolder)
    
    // Kreiraj folder ako ne postoji
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }
    
    // Kopiraj slike iz source foldera
    for (const imageInfo of bookData.images) {
      const sourceFile = path.join(sourcePath, imageInfo.source)
      const destFile = path.join(folderPath, imageInfo.name)
      
      if (fs.existsSync(sourceFile) && !fs.existsSync(destFile)) {
        fs.copyFileSync(sourceFile, destFile)
        console.log(`📋 Kopirano: ${imageInfo.source} -> ${imageInfo.name}`)
      }
    }
    
    // Pronađi knjigu
    const book = await client.fetch(
      `*[_type == "book" && slug.current == $slug][0]`,
      { slug: bookData.slug }
    )
    
    if (!book) {
      console.log(`⚠️  Knjiga nije pronađena: ${bookData.slug}`)
      continue
    }
    
    const galleryImages = []
    
    for (const imageInfo of bookData.images) {
      const imagePath = path.join(folderPath, imageInfo.name)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Slika ne postoji: ${imagePath}`)
        continue
      }
      
      // Upload sliku
      const asset = await uploadImageToSanity(imagePath, {
        title: `${book.title} - ${imageInfo.name}`,
        description: `Galerija slika za knjigu ${book.title}`
      })
      
      if (asset) {
        galleryImages.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          },
          alt: `${book.title} - ilustracija`
        })
      }
    }
    
    // Ažuriraj knjigu sa galerijom
    if (galleryImages.length > 0) {
      await client.patch(book._id)
        .set({ illustrationGallery: galleryImages })
        .commit()
      
      console.log(`📸 Dodato ${galleryImages.length} slika u galeriju za "${book.title}"`)
    }
  }
}

/**
 * Briše sve slike iz Sanity (oprezno!)
 */
async function cleanImages() {
  console.log('🧹 Brisanje slika iz Sanity...')
  
  try {
    // Pronađi sve slike uploadovane kroz ovaj script
    const assets = await client.fetch(
      `*[_type == "sanity.imageAsset" && (
        originalFilename in ["zeljana-fotografija.png", "zeljana-ilustracija.png"] ||
        originalFilename match "*-cover.jpg" ||
        description match "*knjige*"
      )]`
    )
    
    console.log(`Pronađeno ${assets.length} slika za brisanje...`)
    
    for (const asset of assets) {
      await client.delete(asset._id)
      console.log(`🗑️  Obrisano: ${asset.originalFilename}`)
    }
    
    console.log('✅ Slike obrisane')
    
  } catch (error) {
    console.error('❌ Greška pri brisanju:', error.message)
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2]
  
  switch (command) {
    case 'clean':
      cleanImages()
      break
      
    case 'upload':
    default:
      uploadAllImages()
      break
  }
}

module.exports = {
  uploadAllImages,
  cleanImages,
  uploadImageToSanity,
  linkImageToDocument
}