# Ocean Conservancy Shark Week - Project Plan

## Project Overview
Creating a static HTML page for Ocean Conservancy's "Shark Week" to be hosted on Cloudflare Pages at https://tim52.io/sharkweek as a separate Cloudflare Pages project.

## Technical Architecture

### Deployment Strategy
- **Approach**: Separate Cloudflare Pages project in existing account
- **Domain**: Custom domain configuration for tim52.io/sharkweek
- **Build**: Static HTML (no build process required)

### File Structure Plan
```
/
├── index.html                 # Main Shark Week landing page
├── assets/
│   ├── css/
│   │   ├── style.css         # Main stylesheet
│   │   └── responsive.css    # Mobile/tablet responsive styles
│   ├── js/
│   │   └── main.js           # Interactive features (if needed)
│   ├── images/               # Graphic assets will go here
│   └── fonts/                # Custom fonts if needed
├── _headers                  # Cloudflare Pages headers config
└── _redirects               # Cloudflare Pages redirect rules
```

## Content & Design Plan

### HTML Structure
- Semantic HTML5 structure optimized for Ocean Conservancy branding
- Mobile-first responsive design
- Accessibility features (ARIA labels, proper heading hierarchy)
- Meta tags for social sharing (Open Graph, Twitter Cards)

### Styling Approach
- Modern CSS with CSS Grid/Flexbox for layouts
- Ocean/shark themed color palette
- Smooth animations and transitions
- Optimized for fast loading on all devices

### Key Features to Include
- Hero section with compelling shark imagery
- Ocean Conservancy mission/messaging
- Shark conservation facts and statistics
- Call-to-action sections (see CTA Details below)
- Social media integration
- Contact/donation links

### Call-to-Action (CTA) Details

#### DONATE
- **Headline**: "DONATE"
- **Message**: "Your donation can help remove dangerous debris that endanger your favorite sharks and marine life. It can also support climate and biodiversity efforts to preserve and protect our ocean."
- **Action**: Link to Ocean Conservancy donation page

#### HAVE YOUR VOICE HEARD
- **Headline**: "HAVE YOUR VOICE HEARD"
- **Message**: "Sign our plastics ban and other petitions at our action center."
- **Action**: Link to Ocean Conservancy action center

#### START A CLEANUP
- **Headline**: "START A CLEANUP"
- **Message**: "Learn how you can start your own cleanup and download our CleanSwell app."
- **Actions**: 
  - ✅ Link to cleanup guide: https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/start-a-cleanup/
  - ✅ Link to CleanSwell app: https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/clean-swell-app/

## Performance Optimizations
- Optimized images (WebP format with fallbacks)
- Minified CSS/JS
- Proper caching headers via `_headers` file
- Fast loading fonts (preload critical fonts)

## SEO & Analytics
- Proper meta descriptions and titles
- Structured data markup
- Google Analytics integration (if needed)
- Social media meta tags

## Implementation Timeline

### Phase 1: Core Structure (Once graphics are ready)
- Create HTML foundation with semantic structure
- Set up CSS architecture and responsive framework
- Implement basic navigation and layout

### Phase 2: Content Integration
- Integrate graphic assets
- Add Ocean Conservancy content and messaging
- Implement interactive elements

### Phase 3: Optimization & Deployment
- Performance optimization
- Cross-browser testing
- Cloudflare Pages deployment setup
- DNS configuration for tim52.io/sharkweek

## Cloudflare Pages Configuration

### Domain Setup Options
**Option A**: Subdomain approach (`sharkweek.tim52.io`) with redirect from `/sharkweek`
**Option B**: Cloudflare Worker reverse proxy to serve at `/sharkweek` path

### DNS Configuration
- Custom CNAME record pointing to Pages deployment
- Cloudflare proxy enabled (orange cloud)
- SSL/TLS configuration

## Next Steps & Requirements

### Available Assets
**Images:**
- `shark-action-surfacing.jpg` - Dynamic shark breaking surface
- `shark-alone-blue-ocean.jpg` - Solitary shark in blue water
- `shark-large-swimming-with-other-fish-and-sharks.jpg` - Group scene with marine life
- `sharkweek-banner-transparent-background.png` - Official Shark Week branding

**Video:**
- `CrunchTimePromo15.mp4` - 15-second promotional video

### Asset Integration Plan
- **Hero Section**: Use `shark-action-surfacing.jpg` as dynamic background
- **Banner/Logo**: Implement `sharkweek-banner-transparent-background.png` prominently
- **Video Content**: Feature `CrunchTimePromo15.mp4` as hero video or secondary content section
- **Supporting Imagery**: Use ocean and group shots for content sections and CTAs
- **Optimization**: Convert to WebP format with original fallbacks for performance

### Project Status
1. ✅ **Graphic assets** - Available for integration
2. ✅ **Design System** - Analyzed from reference screenshots
3. ✅ **Marketing messaging** - Complete with CTAs and brand guidelines
4. ✅ **Technical architecture** - Cloudflare Pages deployment planned

