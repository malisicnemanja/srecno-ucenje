# PHASE 2 - Sanity Studio Test Guide

## 🧪 How to Test New CMS Types

### 1. Access Sanity Studio
```bash
# Make sure dev server is running
npm run dev

# Open browser
http://localhost:3000/studio
```

### 2. Check for New Types
Look in the left sidebar for:
- ✅ **Franšizer testimonijal** (new)
- ✅ **Centar** (new)
- ✅ **Arhivirani sadržaj** (new)

### 3. Verify Old Types Still Exist
Confirm these are still present:
- ✅ Homepage
- ✅ Books
- ✅ Testimonials
- ✅ Experience
- ✅ Location Data
- ✅ All other existing types

### 4. Test Creating Documents

#### Test 1: Create a Franchisee Testimonial
1. Click on "Franšizer testimonijal"
2. Click "Create new"
3. Fill in test data:
   - Franchisor name: "Test Franšizer"
   - Location: "Test Grad"
   - Monthly students: 100
   - Story: "Test priča o uspehu..."
4. Save as draft (DO NOT PUBLISH)

#### Test 2: Create a Center
1. Click on "Centar"
2. Click "Create new"
3. Fill in test data:
   - Name: "Test Centar"
   - Address: "Test Ulica 123"
   - City: "Test Grad"
4. Save as draft (DO NOT PUBLISH)

#### Test 3: Verify Legacy Content Type
1. Click on "Arhivirani sadržaj"
2. Verify you can see the schema
3. DO NOT create any documents here yet

### 5. Validation Checklist
- [ ] All 3 new types appear in Studio
- [ ] All old types still appear
- [ ] Can create draft documents in new types
- [ ] No errors in browser console
- [ ] Schema fields work correctly
- [ ] Image uploads work
- [ ] References work (e.g., Center can reference Franchisee)

### 6. Clean Up
After testing:
1. Delete any test documents created
2. Or keep them as drafts for PHASE 3 testing

## ⚠️ Important Notes

1. **DO NOT DELETE** any existing documents
2. **DO NOT PUBLISH** test documents to production
3. **ONLY CREATE DRAFTS** for testing
4. If you see errors, document them but DO NOT fix schemas yet

## 🐛 Known Issues to Check

1. If schemas don't appear:
   - Check browser console for errors
   - Hard refresh (Ctrl+Shift+R)
   - Check if `sanity/schemas/index.ts` was saved

2. If old types are missing:
   - STOP immediately
   - Check that index.ts has all types
   - Ensure no types were accidentally removed

3. If Studio won't load:
   - Check if dev server is running
   - Check for TypeScript errors
   - Try `npm run dev` restart

---

**Test Date**: _______________
**Tested By**: _______________
**Result**: [ ] PASS [ ] FAIL

**Notes**:
_________________________________
_________________________________
_________________________________