# 🚀 EXECUTE CLEANUP NOW - STUDIO PRODUCER COMMANDS

## IMMEDIATE ACTION REQUIRED

**Status**: CRITICAL - Database cleanup blocking all development  
**Time**: Execute within next 30 minutes  
**Project**: Srećno učenje franchise transformation  

---

## ⚠️ PREREQUISITES (COMPLETE FIRST)

### 1. Sanity API Token Setup
The cleanup scripts need write access to Sanity CMS (Project ID: `08ctxj6y`).

**Get your token:**
1. Go to https://www.sanity.io/manage/personal/tokens
2. Create new token with **Write** permissions
3. Copy the token

**Set environment variable:**
```bash
# Option A: Set for current session
export SANITY_API_TOKEN="your-token-here"

# Option B: Add to your shell profile
echo 'export SANITY_API_TOKEN="your-token-here"' >> ~/.zshrc
source ~/.zshrc

# Option C: Create .env file in cleanup directory
echo "SANITY_API_TOKEN=your-token-here" > "/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z/.env"
```

### 2. Install Dependencies
```bash
cd "/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z"
npm install @sanity/client
```

### 3. Verify Sanity Access
```bash
# Test connection (should show no errors)
node -e "
const client = require('@sanity/client')({
  projectId: '08ctxj6y',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});
client.fetch('*[_type == \"siteSettings\"][0]').then(console.log).catch(console.error);
"
```

---

## 🎯 PHASE 1 EXECUTION SEQUENCE

### STEP 1: PRE-CLEANUP VALIDATION (CRITICAL)
```bash
# Navigate to cleanup directory
cd "/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z"

# Run validation (MANDATORY - DO NOT SKIP)
echo "🔍 Starting validation at $(date)"
node validate-cleanup.js

# Check the validation report
echo "📊 Validation complete. Check the output above for any warnings."
echo "🔍 Review validation-report.json if generated"
```

**What to look for in validation output:**
- ✅ Items found and ready for deletion
- ⚠️ Any items with incoming references (review carefully)
- 🚫 Connection errors (fix token/config first)

### STEP 2: EXECUTE SAFE CLEANUP
**Only proceed if validation shows no critical issues**

```bash
# Execute the cleanup with interactive confirmations
echo "🧹 Starting cleanup at $(date)"
node safe-sanity-cleanup.js

# The script will ask for confirmation at each step:
# - Type 'yes' to proceed with each category
# - Type 'no' to skip a category if uncertain
# - Use Ctrl+C to abort if anything looks wrong
```

**Expected interactive prompts:**
1. Calculator Results (13 items) - **SAFE TO DELETE**
2. Franchise Fields (12 duplicates) - **SAFE TO DELETE**
3. About Authors (3 duplicates) - **SAFE TO DELETE**
4. FAQ Categories & Items (19 duplicates) - **SAFE TO DELETE**
5. Testimonial Review - **REVIEW CAREFULLY**
6. Location Field Updates - **SAFE TO UPDATE**

### STEP 3: VERIFY CLEANUP SUCCESS
```bash
# Check cleanup results
echo "✅ Cleanup completed at $(date)"

# Review the cleanup log
if [ -f "cleanup-log.txt" ]; then
  echo "📝 Cleanup log:"
  tail -20 cleanup-log.txt
else
  echo "⚠️ No cleanup log found"
fi

# Re-run validation to confirm cleanup
echo "🔍 Final validation..."
node validate-cleanup.js
```

### STEP 4: VERIFY IN SANITY STUDIO
```bash
# Open Sanity Studio to verify clean state
echo "🏢 Opening Sanity Studio for verification..."
open "https://srecnoucenje.sanity.studio/"

# Or if you have the local studio running:
# open "http://localhost:3333/studio"
```

**Manual verification checklist in Studio:**
- [ ] Calculator results should be gone
- [ ] No duplicate franchise fields
- [ ] Clean FAQ section with no duplicates
- [ ] Only franchise-relevant testimonials
- [ ] Location data has `centreCount` instead of `centerCount`

---

## 🚨 TROUBLESHOOTING

