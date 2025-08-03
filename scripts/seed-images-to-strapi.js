const fs = require('fs-extra');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Strapi konfiguracija
const STRAPI_CONFIG = {
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  token: process.env.STRAPI_API_TOKEN,
  timeout: 30000
};

// Podaci o knjigama za kreiranje u Strapi
const BOOKS_DATA = {
  'jesenja-gozba': {
    title: "Jesenja gozba",
    slug: "jesenja-gozba",
    subtitle: "sa vilom Bosiljčicom",
    year: 2021,
    color_theme: "yellow",
    hero_text: "Otkrijte čarobni svet jeseni sa vilom Bosiljčicom\nEdukativna priča koja spaja bajku sa naukom, ekonomijom i matematikom",
    about_book: "Jesenja gozba je prva knjiga iz serijala 'Luka godišnjih doba' koja vodi decu na zapadnu stranu čarobne luke. Vila Bosiljčica, žuta jesenja vila sa dugom kosom i korpom punom plodova, dočekuje decu kao domaćica i kulinarska čarobnica.\n\nKroz priču, deca uče o godišnjim dobima, razlikovanju plodova, osnovama ekonomije i matematike. Razvijaju zahvalnost prema prirodi, poštovanje prema roditeljima i razumevanje da su rad i preduzetništvo važan deo života.\n\nKnjiga je nastala 2021. godine kao deo obrazovnog univerzuma koji spaja tradicionalne vrednosti sa modernim pristupom učenju.",
    fairy: {
      name: "Vila Bosiljčica",
      description: "Žuta jesenja vila, kuvarica i trgovkinja rođena 17. septembra. Njena tajna radionica 'Vajat ukusa' je mesto gde eksperimentiše sa ukusima i proverava da li su gosti sačuvali zahvalnost i umerenost.",
      virtues: ["zahvalnost", "umerenost", "gostoprimstvo"],
      birth_date: "17. septembar",
      secret_place: "Vajat ukusa"
    },
    child_characters: [
      {
        name: "Luka",
        description: "Vedri dečak koji živi u Italiji i rado pomaže u kuvanju međunarodnih jela. Voli sport i muziku, a kroz iskustva svoje porodice uči o tradiciji i domovini.",
        characteristics: ["radoznalost", "poštovanje tradicije", "timski duh"]
      },
      {
        name: "Mitra",
        description: "Razigrana devojčica sa crvenom kosom koja obožava matematiku i kuvanje. Hrabra je i vesela, pokazuje kako vatru treba koristiti odgovorno i voli životinje.",
        characteristics: ["hrabrost", "veselost", "odgovornost"]
      }
    ],
    reviews: [
      {
        text: "Magično putovanje koje razvija maštu i znatiželju. Knjiga je savršen spoj nauke i bajke sa elementima zoologije, botanike, geografije i ekologije.",
        author: "Gradimir Stojković",
        title: "pisac"
      }
    ]
  },
  
  'zimski-mir': {
    title: "Zimski mir",
    slug: "zimski-mir",
    subtitle: "sa vilom Božicom",
    year: 2022,
    color_theme: "blue",
    hero_text: "Uronite u zimsku čaroliju sa vilom Božicom\nPriča o porodičnoj toplini, tradiciji i očuvanju kulturnog nasleđa",
    about_book: "Zimski mir odvija se na severnoj strani čarobne luke gde plava zimska vila Božica, tkalja i pripovedačica, dočekuje decu u snežnoj kućici. Ona neguje očuvanje maternjeg jezika, učenje stranih jezika i poznavanje istorije.\n\nVila prenosi mir, blagost, milosrđe i praštanje kroz priče i rukotvorine. Knjiga naglašava značaj porodične topline tokom zime, darivanja ručno izrađenih poklona i poštovanja kulturnog nasleđa.\n\nPotkrovlje vile Božice krije porodične priče i rukotvorine koje čuvaju sećanja i tradiciju.",
    fairy: {
      name: "Vila Božica",
      description: "Plava zimska vila, tkalja i pripovedačica. Čuva porodične priče i rukotvorine, uči decu o važnosti maternjeg jezika i tradicije.",
      virtues: ["mir", "blagost", "milosrđe", "praštanje"],
      secret_place: "Potkrovlje sa porodičnim pričama"
    },
    child_characters: [
      {
        name: "Sava",
        description: "Dečak čija majka radi u biblioteci. Voli da pravi igračke i rešava zadatke. Odlikuju ga kreativnost i odgovornost.",
        characteristics: ["kreativnost", "odgovornost", "ljubav prema knjigama"]
      },
      {
        name: "Vera", 
        description: "Devojčica koja izrađuje narodnu garderobu u porodičnoj radnji. Uči decu o tradiciji i kulturnom nasleđu.",
        characteristics: ["smernost", "kultura", "uljudnost"]
      }
    ]
  },
  
  'prolecna-zurba': {
    title: "Prolećna žurba",
    slug: "prolecna-zurba", 
    subtitle: "sa vilom Đurđicom",
    year: 2022,
    color_theme: "green",
    hero_text: "Probudite se uz prolećnu magiju vile Đurđice\nOtkrijte tajne lekovitih biljaka i čuda prirode",
    about_book: "Na istočnoj strani luke živi Vila Đurđica (Zelenka), vila-travarka koja leči biljke i ljude. U svojoj tajnoj 'Laboratoriji mirisa' pravi meleme i eksperimentiše sa lekovitim biljem.\n\nDeca uče botaniku, ekologiju i zaštitu prirode. Vila ih podstiče da čuvaju retke biljne vrste, prave prirodne preparate i razumeju ravnotežu između ljudi i okoline. Razvijaju nadu, sreću, hrabrost i radost.\n\nKnjiga integrativno spaja ekologiju, biologiju i narodno travarstvo, inspirišući očuvanje prirode.",
    fairy: {
      name: "Vila Đurđica (Zelenka)",
      description: "Zelena prolećna vila-travarka. U Laboratoriji mirisa pravi meleme i lekovite preparate. Uči decu o biljkama i prirodi.",
      virtues: ["nada", "sreća", "hrabrost", "radost življenja"],
      secret_place: "Laboratorija mirisa"
    },
    child_characters: [
      {
        name: "Dragoljupče",
        description: "Dečak koji živi sa bakom i dekom u blizini sela. Ostao je bez roditelja i vredno radi na farmi.",
        characteristics: ["skromnost", "nesebičnost", "marljivost"]
      },
      {
        name: "Nada (Nađa)",
        description: "Dragoljupčetova sestra koja živi u Amsterdamu. Govori više jezika, pravi kućice za insekte i ima astmu koju ublažava čajevima.",
        characteristics: ["nada", "istrajnost", "pobeda nad preprekama"]
      }
    ]
  },
  
  'letnja-vreva': {
    title: "Letnja vreva",
    slug: "letnja-vreva",
    subtitle: "sa vilom Sunčicom", 
    year: 2023,
    color_theme: "red",
    hero_text: "Zakoračite u letnju avanturu sa vilom Sunčicom\nGde se nauka i umetnost spajaju u čarobnu celinu",
    about_book: "Južna strana luke pripada Vili Sunčici, crvenoj vili leta koja je istovremeno umetnica i naučnica. U svom 'Ateljeu otisaka' stvara umetnička dela i podstiče decu da istražuju, eksperimentišu i povezuju fiziku, hemiju, geografiju i umetnost.\n\nVila razvija ljubav, samopouzdanje, maštu i znatiželju. Knjiga uvodi teme budućnosti: digitalni tokeni, novčanici, teleportacija i medijska pismenost. Posebno podstiče devojčice da se bave naukom.\n\nOvo je završna knjiga serijala koja poziva decu da zamisle budućnost kroz spoj nauke i umetnosti.",
    fairy: {
      name: "Vila Sunčica",
      description: "Crvena letnja vila, umetnica i naučnica. U Ateljeu otisaka spaja nauku i umetnost, inspirišući decu na istraživanje.",
      virtues: ["ljubav", "samopouzdanje", "mašta", "znatiželja"],
      secret_place: "Atelje otisaka"
    },
    child_characters: [
      {
        name: "Petar",
        description: "Dečak iz ruralnog sela koji izrađuje figure iz blata.",
        characteristics: ["intuitivnost", "saosećanje", "maštovitost"]
      },
      {
        name: "Vida",
        description: "Starija sestra koja voli modernu tehnologiju i nosi VR naočare.",
        characteristics: ["odgovornost", "hrabrost", "brižnost"]
      },
      {
        name: "Ilina",
        description: "Mlađa sestra, radoznala i energična. Voli slikanje i igru.",
        characteristics: ["radost", "sloboda", "spontanost"]
      }
    ]
  }
};

