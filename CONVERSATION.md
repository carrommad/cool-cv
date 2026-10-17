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



