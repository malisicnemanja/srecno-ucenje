# Mobile Experience Guidelines
## Srećno učenje - Educational Platform

### Overview
This document outlines the comprehensive mobile experience guidelines for the Srećno učenje educational platform. Our mobile-first approach ensures that parents and educators have an exceptional experience when browsing on mobile devices.

## Core Principles

### 1. Touch-First Design
- **Minimum Touch Target**: 44x44px for all interactive elements
- **Thumb-Friendly Navigation**: Important actions within thumb reach zones
- **Gesture Support**: Swipe, pinch, pull-to-refresh, and long-press interactions
- **Haptic Feedback**: Light feedback for interactions (iOS/Android)

### 2. Performance Optimization
- **60fps Animations**: Smooth scrolling and transitions
- **Lazy Loading**: Images and content load as needed
- **Network Awareness**: Optimize for slow connections (2G/3G)
- **Battery Efficiency**: Minimize background processing

### 3. Native-Like Experience
- **PWA Features**: Installable app with offline support
- **Safe Area Handling**: iPhone X+ notch and Android gesture navigation
- **Orientation Support**: Smooth landscape/portrait transitions
- **Keyboard Handling**: Proper viewport adjustments

## Implementation Details

### Mobile Utilities (`/lib/mobile-utils.ts`)

#### Device Detection
```typescript
import { DeviceDetection } from '@/lib/mobile-utils'

// Check device types
DeviceDetection.isIOS()      // iOS devices
DeviceDetection.isAndroid()  // Android devices  
DeviceDetection.isMobile()   // Mobile devices
DeviceDetection.isTablet()   // Tablet devices
```

#### Viewport Management
```typescript
import { ViewportUtils } from '@/lib/mobile-utils'

// Handle viewport changes
ViewportUtils.setCSSViewportHeight()
ViewportUtils.handleViewportChange(callback)
ViewportUtils.isKeyboardOpen()
```

#### Touch Optimization
```typescript
import { TouchUtils } from '@/lib/mobile-utils'

// Optimize touch interactions
TouchUtils.optimizeTouchTargets()
TouchUtils.addHapticFeedback('light')
TouchUtils.preventDoubleTopZoom(element)
```

### Mobile Gestures (`/hooks/useMobileGestures.ts`)

#### Swipe Gestures
```typescript
import { useSwipeGesture } from '@/hooks/useMobileGestures'

const { ref } = useSwipeGesture((result) => {
  if (result.direction === 'left') {
    // Handle left swipe
  }
}, { threshold: 50 })
```

#### Pull-to-Refresh
```typescript
import { usePullToRefresh } from '@/hooks/useMobileGestures'

const { ref, isRefreshing, pullProgress } = usePullToRefresh({
  onRefresh: async () => {
    // Refresh data
  }
})
```

#### Pinch Zoom
```typescript
import { usePinchZoom } from '@/hooks/useMobileGestures'

const { ref, scale, isZoomed } = usePinchZoom({
  minZoom: 0.5,
  maxZoom: 3
})
```

## Component Guidelines

### 1. Forms (`BookingForm.tsx`)
- **Input Types**: Proper `inputMode` and `type` attributes
- **Auto-completion**: Appropriate `autocomplete` values
- **Zoom Prevention**: 16px font size minimum on iOS
- **Step Navigation**: Mobile-optimized multi-step forms
- **Haptic Feedback**: On form interactions

```tsx
<input
  type="email"
  inputMode="email"
  autocomplete="email"
  style={{ fontSize: '16px' }} // Prevent iOS zoom
  className="min-h-[44px]"
/>
```

### 2. Navigation (`Header.tsx`)
- **Hamburger Menu**: Enhanced with swipe gestures
- **Safe Areas**: Respect device safe areas
- **Touch Feedback**: Visual feedback on touch
- **Scroll Optimization**: Hide/show on scroll

```tsx
<div className="mobile-header pt-safe">
  <nav className="min-h-[44px]">
    {/* Navigation content */}
  </nav>
</div>
```

### 3. Bottom Sheets (`BottomSheet.tsx`)
- **Drag Handle**: Clear visual indicator
- **Snap Points**: Multiple height positions
- **Backdrop Dismiss**: Touch outside to close
- **Swipe to Close**: Pull down gesture

```tsx
<BottomSheet
  snapPoints={[50, 90]}
  enableSwipeToClose={true}
  showHandle={true}
/>
```

### 4. Image Galleries (`MobileImageGallery.tsx`)
- **Swipe Navigation**: Left/right swipe between images
- **Pinch Zoom**: Zoom in/out gestures
- **Loading States**: Skeleton loaders
- **Safe Area Handling**: Full-screen experience

## CSS Architecture

### Mobile-First Approach
```css
/* Mobile first (base styles) */
.card {
  padding: 1rem;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    padding: 1.5rem;
  }
}
```

