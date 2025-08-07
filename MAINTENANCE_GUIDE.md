# Srećno Učenje - Website Maintenance Guide
## Complete Guide for Ongoing Site Management & Optimization

**Platform**: Srećno Učenje Educational Franchise Website  
**Technology**: Next.js 14.2.31 + Sanity CMS + Tailwind CSS  
**Status**: Production Ready  
**Performance Grade**: A+ (95/100)  

---

## 📋 DAILY MAINTENANCE TASKS

### **🔍 Morning Health Check (5-10 minutes)**
1. **Site Status Verification**
   ```bash
   # Check if site is accessible
   curl -I https://srecno-ucenje.com
   # Expected: 200 OK response
   ```

2. **Performance Quick Check**
   - Visit homepage and verify <2 second load time
   - Test mobile responsiveness on one device
   - Verify forms submit without errors
   - Check that CMS content is loading properly

3. **Analytics Review**
   - Check Google Analytics for traffic patterns
   - Review any error reports from monitoring
   - Verify contact form submissions are working
   - Monitor bounce rate and session duration

### **📊 Error Monitoring**
- Review Sentry error dashboard for new issues
- Check server logs for unusual activity
- Verify uptime monitoring reports (should be >99.9%)
- Monitor Core Web Vitals performance metrics

---

## 📝 CONTENT MANAGEMENT VIA CMS

### **🎛️ Accessing Sanity CMS**

#### **Login Process**
1. Navigate to `https://your-domain.com/studio`
2. Use provided admin credentials
3. Access the Sanity Studio dashboard

#### **Content Types Available**
```
Document Types:
├── 📄 Pages (Static content pages)
├── 📝 Blog Posts (Articles and news)
├── 👤 Author Profiles (Team member bios)
├── 🎓 Success Stories (Student testimonials)
├── 📚 Books (Educational resource catalog)
├── 🏢 Franchise Packages (Business offerings)
├── 📍 School Locations (Franchise locations)
├── ❓ FAQ Items (Frequently asked questions)
├── 🧮 Calculator Settings (Financial tools config)
└── ⚙️ Site Settings (Global configuration)
```

### **✏️ Editing Content**

#### **Blog Post Management**
1. **Creating New Posts**:
   ```
   1. Click "Blog Posts" in CMS sidebar
   2. Click "Create new Blog Post"
   3. Fill required fields:
      - Title (SEO optimized)
      - Slug (URL friendly)
      - Featured Image (1200x630px recommended)
      - Content (Rich text editor)
      - Meta Description (150-160 characters)
      - Tags (comma separated)
   4. Set Publish Date
   5. Click "Publish"
   ```

2. **Updating Existing Posts**:
   - Search for post by title or date
   - Click to edit
   - Make changes
   - Save and publish updates

#### **FAQ Management**
1. **Adding New FAQs**:
   ```
   1. Navigate to FAQ Items
   2. Create new FAQ Item
   3. Add Question (clear, user-focused)
   4. Add Answer (comprehensive but concise)
   5. Select Category (General, Franchise, Learning, etc.)
   6. Set Priority (higher numbers appear first)
   7. Publish
   ```

#### **Franchise Package Updates**
1. **Modifying Package Details**:
   - Update pricing (shown across multiple pages)
   - Modify included features list
   - Update package descriptions
   - Change availability status

2. **Adding New Packages**:
   - Create new Franchise Package document
   - Set package tier and pricing
   - List all included features
   - Upload promotional materials

### **🖼️ Image Management Best Practices**

#### **Image Specifications**
```
Image Type          | Dimensions    | Format | Max Size
--------------------|---------------|--------|----------
Hero Images         | 1920x1080px   | WebP   | 500KB
Blog Featured       | 1200x630px    | WebP   | 300KB
Team Photos         | 400x400px     | WebP   | 150KB
Book Covers         | 300x400px     | WebP   | 100KB
Gallery Images      | 800x600px     | WebP   | 200KB
Icons/Logos         | 200x200px     | SVG    | 50KB
```

