#!/usr/bin/env node
/**
 * WordPress to Astro Content Extractor
 * 
 * Extracts posts from programcarremotes.com via REST API
 * and converts to Astro-compatible Markdown files.
 * 
 * Usage: node scripts/wp-extract.js
 */

const fs = require('fs');
const path = require('path');

// Turndown for HTML to Markdown conversion
let TurndownService;
try {
  TurndownService = require('turndown');
} catch (e) {
  console.error('Missing dependency. Run: npm install turndown');
  process.exit(1);
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

// Config
const WP_API = 'https://programcarremotes.com/wp-json/wp/v2';
const OUTPUT_DIR = path.join(__dirname, '../src/content/instructions');
const REDIRECTS_FILE = path.join(__dirname, '../redirects.json');

// Track redirects for SEO
const redirects = [];

/**
 * Fetch all posts with pagination
 */
async function fetchAllPosts() {
  let page = 1;
  let allPosts = [];
  
  console.log('Fetching posts from WordPress API...');
  
  while (true) {
    const url = `${WP_API}/posts?per_page=100&page=${page}&_embed`;
    console.log(`  Page ${page}...`);
    
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 400) break; // No more pages
      throw new Error(`API error: ${res.status}`);
    }
    
    const posts = await res.json();
    if (posts.length === 0) break;
    
    allPosts = allPosts.concat(posts);
    page++;
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`Found ${allPosts.length} posts total.\n`);
  return allPosts;
}

/**
 * Fetch all categories
 */
async function fetchCategories() {
  let page = 1;
  let allCats = [];
  
  console.log('Fetching categories...');
  
  while (true) {
    const url = `${WP_API}/categories?per_page=100&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) break;
    
    const cats = await res.json();
    if (cats.length === 0) break;
    
    allCats = allCats.concat(cats);
    page++;
  }
  
  // Build lookup by ID
  const catMap = {};
  allCats.forEach(cat => {
    catMap[cat.id] = {
      name: cat.name,
      slug: cat.slug,
      parent: cat.parent,
      description: cat.description
    };
  });
  
  console.log(`Found ${allCats.length} categories.\n`);
  return catMap;
}

/**
 * Parse make/model from URL or categories
 */
function parseMakeModel(post, catMap) {
  // URL structure: /make/model/year-make-model-remote-programming/
  const urlParts = post.link.replace('https://programcarremotes.com/', '').split('/').filter(Boolean);
  
  let make = urlParts[0] || 'unknown';
  let model = urlParts[1] || 'unknown';
  
  // Try to extract year from slug
  const yearMatch = post.slug.match(/^(\d{4})-/);
  const year = yearMatch ? yearMatch[1] : null;
  
  // Clean up make/model names
  make = make.charAt(0).toUpperCase() + make.slice(1);
  model = model.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return { make, model, year };
}

/**
 * Extract step-by-step instructions from content
 */
function extractSteps(html) {
  const steps = [];
  
  // Look for ordered lists
  const olMatch = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/gi);
  if (olMatch) {
    olMatch.forEach(ol => {
      const liMatches = ol.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      if (liMatches) {
        liMatches.forEach((li, idx) => {
          const text = li.replace(/<[^>]*>/g, '').trim();
          if (text) {
            steps.push({
              step: idx + 1,
              title: `Step ${idx + 1}`,
              description: text
            });
          }
        });
      }
    });
  }
  
  return steps;
}

/**
 * Convert a single post to Astro markdown
 */
function convertPost(post, catMap) {
  const { make, model, year } = parseMakeModel(post, catMap);
  
  // Convert HTML to Markdown
  const markdown = turndown.turndown(post.content.rendered);
  
  // Clean up title
  const title = post.title.rendered
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/"/g, '\\"');
  
  // Extract description from excerpt
  const description = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 200);
  
  // Extract steps if possible
  const steps = extractSteps(post.content.rendered);
  
  // Build frontmatter
  const frontmatter = {
    title: title,
    description: description,
    make: make,
    model: model,
    years: year || 'unknown',
    yearStart: year ? parseInt(year) : 2000,
    yearEnd: year ? parseInt(year) : 2000,
    difficulty: 'easy',
    timeMinutes: 5,
    requiresExistingKey: true,
    requiresLocksmith: false,
    author: 'The Remote Guy',
    pubDate: post.date.split('T')[0],
    oldUrl: post.link
  };
  
  // YAML frontmatter
  let content = '---\n';
  for (const [key, value] of Object.entries(frontmatter)) {
    if (typeof value === 'string') {
      content += `${key}: "${value}"\n`;
    } else if (typeof value === 'boolean') {
      content += `${key}: ${value}\n`;
    } else {
      content += `${key}: ${value}\n`;
    }
  }
  content += '---\n\n';
  content += markdown;
  
  // Build file path
  const makeSlug = make.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = model.toLowerCase().replace(/\s+/g, '-');
  const yearSlug = year || 'unknown';
  
  const dir = path.join(OUTPUT_DIR, makeSlug, modelSlug);
  const filePath = path.join(dir, `${yearSlug}.md`);
  
  // Track redirect
  redirects.push({
    from: post.link.replace('https://programcarremotes.com', ''),
    to: `/${makeSlug}/${modelSlug}/${yearSlug}/`
  });
  
  return { filePath, content, make, model, year };
}

/**
 * Main extraction function
 */
async function main() {
  console.log('='.repeat(50));
  console.log('WordPress to Astro Content Extractor');
  console.log('='.repeat(50) + '\n');
  
  // Fetch data
  const [posts, catMap] = await Promise.all([
    fetchAllPosts(),
    fetchCategories()
  ]);
  
  // Process posts
  let success = 0;
  let errors = 0;
  
  for (const post of posts) {
    try {
      const { filePath, content, make, model, year } = convertPost(post, catMap);
      
      // Create directory
      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });
      
      // Write file
      fs.writeFileSync(filePath, content, 'utf8');
      
      console.log(`✅ ${make}/${model}/${year}.md`);
      success++;
    } catch (err) {
      console.error(`❌ Error processing post ${post.id}: ${err.message}`);
      errors++;
    }
  }
  
  // Write redirects file
  fs.writeFileSync(REDIRECTS_FILE, JSON.stringify(redirects, null, 2));
  
  console.log('\n' + '='.repeat(50));
  console.log(`Done! ${success} posts converted, ${errors} errors.`);
  console.log(`Redirects saved to: ${REDIRECTS_FILE}`);
  console.log('='.repeat(50));
}

// Run
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
