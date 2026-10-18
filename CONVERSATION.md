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
- **Removed Typography Lab & "Curated Dossier" Bar**: Completely removed the experimental typography dropdown lab and the `"Curated Dossier · 4 Chapters"` indicator bar along with their associated CSS rules and JavaScript logic. The page header now transitions directly into Chapter 01 for a cleaner, more streamlined reading experience.
- **Modern Chapter Badges**: Card badges updated to clean editorial chapter identifiers (`CH. 01`, `CH. 02`, `CH. 03`, `CH. 04`).

### N. Stabilized Hero Top Bar & Button Dimensions (Zero Layout Shift on Toggle)
- **Root Cause of Button Jumping**: The text `"Night Mode"` (10 characters) is wider than `"Day Mode"` (8 characters) in monospaced JetBrains Mono. Inside the 720px container (`680px` content area), the combined width of the status badge and controls exceeded `680px` only in Night Mode, causing flexbox to wrap `.hero-controls` to the second row and dropping both the theme button and audio button down to the left.
- **Fixed Button Dimensions**: Implemented `min-width: 104px` on `#btn-theme-toggle` and `min-width: 126px` on `#btn-mnusic-audio` with centered content so the buttons maintain an identical, invariant footprint regardless of label text.
- **Refined Status Badge Tracking**: Adjusted `.status-badge` to `font-size: 10px; letter-spacing: 0.06em`, freeing up over 50px of breathing room so the status badge and controls fit effortlessly on a single row (`~630px` total footprint).
- **Smooth Mobile Fallback**: Added `@media (max-width: 640px)` for compact screens to wrap naturally without any jump when toggling.

### O. Interactive Color Palettes Scrolldown Menu Suite
- **Top Controls Integration**: Integrated a styled, pill-shaped `<select id="palette-select">` scrolldown menu into `.hero-controls` next to the Day/Night toggle and Ambient Audio button.
- **Curated 8 Palettes**:
  1. **Editorial Day (B&W)**: Crisp pure white canvas (`#ffffff`), pitch-black ink (`#000000`).
  2. **80% Black Night**: Matte charcoal surfaces (`#262626`) on an 80% black canvas (`#333333`).
  3. **Black & Silver**: Deep obsidian (`#0b0c0e`), liquid sterling silver borders (`#d4d8e2`), platinum text (`#f0f3f8`), and brushed chrome accents.
  4. **Touareg & Terracotta**: Deep Saharan night indigo (`#0a1420`), royal Touareg cobalt blue surfaces (`#12243a`), desert terracotta copper borders (`#e07a5f`), and golden dune sand ochre (`#f4a261`).
  5. **Cyber Yellow & Violet**: Carbon black obsidian (`#0c0d10`), high-voltage Bauhaus solar yellow (`#ffe600`), and electric iris violet complementary borders and pills (`#7c5cff`).
  6. **Nordic Pine & Copper (LUMI)**: Scandinavian deep spruce pine (`#081410`), aurora borealis mint (`#3ddc97`), birch snow (`#f1f7f3`), and arctic sauna copper (`#e26d46`).
  7. **MareNostrum 5 (Navy & Gold)**: Mediterranean supercomputing ocean navy (`#050e1d`), electric interconnect cyan (`#00f0ff`), and Torre Girona chapel champagne gold (`#d4af37`).
  8. **Crimson & Raw Linen (Japanese Editorial)**: Warm raw unbleached washi paper linen (`#f7f4ea`), sumi lacquer crimson (`#c92a2a`), and sumi ink black (`#1d1c19`).
- **Dynamic Ecosystem Modulation**:
  - **Leaflet Map**: Automatically inverts to a high-contrast dark satellite mode when dark palettes are active.
  - **Ambient Particle Canvas**: Neural constellation links and stardust dots dynamically recalculate their RGB colors to match the active palette's key highlights.
  - **Generative Audio Synthesizer**: Switching palettes dynamically retunes the real-time Web Audio API chimes and drones to authentic modal scales (e.g. Touareg Saharan pentatonic, Cyberpunk augmented, Nordic folk overtone).

### P. Extracted Custom Color Palettes from User Swatches
- **User Provided Swatch Cards**:
  - **Card 1 (Oceanic Architecture)**: `DEEP BLUE` (`#2A4D88`), `CONCERTO` (`#D9D9D8`), `GLACIAL SALT` (`#B1BBC8`), `OCEAN CITY` (`#7C94B8`).
  - **Card 2 (Pastel Chromatic Bauhaus)**: `LEMON MERINGUE` (`#FFEBAD`), `HONEY` (`#FEB737`), `PERIWINKLE` (`#A7B5FE`), `SEA BREEZE` (`#7BB8C0`), `INDIGO` (`#543786`).
- **Added 3 New Themed Palettes**:
  9. **Palette: Deep Blue & Glacial**: Deep oceanic canvas (`#111d33`), midnight navy surface (`#1b2f52`), Ocean City borders (`#7C94B8`), Glacial Salt pill borders (`#B1BBC8`), and crisp Concerto typography (`#D9D9D8`).
  10. **Palette: Indigo & Honey**: Nocturnal violet canvas (`#1c112e`), royal Indigo surface (`#2d1b4a`), Honey amber buttons and borders (`#FEB737`), Periwinkle accents (`#A7B5FE`), Sea Breeze secondary borders (`#7BB8C0`), and warm Lemon Meringue text (`#FFEBAD`).
  11. **Palette: Lemon Meringue & Breeze**: Warm sunny Lemon Meringue canvas (`#FFEBAD`), off-white surface (`#fffdf5`), high-contrast Indigo typography & action buttons (`#543786`), Honey amber accents (`#FEB737`), and Sea Breeze pill borders (`#7BB8C0`).
- **Complete Ecosystem Integration**:
  - Registered in `ALL_PALETTE_CLASSES` and `changeColorPalette()`.
  - Added option elements to `<select id="palette-select">`.
  - Interactive constellation particle canvas updated with custom RGB tints: `[124, 148, 184]` for Ocean City, `[254, 183, 55]` for Honey, and `[84, 55, 134]` for Indigo.
  - Added specialized Web Audio musical scales (`PALETTE_SCALES`): Deep Blue Aeolian, Indigo Twilight Harmonic, and Radiant Sun Lydian.
  - Leaflet Europe Map dynamically inverts for dark palettes (`deep-blue`, `indigo-honey`).

