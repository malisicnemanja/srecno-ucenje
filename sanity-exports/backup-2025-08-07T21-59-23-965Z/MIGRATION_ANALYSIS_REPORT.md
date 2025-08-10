# Content Migration Analysis Report

**Generated:** 2025-08-07T21:59:40.139Z
**Source Export:** 2025-08-07T21:59:27.682Z
**Total Documents:** 245
**Content Types:** 28

## 🚨 Executive Summary

This analysis covers **245 documents** across **28 content types**.

🚨 **CRITICAL:** 2 content types require extreme caution during migration.

⚠️ **HIGH RISK:** 5 content types need careful handling and testing.

🔧 **COMPLEX:** 5 content types have complex structures requiring batch processing.

**Migration Approach:** Use the phased approach outlined below to ensure data integrity and minimize risk.

## 📊 Content Breakdown

| Document Type | Count | Complexity | Risk | Key Concerns |
|---------------|--------|------------|------|-------------|
| faq | 55 | MEDIUM | HIGH | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| franchiseField | 24 | MEDIUM | LOW | None |
| testimonial | 20 | MEDIUM | LOW | None |
| blogPost | 17 | CRITICAL | HIGH | ⚠️ Complex structure - migrate in small batches, ⚠️ Validate all nested objects after migration |
| faqCategory | 17 | MEDIUM | LOW | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| blogCategory | 15 | MEDIUM | LOW | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| calculatorResult | 13 | MEDIUM | LOW | None |
| locationData | 10 | MEDIUM | LOW | None |
| resource | 10 | LOW | LOW | None |
| successStory | 10 | MEDIUM | MEDIUM | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| book | 9 | CRITICAL | HIGH | ⚠️ Complex structure - migrate in small batches, ⚠️ Validate all nested objects after migration |
| booking | 5 | LOW | LOW | None |
| page | 5 | MEDIUM | LOW | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| aboutAuthor | 4 | CRITICAL | HIGH | ⚠️ Complex structure - migrate in small batches, ⚠️ Validate all nested objects after migration |
| author | 4 | MEDIUM | LOW | None |
| franchiseSection | 4 | MEDIUM | LOW | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| navigation | 3 | LOW | LOW | None |
| program | 3 | MEDIUM | LOW | None |
| siteSettings | 3 | MEDIUM | CRITICAL | 🚨 CRITICAL: Test migration extensively before production, 🚨 CRITICAL: Create additional backups before migration |
| booksLanding | 2 | HIGH | HIGH | ⚠️ Complex structure - migrate in small batches, ⚠️ Validate all nested objects after migration |
| calculatorSettings | 2 | MEDIUM | LOW | None |
| franchiseApplication | 2 | MEDIUM | LOW | 🔗 Many references - ensure all referenced documents exist first, 🔗 Consider migrating referenced types before this one |
| franchiseMotivational | 2 | MEDIUM | LOW | None |
| methodology | 2 | MEDIUM | LOW | None |
| bookingPage | 1 | MEDIUM | LOW | None |
| franchiseSteps | 1 | LOW | LOW | None |
| homePage | 1 | HIGH | CRITICAL | 🚨 CRITICAL: Test migration extensively before production, 🚨 CRITICAL: Create additional backups before migration |
| newsletterSubscriber | 1 | LOW | LOW | None |

## 🗺️ Migration Plan


### Phase 1: Core Infrastructure
**Risk Level:** CRITICAL
**Types:** None
**Dependencies:** None


### Phase 2: Foundation Content
**Risk Level:** MEDIUM
**Types:** None
**Dependencies:** None


### Phase 3: Main Content
**Risk Level:** MEDIUM
**Types:** testimonial
**Dependencies:** None


