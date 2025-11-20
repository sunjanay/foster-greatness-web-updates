# Foster Greatness Projects Merge Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Merge 7 separate Foster Greatness projects into one unified Next.js 16 application with full pages and embeddable widgets.

**Architecture:** Fresh Next.js 16 app with route groups: `(site)` for full pages with navigation, `widgets` for embeddable content. Shared component library with Foster Greatness brand system. Convert Express server to Next.js API routes.

**Tech Stack:** Next.js 16, React 19.2, TypeScript, Tailwind CSS, Framer Motion, Supabase (gift-drive only), Radix UI

---

## Pre-Implementation Notes

**Working directories:**
- **Read from (sources):** Various paths listed per task
- **Write to (target):** `/Users/cpdesign/Developer/dgw/foster-greatness-web` (new project)

**Principles:**
- DRY: Share components, don't duplicate
- YAGNI: Skip complex features (Prisma, etc.)
- TDD: Test each page route works
- Frequent commits: After each completed task

---

## Task 1: Create New Next.js Project

**Files:**
- Create: `/Users/cpdesign/Developer/dgw/foster-greatness-web/` (entire project)

**Step 1: Navigate to parent directory**

```bash
cd /Users/cpdesign/Developer/dgw/
```

**Step 2: Create Next.js 16 project**

```bash
npx create-next-app@latest foster-greatness-web \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --turbopack \
  --yes
```

Expected output: Project created successfully

**Step 3: Navigate into project**

```bash
cd foster-greatness-web
```

**Step 4: Verify project works**

```bash
npm run dev
```

Expected: Server running on http://localhost:3000

Stop server with Ctrl+C

**Step 5: Initial git commit**

```bash
git add .
git commit -m "chore: initialize Next.js 16 project for Foster Greatness merge"
```

---

## Task 2: Install Dependencies

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Modify: `package.json`

**Step 1: Install core dependencies**

```bash
npm install framer-motion lucide-react @headlessui/react \
  class-variance-authority clsx tailwind-merge \
  date-fns vaul zod
```

**Step 2: Install Radix UI components**

```bash
npm install @radix-ui/react-dialog @radix-ui/react-slot \
  @radix-ui/react-accordion @radix-ui/react-popover \
  @radix-ui/react-radio-group
```

**Step 3: Install Supabase and Stripe (for gift-drive)**

```bash
npm install @supabase/supabase-js stripe
```

**Step 4: Install additional utilities**

```bash
npm install react-day-picker axios cors dotenv express
```

**Step 5: Verify installation**

```bash
npm list --depth=0
```

Expected: All packages installed without errors

**Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install dependencies for merged projects"
```

---

## Task 3: Create Directory Structure

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: Multiple directories

**Step 1: Create app route directories**

```bash
mkdir -p app/\(site\)/{gift-drive,gingerbread,meal-kit,storytellers,updates}
mkdir -p app/widgets/{circle-events,newsletter}
```

**Step 2: Create component directories**

```bash
mkdir -p components/{site,widgets,shared/{brand,ui}}
```

**Step 3: Create lib and data directories**

```bash
mkdir -p lib data public/assets docs/plans
```

**Step 4: Create API routes structure**

```bash
mkdir -p app/widgets/circle-events/api/events
```

**Step 5: Verify structure**

```bash
ls -la app/
ls -la components/
ls -la lib/
```

Expected: All directories exist

**Step 6: Commit**

```bash
git add .
git commit -m "chore: create directory structure for merged projects"
```

---

## Task 4: Configure Tailwind with Brand Colors

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Modify: `tailwind.config.ts`
- Reference: `/Users/cpdesign/Developer/dgw/header-footer-fg/styles.css` (read brand colors)

**Step 1: Read brand colors from header-footer-fg**

Read file: `/Users/cpdesign/Developer/dgw/header-footer-fg/styles.css`
Extract: Navy (#1a2949), Teal (#0067a2), and other brand colors

**Step 2: Update Tailwind config**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: '#1a2949',
          light: '#2a3959',
          dark: '#0a1929',
        },
        teal: {
          DEFAULT: '#0067a2',
          light: '#1087c2',
          dark: '#004782',
        },
        gold: '#f4b942',
        coral: '#ff6b6b',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Century Gothic', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 3: Update globals.css with brand CSS variables**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #1a2949;
  --navy: #1a2949;
  --teal: #0067a2;
  --gold: #f4b942;
  --coral: #ff6b6b;
}

@layer base {
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```

**Step 4: Test Tailwind works**

```bash
npm run dev
```

Visit http://localhost:3000 - should see default page with no errors
Stop server with Ctrl+C

**Step 5: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind with Foster Greatness brand colors"
```

---

## Task 5: Create CLAUDE.md Project Instructions

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `CLAUDE.md`
- Reference: `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates/CLAUDE.md`

**Step 1: Create CLAUDE.md**

```markdown
# Project Context

## What This Is

This is the **main Foster Greatness website** with integrated pages and embeddable widgets. It combines multiple Foster Greatness projects into one unified Next.js application.

## Architecture

### Full Site Pages (with navigation)
- `/` - Home page
- `/gift-drive` - Holiday gift drive with Supabase data
- `/gingerbread` - Gingerbread house contest
- `/meal-kit` - Meal kit sponsors
- `/storytellers` - Storytellers collective
- `/updates` - Updates and news

### Embeddable Widgets (no navigation)
- `/widgets/circle-events` - Circle.so events widget
- `/widgets/newsletter` - Newsletter signup widget

