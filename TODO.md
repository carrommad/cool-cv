# Tasks & Completed Enhancements

- [x] Header name in 3 rows (`Carlos` / `Romero` / `Madrid`) with independent, slow, nonperiodic dynamic stretching (harmonic superposition of $\phi, \sqrt{2}, \sqrt{3}$)
- [x] Strictly bounded oscillation: Maximum amplitude of name & surname is dynamically calibrated to NEVER surpass the subtitle text limit ($W_{\text{rendered}} \le W_{\text{textLimit}}$)
- [x] Oscillation starts only once scrolled down, then continues smoothly
- [x] Subtitle orphan eliminated with balanced wrapping
- [x] Renamed chapters across web & PDFs:
  - 01. Career & Journey
  - 02. Education & Skills
  - 03. Creative Computing
  - 04. Cover Letter to DAV Group
- [x] Day Mode Card 02 kept identical to the other cards (subtle border, white surface, crimson hover); yellow outline reserved for Night Mode across all cards
- [x] Divided into 2 bachelors:
  - BSc in Mathematics (8.28 · 3rd of Class)
  - BSc in Physics (8.35 · 3rd of Class)
- [x] "Skills & Parallel Runtimes" heading instead of "Languages & Parallel Runtimes", added After Effects to skills pills
- [x] 2-letter ISO language codes with simplified levels: `ES (Native) · EN (C1) · FR (C1) · IT (B1) · DE (B1)`
- [x] Experience list with current BSC position highlighted (`Posición Actual / Current Position`)
- [x] Hashtag tags removed from all 4 cards; high-contrast action prompt buttons added
- [x] Leaflet Europe map made more compact (250px) with Spain, France, and Germany highlighted in colors
- [x] Adapted CV PDF (`cv_pastel_boxes.html` -> `Carlos_Romero_CV.pdf`) to Day Mode (Crimson & Raw Linen canvas, Syne 800 + JetBrains Mono)
- [x] Adapted Cover Letter PDF (`cover_letter_quadrants.html` -> `Carlos_Romero_Cover_Letter.pdf`) to Day Mode (Crimson & Raw Linen canvas, Syne 800 + JetBrains Mono)
- [x] Compiled both PDFs via headless Edge into root and `pdfs/` directories
- [x] Day Mode: Crimson & Raw Linen palette (`#f7f4ea` canvas, `#ffffff` surface, `#c92a2a` Sumi lacquer crimson, `#1d1c19` Sumi black) set as default across web dossier
- [x] Night Mode: Deep Blue & Glacial palette (`#111d33` canvas, `#1b2f52` surface, `#FEB737` yellow accents) linked to theme switcher
- [x] In Deep Blue & Glacial Night Mode: Yellow outer line (`2px solid #FEB737` + warm glow) appears strictly on hover over cards; resting state cards have clean subtle dark oceanic borders (`#2A4D88`)
- [x] In Deep Blue & Glacial: All action prompt boxes ("Explore", "Inspect", "Read") styled in yellow (`#FEB737`) with obsidian text (`#0c1626`)
- [x] Repositioned Night/Day Mode and Ambient Audio buttons to the top right of the viewport outside the central container (`position: fixed; top: 24px; right: 32px; z-index: 900`)
- [x] Day Mode Card Hover Color: Upgraded surface from dull linen grey (`#f0ece0`) to luminous golden butter yellow (`#fff4b8`) with warm golden-amber underglow, eliminating canvas blending and maximizing contrast
- [x] Status Badge Tagline: Updated from "Available for Research & Engineering" to "Interested in Creative Intelligence & Design · Barcelona, Spain"
- [x] Background Particles & Connectors Visibility: Increased canvas opacity (0.85), node radius (1.8–4.0px), base alpha (0.38–0.66), connector distance (135px), and connector line alpha (nearly ~3x more visible)
- [x] Career & Journey Modal Restructure: Reconfigured into vertical map (left) + highlighted Current Position card (right), followed by a 2x3 grid of 6 milestone cards (separating Seville Plasma Research and Double Degree: BSc Math & BSc Physics)
- [x] Hero Roles Layout: Reverted side-by-side roles layout; restored the original discipline subtitle block directly below the name lines with balanced wrapping and text-limit oscillation boundaries
- [x] Centralized Text Control JSON: Created content.json (and updated content_cards.json) allowing complete control of header status badge, name, the 3 roles, subtitle/bio paragraph, all 4 cards (number, tag, period, title, description, action button), and footer actions, with dynamic fetching on web servers and graceful embedded JSON fallback for file:/// protocol
- [x] Work Card Click Map Viewport Scroll: When clicking any work card in Career & Journey, the modal scroll body smoothly scrolls to the top (scrollTop: 0) so the map fly/zoom animation and city popup are immediately visible, while preserving card highlight outlines


