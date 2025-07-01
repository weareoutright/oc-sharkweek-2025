# Shark Week Static HTML Page - Project Plan

## Project Overview
Create a static HTML page for Shark Week with modern styling using node-sass for CSS compilation.

## Page Structure

### 1. Top Navigation
- **Logo**: Positioned on the left
- **Main Navigation**: Three links centered horizontally
- **Secondary Navigation**: Three links grouped on the right
  - Link 1: Regular link
  - Link 2: Button style
  - Link 3: Search icon
- **External Links**: All navigation links point to google.com (placeholder)

### 2. Splash Panel
- **Dimensions**: 100vh x 100vw
- **Background**: Video background
- **Position**: Above main content
- **Scroll Indicator**: Shark tooth image anchored to bottom center with "SCROLL" text left and "DOWN" text right

### 3. Main Content Area
- **Background**: Fixed background image covering 100vh x 100vw
- **Layout**: CTAs positioned on right 50% of width

### 4. CTAs (Call to Actions)
- **Quantity**: Four CTAs arranged vertically
- **Components per CTA**:
  - Image
  - Heading
  - Paragraph text
  - Button
- **Layout**: Stacked vertically down the page

### 5. Footer Section
- **Background**: Large footer background with deep ocean/cosmic theme
- **Content**: Email signup, social media links, navigation links, contact info, certifications
- **Style**: "Stay Current" newsletter signup with social media integration
- **Animation**: Vector shark fin anchored to top of footer, animates left to right on scroll

## Technical Requirements

### Build Tools
- **CSS Preprocessor**: node-sass for SCSS compilation
- **Structure**: Static HTML with compiled CSS

### File Structure
```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── styles.scss (source)
│   │   └── styles.css (compiled)
│   ├── images/
│   │   ├── logo.png
│   │   ├── background.jpg
│   │   ├── cta-1.jpg
│   │   ├── cta-2.jpg
│   │   ├── cta-3.jpg
│   │   └── cta-4.jpg
│   └── videos/
│       └── splash-background.mp4
├── package.json
└── plan.md
```

## Development Tasks

### Phase 1: Setup
1. Initialize npm project
2. Install node-sass as dependency
3. Create basic file structure
4. Set up build script for SCSS compilation

### Phase 2: HTML Structure
1. Create semantic HTML structure
2. Build navigation component
3. Create splash panel with video background
4. Structure main content area with CTAs

### Phase 3: SCSS Styling
1. Set up SCSS variables and mixins
2. Style navigation bar with responsive layout
3. Implement splash panel with video background
4. Style fixed background for main content
5. Create CTA component styles
6. Implement responsive design

### Phase 4: Content Integration
1. Add placeholder content for CTAs
2. Integrate placeholder images
3. Set up video background
4. Test all external links

### Phase 5: Optimization
1. Optimize images for web
2. Ensure cross-browser compatibility
3. Test responsive behavior
4. Final styling adjustments

## Notes
- All navigation links temporarily point to google.com
- Video and image assets will need to be sourced
- Focus on modern, clean design aesthetic appropriate for Shark Week theme
- Ensure accessibility standards are met