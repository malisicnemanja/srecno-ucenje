# 🎯 COMPREHENSIVE CMS MIGRATION COORDINATION PLAN

## STUDIO PRODUCER EXECUTIVE SUMMARY

**Project**: Srećno učenje CMS Migration & Home Page Fix  
**Status**: CRITICAL - Production blocking issues  
**Sprint Window**: 4-6 hours execution time  
**Team Coordination**: Multi-agent specialist approach  

---

## 🚨 CRITICAL ISSUES IDENTIFIED

### 1. HOME PAGE CONTENT FAILURE
- **Problem**: Home page not displaying content - query/schema mismatch
- **Root Cause**: Query expects `heroSection`, `features`, etc. but schema has `enhancedHero`, `statistics`
- **Impact**: Primary website entry point broken
- **Priority**: CRITICAL

### 2. SANITY STUDIO SCHEMA ERRORS
- **Unknown Fields**: `freeResources`, `heroSekcija`, `homeFaq`
- **Missing Keys**: Statistics array lacks `_key` properties  
- **Data Inconsistency**: Mock vs CMS data conflict
- **Priority**: HIGH

### 3. DATA ARCHITECTURE ISSUES
- **Legacy Data**: Multiple duplicate/obsolete document types
- **Schema Drift**: Frontend queries don't match actual schema structure
- **Missing Content**: Required homepage sections have no CMS data
- **Priority**: HIGH

---

## 🎭 MULTI-AGENT COORDINATION STRATEGY

### PHASE 1: DISCOVERY & PREPARATION (30 minutes)
**Agent**: Studio Producer (Self-coordination)
- [ ] Complete schema analysis (DONE)
- [ ] Create backup export of all Sanity data
- [ ] Document all query/schema mismatches
- [ ] Prepare coordination timeline

### PHASE 2: BACKEND MIGRATION (60-90 minutes)
**Primary Agent**: Backend Architect
**Secondary**: Database Engineer

**Critical Tasks:**
1. **Schema Consolidation**
   - Fix unknown fields in homePage schema
   - Add missing `_key` properties to arrays
   - Consolidate duplicate field names (homeFaq vs homeFAQ)
   
2. **Data Cleanup**
   - Remove orphaned/unused document types
   - Clean up duplicate FAQ entries
   - Migrate legacy location data to new structure
   
3. **Migration Scripts**
   - Execute existing migration scripts safely
   - Populate missing homePage document with default Serbian content
   - Update all reference chains

**Coordination Points:**
- Start Time: Immediately after Phase 1
- Check-in: Every 30 minutes with Studio Producer
- Handoff: Clean schema + populated homePage data ready

### PHASE 3: FRONTEND QUERY UPDATES (45-60 minutes)
**Primary Agent**: Frontend Developer  
**Secondary**: API Integration Specialist

**Critical Tasks:**
1. **Query Alignment**
   - Update `homePageQuery` to match actual schema structure
   - Fix `heroSection` → `enhancedHero` mapping
   - Update `features` → proper field mapping
   
2. **Component Updates**
   - Update HomePage component to use correct CMS field names
   - Fix HeroSection component props mapping
   - Ensure proper error states for missing data
   
3. **Data Flow Testing**
   - Test query execution against updated schema
   - Verify component rendering with real CMS data
   - Remove any remaining mock data dependencies

**Coordination Points:**
- Dependency: Cannot start until Phase 2 schema is complete
- Parallel work possible: Component updates can start early
- Integration test: Joint testing with backend team

### PHASE 4: CONTENT POPULATION (30-45 minutes)
**Primary Agent**: AI Engineer (Content Generation)
**Secondary**: Content Strategist

**Critical Tasks:**
1. **Generate Serbian Content**
   - Create homepage hero section content
   - Generate feature descriptions
   - Write appropriate testimonials and success stories
   
2. **CMS Data Entry**
   - Populate homePage document through Sanity Studio
   - Add proper images and media assets
   - Create FAQ content with proper categorization
   
3. **Content Strategy Alignment**
   - Ensure brand voice consistency
   - Verify educational franchise messaging
   - Optimize for Serbian market

**Coordination Points:**
- Dependency: Schema must be fixed before content entry
- Parallel work: Content creation can happen during frontend updates
- Review: Content approval with stakeholder

### PHASE 5: VALIDATION & TESTING (30-45 minutes)
**Primary Agent**: Test Writer & Fixer
**Secondary**: QA Coordinator

**Critical Tasks:**
1. **End-to-End Testing**
   - Verify homepage loads with CMS content
   - Test all CMS queries return expected data
   - Validate Sanity Studio is error-free
   
2. **Performance Testing**
   - Ensure query performance is acceptable
   - Check image loading and optimization
   - Verify mobile responsiveness
   
3. **Data Integrity Validation**
   - Confirm no content loss during migration
   - Verify all references are properly connected
   - Test CMS workflow for content updates

**Coordination Points:**
- Final phase - all previous work must be complete
- Requires access to both local and staging environments
- Go/no-go decision for production deployment

---

## ⏰ EXECUTION TIMELINE

### T+0: IMMEDIATE START (Studio Producer)
```bash
# Phase 1 Preparation
export SANITY_API_TOKEN="your-token-here"
cd /Users/nemanjamalisic/Desktop/srecno-ucenje\ 2
tsx scripts/coordinate-migration.ts
```

### T+30min: BACKEND MIGRATION (Backend Architect)
```typescript
// Schema fixes needed:
// 1. Fix homePage.ts unknown fields
// 2. Add _key to statistics array
// 3. Create homePage document with Serbian content
// 4. Clean orphaned data
```

### T+90min: FRONTEND UPDATES (Frontend Developer)
```typescript
// Query updates needed:
// 1. Update homePageQuery structure
// 2. Fix component prop mapping
// 3. Remove mock data dependencies
// 4. Test with real CMS data
```

