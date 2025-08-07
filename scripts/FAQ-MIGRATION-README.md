# FAQ Data Structure Migration

This directory contains scripts to migrate FAQ data from inline objects to proper document references in Sanity CMS.

## Problem

The original implementation had FAQ data stored as inline objects within homepage documents instead of using proper document references. This made it difficult to:
- Manage FAQ content centrally
- Reuse FAQ items across different pages
- Maintain proper relationships with categories
- Scale the FAQ system

## Solution

The migration scripts convert inline FAQ data to proper Sanity documents with references:

```
Before:
homeFaqs: {
  faqs: [
    {
      question: "What is...",
      answer: "...",
      category: "general"
    }
  ]
}

After:
homeFaqs: {
  faqs: [
    {
      _type: "reference",
      _ref: "faq.what-is..."
    }
  ]
}
```

## Scripts

### 1. `migrate-faq-data.ts`
**Main migration script** - Converts inline FAQ data to proper document references.

**Usage:**
```bash
npm run migrate-faq
```

**What it does:**
- ✅ Fetches all homePage documents with FAQ data
- ✅ Extracts inline FAQ data (question, answer, category)
- ✅ Creates proper FAQ documents if they don't exist
- ✅ Creates FAQ categories if they don't exist
- ✅ Updates homePage to use references to these FAQ documents
- ✅ Safe to run multiple times

### 2. `verify-faq-migration.ts`
**Verification script** - Checks that migration was successful.

**Usage:**
```bash
npm run verify-faq
```

**What it checks:**
- ✅ All FAQ references are valid
- ✅ No inline FAQ data remains
- ✅ FAQ categories exist and are properly referenced
- ✅ Displays comprehensive migration summary

### 3. `fix-orphaned-faqs.ts`
**Fix orphaned FAQs** - Assigns proper categories to FAQs with invalid references.

**Usage:**
```bash
npm run fix-orphaned-faqs
```

**What it does:**
- ✅ Finds FAQs with missing or invalid category references
- ✅ Assigns them to appropriate categories based on content analysis
- ✅ Ensures all FAQs have valid category references

## Migration Process

Run the scripts in this order:

```bash
# 1. Run the main migration
npm run migrate-faq

# 2. Fix any orphaned FAQs
npm run fix-orphaned-faqs

# 3. Verify everything is working
npm run verify-faq
```

## Default Categories

The migration creates these default FAQ categories:

- **Opšta pitanja** (`general`) - General questions
- **Programi** (`programs`) - Questions about educational programs  
- **Franšiza** (`franchise`) - Business and franchise questions
- **Tehnička podrška** (`technical`) - Technical support questions

## Schema Structure

### FAQ Document
```typescript
{
  _type: "faq",
  _id: "faq.unique-slug",
  question: string,
  answer: string,
  category: {
    _type: "reference",
    _ref: "faqCategory.slug"
  },
  order?: number
}
```

### FAQ Category Document
```typescript
{
  _type: "faqCategory",
  _id: "faqCategory.slug",
  name: string,
  slug: string,
  description?: string,
  icon?: string,
  color?: string,
  order?: number,
  isActive?: boolean
}
```

## Safety Features

All scripts include:
- ✅ Environment validation
- ✅ Connection testing
- ✅ Error handling and rollback safety
- ✅ Comprehensive logging
- ✅ Idempotent operations (safe to run multiple times)
- ✅ Data validation

## Environment Variables

Required environment variables:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

## Troubleshooting

### Common Issues

1. **Missing environment variables**
   - Ensure all required env vars are set in `.env.local`

2. **Permission errors**
   - Verify your SANITY_API_TOKEN has write permissions

3. **Connection failures**
   - Check your internet connection and Sanity project status

4. **Orphaned FAQs after migration**
   - Run `npm run fix-orphaned-faqs` to automatically assign categories

### Manual Cleanup

If you need to manually clean up the migration:

```bash
# Remove all FAQ documents (DESTRUCTIVE!)
# Only run this if you need to start over
sanity exec --with-user-token "
*[_type == 'faq']{_id} | [0...100] | map(_id)
" | sanity delete

# Remove all FAQ categories (DESTRUCTIVE!)
sanity exec --with-user-token "
*[_type == 'faqCategory']{_id} | [0...100] | map(_id)
" | sanity delete
```

## Post-Migration

After successful migration:

1. ✅ Update your frontend queries to fetch FAQ data via references
2. ✅ Test FAQ display on all pages
3. ✅ Verify admin interface can manage FAQ content
4. ✅ Remove old inline FAQ fields from schema (optional)

## Support

If you encounter issues:

1. Check the verification script output
2. Review the migration logs
3. Ensure all environment variables are correct
4. Contact the development team for assistance