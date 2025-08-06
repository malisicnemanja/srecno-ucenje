# TAILWIND TO CUSTOM CSS MAPPING GUIDE

## Project Overview
- **Architecture**: ITCSS with BEM naming conventions
- **Brand Colors**: Sky (#5DBFDB), Sun (#FDD835), Grass (#7CB342), Heart (#E53935), Night (#3E4C59)
- **Prefixes**: c- (components), o- (objects), u- (utilities)

---

## 1. BUTTONS MAPPING

### Existing Button Classes (Already Implemented)
```css
.btn-hero          /* Sun color, Filled→Outline */
.btn-hero-grass    /* Grass variant */
.btn-cta           /* Heart color with scale */
.btn-form          /* Grass, Outline→Filled */
.btn-header        /* Night, Outline→Filled */
.btn-card          /* Subtle hover, no background change */
.btn-footer        /* Ghost→Filled for footers */
```

### Tailwind → Custom Button Mapping
| Tailwind Pattern | Custom Class | Description |
|------------------|--------------|-------------|
| `bg-yellow-400 hover:bg-yellow-500 px-6 py-3` | `btn btn-hero` | Primary hero buttons |
| `bg-green-500 hover:bg-green-600 px-4 py-2` | `btn btn-hero-grass` | Secondary hero buttons |
| `bg-red-500 hover:scale-105 px-6 py-4` | `btn btn-cta` | High-impact CTAs |
| `border-2 border-green-500 hover:bg-green-500` | `btn btn-form` | Form submit buttons |
| `border border-gray-800 hover:bg-gray-800` | `btn btn-header` | Header navigation |
| `text-sm px-3 py-1` | `btn btn-sm` | Small buttons |
| `text-lg px-8 py-4` | `btn btn-lg` | Large buttons |
| `w-full` | `btn btn-block` | Full-width buttons |

---

## 2. LAYOUT MAPPING

### Object Classes (Already Implemented)
```css
/* Container System */
.o-container          /* Main content container */
.o-container--narrow  /* Narrow content width */
.o-container--wide    /* Wide content width */

/* Layout Patterns */
.o-stack             /* Vertical stacking with gap */
.o-stack--xs         /* Extra small gap */
.o-stack--sm         /* Small gap */
.o-stack--lg         /* Large gap */
.o-stack--xl         /* Extra large gap */

.o-cluster           /* Horizontal flex with wrap */
.o-cluster--between  /* Space between items */
.o-cluster--around   /* Space around items */

.o-sidebar           /* Sidebar layout pattern */
.o-sidebar--reverse  /* Reversed sidebar */

.o-cover             /* Hero/cover sections */
.o-cover--centered   /* Centered cover content */

.o-frame             /* Aspect ratio containers */
.o-frame--square     /* 1:1 aspect ratio */
.o-frame--4-3        /* 4:3 aspect ratio */

.o-switcher          /* Responsive flex-to-stack */
.o-center            /* Horizontal centering */
.o-reel              /* Horizontal scroll */
```

### Tailwind → Custom Layout Mapping
| Tailwind Pattern | Custom Class | Description |
|------------------|--------------|-------------|
| `max-w-4xl mx-auto px-4` | `o-container` | Main container |
| `max-w-2xl mx-auto px-4` | `o-container--narrow` | Narrow container |
| `max-w-7xl mx-auto px-4` | `o-container--wide` | Wide container |
| `flex flex-col gap-4` | `o-stack` | Vertical layout |
| `flex flex-col gap-1` | `o-stack--xs` | Tight vertical spacing |
| `flex flex-col gap-8` | `o-stack--lg` | Loose vertical spacing |
| `flex flex-wrap gap-4 items-center` | `o-cluster` | Horizontal cluster |
| `flex justify-between` | `o-cluster--between` | Spaced cluster |
| `grid grid-cols-12 gap-6` | `o-grid o-grid--12` | 12-column grid |
| `grid grid-cols-2 gap-4` | `o-grid o-grid--2` | 2-column grid |
| `aspect-video` | `o-frame` | 16:9 frame |
| `aspect-square` | `o-frame--square` | Square frame |

**Required New Grid Classes:**

```css
/* Grid Objects */
.o-grid {
  display: grid;
  gap: var(--space-md, 1rem);
}

.o-grid--1 { grid-template-columns: 1fr; }
.o-grid--2 { grid-template-columns: repeat(2, 1fr); }
.o-grid--3 { grid-template-columns: repeat(3, 1fr); }
.o-grid--4 { grid-template-columns: repeat(4, 1fr); }
.o-grid--6 { grid-template-columns: repeat(6, 1fr); }
.o-grid--12 { grid-template-columns: repeat(12, 1fr); }

@media (max-width: 768px) {
  .o-grid--2,
  .o-grid--3,
  .o-grid--4,
  .o-grid--6,
  .o-grid--12 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .o-grid--4,
  .o-grid--6,
  .o-grid--12 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 3. CARDS MAPPING

### Component Classes (Need to be Created)
```css
/* Base Card */
.c-card {
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-card);
  transition: all 0.3s var(--ease-smooth);
}