### "Connection Error" / "Authentication Failed"
```bash
# Check your token
echo "Token set: $SANITY_API_TOKEN"
# If empty, set the token again

# Verify project access
node -e "console.log('Testing connection...');
const client = require('@sanity/client')({
  projectId: '08ctxj6y',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});
client.fetch('count(*[_type == \"franchiseField\"])').then(count => 
  console.log('Franchise fields found:', count)
).catch(err => console.error('Error:', err.message));"
```

### "Items Not Found" (Some items already deleted)
This is normal - some duplicates may have been cleaned up previously.
The script will skip missing items and continue.

### "Items Have References"
If validation shows items with references:
1. Review the reference list carefully
2. Decide if references should be updated or removed
3. You can skip those items during cleanup
4. Handle references manually in Sanity Studio if needed

### Script Hangs or Crashes
```bash
# Kill the process
Ctrl+C

# Check if partial cleanup occurred
node validate-cleanup.js

# Review cleanup-log.txt for what completed
tail -50 cleanup-log.txt
```

---

## 📊 SUCCESS INDICATORS

### ✅ Cleanup Successful If:
- Validation shows significant reduction in duplicate items
- Cleanup log shows multiple "Successfully deleted" entries
- No "Failed to delete" errors for important items
- Sanity Studio shows clean, organized structure
- Final validation shows reduced item counts

### ⚠️ Partial Success If:
- Most items deleted but some failures due to references
- Non-critical items skipped (calculator results, etc.)
- Location updates completed successfully

### ❌ Failure Indicators:
- Multiple "Failed to delete" errors
- Connection/authentication errors throughout
- Sanity Studio shows no changes
- Critical franchise data accidentally deleted

---

## 🔄 NEXT STEPS AFTER SUCCESSFUL CLEANUP

### Immediate (Next 1 Hour):
1. **Report Success**: Update team on cleanup completion
2. **Backup Verification**: Confirm Sanity has updated backup
3. **Begin Phase 2**: Start migration scripts for new schema
4. **Frontend Team**: Begin PWA removal and navigation fixes

### Short Term (Next 4 Hours):
1. **Schema Migration**: Deploy new Center-Location-Educator structure
2. **Data Population**: Add sample educators and center data
3. **Frontend Fixes**: Complete navigation and logo fixes
4. **API Updates**: Update queries for new data structure

### Critical Path Dependencies:
- **Phase 2** (Migration) cannot start until Phase 1 cleanup is complete
- **Phase 3** (Frontend) can start in parallel after cleanup
- **Phase 4** (Validation) requires Phases 1-3 completion

---

## 🎯 STUDIO PRODUCER FINAL CHECKLIST

Before marking Phase 1 complete:
- [ ] Sanity API token configured and tested
- [ ] Pre-cleanup validation run and reviewed
- [ ] Safe cleanup executed with confirmations
- [ ] Post-cleanup validation shows success
- [ ] Sanity Studio manually verified clean
- [ ] Cleanup log reviewed for any issues
- [ ] Team notified of Phase 1 completion
- [ ] Phase 2 migration team mobilized
- [ ] Frontend team starts PWA removal
- [ ] Next checkpoint scheduled (2 hours)

---

## 💻 EXECUTE NOW - COPY/PASTE COMMANDS

```bash
# PHASE 1 CLEANUP - EXECUTE THESE COMMANDS NOW
export SANITY_API_TOKEN="your-token-here"  # Replace with actual token
cd "/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z"

# Install dependencies
npm install @sanity/client

# Validate first (MANDATORY)
node validate-cleanup.js

# If validation looks good, proceed with cleanup
node safe-sanity-cleanup.js

# Verify success
node validate-cleanup.js
echo "🎉 Phase 1 Cleanup Complete!"
```

---

**⏰ TIME IS CRITICAL - EXECUTE IMMEDIATELY**

This cleanup is blocking the entire 6-day sprint. Every minute counts.
Execute now, verify success, then immediately proceed to Phase 2 migration.

*Studio Producer: Your coordination is essential for this sprint's success.*