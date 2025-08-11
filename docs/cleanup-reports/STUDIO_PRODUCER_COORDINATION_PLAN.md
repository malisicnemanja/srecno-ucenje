# STUDIO PRODUCER COORDINATION PLAN
## Srećno učenje Educational Franchise System Implementation

---

## 🎯 **MISSION CRITICAL STATUS**

**PROJECT**: Complete cleanup and implementation of Srećno učenje educational franchise system  
**DEADLINE**: 6-day sprint execution  
**STATUS**: IMMEDIATE ACTION REQUIRED - PHASE 1 CLEANUP  

---

## 📊 **CURRENT SITUATION ANALYSIS**

### **Completed Preparatory Work**
✅ **System Architecture**: Centers-Locations-Educators design complete  
✅ **Sanity Schemas**: New franchise schemas created and ready  
✅ **Migration Scripts**: Safe cleanup scripts prepared and configured  
✅ **Implementation Plan**: Detailed 6-week roadmap established  
✅ **Project Configuration**: Sanity project (08ctxj6y) identified  

### **Critical Issues Requiring Immediate Action**
🚨 **Database Bloat**: 46 duplicate/unnecessary items blocking development  
🚨 **PWA Conflicts**: Service worker conflicts affecting development  
🚨 **Navigation Issues**: Broken links and routing problems  
🚨 **Logo Sizing**: Unprofessional 32px logo size  

---

## 🚀 **IMMEDIATE EXECUTION PLAN**

### **PHASE 1: CRITICAL CLEANUP (TODAY)**
**Team Lead**: DevOps Automator  
**Duration**: 2-4 hours  
**Priority**: BLOCKING - Must complete before any other work  

#### **Step 1A: Pre-Cleanup Validation (30 minutes)**
```bash
# Navigate to cleanup directory
cd "/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z"

# Install dependencies if needed
npm install @sanity/client

# Set environment variable for Sanity token
export SANITY_API_TOKEN="your-write-token-here"

# Run validation first
node validate-cleanup.js
```

**Expected Output:**
- Validation report showing 46 items to be cleaned
- Reference analysis for safety verification
- Green light for safe deletion

#### **Step 1B: Execute Safe Cleanup (60 minutes)**
```bash
# Execute main cleanup with confirmations
node safe-sanity-cleanup.js
```

**Interactive Process:**
- Confirm deletion of 13 calculator results ✓
- Confirm deletion of 12 duplicate franchise fields ✓
- Confirm deletion of 3 duplicate about authors ✓
- Confirm deletion of 19 duplicate FAQ items ✓
- Review and clean non-franchise testimonials ✓
- Update location field naming (centerCount → centreCount) ✓

#### **Step 1C: Cleanup Verification (30 minutes)**
```bash
# Verify cleanup success
node validate-cleanup.js

# Check Sanity Studio for clean state
open https://srecnoucenje.sanity.studio/
```

**Success Criteria:**
- 46 items successfully deleted
- No reference errors or orphaned content
- Clean Sanity Studio interface
- Generated cleanup-log.txt with success report

---

### **PHASE 2: FRONTEND CRITICAL FIXES (NEXT 2 HOURS)**
**Team Lead**: Frontend Developer  
**Duration**: 2-3 hours  
**Priority**: HIGH - User experience blockers  

#### **Step 2A: PWA Removal (45 minutes)**
```bash
# Navigate to main project
cd "/Users/nemanjamalisic/Desktop/srecno-ucenje 2"

# Remove PWA configuration
# Remove next-pwa from package.json
# Delete service worker files
# Update next.config.js
# Clear PWA cache configurations
```

#### **Step 2B: Navigation Fixes (45 minutes)**
```bash
# Fix broken navigation links
# Update Header.tsx with correct hrefs
# Fix Footer.tsx routing issues
# Verify all internal links work
# Test mobile navigation
```

#### **Step 2C: Logo Size Fix (30 minutes)**
```bash
# Update logo size from 32px to proper branding size
# Check Header components
# Verify responsive scaling
# Test across all pages
```

#### **Step 2D: CMS-Driven Content Implementation (30 minutes)**
```bash
# Ensure all content pulls from Sanity CMS
# Remove hardcoded text strings
# Verify dynamic content rendering
# Test content updates from Studio
```

---

### **PHASE 3: MIGRATION EXECUTION (NEXT 4 HOURS)**
**Team Lead**: Backend Architect  
**Duration**: 4-6 hours  
**Priority**: HIGH - Core functionality  

#### **Step 3A: Schema Migration (90 minutes)**
```bash
# Deploy new Sanity schemas
# Test schema relationships
# Verify field validations
# Check preview configurations
```

#### **Step 3B: Data Migration (90 minutes)**
```bash
# Migrate existing schools → centers
# Create location-center relationships
# Add sample educator profiles
# Establish program connections
```

#### **Step 3C: Query Optimization (60 minutes)**
```bash
# Implement optimized Sanity queries
# Test performance with new data structure
# Add caching where appropriate
# Document query patterns
```

#### **Step 3D: API Integration (60 minutes)**
```bash
# Update Next.js API routes
# Test data fetching with new structure
# Verify filtering and search functionality
# Check error handling
```

