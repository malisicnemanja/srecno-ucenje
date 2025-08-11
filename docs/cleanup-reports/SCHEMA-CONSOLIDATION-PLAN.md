# SANITY SCHEMA CONSOLIDATION PLAN

## 🚨 CRITICAL MIGRATION: 81 → 18 Schemas

**Date**: 2025-08-07  
**Status**: Ready for execution  
**Risk Level**: HIGH (Major structural change)

## Executive Summary

This document outlines the complete migration strategy for consolidating Sanity CMS schemas from **81 schemas to 18 schemas** (77% reduction) while preserving ALL existing content and functionality.

### Migration Statistics
- **Current Schemas**: 81
- **Target Schemas**: 18  
- **Reduction**: 81 → 18 (78% reduction)
- **Orphaned Schemas**: 4
- **Potential Data Loss Risks**: 1

## 📋 Target Schema Architecture

### Core System (4 schemas)

#### Site Settings (`siteSettings`)
All site-wide settings, notifications, and configurations

**Consolidates**: siteSettings, modernSiteSettings, notificationBar  
**Found Schemas**: 3/3  
**Estimated Fields**: 27  
**Complexity**: 27

#### Navigation (`navigation`)
All navigation menus and links

**Consolidates**: navigation, modernNavigation, navigationSettings  
**Found Schemas**: 3/3  
**Estimated Fields**: 25  
**Complexity**: 25

#### Pages (`page`)
All static pages including home, legal, error pages

**Consolidates**: page, modernPage, homePage, legalPage, errorPage, bookingPage  
**Found Schemas**: 6/6  
**Estimated Fields**: 35  
**Complexity**: 35

#### Page Builder Components (`pageBuilder`)
All page building blocks and sections

**Consolidates**: pageBuilder, pageSection, hero, modernHero, enhancedHero, cta, videoBackground  
**Found Schemas**: 7/7  
**Estimated Fields**: 43  
**Complexity**: 43


### Franchise System (4 schemas)

#### Franchise Management (`franchise`)
All franchise-related pages and packages

**Consolidates**: franchisePackage, modernFranchisePackage, franchiseModelsPage, howToJoinPage, franchiseApplicationPage, financialCalculatorPage, schoolsPage  
**Found Schemas**: 7/7  
**Estimated Fields**: 73  
**Complexity**: 73

#### Franchise Applications (`franchiseApplication`)
All franchise application forms and submissions

**Consolidates**: franchiseApplication, franchiseApplicationSubmission, franchiseField, enhancedFranchiseField, franchiseSection, franchiseMotivational, franchiseSteps, franchiseProcess  
**Found Schemas**: 8/8  
**Estimated Fields**: 41  
**Complexity**: 41

#### Schools & Locations (`school`)
All school locations and franchise sites

**Consolidates**: school, location, locationData, modernFranchiseLocation  
**Found Schemas**: 4/4  
**Estimated Fields**: 36  
**Complexity**: 36

#### Financial Calculator (`calculator`)
Financial calculator system for franchise ROI

**Consolidates**: calculatorSettings, calculatorResult  
**Found Schemas**: 2/2  
**Estimated Fields**: 10  
**Complexity**: 10


### Content System (4 schemas)

#### Blog System (`blog`)
Blog posts and categories

**Consolidates**: blogPost, blogCategory  
**Found Schemas**: 2/2  
**Estimated Fields**: 3  
**Complexity**: 3

#### Books & Publications (`book`)
Books, publications, and book landing pages

**Consolidates**: book, booksLanding, publications  
**Found Schemas**: 3/3  
**Estimated Fields**: 14  
**Complexity**: 14

#### Educational Programs (`program`)
All educational content and programs

**Consolidates**: program, trainingProgram, methodology, virtualClassroom, resource  
**Found Schemas**: 5/5  
**Estimated Fields**: 29  
**Complexity**: 29

#### Quizzes & Interactive Content (`quiz`)
Interactive quizzes and results

**Consolidates**: quiz, quizResult  
**Found Schemas**: 2/2  
**Estimated Fields**: 7  
**Complexity**: 7


### People System (2 schemas)

#### Author & Team (`author`)
Author information, achievements, and team members

**Consolidates**: author, aboutAuthor, authorTimeline, authorAchievements, teamMember  
**Found Schemas**: 5/5  
**Estimated Fields**: 14  
**Complexity**: 14

#### Testimonials & Stories (`testimonial`)
All testimonials, success stories, and experiences

**Consolidates**: testimonial, modernTestimonial, successStory, experience  
**Found Schemas**: 4/4  
**Estimated Fields**: 20  
**Complexity**: 20


### Support System (2 schemas)

#### FAQ System (`faq`)
FAQ system with categories

**Consolidates**: faq, faqCategory, modernFranchiseFAQ  
**Found Schemas**: 3/3  
**Estimated Fields**: 5  
**Complexity**: 5

#### Bookings & Subscribers (`booking`)
Booking system and newsletter subscriptions

**Consolidates**: booking, newsletterSubscriber  
**Found Schemas**: 2/2  
**Estimated Fields**: 2  
**Complexity**: 2


### UI Components (2 schemas)

#### UI Components (`uiComponent`)
All reusable UI components and building blocks

**Consolidates**: button, feature, statistic, pricingPlan, modernPricingPlan, trustBadge, differentiator, franchiseStep, franchiseModel, leadMagnet, blockContent, seo  
**Found Schemas**: 12/12  
**Estimated Fields**: 26  
**Complexity**: 26


## ⚠️ Risk Analysis

