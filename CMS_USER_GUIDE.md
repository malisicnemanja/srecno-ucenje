# 📚 CMS User Guide - Srećno učenje
## Complete Guide to Managing Your Website Content

**Last Updated**: January 2025  
**CMS Platform**: Sanity Studio  
**Difficulty**: Beginner-Friendly  

---

## 🚀 Quick Start

### Accessing Your CMS
1. **Open your browser** and go to: `http://localhost:3001/studio`
2. **Log in** with your Sanity account credentials
3. **You'll see the main dashboard** with all your content options

### First Time Setup
If this is your first time:
1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Contact your developer for access permissions
3. Bookmark the studio URL for easy access

---

## 🏠 Dashboard Overview

When you log in, you'll see the main menu with these sections:

### **Content** 📝
- **Pages** - Edit homepage, about, methodology, etc.
- **Blog Posts** - Manage your blog content
- **Success Stories** - Add student achievements
- **Testimonials** - Customer reviews and feedback
- **FAQ** - Frequently asked questions
- **Books** - Manage your book catalog

### **Settings** ⚙️
- **Site Settings** - Logo, contact info, social media
- **Navigation** - Menu structure and links
- **Franchise Models** - Business packages and pricing

### **Media** 🖼️
- **Images** - All uploaded photos and graphics
- **Documents** - PDFs and downloadable files

---

## 📄 Editing Pages

### How to Edit Any Page

1. **Click "Content"** in the left menu
2. **Click "Pages"** 
3. **Find the page** you want to edit (Homepage, Methodology, etc.)
4. **Click on the page name** to open it

### Page Elements You Can Edit

#### **Hero Section** (Top of page)
- **Title** - Main headline
- **Subtitle** - Description below title
- **Layout** - Choose from 5 different styles:
  - `centered` - Content in center
  - `textLeft` - Text left, image right
  - `textRight` - Image left, text right
  - `fullWidth` - Full width background
  - `split` - Half screen split

- **Animations** - Make text more engaging:
  - **Brush Strokes** - Underline important words
  - **Text Rotation** - Rotate between different words
  - **Colors** - Change animation colors

- **Buttons** - Call-to-action buttons:
  - **Primary Button** - Main action (usually bright color)
  - **Secondary Button** - Secondary action (usually outlined)

#### **Content Sections**
- **Features** - List of benefits or features
- **Statistics** - Numbers that impress visitors
- **Testimonials** - Customer reviews
- **FAQ** - Common questions and answers

#### **SEO Settings** (Important for Google)
- **Meta Title** - Page title for search results
- **Meta Description** - Page description for search results
- **Keywords** - Words people might search for

### Saving Your Changes
- **Auto-save** - Changes save automatically as you type
- **Publish** - Click "Publish" to make changes live
- **Preview** - Use preview to see changes before publishing

---

## 🎨 Customizing Hero Sections

### Choosing a Layout

**Centered** - Best for:
- Landing pages
- Important announcements
- Simple, focused messages

**Text Left** - Best for:
- Feature explanations
- Services descriptions
- When you have a relevant image

**Text Right** - Best for:
- Alternating with Text Left sections
- Visual variety
- Product showcases

**Full Width** - Best for:
- Maximum impact
- Photo backgrounds
- Special announcements

**Split Screen** - Best for:
- Modern, bold design
- Strong visual statements
- Hero sections with video

### Animation Settings

#### **Brush Stroke Animations**
Make certain words stand out with animated underlines:

1. **Enable Brush Strokes** - Turn on/off
2. **Brush Stroke Words** - List words to animate
   - Example: ["learning", "children", "success"]
3. **Color** - Choose color (use brand colors):
   - `#FDD835` - Brand yellow (sun)
   - `#7CB342` - Brand green (grass)  
   - `#5DBFDB` - Brand blue (sky)
4. **Delay** - How long to wait before animation (1000-3000ms)

#### **Text Rotation**
Make titles more dynamic by rotating words:

1. **Enable Text Rotation** - Turn on/off
2. **Title Variants** - List of words to rotate
   - Example: ["amazing", "wonderful", "inspiring", "effective"]
3. **Speed** - How fast to change (2000-5000ms recommended)