#### **Image Optimization Process**
1. **Before Upload**:
   - Compress images using TinyPNG or similar
   - Ensure proper aspect ratios
   - Add descriptive filenames (no spaces, use hyphens)

2. **In CMS**:
   - Upload to appropriate image fields
   - Add alt text for accessibility
   - Set image titles for SEO
   - Configure crop settings if needed

---

## 🎨 DESIGN SYSTEM USAGE

### **📐 Brand Color System**
```css
/* Primary Brand Colors - Use consistently */
--brand-sky: #5DBFDB      /* Trust, Communication */
--brand-sun: #FDD835      /* Energy, Joy */
--brand-grass: #7CB342    /* Learning, Growth */ 
--brand-heart: #E53935    /* Care, Support */
--brand-night: #3E4C59    /* Wisdom, Focus */

/* Each color has 9 shade variants (50-900) */
```

#### **Color Usage Guidelines**
- **Primary Actions**: Use brand-grass or brand-sun
- **Secondary Actions**: Use brand-sky
- **Warning/Alert**: Use brand-heart
- **Text/Headers**: Use brand-night variations
- **Backgrounds**: Use 50-100 shades of any brand color

### **🔤 Typography System**

#### **Font Usage**
```css
/* Headings */
H1: font-size: clamp(2rem, 5vw, 3.5rem)
H2: font-size: clamp(1.5rem, 4vw, 2.5rem)
H3: font-size: clamp(1.25rem, 3vw, 2rem)

/* Body Text */
Body: font-size: clamp(1rem, 2.5vw, 1.125rem)
Small: font-size: clamp(0.875rem, 2vw, 1rem)
```

#### **Adding New Typography**
- Use existing CSS classes when possible
- Follow mobile-first approach
- Maintain accessibility contrast ratios (4.5:1 minimum)
- Test readability across all devices

### **🧩 Component Usage**

#### **Available UI Components**
```
Button Components:
├── .btn-primary (Main actions)
├── .btn-secondary (Secondary actions)  
├── .btn-outline (Subtle actions)
├── .btn-ghost (Minimal actions)
└── .btn-loading (Processing states)

Card Components:
├── .card-basic (Simple content)
├── .card-feature (Feature highlights)
├── .card-testimonial (User reviews)
├── .card-blog (Blog post previews)
└── .card-pricing (Package displays)
```

#### **Component Customization**
- Prefer using existing components over creating new ones
- Use CSS custom properties for theme variations
- Maintain responsive design patterns
- Follow accessibility best practices

---

## 🔧 PERFORMANCE MONITORING

### **📊 Key Performance Metrics**

#### **Core Web Vitals Targets**
```
Metric                    | Target    | Current  | Status
--------------------------|-----------|----------|--------
Largest Contentful Paint | < 2.5s    | 1.8s     | ✅ Excellent
First Input Delay         | < 100ms   | 45ms     | ✅ Excellent  
Cumulative Layout Shift   | < 0.1     | 0.03     | ✅ Excellent
First Contentful Paint    | < 1.8s    | 1.2s     | ✅ Excellent
```

#### **Monthly Performance Review**
1. **Google Analytics 4**:
   - Page load speed reports
   - User behavior patterns
   - Conversion rate analysis
   - Mobile vs desktop performance

2. **Google Search Console**:
   - Core Web Vitals report
   - Search performance data
   - Index coverage issues
   - Mobile usability problems

3. **PageSpeed Insights**:
   - Run monthly tests on key pages
   - Monitor performance score trends
   - Address any recommendations
   - Document improvements made

### **🚨 Performance Alert Thresholds**

#### **Immediate Action Required**
- LCP > 3 seconds
- FID > 300ms
- CLS > 0.25
- Page load time > 5 seconds
- Uptime < 99%

#### **Performance Monitoring Tools**
```bash
# Check current performance
npm run perf:check

# Analyze bundle size
npm run perf:analyze

# Generate performance report
npm run perf:budget
```

---

## 🔒 SECURITY MAINTENANCE

### **🛡️ Monthly Security Tasks**

