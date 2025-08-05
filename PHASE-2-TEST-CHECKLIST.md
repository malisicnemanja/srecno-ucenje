# PHASE 2 - MANUAL TEST CHECKLIST

**Test Date**: _____________  
**Tester**: _____________

## 🌐 1. Access Sanity Studio

- [ ] Open http://localhost:3000/studio
- [ ] Studio loads without errors
- [ ] Login if required
- [ ] No white screen or loading issues

## 📋 2. Verify New Document Types

Look in the left sidebar menu for:

- [ ] **Franšizer testimonijal** - visible
- [ ] **Centar** - visible  
- [ ] **Arhivirani sadržaj** - visible

## 📚 3. Verify Old Document Types Still Exist

Confirm these are still in the menu:

- [ ] Home Page
- [ ] Knjiga (Book)
- [ ] Testimonial
- [ ] FAQ
- [ ] Experience
- [ ] Metodologija
- [ ] About Author
- [ ] Site Settings

## 🆕 4. Test Creating New Documents

### 4.1 Franšizer Testimonijal
- [ ] Click "Franšizer testimonijal" → "Create new"
- [ ] Fill in test data:
  ```
  Franchisor:
    Name: Test Franšizer
    Role: Vlasnik franšize
  Center Info:
    Name: Test Centar Novi Sad
    Location: Novi Sad
    Opened Date: Today
  Business Metrics:
    Monthly Students: 50
    Satisfaction Rate: 95
  Story: "Ovo je test priča o uspehu..."
  ```
- [ ] Save as DRAFT (DO NOT PUBLISH)
- [ ] No errors when saving

### 4.2 Centar
- [ ] Click "Centar" → "Create new"
- [ ] Fill in test data:
  ```
  Name: Test Centar Beograd
  Slug: test-centar-beograd
  Address:
    Street: Test ulica 123
    City: Beograd
    Zip: 11000
  Contact:
    Phone: +381 11 123 4567
    Email: test@example.com
  Programs: [Brzo čitanje, Mentalna aritmetika]
  Status: Active
  ```
- [ ] Save as DRAFT (DO NOT PUBLISH)
- [ ] No errors when saving

### 4.3 Legacy Content (View Only)
- [ ] Click "Arhivirani sadržaj"
- [ ] Verify schema is viewable
- [ ] DO NOT create documents here

## 🔍 5. Test Existing Documents

- [ ] Open any existing Home Page document
- [ ] Can view and edit without errors
- [ ] Open any existing Book document
- [ ] Can view and edit without errors
- [ ] Open any existing Testimonial
- [ ] Can view and edit without errors

## 🐛 6. Browser Console Check

Open browser DevTools (F12) and check Console tab:

- [ ] No red errors in console
- [ ] No "Schema not found" errors
- [ ] No "Field not found" errors
- [ ] Warnings are OK (yellow)

## 📸 7. Screenshots

Take screenshots of:
- [ ] Studio with new types in menu
- [ ] Franšizer testimonijal create form
- [ ] Centar create form
- [ ] Any errors (if present)

## 🧹 8. Cleanup

After testing:
- [ ] Delete test "Franšizer testimonijal" draft
- [ ] Delete test "Centar" draft
- [ ] Close browser DevTools

---

## ✅ TEST RESULTS

**All tests passed?** [ ] YES [ ] NO

**Issues found:**
_________________________________
_________________________________
_________________________________

**Screenshots saved to:** _____________

**Ready for PHASE 3?** [ ] YES [ ] NO

---

## 🚨 IF TESTS FAILED

1. **Studio won't load:**
   - Check if dev server is running: `npm run dev`
   - Check console for errors
   - Try hard refresh: Ctrl+Shift+R

2. **New types don't appear:**
   - Restart dev server
   - Check `sanity/schemas/index.ts` has new imports
   - Clear browser cache

3. **Can't create documents:**
   - Check for TypeScript errors
   - Verify field definitions in schema files
   - Check browser console for errors

4. **Old types missing:**
   - STOP IMMEDIATELY
   - Check that no schemas were deleted
   - Verify index.ts has all types

---

**Notes:**
_________________________________
_________________________________
_________________________________