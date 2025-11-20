# Foster Greatness Projects Merge Design

**Date:** 2025-11-20
**Status:** Approved
**Target:** Create unified Foster Greatness website with full pages + embeddable widgets

## Overview

Merge 7 separate Foster Greatness projects into one fresh Next.js 16 application:
- 5 full site pages with navigation: gift-drive, gingerbread, meal-kit, storytellers, updates
- 2 embeddable widgets: circle-events, newsletter
- Shared brand system and components

## Source Projects

### Projects to Merge (Read from these directories)

| Project | Source Path | Type | Key Features |
|---------|------------|------|--------------|
| holiday-gift-drive | `/Users/cpdesign/Developer/dgw/holiday-gift-drive` | Full page | Supabase, Stripe, interactive tree |
| gingerbread-house-contest | `/Users/cpdesign/Developer/dgw/gingerbread-house-contest` | Full page | Contest, photo gallery |
| meal-kit-sponsors | `/Users/cpdesign/Developer/dgw/meal-kit-sponsors/meal-kit-sponsor` | Full page | Prisma (simplify), PDF generation |
| storytellers-collective | `/Users/cpdesign/Developer/dgw/storytellers-collective/magicui-app` | Full page | MagicUI animations, stories |
| foster-greatness-web-updates | `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates` | Full page | Current updates widget |
| circle-events-widget | `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget` | Widget | Express server → API routes |
| header-footer-fg | `/Users/cpdesign/Developer/dgw/header-footer-fg` | Reference | Convert to React components |

### Projects NOT to Merge (Leave separate)
- **header-footer-fg**: Will extract as reusable React components but keep original
- **circle-events Express server**: Convert to Next.js API routes but keep original

## Target Architecture

