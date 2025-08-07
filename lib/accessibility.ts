/**
 * Accessibility Utilities for Srećno učenje
 * Comprehensive set of utilities for WCAG AA/AAA compliance
 */

// === COLOR CONTRAST UTILITIES ===

/**
 * Calculate relative luminance according to WCAG 2.1
 * @param r Red value (0-255)
 * @param g Green value (0-255) 
 * @param b Blue value (0-255)
 * @returns Relative luminance (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Convert hex color to RGB
 * @param hex Hex color string (with or without #)
 * @returns RGB object or null if invalid
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 First color (hex)
 * @param color2 Second color (hex)
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG standards
 * @param foreground Foreground color (hex)
 * @param background Background color (hex)
 * @param level 'AA' or 'AAA'
 * @param size 'normal' or 'large' text
 * @returns Whether combination passes standards
 */
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
}

// === BRAND COLOR VALIDATION ===

export const brandColors = {
  sky: '#5DBFDB',
  sun: '#FDD835', 
  grass: '#7CB342',
  heart: '#E53935',
  night: '#3E4C59',
  white: '#FFFFFF',
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9', 
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A'
  }
};

/**
 * Validate all brand color combinations for accessibility
 * @returns Validation report with recommendations
 */
export function validateBrandColorAccessibility(): {
  passing: Array<{ combo: string; ratio: number; level: string }>;
  failing: Array<{ combo: string; ratio: number; recommendation: string }>;
} {
  const passing = [];
  const failing = [];
  
  const textColors = [brandColors.night, brandColors.gray[900], brandColors.white];
  const backgrounds = [
    brandColors.sky, brandColors.sun, brandColors.grass, 
    brandColors.heart, brandColors.white, brandColors.gray[50],
    brandColors.gray[100], brandColors.gray[200]
  ];
  
  for (const text of textColors) {
    for (const bg of backgrounds) {
      const ratio = getContrastRatio(text, bg);
      const combo = `${text} on ${bg}`;
      
      if (ratio >= 4.5) {
        const level = ratio >= 7 ? 'AAA' : 'AA';
        passing.push({ combo, ratio, level });
      } else {
        const recommendation = ratio >= 3 ? 
          'Use for large text only' : 
          'Not recommended for text';
        failing.push({ combo, ratio, recommendation });
      }
    }
  }
  
  return { passing, failing };
}

// === FOCUS MANAGEMENT ===

/**
 * Trap focus within an element (for modals, dialogs)
 * @param element Container element
 * @returns Cleanup function
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };
  
  element.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Get all focusable elements within a container
 * @param container Container element
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');
  
  return Array.from(container.querySelectorAll<HTMLElement>(selector))
    .filter(element => {
      return element.offsetParent !== null && 
             !element.hasAttribute('aria-hidden') &&
             window.getComputedStyle(element).visibility !== 'hidden';
    });
}

/**
 * Move focus to element with announcement
 * @param element Target element
 * @param announcement Optional announcement text
 */
export function moveFocusTo(element: HTMLElement, announcement?: string): void {
  element.focus();
  
  if (announcement) {
    announceToScreenReader(announcement);
  }
}

// === SCREEN READER UTILITIES ===

/**
 * Create or get the live region for announcements
 * @returns Live region element
 */
function getLiveRegion(): HTMLElement {
  let liveRegion = document.getElementById('sr-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'sr-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute !important;
      left: -10000px !important;
      top: auto !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
    `;
    document.body.appendChild(liveRegion);
  }
  
  return liveRegion;
}

/**
 * Announce message to screen readers
 * @param message Message to announce
 * @param priority 'polite' or 'assertive'
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const liveRegion = getLiveRegion();
  liveRegion.setAttribute('aria-live', priority);
  
  // Clear and set message to ensure it's announced
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
}

// === KEYBOARD NAVIGATION UTILITIES ===

/**
 * Handle roving tabindex for component groups (like menus, tabs)
 * @param container Container element
 * @param items Array of navigable items
 * @param activeIndex Currently active index
 * @returns Event handler for keydown
 */
export function createRovingTabIndex(
  container: HTMLElement,
  items: HTMLElement[],
  activeIndex: number
): (e: KeyboardEvent) => void {
  // Set initial tabindex values
  items.forEach((item, index) => {
    item.tabIndex = index === activeIndex ? 0 : -1;
  });
  
  return (e: KeyboardEvent) => {
    let newIndex = activeIndex;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (activeIndex + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (activeIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }
    
    // Update tabindex and focus
    items[activeIndex].tabIndex = -1;
    items[newIndex].tabIndex = 0;
    items[newIndex].focus();
  };
}

// === FORM ACCESSIBILITY UTILITIES ===

/**
 * Associate form field with error message
 * @param field Form field element
 * @param errorElement Error message element
 * @param errorMessage Error message text
 */
export function associateFieldWithError(
  field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  errorElement: HTMLElement,
  errorMessage: string
): void {
  const errorId = `${field.id || field.name}-error`;
  
  errorElement.id = errorId;
  errorElement.textContent = errorMessage;
  errorElement.setAttribute('role', 'alert');
  errorElement.setAttribute('aria-live', 'polite');
  
  field.setAttribute('aria-describedby', errorId);
  field.setAttribute('aria-invalid', 'true');
  
  // Announce error to screen readers
  announceToScreenReader(`Greška u polju ${field.labels?.[0]?.textContent || field.name}: ${errorMessage}`, 'assertive');
}

/**
 * Clear field error state
 * @param field Form field element
 */
export function clearFieldError(
  field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
): void {
  field.removeAttribute('aria-describedby');
  field.removeAttribute('aria-invalid');
}

/**
 * Ensure form has proper labels and associations
 * @param form Form element
 * @returns Validation report
 */
export function validateFormAccessibility(form: HTMLFormElement): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const fields = form.querySelectorAll('input, textarea, select');
  
  fields.forEach(field => {
    const element = field as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    
    // Check for label association
    const hasLabel = element.labels && element.labels.length > 0;
    const hasAriaLabel = element.hasAttribute('aria-label');
    const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Field ${element.name || element.id || 'unnamed'} missing label`);
    }
    
    // Check for required fields having proper indication
    if (element.required) {
      const hasRequiredIndicator = 
        element.getAttribute('aria-required') === 'true' ||
        element.closest('.required') ||
        (element.labels?.[0]?.textContent?.includes('*'));
      
      if (!hasRequiredIndicator) {
        issues.push(`Required field ${element.name || element.id} missing required indicator`);
      }
    }
  });
  
  return {
    valid: issues.length === 0,
    issues
  };
}