#### **Example Configuration**
```
Title: "Create amazing learning experiences"
Title Variants: ["amazing", "inspiring", "joyful", "effective"]
Brush Stroke Words: ["learning", "experiences"]
Animation Color: #FDD835
Rotation Speed: 3000ms
Brush Delay: 1500ms
```

---

## ✏️ Managing Content

### Adding a New Blog Post

1. **Go to Content → Blog Posts**
2. **Click "Create" button**
3. **Select "Blog Post"**
4. **Fill in the information**:
   - **Title** - Your article title
   - **Slug** - URL-friendly version (auto-generated)
   - **Author** - Who wrote it
   - **Published Date** - When to publish
   - **Featured Image** - Main article image
   - **Excerpt** - Short summary
   - **Content** - Full article text
   - **Category** - Choose from existing categories
   - **Tags** - Keywords for the article
   - **SEO Title** - Title for search engines
   - **SEO Description** - Description for search results

5. **Click "Publish"** when ready

### Adding a Success Story

1. **Go to Content → Success Stories**
2. **Click "Create" → "Success Story"**
3. **Fill in details**:
   - **Student Name** - Child's name
   - **Age** - How old they are
   - **Program** - Which program they took
   - **Achievement** - What they accomplished
   - **Story** - Detailed success story
   - **Before/After** - Specific improvements
   - **Parent Quote** - What parents said
   - **Photo** - Student photo (optional)
   - **Metrics** - Specific numbers (reading speed increase, etc.)

4. **Publish** to make it live

### Adding Testimonials

1. **Go to Content → Testimonials**
2. **Click "Create" → "Testimonial"**
3. **Add information**:
   - **Client Name** - Person's name
   - **Role** - Their job/relationship (Parent, Teacher, etc.)
   - **Quote** - What they said
   - **Rating** - Star rating (1-5)
   - **Photo** - Their photo (optional)
   - **Company** - Where they work (if relevant)
   - **Location** - City/country

4. **Publish** when complete

### Managing FAQ

1. **Go to Content → FAQ**
2. **To add new**: Click "Create" → "FAQ"
3. **Fill out**:
   - **Question** - Clear, specific question
   - **Answer** - Detailed, helpful answer
   - **Category** - Group similar questions
   - **Order** - Display order (lower numbers first)
   - **Featured** - Show on homepage?

4. **To edit existing**: Click on any FAQ item

---

## 🖼️ Managing Images

### Uploading New Images

1. **Click on any image field** in your content
2. **Click "Upload"** 
3. **Select image** from your computer
4. **Add description** (important for accessibility)
5. **Add alt text** (describes image for screen readers)

### Image Best Practices

#### **File Sizes**
- **Hero images**: Max 1920x1080px, under 500KB
- **Blog images**: Max 1200x800px, under 300KB  
- **Thumbnails**: Max 600x400px, under 100KB

#### **File Formats**
- **Photos**: Use JPG
- **Graphics/logos**: Use PNG
- **Simple graphics**: Use SVG when possible

#### **Alt Text Tips**
- Describe what's in the image
- Keep it under 125 characters
- Don't start with "Image of..." or "Picture of..."
- Example: "Happy child reading a book in colorful classroom"

---

## ⚙️ Site Settings

### Editing Site Information

1. **Go to Content → Site Settings**
2. **Edit these sections**:

#### **General**
- **Site Name** - "Srećno učenje"
- **Site Description** - Brief description of your business
- **Site Subtitle** - "Metodologija" (appears in logo area)
- **Logo** - Upload your logo image

#### **Contact Information**
- **Phone** - Your phone number
- **Email** - Contact email address
- **Address** - Physical address
- **Working Hours** - When you're available

#### **Social Media**
- **Facebook** - Your Facebook page URL
- **Instagram** - Your Instagram URL  
- **YouTube** - Your YouTube channel
- **LinkedIn** - Your LinkedIn profile

### Navigation Menu

1. **Go to Content → Navigation**
2. **Edit menu items**:
   - **Label** - What visitors see
   - **URL** - Where it links to
   - **Sub-items** - Dropdown menu items
   - **Order** - Menu item order

---

## 📊 Managing Business Content

### Franchise Models

