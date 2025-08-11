# 🚀 EXECUTE SANITY SCHEMA MIGRATION

## 🔒 PRE-EXECUTION CHECKLIST

Before starting the migration, verify these critical items:

### ✅ Backup Verification
```bash
# Verify backup exists
ls -la backups/sanity-backup-2025-08-07/
# Should show: schemas/, *.json files, *.md files

# Verify git backup branch
git branch -a | grep backup-before-schema-consolidation-2025-08-07
# Should show the backup branch exists
```

### ✅ Environment Check
```bash
# Verify Node.js version (should be 18+)
node --version

# Verify Sanity dependencies
npm list @sanity/client sanity
```

### ✅ Final Validation
```bash
# Run final validation (should show 100% ready)
node scripts/final-validation.js
```

## 🚀 EXECUTE MIGRATION

### Step 1: Test Connection (Optional)
```bash
# Test Sanity client connection
node scripts/sanity-client.js
```

### Step 2: Start Migration
```bash
# Navigate to project directory
cd "/Users/nemanjamalisic/Desktop/srecno-ucenje 2"

# Execute the master migration script
node scripts/migration/run-migration.js
```

### Step 3: Monitor Progress
The migration will show detailed progress like this:

```
🚀 Starting Master Migration: 81 → 18 schemas

📦 Migrating: uiComponent
──────────────────────────────────────────────
  ✅ Found 12 documents of type: button
  ✅ Found 5 documents of type: feature  
  ✅ Successfully migrated 17/17 documents to uiComponent

📦 Migrating: siteSettings
──────────────────────────────────────────────
  ✅ Found 1 documents of type: siteSettings
  ✅ Successfully migrated 1/1 documents to siteSettings
  
... (continues for all 18 schemas)
```

### Step 4: Review Results
After completion, you'll see:

```
================================================================================
📊 MIGRATION COMPLETE - FINAL REPORT  
================================================================================
Total documents migrated: XXX
Migration errors: 0
Success rate: 100%

📋 Detailed Results:
  ✅ uiComponent: 17 docs
  ✅ siteSettings: 1 docs  
  ✅ navigation: 3 docs
  ... (all schemas)

🎉 ALL MIGRATIONS SUCCESSFUL!
```

## ✅ POST-MIGRATION VALIDATION

### Step 1: Verify Schema Structure
```bash
# Check that new consolidated schemas exist
ls -la sanity/schemas/documents/
ls -la sanity/schemas/objects/

# Verify schema index is updated
grep -c "export const schemaTypes" sanity/schemas/index.ts
```

### Step 2: Test Sanity Studio
```bash
# Start Sanity Studio (if you have it configured)
npm run dev
# or
npx sanity dev

# Verify in browser:
# - All 18 schema types appear in admin
# - Content is accessible
# - No errors in console
```

### Step 3: Test Frontend Integration
```bash  
# Start your Next.js application
npm run dev

# Verify:
# - All pages load correctly
# - Content displays properly
# - No API errors
```

## ⚠️ IF SOMETHING GOES WRONG

### Immediate Actions
1. **STOP** any running processes
2. **DO NOT** make further changes
3. Execute emergency rollback

### Emergency Rollback
```bash
# 1. Switch to backup branch
git checkout backup-before-schema-consolidation-2025-08-07

# 2. Create rollback branch
git checkout -b emergency-rollback-$(date +%Y%m%d)

# 3. Restore schema files
rm -rf sanity/schemas/*
cp -r backups/sanity-backup-2025-08-07/schemas/* sanity/schemas/

# 4. Reset main branch (if needed)
git checkout main
git reset --hard backup-before-schema-consolidation-2025-08-07

# 5. If data needs restoration (requires Sanity token):
# npx sanity dataset import backups/sanity-backup-2025-08-07/sanity-data.ndjson production --replace
```

### Verify Rollback
```bash
# Test that everything works:
npm run dev
# Check all functionality is restored
```

## 📊 EXPECTED TIMELINE

- **Migration Execution**: 10-15 minutes
- **Validation**: 5-10 minutes  
- **Total Downtime**: 15-25 minutes

## 🎯 SUCCESS CRITERIA

### ✅ Migration Successful If:
- All 18 migration scripts complete successfully
- No errors in migration log
- All content accessible in Sanity Studio
- Frontend displays all content correctly
- Performance improved (faster loading)

### ❌ Migration Failed If:
- Any migration script reports errors
- Content missing from Sanity Studio
- Frontend shows errors or missing content
- Data corruption detected

## 📋 POST-SUCCESS CLEANUP

After confirming successful migration (wait 24-48 hours):

### Update Project
```bash
# Update schema index to only include 18 schemas
# Remove old unused schema files
# Update documentation
# Update type definitions
```

### Archive Backup
```bash
# After confirming success, archive backup
tar -czf sanity-migration-backup-2025-08-07.tar.gz backups/sanity-backup-2025-08-07/
# Keep archived backup for 30 days minimum
```

## 📞 EMERGENCY CONTACTS

If you encounter issues during migration:

- **Technical Support**: [Your contact]
- **Sanity Expert**: [Your contact]
- **Business Owner**: [Your contact]

## 🚀 READY TO LAUNCH

**All systems verified and ready for migration execution.**

**Final command to start migration**:
```bash
node scripts/migration/run-migration.js
```

---

**⚠️ IMPORTANT REMINDERS**:
- Ensure you have recent backups
- Notify users of potential downtime
- Have rollback plan ready
- Monitor closely during execution
- Test thoroughly after completion

**📈 Benefits after migration**:
- 77% fewer schema files to maintain
- Cleaner, more organized admin interface  
- Better performance with fewer imports
- Easier long-term maintenance
- All content and functionality preserved

---

*Migration prepared by Sanity Migration Specialist*  
*All validations passed ✅*  
*Ready for execution 🚀*