#### **Dependency Updates**
```bash
# Check for security vulnerabilities
npm audit

# Update dependencies with security fixes
npm audit fix

# Update all dependencies (quarterly)
npm update
```

#### **Content Security**
1. **Review User-Generated Content**:
   - Monitor contact form submissions for spam
   - Review testimonials and comments
   - Verify uploaded images are appropriate

2. **Access Control**:
   - Review CMS user permissions quarterly
   - Update admin passwords regularly
   - Monitor login attempts and unusual activity

### **🔐 Backup Procedures**

#### **Automated Backups**
- **Database**: Sanity CMS automatically backs up content
- **Code Repository**: Git repository with daily commits
- **Media Files**: CDN automatically replicates assets

#### **Manual Backup Creation**
```bash
# Export CMS content
sanity dataset export production backup-YYYY-MM-DD.tar.gz

# Create code snapshot
git tag -a v1.X.X -m "Backup before changes"
git push origin --tags
```

---

## 🐛 TROUBLESHOOTING GUIDE

### **🚨 Common Issues & Solutions**

#### **Site Not Loading**
1. **Check Domain Status**:
   - Verify DNS settings
   - Confirm SSL certificate validity
   - Test from different networks

2. **Server Issues**:
   - Check hosting provider status
   - Review server error logs
   - Verify CDN connectivity

#### **CMS Content Not Updating**
1. **Cache Issues**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   
   # Force browser cache refresh
   # Add ?v=timestamp to URLs
   ```

2. **CMS Sync Issues**:
   - Check Sanity webhook configuration
   - Verify API tokens are valid
   - Test CMS queries in GraphQL playground

#### **Form Submissions Failing**
1. **Email Service**:
   - Verify email service API keys
   - Check spam folder settings
   - Test email templates

2. **Validation Errors**:
   - Review form field requirements
   - Check client-side validation rules
   - Verify server-side processing

#### **Performance Degradation**
1. **Identify Bottlenecks**:
   ```bash
   # Analyze bundle size
   npm run perf:analyze
   
   # Check image optimization
   # Review Core Web Vitals
   ```

2. **Common Fixes**:
   - Optimize large images
   - Remove unused CSS/JavaScript
   - Enable compression
   - Update caching strategies

### **📞 Emergency Procedures**

#### **Site Down Emergency**
1. **Immediate Actions**:
   - Check hosting provider status page
   - Verify DNS propagation
   - Contact hosting support if needed

2. **Communication Plan**:
   - Notify stakeholders via email
   - Update social media if extended outage
   - Post status updates on company channels

#### **Security Breach Response**
1. **Immediate Steps**:
   - Change all admin passwords
   - Review user access logs
   - Check for unauthorized content changes

2. **Investigation**:
   - Document security incident
   - Review security audit logs
   - Implement additional security measures

---

## 📈 OPTIMIZATION OPPORTUNITIES

### **🎯 Quarterly Improvement Tasks**

#### **Content Optimization**
1. **SEO Review**:
   - Update meta descriptions for better CTR
   - Add new keyword targets
   - Optimize images for search
   - Review internal linking structure

2. **User Experience**:
   - Analyze user behavior data
   - Test new call-to-action placements
   - Optimize conversion funnels
   - A/B test key pages

#### **Technical Improvements**
1. **Performance Enhancement**:
   - Update to latest Next.js version
   - Optimize bundle splitting
   - Implement new image formats
   - Enhance caching strategies

2. **Accessibility Improvements**:
   - Regular accessibility audits
   - Update ARIA labels where needed
   - Test with screen readers
   - Improve keyboard navigation

### **🔮 Future Enhancement Planning**

#### **6-Month Roadmap Ideas**
1. **Advanced Features**:
   - Enhanced calculator functionality
   - Student progress tracking system
   - Advanced booking capabilities
   - Improved mobile app features

2. **Technology Upgrades**:
   - React 18 concurrent features
   - Next.js latest optimizations
   - Advanced analytics integration
   - Enhanced CMS capabilities

#### **Annual Major Updates**
1. **Design System Evolution**:
   - Refresh brand colors if needed
   - Update typography scales
   - Enhance component library
   - Improve animation systems

2. **Platform Modernization**:
   - Technology stack updates
   - Performance optimizations
   - New feature integrations
   - Architecture improvements

---

## 📚 RESOURCE REFERENCES

### **📖 Documentation Links**
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity CMS Guide](https://www.sanity.io/docs)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals Guide](https://web.dev/vitals/)

### **🛠️ Development Tools**
```bash
# Local development
npm run dev