// Landing page podaci
const BOOKS_LANDING_DATA = {
  hero_title: "Čarobno selo - Luka godišnjih doba",
  hero_subtitle: "Obrazovni serijal knjiga Željane Radojičić Lukić",
  series_description: "Četiri knjige koje prate godišnja doba i vode decu kroz čarobnu luку gde žive vile koje čuvaju prirodu, tradiciju i znanje. Svaka knjiga nosi svoju boju, svoju vilu i svoju lekciju o životu.",
  author_section: {
    title: "O autorki",
    description: "Željana Radojičić Lukić je doktor pedagogije, profesorka i istraživačica sa preko 20 godina iskustva u obrazovanju. Kroz serijal 'Luka godišnjih doba' spaja tradicionalne vrednosti sa modernim pristupom učenju.",
    link_to_about: "/o-autorki"
  }
};

/**
 * Glavna funkcija za upload slika u Strapi
 */
async function seedImagesToStrapi() {
  console.log('🚀 Započinje upload slika u Strapi CMS...\n');
  
  // Proverava konfiguraciju
  if (!STRAPI_CONFIG.token) {
    console.error('❌ STRAPI_API_TOKEN environment varijabla nije postavljena');
    console.log('💡 Postavite STRAPI_API_TOKEN sa vašim Strapi API ključem');
    process.exit(1);
  }
  
  // Proverava da li su slike procesuirane
  const imagesDir = './public/images/knjige';
  if (!await fs.pathExists(imagesDir)) {
    console.error('❌ Procesuirane slike nisu pronađene');
    console.log('💡 Pokrenite prvo: npm run process:images');
    process.exit(1);
  }
  
  try {
    // Kreira content tipove u Strapi (ako već nisu kreirani)
    await ensureContentTypes();
    
    // Upload slika i kreiranje Books entiteta
    await uploadBooksWithImages();
    
    // Kreira Books Landing page
    await createBooksLanding();
    
    console.log('\n🎉 Upload u Strapi uspešno završen!');
    console.log('🔗 Možete proveriti u Strapi admin panel-u');
    
  } catch (error) {
    console.error('❌ Greška tokom upload-a:', error.message);
    process.exit(1);
  }
}

