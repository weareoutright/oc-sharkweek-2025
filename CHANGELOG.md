# Changelog

All notable changes to the Ocean Conservancy Shark Week 2025 landing page project.

## [Unreleased]

## [1.1.0] - 2025-01-11

### Added
- GitHub Pages deployment support with relative asset paths
- Social media meta tags with full GitHub Pages URLs for proper sharing

### Fixed
- Asset paths converted from absolute (`/assets/`) to relative (`assets/`) for GitHub Pages compatibility
- Open Graph and Twitter Card image URLs updated to full GitHub Pages URLs

### Changed
- Repository moved to `weareoutright/oc-sharkweek-2025` from original location

## [1.0.0] - 2025-01-11

### Added
- Complete Ocean Conservancy Shark Week 2025 landing page implementation
- Responsive HTML5 structure with semantic markup
- Ocean Conservancy design system integration
- Dynamic hero section with "IT'S CRUNCH TIME" messaging
- Enhanced parallax background effects on hero image
- Video promotion section with Discovery Shark Week branding
- Conservation messaging section with white background
- Three functional call-to-action sections:
  - DONATE with Ocean Conservancy donation link
  - HAVE YOUR VOICE HEARD with action center link
  - START A CLEANUP with real Ocean Conservancy cleanup resources
- Simplified footer with social media integration
- Font Awesome social media icons with hover animations
- Mobile-first responsive design across all breakpoints
- Performance optimizations and Cloudflare Pages configuration
- Accessibility compliance including video without auto-play

### Technical Features
- CSS Grid and Flexbox layouts
- Hardware-accelerated parallax effects with:
  - Vertical parallax movement (40% of scroll speed)
  - Horizontal drift (0-80px)
  - Progressive zoom (1.1x to 1.35x scale)
- Throttled scroll handlers for performance
- Intersection Observer for optimized animations
- WebP image optimization support
- Proper caching headers via `_headers` file
- URL routing via `_redirects` file

### Design System
- Ocean Conservancy color palette:
  - Primary Blue: `#1B365D`
  - Secondary Blue: `#00A4E4` 
  - Light Blue: `#87CEEB`
  - Accent Cyan: `#00BFFF`
- Inter font family for professional typography
- Tightened hero title line-height (0.9) for better visual impact
- Alternating section backgrounds:
  - Hero: Dynamic shark image with overlay
  - Video: Dark blue background with white text
  - Conservation: White background with dark blue text
  - CTAs: Light blue background

### Content Integration
- Discovery Shark Week marketing messaging
- "IT'S CRUNCH TIME" campaign tagline
- Tune-in messaging with social media tags (#SharkWeek, @Discovery, @SharkWeek)
- Ocean Conservancy conservation messaging
- Real Ocean Conservancy URLs for all CTAs:
  - Donation page
  - Action center
  - Cleanup guide: https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/start-a-cleanup/
  - CleanSwell app: https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/clean-swell-app/

### Assets
- High-quality shark imagery:
  - `shark-action-surfacing.jpg` (hero background)
  - `shark-alone-blue-ocean.jpg` (video poster, CTA image)
  - `shark-large-swimming-with-other-fish-and-sharks.jpg` (CTA image)
- Official Shark Week branding:
  - `sharkweek-banner-transparent-background.png` (header and video section)
- Video content:
  - `CrunchTimePromo15.mp4` (15-second promotional video)
- Ocean Conservancy design reference screenshots for brand consistency

### Accessibility
- WCAG 2.1 Level AA compliance
- No auto-playing video content
- Proper ARIA labels and semantic HTML structure
- Keyboard navigation support
- Screen reader optimized
- Respects `prefers-reduced-motion` for parallax effects
- High contrast ratios for text readability

### Performance
- Mobile-first responsive design
- Hardware acceleration for smooth animations
- Lazy loading and intersection observers
- Optimized asset loading with preload directives
- Compressed and minified resources
- Proper caching strategies

### Browser Support
- Modern browsers with CSS Grid support
- Graceful degradation for older browsers
- Mobile Safari and Chrome optimization
- Desktop Firefox, Chrome, Safari, Edge support

## [0.1.0] - 2025-01-11

### Added
- Initial project setup and planning
- Comprehensive project plan documentation
- Asset organization and reference materials
- Ocean Conservancy design system analysis
- Discovery Shark Week marketing guidelines
- Technical architecture planning
- Cloudflare Pages deployment strategy

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality  
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes