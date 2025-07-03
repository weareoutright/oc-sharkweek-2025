# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Ocean Conservancy's Shark Week 2025. It's built with semantic HTML, SCSS, and vanilla JavaScript. The site features a video hero section, layered CTA designs with sharks extending beyond background frames, and a complete Ocean Conservancy footer integration.

## Essential Commands

```bash
# Development workflow
npm run dev              # Start development: watch SCSS + serve on :8000
npm run build-css        # Compile SCSS to CSS once
npm run watch-css        # Watch SCSS files for changes
npm run serve           # Serve site on localhost:8000
npm run screenshot      # Generate Puppeteer screenshots for design comparison
```

## Architecture Overview

### CSS Architecture
- **Source**: `assets/css/styles.scss` (modular SCSS with variables, mixins)
- **Compiled**: `assets/css/styles.css` (generated, do not edit directly)
- **Typography**: All font sizes use rem units for accessibility (16px = 1rem baseline)
- **Design System**: Variables for colors, breakpoints, and Ocean Conservancy brand colors

### Component Structure
- **Navigation**: Fixed header with center/right link groups, special DONATE button styling
- **Splash**: 100vh hero with video background and scroll indicator
- **CTAs**: Layered design pattern with background frames and extending foreground elements
- **Footer**: Complete Ocean Conservancy footer with video backgrounds and social integration

### Asset Organization
- **Images**: Exported from Figma, includes layered components (background + cutout images)
- **Videos**: MP4 assets for hero and footer backgrounds
- **Screenshots**: Automated comparison tools for design iteration

### Key Design Patterns

#### Layered CTA Design
CTAs use a two-image system:
- Background image (ocean scenes) constrained within frames
- Foreground image (sharks/objects) extending beyond frame boundaries
- Transparent CTA containers to show main background through

#### Typography Consistency
All typography matches Figma specifications:
- Navigation: Roboto Medium 20px
- CTA Titles: Roboto Bold 56px  
- Video Promo: Three distinct text styles with specific spacing
- Scroll Text: Roboto Regular 21px with 3.36px letter spacing

#### Figma Integration
When styling components, always reference Figma selections for exact typography, colors, and spacing. The codebase includes MCP Figma server integration for extracting design specifications.

## Development Notes

- **SCSS Compilation**: Always run `npm run build-css` after SCSS changes if not using watch mode
- **Asset Updates**: New Figma assets should be exported to appropriate `/assets/images/` subdirectories
- **Typography Changes**: Convert pixel values to rem equivalents (divide by 16)
- **Footer Integration**: Footer uses extracted Ocean Conservancy WordPress theme styles
- **Accessibility**: Include `assistive-text` class for screen reader content
- **Version Control**: Detailed commit messages
- **Version Control**: Do not include Claude attribution in commit messages