/* Card Variants */
.c-card--elevated {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.c-card--bordered {
  border: 2px solid var(--border-light);
  box-shadow: none;
}

.c-card--hover:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.c-card--interactive {
  cursor: pointer;
  user-select: none;
}

.c-card--interactive:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.c-card--interactive:active {
  transform: translateY(0);
}

/* Card Elements */
.c-card__header {
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-light);
}

.c-card__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.c-card__subtitle {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.c-card__content {
  color: var(--text-primary);
}

.c-card__footer {
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border-light);
}
```

### Tailwind → Custom Card Mapping
| Tailwind Pattern | Custom Class | Description |
|------------------|--------------|-------------|
| `bg-white rounded-lg p-6 shadow-md` | `c-card` | Basic card |
| `bg-white rounded-lg p-6 shadow-lg hover:shadow-xl` | `c-card c-card--hover` | Hover effect card |
| `bg-white rounded-lg p-6 border border-gray-200` | `c-card c-card--bordered` | Bordered card |
| `bg-white rounded-lg p-6 shadow-xl transform -translate-y-2` | `c-card c-card--elevated` | Elevated card |

---

## 4. FORMS MAPPING

### Component Classes (Need to be Created)
```css
/* Form Wrapper */
.c-form {
  max-width: 500px;
  margin: 0 auto;
}

.c-form--wide {
  max-width: 800px;
}

.c-form--narrow {
  max-width: 400px;
}

/* Form Groups */
.c-form__group {
  margin-bottom: var(--space-lg);
}

.c-form__group--inline {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

/* Form Labels */
.c-form__label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-size: var(--text-sm);
}

.c-form__label--required::after {
  content: ' *';
  color: var(--color-error);
}

/* Form Inputs */
.c-form__input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--text-base);
  background: var(--bg-surface);
  transition: all 0.3s var(--ease-smooth);
}

.c-form__input:focus {
  outline: none;
  border-color: var(--brand-sky);
  box-shadow: 0 0 0 3px rgba(93, 191, 219, 0.1);
}

.c-form__input--error {
  border-color: var(--brand-heart);
}

.c-form__input--success {
  border-color: var(--brand-grass);
}

/* Textarea */
.c-form__textarea {
  resize: vertical;
  min-height: 120px;
}

/* Select */
.c-form__select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}