### T+135min: CONTENT POPULATION (AI Engineer)
```typescript
// Content tasks:
// 1. Generate Serbian franchise content
// 2. Create proper FAQ structure
// 3. Add testimonials and success stories
// 4. Upload media assets
```

### T+180min: FINAL TESTING (Test Writer & Fixer)
```typescript
// Validation tasks:
// 1. End-to-end homepage test
// 2. CMS query performance test
// 3. Studio error validation
// 4. Production readiness check
```

### T+225min: DEPLOYMENT READY

---

## 🛠️ TECHNICAL COORDINATION DETAILS

### Backend Architect Focus Areas:
**File**: `/sanity/schemas/documents/homePage.ts`
- Remove unknown fields: `freeResources`, `heroSekcija`, `homeFaq`
- Consolidate: `homeFaqs` vs `homeFAQ` (keep one)
- Add `_key` to statistics array objects

**File**: `/scripts/safe-migration.ts`
- Execute cleanup of orphaned data
- Populate missing homePage document
- Update reference chains

### Frontend Developer Focus Areas:  
**File**: `/lib/sanity.queries.ts`
- Line 442-513: Update `homePageQuery` structure
- Map `heroSection` → `enhancedHero`
- Fix features array structure

**File**: `/app/page.tsx`
- Lines 53-55: Fix heroSection prop mapping
- Lines 67-73: Update features section data access
- Remove mock data dependencies

### AI Engineer Focus Areas:
**Content Generation Tasks:**
- Serbian franchise hero content
- Educational benefit features (4 items)
- Success stories (3-5 testimonials)
- FAQ content (franchise-focused)

### Test Writer Focus Areas:
**Integration Tests:**
- Homepage CMS query execution
- Component rendering validation
- Error state handling
- Mobile responsiveness

---

## 🔄 COORDINATION CHECKPOINTS

### 30-Minute Check-ins:
- **Status Updates**: Each agent reports progress
- **Blocker Resolution**: Immediate escalation of issues
- **Dependency Management**: Ensure handoff readiness
- **Quality Gates**: Validate work before next phase

### Critical Handoff Points:
1. **Backend → Frontend**: Clean schema + sample data ready
2. **Frontend → Content**: Component structure finalized  
3. **Content → Testing**: All CMS data populated
4. **Testing → Deployment**: All validations passed

### Communication Protocol:
- **Slack Channel**: #cms-migration-sprint
- **Status Format**: "Phase X - Task Y - Status - ETA - Blockers"
- **Escalation**: Studio Producer for all blockers > 15 minutes

---

## 🚨 RISK MITIGATION

### High-Risk Areas:
1. **Schema Changes**: Could break other queries
   - **Mitigation**: Test all affected queries before deployment
   
2. **Data Loss**: Migration could lose existing content
   - **Mitigation**: Complete backup before any changes
   
3. **Query Performance**: New structure could be slow
   - **Mitigation**: Performance testing in Phase 5
   
4. **Reference Breaks**: Moving data could break links
   - **Mitigation**: Validate all references post-migration

### Rollback Plan:
1. Keep complete Sanity export from Phase 1
2. Git commit checkpoints at each phase
3. Database restore capability ready
4. 24-hour rollback window if issues arise

---

## 🎯 SUCCESS CRITERIA

### Phase Gates:
- **Phase 1**: ✅ Complete schema analysis + backup created
- **Phase 2**: ✅ Schema clean + homePage document exists + no Studio errors
- **Phase 3**: ✅ Query returns data + homepage renders + components work
- **Phase 4**: ✅ All content populated + Serbian language + proper branding
- **Phase 5**: ✅ All tests pass + production-ready + performance acceptable

### Final Success Definition:
- [ ] Homepage loads completely with CMS content (no mock data)
- [ ] Sanity Studio shows no schema errors or warnings
- [ ] All CMS queries return expected data structure
- [ ] Content is properly localized in Serbian
- [ ] Performance meets production standards (<3s load time)
- [ ] Mobile experience is fully functional
- [ ] Content management workflow works for editors

---

## 📋 NEXT ACTIONS - EXECUTE IMMEDIATELY

### Studio Producer (You):
1. **Export Current Data**: Run backup script immediately
2. **Notify Agents**: Send coordination plan to all team members
3. **Setup Monitoring**: Create progress tracking dashboard
4. **Time Management**: Set 30-minute check-in alarms

### Backend Architect:
1. **Schema Fixes**: Start with homePage.ts immediately
2. **Data Analysis**: Review exported data for migration needs
3. **Script Preparation**: Prepare migration commands
4. **Testing Setup**: Local CMS testing environment ready

### Frontend Developer:
1. **Query Analysis**: Review current query vs schema mismatch
2. **Component Audit**: Identify all components needing updates
3. **Test Data**: Prepare component testing with sample data
4. **Performance Baseline**: Measure current load times

### AI Engineer:
1. **Content Research**: Review existing Serbian content examples
2. **Brand Guidelines**: Understand franchise messaging tone
3. **Content Templates**: Prepare content generation scripts
4. **Media Assets**: Identify required images and media

### Test Writer:
1. **Test Planning**: Create comprehensive test scenarios
2. **Environment Setup**: Prepare testing tools and access
3. **Baseline Metrics**: Document current state for comparison
4. **Automation**: Prepare automated validation scripts

---

**⏰ EXECUTION START TIME: IMMEDIATE**

The clock is ticking on this critical migration. Every agent must begin their preparation phase now while waiting for their coordination window. Success depends on precise timing and flawless handoffs between specialists.

*Studio Producer: Your orchestration is the key to transforming this complex multi-system challenge into a coordinated success.*