---

### **PHASE 4: VALIDATION & TESTING (FINAL 4 HOURS)**
**Team Lead**: Test Writer Fixer + UX Researcher  
**Duration**: 4-6 hours  
**Priority**: CRITICAL - Quality assurance  

#### **Step 4A: Functionality Testing (90 minutes)**
- All pages load correctly
- Navigation works end-to-end
- Content displays from CMS
- Search and filtering functional
- Mobile responsiveness verified

#### **Step 4B: SEO & Performance (90 minutes)**
- Meta tags properly implemented
- Structured data for local business
- Page load times < 3 seconds
- Lighthouse scores > 90
- Mobile Core Web Vitals passing

#### **Step 4C: User Experience Validation (90 minutes)**
- Parent journey testing
- Franchisee experience validation
- Educator onboarding flow
- Admin CMS usability check

#### **Step 4D: Production Readiness (90 minutes)**
- Build process successful
- No console errors
- All images optimized
- Security headers configured
- Analytics and monitoring active

---

## 🔄 **COORDINATION PROTOCOLS**

### **Communication Structure**
```
#franchise-cleanup-war-room (Primary Channel)
├── #backend-architect (Migration & Database)
├── #frontend-developer (UI & PWA Fixes)
├── #devops-automator (Cleanup & Deployment)
├── #test-writer-fixer (Quality Assurance)
├── #ux-researcher (User Experience)
└── #studio-producer (Orchestration Hub)
```

### **Hourly Check-ins**
- **:00 minutes**: Status update from each team
- **:30 minutes**: Blocker identification and resolution
- **:45 minutes**: Next hour planning and handoffs

### **Escalation Matrix**
- **Level 1**: Team lead handles within expertise
- **Level 2**: Studio Producer coordinates cross-team
- **Level 3**: All-hands problem-solving session
- **Level 4**: Scope reduction and priority reassessment

---

## 🚨 **RISK MANAGEMENT**

### **High-Risk Dependencies**
1. **Sanity Token Access**: Must have write permissions
2. **Data References**: Some items might have unexpected references
3. **PWA Cache**: Service worker might need manual clearing
4. **Migration Complexity**: Data relationships could be complex

### **Contingency Plans**
- **Cleanup Fails**: Manual deletion via Sanity Studio
- **Migration Issues**: Rollback to current state, iterate
- **Performance Problems**: Implement lazy loading and caching
- **Time Overrun**: Prioritize core functionality, defer enhancements

---

## 🎯 **SUCCESS METRICS**

### **Phase 1 Success**
- [ ] 46 duplicate items deleted from Sanity CMS
- [ ] Zero reference errors or orphaned content
- [ ] Clean, organized CMS structure
- [ ] Generated cleanup log with 100% success rate

### **Phase 2 Success**
- [ ] PWA completely removed (no service worker conflicts)
- [ ] All navigation links working correctly
- [ ] Professional logo sizing implemented
- [ ] 100% CMS-driven content (no hardcoded strings)

### **Phase 3 Success**
- [ ] New schema deployed and functional
- [ ] Existing schools migrated to centers
- [ ] Location-center-educator relationships established
- [ ] Optimized queries performing under 500ms

### **Phase 4 Success**
- [ ] All functionality tested and working
- [ ] SEO implementation verified
- [ ] Mobile responsiveness confirmed
- [ ] Production build successful with zero errors

---

## 📞 **IMMEDIATE ACTION ITEMS**

### **For Project Owner/Client**
1. **Provide Sanity Write Token**: Needed for cleanup execution
2. **Backup Confirmation**: Verify recent CMS backup exists
3. **Downtime Authorization**: Approve temporary service interruption if needed
4. **Quality Acceptance**: Review and approve cleanup scope

### **For Studio Producer (YOU)**
1. **Token Configuration**: Set SANITY_API_TOKEN environment variable
2. **Team Mobilization**: Assign team leads to each phase
3. **Progress Monitoring**: Set up real-time tracking dashboard
4. **Risk Mitigation**: Prepare rollback procedures

### **For Development Team**
1. **Environment Setup**: Ensure all tools and dependencies ready
2. **Code Branch**: Create cleanup/migration feature branch
3. **Testing Preparation**: Set up local testing environment
4. **Documentation**: Prepare to document all changes

---

## 🔥 **EXECUTION COMMAND CENTER**

### **Start Cleanup NOW**
```bash
# Set working directory
export CLEANUP_DIR="/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z"
export PROJECT_DIR="/Users/nemanjamalisic/Desktop/srecno-ucenje 2"

# Navigate and execute
cd "$CLEANUP_DIR"
echo "🚀 Starting Phase 1 Cleanup - $(date)"
node validate-cleanup.js
echo "✅ Validation complete. Proceeding with cleanup..."
node safe-sanity-cleanup.js
echo "🎯 Phase 1 Complete - $(date)"
```

**This is it. The cleanup phase starts NOW. Every minute counts in this 6-day sprint to transform Srećno učenje into a professional franchise platform.**

---

*Studio Producer Command: EXECUTE PHASE 1 IMMEDIATELY*  
*Time is critical. Coordinate. Execute. Deliver.*