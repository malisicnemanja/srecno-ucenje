# SANITY SCHEMA CONSOLIDATION ROLLBACK INSTRUCTIONS

## ⚠️ CRITICAL: Read this before proceeding with schema changes

### Backup Information
- **Backup Date**: 2025-08-07T21:41:10.769Z
- **Git Backup Branch**: backup-before-schema-consolidation-2025-08-07
- **Total Schemas Backed Up**: 81
- **Documents**: 57
- **Objects**: 23

### In Case of Emergency - ROLLBACK PROCEDURE

#### 1. Restore Git State
```bash
# Switch to backup branch
git checkout backup-before-schema-consolidation-2025-08-07

# Create new branch from backup
git checkout -b rollback-$(date +%Y%m%d)

# Force reset main to backup state (DANGEROUS - USE CAREFULLY)
git checkout main
git reset --hard backup-before-schema-consolidation-2025-08-07
```

#### 2. Restore Sanity Data (if needed)
```bash
# Import backed up data
npx sanity dataset import backups/sanity-backup-2025-08-07/sanity-data.ndjson production --replace
```

#### 3. Restore Schema Files
```bash
# Copy backup schemas back
rm -rf sanity/schemas/*
cp -r backups/sanity-backup-2025-08-07/schemas/* sanity/schemas/
```

### Pre-Migration Checklist
- [ ] Verify all critical content is backed up
- [ ] Test export/import process in development
- [ ] Notify team about maintenance window
- [ ] Prepare rollback communication plan

### Migration Validation Steps
After migration, verify:
- [ ] All critical pages load correctly
- [ ] Content is displaying properly
- [ ] Admin interface works
- [ ] All document types are accessible
- [ ] Search functionality works
- [ ] Image/media assets load correctly

### Emergency Contacts
- Schema Migration Lead: [ADD CONTACT]
- Sanity Admin: [ADD CONTACT]
- Technical Lead: [ADD CONTACT]

### Files in This Backup
- `schema-inventory.json` - Complete list of backed up schemas
- `schema-analysis.json` - Detailed schema analysis
- `sanity-data.ndjson` - Complete data export (if successful)
- `schemas/` - All schema files
- `git-backup-info.json` - Git backup information