### Design Reference Assets
- `reference/Screenshot1.png` - Header, hero section, card layouts
- `reference/Screenshot2.png` - Content sections, color usage
- `reference/Screenshot3.png` - Video sections, marine imagery
- `reference/Screenshot4.png` - Footer, forms, branding elements

### Ocean Conservancy Design System Analysis

**Color Palette:**
- **Primary Blue**: Deep ocean blue (#1B365D / similar dark navy)
- **Secondary Blue**: Bright cyan/aqua (#00A4E4 / similar)
- **Light Blue**: Soft sky blue (#87CEEB / similar)
- **Accent Cyan**: Bright signup button (#00BFFF / similar)
- **White**: Clean backgrounds and text
- **Dark**: Deep navy/black for headers and contrast

**Typography:**
- **Headings**: Bold, modern sans-serif (appears to be similar to Inter/Helvetica)
- **Body Text**: Clean, readable sans-serif
- **Hierarchy**: Clear size differentiation between H1, H2, body text
- **Style**: Professional, approachable, scientific credibility

**Component Patterns:**
- **Hero Sections**: Full-width ocean imagery with overlay text
- **Card Layouts**: Rounded corners, generous padding, image + text combinations
- **CTAs**: Rounded buttons with bright blue/cyan colors
- **Grid System**: 2-column and mixed layouts, responsive design
- **Content Sections**: Alternating backgrounds (white, light blue, dark navy)

**Visual Style:**
- **Photography**: High-quality marine life imagery (perfect for sharks!)
- **Layout**: Clean, spacious, professional
- **Interactions**: Subtle hover states, circular arrow buttons
- **Branding**: Ocean Conservancy logo in header, trust badges in footer
- **Forms**: Rounded input fields with clean styling

**Key Design Elements for Shark Week:**
- Use deep blue backgrounds for drama and contrast
- Incorporate bright cyan accents for CTAs
- Large hero imagery with text overlays
- Card-based content sections
- Clean, professional typography
- Ocean-themed color transitions

## Marketing Campaign Messaging

### Generic Tagline
**"IT'S CRUNCH TIME"**

### Example Marketing Language
From daring free-divers dancing underwater with sharks to experts recreating dangerous shark attack scenarios, these are not your typical shark shows! This year you will be transported right into the action with moments never seen on tv before. With epic bites of content to sink your teeth into every single night, you won't be able to miss a second. So, get ready, because when the clock strikes 8pm on July 20... it's crunch time!

### Campaign Themes
- Summer celebration
- Live / can't miss
- Incredible discoveries
- Massive stunts and thrill
- Relevant and timely
- Conservation and impact

### Marketing Tone
Thrilling, groundbreaking, celebratory, current

### Tune-In Messaging Schedule
- **Before 7/13**: Shark Week Starts Sunday July 20 on Discovery and stream on max
- **On 7/13**: Shark Week Starts Next Sunday at 8p on Discovery and stream on max
- **7/14-7/18**: Shark Week Starts Sunday at 8p on Discovery and stream on max
- **7/19**: Shark Week Starts Tomorrow at 8p on Discovery and stream on max
- **7/20**: Shark Week Starts Tonight at 8p on Discovery and stream on max
- **7/21-7/24**: Shark Week Continues all week 8p on Discovery and stream on max
- **7/25-7/26**: Shark Week Continues Tonight 8p on Discovery and stream on max

### Messaging Best Practices

#### Brand Reference
- Always refer to "Discovery (or Discovery's) Shark Week"
- Avoid saying "Catch" Shark Week

#### Core Messaging Pillars

**Celebration**
Summer's main event is a celebration of sharks. Goal is never to villainize them. Avoid content that overtly pushes the narrative of shark bites & attacks.

**Curiosity**
Science and exploration are the core of Shark Week. Address these themes to educate viewers. Stick to facts and avoid taking creative liberties with species' behaviors.

**Conservation**
The importance of protecting sharks and their ocean habitat is the biggest takeaway for viewers. Content can be infused with this messaging. Vetted NGO partnerships exist for amplification.

### Social Media Guidelines

#### Required Elements
- **Hashtag**: #SharkWeek
- **Tune-in reference**: "Shark Week is back! Watch on @Discovery starting July 20! @SharkWeek"
- **Tags**: @Discovery @SharkWeek (on ALL platforms)

#### Platform-Specific Accounts
- **Facebook**: @Discovery @Shark Week
- **Instagram**: @Discovery @SharkWeek
- **X**: @Discovery @SharkWeek
- **TikTok**: @Discovery
- **Giphy**: @SharkWeek

### Confidentiality Requirements
**Network review/approval required before publicly sharing:**
- Shark Week dates
- Featured talent
- Show titles
- Episodic content

**Important**: Align on rollout of any Discovery Shark Week related content before posting or discussing.

### Future Considerations
- Content management approach for updates
- Analytics and tracking requirements
- Integration with Ocean Conservancy's existing digital properties
- Mobile app deep linking (if applicable)

## Notes
- Current directory structure: Clean slate with only `assets/` folder
- Git repository initialized and ready
- Focus on fast, accessible, and visually compelling design
- Separate deployment allows independent management from main tim52.io site