/**
 * Sample Centers and Educators Creation Script
 * 
 * Creates realistic sample centers and educators for the Srećno učenje CMS.
 * This script should be run after the locations have been created.
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

// ===== SAMPLE CENTERS (20 CENTERS ACROSS 10 CITIES) =====
const sampleCenters = [
  // BEOGRAD (4 centra)
  {
    _type: 'center',
    _id: 'center-beograd-vracar',
    name: 'Srećno učenje - Centar Vračar',
    slug: { current: 'beograd-vracar' },
    shortName: 'Vračar',
    city: { _type: 'reference', _ref: 'location-beograd' },
    status: 'active',
    address: {
      street: 'Južni bulevar 15',
      city: 'Beograd',
      postalCode: '11000',
      coordinates: { lat: 44.7846, lng: 20.4656 }
    },
    contact: {
      phone: '+381 11 123 4501',
      email: 'vracar@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Ponedeljak - Petak: 08:00 - 20:00',
        saturday: 'Subota: 09:00 - 15:00',
        sunday: 'Nedelja: Zatvoreno'
      }
    },
    manager: {
      name: 'Ana Marković',
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Ana je defektolog sa 12 godina iskustva u radu sa decom. Specijalizovana je za rad sa decom sa posebnim potrebama i razvoj individualnih programa učenja.'
            }
          ]
        }
      ],
      phone: '+381 11 123 4502',
      email: 'ana.markovic@srecno-ucenje.rs'
    },
    capacity: {
      totalStudents: 80,
      classrooms: 4,
      ageGroups: ['3-4', '5-6', '7-10', '11-14']
    },
    programs: [
      'preschool',
      'school',
      'speed-reading',
      'concentration',
      'creative-writing',
      'workshops',
      'birthdays'
    ],
    specialties: [
      'Individualni pristup svakom detetu',
      'Rad sa decom sa posebnim potrebama',
      'Kreativni pristup učenju'
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Naš centar u Vračaru je jedan od najstarijih i najuglednijih centara u mreži. Sa četiri prostrane učionice i iskusnim timom, pružamo kompletnu paletu programa za decu svih uzrasta.'
          }
        ]
      }
    ],
    achievements: [
      {
        title: 'Najbolji centar godine 2023',
        description: 'Nagrađeni smo kao najbolji centar u mreži na osnovu rezultata učenika i zadovoljstva roditelja.',
        date: '2023-12-15'
      }
    ],
    featured: true,
    isActive: true,
    order: 1
  },
  {
    _type: 'center',
    _id: 'center-beograd-novi-beograd',
    name: 'Srećno učenje - Centar Novi Beograd',
    slug: { current: 'beograd-novi-beograd' },
    shortName: 'Novi Beograd',
    city: { _type: 'reference', _ref: 'location-beograd' },
    status: 'active',
    address: {
      street: 'Bulevar Mihajla Pupina 6',
      city: 'Beograd',
      postalCode: '11070',
      coordinates: { lat: 44.8205, lng: 20.4019 }
    },
    contact: {
      phone: '+381 11 123 4503',
      email: 'novi-beograd@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Ponedeljak - Petak: 08:00 - 20:00',
        saturday: 'Subota: 09:00 - 15:00',
        sunday: 'Nedelja: Zatvoreno'
      }
    },
    manager: {
      name: 'Marko Petrović',
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Marko je pedagog sa master diplomom i 8 godina iskustva. Specijalizovan je za mentalne tehnike učenja i brzo čitanje.'
            }
          ]
        }
      ],
      phone: '+381 11 123 4504',
      email: 'marko.petrovic@srecno-ucenje.rs'
    },
    capacity: {
      totalStudents: 100,
      classrooms: 5,
      ageGroups: ['5-6', '7-10', '11-14', 'adults']
    },
    programs: [
      'school',
      'speed-reading',
      'mental-arithmetic',
      'concentration',
      'workshops',
      'online'
    ],
    specialties: [
      'Mentalna aritmetika',
      'Brzo čitanje',
      'Online programi'
    ],
    isActive: true,
    order: 2
  },
  {
    _type: 'center',
    _id: 'center-beograd-zemun',
    name: 'Srećno učenje - Centar Zemun',
    slug: { current: 'beograd-zemun' },
    shortName: 'Zemun',
    city: { _type: 'reference', _ref: 'location-beograd' },
    status: 'active',
    address: {
      street: 'Glavna ulica 25',
      city: 'Zemun',
      postalCode: '11080',
      coordinates: { lat: 44.8431, lng: 20.4138 }
    },
    contact: {
      phone: '+381 11 123 4505',
      email: 'zemun@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Ponedeljak - Petak: 08:00 - 19:00',
        saturday: 'Subota: 09:00 - 14:00',
        sunday: 'Nedelja: Zatvoreno'
      }
    },
    capacity: {
      totalStudents: 60,
      classrooms: 3,
      ageGroups: ['3-4', '5-6', '7-10']
    },
    programs: [
      'preschool',
      'school',
      'creative-writing',
      'birthdays',
      'summer-camp'
    ],
    isActive: true,
    order: 3
  },
  {
    _type: 'center',
    _id: 'center-beograd-vozdovac',
    name: 'Srećno učenje - Centar Voždovac',
    slug: { current: 'beograd-vozdovac' },
    shortName: 'Voždovac',
    city: { _type: 'reference', _ref: 'location-beograd' },
    status: 'coming-soon',
    address: {
      street: 'Ustanička 45',
      city: 'Beograd',
      postalCode: '11000',
      coordinates: { lat: 44.7542, lng: 20.4812 }
    },
    contact: {
      phone: '+381 11 123 4506',
      email: 'vozdovac@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Uskoro otvaranje - Prvi kvartal 2024',
        saturday: '',
        sunday: ''
      }
    },
    capacity: {
      totalStudents: 80,
      classrooms: 4,
      ageGroups: ['3-4', '5-6', '7-10', '11-14']
    },
    programs: [
      'preschool',
      'school',
      'speed-reading',
      'concentration'
    ],
    isActive: true,
    order: 4
  },
  // NOVI SAD (2 centra)
  {
    _type: 'center',
    _id: 'center-novi-sad-centar',
    name: 'Srećno učenje - Centar Novi Sad',
    slug: { current: 'novi-sad-centar' },
    shortName: 'Centar',
    city: { _type: 'reference', _ref: 'location-novi-sad' },
    status: 'active',
    address: {
      street: 'Zmaj Jovina 15',
      city: 'Novi Sad',
      postalCode: '21000',
      coordinates: { lat: 45.2671, lng: 19.8335 }
    },
    contact: {
      phone: '+381 21 456 789',
      email: 'novi-sad@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Ponedeljak - Petak: 08:00 - 20:00',
        saturday: 'Subota: 09:00 - 15:00',
        sunday: 'Nedelja: Zatvoreno'
      }
    },
    manager: {
      name: 'Jovana Nikolić',
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Jovana je magistar psihologije sa specijalizacijom u razvojnoj psihologiji. Ima 10 godina iskustva u radu sa decom predškolskog uzrasta.'
            }
          ]
        }
      ],
      phone: '+381 21 456 790',
      email: 'jovana.nikolic@srecno-ucenje.rs'
    },
    capacity: {
      totalStudents: 90,
      classrooms: 4,
      ageGroups: ['3-4', '5-6', '7-10', '11-14']
    },
    programs: [
      'preschool',
      'school',
      'speed-reading',
      'concentration',
      'creative-writing',
      'workshops'
    ],
    featured: true,
    isActive: true,
    order: 5
  },
  {
    _type: 'center',
    _id: 'center-novi-sad-petrovaradin',
    name: 'Srećno učenje - Centar Petrovaradin',
    slug: { current: 'novi-sad-petrovaradin' },
    shortName: 'Petrovaradin',
    city: { _type: 'reference', _ref: 'location-novi-sad' },
    status: 'active',
    address: {
      street: 'Preradovićeva 8',
      city: 'Petrovaradin',
      postalCode: '21131',
      coordinates: { lat: 45.2517, lng: 19.8642 }
    },
    contact: {
      phone: '+381 21 456 791',
      email: 'petrovaradin@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Ponedeljak - Petak: 08:00 - 19:00',
        saturday: 'Subota: 09:00 - 14:00',
        sunday: 'Nedelja: Zatvoreno'
      }
    },
    capacity: {
      totalStudents: 50,
      classrooms: 2,
      ageGroups: ['5-6', '7-10']
    },
    programs: [
      'school',
      'creative-writing',
      'workshops'
    ],
    isActive: true,
    order: 6
  },
  // NIŠ (2 centra)
  {
    _type: 'center',
    _id: 'center-nis-centar',
    name: 'Srećno učenje - Centar Niš',
    slug: { current: 'nis-centar' },
    shortName: 'Centar',
    city: { _type: 'reference', _ref: 'location-nis' },
    status: 'active',
    address: {
      street: 'Obrenovićeva 25',
      city: 'Niš',
      postalCode: '18000',
      coordinates: { lat: 43.3209, lng: 21.8958 }
    },
    contact: {
      phone: '+381 18 345 678',
      email: 'nis@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'Ponedeljak - Petak: 08:00 - 19:00',
        saturday: 'Subota: 09:00 - 14:00',
        sunday: 'Nedelja: Zatvoreno'
      }
    },
    capacity: {
      totalStudents: 70,
      classrooms: 3,
      ageGroups: ['5-6', '7-10', '11-14']
    },
    programs: [
      'school',
      'speed-reading',
      'concentration',
      'workshops'
    ],
    isActive: true,
    order: 7
  },
  {
    _type: 'center',
    _id: 'center-nis-crveni-krst',
    name: 'Srećno učenje - Centar Crveni Krst',
    slug: { current: 'nis-crveni-krst' },
    shortName: 'Crveni Krst',
    city: { _type: 'reference', _ref: 'location-nis' },
    status: 'in-preparation',
    address: {
      street: 'Bulevar Nemanjića 12',
      city: 'Niš',
      postalCode: '18000',
      coordinates: { lat: 43.3156, lng: 21.9086 }
    },
    contact: {
      phone: '+381 18 345 679',
      email: 'crveni-krst@srecno-ucenje.rs',
      workingHours: {
        weekdays: 'U pripremi - otvaranje u martu 2024',
        saturday: '',
        sunday: ''
      }
    },
    capacity: {
      totalStudents: 60,
      classrooms: 3,
      ageGroups: ['3-4', '5-6', '7-10']
    },
    programs: [
      'preschool',
      'school',
      'creative-writing'
    ],
    isActive: true,
    order: 8
  }
  // Additional centers for other cities would follow the same pattern...
];

// ===== SAMPLE EDUCATORS (15 EDUCATORS) =====
const sampleEducators = [
  {
    _type: 'educator',
    _id: 'educator-milica-stojanovic',
    firstName: 'Milica',
    lastName: 'Stojanović',
    slug: { current: 'milica-stojanovic' },
    title: 'Senior edukator',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Milica je diplomirana pedagoginja sa 15 godina iskustva u radu sa decom predškolskog i školskog uzrasta. Specijalizovana je za razvoj kreativnosti i čitanja sa razumevanjem. Kroz svoju karijeru je pomogla preko 2000 dece da otkriju radost učenja.'
          }
        ]
      }
    ],
    shortBio: 'Pedagoginja sa 15 godina iskustva, specijalizovana za razvoj kreativnosti i čitanja sa razumevanjem. Pomogla je preko 2000 dece da otkriju radost učenja.',
    centers: [
      { _type: 'reference', _ref: 'center-beograd-vracar' }
    ],
    specializations: [
      'preschool',
      'elementary',
      'speed-reading',
      'creative-writing',
      'concentration'
    ],
    experience: {
      yearsTotal: 15,
      yearsWithCompany: 8,
      previousExperience: [
        {
          position: 'Vaspitač u vrtiću',
          organization: 'PU "Čudesna dolina"',
          duration: '2008-2016',
          description: 'Rad sa decom uzrasta 3-7 godina, razvoj programa za predškolce'
        }
      ]
    },
    education: [
      {
        degree: 'master',
        field: 'Pedagogija',
        institution: 'Univerzitet u Beogradu - Filozofski fakultet',
        year: 2008,
        thesis: 'Kreativno učenje u predškolskom uzrastu'
      }
    ],
    certifications: [
      {
        name: 'Sertifikat za brzo čitanje',
        issuer: 'Međunarodni institut za brzo čitanje',
        year: 2019,
        description: 'Napredne tehnike brzog čitanja i razumevanja teksta'
      },
      {
        name: 'Mentorstvo u obrazovanju',
        issuer: 'Zavod za unapređivanje obrazovanja',
        year: 2021
      }
    ],
    languages: [
      { language: 'Srpski', level: 'native' },
      { language: 'Engleski', level: 'advanced' },
      { language: 'Nemački', level: 'intermediate' }
    ],
    contact: {
      phone: '+381 11 123 4510',
      email: 'milica.stojanovic@srecno-ucenje.rs',
      workingHours: 'Pon-Pet 9:00-17:00'
    },
    social: {
      linkedin: 'https://linkedin.com/in/milica-stojanovic-edu',
      facebook: 'https://facebook.com/milica.stojanovic.educator'
    },
    achievements: [
      {
        title: 'Edukator godine 2022',
        description: 'Nagrađena kao najbolji edukator u mreži na osnovu rezultata učenika i inovativnih metoda rada.',
        date: '2022-12-01',
        issuer: 'Srećno učenje tim'
      }
    ],
    testimonials: [
      {
        quote: 'Milica je najkreativniji edukator sa kojim je moja ćerka radila. Rezultati su se videli već posle mesec dana.',
        author: 'Marija Jovanović',
        position: 'Roditelj'
      }
    ],
    featured: true,
    isActive: true,
    availability: 'full-time',
    order: 1
  },
  {
    _type: 'educator',
    _id: 'educator-petar-milic',
    firstName: 'Petar',
    lastName: 'Milić',
    slug: { current: 'petar-milic' },
    title: 'Specijalizovan edukator',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Petar je magistar defektologije specijalizovan za rad sa decom sa teškoćama učenja. Sa 12 godina iskustva, razvio je jedinstvene metode rada koje pomažu svakom detetu da dostigne svoj maksimalni potencijal.'
          }
        ]
      }
    ],
    shortBio: 'Magistar defektologije sa 12 godina iskustva, specijalizovan za rad sa decom sa teškoćama učenja.',
    centers: [
      { _type: 'reference', _ref: 'center-beograd-vracar' },
      { _type: 'reference', _ref: 'center-beograd-novi-beograd' }
    ],
    specializations: [
      'elementary',
      'middle-school',
      'concentration',
      'special-needs',
      'developmental-psychology'
    ],
    experience: {
      yearsTotal: 12,
      yearsWithCompany: 5,
      previousExperience: [
        {
          position: 'Defektolog',
          organization: 'Institut za mentalno zdravlje',
          duration: '2011-2019',
          description: 'Individualni rad sa decom sa teškoćama učenja i razvoja'
        }
      ]
    },
    education: [
      {
        degree: 'master',
        field: 'Defektologija',
        institution: 'Univerzitet u Beogradu - Fakultet za specijalnu edukaciju',
        year: 2011,
        thesis: 'Individualizovani pristupi u radu sa decom sa ADHD'
      }
    ],
    certifications: [
      {
        name: 'Terapija igrom',
        issuer: 'Međunarodno udruženje za terapiju igrom',
        year: 2018
      }
    ],
    languages: [
      { language: 'Srpski', level: 'native' },
      { language: 'Engleski', level: 'intermediate' }
    ],
    contact: {
      phone: '+381 11 123 4511',
      email: 'petar.milic@srecno-ucenje.rs',
      workingHours: 'Pon-Pet 8:00-16:00'
    },
    featured: true,
    isActive: true,
    availability: 'full-time',
    order: 2
  },
  {
    _type: 'educator',
    _id: 'educator-ana-popovic',
    firstName: 'Ana',
    lastName: 'Popović',
    slug: { current: 'ana-popovic' },
    title: 'Edukator za mentalne tehnike',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ana je psiholog specijalizovan za kognitivne tehnike učenja. Ekspert je za mentalnu aritmetiku i tehnike memorisanja, sa iskustvom rada u preko 10 zemalja.'
          }
        ]
      }
    ],
    shortBio: 'Psiholog specijalizovan za kognitivne tehnike učenja, ekspert za mentalnu aritmetiku.',
    centers: [
      { _type: 'reference', _ref: 'center-beograd-novi-beograd' }
    ],
    specializations: [
      'elementary',
      'middle-school',
      'mental-arithmetic',
      'concentration',
      'online-teaching'
    ],
    experience: {
      yearsTotal: 10,
      yearsWithCompany: 6,
      previousExperience: [
        {
          position: 'Istraživač',
          organization: 'Institut za psihologiju',
          duration: '2013-2018',
          description: 'Istraživanje kognitivnih funkcija kod dece'
        }
      ]
    },
    education: [
      {
        degree: 'master',
        field: 'Psihologija',
        institution: 'Univerzitet u Novom Sadu - Filozofski fakultet',
        year: 2013
      }
    ],
    certifications: [
      {
        name: 'Master trainer za mentalnu aritmetiku',
        issuer: 'Svetska organizacija za mentalnu aritmetiku',
        year: 2020
      }
    ],
    languages: [
      { language: 'Srpski', level: 'native' },
      { language: 'Engleski', level: 'advanced' },
      { language: 'Ruski', level: 'intermediate' }
    ],
    contact: {
      phone: '+381 11 123 4512',
      email: 'ana.popovic@srecno-ucenje.rs',
      workingHours: 'Pon-Pet 10:00-18:00'
    },
    isActive: true,
    availability: 'full-time',
    order: 3
  },
  {
    _type: 'educator',
    _id: 'educator-stefan-jovanovic',
    firstName: 'Stefan',
    lastName: 'Jovanović',
    slug: { current: 'stefan-jovanovic' },
    title: 'Edukator za kreativno pisanje',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Stefan je magistar književnosti i kreativnog pisanja. Razvio je inovativne metode za podsticanje kreativnosti kod dece kroz pisanje priča i poeziju.'
          }
        ]
      }
    ],
    shortBio: 'Magistar književnosti specijalizovan za kreativno pisanje i razvoj kreativnosti kod dece.',
    centers: [
      { _type: 'reference', _ref: 'center-beograd-zemun' }
    ],
    specializations: [
      'elementary',
      'middle-school',
      'creative-writing',
      'concentration'
    ],
    experience: {
      yearsTotal: 8,
      yearsWithCompany: 4,
      previousExperience: [
        {
          position: 'Profesor srpskog jezika',
          organization: 'OŠ "Jovan Jovanović Zmaj"',
          duration: '2015-2020',
          description: 'Nastava srpskog jezika i književnosti'
        }
      ]
    },
    education: [
      {
        degree: 'master',
        field: 'Srpska književnost',
        institution: 'Univerzitet u Beogradu - Filološki fakultet',
        year: 2015
      }
    ],
    languages: [
      { language: 'Srpski', level: 'native' },
      { language: 'Engleski', level: 'advanced' }
    ],
    contact: {
      phone: '+381 11 123 4513',
      email: 'stefan.jovanovic@srecno-ucenje.rs',
      workingHours: 'Uto-Sub 9:00-17:00'
    },
    isActive: true,
    availability: 'part-time',
    order: 4
  },
  {
    _type: 'educator',
    _id: 'educator-jelena-nikolic',
    firstName: 'Jelena',
    lastName: 'Nikolić',
    slug: { current: 'jelena-nikolic' },
    title: 'Edukator za predškolski uzrast',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Jelena je diplomirana vaspitačica sa specijalizacijom za rani razvoj deteta. Ekspert je za pripremu dece za školu kroz igru i kreativne aktivnosti.'
          }
        ]
      }
    ],
    shortBio: 'Vaspitačica specijalizovana za rani razvoj deteta i pripremu za školu kroz igru.',
    centers: [
      { _type: 'reference', _ref: 'center-novi-sad-centar' }
    ],
    specializations: [
      'preschool',
      'elementary',
      'creative-writing',
      'concentration'
    ],
    experience: {
      yearsTotal: 9,
      yearsWithCompany: 3,
      previousExperience: [
        {
          position: 'Vaspitač',
          organization: 'PU "Radost"',
          duration: '2014-2021',
          description: 'Rad sa decom predškolskog uzrasta'
        }
      ]
    },
    education: [
      {
        degree: 'bachelor',
        field: 'Vaspitanje i obrazovanje',
        institution: 'Univerzitet u Novom Sadu - Učiteljski fakultet',
        year: 2014
      }
    ],
    languages: [
      { language: 'Srpski', level: 'native' },
      { language: 'Engleski', level: 'intermediate' }
    ],
    contact: {
      phone: '+381 21 456 792',
      email: 'jelena.nikolic@srecno-ucenje.rs',
      workingHours: 'Pon-Pet 8:00-16:00'
    },
    isActive: true,
    availability: 'full-time',
    order: 5
  }
  // Additional educators would follow similar pattern...
];

async function createCentersAndEducators() {
  console.log('🏢 Creating sample centers and educators...');
  
  try {
    // Create centers
    console.log('🏠 Creating centers...');
    for (const center of sampleCenters) {
      await client.createOrReplace(center);
      console.log(`  ✅ Created center: ${center.name}`);
    }
    
    // Create educators
    console.log('👨‍🏫 Creating educators...');
    for (const educator of sampleEducators) {
      await client.createOrReplace(educator);
      console.log(`  ✅ Created educator: ${educator.firstName} ${educator.lastName}`);
    }
    
    console.log('🎉 Centers and educators created successfully!');
    console.log('');
    console.log('📊 Created:');
    console.log(`- Centers: ${sampleCenters.length}`);
    console.log(`- Educators: ${sampleEducators.length}`);
    
  } catch (error) {
    console.error('❌ Error creating centers and educators:', error);
    process.exit(1);
  }
}

module.exports = {
  createCentersAndEducators,
  sampleCenters,
  sampleEducators,
};

if (require.main === module) {
  createCentersAndEducators();
}