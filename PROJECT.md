# ProgramCarRemotes.com - Astro Migration

**Project:** Convert WordPress site to Astro + Tailwind + Decap CMS  
**Started:** 2026-02-06  
**Status:** 🟡 In Progress

---

## ✅ COMPLETED

### Phase 1: Research & Design (2026-02-06)
- [x] Analyze existing WordPress site structure
- [x] Research competitors (LocksmithKeyless, ProgramYourRemote, etc.)
- [x] Define SEO strategy (URL structure, schema markup, featured snippets)
- [x] Create design concept (color scheme, typography, layout)
- [x] Build homepage mockup (`mockups/homepage.html`)
- [x] Build instruction page mockup (`mockups/instruction-page.html`)
- [x] Deploy mockups to GitHub Pages for review
- [x] Get design approval from JP ✓

### Phase 2: Project Setup (2026-02-06)
- [x] Create GitHub repo (National-Email-and-Internet/programcarremotes-astro)
- [x] Clone reference repo (advancedbiomass-astro)
- [x] Initialize Astro project
- [x] Configure Tailwind with custom theme (colors, fonts)
- [x] Set up content collection schema (instructions, makes, models)
- [x] Create base layout with SEO meta tags
- [x] Create header component (desktop + mobile nav)
- [x] Create footer component
- [x] Create SearchBox component
- [x] Create BrandGrid component
- [x] Create Breadcrumbs component (with schema.org markup)
- [x] Create InstructionSteps component
- [x] Create homepage template
- [x] Create dynamic instruction page template ([make]/[model]/[...years])
- [x] Add sample content (Honda Civic 2018-2024)
- [x] Add JSON-LD HowTo schema to instruction pages
- [x] Verify build works ✓

---

## 🔄 IN PROGRESS

### Phase 3: WordPress Content Extraction
- [ ] Get WordPress credentials from Parker ⏳ (requested)
- [ ] Fix WordPress critical error on category pages
- [ ] Export all posts/content via WP REST API or WP-CLI
- [ ] Convert HTML content to Markdown
- [ ] Download and organize media assets
- [ ] Map old URLs for 301 redirects

---

## 📋 TODO

### Phase 4: Core Templates
- [ ] Homepage (search + brand grid)
- [ ] Brand page template (`/[make]/`)
- [ ] Model page template (`/[make]/[model]/`)
- [ ] Instruction page template (`/[make]/[model]/[years]/`)
- [ ] About page
- [ ] Troubleshooting hub page
- [ ] Search results page

### Phase 5: Components
- [ ] Year/Make/Model search selector
- [ ] Brand card grid
- [ ] Step-by-step instruction block
- [ ] Troubleshooting FAQ accordion
- [ ] Compatible part numbers table
- [ ] Breadcrumb navigation
- [ ] Print button
- [ ] Related models sidebar

### Phase 6: SEO & Schema
- [ ] HowTo schema (JSON-LD) for instruction pages
- [ ] BreadcrumbList schema
- [ ] FAQPage schema
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Meta tags (OG, Twitter cards)
- [ ] Canonical URLs

### Phase 7: Search & CMS
- [ ] Integrate Pagefind for client-side search
- [ ] Set up Decap CMS config
- [ ] Create CMS collections for makes/models/instructions
- [ ] Test CMS preview

### Phase 8: Content Migration
- [ ] Import all instruction posts
- [ ] Verify content accuracy
- [ ] Optimize images
- [ ] Set up 301 redirects from old URLs

### Phase 9: Testing & Launch
- [ ] Mobile responsive testing
- [ ] Lighthouse audit (target: 90+)
- [ ] Cross-browser testing
- [ ] Final SEO review
- [ ] Deploy to production
- [ ] Verify redirects working
- [ ] Submit sitemap to Google Search Console

---

## 📁 Project Structure

```
programcarremotes/
├── PROJECT.md          # This file
├── mockups/
│   ├── homepage.html   # ✅ Done
│   └── instruction-page.html  # ✅ Done
├── src/
│   ├── content/
│   │   ├── config.ts   # Content collection schema
│   │   └── instructions/
│   │       └── [make]/[model]/[years].md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── SearchBox.astro
│   │   ├── BrandGrid.astro
│   │   └── InstructionSteps.astro
│   └── pages/
│       ├── index.astro
│       ├── [make]/
│       │   ├── index.astro
│       │   └── [model]/
│       │       ├── index.astro
│       │       └── [...years].astro
│       ├── about.astro
│       ├── troubleshooting.astro
│       └── search.astro
├── public/
│   └── images/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 🎨 Design Tokens

```
Colors:
- Primary: #1e3a5f (navy blue)
- Accent: #22c55e (green)
- Surface: #f8fafc (light gray)
- Text: #1f2937 (gray-800)

Fonts:
- Inter (sans-serif)

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
```

---

## 📝 Notes

- Reference implementation: `/reference/advancedbiomass-astro/`
- WordPress has critical PHP error on category pages - needs fix before content export
- Credentials requested from Parker (2026-02-06 17:43 PST)
- GitHub repo: https://github.com/National-Email-and-Internet/programcarremotes-astro
- Mockups live at: https://national-email-and-internet.github.io/programcarremotes-astro/mockups/

---

## 🔗 Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Decap CMS](https://decapcms.org)
- [Pagefind](https://pagefind.app)
- [Schema.org HowTo](https://schema.org/HowTo)
