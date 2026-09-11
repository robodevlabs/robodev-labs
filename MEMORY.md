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
  - **Rich Scenery & Multi-Layer Depth Enhancements**:
    1. **Layer 1 (Atmosphere & Mountains)**: Multi-ridge alpine mountain peaks with gradient lighting facets and chiseled edges rising in the background, layered over distant megastructures and valley mist.
    2. **Layer 2 (Water Fjord & Cliffs)**: Expansive dark reflective water basin with cyan horizon specular line, dynamic water surface ripple arcs, and dramatic craggy fjord rock cliffs flanking the scene with rim highlights.
    3. **Layer 3 (Architectural Bridge System)**: Upgraded with parabolic catenary suspension arches, a 12-stay tension cable fan array, luminescent deck edges, reinforced pylon brackets with neon blue beacons, and foundation piers rooted into the water with glowing reflections.
    4. **Layer 4 (Tunnel Occlusion & Exit Light)**: Atmospheric soffit shadow with glowing conduits and volumetric exit flare.
    5. **Layer 5 (Foreground Framing Fins)**: Architectural framing edges that slide outward to enhance 3D forward tracking perception.
    6. **Layer 6 (The Matrix Realm)**: Seamlessly blends into the background of `#pillars`.
  - **Interactive Openable Accordion Cards (`ModelAccordionCards.astro`)**:
    - Replaced the static grid with an INGSKILL-inspired horizontal accordion featuring 4 distinct audience divisions:
      1. `For Businesses -> Engineering Services` (Full-cycle software, custom AI workflows, cloud APIs)
      2. `For Students & Learners -> RoboDev Academy` (Hands-on code immersions, 1-on-1 mentorship, hackathons)
      3. `For Everyday People -> Product Studio (Busly)` (Flagship smart transit navigation & live GPS telemetry)
      4. `For Brand & Reach -> Media & Growth Studio` (High-impact tech media, brand design, global community distribution)
    - **Strict Horizontal-Only Expansion**: Locked container height (`520px` fixed on desktop) to eliminate vertical jitter, height stretching, or page bouncing during expansion.
    - Big display typography: *"Built for Businesses, Institutions, and Learners"*.
    - Complete social connection links for all 7 channels: **Facebook, Instagram, YouTube, GitHub, LinkedIn, X, TikTok**.

## Component Architecture & Structure
1. `src/components/sections/CinematicBridge.astro`
   - Hero canvas scroll animation with mountain cliffs, arch bridge, clouds, and river.
2. `src/components/sections/ModelAccordionCards.astro`
   - Horizontal accordion cards for 4 pillars (Businesses, Learners, Everyday People, Media & Growth).
   - Social links integrated directly inside Pane 4. Bottom standalone card removed.
3. `src/components/sections/CircularArcDivisionsSection.astro`
   - **Signature Circular Arc Navigation** directly matching the reference screenshot design.
   - Ultra-thin architectural circle line (SVG vector line with cyan glowing beam, zero thick sidebar containers).
   - Real circular trigonometry ($x = cx + r \cdot \cos\theta, y = cy + r \cdot \sin\theta$).
   - Active target-ring node with outer cyan glowing ring + inner core dot + sequence index.
   - Pinned 300vh scroll scrubbing runway with sticky 100vh viewport stage.
   - Reversible scroll rotation: 01 Engineering &harr; 02 Products &harr; 03 Academy.
   - Isometric 3D floating glass tech composition: angled IDE editor, performance spline graph card, deployed cloud badge, and constellation micro-nodes.
   - Clean 2-column capabilities list with fine SVG icons.
4. `src/components/sections/FoundersLeadershipSection.astro`
   - **Editorial Leadership Architecture**: Replaces the former Company Approach section with an Awwwards-inspired presentation.
   - **Asymmetric Grid Layout**: Founder 01 (Safal Bhattarai) and Founder 02 staged in an intentional staggered layout with large rectangular aspect-ratio photography (3:4 and 4:5).
   - **Subtle Sophisticated Interaction**: Non-intrusive scale (`1.025`) and grayscale contrast shift on portrait frames with zero heavy glow/neon gimmicks.
   - **Restrained Department Leadership Layer**: 4-column typography-first grid for the 4 Heads of Department (Engineering, Academy, Product Studio, Media & Growth).
   - **Data-Driven Architecture**: Decoupled in `src/data/team.ts`, enabling real team photographs and names to be swapped with zero markup refactoring.
5. `src/components/sections/ContinuousCtaFooter.astro`
   - **Continuous CTA + Rising Footer Scene**: Unifies the final conversion CTA and the footer into one continuous physical scene.
   - **Scroll-Driven Surface Emergence**: The dark footer surface emerges from underneath the CTA, rising with subtle vertical parallax offset without artificial scroll-jacking.
   - **Connecting Guide Path**: An SVG spline curve connects the flow from above, guiding the user's eye directly toward the primary action ("Start a conversation →").
   - **Oversized Background Typography**: Editorial watermark (`BUILD` / `LEARN` / `CREATE`) rendered at `clamp(5rem, 15vw, 13rem)` in ultra-low contrast (`0.025` to `0.06`), revealing sequentially as the footer ascends.
   - **Editorial 3-Column Footer Grid**: Brand & mission with social channels on the left; Explore navigation in the center; Build With Us direct actions on the right; and bottom legal/geographic scope.

## Current Status
- Static build (`npm run build`) passing with 0 errors.
- Dev server running on `localhost:4321`.

---

## Core Company Pillars & Public Exposure Rules

1. **Engineering Services (Public Pillar 1)**
   - Custom software, AI solutions, web & mobile applications, and cloud architecture.
2. **RoboDev Academy (Public Pillar 2)**
   - Practical technology skills training, workshops, and developer mentorship.
3. **Product Studio (Public Pillar 3)**
   - Incubating proprietary technology products (Flagship: **Busly** transit platform).
4. **Media & Growth (Strictly Internal Division)**
   - Never exposed as an internal division to the public; only customer-facing capabilities (Branding, Growth, UI/UX) are exposed under Services.

---

## Verification & Build Log

- **Static Build**: `npm run build` executed and passed with `0` errors.
- **Dev Server**: Running on `http://localhost:4321`.
