# Cinematic Developer Portfolio — Ashish Kumar
## Premium Personal Developer Experience

A cinematic, interactive personal developer portfolio built for **Ashish Kumar** (Software Engineer).

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

### Key Architectural Highlights

1. **Hero Full-Bleed Atmospheric Experience:**
   - Full-bleed ambient smoke video layer (`hero-atmosphere.mp4`, `object-fit: cover`) covering the full viewport with seamless dark edge gradients.
   - Transparent portrait cutout with feathered cosine alpha curve on the bottom edge and soft warm rim lighting, eliminating harsh rectangular cuts.
   - Large display typography scale, balanced vertical line breaks, and clear CTAs ("Explore My Work", "Download Resume", "Contact Me").

2. **About Section Full-Width Cinematic Video:**
   - Architectural corridor video (`about-transition.mp4`) spans as an expansive full-width ambient layer.
   - Editorial pull-quotes, biography narrative, and high-contrast academic qualifications.

3. **Uniform Technical Capabilities Ecosystem:**
   - All 38 technical competencies presented in a clean, equal-sized uniform card grid (`h-32`).
   - Every card displays the authentic SVG brand icon alongside the technology name.
   - Domain filter pills (`All`, `Languages`, `Frontend & Mobile`, `Backend & Databases`, `AI & Machine Learning`, `Tools & Deployment`, `Core CS`) and instant live search.

4. **Interactive Magnetic Reticle Cursor:**
   - System pointer replaced on desktop with a glowing precision dot and dynamic magnetic follower halo.
   - Velocity-driven aerodynamic stretching and interactive morphing (e.g. `↗` for links, focus indicator for text inputs).
   - Click interaction with snappy contraction and radial shockwave bursts.
   - Full touch safety: Automatically bypassed on touchscreens and mobile devices.

5. **Contact Form with 1-Click Default Message Templates:**
   - Preset message templates on top of the form for instant pre-fill:
     - 💼 Software Engineering Role
     - 🚀 Project Collaboration
     - 🤝 System Design Discussion
     - ⚡ Quick Introduction
   - Live character counter (`X / 1500 chars`), honeypot spam protection, accessible status feedback, and graceful `mailto:` fallback.

---

### Vercel Deployment via GitHub (Recommended)

This repository is pre-configured for automated 1-click Vercel deployment with `vercel.json`:

#### Step 1: Push Code to your GitHub
```bash
# 1. Add your GitHub remote repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

# 2. Push the main branch
git push -u origin main
```

#### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com/) with your GitHub account.
2. Click **"Add New..."** ➔ **"Project"**.
3. Import your GitHub portfolio repository.
4. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### Step 3: Add Environment Variables (Optional for EmailJS)
In the Vercel project setup (or later under **Settings ➔ Environment Variables**), add:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

5. Click **"Deploy"**. Your cinematic portfolio will be live in seconds with automatic HTTPS and global edge caching!

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