// === TOUCH TARGET UTILITIES ===

/**
 * Check if element meets minimum touch target size (44x44px)
 * @param element Element to check
 * @returns Whether element meets requirements
 */
export function meetsTouchTargetSize(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.width >= 44 && rect.height >= 44;
}

/**
 * Get elements that don't meet touch target requirements
 * @param container Container to check within
 * @returns Array of elements that need improvement
 */
export function getInsufficientTouchTargets(container: HTMLElement = document.body): HTMLElement[] {
  const interactiveElements = container.querySelectorAll<HTMLElement>(
    'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"]), [role="button"]'
  );
  
  return Array.from(interactiveElements).filter(element => {
    return !meetsTouchTargetSize(element);
  });
}

// === HEADING HIERARCHY UTILITIES ===

/**
 * Validate heading hierarchy on page
 * @param container Container to check (defaults to document.body)
 * @returns Validation results with issues
 */
export function validateHeadingHierarchy(container: HTMLElement = document.body): {
  valid: boolean;
  issues: string[];
  headings: Array<{ level: number; text: string; element: HTMLElement }>;
} {
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    .map(el => ({
      level: parseInt(el.tagName.charAt(1)),
      text: el.textContent?.trim() || '',
      element: el as HTMLElement
    }));
  
  const issues: string[] = [];
  
  // Check for h1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    issues.push('Page missing h1 heading');
  } else if (h1Count > 1) {
    issues.push(`Page has ${h1Count} h1 headings, should have only one`);
  }
  
  // Check hierarchy gaps
  for (let i = 1; i < headings.length; i++) {
    const current = headings[i];
    const previous = headings[i - 1];
    
    if (current.level > previous.level + 1) {
      issues.push(
        `Heading level gap: ${previous.text} (h${previous.level}) followed by ${current.text} (h${current.level})`
      );
    }
  }
  
  return {
    valid: issues.length === 0,
    issues,
    headings
  };
}

// === SKIP NAVIGATION UTILITIES ===

/**
 * Create skip navigation links
 * @param links Array of skip link configurations
 * @returns Skip navigation container element
 */
