/**
 * Interactive In-Place Web Editor (Full Feature Suite + Sync Group Scope)
 * - Click-to-edit content, fonts, and box shapes
 * - Sync Scope: Single Element vs. All Similar Elements (Category/Class Group)
 * - Preset Categories: .action-prompt-btn, .editorial-card, .card-title, .card-desc, .meta-tag, .pill, .btn-ctrl, etc.
 * - Undo / Redo history stack (Ctrl+Z / Ctrl+Y)
 * - Floating Contextual Bubble Toolbar (Bold, Italic, Link, Duplicate, Delete, Move Up/Down)
 * - Theme Palette Swatches (Sumi Crimson, Linen, Golden Butter, Obsidian Black, etc.)
 * - 1-Click Design Presets (Sumi Box, Soft Pill, Glassmorphism, Monospace Card)
 * - Responsive Viewport Switcher (Desktop 100%, Tablet 768px, Mobile 390px)
 * - Direct Save to index.html API integration (POST /api/save)
 * - Layout Sliders: Margin, Gap, Max-Width
 * - Image & Icon Click-to-Replace with file upload or URL
 * - Separation of geometry/fonts (universal) and mode-scoped colors (Day vs Night)
 */

(function () {
  const STORAGE_KEY_AUTH = 'cv_editor_auth';
  const STORAGE_KEY_MODS = 'cv_editor_modifications_v2';
  const STORAGE_KEY_ATTEMPTS = 'cv_editor_failed_attempts';
  const STORAGE_KEY_LOCKOUT = 'cv_editor_lockout_until';

  // Cryptographic salt and SHA-256 hash (password is NOT in plaintext)
  const SALT = 'coolcv_salt_2026_';
  const EXPECTED_HASH = '52e742a42d124ee9e31aee42c708280aec6aee912c9e69acfa92c4a85329921e';

  let isAuthorized = false;
  let isEditMode = false;
  let activeElement = null;
  let modifications = {};
  let currentSyncScope = 'single'; // 'single' or 'group'

  async function sha256Hex(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(SALT + str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Undo / Redo History Stacks
  const historyStack = [];
  let historyIndex = -1;
  const MAX_HISTORY = 40;

  const COLOR_PROPS = ['color', 'backgroundColor', 'borderColor'];

  // Curated theme swatches matching site aesthetics
  const THEME_SWATCHES = [
    { name: 'Sumi Crimson', hex: '#c92a2a' },
    { name: 'Sumi Hover Red', hex: '#de3535' },
    { name: 'Linen Paper', hex: '#f7f4ea' },
    { name: 'Golden Butter', hex: '#fff4b8' },
    { name: 'Sunken Warm', hex: '#eee9dc' },
    { name: 'Obsidian Black', hex: '#1d1c19' },
    { name: 'Muted Taupe', hex: '#56534a' },
    { name: 'Night Canvas', hex: '#333333' },
    { name: 'Night Card', hex: '#262626' },
    { name: 'Night Hover', hex: '#363636' },
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Touareg Blue', hex: '#0284c7' },
    { name: 'Pine Forest', hex: '#059669' }
  ];

  // Well-defined architectural classes to detect for Category/Group syncing
  const WELL_KNOWN_GROUPS = [
    'action-prompt-btn',
    'editorial-card',
    'card-title',
    'card-desc',
    'card-big-num',
    'meta-tag',
    'meta-period',
    'meta-bullet',
    'pill',
    'btn-hero-primary',
    'btn-ctrl',
    'split-disc',
    'nav-link'
  ];

  function getElementGroupClass(el) {
    if (!el || !el.classList) return null;
    for (const c of WELL_KNOWN_GROUPS) {
      if (el.classList.contains(c)) return c;
    }
    // Fallback: first non-internal class
    for (let i = 0; i < el.classList.length; i++) {
      const c = el.classList[i];
      if (!c.startsWith('cv-') && !c.startsWith('theme-')) return c;
    }
    return el.tagName.toLowerCase();
  }

  function getCurrentThemeMode() {
    const isNight =
      document.body.classList.contains('theme-night') ||
      document.body.classList.contains('theme-black-silver') ||
      document.body.classList.contains('theme-touareg') ||
      document.body.classList.contains('theme-cyber-yellow') ||
      document.documentElement.classList.contains('theme-night');
    return isNight ? 'night' : 'day';
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY_MODS);
    if (saved) {
      modifications = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading cv modifications:', e);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const adminParam = urlParams.get('admin');
  const editParam = urlParams.get('edit');

  if (localStorage.getItem(STORAGE_KEY_AUTH) === 'unlocked') {
    isAuthorized = true;
  }

  function pushHistoryState() {
    if (historyIndex < historyStack.length - 1) {
      historyStack.splice(historyIndex + 1);
    }
    historyStack.push(JSON.stringify(modifications));
    if (historyStack.length > MAX_HISTORY) {
      historyStack.shift();
    } else {
      historyIndex++;
    }
    updateHistoryButtons();
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      modifications = JSON.parse(historyStack[historyIndex]);
      localStorage.setItem(STORAGE_KEY_MODS, JSON.stringify(modifications));
      applyStoredModifications();
      if (activeElement) selectElement(activeElement);
      updateHistoryButtons();
    }
  }

  function redo() {
    if (historyIndex < historyStack.length - 1) {
      historyIndex++;
      modifications = JSON.parse(historyStack[historyIndex]);
      localStorage.setItem(STORAGE_KEY_MODS, JSON.stringify(modifications));
      applyStoredModifications();
      if (activeElement) selectElement(activeElement);
      updateHistoryButtons();
    }
  }

  function updateHistoryButtons() {
    const undoBtn = document.getElementById('cv-undo-btn');
    const redoBtn = document.getElementById('cv-redo-btn');
    if (undoBtn) undoBtn.disabled = historyIndex <= 0;
    if (redoBtn) redoBtn.disabled = historyIndex >= historyStack.length - 1;
  }

  // Restore saved modifications across DOM according to current theme mode
  function applyStoredModifications() {
    const currentMode = getCurrentThemeMode();

    Object.keys(modifications).forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        if (!elements || elements.length === 0) return;

        const data = modifications[selector];

        elements.forEach((el) => {
          // 1. Text Content or Image src
          if (data.innerHTML !== undefined) {
            el.innerHTML = data.innerHTML;
          }
          if (data.src !== undefined && el.tagName === 'IMG') {
            el.src = data.src;
          }

          // 2. Geometry & Fonts (Global across both day & night)
          if (data.geometryStyles) {
            Object.assign(el.style, data.geometryStyles);
          }

          // 3. Theme Colors (Scoped to day or night)
          const colorSet = currentMode === 'night' ? data.nightColors : data.dayColors;
          if (colorSet) {
            Object.assign(el.style, colorSet);
          } else {
            COLOR_PROPS.forEach((p) => {
              el.style[p] = '';
            });
          }
        });
      } catch (err) {
        // Selector might be specific or missing
      }
    });
  }

  // Listen to theme changes on body/html attributes and re-apply colors
  const themeObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'class') {
        applyStoredModifications();
        if (activeElement) {
          updateInspectorColorPickers(activeElement);
        }
        break;
      }
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  function getTargetSelector(el) {
    if (!el || el === document.body) return 'body';

    if (currentSyncScope === 'group') {
      const groupClass = getElementGroupClass(el);
      if (groupClass) {
        return groupClass.startsWith('.') ? groupClass : `.${groupClass}`;
      }
    }

    if (el.id) return `#${el.id}`;

    let path = [];
    let cur = el;
    while (cur && cur.nodeType === Node.ELEMENT_NODE && cur !== document.body) {
      let selector = cur.nodeName.toLowerCase();
      if (cur.id) {
        selector = `#${cur.id}`;
        path.unshift(selector);
        break;
      } else {
        let sibling = cur;
        let nth = 1;
        while ((sibling = sibling.previousElementSibling)) {
          if (sibling.nodeName.toLowerCase() === selector) nth++;
        }
        selector += `:nth-of-type(${nth})`;
      }
      path.unshift(selector);
      cur = cur.parentElement;
    }
    return path.join(' > ');
  }

  function initUI() {
    // Floating Dock
    const dock = document.createElement('div');
    dock.id = 'cv-editor-dock';
    dock.innerHTML = `
      <span class="cv-dock-badge">Studio</span>
      <button id="cv-toggle-mode-btn">✏️ Edit: <span id="cv-mode-status">OFF</span></button>
      <button id="cv-undo-btn" title="Undo (Ctrl+Z)" disabled>↶ Undo</button>
      <button id="cv-redo-btn" title="Redo (Ctrl+Y)" disabled>↷ Redo</button>
      <button id="cv-direct-save-btn" class="cv-btn-save" title="Save directly to index.html on disk">⚡ Save to File</button>
      <button id="cv-export-btn" title="Download modified HTML file">💾 Export HTML</button>
      <button id="cv-export-json-btn" title="Download modifications JSON">📋 Export JSON</button>
      <button id="cv-reset-btn" class="cv-btn-danger" title="Clear all local customizations">↺ Reset</button>
      <button id="cv-lock-btn" title="Lock and exit admin mode">🔒 Lock</button>
    `;
    document.body.appendChild(dock);

    // Floating Contextual Bubble Toolbar
    const bubble = document.createElement('div');
    bubble.id = 'cv-bubble-toolbar';
    bubble.innerHTML = `
      <button id="cv-bubble-bold" title="Toggle Bold"><b>B</b></button>
      <button id="cv-bubble-italic" title="Toggle Italic"><i>I</i></button>
      <button id="cv-bubble-link" title="Insert / Edit Link">🔗</button>
      <div class="cv-toolbar-sep"></div>
      <button id="cv-bubble-img" title="Change Image / Icon">🖼️ Img</button>
      <button id="cv-bubble-moveup" title="Move Up">↑ Up</button>
      <button id="cv-bubble-movedown" title="Move Down">↓ Down</button>
      <button id="cv-bubble-duplicate" title="Duplicate Element">❐ Copy</button>
      <button id="cv-bubble-delete" title="Delete Element" style="color:#ef4444;">✕ Del</button>
    `;
    document.body.appendChild(bubble);

    // Property Inspector Drawer
    const inspector = document.createElement('div');
    inspector.id = 'cv-inspector-panel';
    inspector.innerHTML = `
      <h4>
        <span>Inspector: <span id="cv-inspect-tag" class="cv-element-tag">none</span></span>
        <button class="cv-close-inspector" id="cv-close-inspector-btn">&times;</button>
      </h4>

      <div class="cv-inspector-section">
        <h5>Sync Scope</h5>
        <div style="display:flex; gap:6px; margin-bottom:4px;">
          <button id="cv-scope-single-btn" class="cv-preset-btn active" style="flex:1;">Single Element</button>
          <button id="cv-scope-group-btn" class="cv-preset-btn" style="flex:1;">All Similar (Group)</button>
        </div>
        <div id="cv-group-info" style="font-size:10px; color:#bbb5a7; margin-top:4px;">Modifying this item only</div>
      </div>

      <div class="cv-inspector-section">
        <h5>Quick Design Presets</h5>
        <div class="cv-presets-row">
          <button class="cv-preset-btn" id="cv-preset-sumi">Sumi Red Box</button>
          <button class="cv-preset-btn" id="cv-preset-pill">Soft Pill</button>
          <button class="cv-preset-btn" id="cv-preset-glass">Glassmorphism</button>
          <button class="cv-preset-btn" id="cv-preset-mono">Mono Card</button>
        </div>
      </div>

      <div class="cv-inspector-section">
        <h5>Typography (Both Modes)</h5>
        <div class="cv-control-row">
          <label for="cv-prop-font">Font Family</label>
          <select id="cv-prop-font">
            <option value="inherit">Inherit</option>
            <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
            <option value="'Syne', sans-serif">Syne</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="system-ui, sans-serif">System Sans</option>
            <option value="Georgia, serif">Editorial Serif</option>
          </select>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-pairing">Editorial Pairing</label>
          <select id="cv-prop-pairing">
            <option value="">Custom / Select...</option>
            <option value="syne-mono">Syne + JetBrains Mono</option>
            <option value="inter-mono">Inter + JetBrains Mono</option>
            <option value="serif-mono">Editorial Serif + Mono</option>
          </select>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-size">Font Size (px)</label>
          <input type="number" id="cv-prop-size" min="8" max="96" step="1">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-weight">Weight</label>
          <select id="cv-prop-weight">
            <option value="inherit">Inherit</option>
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">SemiBold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">ExtraBold (800)</option>
            <option value="900">Black (900)</option>
          </select>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-align">Alignment</label>
          <select id="cv-prop-align">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      </div>

      <div class="cv-inspector-section">
        <h5>Box Geometry & Layout</h5>
        <div class="cv-control-row">
          <label for="cv-prop-radius">Border Radius (px)</label>
          <input type="range" id="cv-prop-radius" min="0" max="60" value="0">
          <span id="cv-prop-radius-val">0px</span>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-border-width">Border Width (px)</label>
          <input type="number" id="cv-prop-border-width" min="0" max="20" step="1">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-border-style">Border Style</label>
          <select id="cv-prop-border-style">
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-padding">Padding (px)</label>
          <input type="number" id="cv-prop-padding" min="0" max="100" step="2">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-margin">Margin (px)</label>
          <input type="number" id="cv-prop-margin" min="0" max="100" step="2">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-gap">Flex/Grid Gap (px)</label>
          <input type="number" id="cv-prop-gap" min="0" max="80" step="2">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-maxw">Max Width</label>
          <input type="text" id="cv-prop-maxw" placeholder="e.g. 600px, 100%">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-shadow">Box Shadow</label>
          <select id="cv-prop-shadow">
            <option value="none">None</option>
            <option value="0 2px 6px rgba(0,0,0,0.15)">Subtle</option>
            <option value="0 8px 24px rgba(0,0,0,0.25)">Medium Elevation</option>
            <option value="0 16px 40px rgba(0,0,0,0.4)">Floating Heavy</option>
            <option value="inset 0 2px 4px rgba(0,0,0,0.2)">Sunken Inner</option>
          </select>
        </div>
      </div>

      <div class="cv-inspector-section">
        <h5>Animation & Motion</h5>
        <div class="cv-control-row">
          <label for="cv-prop-anim-speed">Speed / Duration</label>
          <select id="cv-prop-anim-speed">
            <option value="inherit">Default</option>
            <option value="0.6s">Fast (0.6s)</option>
            <option value="1.8s">Normal (1.8s)</option>
            <option value="4s">Slow (4s)</option>
            <option value="8s">Calm Drift (8s)</option>
          </select>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-anim-state">Motion State</label>
          <select id="cv-prop-anim-state">
            <option value="running">▶ Running</option>
            <option value="paused">⏸ Paused</option>
          </select>
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-anim-glow">Pulse Glow Intensity</label>
          <select id="cv-prop-anim-glow">
            <option value="normal">Normal</option>
            <option value="subtle">Subtle</option>
            <option value="vibrant">Vibrant</option>
            <option value="off">Off</option>
          </select>
        </div>
      </div>

      <div class="cv-inspector-section">
        <h5>Colors (<span id="cv-color-mode-indicator" style="color:var(--edit-primary); text-transform:uppercase;">DAY MODE</span>)</h5>
        <div class="cv-swatches-grid" id="cv-swatches-container"></div>
        <div class="cv-control-row">
          <label for="cv-prop-color">Text Color</label>
          <input type="color" id="cv-prop-color">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-bg-color">Background Color</label>
          <input type="color" id="cv-prop-bg-color">
        </div>
        <div class="cv-control-row">
          <label for="cv-prop-border-color">Border Color</label>
          <input type="color" id="cv-prop-border-color">
        </div>
        <div style="margin-top:8px; display:flex; justify-content:space-between;">
          <button id="cv-change-img-btn" style="background:var(--edit-card); border:1px solid #555; color:#bbb; border-radius:4px; font-size:10px; padding:3px 6px; cursor:pointer;">Replace Image</button>
          <button id="cv-reset-color-btn" style="background:transparent; border:1px solid #555; color:#bbb; border-radius:4px; font-size:10px; padding:3px 6px; cursor:pointer;">Reset Mode Colors</button>
        </div>
      </div>
    `;
    document.body.appendChild(inspector);

    // Sync Scope Buttons
    const singleBtn = document.getElementById('cv-scope-single-btn');
    const groupBtn = document.getElementById('cv-scope-group-btn');
    const groupInfo = document.getElementById('cv-group-info');

    singleBtn.addEventListener('click', () => {
      currentSyncScope = 'single';
      singleBtn.style.background = 'var(--edit-primary)';
      singleBtn.style.color = '#fff';
      groupBtn.style.background = 'var(--edit-card)';
      groupBtn.style.color = 'var(--edit-text)';
      groupInfo.textContent = 'Modifying this item only';
    });

    groupBtn.addEventListener('click', () => {
      currentSyncScope = 'group';
      groupBtn.style.background = 'var(--edit-primary)';
      groupBtn.style.color = '#fff';
      singleBtn.style.background = 'var(--edit-card)';
      singleBtn.style.color = 'var(--edit-text)';
      if (activeElement) {
        const cls = getElementGroupClass(activeElement);
        groupInfo.textContent = `Syncing across all .${cls} (${document.querySelectorAll('.' + cls).length} items)`;
      }
    });

    // Populate theme color swatches
    const swatchesContainer = document.getElementById('cv-swatches-container');
    THEME_SWATCHES.forEach((sw) => {
      const btn = document.createElement('button');
      btn.className = 'cv-swatch-btn';
      btn.style.backgroundColor = sw.hex;
      btn.title = `${sw.name} (${sw.hex})`;
      btn.addEventListener('click', () => {
        if (!activeElement) return;
        if (activeElement.isContentEditable) {
          applyStyleToTargets('color', sw.hex);
          recordElementChange(activeElement, 'color', 'color', sw.hex);
        } else {
          applyStyleToTargets('backgroundColor', sw.hex);
          recordElementChange(activeElement, 'color', 'backgroundColor', sw.hex);
        }
        updateInspectorColorPickers(activeElement);
      });
      swatchesContainer.appendChild(btn);
    });

    // Hidden file input for image uploads
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.id = 'cv-hidden-file-input';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || !activeElement) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64Url = ev.target.result;
        if (activeElement.tagName === 'IMG') {
          activeElement.src = base64Url;
          recordElementChange(activeElement, 'src', null, base64Url);
        } else {
          applyStyleToTargets('backgroundImage', `url(${base64Url})`);
          applyStyleToTargets('backgroundSize', 'cover');
          recordElementChange(activeElement, 'geometry');
        }
      };
      reader.readAsDataURL(file);
    });

    // Event listeners
    document.getElementById('cv-toggle-mode-btn').addEventListener('click', toggleEditMode);
    document.getElementById('cv-undo-btn').addEventListener('click', undo);
    document.getElementById('cv-redo-btn').addEventListener('click', redo);
    document.getElementById('cv-direct-save-btn').addEventListener('click', saveDirectlyToFile);
    document.getElementById('cv-close-inspector-btn').addEventListener('click', () => {
      inspector.classList.remove('visible');
    });
    document.getElementById('cv-export-btn').addEventListener('click', exportCleanHtml);
    document.getElementById('cv-export-json-btn').addEventListener('click', exportModificationsJson);
    document.getElementById('cv-reset-btn').addEventListener('click', resetAllModifications);
    document.getElementById('cv-lock-btn').addEventListener('click', lockEditor);
    document.getElementById('cv-reset-color-btn').addEventListener('click', resetElementCurrentModeColors);
    document.getElementById('cv-change-img-btn').addEventListener('click', triggerImagePrompt);

    // Preset button handlers
    document.getElementById('cv-preset-sumi').addEventListener('click', () => applyDesignPreset('sumi'));
    document.getElementById('cv-preset-pill').addEventListener('click', () => applyDesignPreset('pill'));
    document.getElementById('cv-preset-glass').addEventListener('click', () => applyDesignPreset('glass'));
    document.getElementById('cv-preset-mono').addEventListener('click', () => applyDesignPreset('mono'));

    // Bubble toolbar actions
    document.getElementById('cv-bubble-bold').addEventListener('click', () => document.execCommand('bold', false, null));
    document.getElementById('cv-bubble-italic').addEventListener('click', () => document.execCommand('italic', false, null));
    document.getElementById('cv-bubble-link').addEventListener('click', () => {
      const url = prompt('Enter link URL:', 'https://');
      if (url) document.execCommand('createLink', false, url);
    });
    document.getElementById('cv-bubble-img').addEventListener('click', triggerImagePrompt);
    document.getElementById('cv-bubble-moveup').addEventListener('click', moveElementUp);
    document.getElementById('cv-bubble-movedown').addEventListener('click', moveElementDown);
    document.getElementById('cv-bubble-duplicate').addEventListener('click', duplicateElement);
    document.getElementById('cv-bubble-delete').addEventListener('click', deleteElement);

    bindInspectorInputs();
    pushHistoryState();
  }

  function applyStyleToTargets(prop, val) {
    if (!activeElement) return;
    if (currentSyncScope === 'group') {
      const selector = getTargetSelector(activeElement);
      document.querySelectorAll(selector).forEach((el) => {
        el.style[prop] = val;
      });
    } else {
      activeElement.style[prop] = val;
    }
  }

  function switchViewport(mode) {
    document.body.classList.remove('cv-viewport-tablet', 'cv-viewport-mobile');
    document.getElementById('cv-vp-desktop').classList.remove('active');
    document.getElementById('cv-vp-tablet').classList.remove('active');
    document.getElementById('cv-vp-mobile').classList.remove('active');

    if (mode === 'tablet') {
      document.body.classList.add('cv-viewport-tablet');
      document.getElementById('cv-vp-tablet').classList.add('active');
    } else if (mode === 'mobile') {
      document.body.classList.add('cv-viewport-mobile');
      document.getElementById('cv-vp-mobile').classList.add('active');
    } else {
      document.getElementById('cv-vp-desktop').classList.add('active');
    }
  }

  function applyDesignPreset(presetName) {
    if (!activeElement) return;

    if (presetName === 'sumi') {
      applyStyleToTargets('border', '2px solid #c92a2a');
      applyStyleToTargets('borderRadius', '4px');
      applyStyleToTargets('padding', '12px');
      applyStyleToTargets('boxShadow', '0 4px 12px rgba(201, 42, 42, 0.15)');
    } else if (presetName === 'pill') {
      applyStyleToTargets('borderRadius', '9999px');
      applyStyleToTargets('padding', '6px 16px');
      applyStyleToTargets('border', '1px solid #c92a2a');
      applyStyleToTargets('boxShadow', '0 2px 8px rgba(0,0,0,0.1)');
    } else if (presetName === 'glass') {
      applyStyleToTargets('backgroundColor', 'rgba(255, 255, 255, 0.45)');
      applyStyleToTargets('backdropFilter', 'blur(12px)');
      applyStyleToTargets('border', '1px solid rgba(255, 255, 255, 0.3)');
      applyStyleToTargets('borderRadius', '12px');
      applyStyleToTargets('boxShadow', '0 8px 32px rgba(0,0,0,0.12)');
    } else if (presetName === 'mono') {
      applyStyleToTargets('fontFamily', "'JetBrains Mono', monospace");
      applyStyleToTargets('border', '1px solid #1d1c19');
      applyStyleToTargets('borderRadius', '0px');
      applyStyleToTargets('padding', '10px');
    }

    recordElementChange(activeElement, 'geometry');
    selectElement(activeElement);
  }

  function triggerImagePrompt() {
    if (!activeElement) return;
    const choice = confirm('Click OK to upload an image from your computer, or CANCEL to enter an image URL.');
    if (choice) {
      document.getElementById('cv-hidden-file-input').click();
    } else {
      const url = prompt('Enter Image URL:');
      if (url) {
        if (activeElement.tagName === 'IMG') {
          activeElement.src = url;
          recordElementChange(activeElement, 'src', null, url);
        } else {
          applyStyleToTargets('backgroundImage', `url(${url})`);
          applyStyleToTargets('backgroundSize', 'cover');
          recordElementChange(activeElement, 'geometry');
        }
      }
    }
  }

  function moveElementUp() {
    if (!activeElement || !activeElement.parentElement) return;
    const prev = activeElement.previousElementSibling;
    if (prev) {
      activeElement.parentElement.insertBefore(activeElement, prev);
      positionBubbleToolbar(activeElement);
      recordElementChange(activeElement.parentElement, 'content');
    }
  }

  function moveElementDown() {
    if (!activeElement || !activeElement.parentElement) return;
    const next = activeElement.nextElementSibling;
    if (next) {
      activeElement.parentElement.insertBefore(next, activeElement);
      positionBubbleToolbar(activeElement);
      recordElementChange(activeElement.parentElement, 'content');
    }
  }

  function duplicateElement() {
    if (!activeElement || !activeElement.parentElement) return;
    const clone = activeElement.cloneNode(true);
    clone.classList.remove('cv-selected-element');
    activeElement.parentElement.insertBefore(clone, activeElement.nextSibling);
    selectElement(clone);
    recordElementChange(activeElement.parentElement, 'content');
  }

  function deleteElement() {
    if (!activeElement) return;
    if (confirm('Delete this element?')) {
      const parent = activeElement.parentElement;
      activeElement.remove();
      activeElement = null;
      document.getElementById('cv-bubble-toolbar').classList.remove('visible');
      document.getElementById('cv-inspector-panel').classList.remove('visible');
      if (parent) recordElementChange(parent, 'content');
    }
  }

  function toggleEditMode() {
    isEditMode = !isEditMode;
    const statusSpan = document.getElementById('cv-mode-status');
    const toggleBtn = document.getElementById('cv-toggle-mode-btn');

    if (isEditMode) {
      document.body.classList.add('cv-editor-active');
      statusSpan.textContent = 'ON';
      statusSpan.style.color = '#4ade80';
      toggleBtn.style.background = 'var(--edit-primary)';
      makeElementsEditable(true);
    } else {
      document.body.classList.remove('cv-editor-active');
      statusSpan.textContent = 'OFF';
      statusSpan.style.color = '#fff';
      toggleBtn.style.background = 'var(--edit-card)';
      makeElementsEditable(false);
      if (activeElement) {
        activeElement.classList.remove('cv-selected-element');
        activeElement = null;
      }
      document.getElementById('cv-inspector-panel').classList.remove('visible');
      document.getElementById('cv-bubble-toolbar').classList.remove('visible');
    }
  }

  function makeElementsEditable(enable) {
    const selector =
      'h1, h2, h3, h4, h5, h6, p, span, a, li, button, .bento-card, .project-card, .pill, header, footer, section, article, img';
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      if (
        el.closest('#cv-editor-dock') ||
        el.closest('#cv-inspector-panel') ||
        el.closest('#cv-unlock-modal') ||
        el.closest('#cv-bubble-toolbar') ||
        el.closest('#cv-viewport-bar')
      ) {
        return;
      }

      if (enable) {
        el.setAttribute('data-cv-editable', 'true');
        const hasTextChildOnly = Array.from(el.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
        if (hasTextChildOnly && !el.matches('svg, img, input, textarea, canvas')) {
          el.contentEditable = 'true';
        }
      } else {
        el.removeAttribute('data-cv-editable');
        el.contentEditable = 'false';
      }
    });
  }

  document.addEventListener(
    'click',
    (e) => {
      if (!isEditMode) return;

      if (
        e.target.closest('#cv-editor-dock') ||
        e.target.closest('#cv-inspector-panel') ||
        e.target.closest('#cv-unlock-modal') ||
        e.target.closest('#cv-bubble-toolbar') ||
        e.target.closest('#cv-viewport-bar')
      ) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      selectElement(e.target);
    },
    true
  );

  document.addEventListener('input', (e) => {
    if (!isEditMode || !activeElement) return;
    if (
      e.target.closest('#cv-editor-dock') ||
      e.target.closest('#cv-inspector-panel') ||
      e.target.closest('#cv-bubble-toolbar') ||
      e.target.closest('#cv-viewport-bar')
    ) {
      return;
    }

    recordElementChange(activeElement, 'content');
  });

  function positionBubbleToolbar(el) {
    const bubble = document.getElementById('cv-bubble-toolbar');
    if (!bubble || !el) return;
    const rect = el.getBoundingClientRect();
    const top = Math.max(10, rect.top + window.scrollY - 42);
    const left = Math.max(10, rect.left + window.scrollX);
    bubble.style.top = `${top}px`;
    bubble.style.left = `${left}px`;
    bubble.classList.add('visible');
  }

  function selectElement(el) {
    if (activeElement) {
      activeElement.classList.remove('cv-selected-element');
    }
    activeElement = el;
    activeElement.classList.add('cv-selected-element');

    const inspector = document.getElementById('cv-inspector-panel');
    inspector.classList.add('visible');
    positionBubbleToolbar(el);

    const tag = el.tagName.toLowerCase() + (el.id ? `#${el.id}` : el.className ? `.${el.className.split(' ')[0]}` : '');
    document.getElementById('cv-inspect-tag').textContent = tag.length > 20 ? tag.substring(0, 18) + '...' : tag;

    const groupClass = getElementGroupClass(el);
    const groupInfo = document.getElementById('cv-group-info');
    if (groupInfo) {
      if (currentSyncScope === 'group') {
        const count = document.querySelectorAll('.' + groupClass).length;
        groupInfo.textContent = `Syncing across all .${groupClass} (${count} items)`;
      } else {
        groupInfo.textContent = `Targeting single item (Group: .${groupClass})`;
      }
    }

    const computed = window.getComputedStyle(el);

    const fontSize = parseInt(computed.fontSize, 10);
    if (!isNaN(fontSize)) document.getElementById('cv-prop-size').value = fontSize;
    document.getElementById('cv-prop-weight').value = computed.fontWeight || 'inherit';

    const radius = parseInt(computed.borderRadius, 10) || 0;
    document.getElementById('cv-prop-radius').value = radius;
    document.getElementById('cv-prop-radius-val').textContent = `${radius}px`;

    const bWidth = parseInt(computed.borderWidth, 10) || 0;
    document.getElementById('cv-prop-border-width').value = bWidth;
    document.getElementById('cv-prop-border-style').value = computed.borderStyle || 'none';

    const padding = parseInt(computed.paddingTop, 10) || 0;
    document.getElementById('cv-prop-padding').value = padding;

    const margin = parseInt(computed.marginTop, 10) || 0;
    document.getElementById('cv-prop-margin').value = margin;

    const gap = parseInt(computed.gap, 10) || 0;
    document.getElementById('cv-prop-gap').value = gap;

    document.getElementById('cv-prop-maxw').value = el.style.maxWidth || '';

    updateInspectorColorPickers(el);
  }

  function rgbToHex(rgbStr) {
    if (!rgbStr || rgbStr === 'transparent') return '#ffffff';
    const match = rgbStr.match(/\d+/g);
    if (!match || match.length < 3) return '#000000';
    return (
      '#' +
      [match[0], match[1], match[2]]
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  function updateInspectorColorPickers(el) {
    const mode = getCurrentThemeMode();
    const indicator = document.getElementById('cv-color-mode-indicator');
    if (indicator) {
      indicator.textContent = `${mode.toUpperCase()} MODE`;
    }

    const computed = window.getComputedStyle(el);
    const colorInput = document.getElementById('cv-prop-color');
    const bgInput = document.getElementById('cv-prop-bg-color');
    const borderInput = document.getElementById('cv-prop-border-color');

    if (colorInput) colorInput.value = rgbToHex(computed.color);
    if (bgInput) bgInput.value = rgbToHex(computed.backgroundColor);
    if (borderInput) borderInput.value = rgbToHex(computed.borderColor);
  }

  function bindInspectorInputs() {
    const bindGeometry = (id, prop, transform) => {
      const input = document.getElementById(id);
      input.addEventListener('input', (e) => {
        if (!activeElement) return;
        const val = transform ? transform(e.target.value) : e.target.value;
        applyStyleToTargets(prop, val);
        recordElementChange(activeElement, 'geometry');
      });
    };

    bindGeometry('cv-prop-font', 'fontFamily', (v) => (v === 'inherit' ? '' : v));
    bindGeometry('cv-prop-size', 'fontSize', (v) => (v ? `${v}px` : ''));
    bindGeometry('cv-prop-weight', 'fontWeight', (v) => (v === 'inherit' ? '' : v));
    bindGeometry('cv-prop-align', 'textAlign');

    // Font pairing presets
    document.getElementById('cv-prop-pairing').addEventListener('change', (e) => {
      if (!activeElement) return;
      const val = e.target.value;
      let family = '';
      if (val === 'syne-mono') family = "'Syne', sans-serif";
      else if (val === 'inter-mono') family = "'Inter', sans-serif";
      else if (val === 'serif-mono') family = "Georgia, serif";
      if (family) {
        applyStyleToTargets('fontFamily', family);
        recordElementChange(activeElement, 'geometry');
      }
    });

    const radiusInput = document.getElementById('cv-prop-radius');
    radiusInput.addEventListener('input', (e) => {
      if (!activeElement) return;
      const v = e.target.value;
      applyStyleToTargets('borderRadius', `${v}px`);
      document.getElementById('cv-prop-radius-val').textContent = `${v}px`;
      recordElementChange(activeElement, 'geometry');
    });

    bindGeometry('cv-prop-border-width', 'borderWidth', (v) => (v ? `${v}px` : ''));
    bindGeometry('cv-prop-border-style', 'borderStyle');
    bindGeometry('cv-prop-padding', 'padding', (v) => (v ? `${v}px` : ''));
    bindGeometry('cv-prop-margin', 'margin', (v) => (v ? `${v}px` : ''));
    bindGeometry('cv-prop-gap', 'gap', (v) => (v ? `${v}px` : ''));
    bindGeometry('cv-prop-maxw', 'maxWidth');
    bindGeometry('cv-prop-shadow', 'boxShadow');

    // Animation & Motion listeners
    document.getElementById('cv-prop-anim-speed').addEventListener('change', (e) => {
      if (!activeElement) return;
      const v = e.target.value;
      if (v === 'inherit') {
        applyStyleToTargets('animationDuration', '');
      } else {
        applyStyleToTargets('animationDuration', v);
      }
      recordElementChange(activeElement, 'geometry');
    });

    document.getElementById('cv-prop-anim-state').addEventListener('change', (e) => {
      if (!activeElement) return;
      applyStyleToTargets('animationPlayState', e.target.value);
      recordElementChange(activeElement, 'geometry');
    });

    document.getElementById('cv-prop-anim-glow').addEventListener('change', (e) => {
      if (!activeElement) return;
      const v = e.target.value;
      if (v === 'subtle') applyStyleToTargets('filter', 'drop-shadow(0 0 4px rgba(201,42,42,0.4))');
      else if (v === 'vibrant') applyStyleToTargets('filter', 'drop-shadow(0 0 12px rgba(201,42,42,0.85))');
      else if (v === 'off') applyStyleToTargets('filter', 'none');
      else applyStyleToTargets('filter', '');
      recordElementChange(activeElement, 'geometry');
    });

    const bindColor = (id, prop) => {
      const input = document.getElementById(id);
      input.addEventListener('input', (e) => {
        if (!activeElement) return;
        applyStyleToTargets(prop, e.target.value);
        recordElementChange(activeElement, 'color', prop, e.target.value);
      });
    };

    bindColor('cv-prop-color', 'color');
    bindColor('cv-prop-bg-color', 'backgroundColor');
    bindColor('cv-prop-border-color', 'borderColor');
  }

  function recordElementChange(el, changeType, colorProp, val) {
    if (!el) return;
    const selector = getTargetSelector(el);
    if (!modifications[selector]) {
      modifications[selector] = {
        innerHTML: undefined,
        src: undefined,
        geometryStyles: {},
        dayColors: {},
        nightColors: {}
      };
    }

    const mod = modifications[selector];
    const mode = getCurrentThemeMode();

    if (changeType === 'content' && el.isContentEditable) {
      mod.innerHTML = el.innerHTML;
    }

    if (changeType === 'src' && val) {
      mod.src = val;
    }

    if (changeType === 'geometry') {
      if (!mod.geometryStyles) mod.geometryStyles = {};
      const geomProps = [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'textAlign',
        'borderRadius',
        'borderWidth',
        'borderStyle',
        'padding',
        'margin',
        'gap',
        'maxWidth',
        'boxShadow',
        'backgroundImage',
        'backgroundSize',
        'backdropFilter',
        'animationDuration',
        'animationPlayState',
        'filter'
      ];
      geomProps.forEach((p) => {
        if (el.style[p]) {
          mod.geometryStyles[p] = el.style[p];
        }
      });
    }

    if (changeType === 'color' && colorProp) {
      const targetColors = mode === 'night' ? (mod.nightColors = mod.nightColors || {}) : (mod.dayColors = mod.dayColors || {});
      targetColors[colorProp] = val;
    }

    localStorage.setItem(STORAGE_KEY_MODS, JSON.stringify(modifications));
    pushHistoryState();
  }

  function resetElementCurrentModeColors() {
    if (!activeElement) return;
    const selector = getTargetSelector(activeElement);
    const mode = getCurrentThemeMode();

    if (modifications[selector]) {
      if (mode === 'night') {
        delete modifications[selector].nightColors;
      } else {
        delete modifications[selector].dayColors;
      }
      localStorage.setItem(STORAGE_KEY_MODS, JSON.stringify(modifications));
    }

    COLOR_PROPS.forEach((p) => {
      applyStyleToTargets(p, '');
    });
    updateInspectorColorPickers(activeElement);
    pushHistoryState();
  }

  function resetAllModifications() {
    if (confirm('Are you sure you want to revert all custom modifications back to default?')) {
      localStorage.removeItem(STORAGE_KEY_MODS);
      window.location.reload();
    }
  }

  function lockEditor() {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    window.location.href = window.location.pathname;
  }

  function exportModificationsJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(modifications, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', 'cool-cv-customizations.json');
    dl.click();
  }

  function getCleanHtmlString() {
    const clone = document.documentElement.cloneNode(true);

    const dock = clone.querySelector('#cv-editor-dock');
    if (dock) dock.remove();
    const inspector = clone.querySelector('#cv-inspector-panel');
    if (inspector) inspector.remove();
    const modal = clone.querySelector('#cv-unlock-modal');
    if (modal) modal.remove();
    const bubble = clone.querySelector('#cv-bubble-toolbar');
    if (bubble) bubble.remove();
    const vpBar = clone.querySelector('#cv-viewport-bar');
    if (vpBar) vpBar.remove();
    const hiddenFile = clone.querySelector('#cv-hidden-file-input');
    if (hiddenFile) hiddenFile.remove();

    clone.querySelectorAll('link[href*="editor.css"]').forEach((l) => l.remove());
    clone.querySelectorAll('script[src*="editor.js"]').forEach((s) => s.remove());

    clone.classList.remove('cv-editor-active', 'cv-viewport-tablet', 'cv-viewport-mobile');
    clone.querySelectorAll('.cv-selected-element').forEach((el) => el.classList.remove('cv-selected-element'));
    clone.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
    clone.querySelectorAll('[data-cv-editable]').forEach((el) => el.removeAttribute('data-cv-editable'));

    return '<!DOCTYPE html>\n' + clone.outerHTML;
  }

  async function saveDirectlyToFile() {
    const cleanHtml = getCleanHtmlString();
    const btn = document.getElementById('cv-direct-save-btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '⏳ Saving...';
    btn.disabled = true;

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: cleanHtml })
      });

      if (response.ok) {
        btn.innerHTML = '✓ Saved to index.html!';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2000);
      } else {
        throw new Error('Server returned ' + response.status);
      }
    } catch (err) {
      alert('Direct save API not detected (requires running: python3 scripts/dev_studio.py).\nDownloading HTML file instead.');
      exportCleanHtml();
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  function exportCleanHtml() {
    const htmlContent = getCleanHtmlString();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  function showUnlockModal() {
    if (document.getElementById('cv-unlock-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'cv-unlock-modal';
    modal.innerHTML = `
      <div class="cv-modal-box">
        <h3>Admin Editor Access</h3>
        <p>Enter your secret editor key to unlock live in-place editing on this portfolio.</p>
        <input type="password" id="cv-admin-key-input" placeholder="Secret Key" autofocus>
        <div class="cv-modal-actions">
          <button id="cv-cancel-unlock-btn" style="background:transparent;border:none;color:#aaa;cursor:pointer;padding:6px 12px;">Cancel</button>
          <button id="cv-submit-unlock-btn" style="background:var(--edit-primary);color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-weight:700;">Unlock</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('cv-admin-key-input');
    const submitBtn = document.getElementById('cv-submit-unlock-btn');
    const cancelBtn = document.getElementById('cv-cancel-unlock-btn');

    const isLockedOut = () => {
      const lockoutUntil = parseInt(localStorage.getItem(STORAGE_KEY_LOCKOUT) || '0', 10);
      if (Date.now() < lockoutUntil) {
        const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
        return remainingSec;
      }
      return 0;
    };

    const handleUnlock = async () => {
      const waitTime = isLockedOut();
      if (waitTime > 0) {
        alert(`Too many failed attempts. Login is locked. Please wait ${waitTime} seconds.`);
        return;
      }

      const inputVal = input.value.trim();
      if (!inputVal) return;

      const hashed = await sha256Hex(inputVal);
      if (hashed === EXPECTED_HASH) {
        localStorage.setItem(STORAGE_KEY_AUTH, 'unlocked');
        localStorage.removeItem(STORAGE_KEY_ATTEMPTS);
        localStorage.removeItem(STORAGE_KEY_LOCKOUT);
        modal.remove();
        isAuthorized = true;
        initUI();
        toggleEditMode();
      } else {
        const failedAttempts = parseInt(localStorage.getItem(STORAGE_KEY_ATTEMPTS) || '0', 10) + 1;
        localStorage.setItem(STORAGE_KEY_ATTEMPTS, failedAttempts.toString());

        if (failedAttempts >= 5) {
          const lockDurationMs = 15 * 60 * 1000;
          localStorage.setItem(STORAGE_KEY_LOCKOUT, (Date.now() + lockDurationMs).toString());
          alert('Security Lockout: 5 failed attempts reached. Access locked for 15 minutes.');
        } else if (failedAttempts >= 3) {
          const lockDurationMs = 30 * 1000;
          localStorage.setItem(STORAGE_KEY_LOCKOUT, (Date.now() + lockDurationMs).toString());
          alert(`Invalid key. Rate limit triggered: Access locked for 30 seconds (Attempt ${failedAttempts} of 5).`);
        } else {
          alert(`Invalid access key. (${failedAttempts}/5 attempts used)`);
        }
      }
    };

    submitBtn.addEventListener('click', handleUnlock);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUnlock();
      if (e.key === 'Escape') modal.remove();
    });
    cancelBtn.addEventListener('click', () => modal.remove());
  }

  window.addEventListener('keydown', (e) => {
    // Undo: Ctrl+Z / Cmd+Z
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
      if (isEditMode) {
        e.preventDefault();
        undo();
      }
    }
    // Redo: Ctrl+Y or Ctrl+Shift+Z
    if ((e.ctrlKey || e.metaKey) && ((e.key === 'y' || e.key === 'Y') || (e.shiftKey && (e.key === 'z' || e.key === 'Z')))) {
      if (isEditMode) {
        e.preventDefault();
        redo();
      }
    }
    // Toggle Editor: Ctrl+Shift+E
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      if (isAuthorized) {
        toggleEditMode();
      } else {
        showUnlockModal();
      }
      return;
    }

    // Close Inspector & deselect element on Escape WITHOUT closing the section modal
    if (e.key === 'Escape') {
      const inspector = document.getElementById('cv-inspector-panel');
      const bubble = document.getElementById('cv-bubble-toolbar');
      const isInspectorOpen = inspector && inspector.classList.contains('visible');
      const isBubbleOpen = bubble && bubble.classList.contains('visible');

      if (isInspectorOpen || isBubbleOpen || activeElement) {
        // Stop the key event from reaching the modal close handler
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (inspector) inspector.classList.remove('visible');
        if (bubble) bubble.classList.remove('visible');
        if (activeElement) {
          activeElement.classList.remove('cv-selected-element');
          activeElement.blur();
          activeElement = null;
        }
      }
    }
  }, true); // Capture phase ensures editor intercepts before page modal handler

  document.addEventListener('DOMContentLoaded', async () => {
    applyStoredModifications();

    if (adminParam && !isAuthorized) {
      const hashedParam = await sha256Hex(adminParam);
      if (hashedParam === EXPECTED_HASH) {
        isAuthorized = true;
        localStorage.setItem(STORAGE_KEY_AUTH, 'unlocked');
        localStorage.removeItem(STORAGE_KEY_ATTEMPTS);
        localStorage.removeItem(STORAGE_KEY_LOCKOUT);
      }
    }

    if (isAuthorized) {
      initUI();
      if (editParam === 'true') {
        toggleEditMode();
      }
    }
  });
})();