### Safe Area Support
```css
:root {
  --safe-area-inset-top: env(safe-area-inset-top);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
}

.mobile-header {
  padding-top: var(--safe-area-inset-top);
}
```

### Touch Targets
```css
button,
[role="button"],
a {
  min-height: 44px;
  min-width: 44px;
}
```

## Performance Guidelines

### 1. Animation Optimization
- **Hardware Acceleration**: Use `transform` and `opacity`
- **Reduced Motion**: Respect user preferences
- **60fps Target**: Maintain smooth animations

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. Image Optimization
- **Lazy Loading**: Load images as needed
- **Responsive Images**: Multiple sizes for different screens
- **WebP Support**: Modern image formats

```tsx
<img
  src="/image.webp"
  loading="lazy"
  width="300"
  height="200"
  alt="Description"
/>
```

### 3. Network Awareness
```typescript
import { NetworkUtils } from '@/lib/mobile-utils'

if (NetworkUtils.isSlowConnection()) {
  // Reduce quality, disable animations
}
```

## PWA Features

### Manifest Configuration
- **Install Prompts**: Native app-like installation
- **Shortcuts**: Quick actions from home screen
- **Offline Support**: Service worker implementation
- **Theme Colors**: Dynamic theme support

### Service Worker
- **Caching Strategy**: Cache important resources
- **Offline Pages**: Fallback content
- **Background Sync**: Sync when connection returns

## Testing Guidelines

### Device Testing
1. **iOS Safari**: iPhone 12+, iPad
2. **Android Chrome**: Samsung Galaxy, Pixel
3. **Real Devices**: Physical device testing required
4. **Network Conditions**: Test on 3G/slow connections

### User Scenarios
1. **Parent Booking**: Consultation scheduling on phone
2. **Form Completion**: Multi-step form on mobile
3. **Content Browsing**: Reading articles and info
4. **Offline Usage**: App behavior without internet

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Accessibility

### Mobile Accessibility
- **Screen Readers**: VoiceOver (iOS), TalkBack (Android)
- **Touch Gestures**: Alternative navigation methods
- **High Contrast**: Support for accessibility preferences
- **Font Sizing**: Respect system font preferences

```tsx
<button
  aria-label="Close dialog"
  className="min-h-[44px] min-w-[44px]"
>
  <X aria-hidden="true" />
</button>
```

## Common Patterns

### 1. Pull-to-Refresh
```tsx
import PullToRefresh from '@/components/ui/PullToRefresh'

<PullToRefresh onRefresh={handleRefresh}>
  <div className="content">
    {/* Page content */}
  </div>
</PullToRefresh>
```

### 2. Bottom Sheet Modals
```tsx
import BottomSheet from '@/components/ui/BottomSheet'

<BottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Booking Details"
>
  {/* Modal content */}
</BottomSheet>
```

### 3. Mobile Image Gallery
```tsx
import MobileImageGallery from '@/components/ui/MobileImageGallery'

<MobileImageGallery
  images={images}
  isOpen={galleryOpen}
  onClose={() => setGalleryOpen(false)}
  enableZoom={true}
/>
```

### 4. Responsive Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <div
      key={item.id}
      className="card p-4 rounded-lg shadow-md active:scale-98 transition-transform"
    >
      {/* Card content */}
    </div>
  ))}
</div>
```

## Debugging Tools

### Mobile Development
1. **Chrome DevTools**: Device simulation
2. **Safari Web Inspector**: iOS debugging
3. **Real Device Testing**: USB debugging
4. **Network Throttling**: Simulate slow connections

### Performance Monitoring
1. **Lighthouse**: Mobile performance audits
2. **Web Vitals**: Core performance metrics
3. **Error Tracking**: Mobile-specific error handling

## Best Practices Summary

### Do's
✅ Test on real devices frequently  
✅ Use 44px minimum touch targets  
✅ Implement proper loading states  
✅ Handle safe areas correctly  
✅ Add haptic feedback for interactions  
✅ Optimize for slow networks  
✅ Support offline functionality  
✅ Use native-like animations  

### Don'ts
❌ Ignore safe area insets  
❌ Use hover states on mobile  
❌ Block touch interactions  
❌ Create tiny touch targets  
❌ Forget keyboard handling  
❌ Ignore network conditions  
❌ Skip real device testing  
❌ Use desktop-only patterns  

## Maintenance

### Regular Audits
- **Monthly**: Performance and accessibility audits
- **Quarterly**: Device compatibility testing
- **Bi-annually**: UX pattern review

### Updates
- **iOS/Android**: Stay current with OS updates
- **PWA Standards**: Update manifest and service worker
- **Performance**: Monitor and optimize metrics

---

## Contact
For questions about mobile implementation, contact the development team or refer to the component documentation in `/components/ui/` and utility functions in `/lib/mobile-utils.ts`.