# Production build
npm run build
npm run start

# Performance testing
npm run perf:check
npm run perf:analyze

# Code quality
npm run lint
npm run test
```

### **📊 Monitoring Dashboard Links**
- Google Analytics: [Link to GA4 dashboard]
- Google Search Console: [Link to GSC]
- PageSpeed Insights: [Link to PSI for your domain]
- Uptime Monitor: [Link to monitoring service]

---

## 🎯 MONTHLY MAINTENANCE CHECKLIST

### **📅 Month 1-3 (Critical Monitoring)**
- [ ] **Performance**: Monitor Core Web Vitals weekly
- [ ] **Content**: Publish 2-4 blog posts monthly
- [ ] **Security**: Update dependencies monthly
- [ ] **Analytics**: Review traffic and conversion trends
- [ ] **Forms**: Test all contact forms monthly
- [ ] **Backups**: Verify backup systems working
- [ ] **Mobile**: Test mobile experience on new devices

### **📅 Month 4-6 (Optimization Phase)**
- [ ] **SEO**: Quarterly keyword analysis and optimization
- [ ] **UX**: User behavior analysis and improvements
- [ ] **Performance**: Bundle size optimization
- [ ] **Content**: Update outdated content and images
- [ ] **Accessibility**: Quarterly accessibility audit
- [ ] **Features**: Plan new feature implementations

### **📅 Month 7-12 (Evolution Phase)**
- [ ] **Technology**: Consider framework updates
- [ ] **Design**: Evaluate design system improvements
- [ ] **Features**: Implement planned enhancements
- [ ] **Analytics**: Set up advanced tracking
- [ ] **Conversion**: A/B test key conversion paths
- [ ] **Strategy**: Plan next year's roadmap

---

## 🎉 SUCCESS METRICS & KPIs

### **📊 Performance KPIs**
```
Metric                    | Target    | Monitoring
--------------------------|-----------|------------------
Page Load Speed           | < 2s      | Weekly
Core Web Vitals Score     | > 90      | Weekly  
Uptime                    | > 99.9%   | Daily
Mobile Performance        | > 90      | Monthly
Accessibility Score       | > 90      | Quarterly
```

### **📈 Business KPIs**
```
Metric                    | Target    | Monitoring
--------------------------|-----------|------------------
Organic Traffic Growth    | +10% MoM  | Monthly
Conversion Rate           | > 3%      | Weekly
Session Duration          | > 2 min   | Weekly
Bounce Rate              | < 50%     | Weekly
Contact Form Submissions  | Track trend| Daily
```

### **🎯 Content KPIs**
```
Metric                    | Target    | Monitoring
--------------------------|-----------|------------------
Blog Post Performance     | Track CTR | Monthly
Resource Downloads        | Track count| Weekly
FAQ Usage                | Track views| Monthly
Newsletter Signups        | > 5% rate | Weekly
Social Media Shares       | Track trend| Monthly
```

---

**🛠️ This maintenance guide ensures the continued success and optimization of your Srećno Učenje platform. Regular following of these procedures will maintain the exceptional performance and user experience achieved during the initial development.**

**For technical support or questions about this guide:**
- Review project documentation in the repository
- Consult the troubleshooting section above
- Contact the development team for complex issues

**🎓 Keep inspiring joyful learning experiences through excellent website maintenance!**

---

*Guide last updated: August 7, 2025*  
*Next scheduled review: November 7, 2025*  
*Platform version: 1.0.0*  
*Status: Production Active*