### Q. Streamlined Chapter Numerals & Glyphs (Removed Badge Elements)
- **Eliminated Intermediary Badges**: Removed the pill badge elements (`CH. 01`, `CH. 02`, `CH. 03`, `CH. 04`) positioned between the oversized chapter numerals and the modernist vector glyph emblems.
- **Enhanced Visual Rhythm**: Cleaned up the `.card-num-col` layout with an optimized `gap: 8px`, establishing a direct, uncluttered vertical relationship between the bold numeral (`01`, `02`, `03`, `04`) and its corresponding modernist Book of Shapes emblem (starburst, stepped diamond matrix, orbital spheres, and editorial quadrant).

### R. Relocated Color Palette Menu to the Footer Dock (Zero Header Collision)
- **Resolved Header Layout Collision**: Removed the `<select id="palette-select">` from `.hero-controls` in the top bar. This restores ample breathing room for the status badge (`• AVAILABLE FOR RESEARCH & ENGINEERING · BARCELONA, SPAIN`) and keeps the Day/Night toggle and Ambient Audio button anchored cleanly to the right edge with zero collision or wrapping.
- **Dedicated Footer Dock Placement**: Positioned the palette switcher inside a dedicated, balanced row (`.footer-palette-row`) in `footer.footer-card`, between the primary action buttons (`.footer-actions-row`) and the repository metadata (`.footer-meta-row`).
- **Balanced Symmetry**: Features a subtle label (`Dossier Color Palette`) with a live swatch indicator dot on the left, and the styled scrolldown selector flush to the right edge, seamlessly accessible alongside the download and social actions.

### S. Paired Day Mode with "Lemon Meringue & Breeze" and Dark Mode with "Indigo & Honey"
- **Default Day Mode**: Configured `:root` and `<body class="theme-lemon-meringue">` to use the sunny unbleached **Lemon Meringue & Breeze** palette (`#FFEBAD` canvas, `#fffdf5` surfaces, `#543786` Indigo typography, `#7BB8C0` Sea Breeze borders, and `#FEB737` Honey accents) as the default presentation upon page load.
- **Default Dark Mode**: Configured the theme toggle (`toggleThemeBW()`) to alternate directly with **Indigo & Honey** (`#1c112e` canvas, `#2d1b4a` Indigo surface, and `#FEB737` Honey amber buttons/borders).
- **Synchronized Ecosystem**:
  - The hero `#btn-theme-toggle` button toggles between **Day Mode** (`lemon-meringue`) and **Night Mode** (`indigo-honey`).
  - Constellation particles default to rich Indigo stardust (`[84, 55, 134]`), dynamically transitioning to Honey amber (`[254, 183, 55]`) in dark mode.
  - Generative ambient audio tunes between Radiant Sun Lydian (Day) and Indigo Twilight Harmonic (Dark).
  - The classic high-contrast Black & White palette remains accessible in the palette selector under `Palette: Editorial Day (B&W)`.
### T. Day Mode PDF Adaptations, Compact Header & Editorial Refinements
- **Compact 2-Line Header Name**:
  - Re-structured the primary name heading into a compact 2-line layout: `Carlos` on line 1, `Romero Madrid` on line 2, with tight line-height (`0.90`) and Syne 800 bold geometry across `index.html`, `cv_pastel_boxes.html`, and `cover_letter_quadrants.html`.
- **Eliminated Subtitle Orphan**:
  - Solved the orphan word wrap with `text-wrap: balance` and non-breaking space `Creative&nbsp;Computing` / `Creative&nbsp;Technologist`.
- **Renamed Chapters (Cards & Modals)**:
  - Standardized chapter titles across all web cards, modal overlays, CV boxes, and cover letter quadrants:
    - `01. Career & Journey`
    - `02. Education & Skills`
    - `03. Creative Computing`
    - `04. Cover Letter to DAV Group`
- **Section 02 Distinctive Styling**:
  - Main dashboard Card 02, Modal 02 sub-cards, and Box/Quadrant 02 in the PDFs now feature a vibrant yellow outline border (`border: 2px solid #FEB737 !important`) with pure white inner content background (`background: #ffffff !important`).
- **Highlighted Current Experience**:
  - In both web Modal 01 and downloadable PDFs, the BSC Performance Team position (May 2025 – Present) is distinctly highlighted with a yellow border (`#FEB737`), pure white background, and a dedicated status pill (`● Posición Actual · Current Position`).
- **Streamlined Card Actions (Removed Hashtags)**:
  - Stripped all pill tag clusters (`.card-highlights-row`) from the 4 editorial cards to remove clutter.
  - Upgraded prompt links into prominent, high-contrast action buttons (`.action-prompt-btn`) with bold contrast and pill borders.
- **Compact Europe Map with Color Highlights**:
  - Reduced map height to 250px for a focused European view.
  - Maintained monochrome tile layer while rendering highlighted country boundary polygons in vivid brand colors:
    - **Spain** in Honey Amber (`#FEB737`)
    - **France** in Sea Breeze (`#7BB8C0`)
    - **Germany** in Deep Indigo (`#543786`)
- **Pixel-Perfect Day Mode PDFs**:
  - Adapted `cv_pastel_boxes.html` and `cover_letter_quadrants.html` to fully match the Day Mode design tokens: Lemon Meringue canvas (`#FFEBAD`), White surfaces, Indigo typography (`#543786`), Honey accents (`#FEB737`), Syne 800, and JetBrains Mono.
  - Re-compiled both single-page A4 PDFs (`Carlos_Romero_CV.pdf`, `Carlos_Romero_Cover_Letter.pdf`) and synchronized with `./pdfs/`.

### U. 3-Row Name Layout with Independent Periodic Dynamic Stretching
- **Fixed 3-Row Architecture**:
  - Explicitly separated the hero name into three distinct architectural lines across `index.html`, `cv_pastel_boxes.html`, and `cover_letter_quadrants.html`:
    - Row 1: `Carlos`
    - Row 2: `Romero`
    - Row 3: `Madrid`
- **Dynamic Periodic Kinetic Stretching (`index.html`)**:
  - Implemented continuous, organic horizontal stretching on each line with `transform-origin: left center` (anchoring cleanly to the left margin).
  - Configured incommensurate, slow breathing cycles and phase offsets for true visual independence:
    - **Line 1 (`Carlos`)**: Period of `8.2s`, stretching between `scaleX(1.00)` (`-0.03em` tracking) and `scaleX(1.22)` (`+0.045em` tracking).
    - **Line 2 (`Romero`)**: Period of `11.4s` with a `-3.8s` phase offset, stretching between `scaleX(0.96)` and `scaleX(1.26)` (`+0.05em` tracking).
    - **Line 3 (`Madrid`)**: Period of `9.6s` with a `-6.4s` phase offset, stretching between `scaleX(1.02)` and `scaleX(1.24)` (`+0.04em` tracking).
  - Includes `@media (prefers-reduced-motion: reduce)` override for full accessibility compliance.
