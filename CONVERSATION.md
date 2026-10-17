# Cool-CV & Portfolio Showcase — Session Progress & Context

**Date & Time:** October 17, 2026 — 12:18 CEST  
**Active Branch:** `felipe-advice` (Base: `main` @ `f9731dc`)  
**Workspace:** `C:\Users\cromero\Desktop\cool-cv`  
**Related Repositories:** 
- `pipa-music-ball`: `C:\Users\cromero\Desktop\pipa-music-ball` (Branch: `main` @ `e1f22bd`)
- `expo-curator`: `C:\Users\cromero\Desktop\expo` (Branch: `v4-carrommad`)

---

## 1. Executive Summary of Achievements

In this session, we transitioned Carlos Romero Madrid's portfolio dashboard into a clean, modern, zero-scroll single-viewport layout, refined the UI architecture, and elevated the documentation and visual assets for the featured hardware prototype (`Pipa-Music-Ball`).

---

## 2. Completed Implementations

### A. Viewport-Locked, Centered Dashboard Layout (`index.html`)
- **Zero Scrollbars**: Configured `html, body { height: 100vh; height: 100dvh; overflow: hidden; margin: 0; padding: 20px; }` eliminating both vertical and horizontal scrollbars on desktop displays.
- **Centered Set**: Rather than stretching edge-to-edge across the screen, the entire set (Header, Instructions, 4 Cards, and Footer) is centered in the middle of the viewport (`display: flex; align-items: center; justify-content: center;`), giving generous breathing space on all sides so the ambient particle canvas floats peacefully around it.
- **Compact Cards**:
  - Container width locked to `max-width: 980px`.
  - Scaled card padding (`13px 18px`), watermarks (`30px`), titles (`16px`), and descriptions (`11.5px`).
  - Total vertical block height is ~390px, ensuring complete visibility without scroll on standard laptop screens (1366x768, 1280x800, 1080p).
  - Responsive fallback (`@media (max-width: 768px)`) allows vertical scrolling when viewed on mobile phones.

### B. Floating Ambient Audio Button
- **Placement**: Moved `#btn-mnusic-audio` out of the header card and repositioned it as a fixed glassmorphic pill button in the top-right corner of the screen (`position: fixed; top: 18px; right: 22px; z-index: 100;`).
- **Copy & Feedback**:
  - Default text: **`Ambient Audio`**
  - Active playing text: **`Playing Audio`** with animated equalizer bars.
- **Header Cleanliness**: The header now focuses exclusively on the primary action buttons: *Download CV PDF*, *Cover Letter PDF*, and *Email*.

### C. Footer Profile & Connect Links
- **Redundancy Elimination**: Replaced the repeated name ("Carlos Romero Madrid", already in `h1` at the top) with direct professional links:
  - **LinkedIn** (`https://linkedin.com/in/carrommad`) with SVG icon.
  - **GitHub** (`https://github.com/carrommad`) with SVG icon.
- **Repository Group**: Categorized the right side: `Projects: MNusic · Pipa-Music-Ball · Expo-Curator`.

### D. Pipa-Music-Ball Visual Assets & Documentation
- **Local Clone**: Cloned `carrommad/pipa-music-ball` into `C:\Users\cromero\Desktop\pipa-music-ball`.
- **Generated High-Res Visual Assets**:
  1. `gallery/sphere_prototype.jpg`: Frosted acrylic rolling sphere prototype housing the M5Stack Atom S3 with live LCD telemetry screen, battery, and 6-DoF MPU6886 IMU, with feline interaction.
  2. `gallery/telemetry_dashboard.jpg`: Real-time 3D telemetry visualization corresponding to `visualizer.html` (3D Cavalier trajectory plot, orthogonal projection planes XY/XZ/YZ, live $a_x, a_y, a_z, ||a||$ metrics, and 4-channel neon oscilloscopes).
- **Publication-Quality README**: Updated `pipa-music-ball/README.md` with hero badges, image showcases, feature specs, dataflow ASCII diagram, BOM table, and quickstart instructions. Committed on branch `main` (`e1f22bd`).
- **Portfolio Integration**: Embedded the preview gallery and repository links inside **Modal 03 ("Creative Computing & Installations")** in `cool-cv/index.html`.

---

## 3. Git Status & Branching Information

### In `cool-cv`:
- All previous progress committed to `main` (`f9731dc`):
  `feat: compact centered layout, floating audio button, footer profile links, and pipa-music-ball previews`
- Current checked-out branch: **`felipe-advice`**
- Working directory: Clean (`nothing to commit, working tree clean`)

### In `pipa-music-ball`:
- Branch: `main` (ahead of `origin/main` by 1 commit: `e1f22bd`)
- Ready to push: `git push origin main`

---

## 4. Completed: Felipe's Advice & High-Contrast B&W Redesign

