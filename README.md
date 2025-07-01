# Ocean Conservancy - Shark Week 2025

A static website celebrating Ocean Conservancy's partnership with Discovery's Shark Week 2025, featuring interactive design elements and comprehensive marine conservation messaging.

## 🦈 Features

- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Video Integration**: Hero section with promotional video content
- **Layered Visuals**: Innovative CTA design with sharks extending beyond frame boundaries
- **Ocean Conservancy Footer**: Complete integration with social media, newsletter signup, and certifications
- **Accessibility**: Screen reader support and rem-based typography scaling
- **Design Fidelity**: Pixel-perfect implementation matching Figma specifications

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8000` to view the site.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development: watch SCSS + serve on port 8000 |
| `npm run build-css` | Compile SCSS to CSS |
| `npm run watch-css` | Watch SCSS files for changes |
| `npm run serve` | Serve site on localhost:8000 |
| `npm run screenshot` | Generate design comparison screenshots |

## 🏗️ Project Structure

```
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── styles.scss     # Source SCSS (edit this)
│   │   └── styles.css      # Compiled CSS (auto-generated)
│   ├── images/             # Figma exports and assets
│   ├── videos/             # Video content
│   └── js/                 # JavaScript functionality
├── screenshot.js           # Puppeteer automation
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Typography
- **Primary Font**: Roboto (Google Fonts)
- **Size System**: rem-based scaling (16px = 1rem baseline)
- **Navigation**: 20px Medium with -0.6px letter spacing
- **Headings**: 56px Bold with 54px line height
- **Body Text**: 20px Regular with 28px line height

### Color Palette
- **Primary Blue**: `#1e4d72`
- **Ocean Blue**: `#2b5876`
- **Shark Teal**: `#4e9faf`
- **Donate Orange**: `#f73d16`
- **Text Dark**: `#020b18`

### Components
- **Layered CTAs**: Background ocean scenes with extending shark graphics
- **Video Hero**: Full-viewport splash with scroll indicator
- **Navigation**: Fixed header with centered and right-aligned link groups
- **Footer**: Ocean Conservancy integration with video backgrounds

## 🛠️ Development Workflow

1. **Edit SCSS**: Make changes in `assets/css/styles.scss`
2. **Auto-compile**: CSS compiles automatically with `npm run dev`
3. **Preview**: View changes at `http://localhost:8000`
4. **Screenshots**: Run `npm run screenshot` to compare with design targets

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🌊 Ocean Conservancy Integration

This site includes the complete Ocean Conservancy footer with:
- Newsletter signup functionality
- Social media integration
- Certification badges (GuideStar, BBB, Charity Navigator)
- Contact information and legal statements
- Responsive video backgrounds

## 📄 License

MIT License - see package.json for details.

---

**Built for Ocean Conservancy's Shark Week 2025 Campaign**