# Sanity CMS Content Cleanup Report

Generated on: **August 7, 2025**

## Overview

This report analyzes the migrated Sanity CMS content and provides a comprehensive cleanup plan to eliminate duplicates, remove unnecessary data, and standardize naming conventions.

## Summary Statistics

| Category | Total Items | Duplicates Found | Items to Delete |
|----------|-------------|------------------|-----------------|
| FAQ Categories | 17 | 5 sets | 6 items |
| FAQ Items | 55 | 13 duplicate questions | 13 items |
| Calculator Results | 13 | N/A (all temporary) | 13 items |
| Franchise Fields | 24 | 12 duplicate fields | 12 items |
| About Authors | 4 | 1 duplicate author | 2 items |
| Location Data | 10 | N/A | 0 items (rename only) |
| Testimonials | 20 | N/A | 0 items (review needed) |

**Total Items to Delete: 46**
**Total Items to Rename: 10**

---

## 🗑️ Items Marked for Deletion

### FAQ Categories (6 duplicates)
- **"Obuka i podrška"** - 3 duplicates found, keeping the oldest
- **"Finansijska pitanja"** - 2 duplicates found
- **"Opšta pitanja o franšizi"** - 2 duplicates found  
- **"Operativna pitanja"** - 2 duplicates found
- **"Opšta pitanja"** - 2 duplicates found

### FAQ Items (13 duplicates)
Duplicate questions found:
- "Koje su mesečne obaveze prema franšizeru?" (2 copies)
- "Kolika je početna investicija?" (2 copies)
- "Koliko dugo traje program brzočitanja?" (2 copies)
- "Šta je Srećno učenje?" (2 copies)
- "Od koje godine dete može da krene sa mentalnom aritmetikom?" (2 copies)
- "Da li postoji probni čas?" (2 copies)
- "Koliko traje obuka?" (2 copies)
- "Koje programe nudimo?" (2 copies)
- "Kakva je podrška nakon otvaranja?" (2 copies)
- "Da li postoje opcije finansiranja?" (2 copies)
- "Koliko zaposlenih je potrebno?" (2 copies)
- "Koje su prednosti franšize u odnosu na samostalni biznis?" (2 copies)
- "Ko može postati franšizer?" (2 copies)

### Calculator Results (13 items - ALL)
All calculator results are temporary data and should be deleted:
- Various investment calculations
- ROI calculations 
- Space planning calculations

### Franchise Fields (12 duplicates)
Complete duplicate fields found for franchise application form:
- telefon (phone)
- zanimanje (occupation)
- motivacija_razlog (motivation)
- iskustvo_edukacija (education experience)
- email
- iskustvo (work experience)
- budjet (budget)
- obrazovanje (education level)
- ime_prezime (full name)
- lokacija (location)
- ciljevi_godina (yearly goals)
- dostupno_vreme (available time)

### About Authors (2 duplicates)
**"Željana Radojičić Lukić"** has 3 entries:
- Keep: `EIn1TO6kzkBkpMuRkFy78E` (most complete with achievements and timeline)
- Delete: `aboutAuthor` and `drafts.EIn1TO6kzkBkpMuRkFy78E`

---

## 🔄 Items to Rename (Schools → Centres)

### Location Data (10 items)
Rename field `centerCount` to `centreCount` for British spelling consistency:

| City | Current Status | Current Centers | Action |
|------|----------------|-----------------|---------|
| Beograd | active | 3 | Rename field |
| Novi Sad | active | 2 | Rename field |
| Niš | active | 1 | Rename field |
| Kragujevac | active | 1 | Rename field |
| Subotica | coming-soon | 1 | Rename field |
| Pančevo | active | 1 | Rename field |
| Zrenjanin | coming-soon | 1 | Rename field |
| Valjevo | planned | 0 | Rename field |
| Čačak | planned | 0 | Rename field |
| Smederevo | planned | 0 | Rename field |

---

## 📊 Testimonials Analysis

### Franchise-Related Testimonials (KEEP - 11 items)
These testimonials are directly relevant to franchise business:

| Author | Role | Revenue | ROI | ID |
|--------|------|---------|-----|-----|
| Marija Petrović | Vlasnica franšize | €4,500 | 320% | adpXclQvR9WWEgUkbtDlbd |
| Stefan Jovanović | Direktor centra | €3,800 | 280% | jsO7i4LmwGEnLQvVmoJo7P |
| Ana Nikolić | Osnivačica centra | €2,900 | 190% | jsO7i4LmwGEnLQvVmoJoRF |
| Miloš Stojanović | Partner franšize | €2,100 | 165% | jsO7i4LmwGEnLQvVmoJol5 |
| Jovana Đorđević | Vlasnica centra | €1,800 | 85% | atDdCAAfWCLcotj1z9HJRX |
| Stefan Marković | Franšizer iz Niša | - | - | Multiple entries |
| Marko Petrović | Vlasnik franšize | - | - | testimonial-3 |
| Ana Miletić | Vlasnica franšize | - | - | testimonial-5 |
| Petar Nikolić | Otac | - | - | EIn1TO6kzkBkpMuRkFFepa |

### Parent/Other Testimonials (REVIEW - 9 items)
These may not be relevant for franchise-focused site:
- Parent testimonials about children's progress
- Student testimonials
- Professional educator testimonials

**Recommendation**: Keep only franchise-related testimonials that show business success.

---

## 🎯 Recommended Actions

### Immediate Actions (High Priority)
1. **Delete all calculator results** - These are temporary data
2. **Delete duplicate franchise fields** - Clean up form builder
3. **Delete duplicate FAQ categories and items** - Avoid confusion
4. **Delete duplicate about author entries** - Keep only the complete one

### Content Review Actions (Medium Priority)
1. **Review testimonials** - Keep only franchise-focused ones
2. **Rename "schools" to "centres"** - For consistency and branding
3. **Consolidate "How to Join" pages** - Should be only one

### Quality Assurance (Low Priority)
1. **Verify FAQ category assignments** - Ensure remaining FAQs are properly categorized
2. **Review franchise field structure** - Ensure form flow is logical
3. **Check location data completeness** - Verify all locations have proper contact info

---

## 🛠️ Implementation Plan

### Phase 1: Data Cleanup (Estimated: 2 hours)
- Run the generated `cleanup-script.js` to delete duplicates
- Verify deletions in Sanity Studio
- Test that no references are broken

### Phase 2: Content Consolidation (Estimated: 1 hour)  
- Review and merge any remaining duplicate content
- Ensure FAQ categories have proper descriptions
- Verify testimonials are franchise-focused

### Phase 3: Rename Operations (Estimated: 30 minutes)
- Update "centerCount" to "centreCount" in location documents
- Update any schema references from "schools" to "centres"
- Update UI text accordingly

### Phase 4: Quality Check (Estimated: 30 minutes)
- Verify all FAQ categories have questions assigned
- Check that franchise form has no missing fields
- Ensure location data is complete

---

## ⚠️ Important Notes

1. **Always backup before running cleanup** - Test on development environment first
2. **Check for broken references** - Some deleted items might be referenced elsewhere
3. **Update schema if needed** - Renaming might require schema updates
4. **Communicate changes** - Inform content editors about the cleanup

---

## 📁 Generated Files

- `cleanup-script.js` - Executable script for deletions
- `sanity-content-analysis.js` - Analysis script (reusable)
- `CLEANUP_REPORT.md` - This comprehensive report

---

*This report was generated automatically by analyzing the Sanity CMS backup data. Review carefully before implementing changes.*