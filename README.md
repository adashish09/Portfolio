# Cinematic Developer Portfolio — Ashish Kumar
## Phase 4: Final Design Refinement, EmailJS, Performance & Production Deployment

A premium, cinematic, interactive personal developer portfolio built for **Ashish Kumar** (Software Engineer).

---

### Tech Stack & Core Libraries
- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (Burnt orange `#E87524`, Amber `#F5A14B`, Deep Charcoal `#080808` / `#111111`)
- **Smooth Inertia Scrolling:** Lenis
- **Scroll Choreography & Parallax:** GSAP & ScrollTrigger
- **Component Micro-Interactions & Modals:** Framer Motion
- **In-Browser Contact Form SDK:** `@emailjs/browser`
- **Typography:** Space Grotesk (Display), Plus Jakarta Sans (Body), JetBrains Mono (Code/Accents)
- **Icons:** Lucide React & Custom Brand Vector SVGs

---

### Key Phase 4 Architectural Enhancements

1. **Hero Full-Bleed Atmospheric Redesign:**
   - Full-bleed ambient smoke video layer (`hero-atmosphere.mp4`, `object-fit: cover`) covering the full viewport with seamless dark edge gradients.
   - Transparent portrait cutout with feathered cosine alpha curve on the bottom edge and soft warm rim lighting, eliminating harsh rectangular cuts.
   - Large display typography scale, balanced vertical line breaks, and clear CTAs ("Explore My Work", "Download Resume", "Contact Me").

2. **About Section Full-Width Cinematic Video:**
   - Architectural corridor video (`about-transition.mp4`) spans as an expansive full-width ambient layer.
   - Replaced boxed media capsule with clean magazine-style typography, editorial pull-quotes, and high-contrast educational credentials.

3. **Interactive Technical Capabilities Ecosystem:**
   - Dynamic domain grouping: *All, Programming Languages, Frontend & Mobile, Backend & Databases, AI & Machine Learning, Tools & Deployment, Core CS*.
   - Live capability search bar with real-time filtering and clear action.
   - **Technology-to-Project Relationship Matrix:** Clicking any technology (e.g. *Python, React, Flask, TiDB, Ollama, Flutter*) opens an interactive relationship tray revealing verified production projects and internships where that technology was applied.

4. **Professional Career Timeline:**
   - Redesigned as a compact, scannable career timeline with vertical rail and glowing marker node.
   - Explicit classification of the TAP Academy structured internship program, concise production responsibilities, and applied technologies without oversized containers.

5. **EmailJS Browser SDK Integration:**
   - In-browser form dispatch using `@emailjs/browser` with honeypot spam protection.
   - Strict client-side validation, accessible live announcements (`aria-live="polite"`), and direct `mailto:` fallback when credentials are unconfigured.

---

### EmailJS Configuration Contract

To enable in-browser message delivery through EmailJS:

1. Create a free account on [EmailJS](https://www.emailjs.com/).
2. Create an **Email Service** (e.g., Gmail or Outlook service).
3. Create an **Email Template** with the exact parameter names below:
   - `{{from_name}}` — Sender's full name
   - `{{from_email}}` — Sender's email address
   - `{{subject}}` — Message subject
   - `{{message}}` — Message body
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Populate your keys in `.env`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
*If credentials are not set, the form gracefully offers a direct 1-click mailto fallback prefilled with the sender's input without claiming fake success.*

---

### Netlify Deployment Instructions

This repository is pre-configured for automated Netlify deployment:

1. **Build Settings:**
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
2. **SPA Routing:**
   - A `_redirects` file is pre-configured in `public/_redirects` to route all paths to `/index.html 200`.
3. **HTTP Security Headers & Cache:**
   - Pre-configured in `netlify.toml` with `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and 1-year immutable caching for static assets.
4. **Environment Variables on Netlify:**
   - In Netlify Dashboard under **Site configuration ➔ Environment variables**, add:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

---

### Local Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Compile production build
npm run build

# Preview production build locally
npm run preview
```