### Phase 4: Complex Content
**Risk Level:** HIGH
**Types:** aboutAuthor, author, blogCategory, blogPost, book, booking, bookingPage, booksLanding, calculatorResult, calculatorSettings, faq, faqCategory, franchiseApplication, franchiseField, franchiseMotivational, franchiseSection, franchiseSteps, homePage, locationData, methodology, navigation, newsletterSubscriber, page, program, resource, siteSettings, successStory
**Dependencies:** testimonial


## 💡 Recommendations

### 🚨 Immediate Actions
- 🚨 Ensure all stakeholders are aware of the migration
- 📋 Schedule a maintenance window for the migration
- 🔐 Verify all API tokens and permissions are working
- 🧪 Set up a development/staging environment for testing
- ⚠️ 7 high-risk content types identified - review carefully

### 📋 Before Migration
- ✅ Run the export script one more time right before migration
- 🔒 Put the website in maintenance mode
- 📧 Notify users about the maintenance
- 🧪 Test the migration scripts on development environment
- 📊 Document current content counts for verification

### ⚙️ During Migration
- 📊 Monitor progress and log all operations
- 🚫 Do not modify content during migration
- 🔍 Validate each phase before proceeding to the next
- ⏸️ Be prepared to pause if issues arise
- 📱 Keep communication channels open with stakeholders

### ✅ After Migration
- 🔍 Verify all document counts match the export
- 🧪 Test all website functionality
- 🔗 Verify all internal links are working
- 🖼️ Check that all images and assets are loading
- 📧 Notify stakeholders of successful completion
- 🗂️ Archive the export files safely
- 📊 Document any issues encountered for future reference

## 📄 Detailed Content Analysis


### faq
**Count:** 55 documents
**Complexity:** MEDIUM
**Migration Risk:** HIGH

**Fields:** 13 total fields
**References:** 5 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:47:52Z",
  "_id": "EIn1TO6kzkBkpMuRkFFcYI",
  "_rev": "xmE432SUuemXLQhUEYiBtF",
  "_type": "faq",
  "_updatedAt": "2025-08-07T19:50:38Z",
  "answer": "Propušteni časovi se mogu nadoknaditi u dogovoru sa instruktorom, u okviru tekućeg meseca.",
  "category": {
    "_ref": "faqCategory.general",
    "_type": "reference"
  },
  "order": 5,
  "question": "Šta ako dete propusti čas?"
}...
```


### franchiseField
**Count:** 24 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 21 total fields
**References:** 3 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-06T13:06:17Z",
  "_id": "SBvfECCtZ11PRIA8QdEqTj",
  "_rev": "SBvfECCtZ11PRIA8QdEqRe",
  "_type": "franchiseField",
  "_updatedAt": "2025-08-06T13:06:17Z",
  "fieldId": "telefon",
  "helpText": "Unesite broj mobilnog telefona",
  "isRequired": true,
  "label": "Broj telefona",
  "order": 3,
  "placeholder": "+381 XX XXX XXXX",
  "type": "tel",
  "width": "half"
}...
```


### testimonial
**Count:** 20 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 12 total fields
**References:** 3 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:48:10Z",
  "_id": "EIn1TO6kzkBkpMuRkFFeUO",
  "_rev": "rWY7A01dUL9wO4NRChI81U",
  "_type": "testimonial",
  "_updatedAt": "2025-08-05T20:15:58Z",
  "authorName": "Milica Stojanović",
  "authorRole": "Majka dvoje dece",
  "content": "Neverovatna promena kod moje dece! Marko sada obožava da čita, a Ana je postala prava matematička zvezda. Preporučujem svima!",
  "featured": true,
  "rating": 5
}...
```


### blogPost
**Count:** 17 documents
**Complexity:** CRITICAL
**Migration Risk:** HIGH

**Fields:** 24 total fields
**References:** 10 reference types
**Assets:** 0 asset fields

**Recommendations:**
- ⚠️ Complex structure - migrate in small batches
- ⚠️ Validate all nested objects after migration
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:48:03Z",
  "_id": "EIn1TO6kzkBkpMuRkFFe5f",
  "_rev": "RSzTvGgTwtY6EErbXk1MXi",
  "_type": "blogPost",
  "_updatedAt": "2025-08-05T20:18:01Z",
  "author": {
    "_ref": "EIn1TO6kzkBkpMuRkFFdgw"
  },
  "category": {
    "_ref": "EIn1TO6kzkBkpMuRkFFcmQ"
  },
  "content": [
    {
      "_type": "block",
      "children": [
        {
          "_type": "span",
          "text": "Brzočitanje nije samo o brzini - to je veština koja pomaže deci da bolje razumeju ono što...
```


