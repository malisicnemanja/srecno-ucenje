# ROLLBACK PLAN - Srećno učenje

## 📅 Created: August 5, 2025
## 🔄 Last Updated: August 5, 2025

---

## 🎯 Overview

This document outlines the rollback procedures for the Srećno učenje website consolidation project. The rollback plan ensures we can quickly revert to the previous stable state if any issues arise during the migration phases.

## 🔒 Backup Status

### 1. Git Backup
- **Branch Name**: `backup/pre-consolidation-20250805`
- **Created**: August 5, 2025
- **Command to switch**: `git checkout backup/pre-consolidation-20250805`
- **Contains**: Complete codebase snapshot before any changes

### 2. Content Inventory
- **Files Created**:
  - `content-inventory.json` - Basic page inventory
  - `content-inventory-detailed.json` - Detailed analysis with issues
  - `component-analysis.json` - Component dependencies and risks
  - `all-routes.txt` - List of all 29 pages

### 3. Screenshots
- **Location**: `/screenshots-backup/`
- **Helper Page**: `screenshot-helper.html`
- **URL List**: `urls.txt`
- **Status**: Manual capture required (open helper page for instructions)

### 4. CMS Backup
- **Status**: ⚠️ PENDING - Requires Sanity login
- **Export Command**: `npx sanity dataset export production ./backup/sanity-backup-20250805.tar.gz`
- **Import Command**: `npx sanity dataset import ./backup/sanity-backup-20250805.tar.gz production --replace`

---

## 🚨 Rollback Procedures

### Level 1: Code Rollback (Quick - 2 minutes)
**When to use**: If code changes break the site

```bash
# 1. Stop the development server
# Ctrl+C in the terminal running npm run dev

# 2. Discard all uncommitted changes
git status  # Review what will be lost
git reset --hard HEAD

# 3. Switch to backup branch
git checkout backup/pre-consolidation-20250805

# 4. Restart the server
npm run dev
```

### Level 2: Partial Rollback (Moderate - 5 minutes)
**When to use**: If only specific files need reverting

```bash
# 1. Identify problematic files
git status
git diff

# 2. Revert specific files from backup
git checkout backup/pre-consolidation-20250805 -- path/to/file.tsx

# 3. Test the changes
npm run dev
```

### Level 3: CMS Rollback (Complex - 15-30 minutes)
**When to use**: If CMS schema changes cause issues

```bash
# 1. Export current CMS state (for analysis)
npx sanity dataset export production ./backup/current-state.tar.gz

# 2. Import the backup
npx sanity dataset import ./backup/sanity-backup-20250805.tar.gz production --replace

# 3. Restart Sanity Studio
cd studio
npm run dev
```

### Level 4: Full Environment Rollback (Complete - 1 hour)
**When to use**: If multiple systems are affected

1. **Stop all services**
   ```bash
   # Kill all Node processes
   pkill -f node
   ```

2. **Restore Git repository**
   ```bash
   git checkout backup/pre-consolidation-20250805
   git branch -D main  # Delete corrupted main branch
   git checkout -b main  # Recreate main from backup
   ```

3. **Clear caches**
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   ```

4. **Reinstall dependencies**
   ```bash
   npm ci  # Clean install from package-lock.json
   ```

5. **Restore CMS**
   ```bash
   npx sanity dataset import ./backup/sanity-backup-20250805.tar.gz production --replace
   ```

6. **Restart all services**
   ```bash
   npm run dev
   # In another terminal:
   cd studio && npm run dev
   ```

---

## 📋 Rollback Checklist

Before declaring rollback complete, verify:

- [ ] Website loads without errors on http://localhost:3000
- [ ] All 29 pages are accessible (check against `all-routes.txt`)
- [ ] CMS Studio is functional at http://localhost:3000/studio
- [ ] No console errors in browser DevTools
- [ ] All images load correctly
- [ ] Forms work (test newsletter signup)
- [ ] Dynamic content from CMS displays properly

---

## 🔍 Monitoring After Rollback

1. **Check Error Logs**
   ```bash
   # View recent Git commits
   git log --oneline -10
   
   # Check for TypeScript errors
   npm run typecheck
   
   # Run linter
   npm run lint
   ```

2. **Verify CMS Content**
   - Open Sanity Studio
   - Check that all content types are present
   - Verify recent content changes are intact

3. **Test Critical Paths**
   - Homepage loads
   - Book pages display
   - Booking form submits
   - Newsletter signup works

---

## 📞 Emergency Contacts

If rollback fails:

1. **Check GitHub Issues**: https://github.com/anthropics/claude-code/issues
2. **Review Sanity Documentation**: https://www.sanity.io/docs/data-store/backup-and-restore
3. **Next.js Troubleshooting**: https://nextjs.org/docs/messages

---

## 🔄 Post-Rollback Actions

After successful rollback:

1. **Document what went wrong**
   - Create incident report
   - Update migration strategy
   - Adjust timeline if needed

2. **Communicate with team**
   - Notify about rollback
   - Share lessons learned
   - Plan next steps

3. **Create new backup**
   - Tag the stable state
   - Export fresh CMS backup
   - Update this document

---

## 📝 Notes

- Always test rollback procedures in development before production
- Keep backups for at least 30 days
- Document any custom rollback steps specific to your changes
- This plan covers PHASE 0 through PHASE 3 of the migration

---

**Remember**: It's better to rollback early than to dig deeper into problems. The goal is stability and no content loss.