### Orphaned Schemas (4)
These schemas are not included in any consolidation and may contain important data:


- **author** (`documents/author.ts`)
  - Type: document
  - Complexity: 2
  - Size: 1591 bytes

- **franchiseApplication** (`franchise-application.ts`)
  - Type: document
  - Complexity: 3
  - Size: 2945 bytes

- **franchiseModel** (`objects/franchiseModel.ts`)
  - Type: object
  - Complexity: 1
  - Size: 1046 bytes

- **franchiseStep** (`objects/franchiseStep.ts`)
  - Type: object
  - Complexity: 1
  - Size: 1251 bytes



**Action Required**: Review each orphaned schema and either:
1. Add to appropriate consolidation group
2. Create new consolidated schema if content is critical
3. Export data for manual preservation if schema is obsolete


### Potential Data Loss Risks (1)
High-complexity document schemas not accounted for:


- **franchiseApplication** (`franchise-application.ts`)
  - Complexity: 3 (HIGH)
  - **CRITICAL**: Manual review required


## 🔄 Migration Process

### Prerequisites
- [x] Complete backup created (Git branch + data export)
- [x] Migration scripts generated
- [ ] Development environment testing
- [ ] Stakeholder approval

### Phase-by-Phase Execution


#### Phase 1: Preparation Phase
**Risk**: LOW | **Estimated Time**: 2-3 hours

Prepare for migration without affecting production

**Tasks**:
- [ ] Create development branch for migration work
- [ ] Backup all current data (already done)
- [ ] Set up parallel schema structure
- [ ] Create migration scripts for each consolidation

#### Phase 2: Schema Creation Phase
**Risk**: MEDIUM | **Estimated Time**: 4-6 hours

Create new consolidated schemas

**Tasks**:
- [ ] Create 18 new consolidated schema files
- [ ] Merge field definitions from source schemas
- [ ] Preserve all validation rules and constraints
- [ ] Test schema compilation

#### Phase 3: Data Migration Phase
**Risk**: HIGH | **Estimated Time**: 3-4 hours

Migrate existing content to new structure

**Tasks**:
- [ ] Export all existing documents by type
- [ ] Transform data to match new schema structure
- [ ] Import data into consolidated schemas
- [ ] Verify all content is preserved

#### Phase 4: Validation Phase
**Risk**: MEDIUM | **Estimated Time**: 2-3 hours

Ensure everything works correctly

**Tasks**:
- [ ] Test all admin interfaces
- [ ] Verify all queries still work
- [ ] Check all frontend integrations
- [ ] Performance testing

#### Phase 5: Cleanup Phase
**Risk**: LOW | **Estimated Time**: 1-2 hours

Remove old schemas and clean up

**Tasks**:
- [ ] Remove old schema files
- [ ] Update all import statements
- [ ] Clean up unused types
- [ ] Update documentation


## 🛡️ Rollback Plan

### Emergency Rollback
If migration fails or causes data loss:

1. **Immediate Action**:
   ```bash
   git checkout backup-before-schema-consolidation-2025-08-07
   git checkout -b emergency-rollback
   ```

2. **Data Restoration**:
   ```bash
   npx sanity dataset import backups/sanity-backup-2025-08-07/sanity-data.ndjson production --replace
   ```

3. **Schema Restoration**:
   ```bash
   cp -r backups/sanity-backup-2025-08-07/schemas/* sanity/schemas/
   ```

### Verification Steps
After rollback, verify:
- [ ] All pages load correctly
- [ ] Admin interface functions
- [ ] All document types accessible
- [ ] Content displays properly

## 📊 Success Metrics

### Pre-Migration Checklist
- [ ] Backup verified and tested
- [ ] Migration scripts reviewed
- [ ] Test environment prepared
- [ ] Team notified of maintenance window
- [ ] Rollback plan confirmed

### Post-Migration Verification
- [ ] All 18 schemas compile correctly
- [ ] All existing content preserved
- [ ] Admin interface functions properly
- [ ] Frontend displays all content
- [ ] Performance improved (fewer schemas)
- [ ] All queries still work

## 🚦 Go/No-Go Decision Criteria

### GREEN LIGHT ✅
- All backups verified
- No critical orphaned schemas
- Migration scripts tested
- Team available for monitoring
- Rollback plan confirmed

### RED LIGHT ❌
- Backup verification fails
- Critical orphaned schemas found
- Migration scripts have errors
- Limited team availability
- Unclear rollback procedure

## 📞 Emergency Contacts

- **Technical Lead**: [CONTACT INFO]
- **Sanity Admin**: [CONTACT INFO]
- **Business Owner**: [CONTACT INFO]

## 📝 Migration Log

| Phase | Status | Started | Completed | Notes |
|-------|--------|---------|-----------|-------|
| 1. Preparation | ⏳ Pending | | | |
| 2. Schema Creation | ⏳ Pending | | | |
| 3. Data Migration | ⏳ Pending | | | |
| 4. Validation | ⏳ Pending | | | |
| 5. Cleanup | ⏳ Pending | | | |

---

**⚠️ IMPORTANT**: Do not proceed with migration until all orphaned schemas are reviewed and accounted for. Content preservation is the highest priority.

**📅 Next Steps**:
1. Review and approve this migration plan
2. Address all orphaned schemas  
3. Test migration scripts in development
4. Schedule maintenance window
5. Execute migration with full team support

---
*Generated by Sanity Migration Analysis Tool*  
*Backup Reference: backup-before-schema-consolidation-2025-08-07*