- **Synchronized Print PDFs**:
  - Re-rendered both [Carlos_Romero_CV.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_CV.pdf) and [Carlos_Romero_Cover_Letter.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_Cover_Letter.pdf) preserving the 3-row header name with optimized 16.5pt Syne 800 typography.

### V. Slower, Nonperiodic Mathematical Kinetic Oscillator
- **True Aperiodic Superposition**:
  - Replaced repetitive CSS loops with a continuous `requestAnimationFrame` oscillator based on multi-frequency irrational harmonic superposition (golden ratio $\phi = 1.618$, $\sqrt{2}$, $\sqrt{3}$, $e$, $\pi$).
  - Because frequency ratios are irrational ($\notin \mathbb{Q}$), the oscillation waveform is mathematically nonperiodic and never repeats the same shape.
- **Majestic Slow Rate**:
  - Scaled time advancement factor to `0.00028`, producing gentle, organic breathing waves spanning 25 to 45 seconds per fundamental cycle.
- **Fully Independent Trajectories**:
  - **Line 1 (`Carlos`)**: Base angular frequency $0.38\text{ rad/s}$ with $\sqrt{2}$ and $\phi$ harmonics.
  - **Line 2 (`Romero`)**: Base angular frequency $0.28\text{ rad/s}$ with $\sqrt{3}$ and $\pi$ harmonics.
  - **Line 3 (`Madrid`)**: Base angular frequency $0.33\text{ rad/s}$ with $e$ and $\phi$ harmonics.
- **Dynamic Scale & Tracking**:
  - Smoothly modulates horizontal `scaleX` between $\sim 0.80$ and $\sim 1.55$ with proportional letter-spacing tracking (`-0.025em` to `+0.08em`).

### W. Scroll-Triggered Awakening, Dual BSc Degrees & Skills Stack Refinement
- **Scroll-Activated Kinetic Oscillator (`index.html`)**:
  - The name remains completely static at its resting geometric state (`scaleX(1.0)`) on page load.
  - As soon as the user scrolls down (or uses wheel/touch down), the nonperiodic oscillator awakens smoothly (eased in over 1.8s) and continues indefinitely.
- **Split into Two Independent Bachelor Degrees**:
  - Separated the double degree into two distinct academic records across web and PDFs:
    - **BSc in Mathematics**: University of Seville (2013 – 2018) · `8.28/10 · 3rd of Class`
    - **BSc in Physics**: University of Seville (2013 – 2018) · `8.35/10 · 3rd of Class`
- **Updated Section 02 Headings & Added After Effects**:
  - Replaced `"Languages & Parallel Runtimes:"` / `"HIGH-PERFORMANCE COMPUTING & RUNTIME STACK:"` with `"Skills & Parallel Runtimes:"`.
  - Added **`After Effects`** to the technical skills pill stack.
- **Standardized 2-Letter ISO Language Codes with Simplified Levels**:
  - Simplified language listings to clean, professional 2-letter codes:
    - `ES (Native) · EN (C1) · FR (C1) · IT (B1) · DE (B1)`
- **PDFs Re-compiled**:
  - Re-rendered [Carlos_Romero_CV.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_CV.pdf) and [Carlos_Romero_Cover_Letter.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_Cover_Letter.pdf) and synchronized with `pdfs/`.

### X. Day Mode (Crimson & Raw) & Night Mode (Deep Blue & Glacial) with Yellow Card Accents
- **Day Mode: Crimson & Raw Linen Palette**:
  - **Canvas Background**: Raw Washi Paper Linen (`#f7f4ea`).
  - **Surfaces**: Crisp white card surfaces (`#ffffff`) with warm linen sunken panels (`#eee9dc`).
  - **Primary Accents**: Sumi lacquer crimson (`#c92a2a`) on structural borders, action buttons, and active pills.
  - **Typography**: Sumi ink black (`#1d1c19`) with muted graphite (`#56534a`).
  - **Card 02 Highlight**: Honey Amber yellow outline border (`2px solid #FEB737`).
- **Night Mode: Deep Blue & Glacial Palette**:
  - **Canvas Background**: Deep oceanic blue (`#111d33`).
  - **Surfaces**: Midnight navy surfaces (`#1b2f52`) with sunken midnight obsidian (`#0c1626`).
  - **All 4 Cards with Card 02 Yellow Outline**:
    - Cards `01`, `02`, `03`, and `04` all feature the identical Honey Amber yellow outer border: `border: 2px solid #FEB737 !important;` paired with the subtle ambient glow `box-shadow: 0 4px 18px rgba(254, 183, 55, 0.20) !important;`.
    - On hover, cards smoothly elevate with `border-color: #ffd276 !important;` and `box-shadow: 0 10px 28px rgba(254, 183, 55, 0.35) !important;`.
  - **Yellow Action Prompt Boxes (`.action-prompt-btn`)**:
    - All action boxes ("Explore Interactive Map & Journey", "Inspect Education & Skills Stack", "View Creative Prototypes", "Read Full Application Letter") are styled with vibrant Honey Amber background (`#FEB737 !important`) and deep obsidian high-contrast text (`#0c1626 !important`).
    - On hover, the buttons glow into `#ffd276` while maintaining obsidian text for maximum legibility.
- **Theme Switcher & Audio Tone Sync**:
  - The hero theme toggle alternates directly between **Crimson & Raw Linen** (Day) and **Deep Blue & Glacial** (Night).
  - Ambient audio synthesizer modulates between Japanese pentatonic scales (Day) and Deep Blue Aeolian scales (Night), accompanied by yellow and crimson constellation particle stardust.
- **Print Templates & PDFs Updated**:
  - Adapted `cv_pastel_boxes.html` and `cover_letter_quadrants.html` to Crimson & Raw Day Mode.
  - Re-compiled fresh [Carlos_Romero_CV.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_CV.pdf) and [Carlos_Romero_Cover_Letter.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_Cover_Letter.pdf) via headless Edge into both root and `pdfs/`.

### Y. Strictly Bounded Kinetic Oscillation (Text Limit Boundary Condition)
- **Problem Addressed**:
  - During wide irrational harmonic expansion, unconstrained `scaleX` allowed lines (particularly `Romero` and `Carlos`) to expand beyond the visual right edge of the text directly below them (`.hero-discipline`).
