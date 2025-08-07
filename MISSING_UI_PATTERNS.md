# Missing UI Patterns & Components Analysis
## Srećno učenje Educational Platform - UX Enhancement Recommendations

Based on the comprehensive UX analysis of the educational franchise website, here are the critical missing CSS patterns and components that should be implemented to create a world-class educational platform.

---

## 1. **Missing CSS Components**

### Toast Notifications System
**Priority: HIGH** - Essential for user feedback
```css
/* Toast notification system for educational feedback */
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 420px;
}

.toast {
  @apply bg-white rounded-lg shadow-xl border-l-4 p-4 mb-3 transform transition-all duration-300;
  animation: toastSlideIn 0.3s ease-out;
}

.toast-success {
  @apply border-l-primary-500 bg-primary-50;
}

.toast-error {
  @apply border-l-warm-500 bg-warm-50;
}

.toast-warning {
  @apply border-l-accent-500 bg-accent-50;
}

.toast-info {
  @apply border-l-secondary-500 bg-secondary-50;
}

@keyframes toastSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Skeleton Loaders for Educational Content
**Priority: HIGH** - Critical for perceived performance
```css
/* Comprehensive skeleton system for educational content */
.skeleton-lesson-card {
  @apply animate-pulse bg-gray-200 rounded-xl p-6 mb-4;
}

.skeleton-lesson-card .skeleton-title {
  @apply h-6 bg-gray-300 rounded-md mb-3 w-3/4;
}

.skeleton-lesson-card .skeleton-description {
  @apply h-4 bg-gray-300 rounded mb-2;
}

.skeleton-lesson-card .skeleton-description:last-child {
  @apply w-1/2;
}

.skeleton-quiz-question {
  @apply animate-pulse bg-gray-200 rounded-lg p-4 mb-4;
}

.skeleton-quiz-options {
  @apply space-y-3;
}

.skeleton-quiz-option {
  @apply h-12 bg-gray-300 rounded-lg;
}

.skeleton-progress-bar {
  @apply h-2 bg-gray-200 rounded-full overflow-hidden;
}

.skeleton-progress-fill {
  @apply h-full bg-gray-300 rounded-full animate-pulse;
  width: 60%;
}
```

### Multi-step Progress Indicators
**Priority: HIGH** - Essential for guided learning
```css
/* Educational progress indicators */
.progress-stepper {
  @apply flex items-center justify-between mb-8 px-4;
}

.progress-step {
  @apply flex flex-col items-center relative;
  flex: 1;
}

.progress-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1.25rem;
  left: calc(50% + 1.5rem);
  right: calc(-50% + 1.5rem);
  height: 2px;
  @apply bg-gray-200;
  z-index: 1;
}

.progress-step.active::after,
.progress-step.completed::after {
  @apply bg-primary-500;
}

.progress-step-circle {
  @apply w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 relative z-10;
  @apply bg-gray-200 text-gray-600;
}

.progress-step.active .progress-step-circle {
  @apply bg-primary-500 text-white;
}

.progress-step.completed .progress-step-circle {
  @apply bg-primary-600 text-white;
}

.progress-step-label {
  @apply text-sm text-gray-600 text-center;
}

.progress-step.active .progress-step-label {
  @apply text-primary-700 font-medium;
}
```

### Loading Button States
**Priority: MEDIUM** - Better user feedback
```css
/* Enhanced button loading states */
.btn-loading {
  position: relative;
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: buttonSpin 1s linear infinite;
}

.btn-loading .btn-text {
  opacity: 0;
}

@keyframes buttonSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Loading states for different button variants */
.btn-primary.btn-loading::after {
  border-top-color: white;
}

.btn-secondary.btn-loading::after {
  border-top-color: white;
}

.btn-outline-primary.btn-loading::after {
  border-top-color: var(--color-primary);
}
```

### Error State Cards
**Priority: MEDIUM** - Improved error handling
```css
/* Educational error states */
.error-state-card {
  @apply card-modern text-center py-12 px-6;
  @apply border-warm-200 bg-warm-50;
}

.error-state-icon {
  @apply w-16 h-16 mx-auto mb-4 text-warm-500;
}

