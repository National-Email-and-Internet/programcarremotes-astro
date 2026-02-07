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

### Phase 2.5: GA4 & SEO Audit (REQUIRED BEFORE EXTRACTION)
- [x] Extract GA4 Measurement ID from existing site
  - **Tag ID: GT-KD78PHP** (Google Tag via Site Kit plugin)
- [ ] Check for custom events/goals configured (need WP admin)
- [ ] Verify site is in Google Search Console
- [x] Note current sitemap URL: `/sitemap.xml` (old, from 2014!)
- [ ] Screenshot current performance metrics (baseline)
- [x] Record existing URL structure:
  - Pattern: `/[make]/[model]/[year]-[make]-[model]-remote-programming/`
  - Example: `/acura/rsx/2005-acura-rsx-remote-programming/`
- [x] Document current meta tags:
  - Title: "Program Car Remotes"
  - Description: "How to program a key fob for your car."
- [x] Document robots.txt (allows all except sitemap.xml and wp plugins)

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
- [x] Homepage (search + brand grid)
- [x] Brand page template (`/[make]/`)
- [x] Model page template (`/[make]/[model]/`)
- [x] Instruction page template (`/[make]/[model]/[year]/`)
- [x] All Makes page (`/makes/`)
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
- [x] HowTo schema (JSON-LD) for instruction pages
- [x] BreadcrumbList schema (via Breadcrumbs component)
- [ ] FAQPage schema
- [ ] Sitemap generation
- [ ] robots.txt
- [x] Meta tags (OG, Twitter cards)
- [x] Canonical URLs

### Phase 7: Search & CMS
- [ ] Integrate Pagefind for client-side search
- [ ] Set up Decap CMS config
- [ ] Create CMS collections for makes/models/instructions
- [ ] Test CMS preview

### Phase 8: Content Migration
- [x] Import all instruction posts (800+ via REST API)
- [ ] Verify content accuracy
- [ ] Optimize images
- [x] Set up 301 redirects from old URLs (817 redirects in public/_redirects)

### Phase 9: Testing & Launch
- [ ] Mobile responsive testing
- [ ] Lighthouse audit (target: 90+ SEO)
- [ ] Cross-browser testing
- [ ] Final SEO review
- [ ] Deploy to production
- [ ] Verify redirects working

### Phase 10: GA4 & SEO Sign-Off (MANDATORY)
**Migration NOT complete until all boxes checked:**
- [x] GA4 tracking added (GT-KD78PHP in Analytics.astro)
- [ ] GA4 tracking verified in Real-Time report (after deploy)
- [ ] Sitemap submitted to Google Search Console
- [x] All original URLs preserved or 301 redirected (817 redirects)
- [ ] Lighthouse SEO score 90+
- [ ] Request indexing of key pages

---

## ⚠️ URL Migration Notes

**Old URL pattern:**
```
/[make]/[model]/[year]-[make]-[model]-remote-programming/
```
Example: `/acura/rsx/2005-acura-rsx-remote-programming/`

**New URL pattern:**
```
/[make]/[model]/[year-range]/
```
Example: `/acura/rsx/2002-2006/`

**Redirect strategy needed:**
- Individual year URLs → consolidated year-range pages
- All old URLs must 301 redirect to preserve SEO
- May need to keep some as individual pages if instructions differ per year

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