## Important Context

### Full Pages
- **Include site header and footer** - Full navigation and branding
- **Integrated user experience** - Cohesive flow between pages
- **Shared components** - Reuse brand components

### Widgets
- **No page headers or navigation** - Designed for iframe embedding
- **Minimal layout** - Just the widget content
- **Standalone functionality** - Must work embedded anywhere

## When Improving UX/Design

Focus on:
- Consistency across all pages
- Link label specificity (front-load keywords)
- Visual hierarchy within pages
- Spacing and typography
- Color usage per brand guidelines
- Component reusability

Do NOT:
- **EVER modify quotes** - Quotes are attributed to real people and must never be changed
- Break widget embedding functionality
- Add navigation to widgets
- Change brand colors or typography

## Brand Guidelines

Follow the Foster Greatness brand system:
- Colors: Navy (#1a2949), Teal (#0067a2), Gold (#f4b942), Coral (#ff6b6b)
- Typography: Century Gothic
- Voice: Authentic, empowering, dignity-centered
- No charity/deficit language

## Data Sources

- **Gift Drive**: Supabase database (env vars required)
- **Updates**: `data/updates.json` file
- **Circle Events**: Circle.so API (env vars required)
- **Other pages**: Static content or simple data files
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add project instructions for Claude"
```

---

## Task 6: Create Environment Variables File

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `.env.local`
- Reference: `/Users/cpdesign/Developer/dgw/holiday-gift-drive/.env.local` (Supabase, Stripe)
- Reference: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/.env` (Circle.so)

**Step 1: Create .env.local template**

```bash
# .env.local

# Supabase (for gift-drive)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe (for gift-drive donations)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
STRIPE_SECRET_KEY=your_stripe_secret_here

# Circle.so (for circle-events widget)
CIRCLE_API_KEY=your_circle_api_key_here
CIRCLE_COMMUNITY_ID=your_community_id_here

# Email Service (for newsletter widget)
EMAIL_SERVICE_API_KEY=your_email_service_key_here
```

**Step 2: Create .env.example**

```bash
cp .env.local .env.example
```

**Step 3: Update .gitignore**

Verify `.env.local` is in `.gitignore`:

```bash
grep -q ".env.local" .gitignore || echo ".env.local" >> .gitignore
```

**Step 4: Commit .env.example only**

```bash
git add .env.example .gitignore
git commit -m "chore: add environment variables template"
```

**Note:** User will need to populate .env.local with actual values from source projects

---

## Task 7: Create Shared Brand Components

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `components/shared/brand/Button.tsx`
- Create: `components/shared/brand/Card.tsx`
- Create: `components/shared/brand/Typography.tsx`

**Step 1: Create Button component**

```typescript
// components/shared/brand/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-teal text-white hover:bg-teal-dark',
        secondary: 'bg-navy text-white hover:bg-navy-light',
        outline: 'border-2 border-teal text-teal hover:bg-teal hover:text-white',
        ghost: 'text-navy hover:bg-navy/10',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

**Step 2: Create Card component**

```typescript
// components/shared/brand/Card.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6',
          {
            'bg-white shadow-sm': variant === 'default',
            'bg-white shadow-lg hover:shadow-xl transition-shadow': variant === 'elevated',
            'border-2 border-navy/10': variant === 'outlined',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-bold text-navy', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-navy/80', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
```

**Step 3: Create Typography components**

```typescript
// components/shared/brand/Typography.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Heading1 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('text-4xl md:text-5xl lg:text-6xl font-bold text-navy', className)}
      {...props}
    />
  )
);
Heading1.displayName = 'Heading1';

export const Heading2 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-3xl md:text-4xl lg:text-5xl font-bold text-navy', className)}
      {...props}
    />
  )
);
Heading2.displayName = 'Heading2';

export const Heading3 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl md:text-3xl font-bold text-navy', className)}
      {...props}
    />
  )
);
Heading3.displayName = 'Heading3';