### A. Contrast & Strict Black and White System
- **100% Monochrome Architecture**: Stripped all pastel colors (coral, mint, lavender, sky, yellow) and gradients. The site is now strictly Black and White with crisp, razor-sharp editorial contrast.
- **Vertical Half-Black Half-White Split Button**: Pinned to the top bar with a vertically split disc (`linear-gradient(to right, #000 50%, #fff 50%)`) to toggle between **Night Mode** (default stark black) and **Day Mode** (stark white).
- **Dual-Mode Ambient Audio Synthesizer**: Switching between Night and Day mode seamlessly modulates the live Web Audio API generator in real time:
  - *Night Mode*: Deep nocturnal supercomputing drone (55 Hz A1 fundamental, 160 Hz lowpass filter, contemplative A-minor / Dorian pad, and spacious chimes).
  - *Day Mode*: Luminous, radiant daytime harmonic profile (110 Hz A2 fundamental, 750 Hz open filter, shimmering A-major / Lydian pad, and sparkling crystalline chimes).

### B. Grand Hero Header
- **Massive Typographic Presence**: Transformed the header into a dramatic editorial hero statement:
  - Name: `font-size: clamp(38px, 6.8vw, 82px); font-weight: 900;` in all-caps display typography.
  - Subtitle: `COMPUTATIONAL PHYSICIST · SCIENTIFIC SOFTWARE ENGINEER · CREATIVE COMPUTING` in wide-spaced monospace.
  - Live availability badge: `● AVAILABLE FOR RESEARCH & ENGINEERING · BARCELONA, SPAIN`.
  - Tactile high-contrast action buttons: *Download CV PDF*, *Cover Letter PDF*, *Email*, *LinkedIn*, *GitHub*.

### C. Distribution, 1-Column Layout & Oxygen
- **1-Column Vertical List**: Shifted from the 2x2 viewport grid to a grand vertical single-column dossier (`max-width: 980px`). Vertical scroll is explicitly enabled.
- **Compositional Oxygen**: Generous whitespace between cards (`gap: 36px`), spacious card padding (`42px 46px`), and expansive line heights (`1.65`).
- **Big Numbers on the Left**: Numerals `01`, `02`, `03`, `04` positioned prominently on the left column of each card (`font-size: clamp(64px, 8vw, 94px); font-weight: 900; line-height: 0.85;`).
- **Elimination of Redundancy**: Merged "01. Geographic & Research Journey" and "Trajectory & Continuous Learning" into a single, punchy title: **`Trajectory & Research Journey`** with clean metadata `European Mobility & Research · 2013 — Present`.

### D. Typography Experimentation & Typography Lab
- **Curated Multi-Font Showcase**:
  - **Chapter 01**: **`Syne 800`** — Ultra-modern, geometric, wide French display.
  - **Chapter 02**: **`Space Grotesk 700`** — Technical, brutalist grotesque with algorithmic ink-traps.
  - **Chapter 03**: **`Bricolage Grotesque 800`** — Quirky, dynamic, "funny", high-personality British-French grotesque.
  - **Chapter 04**: **`Playfair Display 900`** — High-contrast editorial literary serif for the Cover Letter.
  - **System Base**: **`Plus Jakarta Sans`** for body copy and **`JetBrains Mono`** for technical pills and metadata.
- **Interactive Typography Lab Bar**: Allows Carlos to preview all cards in a single winning font (`All Syne`, `All Space Grotesk`, `All Bricolage`, `All Playfair`) or maintain the `Mixed Showcase` with 1 click.

