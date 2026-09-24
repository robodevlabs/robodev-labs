# RoboDev Labs Website — Project Memory

## Current Status
**Cinematic Architectural Bridge Tracking Shot Transition Implemented | 450vh Pinned Journey Active.**
- **Existing Hero Intact**: Hero section remains completely untouched in content, design, and structure, seamlessly transitioning into the cinematic passage.
- **Cinematic Bridge Transition (`CinematicBridge.astro`)**:
  - **Scroll-Driven Camera Flight**: Pinned 450vh sticky viewport tracking shot simulating true forward camera motion through 3D space (`perspective: 1200px`).
  - **The Visual Story Sequence**:
    1. **0% – 20% (Approach)**: The user leaves the hero into a wide panoramic realm. A monumental, futuristic architectural bridge appears on the horizon crossing a dark water expanse, flanked by distant megastructure silhouettes. (*"01 / GENESIS — Every scalable idea starts somewhere."*)
    2. **20% – 50% (Monumental Scale)**: The camera flies forward. The architectural bridge deck, high-tension cable matrix, and massive vertical pylon piers grow dramatically in scale, towering over the viewport. Extreme foreground architectural fins slide outward to enhance parallax depth. (*"02 / MOMENTUM — Then engineering gives it structure."*)
    3. **50% – 75% (Passing Underneath the Bridge)**: The camera enters directly beneath the bridge superstructure. The ribbed soffit, steel transverse ribs, and glowing cyan utility conduits pass directly overhead as ambient lighting dims into an atmospheric dark tunnel transition. (*"03 / TRANSITION — Passing through the crucible into reality."*)
    4. **75% – 90% (Light Emergence)**: A focal light source flares ahead in the distance, casting volumetric light rays through the underside exit. (*"04 / THE MATRIX — Let’s build what comes next."*)
    5. **90% – 100% (Seamless Realm Shift)**: The tunnel darkness lifts and reveals the new environment (the subtle matrix grid and radiant ambient glow), flowing directly without hard seams or white space into the **Three Pillars Overview** (`#pillars`).
  - **Performance & Accessibility**:
    - Animated entirely via hardware-accelerated `translate3d`, `scale`, and `opacity`.
    - Fully respects `prefers-reduced-motion: reduce`.
    - Mobile-responsive with optimized lightweight geometry.

---

## Core Company Pillars & Public Exposure Rules

1. **Engineering Services (Public Pillar 1)**
   - Custom software, AI solutions, web & mobile applications, and cloud architecture.
2. **RoboDev Academy (Public Pillar 2)**
   - Practical technology skills training, workshops, and developer mentorship.
   - Grounded, student-focused V1 architecture centered on *learning by building*.
   - Standalone page at `/academy` redesigned as an editorial modern learning studio: calm, human, sophisticated, large display typography, generous whitespace, zero dashboard box clutter, distinct Free vs. Paid UX, and static data located in `src/data/workshops.ts`.
3. **Product Studio (Public Pillar 3)**
   - Incubating proprietary technology products (Flagship: **Busly** transit platform).
4. **Media & Growth (Strictly Internal Division)**
   - Never exposed as an internal division to the public; only customer-facing capabilities (Branding, Growth, UI/UX) are exposed under Services.

---

## Academy V1 Data & Editorial Architecture (`src/data/workshops.ts`)

- **Schema**:
  - `title`, `slug`, `description`, `level`, `format`, `duration`, `date`, `price`, `isFree`, `isFeatured`, `status`, `instructor`, `whatYouWillBuild`, `registrationUrl`, `paymentUrl`.
- **UX Pathways**:
  - **Free Workshops**: "FREE" pill badge, primary action: `Join / Register` → external registration form.
  - **Paid Workshops**: Explicit price badge (e.g. `$19`, `$25`), primary action: `Enroll / Buy` → external checkout/registration link.
- **Editorial Tone & Layout**: No SaaS dashboard boxes, no fake metrics/claims, unified 3-step *Learn → Build → Grow* philosophy, and seamless integration with `ContinuousCtaFooter`.

---

## Verification & Build Log

- **Static Build**: `npm run build` executed and passed with `0` errors.
- **Dev Server**: Running on `http://localhost:4321`.

