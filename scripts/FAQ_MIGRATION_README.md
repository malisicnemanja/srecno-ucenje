# FAQ Migration Fix

This script fixes the FAQ migration issue where 55 FAQ documents failed because they reference "faq-category-general" which doesn't exist.

## Problem
- 55 FAQ documents failed to migrate
- They reference "faq-category-general" (with dashes)
- But the actual category ID is "faqCategory.general" (with dots)
- All original data is safely backed up

## Solution
The script will:
1. **Create FAQ categories first** - ensures all categories exist before FAQs try to reference them
2. **Handle ID mapping** - maps problematic references like "faq-category-general" to correct ones
3. **Migrate FAQs safely** - creates FAQs with correct category references
4. **Ensure NO data loss** - all original data is preserved

## Quick Start

### 1. Set up Sanity API Token
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_SANITY_WRITE_TOKEN=your_sanity_write_token_here
```

Get a token from: https://sanity.io/manage
- Go to your project
- API tab  
- Tokens section
- Create new token with "Editor" permissions

### 2. Run the Migration
```bash
# Run the full migration
npm run fix-faq-migration

# Or validate existing data
npm run validate-faq

# Or run with explicit command
npx tsx scripts/fix-faq-migration.ts migrate
```

### 3. Check Results
The script will:
- Show progress in real-time
- Save detailed results to `FAQ_MIGRATION_FIX_RESULTS.json`
- Validate the migration automatically
- Show a summary of what was migrated

## What the Script Does

### Step 1: Load Backup Data
- Loads FAQ categories from `faqCategory.json`
- Loads FAQ documents from `faq.json`
- Shows count of items to migrate

### Step 2: Create Categories First
- Prepares all FAQ categories
- Creates missing categories for broken references
- Uses batch processing to avoid overwhelming Sanity

### Step 3: Create FAQs with Fixed References
- Maps problematic category references to correct ones:
  - `faq-category-general` → `faqCategory.general`
  - `faq-category-programs` → `faqCategory.programs`
  - etc.
- Creates FAQs with valid category references

### Step 4: Validation
- Checks that all categories exist
- Verifies all FAQs have valid category references
- Reports any orphaned FAQs

## Expected Results
✅ **Success Case:**
- All 17 FAQ categories created
- All 55 FAQs created with valid references
- Zero orphaned FAQs
- Complete migration

## Troubleshooting

### "Missing Sanity API token"
Make sure you have the token in `.env.local`:
```bash
NEXT_PUBLIC_SANITY_WRITE_TOKEN=your_token_here
```

### "Failed to create category/FAQ"
- Check your token has write permissions
- Verify project ID is correct
- Check network connection

### "Still have orphaned FAQs"
- Run the validation: `npm run validate-faq`
- Check the detailed results file
- Some references might need manual fixing

## Files Created
- `FAQ_MIGRATION_FIX_RESULTS.json` - Detailed migration results
- All original backup data remains unchanged

## Safety Features
- Uses `createOrReplace` - safe for existing documents
- Batch processing - gentle on Sanity API
- Detailed logging - see exactly what happens
- Complete error handling - failures don't stop the whole process
- Validation step - confirms everything worked

## Original Data
All original data is safe in:
```
sanity-exports/backup-2025-08-07T21-59-23-965Z/
├── faqCategory.json (17 categories)
├── faq.json (55 FAQs)
└── ... (other data)
```

Nothing is deleted or modified - only created/updated in Sanity.