- **Dynamic Geometric Boundary Calibration**:
  - Implemented dynamic DOM measurement (`measureBoundaries()`) that samples the exact rendered line widths of `.hero-discipline` via `document.createRange().getClientRects()` on load and on viewport resize.
  - Established a strict per-line ceiling:
    $$s_{i,\max} = \min\left(1.48, \frac{W_{\text{textLimit}} - 2.5}{W_{i,\text{base}}}\right)$$
  - Clamped all wave components so that at the absolute peak of the oscillation wave ($w_{\text{norm}} = 1.0$), the rendered pixel width of each line (`Carlos`, `Romero`, `Madrid`) satisfies:
    $$W_{i,\text{rendered}} = W_{i,\text{base}} \times s_i(t) \le W_{\text{textLimit}} - 2.5\text{px} < W_{\text{textLimit}}$$
### Z. Repositioning Theme Toggle & Audio Controls Outside the Central Container
- **Relocated Outside 720px Container**:
  - Moved `.hero-controls` out of `.hero-top-bar` and placed it as a dedicated `<aside class="hero-controls">` directly under `<body>`.
  - Positioned at the top right of the viewport on widescreen/desktop:
    ```css
    position: fixed;
    top: 24px;
    right: 32px;
    z-index: 900;
    ```
- **Visual & Ergonomic Impact**:
  - Completely clears the space directly above the 3-row hero name (`Carlos` / `Romero` / `Madrid`), giving the name and subtitle full breathing room without any overlapping UI controls.
  - Buttons float cleanly in the outer margins of the viewport, styled as pill controls with solid surfaces, borders (`#FEB737` yellow in Night Mode, `#1d1c19` Sumi black in Day Mode), and elevated hover shadows.
  - Controls remain persistently accessible when scrolling, allowing users to toggle themes or toggle the generative soundscape from any section of the portfolio.
- Fully responsive: automatically switches to a static, inline flow on mobile devices (`@media (max-width: 860px)`).

### AA. Harmonizing Card 02 in Day Mode (Kept as the Others)
- **Day Mode Card 02 Unification**:
  - Removed the standalone yellow border override from `.card-section-02` in Day Mode.
  - Card 02 now shares the identical aesthetic of cards `01`, `03`, and `04`:
    - Base border: `1.5px solid var(--bw-border-subtle)` (`#ddd6c3`)
    - Surface: White (`#ffffff`)
    - Hover: `border-color: var(--bw-border)` (`#c92a2a` Sumi lacquer crimson), elevated shadow, and smooth vertical lift.