.error-state-title {
  @apply text-xl font-semibold text-warm-700 mb-2;
}

.error-state-message {
  @apply text-warm-600 mb-6;
}

.error-state-actions {
  @apply space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center;
}

/* Network error specific */
.error-network {
  @apply border-gray-200 bg-gray-50;
}

.error-network .error-state-icon {
  @apply text-gray-400;
}

.error-network .error-state-title {
  @apply text-gray-700;
}

.error-network .error-state-message {
  @apply text-gray-600;
}
```

### Empty State Illustrations
**Priority: MEDIUM** - Better UX for empty content
```css
/* Educational empty states */
.empty-state {
  @apply text-center py-16 px-6;
}

.empty-state-icon {
  @apply w-20 h-20 mx-auto mb-6 text-gray-300;
}

.empty-state-title {
  @apply text-2xl font-semibold text-gray-700 mb-2;
}

.empty-state-description {
  @apply text-gray-500 mb-8 max-w-md mx-auto;
}

.empty-state-action {
  @apply btn-primary;
}

/* Specific empty states for educational content */
.empty-lessons {
  @apply bg-primary-50;
}

.empty-lessons .empty-state-icon {
  @apply text-primary-300;
}

.empty-quizzes {
  @apply bg-secondary-50;
}

.empty-quizzes .empty-state-icon {
  @apply text-secondary-300;
}

.empty-achievements {
  @apply bg-accent-50;
}

.empty-achievements .empty-state-icon {
  @apply text-accent-300;
}
```

---

## 2. **Missing Animation Patterns**

### Page Transition System
**Priority: HIGH** - Smooth navigation experience
```css
/* Page transition animations */
.page-transition-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

.page-transition-exit {
  opacity: 1;
}

.page-transition-exit-active {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 300ms, transform 300ms;
}

