# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML landing page for Ocean Conservancy's Shark Week campaign, built for deployment on Cloudflare Pages. The page features a hero section with video content, call-to-action cards for donations and conservation actions, and responsive design optimized for ocean conservation messaging.

## Architecture

**Single Page Application**: Static HTML/CSS/JS with no build process
- `index.html` - Main landing page with semantic HTML5 structure
- `assets/css/style.css` - Main stylesheet with CSS variables design system
- `assets/css/responsive.css` - Mobile-first responsive breakpoints
- `assets/js/main.js` - Interactive features including parallax effects and smooth scrolling
- `assets/images/` - Shark Week branding and hero imagery
- `assets/video/` - Promotional video content

**Deployment Configuration**:
- `_headers` - Cloudflare Pages security headers and caching rules
- `_redirects` - URL redirects and 404 handling

## Design System

**CSS Variables** (`style.css:4-41`):
- Colors: Ocean-themed palette with `--primary-blue`, `--secondary-blue`, `--accent-cyan`
- Typography: Inter font family with weight variables
- Spacing: Consistent scale from `--spacing-xs` to `--spacing-3xl`
- Component styling: Border radius and shadow utilities

**Responsive Design**:
- Mobile-first approach with breakpoints in `responsive.css`
- Logo sizing adapts across screen sizes (230px desktop → 140px mobile)
- Grid layouts collapse to single column on mobile
- Video content maintains aspect ratio across devices

## JavaScript Features

**Performance Optimizations** (`main.js:25-88`):
- Throttled scroll handlers for smooth parallax effects
- Hardware acceleration for hero image transforms
- Intersection Observer for scroll animations
- Parallax disabled on mobile and for reduced motion preferences

**Interactive Elements**:
- Smooth scrolling navigation with header offset calculation
- Social tag click-to-copy functionality
- CTA button click tracking (console logging)
- Dynamic header opacity based on scroll position

## Content Structure

**Call-to-Action Cards**:
1. **Donate** - Links to Ocean Conservancy donation page
2. **Have Your Voice Heard** - Links to action center for petitions
3. **Start a Cleanup** - Two buttons for cleanup guide and CleanSwell app

**External Links**:
- All CTA buttons link to official Ocean Conservancy URLs
- Social media links in footer connect to Ocean Conservancy accounts
- Video poster and controls for 15-second promotional content

## Development Notes

**No Build Process**: Direct file editing and deployment
**Asset Management**: Images optimized for web delivery with WebP considerations
**SEO Optimization**: Meta tags configured for social sharing (Open Graph, Twitter Cards)
**Accessibility**: WCAG compliance with proper ARIA labels and keyboard navigation

## Cloudflare Pages Specific

**Headers Configuration**:
- Security headers for XSS protection and content policy
- Long-term caching for static assets (1 year)
- Short-term caching for HTML (1 hour)
- Preload directives for critical CSS and images

**Redirect Rules**:
- Common URL variations redirect to main page
- 404 fallback serves main page for SPA-like behavior
- Optional tracking redirects commented out for future use