### E. Book of Shapes Geometric Motifs
- Integrated vector glyphs inspired by [bookofshapes.com](https://bookofshapes.com/) as modernist emblems in the number column of each card:
  - Chapter 01: Modernist 8-ray geometric starburst / compass rose.
  - Chapter 02: Stepped architectural diamond matrix.
  - Chapter 03: Kinetic interlocking orbital spheres.
  - Chapter 04: Modernist editorial quadrant / seal.

### F. Monochromatic Modals & Map
- All four interactive modals (Trajectory & European Map, Academic & Technical Stack, Creative Computing with Pipa-Music-Ball photos, and Cover Letter to DAV Group) converted to pure black-and-white.
- The interactive Leaflet map uses a high-contrast grayscale filter and custom monochrome markers.

### G. Lateral Empty Space & Minimal Scroll Optimization
- **Narrower Card Width (`720px`)**: Scaled `.container` down from `980px` to `720px`. On standard desktop monitors, this introduces expansive, calming negative space on both sides.
- **Scroll Less (Vertical Footprint Cut by ~50%)**:
  - Tightened card padding from `42px 46px` to `18px 24px`.
  - Tightened card gap from `36px` to `14px`.
  - Re-proportioned the two-column card grid to `78px` number column + concise content column.
  - Streamlined header vertical padding and Typography Lab bar.
  - The entire page height now sits at ~1,100px, allowing the full dossier to be browsed with a single gentle flick of the scroll wheel.

### H. Full-Page Typography Transformation Fix
- Updated the Typography Lab switcher so that selecting any font (**All Syne 800**, **All Space Grotesk**, **All Bricolage**, **All Playfair Serif**) transforms the **entire page typography** (hero header, titles, body descriptions, pills, action buttons, metadata, modals, and footer).
- Added dynamic label feedback to each card's numeral badge (e.g. `Syne (Active)`).
- Selecting `Mixed Showcase` instantly restores the original 4-font editorial combination.

---

## 5. Next Steps
1. Push commits to `origin/felipe-advice` when ready.
2. Review typography selection to finalize the permanent 1-2 fonts.




### I. Restored Script Tag & Button Interactivity
- **Root Cause**: An opening <script> tag was omitted immediately preceding the JavaScript block at line 1826 during a layout update. The browser consequently treated the JavaScript code as HTML body text, visually dumping code at the bottom of the page and preventing all functions from executing.
- **Resolution**: Restored <script> at line 1826. All buttons (Night/Day split mode, Typography Lab cascade, Ambient Audio synthesizer, Modals, PDFs) now work cleanly and no code appears on the page.

### J. Default Day Mode, 80% Black Night Mode, and Dropdown Typography Menu
- **Default Day Mode**: The page loads by default in **Day Mode** (#ffffff luminous white canvas, deep #000000 text and borders). The top-bar theme button starts on **Day Mode** and toggles cleanly into **Night Mode**.
- **80% Black Canvas (#333333)**: In Night Mode, the background is now an editorial 80% black (#333333 / 80% black ink tint) instead of 100% harsh #000000, accompanied by #262626 matte card surfaces and crisp #ffffff text/borders.
- **Dropdown Typography Selector**: Replaced the previous button row and removed the "Mixed Showcase" button. The new styled <select> menu allows testing a single global typeface across the whole page:
  - **DM Sans** (Clean Geometric Sans — initial default)
  - **Montserrat** (Architectural Modern Sans)
  - **Roboto Slab** (Editorial Mechanical Slab Serif)
  - **Akzidenz-Grotesk** (Historic 1896 Grotesque / Hanken Grotesk fallback)
  - **Syne 800** (Bold Wide French Display)
  - **Space Grotesk** (Brutalist Tech)
  - **Bricolage Grotesque** (Quirky Expressive)
  - **Playfair Display** (High-Contrast Editorial Serif)
  - **Plus Jakarta Sans** (Contemporary Editorial)
  - **JetBrains Mono** (Technical Monospace)
- **Live Badge Synchronization**: Every selection dynamically cascades across the full page (hero header, titles, body descriptions, pills, action buttons, metadata, modals, and footer) and updates each chapter numeral badge (e.g. Roboto Slab · 01).

### K. Moved Primary Action Buttons to Bottom Footer Dock (Zero Repetition)
- **Header Cleanliness**: Removed .hero-actions-row from <header>, greatly reducing the header's vertical footprint and giving the typographic hero title and bio maximum breathing room.
- **Footer Actions Dock**: Relocated the 5 action buttons (**Download CV PDF**, **Cover Letter PDF**, **Email**, **LinkedIn**, **GitHub**) to the bottom footer.
- **Eliminated Repetition**: Removed the redundant plain text links for LinkedIn and GitHub previously located in the footer, so they only appear once as high-contrast tactile action pills.

### L. Split Bottom Dock: Left Actions & Right-Aligned Social Profiles
- **Left Group (.footer-actions-left)**: Houses document and direct communication actions (**Download CV PDF**, **Cover Letter PDF**, **Email**).
- **Right Group (.footer-actions-right)**: Anchors external profiles (**LinkedIn**, **GitHub**) flush to the right edge via justify-content: space-between, creating balanced editorial symmetry across the bottom of the dossier.

### M. Finalized Typography Pairing: Syne 800 (Header + Subtitle) & JetBrains Mono (Rest with Bold Titles)
- **Header Name (`h1.hero-name`)**: Styled strictly with **Syne 800** display font (`font-weight: 800; font-family: var(--font-display)`), uppercase with high-impact editorial tracking (`-0.03em`).
- **Subtitle (`.hero-discipline`)**: Styled strictly with **Syne 800** display font (`font-weight: 800; font-family: var(--font-display); letter-spacing: 0.05em`).
- **The Rest of the Dossier (`JetBrains Mono`)**: The entire body, hero bio, card metadata, descriptions, highlights, numerals, buttons, modals, and Leaflet interactive map popups are rendered in **JetBrains Mono** (`var(--font-mono)` / `var(--font-body)`).
- **Bold Titles**: All chapter titles (`.card-title`), modal headers (`.modal-header-titles h2`), map headers (`.map-header h3`), project names (`.proj-name`), sub-card titles (`.sub-card h4`), and cover letter subject (`.letter-subject`) are explicitly rendered in **Bold** (`font-weight: 800`).
- **Removed Typography Lab**: The experimental dropdown bar and `setFontPreview` logic were cleanly excised from markup, styles, and scripts now that the typography pairing is finalized.
- **Modern Chapter Badges**: Card badges updated to clean editorial chapter identifiers (`CH. 01`, `CH. 02`, `CH. 03`, `CH. 04`).