/* Helper Text */
.c-form__helper {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

/* Error Text */
.c-form__error {
  font-size: var(--text-xs);
  color: var(--brand-heart);
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.c-form__error::before {
  content: '⚠';
  font-size: var(--text-sm);
}

/* Success Text */
.c-form__success {
  font-size: var(--text-xs);
  color: var(--brand-grass);
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.c-form__success::before {
  content: '✓';
  font-size: var(--text-sm);
}
```

### Tailwind → Custom Form Mapping
| Tailwind Pattern | Custom Class | Description |
|------------------|--------------|-------------|
| `w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2` | `c-form__input` | Text input |
| `w-full px-3 py-2 border border-gray-300 rounded-md resize-none` | `c-form__input c-form__textarea` | Textarea |
| `block text-sm font-medium text-gray-700 mb-1` | `c-form__label` | Form label |
| `text-sm text-red-600 mt-1` | `c-form__error` | Error message |
| `text-sm text-gray-500 mt-1` | `c-form__helper` | Helper text |
| `mb-4` | `c-form__group` | Form group spacing |

---

## 5. TYPOGRAPHY MAPPING

### Utility Classes (Already Implemented)
The project already has comprehensive typography utilities. Here's the mapping:

| Tailwind Class | Custom Class | Description |
|----------------|--------------|-------------|
| `text-xs` | `u-text-xs` | Extra small text |
| `text-sm` | `u-text-sm` | Small text |
| `text-base` | `u-text-base` | Base text size |
| `text-lg` | `u-text-lg` | Large text |
| `text-xl` | `u-text-xl` | Extra large text |
| `text-2xl` | `u-text-2xl` | 2X large text |
| `text-3xl` | `u-text-3xl` | 3X large text |
| `text-4xl` | `u-text-4xl` | 4X large text |
| `font-light` | `u-font-light` | Light weight |
| `font-normal` | `u-font-normal` | Normal weight |
| `font-medium` | `u-font-medium` | Medium weight |
| `font-semibold` | `u-font-semibold` | Semi-bold weight |
| `font-bold` | `u-font-bold` | Bold weight |
| `text-left` | `u-text-left` | Left alignment |
| `text-center` | `u-text-center` | Center alignment |
| `text-right` | `u-text-right` | Right alignment |

**Required Heading Classes:**

```css
/* Heading Utilities */
.u-h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.u-h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.u-h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.u-h4 {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.u-h5 {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.u-h6 {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}
```

---

## 6. SPACING MAPPING

### Utility Classes (Already Implemented)
The spacing utilities are comprehensive. Key mappings:

| Tailwind Class | Custom Class | Description |
|----------------|--------------|-------------|
| `p-1` | `u-p-xs` | Extra small padding |
| `p-2` | `u-p-sm` | Small padding |
| `p-4` | `u-p-md` | Medium padding |
| `p-6` | `u-p-lg` | Large padding |
| `p-8` | `u-p-xl` | Extra large padding |
| `m-1` | `u-m-xs` | Extra small margin |
| `m-2` | `u-m-sm` | Small margin |
| `m-4` | `u-m-md` | Medium margin |
| `m-6` | `u-m-lg` | Large margin |
| `m-8` | `u-m-xl` | Extra large margin |
| `gap-4` | `u-gap-md` | Medium gap |
| `space-y-4` | `u-space-y-md` | Vertical spacing |

**Required Gap and Space Utilities:**

```css
/* Gap Utilities */
.u-gap-xs { gap: var(--space-xs) !important; }
.u-gap-sm { gap: var(--space-sm) !important; }
.u-gap-md { gap: var(--space-md) !important; }
.u-gap-lg { gap: var(--space-lg) !important; }
.u-gap-xl { gap: var(--space-xl) !important; }

/* Space Between Children */
.u-space-y-xs > * + * { margin-top: var(--space-xs) !important; }
.u-space-y-sm > * + * { margin-top: var(--space-sm) !important; }
.u-space-y-md > * + * { margin-top: var(--space-md) !important; }
.u-space-y-lg > * + * { margin-top: var(--space-lg) !important; }
.u-space-y-xl > * + * { margin-top: var(--space-xl) !important; }

.u-space-x-xs > * + * { margin-left: var(--space-xs) !important; }
.u-space-x-sm > * + * { margin-left: var(--space-sm) !important; }
.u-space-x-md > * + * { margin-left: var(--space-md) !important; }
.u-space-x-lg > * + * { margin-left: var(--space-lg) !important; }
.u-space-x-xl > * + * { margin-left: var(--space-xl) !important; }
```

---

## 7. COLORS MAPPING

### Brand Color Utilities (Need to be Created)
```css
/* Background Colors */
.u-bg-sky { background-color: var(--brand-sky) !important; }
.u-bg-sun { background-color: var(--brand-sun) !important; }
.u-bg-grass { background-color: var(--brand-grass) !important; }
.u-bg-heart { background-color: var(--brand-heart) !important; }
.u-bg-night { background-color: var(--brand-night) !important; }

.u-bg-sky-light { background-color: var(--brand-sky-light) !important; }
.u-bg-sun-light { background-color: var(--brand-sun-light) !important; }
.u-bg-grass-light { background-color: var(--brand-grass-light) !important; }
.u-bg-heart-light { background-color: var(--brand-heart-light) !important; }
.u-bg-night-light { background-color: var(--brand-night-light) !important; }

/* Text Colors */
.u-text-sky { color: var(--brand-sky) !important; }
.u-text-sun { color: var(--brand-sun) !important; }
.u-text-grass { color: var(--brand-grass) !important; }
.u-text-heart { color: var(--brand-heart) !important; }
.u-text-night { color: var(--brand-night) !important; }

/* Border Colors */
.u-border-sky { border-color: var(--brand-sky) !important; }
.u-border-sun { border-color: var(--brand-sun) !important; }
.u-border-grass { border-color: var(--brand-grass) !important; }
.u-border-heart { border-color: var(--brand-heart) !important; }
.u-border-night { border-color: var(--brand-night) !important; }
```

### Tailwind → Custom Color Mapping
| Tailwind Class | Custom Class | Description |
|----------------|--------------|-------------|
| `bg-blue-500` | `u-bg-sky` | Sky background |
| `bg-yellow-400` | `u-bg-sun` | Sun background |
| `bg-green-500` | `u-bg-grass` | Grass background |
| `bg-red-500` | `u-bg-heart` | Heart background |
| `bg-gray-800` | `u-bg-night` | Night background |
| `text-blue-500` | `u-text-sky` | Sky text |
| `text-yellow-400` | `u-text-sun` | Sun text |
| `text-green-500` | `u-text-grass` | Grass text |
| `text-red-500` | `u-text-heart` | Heart text |
| `text-gray-800` | `u-text-night` | Night text |

---

## IMPLEMENTATION PRIORITY

1. **HIGH PRIORITY** - Missing classes that need to be created:
   - Grid objects (`o-grid--1` through `o-grid--12`)
   - Card components (complete `c-card` system)
   - Form components (complete `c-form` system)
   - Heading utilities (`u-h1` through `u-h6`)
   - Brand color utilities (`u-bg-sky`, `u-text-sky`, etc.)
   - Gap and spacing utilities (`u-gap-*`, `u-space-*`)

2. **MEDIUM PRIORITY** - Enhancements to existing systems:
   - Additional button variants
   - More layout object modifiers
   - Enhanced typography scales

3. **LOW PRIORITY** - Nice-to-have additions:
   - Animation utilities
   - Advanced grid modifiers
   - Complex layout patterns

## USAGE EXAMPLES

### Before (Tailwind)
```jsx
<div className="max-w-4xl mx-auto px-4">
  <div className="grid grid-cols-3 gap-6">
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Card Title</h3>
      <p className="text-gray-600 mb-4">Card content here</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Learn More
      </button>
    </div>
  </div>
</div>
```

### After (Custom CSS)
```jsx
<div className="o-container">
  <div className="o-grid o-grid--3">
    <div className="c-card c-card--hover">
      <h3 className="c-card__title">Card Title</h3>
      <p className="c-card__content u-text-secondary u-m-b-md">Card content here</p>
      <button className="btn btn-hero-grass">Learn More</button>
    </div>
  </div>
</div>
```

This mapping provides a complete transition path from Tailwind to the custom ITCSS/BEM architecture while maintaining the brand identity and improving maintainability.