1. **Go to Content → Franchise Models**
2. **Edit or create packages**:
   - **Name** - Package name (Starter, Premium, etc.)
   - **Price** - Investment amount
   - **Description** - What's included
   - **Features** - List of benefits
   - **Territory** - Coverage area
   - **Support** - What support is provided
   - **ROI** - Expected return on investment

### Locations

1. **Go to Content → Locations**
2. **Add/edit centers**:
   - **Name** - Center name
   - **Address** - Full address
   - **Phone** - Local phone number
   - **Email** - Local email
   - **Manager** - Who runs it
   - **Programs** - Available programs
   - **Schedule** - Operating hours

---

## 🎯 SEO Best Practices

### Writing Good Page Titles
- **Keep under 60 characters**
- **Include main keywords**
- **Make it compelling**
- **Example**: "Srećno učenje metodologija - Brzočitanje za decu Novi Sad"

### Writing Meta Descriptions
- **Keep under 155 characters**
- **Include call-to-action**
- **Mention key benefits**
- **Example**: "Revolucionarna metodologija brzočitanja za decu. Naučite vaše dete da čita 5x brže. Besplatni probni čas. Pozovite danas!"

### Choosing Keywords
- **Use words your customers search for**
- **Include location names** (Novi Sad, Beograd)
- **Include service names** (brzočitanje, mentalna aritmetika)
- **Don't stuff keywords** - use them naturally

---

## 🚨 Troubleshooting

### Common Issues

#### **Changes Not Appearing**
- **Wait 2-3 minutes** - Changes can take time to appear
- **Refresh your browser** - Hard refresh (Ctrl+F5)
- **Check if published** - Make sure you clicked "Publish"

#### **Images Not Loading**
- **Check file size** - Should be under 1MB
- **Check format** - Use JPG, PNG, or SVG
- **Wait for upload** - Large files take time

#### **Login Problems**
- **Check URL** - Should be `/studio` at the end
- **Clear cookies** - Clear browser cookies and cache
- **Contact support** - If still having issues

#### **Content Missing**
- **Check publishing status** - Might be draft instead of published
- **Check date settings** - Future dates won't show yet
- **Refresh page** - Simple browser refresh

### Getting Help

#### **Self-Help Resources**
- **This guide** - Complete instructions
- **Sanity docs** - [sanity.io/docs](https://sanity.io/docs)
- **Video tutorials** - Available on Sanity's website

#### **Contact Support**
- **Technical issues** - Contact your developer
- **Content questions** - Refer to this guide
- **New features** - Discuss with your team

---

## 📋 Content Calendar Tips

### Planning Your Content

#### **Blog Posts**
- **Aim for 1-2 posts per month**
- **Topics**: 
  - Educational tips for parents
  - Success stories
  - Methodology explanations
  - Franchise opportunities

#### **Success Stories**
- **Add new stories monthly**
- **Get permission** from parents
- **Include specific metrics** (reading speed improvement)
- **Use real names** (with permission)

#### **Testimonials**
- **Collect regularly** from parents
- **Ask for specific feedback**
- **Include photos** when possible
- **Update old ones** periodically

### Content Ideas

#### **Seasonal Content**
- **Back to school** (August/September)
- **New Year resolutions** (January)
- **Summer programs** (June/July)
- **Holiday learning** (December)

#### **Regular Updates**
- **Location hours** - Update for holidays
- **Pricing** - Keep current
- **Staff** - Update when changes happen
- **Programs** - Add new offerings

---

## 🎊 Congratulations!

You now have everything you need to manage your website content effectively. Remember:

### ✅ **Key Points**
- **Changes are live immediately** once published
- **Always add alt text** to images
- **Write for your customers**, not search engines
- **Keep content fresh** with regular updates
- **Ask for help** when you need it

### 🚀 **Next Steps**
1. **Practice editing** a test page
2. **Add your first blog post**
3. **Update your contact information**
4. **Upload recent photos**
5. **Check everything on mobile**

### 📞 **Support**
If you need help:
- **Check this guide first**
- **Try the troubleshooting section**
- **Contact your development team**
- **Remember**: No question is too small!

**Happy content managing!** 🌟

---

*This guide covers all basic content management needs. For advanced features or custom requirements, please contact your development team.*