export const BodyText = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-base md:text-lg text-navy/80 leading-relaxed', className)}
      {...props}
    />
  )
);
BodyText.displayName = 'BodyText';
```

**Step 4: Create utils helper**

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 5: Test components compile**

```bash
npm run build
```

Expected: Build succeeds without errors

**Step 6: Commit**

```bash
git add components/shared/brand/ lib/utils.ts
git commit -m "feat: create shared brand components (Button, Card, Typography)"
```

---

## Task 8: Convert Header and Footer from HTML to React

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `components/site/Header.tsx`
- Create: `components/site/Footer.tsx`
- Reference: `/Users/cpdesign/Developer/dgw/header-footer-fg/index.html`
- Reference: `/Users/cpdesign/Developer/dgw/header-footer-fg/styles.css`

**Step 1: Read header-footer HTML**

Read file: `/Users/cpdesign/Developer/dgw/header-footer-fg/index.html`
Identify header and footer structure

**Step 2: Create Header component**

```typescript
// components/site/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/shared/brand/Button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Gift Drive', href: '/gift-drive' },
    { name: 'Gingerbread Contest', href: '/gingerbread' },
    { name: 'Meal Kit Sponsors', href: '/meal-kit' },
    { name: 'Storytellers', href: '/storytellers' },
    { name: 'Updates', href: '/updates' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-navy">
              Foster Greatness
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-navy hover:text-teal transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm">
              Donate
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-navy hover:text-teal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button variant="primary" size="sm" className="w-full">
                Donate
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Step 3: Create Footer component**

```typescript
// components/site/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];

  const footerLinks = {
    about: [
      { name: 'Our Mission', href: '#' },
      { name: 'Our Team', href: '#' },
      { name: 'Impact', href: '#' },
    ],
    programs: [
      { name: 'Gift Drive', href: '/gift-drive' },
      { name: 'Meal Kits', href: '/meal-kit' },
      { name: 'Storytellers', href: '/storytellers' },
    ],
    connect: [
      { name: 'Contact Us', href: '#' },
      { name: 'Newsletter', href: '/widgets/newsletter' },
      { name: 'Events', href: '/widgets/circle-events' },
    ],
  };

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Foster Greatness</h3>
            <p className="text-white/80">
              Creating lifelong community and belonging for current and former foster youth nationwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-teal transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-teal transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 mb-4">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/80 hover:text-teal transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-white/80 hover:text-teal transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Foster Greatness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Test components compile**

```bash
npm run build
```

Expected: Build succeeds without errors

**Step 5: Commit**

```bash
git add components/site/
git commit -m "feat: create Header and Footer components from static HTML"
```

---

## Task 9: Create Base Layouts

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Modify: `app/layout.tsx` (root layout)
- Create: `app/(site)/layout.tsx` (site layout with header/footer)
- Create: `app/widgets/layout.tsx` (minimal widget layout)

**Step 1: Update root layout**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foster Greatness",
  description: "Creating lifelong community and belonging for current and former foster youth nationwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Create site layout with header and footer**

```typescript
// app/(site)/layout.tsx
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**Step 3: Create minimal widget layout**

```typescript
// app/widgets/layout.tsx
export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="widget-container">
      {/* No header, no footer - minimal layout for embedding */}
      {children}
    </div>
  );
}
```

**Step 4: Create temporary home page**

```typescript
// app/(site)/page.tsx
import { Heading1, Heading2, BodyText } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
import { Button } from '@/components/shared/brand/Button';
import Link from 'next/link';

export default function HomePage() {
  const pages = [
    { title: 'Gift Drive', href: '/gift-drive', description: 'Support our holiday gift drive' },
    { title: 'Gingerbread Contest', href: '/gingerbread', description: 'View contest entries' },
    { title: 'Meal Kit Sponsors', href: '/meal-kit', description: 'Become a meal kit sponsor' },
    { title: 'Storytellers', href: '/storytellers', description: 'Read inspiring stories' },
    { title: 'Updates', href: '/updates', description: 'Latest news and updates' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-teal text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Heading1 className="text-white mb-6">Welcome to Foster Greatness</Heading1>
          <BodyText className="text-white/90 text-xl mb-8 max-w-3xl mx-auto">
            Creating lifelong community and belonging for current and former foster youth nationwide.
          </BodyText>
          <Button variant="secondary" size="lg">
            Get Involved
          </Button>
        </div>
      </section>

      {/* Pages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Heading2 className="text-center mb-12">Explore Our Programs</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => (
              <Card key={page.href} variant="elevated">
                <CardHeader>
                  <CardTitle>{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BodyText className="mb-4">{page.description}</BodyText>
                  <Link href={page.href}>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 5: Test layouts work**

```bash
npm run dev
```

Visit http://localhost:3000
Expected: See home page with header and footer
Stop server with Ctrl+C

**Step 6: Commit**

```bash
git add app/layout.tsx app/\(site\)/ app/widgets/layout.tsx
git commit -m "feat: create base layouts (root, site with header/footer, widget)"
```

---

## Task 10: Migrate Updates Page

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/(site)/updates/page.tsx`
- Create: `data/updates.json`
- Reference: `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates/app/page.tsx`
- Reference: `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates/data/updates.json`

**Step 1: Copy updates data**

Read from: `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates/data/updates.json`

Copy to: `data/updates.json`

**Step 2: Read source updates page**

Read file: `/Users/cpdesign/Developer/dgw/foster-greatness-web-updates/app/page.tsx`

**Step 3: Create updates page (adapt from source)**

```typescript
// app/(site)/updates/page.tsx
import { Heading1, Heading2 } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
import updatesData from '@/data/updates.json';

export default function UpdatesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading1 className="text-center mb-12">Updates & News</Heading1>

        <div className="space-y-8">
          {updatesData.updates.map((update: any) => (
            <Card key={update.id} variant="elevated">
              <CardHeader>
                <CardTitle>{update.title}</CardTitle>
                <p className="text-sm text-navy/60">{update.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-navy/80">{update.content}</p>
                {update.cta && (
                  <a
                    href={update.cta.url}
                    className="inline-block mt-4 text-teal hover:underline font-medium"
                  >
                    {update.cta.text} →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Test updates page**

```bash
npm run dev
```

Visit http://localhost:3000/updates
Expected: See updates page with data from JSON
Stop server with Ctrl+C

**Step 5: Commit**

```bash
git add app/\(site\)/updates/ data/updates.json
git commit -m "feat: migrate updates page from foster-greatness-web-updates"
```

---

## Task 11: Migrate Storytellers Page

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/(site)/storytellers/page.tsx`
- Create: `app/(site)/storytellers/components/` (if needed)
- Reference: `/Users/cpdesign/Developer/dgw/storytellers-collective/magicui-app/src/app/page.tsx`

**Step 1: Read storytellers source**

Read file: `/Users/cpdesign/Developer/dgw/storytellers-collective/magicui-app/src/app/page.tsx`
Read directory: `/Users/cpdesign/Developer/dgw/storytellers-collective/magicui-app/src/components/`

**Step 2: Copy storytellers page (adapt structure, preserve animations)**

Note: Exact implementation depends on source content. Use source as reference and adapt to our brand components.

Basic structure:

```typescript
// app/(site)/storytellers/page.tsx
import { Heading1, Heading2 } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';

export default function StorytellersPage() {
  // Adapt content from source
  const stories = [
    {
      id: 1,
      title: 'Story Title',
      author: 'Author Name',
      content: 'Story content...',
    },
    // More stories...
  ];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading1 className="text-center mb-12">Storytellers Collective</Heading1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <Card key={story.id} variant="elevated">
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
                <p className="text-sm text-navy/60">by {story.author}</p>
              </CardHeader>
              <CardContent>
                <p className="text-navy/80">{story.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Copy any specific components needed**

If source has custom components, copy them to `app/(site)/storytellers/components/`

**Step 4: Copy any assets**

Copy images/assets to `public/assets/storytellers/`

**Step 5: Test storytellers page**

```bash
npm run dev
```

Visit http://localhost:3000/storytellers
Expected: See storytellers page
Stop server with Ctrl+C

**Step 6: Commit**

```bash
git add app/\(site\)/storytellers/ public/assets/storytellers/
git commit -m "feat: migrate storytellers page from storytellers-collective"
```

**Note to implementer:** Read actual source files and adapt content appropriately while preserving MagicUI animations if present.

---

## Task 12: Migrate Gingerbread Contest Page

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/(site)/gingerbread/page.tsx`
- Create: `app/(site)/gingerbread/components/` (if needed)
- Reference: `/Users/cpdesign/Developer/dgw/gingerbread-house-contest/app/page.tsx`

**Step 1: Read gingerbread source**

Read file: `/Users/cpdesign/Developer/dgw/gingerbread-house-contest/app/page.tsx`
Read directory: `/Users/cpdesign/Developer/dgw/gingerbread-house-contest/app/components/`
Read directory: `/Users/cpdesign/Developer/dgw/gingerbread-house-contest/public/`

**Step 2: Copy gingerbread page structure**

Adapt to our layout and brand components:

```typescript
// app/(site)/gingerbread/page.tsx
import { Heading1, Heading2 } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
import { Button } from '@/components/shared/brand/Button';

export default function GingerbreadPage() {
  // Adapt from source
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading1 className="text-center mb-12">Gingerbread House Contest</Heading1>

        {/* Contest Info */}
        <Card variant="elevated" className="mb-12">
          <CardHeader>
            <CardTitle>About the Contest</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-navy/80 mb-4">
              Join our annual gingerbread house contest...
            </p>
            <Button variant="primary">Submit Your Entry</Button>
          </CardContent>
        </Card>

        {/* Gallery */}
        <Heading2 className="mb-8">Contest Entries</Heading2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map through entries */}
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Copy components if needed**

Copy custom components from source to `app/(site)/gingerbread/components/`

**Step 4: Copy assets**

```bash
# From source
cp -r /Users/cpdesign/Developer/dgw/gingerbread-house-contest/public/* public/assets/gingerbread/
```

**Step 5: Test gingerbread page**

```bash
npm run dev
```

Visit http://localhost:3000/gingerbread
Expected: See contest page with gallery
Stop server with Ctrl+C

**Step 6: Commit**

```bash
git add app/\(site\)/gingerbread/ public/assets/gingerbread/
git commit -m "feat: migrate gingerbread contest page"
```

---

## Task 13: Set Up Supabase Client

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `lib/supabase.ts`
- Reference: `/Users/cpdesign/Developer/dgw/holiday-gift-drive/lib/` (supabase setup)

**Step 1: Read Supabase setup from source**

Read file: `/Users/cpdesign/Developer/dgw/holiday-gift-drive/lib/supabase.ts` (or similar)

**Step 2: Create Supabase client**

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for gift data (adapt from source schema)
export interface Gift {
  id: string;
  recipient_name: string;
  age: number;
  interests: string[];
  wishlist_items: string[];
  claimed: boolean;
  created_at: string;
}
```

**Step 3: Test Supabase connection (optional utility)**

```typescript
// lib/supabase.ts (add to bottom)

// Utility to test connection
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('gifts').select('count');
    if (error) throw error;
    console.log('Supabase connected successfully');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}
```

**Step 4: Commit**

```bash
git add lib/supabase.ts
git commit -m "feat: add Supabase client for gift-drive data"
```

**Note:** User needs to populate .env.local with actual Supabase credentials before testing

---

## Task 14: Migrate Gift Drive Page

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/(site)/gift-drive/page.tsx`
- Create: `app/(site)/gift-drive/components/` (interactive tree, modals, etc.)
- Reference: `/Users/cpdesign/Developer/dgw/holiday-gift-drive/app/`

**Step 1: Read gift-drive source files**

Read directory: `/Users/cpdesign/Developer/dgw/holiday-gift-drive/app/`
Identify key components:
- Main page
- Interactive tree component
- Gift detail modal
- Donation flow

**Step 2: Copy main page structure**

```typescript
// app/(site)/gift-drive/page.tsx
import { Heading1 } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
// Import gift-drive specific components

export default function GiftDrivePage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading1 className="text-center mb-12">Holiday Gift Drive</Heading1>

        {/* Interactive tree component */}
        {/* Gift details modal */}
        {/* Browse all grid */}
      </div>
    </div>
  );
}
```

**Step 3: Copy gift-drive components**

Copy components from source to `app/(site)/gift-drive/components/`:
- InteractiveTree.tsx
- GiftModal.tsx
- GiftCard.tsx
- etc.

Adapt imports and styling to use our brand components.

**Step 4: Copy Stripe integration if needed**

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export default stripe;

// Client-side
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

**Step 5: Copy assets**

```bash
cp -r /Users/cpdesign/Developer/dgw/holiday-gift-drive/public/* public/assets/gift-drive/
```

**Step 6: Test gift-drive page**

```bash
npm run dev
```

Visit http://localhost:3000/gift-drive
Expected: See gift drive page (data requires Supabase credentials)
Stop server with Ctrl+C

**Step 7: Commit**

```bash
git add app/\(site\)/gift-drive/ lib/stripe.ts public/assets/gift-drive/
git commit -m "feat: migrate gift-drive page with Supabase and Stripe integration"
```

**Note:** This is a complex page. Take time to properly migrate all components and test thoroughly.

---

## Task 15: Migrate Meal Kit Page (Simplified)

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/(site)/meal-kit/page.tsx`
- Reference: `/Users/cpdesign/Developer/dgw/meal-kit-sponsors/meal-kit-sponsor/app/page.tsx`

**Step 1: Read meal-kit source**

Read file: `/Users/cpdesign/Developer/dgw/meal-kit-sponsors/meal-kit-sponsor/app/page.tsx`

**Important:** Skip Prisma database. Convert to static or simple data.

**Step 2: Create simplified meal-kit page**

```typescript
// app/(site)/meal-kit/page.tsx
import { Heading1, Heading2, BodyText } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
import { Button } from '@/components/shared/brand/Button';

export default function MealKitPage() {
  // Static data instead of Prisma
  const sponsorInfo = {
    description: 'Support foster youth with meal kit sponsorships...',
    impact: 'Each meal kit provides...',
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading1 className="text-center mb-12">Meal Kit Sponsors</Heading1>

        <Card variant="elevated" className="mb-12">
          <CardHeader>
            <CardTitle>About the Program</CardTitle>
          </CardHeader>
          <CardContent>
            <BodyText className="mb-4">{sponsorInfo.description}</BodyText>
            <BodyText className="mb-6">{sponsorInfo.impact}</BodyText>
            <Button variant="primary">Become a Sponsor</Button>
          </CardContent>
        </Card>

        {/* Additional sections from source, simplified */}
      </div>
    </div>
  );
}
```

**Step 3: Copy simplified components**

Extract UI components from source (skip database logic):
- Sponsor card displays
- Info sections
- Forms (simplified)

**Step 4: Copy assets**

```bash
cp -r /Users/cpdesign/Developer/dgw/meal-kit-sponsors/meal-kit-sponsor/public/* public/assets/meal-kit/
```

**Step 5: Test meal-kit page**

```bash
npm run dev
```

Visit http://localhost:3000/meal-kit
Expected: See meal-kit page with static content
Stop server with Ctrl+C

**Step 6: Commit**

```bash
git add app/\(site\)/meal-kit/ public/assets/meal-kit/
git commit -m "feat: migrate meal-kit page (simplified without Prisma)"
```

---

## Task 16: Create Newsletter Widget

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/widgets/newsletter/page.tsx`

**Note:** This is a new simple widget (no existing source)

**Step 1: Create newsletter widget**

```typescript
// app/widgets/newsletter/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/brand/Button';
import { Heading3, BodyText } from '@/components/shared/brand/Typography';

export default function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Replace with actual email service API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-navy to-teal">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-xl">
        <Heading3 className="mb-4 text-center">Stay Connected</Heading3>
        <BodyText className="mb-6 text-center">
          Subscribe to our newsletter for updates and stories from the Foster Greatness community.
        </BodyText>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border-2 border-navy/20 rounded-lg focus:outline-none focus:border-teal transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>

          {message && (
            <p
              className={`text-center text-sm ${
                status === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
```

**Step 2: Create API route for newsletter**

```typescript
// app/api/newsletter/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual email service (Mailchimp, SendGrid, etc.)
    // For now, just log it
    console.log('Newsletter subscription:', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Step 3: Test newsletter widget**

```bash
npm run dev
```

Visit http://localhost:3000/widgets/newsletter
Expected: See newsletter form (embeddable design, no header/footer)
Stop server with Ctrl+C

**Step 4: Test embedding**

Create test file `test-embed.html`:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Newsletter Widget Test</h1>
  <iframe
    src="http://localhost:3000/widgets/newsletter"
    width="500"
    height="400"
    frameborder="0">
  </iframe>
</body>
</html>
```

Open in browser and verify widget works in iframe.

**Step 5: Commit**

```bash
git add app/widgets/newsletter/ app/api/newsletter/
git commit -m "feat: create newsletter subscription widget with API route"
```

---

## Task 17: Read Circle Events Widget Source

**Working directory:** Read from source, don't write yet

**Files:**
- Reference: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/server.js`
- Reference: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/src/`

**Step 1: Read Express server code**

Read file: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/server.js`

Identify:
- API routes
- Circle.so API calls
- Request/response formats
- CORS configuration

**Step 2: Read frontend code**

Read directory: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/src/`

Identify:
- Main component structure
- How it fetches data
- UI components
- Styling approach

**Step 3: Document findings**

Create notes about:
- What routes to convert
- What API calls to make
- What data structure is used
- What environment variables are needed

**No commit needed - this is research only**

---

## Task 18: Convert Circle Events Express Server to API Routes

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/widgets/circle-events/api/events/route.ts`
- Reference: Notes from previous task

**Step 1: Create events API route**

Based on source server.js, convert Express routes to Next.js:

```typescript
// app/widgets/circle-events/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const CIRCLE_API_KEY = process.env.CIRCLE_API_KEY;
const CIRCLE_COMMUNITY_ID = process.env.CIRCLE_COMMUNITY_ID;

if (!CIRCLE_API_KEY || !CIRCLE_COMMUNITY_ID) {
  console.warn('Circle.so API credentials missing');
}

export async function GET(request: NextRequest) {
  try {
    // Fetch events from Circle.so API
    const response = await axios.get(
      `https://app.circle.so/api/v1/communities/${CIRCLE_COMMUNITY_ID}/events`,
      {
        headers: {
          'Authorization': `Bearer ${CIRCLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Format response (adapt based on actual API structure)
    const events = response.data.events || [];

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Circle API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// Add CORS headers for embedding
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

**Step 2: Test API route**

```bash
npm run dev
```

Visit http://localhost:3000/widgets/circle-events/api/events
Expected: JSON response with events (or error if no credentials)

**Step 3: Commit**

```bash
git add app/widgets/circle-events/api/
git commit -m "feat: convert circle-events Express server to Next.js API routes"
```

---

## Task 19: Migrate Circle Events Widget Frontend

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `app/widgets/circle-events/page.tsx`
- Create: `app/widgets/circle-events/components/` (if needed)
- Reference: `/Users/cpdesign/CascadeProjects/windsurf-project/circle-events-widget/src/`

**Step 1: Create circle-events widget page**

```typescript
// app/widgets/circle-events/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
import { Button } from '@/components/shared/brand/Button';
import { Heading2 } from '@/components/shared/brand/Typography';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  description: string;
  start_date: string;
  location?: string;
  url: string;
}

export default function CircleEventsWidget() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/widgets/circle-events/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');

      const data = await response.json();
      setEvents(data.events || []);
      setLoading(false);
    } catch (err) {
      setError('Unable to load events');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p className="text-navy">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card variant="outlined">
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Heading2 className="mb-8 text-center">Upcoming Events</Heading2>

        {events.length === 0 ? (
          <Card variant="elevated">
            <CardContent className="text-center py-12">
              <Calendar className="mx-auto mb-4 text-navy/40" size={48} />
              <p className="text-navy/60">No upcoming events at this time.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} variant="elevated">
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-navy/80">{event.description}</p>

                    <div className="flex items-center gap-2 text-sm text-navy/60">
                      <Clock size={16} />
                      <span>{new Date(event.start_date).toLocaleDateString()}</span>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-navy/60">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <a href={event.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm">
                          View Event Details
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Test circle-events widget**

```bash
npm run dev
```

Visit http://localhost:3000/widgets/circle-events
Expected: See events widget (requires Circle.so credentials for real data)
Stop server with Ctrl+C

**Step 3: Test embedding**

Create or update test-embed.html:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Circle Events Widget Test</h1>
  <iframe
    src="http://localhost:3000/widgets/circle-events"
    width="800"
    height="600"
    frameborder="0">
  </iframe>
</body>
</html>
```

Verify widget works in iframe.

**Step 4: Commit**

```bash
git add app/widgets/circle-events/page.tsx
git commit -m "feat: migrate circle-events widget frontend with API integration"
```

---

## Task 20: Update Home Page with All Links

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Modify: `app/(site)/page.tsx`

**Step 1: Update home page with complete navigation**

```typescript
// app/(site)/page.tsx
import { Heading1, Heading2, BodyText } from '@/components/shared/brand/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/brand/Card';
import { Button } from '@/components/shared/brand/Button';
import Link from 'next/link';
import { Gift, Cake, Package, Users, Newspaper, Calendar, Mail } from 'lucide-react';

export default function HomePage() {
  const pages = [
    {
      title: 'Gift Drive',
      href: '/gift-drive',
      description: 'Support our holiday gift drive with interactive giving',
      icon: Gift,
      color: 'text-coral',
    },
    {
      title: 'Gingerbread Contest',
      href: '/gingerbread',
      description: 'View entries from our annual gingerbread house contest',
      icon: Cake,
      color: 'text-gold',
    },
    {
      title: 'Meal Kit Sponsors',
      href: '/meal-kit',
      description: 'Become a sponsor and provide meals to foster youth',
      icon: Package,
      color: 'text-teal',
    },
    {
      title: 'Storytellers',
      href: '/storytellers',
      description: 'Read inspiring stories from our community',
      icon: Users,
      color: 'text-navy',
    },
    {
      title: 'Updates',
      href: '/updates',
      description: 'Stay informed with our latest news and updates',
      icon: Newspaper,
      color: 'text-teal-dark',
    },
  ];

  const widgets = [
    {
      title: 'Upcoming Events',
      href: '/widgets/circle-events',
      description: 'View our community events calendar',
      icon: Calendar,
    },
    {
      title: 'Newsletter',
      href: '/widgets/newsletter',
      description: 'Subscribe to stay connected',
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-teal text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Heading1 className="text-white mb-6">Welcome to Foster Greatness</Heading1>
          <BodyText className="text-white/90 text-xl mb-8 max-w-3xl mx-auto">
            Creating lifelong community and belonging for current and former foster youth nationwide.
          </BodyText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Get Involved
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Heading2 className="text-center mb-4">Our Programs</Heading2>
          <BodyText className="text-center mb-12 max-w-2xl mx-auto">
            Explore our initiatives supporting foster youth through community, resources, and belonging.
          </BodyText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <Card key={page.href} variant="elevated" className="hover:shadow-2xl transition-shadow">
                  <CardHeader>
                    <Icon className={`mb-4 ${page.color}`} size={32} />
                    <CardTitle>{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodyText className="mb-4">{page.description}</BodyText>
                    <Link href={page.href}>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Widgets Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Heading2 className="text-center mb-12">Stay Connected</Heading2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {widgets.map((widget) => {
              const Icon = widget.icon;
              return (
                <Card key={widget.href} variant="outlined">
                  <CardHeader>
                    <Icon className="mb-4 text-teal" size={28} />
                    <CardTitle className="text-xl">{widget.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodyText className="mb-4 text-sm">{widget.description}</BodyText>
                    <Link href={widget.href}>
                      <Button variant="ghost" size="sm" className="w-full">
                        View →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Heading2 className="text-white mb-6">Join Our Community</Heading2>
          <BodyText className="text-white/90 mb-8 text-lg">
            Together, we create belonging and empower foster youth to thrive.
          </BodyText>
          <Button variant="secondary" size="lg">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Test home page**

```bash
npm run dev
```

Visit http://localhost:3000
Expected: See complete home page with all program cards and links
Test all links work
Stop server with Ctrl+C

**Step 3: Commit**

```bash
git add app/\(site\)/page.tsx
git commit -m "feat: complete home page with all programs and widgets"
```

---

## Task 21: Create README Documentation

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Files:**
- Create: `README.md`

**Step 1: Create comprehensive README**

```markdown
# Foster Greatness Website

Complete Foster Greatness website with integrated pages and embeddable widgets.

## Overview

This Next.js 16 application consolidates multiple Foster Greatness projects into one unified website featuring:

### Full Site Pages (with navigation)
- **Home** (`/`) - Landing page with program overview
- **Gift Drive** (`/gift-drive`) - Interactive holiday gift drive with Supabase
- **Gingerbread Contest** (`/gingerbread`) - Annual contest showcase
- **Meal Kit Sponsors** (`/meal-kit`) - Sponsor program information
- **Storytellers** (`/storytellers`) - Community stories and narratives
- **Updates** (`/updates`) - News and announcements

### Embeddable Widgets (no navigation)
- **Circle Events** (`/widgets/circle-events`) - Community events from Circle.so
- **Newsletter** (`/widgets/newsletter`) - Email subscription form

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, custom brand components
- **Animations:** Framer Motion
- **Database:** Supabase (gift-drive only)
- **Payments:** Stripe (gift-drive donations)
- **API Integration:** Circle.so (events)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd foster-greatness-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create `.env.local` file with:

```env
# Supabase (for gift-drive)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Stripe (for gift-drive donations)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# Circle.so (for events widget)
CIRCLE_API_KEY=your_circle_api_key
CIRCLE_COMMUNITY_ID=your_community_id

# Email Service (for newsletter)
EMAIL_SERVICE_API_KEY=your_email_api_key
```

4. Run development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
foster-greatness-web/
├── app/
│   ├── (site)/              # Full pages with navigation
│   │   ├── gift-drive/
│   │   ├── gingerbread/
│   │   ├── meal-kit/
│   │   ├── storytellers/
│   │   └── updates/
│   ├── widgets/             # Embeddable widgets
│   │   ├── circle-events/
│   │   └── newsletter/
│   ├── api/                 # API routes
│   └── layout.tsx
├── components/
│   ├── site/                # Header, Footer, Navigation
│   ├── widgets/             # Widget-specific components
│   └── shared/              # Reusable brand components
│       ├── brand/           # Button, Card, Typography
│       └── ui/              # General UI components
├── lib/                     # Utilities, Supabase, Stripe
├── data/                    # Static data files
└── public/                  # Static assets
```

## Embedding Widgets

Widgets can be embedded in external websites using iframes:

```html
<!-- Newsletter widget -->
<iframe
  src="https://fostergreatness.co/widgets/newsletter"
  width="500"
  height="400"
  frameborder="0">
</iframe>

<!-- Events widget -->
<iframe
  src="https://fostergreatness.co/widgets/circle-events"
  width="800"
  height="600"
  frameborder="0">
</iframe>
```

## Brand Guidelines

### Colors
- **Navy:** `#1a2949` - Primary text and headers
- **Teal:** `#0067a2` - Primary brand color
- **Gold:** `#f4b942` - Accent color
- **Coral:** `#ff6b6b` - Accent color

### Typography
- **Font Family:** Century Gothic (fallback: sans-serif)
- **Headings:** Bold, Navy color
- **Body Text:** Regular, Navy with 80% opacity

### Voice
- Authentic and empowering
- Dignity-centered language
- No charity/deficit framing

## Development Guidelines

### Component Usage
- Use brand components from `components/shared/brand/`
- Follow Foster Greatness styling patterns
- Maintain consistency across all pages

### Adding New Pages
1. Create page in appropriate route group
2. Use shared layouts (`(site)` for full pages, `widgets` for embeds)
3. Import and use brand components
4. Update navigation if needed

### Environment Variables
- Never commit `.env.local`
- Update `.env.example` when adding new variables
- Document required variables in README

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

```bash
vercel --prod
```

### Other Platforms

Ensure:
- Node.js 18+ runtime
- All environment variables configured
- Build command: `npm run build`
- Start command: `npm run start`

## Contributing

1. Create a feature branch
2. Make changes following brand guidelines
3. Test thoroughly (all routes, widget embeds)
4. Submit pull request

## Source Projects

This application consolidates content from:
- foster-greatness-web-updates
- holiday-gift-drive
- gingerbread-house-contest
- meal-kit-sponsors
- storytellers-collective
- circle-events-widget

## License

[Your License Here]

## Support

For questions or issues, contact [contact information]
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README with setup and usage instructions"
```

---

## Task 22: Final Testing

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Step 1: Test all full page routes**

```bash
npm run dev
```

Visit and verify each page works:
- http://localhost:3000/ (home)
- http://localhost:3000/gift-drive
- http://localhost:3000/gingerbread
- http://localhost:3000/meal-kit
- http://localhost:3000/storytellers
- http://localhost:3000/updates

**Step 2: Test widget routes**

Visit and verify:
- http://localhost:3000/widgets/circle-events
- http://localhost:3000/widgets/newsletter

**Step 3: Test navigation**

- Click through header navigation links
- Verify mobile menu works
- Test footer links
- Verify home page cards link correctly

**Step 4: Test widget embedding**

Create `test-embeds.html` in project root:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Widget Embed Test</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .widget-container { margin: 20px 0; }
    iframe { border: 1px solid #ddd; }
  </style>
</head>
<body>
  <h1>Foster Greatness Widget Embed Tests</h1>

  <div class="widget-container">
    <h2>Newsletter Widget</h2>
    <iframe
      src="http://localhost:3000/widgets/newsletter"
      width="500"
      height="400">
    </iframe>
  </div>

  <div class="widget-container">
    <h2>Circle Events Widget</h2>
    <iframe
      src="http://localhost:3000/widgets/circle-events"
      width="800"
      height="600">
    </iframe>
  </div>
</body>
</html>
```

Open test-embeds.html in browser and verify both widgets work embedded.

**Step 5: Test build**

```bash
npm run build
```

Expected: Build completes without errors

Check for:
- No TypeScript errors
- No missing imports
- All routes generated successfully

**Step 6: Run production build**

```bash
npm run start
```

Visit http://localhost:3000 and spot-check key pages work in production mode.

Stop server with Ctrl+C

**No commit needed - this is testing only**

---

## Task 23: Deploy to Vercel

**Working directory:** `/Users/cpdesign/Developer/dgw/foster-greatness-web`

**Step 1: Initialize git remote (if not already)**

```bash
git remote add origin <your-repo-url>
git push -u origin main
```

**Step 2: Deploy to Vercel**

```bash
npx vercel
```

Follow prompts:
- Link to existing project or create new
- Configure project settings
- Deploy

**Step 3: Set environment variables in Vercel**

Go to Vercel dashboard > Project Settings > Environment Variables

Add all variables from `.env.local`:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- CIRCLE_API_KEY
- CIRCLE_COMMUNITY_ID
- EMAIL_SERVICE_API_KEY

**Step 4: Deploy to production**

```bash
npx vercel --prod
```

**Step 5: Verify production deployment**

Visit production URL and test:
- All page routes work
- Widgets work
- Widget embedding works from external domain
- API routes function correctly
- No console errors

**Step 6: Tag release**

```bash
git tag -a v1.0.0 -m "Initial release: merged Foster Greatness projects"
git push origin v1.0.0
```

---

## Implementation Complete!

All tasks completed. The Foster Greatness website is now:

✅ Fully migrated from 7 separate projects
✅ 5 full site pages with navigation
✅ 2 embeddable widgets
✅ Shared brand component system
✅ Supabase integration (gift-drive)
✅ Circle.so API integration (events)
✅ Stripe integration (donations)
✅ Deployed to production

## Post-Launch Tasks (Future Work)

These are out of scope for initial implementation but should be considered:

1. **Email Service Integration**: Connect newsletter widget to actual email service (Mailchimp, SendGrid, etc.)
2. **Analytics**: Add Google Analytics or similar tracking
3. **SEO Optimization**: Add meta tags, sitemaps, structured data
4. **Restore Meal-Kit Database**: Implement Prisma and migrate meal-kit data
5. **Admin Panel**: Create CMS for managing content
6. **Testing Suite**: Add Jest + React Testing Library tests
7. **CI/CD Pipeline**: Automate testing and deployment
8. **Performance Optimization**: Image optimization, lazy loading, code splitting
9. **Accessibility Audit**: WCAG compliance review
10. **Multi-language Support**: i18n implementation

---

## Notes for Future Developers

### Important Reminders

1. **Never modify quotes** - Quotes are attributed to real people
2. **Test widget embeds** - Always verify widgets work in iframes
3. **Environment variables** - Never commit `.env.local`, always update `.env.example`
4. **Brand consistency** - Use shared components, follow color/typography guidelines
5. **Mobile responsive** - Test all changes on mobile devices

### Common Issues

**Build fails with TypeScript errors:**
- Check all imports are correct
- Verify component prop types match usage
- Run `npm run build` locally before deploying

**Widgets don't work embedded:**
- Check CORS headers in API routes
- Verify relative URLs (not absolute localhost URLs)
- Test in actual iframe, not just direct visit

**Supabase/Stripe not working:**
- Verify environment variables are set in Vercel
- Check API keys are valid and not expired
- Review Supabase/Stripe dashboard for errors

### Getting Help

- Review design doc: `docs/plans/2025-11-20-project-merge-design.md`
- Check CLAUDE.md for project context
- Review source projects if needed (paths in design doc)
