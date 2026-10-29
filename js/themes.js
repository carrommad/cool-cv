/**
 * ==============================================================================
 * COOL-CV THEMES & SOLAR TIME CONTROLLER
 * ==============================================================================
 * Purpose: Manages palette classes (Day, Night, Cyber Yellow, Touareg, etc.)
 *          and synchronizes theme automatically with Spain solar time.
 * ==============================================================================
 */

    // ---------------------------------------------------------
    // COLOR PALETTES SUITE CONTROLLER
    // ---------------------------------------------------------
    const ALL_PALETTE_CLASSES = [
      'theme-night',
      'theme-editorial-day',
      'theme-black-silver',
      'theme-touareg',
      'theme-cyber-yellow',
      'theme-nordic-pine',
      'theme-marenostrum',
      'theme-crimson-linen',
      'theme-deep-blue',
      'theme-indigo-honey',
      'theme-lemon-meringue'
    ];

    var currentThemeMode = 'day';
    var currentActivePalette = 'crimson-linen';

    function changeColorPalette(paletteId) {
      currentActivePalette = paletteId;
      document.body.classList.remove(...ALL_PALETTE_CLASSES);
      document.documentElement.classList.remove(...ALL_PALETTE_CLASSES);

      let targetClass = 'theme-crimson-linen';
      if (paletteId === 'editorial-night') {
        targetClass = 'theme-night';
        currentThemeMode = 'night';
      } else if (paletteId === 'editorial-day') {
        targetClass = 'theme-editorial-day';
        currentThemeMode = 'day';
      } else if (paletteId === 'black-silver') {
        targetClass = 'theme-black-silver';
        currentThemeMode = 'night';
      } else if (paletteId === 'touareg') {
        targetClass = 'theme-touareg';
        currentThemeMode = 'night';
      } else if (paletteId === 'cyber-yellow') {
        targetClass = 'theme-cyber-yellow';
        currentThemeMode = 'night';
      } else if (paletteId === 'nordic-pine') {
        targetClass = 'theme-nordic-pine';
        currentThemeMode = 'night';
      } else if (paletteId === 'marenostrum') {
        targetClass = 'theme-marenostrum';
        currentThemeMode = 'night';
      } else if (paletteId === 'crimson-linen') {
        targetClass = 'theme-crimson-linen';
        currentThemeMode = 'day';
      } else if (paletteId === 'deep-blue') {
        targetClass = 'theme-deep-blue';
        currentThemeMode = 'night';
      } else if (paletteId === 'indigo-honey') {
        targetClass = 'theme-indigo-honey';
        currentThemeMode = 'night';
      } else if (paletteId === 'lemon-meringue') {
        targetClass = 'theme-lemon-meringue';
        currentThemeMode = 'day';
      } else {
        targetClass = 'theme-crimson-linen';
        currentThemeMode = 'day';
      }

      document.body.classList.add(targetClass);
      document.documentElement.classList.add(targetClass);

      // Sync select dropdown
      const sel = document.getElementById('palette-select');
      if (sel && sel.value !== paletteId) {
        sel.value = paletteId;
      }

      // Sync theme button label
      const themeLabel = document.getElementById('theme-btn-label');
      if (themeLabel) {
        themeLabel.textContent = (currentThemeMode === 'night') ? 'Night Mode' : 'Day Mode';
      }

      // Modulate audio mood if synthesizer is playing
      if (typeof updateAudioMood === 'function') {
        try {
          updateAudioMood(currentThemeMode, paletteId);
        } catch (e) {
          // Audio mood update deferred until audio variables are initialized
        }
      }
    }

    function toggleThemeBW() {
      // Toggle between Day Mode (Crimson & Raw) and Night Mode (Deep Blue & Glacial)
      if (currentThemeMode === 'night') {
        changeColorPalette('crimson-linen');
      } else {
        changeColorPalette('deep-blue');
      }
    }

    // ---------------------------------------------------------
    // SPAIN SOLAR TIME AUTO-THEME DETECTION
    // ---------------------------------------------------------
    function getSpainSolarTimes(date = new Date()) {
      // Spain baseline coordinates (Barcelona / BSC: 41.3879° N, 2.1699° E)
      // Standard NOAA Solar Calculation for sunrise & sunset
      const lat = 41.3879;
      const lon = 2.1699;
      const rad = Math.PI / 180;
      
      const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      const dayOfYear = Math.floor((date - startOfYear) / 86400000) + 1;
      const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
      
      // Equation of time in minutes
      const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
      // Solar declination in radians
      const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);
      
      // Solar zenith for atmospheric refraction (90.833 deg)
      const zenith = 90.833 * rad;
      const latRad = lat * rad;
      const cosH0 = (Math.cos(zenith) - Math.sin(latRad) * Math.sin(decl)) / (Math.cos(latRad) * Math.cos(decl));
      const H0 = Math.acos(Math.max(-1, Math.min(1, cosH0))) / rad;
      
      // Solar noon in UTC minutes
      const noonUtcMin = 720 - 4 * lon - eqtime;
      const sunriseUtcHours = (noonUtcMin - 4 * H0) / 60;
      const sunsetUtcHours = (noonUtcMin + 4 * H0) / 60;
      
      // Determine Spain (Europe/Madrid) current offset from UTC
      let tzOffsetHours = 2; // Default CEST
      try {
        const utcDateStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
        const spainDateStr = date.toLocaleString('en-US', { timeZone: 'Europe/Madrid' });
        const diffMs = new Date(spainDateStr) - new Date(utcDateStr);
        tzOffsetHours = diffMs / (1000 * 60 * 60);
      } catch (e) {
        const month = date.getUTCMonth();
        tzOffsetHours = (month >= 2 && month <= 9) ? 2 : 1;
      }
      
      const sunriseLocal = sunriseUtcHours + tzOffsetHours;
      const sunsetLocal = sunsetUtcHours + tzOffsetHours;
      
      return {
        sunriseDecimal: sunriseLocal,
        sunsetDecimal: sunsetLocal,
        sunriseStr: formatDecimalHour(sunriseLocal),
        sunsetStr: formatDecimalHour(sunsetLocal)
      };
    }

    function formatDecimalHour(dec) {
      const h = Math.floor(dec);
      const m = Math.round((dec - h) * 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    function getSpainCurrentDecimalHour(date = new Date()) {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Madrid',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        });
        const parts = formatter.formatToParts(date);
        let h = 0, m = 0, s = 0;
        for (const p of parts) {
          if (p.type === 'hour') h = parseInt(p.value, 10);
          if (p.type === 'minute') m = parseInt(p.value, 10);
          if (p.type === 'second') s = parseInt(p.value, 10);
        }
        return h + m / 60 + s / 3600;
      } catch (e) {
        return date.getHours() + date.getMinutes() / 60;
      }
    }

    function initSolarThemeSync() {
      const solar = getSpainSolarTimes();
      const currentSpainHour = getSpainCurrentDecimalHour();
      const isDaytime = (currentSpainHour >= solar.sunriseDecimal && currentSpainHour < solar.sunsetDecimal);
      const targetPalette = isDaytime ? 'crimson-linen' : 'deep-blue';
      
      // Synchronize full palette state, buttons, classes and labels
      changeColorPalette(targetPalette);
      
      // Update toggle button tooltip with telemetry
      const btn = document.getElementById('btn-theme-toggle');
      if (btn) {
        const currentModeName = isDaytime ? 'Day Mode' : 'Night Mode';
        const titleText = `Spain Solar Theme: ${currentModeName} (Sunrise: ${solar.sunriseStr}, Sunset: ${solar.sunsetStr} CEST). Click to toggle Day/Night.`;
        btn.title = titleText;
        btn.setAttribute('title', titleText);
      }
    }

    // Initialize solar theme synchronization on script execution
    initSolarThemeSync();


