# THEKOLLI

> **Engineering what comes next.**  
> *Where intelligence meets engineering.*

Official repository for **THEKOLLI** corporate web platform — an AI and advanced engineering company developing intelligent technologies, connected software systems, and engineering-led digital solutions.

---

## Visual Design & Interaction Architecture

- **Editorial Pencil Aesthetics**: Pure white drafting paper backdrop (`#FFFFFF` / `#FCFCFC`) with graphite (`#242424` / `#171717`) typography and architectural sketches.
- **Handwritten Typography**: Google Fonts (`Kalam`, `Caveat`, `Architects Daughter`, `Patrick Hand`, `Shadows Into Light`).
- **Interactive Notebook Canvas**: Full-document scroll-aware graphite sketch engine allowing drawing directly onto the page, complete with pressure physics, pencil grain flecks, undo (`Ctrl+Z`), and erase (`Esc`).
- **Sharpened Graphite Cursor**: Precision pencil cursor pointing directly to the active cursor tip with dynamic drafting tilt.

---

## Technical Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, Partial Prerendering, App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS, CSS Variables, Procedural SVG filters
- **Animations**: Framer Motion
- **Icons**: Lucide Icons & Custom Graphite Architectural SVG Illustrations
- **Database & Services**: Prisma ORM (Enterprise SQLite & Multi-Tenant Architecture)
- **Package Manager**: pnpm

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/thekolli-tech/thekolligroup.git
cd thekolligroup

# Install dependencies
pnpm install

# Run database migrations / generate client
pnpm prisma generate

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## Production Build

```bash
# Build the production bundle
pnpm build

# Start the production server
pnpm start
```

---

## Contact & Candidacy

- **Corporate Communication**: contact@thekolli.com
- **Careers & Portfolio Submissions**: thekolli.in@gmail.com
- **Jurisdiction**: India

---

&copy; 2026 THEKOLLI. All rights reserved.