/* Route-specific transitions */
.lesson-page-enter {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.lesson-page-enter-active {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Scroll-triggered Animations
**Priority: MEDIUM** - Engaging content reveal
```css
/* Scroll-triggered animation utilities */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.scroll-reveal-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-reveal-left.revealed {
  opacity: 1;
  transform: translateX(0);
}

.scroll-reveal-scale {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-reveal-scale.revealed {
  opacity: 1;
  transform: scale(1);
}

/* Stagger delays for lists */
.scroll-reveal-stagger-1 { transition-delay: 0.1s; }
.scroll-reveal-stagger-2 { transition-delay: 0.2s; }
.scroll-reveal-stagger-3 { transition-delay: 0.3s; }
.scroll-reveal-stagger-4 { transition-delay: 0.4s; }
```

### Number Counter Animations
**Priority: MEDIUM** - Engaging statistics
```css
/* Animated counters for statistics */
.counter {
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
}

.counter.counting {
  color: var(--color-primary);
  transform: scale(1.05);
}

/* Counter progress animation */
@keyframes countPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.counter-pulse {
  animation: countPulse 1s ease-in-out;
}
```

### Text Reveal Animations
**Priority: LOW** - Enhanced typography
```css
/* Advanced text reveal animations */
.text-reveal-words {
  overflow: hidden;
}

.text-reveal-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: revealWord 0.6s ease-out forwards;
}

.text-reveal-word:nth-child(1) { animation-delay: 0.1s; }
.text-reveal-word:nth-child(2) { animation-delay: 0.2s; }
.text-reveal-word:nth-child(3) { animation-delay: 0.3s; }
.text-reveal-word:nth-child(4) { animation-delay: 0.4s; }
.text-reveal-word:nth-child(5) { animation-delay: 0.5s; }

@keyframes revealWord {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typewriter effect for educational content */
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--color-primary);
  animation: typewriter 3s steps(30, end), blink 1s infinite step-end 3s;
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  0%, 50% { border-color: var(--color-primary); }
  51%, 100% { border-color: transparent; }
}
```

---

## 3. **Form Enhancement Patterns**

### Floating Label System (Enhanced)
**Priority: HIGH** - Better form UX
```css
/* Enhanced floating label system */
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem 0.75rem 0.5rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  background: white;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-gray-800);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 179, 66, 0.15);
}

.form-label {
  position: absolute;
  left: 0.75rem;
  top: 1rem;
  font-size: 1rem;
  color: var(--color-gray-400);
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  padding: 0 0.25rem;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
}

/* Error state */
.form-group.error .form-input {
  border-color: var(--color-warm);
  box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.15);
}

.form-group.error .form-label {
  color: var(--color-warm);
}

/* Success state */
.form-group.success .form-input {
  border-color: var(--color-primary-500);
}

.form-group.success .form-label {
  color: var(--color-primary-500);
}
```

### Real-time Validation Indicators
**Priority: HIGH** - Immediate feedback
```css
/* Real-time validation system */
.validation-indicator {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.validation-indicator.valid {
  background: var(--color-primary-100);
  color: var(--color-primary-600);
}

.validation-indicator.invalid {
  background: var(--color-warm-100);
  color: var(--color-warm-600);
}

.validation-indicator.checking {
  background: var(--color-gray-100);
  color: var(--color-gray-500);
}

.validation-indicator.checking::after {
  content: '';
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid var(--color-gray-400);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Form validation messages */
.form-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  min-height: 1.25rem;
}

.form-message.error {
  color: var(--color-warm);
}

.form-message.success {
  color: var(--color-primary-600);
}

.form-message.info {
  color: var(--color-secondary-600);
}
```

### Custom Select Dropdowns
**Priority: MEDIUM** - Enhanced select UX
```css
/* Custom select dropdown */
.select-custom {
  position: relative;
  display: block;
}

.select-trigger {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-trigger:hover {
  border-color: var(--color-gray-300);
}

.select-trigger.open {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 179, 66, 0.15);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid var(--color-gray-200);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: var(--shadow-lg);
}

.select-option {
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.select-option:hover {
  background: var(--color-primary-50);
}

.select-option.selected {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-weight: 500;
}
```

### File Upload with Drag-and-Drop
**Priority: MEDIUM** - Modern file upload
```css
/* File upload component */
.file-upload {
  position: relative;
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.file-upload.dragover {
  border-color: var(--color-primary);
  background: var(--color-primary-100);
  transform: scale(1.02);
}

.file-upload input[type="file"] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file-upload-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: var(--color-gray-400);
}

.file-upload:hover .file-upload-icon {
  color: var(--color-primary);
}

.file-upload-text {
  color: var(--color-gray-600);
}

.file-upload:hover .file-upload-text {
  color: var(--color-primary-700);
}

/* File upload progress */
.file-upload-progress {
  margin-top: 1rem;
  background: var(--color-gray-100);
  border-radius: var(--radius-full);
  height: 0.5rem;
  overflow: hidden;
}

.file-upload-progress-bar {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-primary-400) 100%
  );
  transition: width 0.3s ease;
  border-radius: var(--radius-full);
}
```

---

## 4. **Mobile-Specific Patterns**

### Bottom Sheet Modals
**Priority: HIGH** - Mobile-native interactions
```css
/* Bottom sheet modal for mobile */
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 1rem 1rem 0 0;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
  max-height: 80vh;
  overflow-y: auto;
}

.bottom-sheet.open {
  transform: translateY(0);
}

.bottom-sheet-handle {
  width: 2rem;
  height: 0.25rem;
  background: var(--color-gray-300);
  border-radius: var(--radius-full);
  margin: 0.5rem auto;
}

.bottom-sheet-content {
  padding: 0 1rem 2rem;
}

/* Bottom sheet overlay */
.bottom-sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 40;
}

.bottom-sheet-overlay.open {
  opacity: 1;
}

/* Only show on mobile */
@media (min-width: 768px) {
  .bottom-sheet,
  .bottom-sheet-overlay {
    display: none;
  }
}
```

### Swipeable Cards
**Priority: MEDIUM** - Touch-friendly interactions
```css
/* Swipeable card system */
.swipe-card {
  position: relative;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  cursor: grab;
  touch-action: pan-x;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.swipe-card.dragging {
  cursor: grabbing;
  transition: none;
}

.swipe-card.swiped-left {
  transform: translateX(-100%) rotate(-10deg);
  opacity: 0;
}

.swipe-card.swiped-right {
  transform: translateX(100%) rotate(10deg);
  opacity: 0;
}

/* Swipe indicators */
.swipe-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.swipe-indicator.left {
  left: 1rem;
  color: var(--color-warm);
}

.swipe-indicator.right {
  right: 1rem;
  color: var(--color-primary);
}

.swipe-card.swipe-left .swipe-indicator.left {
  opacity: 0.8;
}

.swipe-card.swipe-right .swipe-indicator.right {
  opacity: 0.8;
}
```

### Pull-to-Refresh Indicators
**Priority: LOW** - Native mobile feel
```css
/* Pull-to-refresh component */
.pull-to-refresh {
  position: relative;
  overflow: hidden;
}

.pull-indicator {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}

.pull-indicator.visible {
  top: 20px;
}

.pull-indicator.loading {
  animation: spin 1s linear infinite;
}

.pull-indicator-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

/* Pull states */
.pull-to-refresh.pulling .pull-indicator {
  top: 10px;
}

.pull-to-refresh.can-refresh .pull-indicator {
  top: 20px;
  color: var(--color-primary);
}
```

### Floating Action Buttons
**Priority: MEDIUM** - Quick actions
```css
/* Floating Action Button system */
.fab {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(124, 179, 66, 0.4);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(124, 179, 66, 0.5);
}

.fab:active {
  transform: scale(0.95);
}

/* FAB variants */
.fab-secondary {
  background: var(--color-secondary);
  box-shadow: 0 4px 12px rgba(93, 191, 219, 0.4);
}

.fab-accent {
  background: var(--color-accent);
  color: var(--color-night-800);
  box-shadow: 0 4px 12px rgba(253, 216, 53, 0.4);
}

/* Extended FAB */
.fab-extended {
  border-radius: 2rem;
  padding: 0 1rem;
  width: auto;
  height: 48px;
}

.fab-extended-text {
  margin-left: 0.5rem;
  font-weight: 500;
}

/* FAB menu */
.fab-menu {
  position: relative;
}

.fab-submenu {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom right;
}

.fab-menu.open .fab-submenu {
  opacity: 1;
  transform: scale(1);
}

.fab-submenu-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-gray-700);
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-submenu-item:hover {
  transform: scale(1.05);
}
```

---

## 5. **Educational Content Patterns**

### Quiz Card Layouts
**Priority: HIGH** - Core educational functionality
```css
/* Quiz card system */
.quiz-card {
  @apply card-modern mb-6;
  border-left: 4px solid var(--color-secondary);
}

.quiz-question {
  @apply text-lg font-semibold mb-4 text-gray-800;
}

.quiz-options {
  @apply space-y-3;
}

.quiz-option {
  @apply w-full p-4 text-left rounded-lg border-2 border-gray-200;
  @apply transition-all duration-200 hover:border-gray-300;
  @apply bg-white cursor-pointer;
}

.quiz-option:hover {
  @apply bg-gray-50 border-gray-300;
}

.quiz-option.selected {
  @apply border-primary-500 bg-primary-50;
}

.quiz-option.correct {
  @apply border-primary-500 bg-primary-100 text-primary-800;
}

.quiz-option.incorrect {
  @apply border-warm-500 bg-warm-100 text-warm-800;
}

.quiz-option.disabled {
  @apply pointer-events-none opacity-60;
}

/* Quiz feedback */
.quiz-feedback {
  @apply mt-4 p-4 rounded-lg;
}

.quiz-feedback.correct {
  @apply bg-primary-100 text-primary-800 border border-primary-200;
}

.quiz-feedback.incorrect {
  @apply bg-warm-100 text-warm-800 border border-warm-200;
}

/* Quiz progress */
.quiz-progress {
  @apply flex items-center justify-between mb-6 text-sm text-gray-600;
}

.quiz-progress-bar {
  @apply flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden;
}

.quiz-progress-fill {
  @apply h-full bg-primary-500 transition-all duration-500 ease-out;
  border-radius: inherit;
}
```

### Progress Tracking Bars
**Priority: HIGH** - Essential for learning motivation
```css
/* Comprehensive progress tracking */
.progress-tracker {
  @apply bg-white rounded-xl p-6 shadow-md border border-gray-100;
}

.progress-header {
  @apply flex items-center justify-between mb-4;
}

.progress-title {
  @apply text-lg font-semibold text-gray-800;
}

.progress-percentage {
  @apply text-2xl font-bold text-primary-600;
}

.progress-bar-container {
  @apply relative mb-4;
}

.progress-bar {
  @apply w-full h-3 bg-gray-200 rounded-full overflow-hidden;
}

.progress-fill {
  @apply h-full rounded-full transition-all duration-1000 ease-out;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
}

/* Animated progress fill */
.progress-fill.animated {
  animation: progressFill 2s ease-out;
}

@keyframes progressFill {
  0% {
    width: 0%;
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* Multi-segment progress */
.progress-segments {
  @apply flex gap-1 mb-2;
}

.progress-segment {
  @apply flex-1 h-2 bg-gray-200 rounded-full;
}

.progress-segment.completed {
  @apply bg-primary-500;
}

.progress-segment.current {
  @apply bg-accent-500;
}

/* Progress labels */
.progress-labels {
  @apply flex justify-between text-sm text-gray-600;
}

.progress-milestone {
  @apply flex items-center;
}

.progress-milestone-icon {
  @apply w-4 h-4 mr-1;
}

.progress-milestone.reached .progress-milestone-icon {
  @apply text-primary-500;
}
```

### Achievement Badges
**Priority: MEDIUM** - Gamification elements
```css
/* Achievement badge system */
.achievement-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
  @apply transition-all duration-200 hover:scale-105;
}

.achievement-badge.bronze {
  @apply bg-orange-100 text-orange-800 border border-orange-200;
}

.achievement-badge.silver {
  @apply bg-gray-100 text-gray-800 border border-gray-200;
}

.achievement-badge.gold {
  @apply bg-yellow-100 text-yellow-800 border border-yellow-200;
}

.achievement-badge.diamond {
  @apply bg-blue-100 text-blue-800 border border-blue-200;
}

/* Achievement showcase */
.achievement-showcase {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6;
}

.achievement-card {
  @apply text-center p-4 rounded-lg bg-white shadow-md;
  @apply transition-all duration-200 hover:shadow-lg;
}

.achievement-icon {
  @apply w-12 h-12 mx-auto mb-2;
}

.achievement-card.unlocked .achievement-icon {
  @apply text-primary-500;
}

.achievement-card.locked .achievement-icon {
  @apply text-gray-300;
}

.achievement-title {
  @apply text-sm font-medium mb-1;
}

.achievement-card.unlocked .achievement-title {
  @apply text-gray-800;
}

.achievement-card.locked .achievement-title {
  @apply text-gray-400;
}

.achievement-description {
  @apply text-xs text-gray-500;
}

/* Achievement notification */
.achievement-notification {
  @apply fixed top-4 right-4 bg-white rounded-lg shadow-xl border border-primary-200;
  @apply p-4 max-w-xs z-50 transform transition-all duration-500;
  animation: achievementSlideIn 0.5s ease-out;
}

@keyframes achievementSlideIn {
  from {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

.achievement-notification-content {
  @apply flex items-center;
}

.achievement-notification-icon {
  @apply w-8 h-8 text-primary-500 mr-3;
}

.achievement-notification-text {
  @apply text-sm font-medium text-gray-800;
}
```

### Interactive Timeline Components
**Priority: MEDIUM** - Learning journey visualization
```css
/* Learning timeline */
.learning-timeline {
  @apply relative max-w-3xl mx-auto;
}

.timeline-line {
  @apply absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200;
}

.timeline-item {
  @apply relative pl-16 pb-8;
}

.timeline-marker {
  @apply absolute left-0 top-2 w-12 h-12 rounded-full;
  @apply flex items-center justify-center text-white font-bold;
  @apply bg-gray-400 border-4 border-white shadow-md;
}

.timeline-item.completed .timeline-marker {
  @apply bg-primary-500;
}

.timeline-item.current .timeline-marker {
  @apply bg-accent-500;
  animation: timelinePulse 2s infinite;
}

@keyframes timelinePulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(253, 216, 53, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(253, 216, 53, 0);
  }
}

.timeline-content {
  @apply bg-white rounded-lg shadow-md p-6 border border-gray-100;
}

.timeline-date {
  @apply text-sm text-gray-500 mb-2;
}

.timeline-title {
  @apply text-lg font-semibold text-gray-800 mb-2;
}

.timeline-description {
  @apply text-gray-600;
}

/* Responsive timeline */
@media (max-width: 640px) {
  .timeline-item {
    @apply pl-12;
  }
  
  .timeline-marker {
    @apply w-8 h-8 left-0;
  }
  
  .timeline-line {
    @apply left-4;
  }
}
```

---

## 6. **CMS Indicator Patterns**

### Missing Content Placeholders
**Priority: HIGH** - Better CMS integration
```css
/* Enhanced CMS placeholders */
.cms-placeholder-enhanced {
  @apply cms-placeholder relative;
  min-height: 200px;
  background-image: linear-gradient(
    45deg,
    var(--color-primary-50) 25%,
    transparent 25%,
    transparent 75%,
    var(--color-primary-50) 75%
  );
  background-size: 20px 20px;
}

.cms-placeholder-hero {
  min-height: 400px;
  @apply cms-placeholder-enhanced;
}

.cms-placeholder-hero::before {
  content: "🎓 Hero sekcija se učitava...";
  font-size: 1.5rem;
}

.cms-placeholder-gallery {
  @apply cms-placeholder-enhanced;
  min-height: 300px;
}

.cms-placeholder-gallery::before {
  content: "🖼️ Galerija slika se učitava...";
}

.cms-placeholder-testimonials {
  @apply cms-placeholder-enhanced;
}

.cms-placeholder-testimonials::before {
  content: "💬 Iskustva korisnika se učitavaju...";
}

/* Loading states for CMS content */
.cms-loading {
  position: relative;
  overflow: hidden;
}

.cms-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

### Draft Content Indicators
**Priority: MEDIUM** - Editorial workflow
```css
/* Draft content indicators */
.content-draft {
  position: relative;
  opacity: 0.7;
}

.content-draft::before {
  content: 'DRAFT';
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--color-accent);
  color: var(--color-night-800);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
}

.content-scheduled {
  position: relative;
  opacity: 0.8;
}

.content-scheduled::before {
  content: 'ZAKAZANO';
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--color-secondary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
}

/* Content status badges */
.content-status {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium;
}

.content-status.published {
  @apply bg-primary-100 text-primary-800;
}

.content-status.draft {
  @apply bg-gray-100 text-gray-800;
}

.content-status.scheduled {
  @apply bg-secondary-100 text-secondary-800;
}

.content-status.archived {
  @apply bg-warm-100 text-warm-800;
}
```

---

## 7. **Accessibility Patterns**

### Focus Trap for Modals
**Priority: HIGH** - Essential for accessibility
```css
/* Focus management for modals */
.modal-focus-trap {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-content {
  position: relative;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

/* Focus trap helpers */
.focus-trap-start,
.focus-trap-end {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

/* Enhanced focus styles */
.modal-content *:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Skip Navigation Links
**Priority: HIGH** - Screen reader accessibility
```css
/* Skip navigation */
.skip-nav {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--color-night);
  color: white;
  text-decoration: none;
  border-radius: 0 0 var(--radius-md) 0;
  font-weight: 500;
}

.skip-nav:focus {
  left: 0;
  clip: auto;
  width: auto;
  height: auto;
}

.skip-nav:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### High Contrast Mode Support
**Priority: MEDIUM** - Enhanced accessibility
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-primary: #000000;
    --color-secondary: #000000;
    --color-accent: #ffff00;
    --color-warm: #ff0000;
    --color-gray-200: #808080;
    --color-gray-600: #000000;
  }

  .btn-primary,
  .btn-secondary,
  .btn-accent {
    border: 3px solid currentColor;
  }

  .card-modern {
    border: 2px solid currentColor;
  }

  .form-input {
    border: 2px solid currentColor;
  }

  .progress-bar {
    border: 1px solid currentColor;
  }

  .achievement-badge {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .float-animation,
  .float-delayed {
    animation: none;
  }

  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}
```

---

## 8. **Performance Patterns**

### Image Lazy Loading Placeholders
**Priority: HIGH** - Essential for performance
```css
/* Lazy loading image system */
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background: var(--color-gray-100);
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.lazy-image.loading {
  opacity: 0;
}

.lazy-image.loaded {
  opacity: 1;
}

.lazy-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;
}

.lazy-placeholder-icon {
  width: 3rem;
  height: 3rem;
  color: var(--color-gray-400);
}

/* Blur up loading effect */
.blur-up {
  filter: blur(5px);
  transition: filter 0.3s ease;
}

.blur-up.loaded {
  filter: blur(0);
}

/* Progressive image enhancement */
.progressive-image {
  position: relative;
  overflow: hidden;
}

.progressive-image .image-placeholder {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  transform: scale(1.05);
  transition: opacity 0.3s ease;
}

.progressive-image .image-full {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.progressive-image.loaded .image-placeholder {
  opacity: 0;
}

.progressive-image.loaded .image-full {
  opacity: 1;
}
```

### Content Shimmer Effects
**Priority: MEDIUM** - Better loading states
```css
/* Shimmer effects for content loading */
.shimmer-wrapper {
  position: relative;
  overflow: hidden;
  background: var(--color-gray-100);
  border-radius: var(--radius-md);
}

.shimmer-wrapper::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
  content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Shimmer variants */
.shimmer-text {
  @apply shimmer-wrapper h-4 mb-2;
}

.shimmer-title {
  @apply shimmer-wrapper h-6 mb-4 w-3/4;
}

.shimmer-avatar {
  @apply shimmer-wrapper w-12 h-12 rounded-full;
}

.shimmer-card {
  @apply shimmer-wrapper h-48 mb-4;
}

/* Content skeleton with shimmer */
.skeleton-content {
  padding: 1rem;
}

.skeleton-content .shimmer-title {
  margin-bottom: 1rem;
}

.skeleton-content .shimmer-text:nth-child(2) {
  width: 100%;
}

.skeleton-content .shimmer-text:nth-child(3) {
  width: 80%;
}

.skeleton-content .shimmer-text:nth-child(4) {
  width: 60%;
}
```

---

## Implementation Priority Matrix

### Phase 1 (Immediate - Week 1)
- **HIGH PRIORITY**:
  - Toast notifications system
  - Skeleton loaders for all content types
  - Multi-step progress indicators
  - Form floating label system
  - Bottom sheet modals
  - Quiz card layouts
  - Progress tracking bars

### Phase 2 (Short-term - Week 2-3)
- **MEDIUM PRIORITY**:
  - Page transition system
  - Loading button states
  - Error state cards
  - Custom select dropdowns
  - Achievement badges
  - CMS content indicators
  - Image lazy loading placeholders

### Phase 3 (Long-term - Week 4+)
- **LOW PRIORITY**:
  - Advanced text animations
  - Pull-to-refresh indicators
  - Interactive timeline components
  - Content shimmer effects
  - Advanced accessibility patterns

---

## Implementation Guidelines

### CSS Architecture Integration
- All patterns follow the existing ITCSS structure
- Use CSS custom properties for brand consistency
- Maintain mobile-first responsive approach
- Ensure compatibility with Tailwind CSS classes

### Brand Compliance
- All colors use the existing brand palette
- Animations respect `prefers-reduced-motion`
- Typography follows the established hierarchy
- Focus states use brand-consistent colors

### Performance Considerations
- Use CSS transforms for animations (GPU acceleration)
- Implement progressive enhancement
- Minimize layout thrashing
- Use CSS containment where appropriate

### Accessibility Standards
- WCAG 2.1 AA compliance minimum
- Proper focus management
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

This comprehensive addition to the requirements ensures the educational platform provides a modern, accessible, and engaging user experience that matches current industry standards while maintaining the unique brand identity of "Srećno učenje".