/**
 * Upload-uje sve knjige sa slikama
 */
async function uploadBooksWithImages() {
  console.log('📚 Upload knjiga u Strapi...\n');
  
  for (const [slug, bookData] of Object.entries(BOOKS_DATA)) {
    console.log(`📖 Procesiranje: ${bookData.title}`);
    
    try {
      // Upload slika za ovu knjigu
      const uploadedImages = await uploadBookImages(slug);
      
      // Kreira Book entitet sa povezanim slikama
      const bookEntity = await createBookEntity(bookData, uploadedImages);
      
      console.log(`✅ ${bookData.title}: uspešno kreiran (ID: ${bookEntity.id})\n`);
      
    } catch (error) {
      console.error(`❌ ${bookData.title}: ${error.message}\n`);
    }
  }
}

/**
 * Upload-uje slike za jednu knjigu
 */
async function uploadBookImages(bookSlug) {
  const bookImagesDir = `./public/images/knjige/${bookSlug}`;
  
  if (!await fs.pathExists(bookImagesDir)) {
    throw new Error(`Slike za ${bookSlug} nisu pronađene`);
  }
  
  const imageFiles = await fs.readdir(bookImagesDir);
  const webpFiles = imageFiles.filter(file => file.endsWith('.webp'));
  
  console.log(`   📁 Upload ${webpFiles.length} slika...`);
  
  const uploadedImages = {};
  
  for (const file of webpFiles) {
    const filePath = path.join(bookImagesDir, file);
    const fileName = path.parse(file).name;
    
    try {
      const uploadResult = await uploadFileToStrapi(filePath, file);
      uploadedImages[fileName] = uploadResult;
      console.log(`   ✅ ${file}`);
    } catch (error) {
      console.error(`   ❌ ${file}: ${error.message}`);
    }
  }
  
  return uploadedImages;
}

/**
 * Upload-uje jedan fajl u Strapi
 */