export function createSkipNavigation(links: Array<{ href: string; text: string }>): HTMLElement {
  const skipNav = document.createElement('div');
  skipNav.className = 'skip-navigation';
  skipNav.setAttribute('role', 'navigation');
  skipNav.setAttribute('aria-label', 'Brza navigacija');
  
  const skipList = document.createElement('ul');
  skipList.className = 'skip-list';
  
  links.forEach(link => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    
    anchor.href = link.href;
    anchor.textContent = link.text;
    anchor.className = 'skip-link';
    
    // Skip link styles (visually hidden until focused)
    anchor.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--brand-night);
      color: white;
      padding: 8px 12px;
      text-decoration: none;
      border-radius: 4px;
      transition: top 0.3s ease;
      z-index: 1000;
    `;
    
    // Show on focus
    anchor.addEventListener('focus', () => {
      anchor.style.top = '6px';
    });
    
    anchor.addEventListener('blur', () => {
      anchor.style.top = '-40px';
    });
    
    listItem.appendChild(anchor);
    skipList.appendChild(listItem);
  });
  
  skipNav.appendChild(skipList);
  return skipNav;
}

// === IMAGE ACCESSIBILITY ===

/**
 * Validate images for accessibility
 * @param container Container to check within
 * @returns Validation results
 */
export function validateImageAccessibility(container: HTMLElement = document.body): {
  valid: boolean;
  issues: string[];
} {
  const images = Array.from(container.querySelectorAll('img'));
  const issues: string[] = [];
  
  images.forEach((img, index) => {
    // Check for alt attribute
    if (!img.hasAttribute('alt')) {
      issues.push(`Image ${index + 1} missing alt attribute`);
    }
    
    // Check for decorative images
    if (img.alt === '' && !img.hasAttribute('role')) {
      // This might be decorative, but should have role="presentation"
      issues.push(`Image ${index + 1} with empty alt should have role="presentation"`);
    }
    
    // Check for meaningful alt text
    if (img.alt && img.alt.length < 3) {
      issues.push(`Image ${index + 1} has very short alt text: "${img.alt}"`);
    }
  });
  
  return {
    valid: issues.length === 0,
    issues
  };
}

// === COMPREHENSIVE ACCESSIBILITY AUDIT ===

/**
 * Run comprehensive accessibility audit
 * @param container Container to audit (defaults to document.body)
 * @returns Complete audit report
 */
export function runAccessibilityAudit(container: HTMLElement = document.body): {
  score: number;
  colorContrast: ReturnType<typeof validateBrandColorAccessibility>;
  headingHierarchy: ReturnType<typeof validateHeadingHierarchy>;
  imageAccessibility: ReturnType<typeof validateImageAccessibility>;
  touchTargets: HTMLElement[];
  formAccessibility: Array<{ form: HTMLFormElement; validation: ReturnType<typeof validateFormAccessibility> }>;
  recommendations: string[];
} {
  const colorContrast = validateBrandColorAccessibility();
  const headingHierarchy = validateHeadingHierarchy(container);
  const imageAccessibility = validateImageAccessibility(container);
  const touchTargets = getInsufficientTouchTargets(container);
  
  const forms = Array.from(container.querySelectorAll('form'));
  const formAccessibility = forms.map(form => ({
    form,
    validation: validateFormAccessibility(form)
  }));
  
  // Calculate score
  let totalIssues = 0;
  let maxPossibleIssues = 0;
  
  // Weight different categories
  totalIssues += colorContrast.failing.length;
  maxPossibleIssues += colorContrast.passing.length + colorContrast.failing.length;
  
  totalIssues += headingHierarchy.issues.length;
  maxPossibleIssues += Math.max(1, headingHierarchy.headings.length);
  
  totalIssues += imageAccessibility.issues.length;
  maxPossibleIssues += Math.max(1, container.querySelectorAll('img').length);
  
  totalIssues += touchTargets.length;
  maxPossibleIssues += Math.max(1, container.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])').length);
  
  formAccessibility.forEach(({ validation }) => {
    totalIssues += validation.issues.length;
    maxPossibleIssues += Math.max(1, validation.issues.length + 1);
  });
  
  const score = Math.max(0, Math.round((1 - totalIssues / maxPossibleIssues) * 100));
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (colorContrast.failing.length > 0) {
    recommendations.push(`Improve color contrast for ${colorContrast.failing.length} color combinations`);
  }
  
  if (headingHierarchy.issues.length > 0) {
    recommendations.push('Fix heading hierarchy issues');
  }
  
  if (imageAccessibility.issues.length > 0) {
    recommendations.push('Add missing alt text to images');
  }
  
  if (touchTargets.length > 0) {
    recommendations.push(`Increase touch target size for ${touchTargets.length} elements`);
  }
  
  if (formAccessibility.some(f => !f.validation.valid)) {
    recommendations.push('Fix form accessibility issues');
  }
  
  return {
    score,
    colorContrast,
    headingHierarchy,
    imageAccessibility,
    touchTargets,
    formAccessibility,
    recommendations
  };
}

// === LANGUAGE AND SEMANTIC UTILITIES ===

/**
 * Set language attributes properly
 * @param element Element to set language on
 * @param lang Language code (e.g., 'sr', 'sr-RS')
 */
export function setLanguage(element: HTMLElement, lang: string): void {
  element.setAttribute('lang', lang);
}

/**
 * Ensure proper landmark regions
 * @param container Container to check
 * @returns Missing landmarks
 */
export function validateLandmarks(container: HTMLElement = document.body): {
  valid: boolean;
  missing: string[];
  present: string[];
} {
  const requiredLandmarks = ['main', 'navigation', 'contentinfo'];
  const present: string[] = [];
  const missing: string[] = [];
  
  requiredLandmarks.forEach(landmark => {
    const exists = container.querySelector(`[role="${landmark}"], ${landmark}`) ||
                   (landmark === 'contentinfo' && container.querySelector('footer')) ||
                   (landmark === 'navigation' && container.querySelector('nav'));
    
    if (exists) {
      present.push(landmark);
    } else {
      missing.push(landmark);
    }
  });
  
  return {
    valid: missing.length === 0,
    missing,
    present
  };
}