- **Print Templates & Recompiled PDFs**:
  - Updated [cv_pastel_boxes.html](file:///c:/Users/cromero/Desktop/cool-cv/cv_pastel_boxes.html) and [cover_letter_quadrants.html](file:///c:/Users/cromero/Desktop/cool-cv/cover_letter_quadrants.html) to keep Box 02 matching the rest of the boxes in Day Mode.
  - Re-rendered [Carlos_Romero_CV.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_CV.pdf) and [Carlos_Romero_Cover_Letter.pdf](file:///c:/Users/cromero/Desktop/cool-cv/Carlos_Romero_Cover_Letter.pdf) and updated copies in `pdfs/`.

### AB. Hover-Only Yellow Outer Line in Dark Mode
- **Resting State Refinement**:
  - In Night Mode (`theme-deep-blue`), cards (`01`, `02`, `03`, `04`) at rest no longer carry a persistent yellow border.
  - Cards at rest feature a clean, sophisticated, subtle dark oceanic border (`1.5px solid var(--bw-border-subtle)` / `#2A4D88`) against the midnight navy surface (`#1b2f52`) with subtle elevation shadow (`0 4px 16px rgba(0, 0, 0, 0.35)`).
- **Hover-Activated Focus State**:
  - The electric yellow outer outline (`border: 2px solid #FEB737 !important; box-shadow: 0 10px 28px rgba(254, 183, 55, 0.32) !important; background: #233e6b !important; transform: translateY(-2px);`) now activates **strictly when hovering** over any card (`.editorial-card:hover`).
  - Smooth transitions (`0.24s cubic-bezier(0.16, 1, 0.3, 1)`) deliver fluid entry and exit of the yellow outline and ambient glow.
- **Action Buttons & Accents Intact**:
  - Action prompt pills ("Explore Interactive Map & Journey ->", "Inspect Education & Skills Stack ->", "Read...", etc.) preserve their high-contrast `#FEB737` yellow fill with bold obsidian text (`#0c1626`) for persistent legibility and call-to-action visibility.

### AC. Luminous Golden Butter Yellow Card Hover in Day Mode
- **Problem Addressed**:
  - In Day Mode, hovering over an `.editorial-card` shifted its surface color from white (`#ffffff`) to `--bw-surface-hover` (`#f0ece0`).
  - Because the page background canvas is Raw Linen (`#f7f4ea`), `#f0ece0` had less than 3% luminance difference, causing the card to wash out and blend directly into the page canvas.
- **Luminous Golden Butter Yellow (`#fff4b8`)**:
  - Upgraded `--bw-surface-hover` in both `:root` and `body.theme-crimson-linen` to `#fff4b8`.
  - When hovered, cards illuminate with a vibrant, warm, sunlit golden-butter tone that clearly contrasts against both the pure white resting cards (`#ffffff`) and the linen background canvas (`#f7f4ea`).
  - Added a matching warm amber elevation shadow (`box-shadow: 0 10px 24px rgba(200, 140, 20, 0.16), 0 4px 10px rgba(0, 0, 0, 0.06);`) that enhances the warm light effect.
- **Editorial Contrast & Readability**:
  - Deep Sumi ink black text (`#1d1c19`) and bold numerals ("01", "02", etc.) achieve maximum typographic clarity (> 14:1 contrast ratio).
  - The lacquer crimson border (`#c92a2a`) and crimson action prompt button ("EXPLORE INTERACTIVE MAP & JOURNEY →") pop with high-impact editorial elegance, reminiscent of Japanese stamp seals on golden washi paper.

### AD. Status Badge Tagline Update: "Interested in Creative Intelligence & Design"
- **Updated Copy**:
  - Replaced the conventional hiring tagline `"Available for Research & Engineering"` with `"Interested in Creative Intelligence & Design · Barcelona, Spain"`.
  - On responsive mobile viewports (`@media (max-width: 860px)`), dynamically displays the concise format `"Creative Intelligence & Design · Barcelona"` to prevent badge wrapping.
- **Narrative Alignment**:
  - Unifies the portfolio's dual identity: combining petascale computational physics & mathematics with creative computing, generative media, data physicalization, and interaction design.

### AE. Ambient Background Particles & Connectors Visibility Enhancement
- **Problem Addressed**:
  - Background particle nodes and interconnecting constellation lines were overly faint (canvas opacity `0.65`, connector linkAlpha max `0.08`, linewidth `0.8px`), making the constellation structure almost imperceptible on modern calibrated displays.
- **Enhanced Node Visibility**:
  - Boosted `#ambient-particles-canvas` opacity from `0.65` to `0.85`.
  - Increased node radius from `1.0–4.0px` to `1.8–4.0px` for well-defined, crisp celestial vertices.
  - Raised particle `baseAlpha` from `0.15–0.50` to `0.38–0.66` (with dynamic harmonic phase pulsing up to `0.85`).
  - Increased particle density threshold: `numParticles` scaled from 75 max (16,000 px²/node) to 95 max (12,500 px²/node).
- **Pronounced Constellation Connectors**:
  - Extended linkage proximity distance from `110px` to `135px`, creating richer geometric polygonal tessellations.
  - Boosted connector `linkAlpha` multiplier from `0.08` to `0.22` (~2.75× increase in line opacity).
  - Increased connector stroke width from `0.8px` to `1.0px`.
- **Palette Harmonic Balance**:
  - In Day Mode: Crimson lacquer nodes (`#c92a2a`) and delicate connecting lines float with crisp clarity on the `#f7f4ea` Raw Linen canvas.
  - In Night Mode: Honey yellow nodes (`#FEB737`) and telemetry tracks shimmer vividly across the deep ocean navy background (`#111d33`).

### AF. Career & Journey Modal Redesign (Vertical European Map & 2x3 Milestone Grid)
- **Problem & Geometric Rationale**:
  - The previous modal layout placed a horizontal 16:9 European map across the full modal width, pushing all experience cards deep below the fold.
  - Because Carlos's research and academic journey spans Western Europe along a predominantly vertical North-South corridor (Bonn/Cologne at lat ~50.7°N down through Marseille, Barcelona, Pamplona to Seville at lat ~37.4°N — roughly 14° latitude by ~13° longitude), a horizontal aspect ratio caused extensive empty ocean/continental space to the west and east.
- **Top Showcase Tier: Vertical Map & Current Position Anchor**:
  - Replaced the wide top banner with a balanced 2-column showcase row (`.trajectory-showcase-row` with `1.05fr 0.95fr` grid):
    - **Left (`.map-showcase-card`)**: Interactive Leaflet trajectory map housed in a tall, dedicated container (`min-height: 290px`, `flex: 1`). The map automatically bounds to Western Europe with `map.fitBounds([[35.8, -8.0], [52.2, 10.5]], { padding: [15, 15] })` and refreshes seamlessly on modal open with `map.invalidateSize()`.
    - **Right (`#card-bsc-perf`)**: Carlos's active appointment as **Research Support Engineer in the Computer Sciences Performance Team at the Barcelona Supercomputing Center (BSC)** (Oct 2024 – Present). Styled as a featured showcase card with an active pulsing status beacon (`BSC · CURRENT POSITION · OCT 2024 - PRESENT`), rich narrative detail on MareNostrum 5 & LUMI performance analysis, and tech chips (`MareNostrum 5`, `LUMI`, `Paraver / Extrae`, `Slurm`, `Scalability Analysis`).
- **Bottom Grid: 2 Rows of 3 Milestone Cards (`.timeline-grid-six`)**:
  - Structured into a clean, symmetrical 2×3 grid of 6 chronological milestone cards beneath a dedicated sub-header divider (`.timeline-section-divider` labeled `"Trajectory Milestones & Academic Degrees"`):
    - **Row 1**:
      1. **BSC Fusion Team** (Barcelona, Spain · Jun 2023 – Oct 2025 · HPC Research Engineer · PIC plasma simulation code optimization on MareNostrum 4/5)
      2. **CENER** (Pamplona, Spain · Apr 2022 – Nov 2022 · Data Scientist · Computational fluid dynamics & meteorological wind energy forecasting)
      3. **University of Seville Plasma Research** (Seville, Spain · Sep 2020 – Apr 2022 · Plasma Physics Researcher · Neutral Beam Injection simulation for Tokamak reactors)
    - **Row 2**:
      4. **Aix-Marseille University** (Marseille & Cadarache, France · Sep 2019 – Sep 2020 · MSc in Plasma Physics & Fusion Energy · **1st of Class** · High Honors)
      5. **Fraunhofer FHR** (Bonn & Wachtberg, Germany · Jul 2018 – Feb 2019 · Cognitive Radar Researcher · Dual-frequency radar detection & Bayesian DSP)
      6. **University of Seville Double Degree** (Seville, Spain · Sep 2013 – Sep 2018 · **Double Degree: BSc in Mathematics & BSc in Physics** · **3rd of Class in Both Degrees**)
- **Interactive Map & Card Synchronization**:
  - Clicking any city pin on the map triggers `highlightTimelineCard(cityKey)`, which highlights all corresponding cards in the grid (handling multi-appointment cities like Seville and Barcelona seamlessly) and smoothly scrolls the card into viewport.
  - Clicking any card triggers `flyToCity(cityKey)`, panning and zooming the Leaflet map directly to that European research center.
- **Responsive Adaptability**:
  - Modal panel maximum width expanded to `1140px` for optimal 3-column spacing on desktop displays (~340px per card).
  - Collapses fluidly to 2 columns on tablets (`<= 980px`) and a stacked single-column layout on mobile devices (`<= 860px` and `<= 640px`).

### AG. Hero Roles Typographic Layout (Explored & Reverted)
- **Exploration**:
  - Tested reconfiguring the hero identity into a two-column lockup with the three roles (`COMPUTATIONAL PHYSICIST`, `SCIENTIFIC SOFTWARE ENGINEER`, `CREATIVE COMPUTING`) sitting to the right of the three name lines (`CARLOS`, `ROMERO`, `MADRID`).
- **User Requested Reversion**:
  - Upon user request, this side-by-side layout was completely reverted.
  - Restored `.hero-discipline` directly beneath `h1.hero-name`: `Computational Physicist · Scientific Software Engineer · Creative Computing`.
  - Re-anchored `measureBoundaries()` to calculate the text-limit boundaries from `.hero-discipline` text range rects with a 2.5px safety buffer.
  - Linked `.hero-discipline` to the centralized `content.json` dynamic loader (`header.discipline` / `header.roles.join(' · ')`).


### AH. Centralized Main Page Text Control (`content.json` & Dynamic Hydration)
- **Problem Addressed**:
  - Main page text elements (status badge, hero name, 3 roles, bio paragraph, 4 chapter cards, and footer buttons) were hardcoded inside `index.html`.
  - The user requested a centralized JSON file to easily edit and control all textual pieces of the main page without touching complex HTML markup.
- **Created [content.json](file:///c:/Users/cromero/Desktop/cool-cv/content.json)**:
  - Structured into intuitive, clean top-level sections:
    - `header.status_badge`: `full` and `short` responsive strings.
    - `header.name`: `first_name`, `surname_1`, `surname_2`.
    - `header.roles`: array of 3 professional roles corresponding to the 3 name lines.
    - `header.bio`: main overview paragraph.
    - `cards`: array of 4 objects containing `number`, `modal_id`, `tag`, `period`, `title`, `description`, and `action_text`.
    - `footer`: PDF download labels/links and direct contact data.
  - Also synchronized [content_cards.json](file:///c:/Users/cromero/Desktop/cool-cv/content_cards.json) with this standardized schema.
- **Dual-Engine Hydration Architecture in [index.html](file:///c:/Users/cromero/Desktop/cool-cv/index.html)**:
  - **HTTP / Live Server Mode**: Automatically fetches `content.json` via asynchronous `fetch('content.json')`, immediately updating DOM text nodes upon receipt.
  - **Zero-CORS Offline Fallback (`file:///`)**: Embeds the JSON configuration within `<script id="main-content-data" type="application/json">` so opening `index.html` directly from Windows explorer without a web server works flawlessly without browser CORS blocks.
  - **Dynamic Recalibration**: Whenever `applyMainContent(data)` updates DOM nodes, it invokes `measureBoundaries()` to dynamically recalculate the kinetic typography bounds for nonperiodic oscillation.

### AI. Work Card Click Smooth Viewport Scroll to Map
- **UX Issue Addressed**:
  - In the restructured **01. Career & Journey** modal, the interactive Leaflet European trajectory map is located at the top inside `.map-showcase-card`.
  - When the user scrolled down into the 2×3 grid of milestone cards and clicked on a card, `focusCity()` would fly the map to the city, but the modal viewport remained scrolled down, preventing the user from seeing the map animation and city popup. Furthermore, `highlightTimelineCard()` was calling `scrollIntoView()` on the card itself, keeping the viewport locked to the bottom.
- **Implementation**:
  - Updated `focusCity(cityKey, openPopup = true)`:
    - Queries `#modal-trajectory .modal-scroll-body` and, if `scrollTop > 0`, invokes `scrollBody.scrollTo({ top: 0, behavior: 'smooth' })`.
    - This smoothly glides the scrollbar to the top so the map is front and center as `map.flyTo()` animates to the selected European research hub.
    - Automatically opens the city marker popup upon arrival (`setTimeout(..., 800)`).
  - Updated `highlightTimelineCard(cityKey, shouldScroll = false)`:
    - Added a `shouldScroll` guard (default `false`) so highlighting cards on click maintains the card's active border highlight without fighting the scroll-to-top motion.

### AJ. Hero Roles Layout & Right-Alignment
- **User Requirements**:
  - All 3 professional role lines (`COMPUTATIONAL PHYSICIST`, `SCIENTIFIC SOFTWARE ENGINEER`, `CREATIVE COMPUTING`) must sit directly below the 3 name lines (`Carlos` / `Romero` / `Madrid`), above the bio paragraph.
  - Positioned at the right of the composition page (`.container`).
  - Text indented/aligned flush to the right margin (`align-items: flex-end; text-align: right;`).
- **Implementation**:
  - **Structure**: Created `.hero-roles-right` directly below `h1.hero-name`, containing `.hero-role-1`, `.hero-role-2`, and `.hero-role-3`.
  - **Right Indentation & Docking**:
    - Container: `align-self: flex-end; align-items: flex-end; text-align: right; margin: 4px 0 10px auto; gap: 3px; width: fit-content;`.
    - Role items: `font-family: var(--font-display); font-size: clamp(11.5px, 1.35vw, 14.5px); font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; line-height: 1.2; text-align: right;`.
  - **Dynamic Hydration**: Wired to `content.json` (`header.roles[0..2]`) with automatic live updates and offline fallback.
  - **Kinetic Oscillation Safety**: Preserved nonperiodic harmonic superposition oscillation ($\phi, \sqrt{2}, \sqrt{3}$) for the 3 name lines with smooth baseline scale boundaries (0.94x to 1.35x).
  - **Responsive Design**: Maintained right alignment on mobile with responsive clamp scaling (`clamp(11.5px, 1.35vw, 14.5px)`) preventing overflow.

### AK. Standardized Modal Color System (Day & Night Modes)
- **Objective**: Standardize color styling across all four interactive modals (Career & Journey, Education & Skills, Creative Computing, Cover Letter) to seamlessly reflect the main view's Day Mode (**Crimson & Raw Linen**) and Night Mode (**Deep Blue & Glacial Salt**), removing hardcoded hex overrides and unifying the nested card experience.
- **Unified Semantic Token Mapping**:
  - Modal Canvas (`.modal-panel`, `.modal-header`): `var(--bw-surface)` and `var(--bw-border)`.
  - Nested Inset Cards (`.sub-card`, `.project-box`, `.current-showcase-card`, `.letter-container`): Standardized to `var(--bw-surface-sunken)` with `var(--bw-border-subtle)` at rest.
  - Hover States: Illuminated with primary accent `var(--bw-border)` and `var(--bw-surface-hover)`.
  - Badges & Pills (`.proj-badge`, `.pill`, `.current-chip`, `.current-role-badge`): Fully bound to token variables (`var(--bw-pill-bg)`, `var(--bw-pill-text)`, `var(--bw-btn-bg)`), eliminating hardcoded `#FEB737` in day mode.
  - Typography & Headings: `var(--bw-text)` for titles, `var(--bw-border)` for highlights, letter subject, dates, and callout quotes.
  - Leaflet Map Synchronization: Custom marker pins (`.custom-map-marker`), route dashed paths (`path.leaflet-route-core`), and popup cards (`.leaflet-popup-content-wrapper`) dynamically adapt to the active theme palette via CSS tokens.
  - Custom Themed Scrollbars: Implemented sleek `-webkit-scrollbar` and standard `scrollbar-color` rules for `.modal-scroll-body` using `var(--bw-border-subtle)` and `var(--bw-surface-sunken)`.

### AL. High-Precision Country Masks & Default Zoom Matching Overview Pic
- **Objective**: Calibrate default Leaflet map zoom and geographic country masks in **Modal 01 (Career & Journey)** to match the exact overview perspective provided by the user, ensuring all 5 cities are naturally enclosed within authentic country boundaries.
- **Accurate Geographic Boundaries**:
  - Replaced rough 15-20 point approximations with high-precision geographic contour rings for **Spain** (51 points), **France** (48 points), and **Germany** (58 points).
  - Spain's mask strictly follows the Portuguese border ("La Raya"), Pyrenees, and Atlantic/Mediterranean coastlines.
  - France's mask accurately outlines Brittany, Normandy, the English Channel, Pyrenees, Alps, and Mediterranean Côte d'Azur.
  - Germany's mask accurately reflects its frontiers with Denmark, the Baltic/North Seas, Poland, Czechia, Austria, Switzerland, France, Benelux, and Netherlands.
  - Verified via point-in-polygon tests that all 5 cities (**Bonn** [50.74, 7.10] in DEU, **Marseille** [43.30, 5.37] in FRA, **Seville** [37.39, -5.98] in ESP, **Pamplona** [42.81, -1.65] in ESP, **Barcelona** [41.39, 2.17] in ESP) reside completely within their respective national boundaries.
- **Calibrated Default Zoom & Viewport**:
  - Set default map viewport to `center: [45.0, 3.5]`, `zoom: 4`.
  - Replaced restrictive `fitBounds([[35.8, -8.0], [52.2, 10.5]])` with `resetMapView()` (`map.setView([45.0, 3.5], 4)`), displaying the complete European research corridor from Ireland and the UK down to Gibraltar and North Africa, and from Portugal to Czechia, Austria, and Italy.
  - Added a clickable `Reset ↺` control in the map header (`<span class="map-hint" onclick="resetMapView()">`) allowing instant re-centering after flying to specific cities.

### AM. Unified Single-Page Editorial PDFs (CV & Cover Letter)
- **Problem Addressed**: The earlier 4-quadrant / 4-box layout broke narrative flow in the Cover Letter and cramped the scientific trajectory and technical stacks in the CV into rigid square cards.
- **New Editorial Architecture**:
  - **Aesthetic Alignment with Web Day Mode**:
    - **Raw Washi Linen Canvas** (`#f7f4ea`) base.
    - **Sumi Lacquer Crimson** (`#c92a2a`) structural accents, section indicators, and badges.
    - **Sumi Ink Black** (`#1d1c19`) high-contrast text for pristine typographic legibility.
    - **Pure White Cards** (`#ffffff`) with subtle structural hairlines (`#ded6c4`) and warm tint accents (`#f2ece0`).
    - **Modernist Typography**: `Syne 800/900` for bold editorial titles and headers, paired with `JetBrains Mono` for badges, metadata, and technical stacks, and clean sans-serif for comfortable reading.
  - **Ambient Constellation Background**:
    - Embedded deterministic SVG constellation network (`viewBox="0 0 1000 1414"`) behind content cards.
    - Features 88 interconnected celestial nodes and delicate crimson connection hairlines (`rgba(201, 42, 42, 0.10–0.28)` with outer rings), matching the live stardust canvas in `index.html`.
  - **High-Emphasis Web Design Callout Banner**:
    - Featured prominently right beneath the header on both CV and Cover Letter.
    - Dedicated callout card linking directly to `carrommad.github.io/cool-cv` with pill button (`↗`).
    - Explicitly highlights the live interactive features: *Interactive European Trajectory Map (5 Research Hubs)*, *Real-Time MN5 Telemetry Audio Synthesizer (MNusic)*, and *3D Bio-Kinetic Sensor Visualizer (Pipa-Music-Ball)*.
  - **Curriculum Vitae Layout (`cv_editorial.html`)**:
    - **Header**: `CARLOS ROMERO MADRID` (Syne 900), docked role badges (`COMPUTATIONAL PHYSICIST`, `SCIENTIFIC SOFTWARE ENGINEER`, `CREATIVE COMPUTING`), and complete contact info.
    - **Asymmetric 2-Column Grid**:
      - **Left Column (60%)**: Chronological research trajectory with current role highlight at BSC Performance Team (DestinationE, ClimateDT, ECLand, MN5), BSC Fusion Team (ALYA MAGNET, MPI/OpenMP/PETSc/oneAPI/OpenACC), CENER (offshore wind data pipelines), Univ. of Seville (plasma physics & particle tracking), and Fraunhofer FHR (cognitive radar).
      - **Right Column (40%)**: Academic Rigor (Double Degree 3rd of Class, MSc Plasma 1st of Class, MSc Advanced Math), Compute & HPC Stack (MN5, Leonardo, LUMI, Fortran, C++, Python, Slurm, etc.), Creative Computing (MNusic, Pipa-Music-Ball, Expo-Curator), and Spoken Languages.
      - **Footer**: European Research Route (`Seville → Bonn → Marseille → Pamplona → Barcelona`) + Live Web Dossier URL.
  - **Cover Letter Layout (`cover_letter_editorial.html`)**:
    - **Letterhead & Recipient Block**: Addressed to Dr. Fernando Cucchietti & Selection Committee (DAV Group, BSC-CNS).
    - **Continuous Narrative Flow**: Compelling narrative connecting the hum of MareNostrum 5 with the chime of Pipa-Music-Ball, arguing for data physicalization and science democratization inspired by Domestic Data Streamers.
    - **3-Pillars Horizontal Strip**: 01 / MNusic Engine (Supercomputing sonification), 02 / Pipa-Music-Ball (Tangible bio-kinetic computing), 03 / Expo-Curator (Open-source spatial exhibition curation).
    - **Formal Signoff**: Executive signature block and European route footer.
  - **Compilation Pipeline**:
    - Compiled via headless Microsoft Edge (`msedge.exe --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=...`).
    - Verified single-page fit: Both `Carlos_Romero_CV.pdf` and `Carlos_Romero_Cover_Letter.pdf` are exactly **1 page** each, synced across root and `pdfs/`.

### AN. Symmetrical Red Divider Border Above Footer Action Buttons
- **Adjustment**: The dividing line above the footer buttons (`Download CV PDF`, `Cover Letter PDF`, `Email`, `LinkedIn`, `GitHub`) in `index.html` was previously set to `1.5px solid var(--bw-border-subtle)` (subtle beige).
- **Alignment**: Updated `footer.footer-card` to `border-top: 2px solid var(--bw-border);`, perfectly matching the primary Sumi lacquer crimson red divider (`border-bottom: 2px solid var(--bw-border);`) between the hero header and Card 01. This creates a clean, harmonious top-and-bottom framing for the 4 interactive cards.

### AO. Footer Action Buttons Hierarchy & Primary Emphasis
- **Adjustment**: Moved the **Email** button to the leading position on the left, styled in primary filled Sumi lacquer crimson (`btn-hero btn-hero-primary`).
- **Secondary PDF Buttons**: Reverted both **Download CV PDF** and **Cover Letter PDF** to secondary outline styling (`btn-hero btn-hero-secondary`), keeping the primary red call-to-action focused on direct contact while keeping PDF downloads clean and uncluttered.

### AP. Distinct Schematic Sheet Icon for Cover Letter
- **Icon Differentiation**: Replaced the envelope SVG on the **Cover Letter PDF** button with a classic folded-corner schematic document sheet icon featuring horizontal technical lines (`file-text`):
  - **Email Button**: Preserves the primary envelope icon (`M4 4h16c1.1... polyline points="22,6 12,13 2,6"`).
  - **Download CV PDF**: Uses the vertical downward arrow into a tray (`polyline points="7 10 12 15 17 10"`).
  - **Cover Letter PDF**: Uses the technical schematic document sheet with a top-right dog-ear fold and content hairlines (`M14 2H6... polyline points="14 2 14 8 20 8"`), providing instant visual distinction.

### AQ. Authentic Project Imagery from Repositories (Modal 03: Creative Computing)
- **Authentic Sourcing Across Repositories**:
  1. **MNusic — Sonifying MN5 & LUMI**:
     - Fetched the authentic `screenshot.png` directly from [`carrommad/mnusic`](https://github.com/carrommad/mnusic) on GitHub (referenced in its `README.md`).
     - Stored as `assets/photos/mnusic_dashboard.png` (461 KB), displaying the live cluster telemetry engine, Web Audio parameters, and continuous node flow canvas.
  2. **Pipa-Music-Ball (Live Web App Screenshot)**:
     - Opened the live web application (`pipa-music-ball/visualizer.html`) and captured an authentic high-resolution screenshot displaying the 3D Cavalier trajectory projections, 3 synchronized orthogonal slices (XY, XZ, YZ), numeric vector telemetry, and 4-channel neon oscilloscopes.
     - Updated [`c:\Users\cromero\Desktop\pipa-music-ball\README.md`](file:///c:/Users/cromero/Desktop/pipa-music-ball/README.md) to showcase `gallery/telemetry_dashboard.png`.
     - In the Web CV (`index.html`), replaced the former 2-image grid with **strictly only this live screenshot** (`assets/photos/pipa_telemetry_live.png`), exactly as instructed.
  3. **Expo-Curator Studio**:
     - Extracted `documentation/screenshots/exhibition_wall_studio.png` from [`c:\Users\cromero\Desktop\expo`](file:///c:/Users/cromero/Desktop/expo) (referenced in `expo/README.md`).
     - Stored as `assets/photos/expo_wall_studio.png`, showcasing the metric spatial gallery staging engine with framed artworks hung to scale.
  4. **Lens & Motion — AE Lab**:
     - Selected an atmospheric landscape exploring architectural light geometry and sunbeam dynamics (`P1040251.JPG`) from Carlos's photography catalog, optimized as `assets/photos/lens_motion.jpg`.

### AR. Social Actions Positioning (GitHub then LinkedIn on the Far Right)
- **Reordering**: Moved the **LinkedIn** button to the far right of `.footer-actions-right`, immediately following **GitHub**.
- **Final Action Buttons Hierarchy (Left to Right)**:
  1. `[ ✉ Email ]` (Solid Sumi lacquer crimson primary button, leading position on the left)
  2. `[ ⤓ Download CV PDF ]` (Secondary outlined button)
  3. `[ 📄 Cover Letter PDF ]` (Secondary outlined button with schematic document sheet icon)
  4. `[ 🐙 GitHub ]` (Secondary outlined social link)
  5. `[ 💼 LinkedIn ]` (Secondary outlined social link, docked on the far right)

### AS. Dynamic Spain Solar Time Auto-Theme Synchronization (Day / Night Mode)
- **Objective**: Automatically load the web dossier in **Day Mode** (`theme-crimson-linen`) during daylight hours in Spain and in **Night Mode** (`theme-deep-blue`) during night hours in Spain, using today's sun hours (mid-October: Sunrise ~08:05 CEST, Sunset ~19:08 CEST in Barcelona/Spain) as reference.
- **Immediate Pre-Render Execution (Zero-Flash Initial Paint)**:
  - Placed an inline synchronous `<script>` at the absolute top of `<body>` before any UI markup is evaluated or painted.
  - Queries `Intl.DateTimeFormat` for `'Europe/Madrid'` time:
    - If `cur >= 8.08 && cur < 19.13`, defaults to Day Mode (`document.body.className = 'theme-crimson-linen'`).
    - Otherwise (e.g. at 02:38 AM CEST), immediately sets `document.body.className = 'theme-deep-blue'`, preventing any flash of day/light theme.
- **NOAA Astronomical Solar Calculation Engine**:
  - Implemented `getSpainSolarTimes(date = new Date())` implementing standard NOAA solar declination and equation-of-time astronomical equations for Spain coordinates (Barcelona / BSC: 41.3879° N, 2.1699° E).
  - Automatically derives the exact sunrise and sunset decimal hours and formatted time strings (`08:05` and `19:08` CEST for today).
- **DOM & State Synchronization (`initSolarThemeSync()`)**:
  - Automatically executes on page load, synchronizing:
    - Internal state: `currentThemeMode` ('day' / 'night') and `currentActivePalette`.
    - Theme button label: `#theme-btn-label` dynamically displays `Day Mode` or `Night Mode`.
    - Button telemetry tooltip: `#btn-theme-toggle` displays `Spain Solar Theme: [Mode] (Sunrise: 08:05, Sunset: 19:08 CEST). Click to toggle Day/Night.`.
    - Particle visualizer: dynamically updates its color scheme (`[201, 42, 42]` crimson stardust in Day Mode, `[254, 183, 55]` amber stardust in Night Mode).
  - Preserves manual interaction: Clicking `toggleThemeBW()` smoothly toggles between Day Mode and Night Mode at any time.