async function uploadFileToStrapi(filePath, fileName) {
  const formData = new FormData();
  const fileStream = fs.createReadStream(filePath);
  
  formData.append('files', fileStream, fileName);
  
  const response = await fetch(`${STRAPI_CONFIG.url}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_CONFIG.token}`
    },
    body: formData,
    timeout: STRAPI_CONFIG.timeout
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${error}`);
  }
  
  const result = await response.json();
  return result[0]; // Strapi vraća array, uzimamo prvi element
}

/**
 * Kreira Book entitet u Strapi
 */
async function createBookEntity(bookData, uploadedImages) {
  // Mapira uploaded slike na odgovarajuća polja
  const imageFields = {};
  
  if (uploadedImages.cover) {
    imageFields.cover_image = uploadedImages.cover.id;
  }
  if (uploadedImages.hero) {
    imageFields.hero_illustration = uploadedImages.hero.id;
  }
  if (uploadedImages['vila-' + bookData.slug.split('-').pop()]) {
    imageFields.fairy_illustration = uploadedImages['vila-' + bookData.slug.split('-').pop()].id;
  }
  
  // Kreira gallery slike array
  const galleryImages = Object.values(uploadedImages)
    .filter(img => !['cover', 'hero'].includes(img.name.split('.')[0]))
    .map(img => img.id);
  
  const bookEntity = {
    data: {
      ...bookData,
      ...imageFields,
      gallery_images: galleryImages,
      publishedAt: new Date().toISOString()
    }
  };
  
  const response = await fetch(`${STRAPI_CONFIG.url}/api/books`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_CONFIG.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookEntity),
    timeout: STRAPI_CONFIG.timeout
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kreiranje knjige neuspešno: ${response.status} - ${error}`);
  }
  
  const result = await response.json();
  return result.data;
}

/**
 * Kreira Books Landing page u Strapi
 */
async function createBooksLanding() {
  console.log('🏠 Kreiranje Books Landing page...');
  
  const landingData = {
    data: {
      ...BOOKS_LANDING_DATA,
      publishedAt: new Date().toISOString()
    }
  };
  
  const response = await fetch(`${STRAPI_CONFIG.url}/api/books-landing`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_CONFIG.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(landingData),
    timeout: STRAPI_CONFIG.timeout
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kreiranje landing page neuspešno: ${response.status} - ${error}`);
  }
  
  console.log('✅ Books Landing page kreiran');
}

/**
 * Proverava i kreira potrebne content tipove u Strapi
 */
async function ensureContentTypes() {
  console.log('🔍 Proverava Strapi content tipove...');
  
  // Proveri da li postoje Book i BooksLanding content tipovi
  try {
    const booksResponse = await fetch(`${STRAPI_CONFIG.url}/api/books?pagination[limit]=1`, {
      headers: { 'Authorization': `Bearer ${STRAPI_CONFIG.token}` }
    });
    
    const landingResponse = await fetch(`${STRAPI_CONFIG.url}/api/books-landing`, {
      headers: { 'Authorization': `Bearer ${STRAPI_CONFIG.token}` }
    });
    
    if (!booksResponse.ok || !landingResponse.ok) {
      console.log('⚠️  Content tipovi nisu pronađeni u Strapi');
      console.log('💡 Molimo kreirajte "Book" i "BooksLanding" content tipove u Strapi admin panel-u');
      console.log('📖 Instrukcije se nalaze u dokumentaciji');
    } else {
      console.log('✅ Content tipovi postoje');
    }
    
  } catch (error) {
    console.log('⚠️  Nije moguće pristupiti Strapi API');
    console.log('💡 Proverite da li je Strapi pokrenut i dostupan');
  }
}

/**
 * Brise sve postojeće Book entitete (za ponovni import)
 */
async function cleanExistingBooks() {
  console.log('🧹 Brisanje postojećih knjiga...');
  
  try {
    const response = await fetch(`${STRAPI_CONFIG.url}/api/books`, {
      headers: { 'Authorization': `Bearer ${STRAPI_CONFIG.token}` }
    });
    
    if (response.ok) {
      const books = await response.json();
      
      for (const book of books.data) {
        await fetch(`${STRAPI_CONFIG.url}/api/books/${book.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${STRAPI_CONFIG.token}` }
        });
      }
      
      console.log(`✅ Obrisano ${books.data.length} postojećih knjiga`);
    }
    
  } catch (error) {
    console.log('⚠️  Greška pri brisanju postojećih knjiga:', error.message);
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'clean':
      cleanExistingBooks();
      break;
      
    case 'seed':
    default:
      seedImagesToStrapi();
      break;
  }
}

module.exports = {
  seedImagesToStrapi,
  uploadBookImages,
  createBookEntity,
  cleanExistingBooks,
  BOOKS_DATA,
  BOOKS_LANDING_DATA
};