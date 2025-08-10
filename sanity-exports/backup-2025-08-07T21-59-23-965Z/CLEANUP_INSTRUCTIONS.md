# Sanity CMS Safe Cleanup Instructions

## Overview

This package contains safe cleanup scripts to remove duplicates and unnecessary content from your Sanity CMS, specifically:

1. **13 calculator results** (temporary data)
2. **12 duplicate franchise fields** (keeping unique ones)  
3. **3 duplicate about author documents** (keep most complete)
4. **6 duplicate FAQ categories + 13 duplicate FAQ items**
5. **Testimonials review** (keep franchise-focused ones)
6. **Location field updates** (centerCount → centreCount)

## 📁 Files Included

| File | Purpose |
|------|---------|
| `safe-sanity-cleanup.js` | Main cleanup script with confirmations |
| `validate-cleanup.js` | Pre-cleanup validation and dry-run |
| `CLEANUP_INSTRUCTIONS.md` | This instruction guide |
| `cleanup-script.js` | Original analysis-generated script |

## 🚀 Quick Start

### Step 1: Configuration

Edit both scripts and update these values:

```javascript
const client = sanityClient({
  projectId: 'your-project-id',     // Your Sanity project ID
  dataset: 'development',           // Start with development!
  token: 'your-write-token',        // Token with write permissions
  useCdn: false
});
```

### Step 2: Install Dependencies

```bash
npm install @sanity/client
```

### Step 3: Validate First (Recommended)

```bash
node validate-cleanup.js
```

This will:
- Check if items exist
- Identify items with references
- Generate a validation report
- Show what will be deleted/updated

### Step 4: Run Safe Cleanup

```bash
node safe-sanity-cleanup.js
```

This will:
- Ask for confirmation at each step
- Process items in batches
- Log all operations
- Allow skipping any category
- Generate detailed progress reports

## 🛡️ Safety Features

### Interactive Confirmations
Each cleanup category requires explicit confirmation:
- Calculator results deletion
- Franchise fields cleanup  
- Author duplicates removal
- FAQ cleanup (categories + items)
- Testimonials review
- Location field updates

### Batch Processing
- Items processed in small batches (5-10 items)
- Delays between batches to avoid rate limiting
- Individual error handling per item
- Progress reporting

### Detailed Logging  
- All operations logged to `cleanup-log.txt`
- Timestamped entries
- Success/failure tracking
- Error details for debugging

### Graceful Error Handling
- Individual item failures don't stop the process
- Failed items are reported but don't crash the script  
- Connection issues are caught and reported
- User can interrupt with Ctrl+C safely

## 📊 What Gets Deleted

### Calculator Results (13 items)
```
EIn1TO6kzkBkpMuRkFfJpQ, EIn1TO6kzkBkpMuRkFgcGy, EIn1TO6kzkBkpMuRkGY5vK,
EIn1TO6kzkBkpMuRkGYjyV, RSzTvGgTwtY6EErbXmHqYB, RSzTvGgTwtY6EErbXmHqln,
[...and 7 more]
```
**Reason**: Temporary calculation data, safe to remove

### Franchise Fields (12 duplicates)
```
telefon, zanimanje, motivacija_razlog, iskustvo_edukacija, email, iskustvo,
budjet, obrazovanje, ime_prezime, lokacija, ciljevi_godina, dostupno_vreme
```
**Reason**: Duplicate form fields, keeping one of each

### About Authors (2 duplicates) 
```
drafts.EIn1TO6kzkBkpMuRkFy78E, aboutAuthor
```
**Reason**: Multiple entries for "Željana Radojičić Lukić", keeping most complete

### FAQ Categories (6 duplicates)
```
"Obuka i podrška", "Finansijska pitanja", "Opšta pitanja o franšizi",
"Operativna pitanja", "Opšta pitanja"
```
**Reason**: Multiple categories with same names, keeping oldest

### FAQ Items (13 duplicates)
Duplicate questions like:
- "Koje su mesečne obaveze prema franšizeru?"
- "Kolika je početna investicija?"
- "Koliko dugo traje program brzočitanja?"
- [10 more duplicate questions]

## 🔄 What Gets Updated

### Location Data (10+ items)
Field rename: `centerCount` → `centreCount` (British spelling)

### Testimonials (Review Process)
- Automatically identifies franchise-relevant testimonials
- Flags non-franchise testimonials for manual review
- Option to delete non-franchise testimonials

## ⚠️ Important Warnings

1. **Test First**: Always run on development dataset first
2. **Backup**: Ensure you have a recent backup
3. **References**: Some items might be referenced elsewhere
4. **Permissions**: Your token needs write permissions
5. **Rate Limits**: Script includes delays to respect API limits

## 🔧 Troubleshooting

### Connection Issues
```
❌ Failed to connect to Sanity: [error]
```
**Solution**: Check your projectId, dataset, and token

### Permission Errors  
```
❌ Insufficient permissions
```
**Solution**: Use a token with write permissions

### Rate Limiting
```
❌ Too many requests
```
**Solution**: Script includes delays, but you can increase them if needed

### Items Not Found
```
❌ Document not found: [id]
```
**Solution**: Normal - items may have been deleted already

## 📈 Expected Results

After successful cleanup:
- **46 items deleted** (duplicates and temporary data)
- **10+ location fields updated** (spelling consistency)  
- **Franchise-focused testimonials retained**
- **Clean, organized CMS structure**
- **No duplicate form fields or FAQ items**

## 🎯 Next Steps

1. Run validation script
2. Review validation report  
3. Test on development dataset
4. Run cleanup on production
5. Verify results in Sanity Studio
6. Update any hardcoded references if needed

## 📞 Support

If you encounter issues:
1. Check the generated `cleanup-log.txt` file
2. Review the `validation-report.json` file  
3. Ensure your Sanity project configuration is correct
4. Test individual operations if needed

---

**Generated**: August 8, 2025  
**Scripts Version**: 1.0.0  
**Sanity API Version**: 2023-05-03