### faqCategory
**Count:** 17 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 19 total fields
**References:** 4 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-05T03:10:04Z",
  "_id": "adpXclQvR9WWEgUkbtDqyC",
  "_rev": "adpXclQvR9WWEgUkbtDquN",
  "_type": "faqCategory",
  "_updatedAt": "2025-08-05T03:10:04Z",
  "description": "Edukacija i kontinuirana podrška",
  "name": "Obuka i podrška",
  "order": 3,
  "slug": {
    "_type": "slug",
    "current": "obuka-podrska"
  }
}...
```


### blogCategory
**Count:** 15 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 16 total fields
**References:** 4 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:47:54Z",
  "_id": "EIn1TO6kzkBkpMuRkFFcmQ",
  "_rev": "EIn1TO6kzkBkpMuRkFFcit",
  "_type": "blogCategory",
  "_updatedAt": "2025-08-03T01:47:54Z",
  "slug": {
    "current": "brzocitanje"
  },
  "title": "Brzočitanje"
}...
```


### calculatorResult
**Count:** 13 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 20 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T03:15:23Z",
  "_id": "EIn1TO6kzkBkpMuRkFfJpQ",
  "_rev": "EIn1TO6kzkBkpMuRkFfJlt",
  "_type": "calculatorResult",
  "_updatedAt": "2025-08-03T03:15:23Z",
  "email": "malisicnemanja@gmail.com",
  "inputs": {
    "model": "Professional",
    "squareMeters": 100
  },
  "leadScore": 70,
  "phone": "3333",
  "results": {
    "breakEvenMonths": 0,
    "breakdown": "{\"zones\":[{\"name\":\"Učionica za mentalne veštine\",\"area\":40,\"color\":\"#3b82f6\",\"description\":\"P...
```


### locationData
**Count:** 10 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 25 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-05T22:09:14Z",
  "_id": "RSzTvGgTwtY6EErbXkDn2n",
  "_rev": "RSzTvGgTwtY6EErbXkDmzO",
  "_type": "locationData",
  "_updatedAt": "2025-08-05T22:09:14Z",
  "centerCount": 2,
  "city": "Novi Sad",
  "contactInfo": {
    "address": "Dunavska 20, Novi Sad",
    "email": "novisad@srecno-ucenje.rs",
    "phone": "+381 21 123 4567"
  },
  "coordinates": {
    "lat": 45.2671,
    "lng": 19.8335
  },
  "demandLevel": "high",
  "description": "Univerzitetski grad sa rastućom mre...
```


### resource
**Count:** 10 documents
**Complexity:** LOW
**Migration Risk:** LOW

**Fields:** 18 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T02:50:37Z",
  "_id": "EIn1TO6kzkBkpMuRkFf93p",
  "_rev": "EIn1TO6kzkBkpMuRkFf90I",
  "_type": "resource",
  "_updatedAt": "2025-08-03T02:50:37Z",
  "category": "methodology",
  "description": "Detaljan pregled naše obrazovne metodologije sa primerima iz prakse.",
  "featured": true,
  "fileSize": 2.8,
  "pages": 32,
  "requiresLead": false,
  "resourceType": "pdf",
  "slug": {
    "current": "metodologija-srecno-ucenje-pregled"
  },
  "tags": [
    "metodologija",
 ...
```


### successStory
**Count:** 10 documents
**Complexity:** MEDIUM
**Migration Risk:** MEDIUM

**Fields:** 19 total fields
**References:** 6 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:48:11Z",
  "_id": "EIn1TO6kzkBkpMuRkFFf0B",
  "_rev": "rWY7A01dUL9wO4NRChI8my",
  "_type": "successStory",
  "_updatedAt": "2025-08-05T20:16:14Z",
  "afterSkills": [
    "Brzo čitanje - 500+ reči/minut",
    "Odlična koncentracija i fokus",
    "Efikasno učenje za kraće vreme",
    "... truncated"
  ],
  "age": "12 godina",
  "beforeSkills": [
    "Sporo čitanje - 150 reči/minut",
    "Poteškoće sa koncentracijom",
    "Dugotrajno učenje lekcija",
    "... trunca...
```


### book
**Count:** 9 documents
**Complexity:** CRITICAL
**Migration Risk:** HIGH

**Fields:** 50 total fields
**References:** 10 reference types
**Assets:** 2 asset fields

**Recommendations:**
- ⚠️ Complex structure - migrate in small batches
- ⚠️ Validate all nested objects after migration
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T11:23:04Z",
  "_id": "EIn1TO6kzkBkpMuRkFybRO",
  "_rev": "RSzTvGgTwtY6EErbXk1PYt",
  "_type": "book",
  "_updatedAt": "2025-08-05T20:18:21Z",
  "ageGroup": "6-10 godina",
  "colorTheme": "yellow",
  "coverImage": {
    "_type": "image",
    "alt": "Cover slika knjige Zimski mir",
    "asset": {
      "_ref": "image-1b4efadb340eee2e9b711b589b7c56993ca26572-4724x3248-webp",
      "_type": "reference"
    }
  },
  "description": "Zimski mir nastavlja priču o Luki koji ...
```


### booking
**Count:** 5 documents
**Complexity:** LOW
**Migration Risk:** LOW

**Fields:** 18 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T03:18:19Z",
  "_id": "EIn1TO6kzkBkpMuRkFfLQK",
  "_rev": "EIn1TO6kzkBkpMuRkFfLMn",
  "_type": "booking",
  "_updatedAt": "2025-08-03T03:18:19Z",
  "budget": "",
  "city": "Beograd",
  "consultationType": "location",
  "email": "nemanja.malisic@intelisale.com",
  "experience": "",
  "leadScore": 50,
  "message": "",
  "name": "Nemanja Malisic",
  "phone": "063683047",
  "preferredDate": "2025-08-07",
  "preferredTime": "12:00"
}...
```


### page
**Count:** 5 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 31 total fields
**References:** 4 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-05T22:44:24Z",
  "_id": "books-page",
  "_rev": "RSzTvGgTwtY6EErbXkEefk",
  "_type": "page",
  "_updatedAt": "2025-08-05T22:44:24Z",
  "features": [
    {
      "color": "text-yellow-600",
      "description": "Vila Bosiljčica vodi decu kroz čarobni svet jeseni",
      "icon": "🍂",
      "title": "Jesenja gozba"
    },
    {
      "color": "text-blue-600",
      "description": "Vila Božica otkriva lepote zime i unutrašnji mir",
      "icon": "❄️",
      "title": "Zims...
```


### aboutAuthor
**Count:** 4 documents
**Complexity:** CRITICAL
**Migration Risk:** HIGH

**Fields:** 54 total fields
**References:** 10 reference types
**Assets:** 2 asset fields

**Recommendations:**
- ⚠️ Complex structure - migrate in small batches
- ⚠️ Validate all nested objects after migration
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T11:00:58Z",
  "_id": "EIn1TO6kzkBkpMuRkFy78E",
  "_rev": "EIn1TO6kzkBkpMuRkFyync",
  "_type": "aboutAuthor",
  "_updatedAt": "2025-08-03T11:37:58Z",
  "achievements": [
    {
      "color": "#3498DB",
      "description": "Međunarodno priznanje za inovativnost u obrazovanju i doprinos metodologiji učenja",
      "icon": "globe",
      "title": "Global Teacher Prize",
      "year": "2024"
    },
    {
      "color": "#E74C3C",
      "description": "Najviše priznanje ...
```


### author
**Count:** 4 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 18 total fields
**References:** 3 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:48:00Z",
  "_id": "EIn1TO6kzkBkpMuRkFFdgw",
  "_rev": "EIn1TO6kzkBkpMuRkFFddP",
  "_type": "author",
  "_updatedAt": "2025-08-03T01:48:00Z",
  "bio": "Doktor pedagoških nauka sa 15 godina iskustva u radu sa decom. Autor nekoliko knjiga o modernim metodama učenja.",
  "name": "Dr. Milica Jovanović",
  "slug": {
    "current": "dr-milica-jovanovic"
  },
  "title": "Stručnjak za brzočitanje"
}...
```


### franchiseSection
**Count:** 4 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 28 total fields
**References:** 4 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-06T13:21:21Z",
  "_id": "SBvfECCtZ11PRIA8QdOXJb",
  "_rev": "SBvfECCtZ11PRIA8QdOXHW",
  "_type": "franchiseSection",
  "_updatedAt": "2025-08-06T13:21:21Z",
  "description": "Ovde želimo da čujemo Vašu priču - šta Vas motiviše, kakvi su Vaši planovi i kako vidite sebe u ulozi franšiize Srećno učenje.",
  "fields": [
    {
      "_ref": "tqJG5yH49IKSFNIKiLWB8B",
      "_type": "reference"
    },
    {
      "_ref": "tqJG5yH49IKSFNIKiLWBDV",
      "_type": "reference"
  ...
```


### navigation
**Count:** 3 documents
**Complexity:** LOW
**Migration Risk:** LOW

**Fields:** 24 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-07T19:25:56Z",
  "_id": "drafts.navigation",
  "_rev": "4b77c25f-cb7c-4ec8-84a2-7aea38c081af",
  "_system": {
    "base": {
      "id": "navigation",
      "rev": "YBiWwTMhT8IS37yZZlnEws"
    }
  },
  "_type": "navigation",
  "_updatedAt": "2025-08-07T19:28:33Z",
  "ctaButton": {
    "href": "https://iskrarakija.rs/rakija-po-izboru-casa-iskra-pljoska",
    "style": "primary",
    "text": "Neko CTA dugme"
  },
  "mainMenu": [
    {
      "_key": "9cdfdde9d729",
      "l...
```


### program
**Count:** 3 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 23 total fields
**References:** 3 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:47:46Z",
  "_id": "EIn1TO6kzkBkpMuRkFFcD6",
  "_rev": "RSzTvGgTwtY6EErbXk12tM",
  "_type": "program",
  "_updatedAt": "2025-08-05T20:16:11Z",
  "ageGroup": "5-14 godina",
  "benefits": [
    "Brže mentalno računanje",
    "Razvoj oba hemisfera mozga",
    "Poboljšana memorija",
    "... truncated"
  ],
  "description": "Naučite da računate brže od kalkulatora koristeći moć vizualizacije",
  "duration": "12 meseci",
  "groupSize": "6-8 učenika",
  "icon": "calcula...
```


### siteSettings
**Count:** 3 documents
**Complexity:** MEDIUM
**Migration Risk:** CRITICAL

**Fields:** 55 total fields
**References:** 4 reference types
**Assets:** 1 asset fields

**Recommendations:**
- 🚨 CRITICAL: Test migration extensively before production
- 🚨 CRITICAL: Create additional backups before migration
- 🚨 CRITICAL: Have rollback plan ready
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T01:47:44Z",
  "_id": "hZm6tMI3obk6ZBXKfA9s2t",
  "_rev": "SVDvN8W2oCA8eZWngS3UQR",
  "_system": {
    "base": {
      "id": "hZm6tMI3obk6ZBXKfA9s2t",
      "rev": "hZm6tMI3obk6ZBXKfA9rzt"
    }
  },
  "_type": "siteSettings",
  "_updatedAt": "2025-08-05T22:24:52Z",
  "address": "Bulevar oslobođenja 123, 21000 Novi Sad",
  "email": "info@srecno-ucenje.rs",
  "logo": {
    "_type": "image",
    "asset": {
      "_ref": "image-3fa0a24118b1ece64de4f8be3a8b38686a188276-1...
```


### booksLanding
**Count:** 2 documents
**Complexity:** HIGH
**Migration Risk:** HIGH

**Fields:** 57 total fields
**References:** 7 reference types
**Assets:** 1 asset fields

**Recommendations:**
- ⚠️ Complex structure - migrate in small batches
- ⚠️ Validate all nested objects after migration
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-07T20:12:53Z",
  "_id": "booksLanding",
  "_rev": "oWtMwMRBoarauLfrKjVkEJ",
  "_type": "booksLanding",
  "_updatedAt": "2025-08-07T20:16:16Z",
  "authorSection": {
    "ctaText": "Saznajte više o autorki",
    "description": [
      {
        "_key": "acddf350c4af",
        "_type": "block",
        "children": [
          {
            "_key": "64abdf066bd0",
            "_type": "span",
            "marks": [],
            "text": "Učiteljica, spisateljica i kreatork...
```


### calculatorSettings
**Count:** 2 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 34 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T02:23:16Z",
  "_id": "EIn1TO6kzkBkpMuRkFHzTz",
  "_rev": "EIn1TO6kzkBkpMuRkFHzQS",
  "_type": "calculatorSettings",
  "_updatedAt": "2025-08-03T02:23:16Z",
  "cities": [
    {
      "demandLevel": "high",
      "name": "Beograd",
      "priceMultiplier": 1.2
    },
    {
      "demandLevel": "high",
      "name": "Novi Sad",
      "priceMultiplier": 1
    },
    {
      "demandLevel": "medium",
      "name": "Niš",
      "priceMultiplier": 0.9
    },
    "... trunca...
```


### franchiseApplication
**Count:** 2 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 31 total fields
**References:** 4 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-06T13:21:23Z",
  "_id": "SBvfECCtZ11PRIA8QdOXRv",
  "_rev": "SBvfECCtZ11PRIA8QdOXPq",
  "_type": "franchiseApplication",
  "_updatedAt": "2025-08-06T13:21:23Z",
  "description": "Pridružite se mreži od preko 450 edukatora širom Srbije i pokrenite uspešan edukacioni biznis uz našu podršku.",
  "formSettings": {
    "privacyNote": "Vaši podaci su bezbedni i neće biti prosleđivani trećim licima. Koristićemo ih isključivo za proces prijave za franšizu.",
    "requiredField...
```


### franchiseMotivational
**Count:** 2 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 45 total fields
**References:** 3 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-06T13:06:30Z",
  "_id": "SBvfECCtZ11PRIA8QdEr11",
  "_rev": "SBvfECCtZ11PRIA8QdEqyw",
  "_type": "franchiseMotivational",
  "_updatedAt": "2025-08-06T13:06:30Z",
  "benefits": [
    {
      "description": "Kompletna obuka za metodologiju, upravljanje biznisom i rad sa roditeljima",
      "icon": "education",
      "title": "Sveobuhvatna obuka"
    },
    {
      "description": "Готови marketinški materijali, web prezentacija i društvene mreže",
      "icon": "marketing...
```


### methodology
**Count:** 2 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 45 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T04:31:42Z",
  "_id": "hWo33GCGxd3rDeD5TjTsuH",
  "_rev": "hWo33GCGxd3rDeD5TjTspX",
  "_type": "methodology",
  "_updatedAt": "2025-08-03T04:31:42Z",
  "comparison": {
    "description": "Vidite zašto je naša metodologija superiorna",
    "items": [
      {
        "aspect": "Brzina učenja",
        "ourMethod": "5x brže uz bolje razumevanje",
        "traditional": "Sporo, linealno učenje"
      },
      {
        "aspect": "Motivacija dece",
        "ourMethod": "P...
```


### bookingPage
**Count:** 1 documents
**Complexity:** MEDIUM
**Migration Risk:** LOW

**Fields:** 52 total fields
**References:** 2 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-05T21:34:37Z",
  "_id": "booking-page",
  "_rev": "rWY7A01dUL9wO4NRChMkqC",
  "_type": "bookingPage",
  "_updatedAt": "2025-08-05T21:34:37Z",
  "calendly": {
    "hideGdprBanner": false,
    "prefillEmail": true,
    "prefillName": true,
    "url": "https://calendly.com/srecno-ucenje/konsultacija"
  },
  "faqSection": {
    "ctaLink": "/faq",
    "ctaText": "Pogledajte sva pitanja",
    "subtitle": "Pronađite odgovore na najčešća pitanja",
    "title": "Imate pitanja?"...
```


### franchiseSteps
**Count:** 1 documents
**Complexity:** LOW
**Migration Risk:** LOW

**Fields:** 12 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-07T20:36:19Z",
  "_id": "drafts.8cfac59a-3083-47fa-afb1-23df17c5dbc0",
  "_rev": "a053e711-99fe-4565-b6ee-88aacf89d83c",
  "_type": "franchiseSteps",
  "_updatedAt": "2025-08-07T20:36:19Z",
  "actionButton": {
    "style": "primary"
  },
  "color": "green",
  "isActive": true,
  "title": "a"
}...
```


### homePage
**Count:** 1 documents
**Complexity:** HIGH
**Migration Risk:** CRITICAL

**Fields:** 149 total fields
**References:** 6 reference types
**Assets:** 0 asset fields

**Recommendations:**
- 🚨 CRITICAL: Test migration extensively before production
- 🚨 CRITICAL: Create additional backups before migration
- 🚨 CRITICAL: Have rollback plan ready
- ⚠️ Complex structure - migrate in small batches
- ⚠️ Validate all nested objects after migration
- 🔗 Many references - ensure all referenced documents exist first
- 🔗 Consider migrating referenced types before this one

**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-04T21:15:48Z",
  "_id": "homePage",
  "_rev": "YBiWwTMhT8IS37yZZlpaYA",
  "_system": {
    "base": {
      "id": "homePage",
      "rev": "atDdCAAfWCLcotj1z8G3eZ"
    }
  },
  "_type": "homePage",
  "_updatedAt": "2025-08-07T20:05:34Z",
  "differentiators": {
    "items": [
      {
        "_key": "fbf3fa34-31f2-47ba-8310-4059bb2c94f0",
        "description": "Naša jedinstvena metodologija razvijena je kroz 15 godina rada sa decom i zasnovana je na najnovijim pedagoški...
```


### newsletterSubscriber
**Count:** 1 documents
**Complexity:** LOW
**Migration Risk:** LOW

**Fields:** 12 total fields
**References:** 1 reference types
**Assets:** 0 asset fields

**Recommendations:**


**Sample Document Structure:**
```json
{
  "_createdAt": "2025-08-03T03:16:55Z",
  "_id": "EIn1TO6kzkBkpMuRkFfKZL",
  "_rev": "EIn1TO6kzkBkpMuRkFfKVo",
  "_type": "newsletterSubscriber",
  "_updatedAt": "2025-08-03T03:16:55Z",
  "email": "malisicnemanja@gmail.com",
  "name": "zxzx",
  "phone": "czxcz",
  "source": "resource_template-biznis-plana",
  "subscribedAt": "2025-08-03T03:16:55.542Z"
}...
```


---
*Generated by Sanity Content Analyzer*
*Export Directory: /Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z*