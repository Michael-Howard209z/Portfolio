# MM — Digital Artisan Portfolio

An award-worthy personal portfolio website crafted with cutting-edge web technologies. Features immersive 3D backgrounds, smooth animations, and a premium dark-mode design language.

## ✨ Features

- **Immersive 3D Background** — Real-time WebGL particle system with Three.js
- **Premium Dark Design** — Glassmorphism + neumorphism with dynamic gradients
- **Smooth Animations** — Framer Motion powered page transitions and scroll reveals
- **Custom Cursor** — Magnetic cursor with hover effects on interactive elements
- **Loading Screen** — Animated loading sequence with progress indicator
- **Interactive Timeline** — Hover-activated storytelling about section
- **Project Showcase** — Filterable grid with detailed case study modals
- **Skill Visualization** — Animated skill orbs with category filtering
- **Testimonial Carousel** — Auto-playing with smooth transitions
- **Contact Form** — Animated form with validation and success feedback
- **SEO Optimized** — JSON-LD structured data, meta tags, sitemap
- **Fully Responsive** — Perfect on mobile, tablet, and desktop
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Three.js / @react-three/fiber | 3D Background |
| GSAP | Scroll Animations |

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg          # SVG favicon
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # Search engine crawling
│   ├── sitemap.xml          # XML sitemap
│   └── images/              # Static images
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation with scroll tracking
│   │   ├── Hero.jsx         # Fullscreen hero section
│   │   ├── About.jsx        # Storytelling with timeline
│   │   ├── Skills.jsx       # Skill orbs with filters
│   │   ├── Projects.jsx     # Project showcase grid
│   │   ├── ProjectModal.jsx # Detailed case study modal
│   │   ├── Experience.jsx   # Interactive timeline
│   │   ├── Testimonials.jsx # Auto-playing carousel
│   │   ├── Blog.jsx         # Blog preview cards
│   │   ├── Contact.jsx      # Form with validation
│   │   ├── Footer.jsx       # Site footer
│   │   ├── CustomCursor.jsx # Magnetic custom cursor
│   │   ├── LoadingScreen.jsx# Animated preloader
│   │   ├── ThreeBackground.jsx # WebGL 3D background
│   │   ├── ScrollReveal.jsx # Scroll-triggered reveals
│   │   └── MagneticButton.jsx # Magnetic hover buttons
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   ├── useScrollProgress.js
│   │   ├── useWindowSize.js
│   │   └── useInView.js
│   ├── data/
│   │   └── portfolioData.js # All content data
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + custom styles
├── index.html               # HTML with full SEO
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚢 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. Push the repository to GitHub
2. Go to **Settings > Pages**
3. Set **Source** to **GitHub Actions**
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to the gh-pages branch
npx gh-pages -d dist
```

### Custom Domain

1. Add a `CNAME` file in `public/` with your domain
2. Update `vite.config.js` with your base path
3. Configure DNS records for your domain

```js
// vite.config.js
export default defineConfig({
  base: '/your-repo-name/', // Remove for custom domain
  // ...
})
```

## 📊 Lighthouse Optimization

This portfolio is built with performance in mind:
- Code splitting with manual chunks (vendor, animations, three)
- Lazy loading images with native loading attribute
- Optimized WebGL rendering for minimal GPU usage
- Semantic HTML for accessibility
- Preconnected font origins

## 🔍 SEO

- Full JSON-LD structured data (Person, Organization, Project, BreadcrumbList, FAQPage)
- Open Graph and Twitter Card meta tags
- Canonical URL
- robots.txt and sitemap.xml
- Semantic HTML5 elements

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio.