### New Project Location
**Target directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web` (new, to be created)

### Directory Structure

```
foster-greatness-web/                          # NEW PROJECT
├── app/
│   ├── layout.tsx                             # Root layout
│   ├── globals.css                            # Global styles
│   ├── (site)/                                # Route group: Full pages
│   │   ├── layout.tsx                         # Site layout with nav/footer
│   │   ├── page.tsx                           # Home page
│   │   ├── gift-drive/
│   │   │   ├── page.tsx                       # From: holiday-gift-drive/app/page.tsx
│   │   │   └── components/                    # Gift-drive specific components
│   │   ├── gingerbread/
│   │   │   ├── page.tsx                       # From: gingerbread-house-contest/app/page.tsx
│   │   │   └── components/
│   │   ├── meal-kit/
│   │   │   ├── page.tsx                       # From: meal-kit-sponsors/meal-kit-sponsor/app/page.tsx (simplified)
│   │   │   └── components/
│   │   ├── storytellers/
│   │   │   ├── page.tsx                       # From: storytellers-collective/magicui-app/src/app/page.tsx
│   │   │   └── components/
│   │   └── updates/
│   │       ├── page.tsx                       # From: foster-greatness-web-updates/app/page.tsx
│   │       └── components/
│   ├── widgets/                               # Route group: Embeddable widgets
│   │   ├── layout.tsx                         # Minimal widget layout (no nav/footer)
│   │   ├── circle-events/
│   │   │   ├── page.tsx                       # From: circle-events-widget/src/
│   │   │   └── api/
│   │   │       └── events/
│   │   │           └── route.ts               # Convert from: circle-events-widget/server.js
│   │   └── newsletter/
│   │       └── page.tsx                       # Create new simple form
│   └── api/                                   # Shared API routes
├── components/
│   ├── site/                                  # Site-specific components
│   │   ├── Header.tsx                         # From: header-footer-fg/index.html (convert)
│   │   ├── Footer.tsx                         # From: header-footer-fg/index.html (convert)
│   │   └── Navigation.tsx
│   ├── widgets/                               # Widget-specific components
│   └── shared/                                # Used by both site and widgets
│       ├── brand/
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   └── Typography.tsx
│       └── ui/
├── lib/
│   ├── supabase.ts                           # From: holiday-gift-drive/lib/
│   ├── stripe.ts                             # From: holiday-gift-drive/lib/
│   └── utils.ts
├── public/
│   └── assets/                               # Merge assets from all projects
├── data/
│   └── updates.json                          # From: foster-greatness-web-updates/data/
├── docs/
│   └── plans/
│       └── 2025-11-20-project-merge-design.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local                                # Combine env vars from all projects
```

## Implementation Phases

### Phase 1: Project Setup
**Working directory:** `/Users/cpdesign/Developer/dgw/`

1. Create new Next.js 16 project:
   ```bash
   cd /Users/cpdesign/Developer/dgw/
   npx create-next-app@latest foster-greatness-web \
     --typescript \
     --tailwind \
     --app \
     --no-src-dir \
     --import-alias "@/*" \
     --turbopack
   ```

2. Install dependencies:
   ```bash
   cd /Users/cpdesign/Developer/dgw/foster-greatness-web
   npm install framer-motion lucide-react @headlessui/react \
     @supabase/supabase-js stripe \
     @radix-ui/react-dialog @radix-ui/react-slot \
     class-variance-authority clsx tailwind-merge \
     date-fns react-day-picker vaul zod
   ```

3. Create directory structure:
   ```bash
   # Working directory: /Users/cpdesign/Developer/dgw/foster-greatness-web
   mkdir -p app/{site,widgets}/gift-drive
   mkdir -p app/{site,widgets}/gingerbread
   mkdir -p app/{site,widgets}/meal-kit
   mkdir -p app/{site,widgets}/storytellers
   mkdir -p app/{site,widgets}/updates
   mkdir -p app/widgets/{circle-events,newsletter}
   mkdir -p components/{site,widgets,shared/{brand,ui}}
   mkdir -p lib data public/assets docs/plans
   ```

### Phase 2: Configure Base Project
**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

1. **Copy CLAUDE.md** from current project:
   ```bash
   cp /Users/cpdesign/Developer/dgw/foster-greatness-web-updates/CLAUDE.md ./
   # Update content to reflect full site (not just widget)
   ```

2. **Configure Tailwind** with Foster Greatness brand:
   ```typescript
   // tailwind.config.ts
   colors: {
     navy: '#1a2949',
     teal: '#0067a2',
     // ... other brand colors
   }
   fontFamily: {
     sans: ['Century Gothic', 'sans-serif'],
   }
   ```

3. **Set up environment variables**:
   ```bash
   # Read from source projects and combine:
   # - holiday-gift-drive/.env.local (Supabase, Stripe)
   # - circle-events-widget/.env (Circle.so API)

   # Create: /Users/cpdesign/Developer/dgw/foster-greatness-web/.env.local
   ```

4. **Create base layouts**:
   - `app/layout.tsx` - Root layout
   - `app/(site)/layout.tsx` - Site layout with header/footer
   - `app/widgets/layout.tsx` - Minimal widget layout

### Phase 3: Shared Components & Brand System
**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Source references:**
- Read brand styles from: `/Users/cpdesign/Developer/dgw/header-footer-fg/styles.css`
- Read STYLE_GUIDE.md from any of the Next.js projects

1. **Create brand components** in `components/shared/brand/`:
   - Button.tsx - Foster Greatness styled buttons
   - Card.tsx - Consistent card designs
   - Typography.tsx - Heading and text styles

2. **Convert header/footer from static HTML**:
   - **Read from:** `/Users/cpdesign/Developer/dgw/header-footer-fg/index.html`
   - **Convert to:** `components/site/Header.tsx` and `Footer.tsx`
   - Extract HTML structure → JSX
   - Extract CSS → Tailwind classes

3. **Create shared UI components** in `components/shared/ui/`:
   - Modal.tsx
   - Form.tsx
   - LoadingSpinner.tsx

### Phase 4: Migrate Full Site Pages

#### 4.1 Updates Page (Simplest)
**Source:** `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates`
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/(site)/updates`

1. Copy `app/page.tsx` → `app/(site)/updates/page.tsx`
2. Copy `app/components/*` → `app/(site)/updates/components/`
3. Copy `data/updates.json` → `data/updates.json`
4. Update imports to use new paths

#### 4.2 Storytellers Page
**Source:** `/Users/cpdesign/Developer/dgw/storytellers-collective/magicui-app`
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/(site)/storytellers`

1. Copy `src/app/page.tsx` → `app/(site)/storytellers/page.tsx`
2. Copy components from `src/components/` → `app/(site)/storytellers/components/`
3. Preserve MagicUI animations
4. Update imports

#### 4.3 Gingerbread Contest Page
**Source:** `/Users/cpdesign/Developer/dgw/gingerbread-house-contest`
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/(site)/gingerbread`

1. Copy `app/page.tsx` → `app/(site)/gingerbread/page.tsx`
2. Copy components → `app/(site)/gingerbread/components/`
3. Copy public assets → `public/assets/gingerbread/`
4. Update imports and asset paths

#### 4.4 Gift Drive Page (Has Supabase)
**Source:** `/Users/cpdesign/Developer/dgw/holiday-gift-drive`
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/(site)/gift-drive`

1. Copy Supabase client: `lib/supabase.ts` → `lib/supabase.ts`
2. Copy Stripe setup if needed: `lib/stripe.ts` → `lib/stripe.ts`
3. Copy `app/page.tsx` → `app/(site)/gift-drive/page.tsx`
4. Copy `app/components/*` → `app/(site)/gift-drive/components/`
5. Copy public assets → `public/assets/gift-drive/`
6. Update imports
7. Verify Supabase env vars in `.env.local`

#### 4.5 Meal Kit Page (Simplified)
**Source:** `/Users/cpdesign/Developer/dgw/meal-kit-sponsors/meal-kit-sponsor`
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/(site)/meal-kit`

**Note:** Skip Prisma database setup (too complex for initial merge)

1. Copy `app/page.tsx` → `app/(site)/meal-kit/page.tsx`
2. Remove Prisma database calls - convert to static/simple data
3. Copy components → `app/(site)/meal-kit/components/`
4. For PDF generation: use client-side library instead of server-side
5. Copy public assets → `public/assets/meal-kit/`

### Phase 5: Migrate Widget Pages

#### 5.1 Newsletter Widget (Simple)
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/widgets/newsletter`

**Note:** No existing source - create new simple form

1. Create `app/widgets/newsletter/page.tsx`:
   - Simple email signup form
   - Submit to email service API
   - Minimal styling
   - Embeddable via iframe

2. No navigation, no footer
3. Uses `app/widgets/layout.tsx` automatically

#### 5.2 Circle Events Widget (Convert Express to Next.js API)
**Source:** `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget`
**Target:** `/Users/cpdesign/Developer/dgw/foster-greatness-web/app/widgets/circle-events`

**Key conversion:** Express server.js → Next.js API routes

1. **Read Express server logic:**
   - Source: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/server.js`
   - Identify all routes and their logic

2. **Convert to Next.js API routes:**
   - Create: `app/widgets/circle-events/api/events/route.ts`
   - Migrate Express route logic → Next.js Route Handlers
   - Keep same API contract (request/response format)

3. **Copy frontend:**
   - Source: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/src/`
   - Target: `app/widgets/circle-events/page.tsx`
   - Update API calls to use relative paths (`/widgets/circle-events/api/events`)

4. **Copy styles and components:**
   - Convert webpack bundled styles → Tailwind/CSS modules
   - Extract reusable components

5. **Environment variables:**
   - Copy Circle.so API keys from source `.env`
   - Add to target `.env.local`

### Phase 6: Create Home Page
**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

1. Create `app/(site)/page.tsx`:
   - Landing page with links to all sections
   - Hero section
   - Overview cards for each page
   - CTA buttons

2. Reference Foster Greatness brand guidelines

### Phase 7: Testing & Deployment
**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

1. **Local testing:**
   ```bash
   npm run dev
   # Test all routes:
   # - http://localhost:3000/
   # - http://localhost:3000/gift-drive
   # - http://localhost:3000/gingerbread
   # - http://localhost:3000/meal-kit
   # - http://localhost:3000/storytellers
   # - http://localhost:3000/updates
   # - http://localhost:3000/widgets/circle-events
   # - http://localhost:3000/widgets/newsletter
   ```

2. **Test widget embedding:**
   ```html
   <!-- Create test HTML file -->
   <iframe src="http://localhost:3000/widgets/circle-events"></iframe>
   <iframe src="http://localhost:3000/widgets/newsletter"></iframe>
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   # Deploy to Vercel
   vercel --prod
   ```

4. **Post-deployment verification:**
   - Test all routes on production
   - Verify widget embeds work from external domains
   - Check all environment variables are set
   - Test Supabase connections
   - Verify API routes work

## Migration Checklist

### Pre-migration
- [ ] Create new Next.js 16 project at `/Users/cpdesign/Developer/dgw/foster-greatness-web`
- [ ] Install all dependencies
- [ ] Set up directory structure
- [ ] Configure Tailwind with brand colors
- [ ] Create base layouts (root, site, widget)

### Components
- [ ] Convert header from header-footer-fg to React
- [ ] Convert footer from header-footer-fg to React
- [ ] Create shared brand components (Button, Card, Typography)
- [ ] Create shared UI components (Modal, Form, etc.)

### Full Pages (work in target directory)
- [ ] Migrate updates page from foster-greatness-web-updates
- [ ] Migrate storytellers page from storytellers-collective/magicui-app
- [ ] Migrate gingerbread page from gingerbread-house-contest
- [ ] Migrate gift-drive page from holiday-gift-drive (+ Supabase)
- [ ] Migrate meal-kit page from meal-kit-sponsors (simplified, no Prisma)
- [ ] Create home page (new)

### Widgets (work in target directory)
- [ ] Create newsletter widget (new)
- [ ] Migrate circle-events widget from circle-events-widget
- [ ] Convert Express server.js to Next.js API routes

### Configuration
- [ ] Combine environment variables from all projects into .env.local
- [ ] Copy CLAUDE.md and update for full site context
- [ ] Set up next.config.ts with any needed redirects
- [ ] Configure any external service integrations (Supabase, Stripe, Circle.so)

### Testing
- [ ] Test all full page routes locally
- [ ] Test widget routes locally
- [ ] Test widget embedding in iframe
- [ ] Build production bundle
- [ ] Deploy to Vercel
- [ ] Verify all routes on production
- [ ] Test widgets embedded from external domain

## Key Considerations

### Directory Context
- **Source reading**: Always use full absolute paths when reading from source projects
- **Target writing**: Work in `/Users/cpdesign/Developer/dgw/foster-greatness-web` for all new files
- **No modifications to source projects**: All source projects remain unchanged

### Dependency Management
- Use Next.js 16 + React 19.2 (latest stable)
- Consolidate to single Tailwind config
- Keep Supabase for gift-drive data only
- Keep Stripe for gift-drive donations only
- Skip Prisma (too complex for initial merge)

### Widget Considerations
- Widgets use minimal layout (no header/footer)
- Widgets should be fully functional standalone
- iframe embedding must work from any domain
- API routes must be co-located with widgets

### Simplifications
- **Meal-kit**: Remove Prisma, convert to simple data or static content
- **Newsletter**: Create new simple form instead of complex widget
- **Circle-events**: Convert Express server to Next.js API routes

### Brand Consistency
- All projects follow Foster Greatness brand guidelines
- Navy (#1a2949) and Teal (#0067a2) primary colors
- Century Gothic typography
- No charity/deficit language
- Dignity-centered voice

## Success Criteria

- [ ] Single Next.js 16 application running
- [ ] All 5 full pages accessible and functional
- [ ] Both widgets embeddable via iframe
- [ ] Shared navigation works on full pages
- [ ] Widgets have no navigation
- [ ] All Foster Greatness brand elements consistent
- [ ] Supabase integration working for gift-drive
- [ ] Circle events API routes working
- [ ] Production deployment successful
- [ ] All source projects remain unchanged

## Future Enhancements (Out of Scope)
- Restore Prisma database for meal-kit
- Add authentication system
- Create admin panel for content management
- Add analytics tracking
- Implement comprehensive testing suite
- Set up CI/CD pipeline
- Add internationalization (i18n)
