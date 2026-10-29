    // ---------------------------------------------------------
    // DYNAMIC CONTENT LOADER (from content.json / embedded data)
    // ---------------------------------------------------------
    function applyMainContent(data) {
      if (!data) return;

      // Header
      if (data.header) {
        if (data.header.status_badge) {
          const fullRaw = data.header.status_badge.full || '';
          const shortRaw = data.header.status_badge.short || '';
          
          const fullParts = fullRaw.split('·').map(s => s.trim());
          const shortParts = shortRaw.split('·').map(s => s.trim());
          
          const fullLead = document.querySelector('.status-text-full .status-part-lead');
          const fullTrail = document.querySelector('.status-text-full .status-part-trail');
          if (fullLead && fullParts[0]) fullLead.textContent = fullParts[0];
          if (fullTrail && fullParts[1]) fullTrail.textContent = fullParts[1];

          const shortLead = document.querySelector('.status-text-short .status-part-lead');
          const shortTrail = document.querySelector('.status-text-short .status-part-trail');
          if (shortLead && shortParts[0]) shortLead.textContent = shortParts[0];
          if (shortTrail && shortParts[1]) shortTrail.textContent = shortParts[1];
        }

        if (data.header.name) {
          const l1 = document.querySelector('.hero-name-line-1');
          const l2 = document.querySelector('.hero-name-line-2');
          const l3 = document.querySelector('.hero-name-line-3');
          if (l1 && data.header.name.first_name) l1.textContent = data.header.name.first_name;
          if (l2 && data.header.name.surname_1) l2.textContent = data.header.name.surname_1;
          if (l3 && data.header.name.surname_2) l3.textContent = data.header.name.surname_2;

          const h1 = document.querySelector('.hero-name');
          if (h1 && data.header.name.first_name) {
            h1.setAttribute('aria-label', `${data.header.name.first_name} ${data.header.name.surname_1 || ''} ${data.header.name.surname_2 || ''}`.trim());
          }
        }

        if (data.header.roles && Array.isArray(data.header.roles)) {
          const r1 = document.querySelector('.hero-role-1');
          const r2 = document.querySelector('.hero-role-2');
          const r3 = document.querySelector('.hero-role-3');
          if (r1 && data.header.roles[0]) r1.textContent = data.header.roles[0];
          if (r2 && data.header.roles[1]) r2.textContent = data.header.roles[1];
          if (r3 && data.header.roles[2]) r3.textContent = data.header.roles[2];
        } else if (data.header.discipline) {
          const disc = document.querySelector('.hero-discipline');
          if (disc) disc.textContent = data.header.discipline;
        }

        if (data.header.bio) {
          const bio = document.querySelector('.hero-bio');
          if (bio) {
            if (Array.isArray(data.header.bio)) {
              bio.innerHTML = data.header.bio.map(line => `<span class="hero-bio-line">${line}</span>`).join('');
            } else {
              bio.textContent = data.header.bio;
            }
          }
        }
      }

      // Cards
      if (data.cards && Array.isArray(data.cards)) {
        const cardEls = document.querySelectorAll('.vertical-cards-list .editorial-card');
        data.cards.forEach((cardData, idx) => {
          const cardEl = cardEls[idx];
          if (!cardEl) return;
          const numEl = cardEl.querySelector('.card-big-num');
          const tagEl = cardEl.querySelector('.meta-tag');
          const periodEl = cardEl.querySelector('.meta-period');
          const titleEl = cardEl.querySelector('.card-title');
          const descEl = cardEl.querySelector('.card-desc');
          const btnEl = cardEl.querySelector('.action-prompt-btn');

          if (numEl && cardData.number) numEl.textContent = cardData.number;
          if (tagEl && cardData.tag) tagEl.textContent = cardData.tag;
          if (periodEl) {
            if (cardData.period) {
              periodEl.textContent = cardData.period;
              periodEl.style.display = '';
              const bulletEl = cardEl.querySelector('.meta-bullet');
              if (bulletEl) bulletEl.style.display = '';
            } else {
              periodEl.textContent = '';
              periodEl.style.display = 'none';
              const bulletEl = cardEl.querySelector('.meta-bullet');
              if (bulletEl) bulletEl.style.display = 'none';
            }
          }
          if (titleEl && cardData.title) titleEl.textContent = cardData.title;
          if (descEl && cardData.description) descEl.textContent = cardData.description;
          if (btnEl && cardData.action_text) btnEl.textContent = cardData.action_text;

          // Keep modal header in sync if this card opens a modal
          if (cardData.modal_id) {
            const modalEl = document.getElementById(cardData.modal_id);
            if (modalEl) {
              const modalTagSpan = modalEl.querySelector('.modal-header-titles > span');
              if (modalTagSpan && cardData.number && cardData.tag) {
                modalTagSpan.textContent = `${cardData.number} · ${cardData.tag}`;
              }
              const modalTitleH2 = modalEl.querySelector('.modal-header-titles > h2');
              if (modalTitleH2 && cardData.title) {
                modalTitleH2.textContent = cardData.title;
              }
            }
          }
        });
      }

      // Footer Actions
      if (data.footer) {
        const emailBtn = document.querySelector('a[href^="mailto:"]');
        if (emailBtn) {
          const email = data.footer.email || 'carrommad@gmail.com';
          const subject = data.footer.email_title || data.footer.email_subject || "The feeling is mutual · Let's connect";
          const body = data.footer.email_content || data.footer.email_body || "Hi Carlos,\nI was told good taste is rare, yet here we are ✨\nLoved your portfolio, let's talk!";
          emailBtn.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          if (data.footer.email_btn_text) {
            const svg = emailBtn.querySelector('svg');
            emailBtn.innerHTML = (svg ? svg.outerHTML + ' ' : '') + data.footer.email_btn_text;
          }
        }

        if (data.footer.cv_pdf_file) {
          const cvBtn = document.querySelector('a[href*="CV.pdf"], a[href*="cool-cv.pdf"]');
          if (cvBtn) {
            cvBtn.href = data.footer.cv_pdf_file;
            if (data.footer.cv_pdf_text) {
              const svg = cvBtn.querySelector('svg');
              cvBtn.innerHTML = (svg ? svg.outerHTML + ' ' : '') + data.footer.cv_pdf_text;
            }
          }
        }
        if (data.footer.cover_letter_pdf_file) {
          const clBtn = document.querySelector('a[href*="Cover_Letter.pdf"], a[href*="cool-letter.pdf"]');
          if (clBtn) {
            clBtn.href = data.footer.cover_letter_pdf_file;
            if (data.footer.cover_letter_pdf_text) {
              const svg = clBtn.querySelector('svg');
              clBtn.innerHTML = (svg ? svg.outerHTML + ' ' : '') + data.footer.cover_letter_pdf_text;
            }
          }
        }
      }

      // Recalibrate dynamic boundaries if typography oscillator is active
      if (typeof measureBoundaries === 'function') {
        measureBoundaries();
      }
    }

    function initMainPageContent() {
      // 1. Immediately apply from embedded fallback JSON (instant first paint on both file:/// and http)
      const embeddedScript = document.getElementById('main-content-data');
      if (embeddedScript) {
        try {
          const fallbackData = JSON.parse(embeddedScript.textContent);
          applyMainContent(fallbackData);
        } catch (err) {
          // Static HTML DOM remains completely untouched
        }
      }

      // 2. When hosted on web (GitHub Pages / server), fetch live content.json with cache-busting
      if (location.protocol !== 'file:') {
        fetch('content.json?v=' + Date.now())
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data) applyMainContent(data);
          })
          .catch(() => {});
      }
    }

    initMainPageContent();

    // ---------------------------------------------------------
    // COVER LETTER CONTENT HYDRATION (from cover_letter.json / cover_letter.js)
    // ---------------------------------------------------------
    function applyCoverLetterContent(data) {
      if (!data) return;
      try {
        const recipEl = document.getElementById('letter-recipient');
        if (recipEl && data.recipient) {
          if (data.recipient.group) {
            recipEl.innerHTML = `<strong>To: ${data.recipient.to || ''}</strong><br>${data.recipient.group}<br>${data.recipient.institution || ''}`;
          } else {
            recipEl.innerHTML = `<strong>To: ${data.recipient.to || ''}</strong><br>${data.recipient.institution || ''}`;
          }
        }
        const subjEl = document.getElementById('letter-subject');
        if (subjEl && data.subject) {
          subjEl.textContent = data.subject;
        }
        const bodyEl = document.getElementById('letter-body');
        if (bodyEl) {
          let html = '';
          if (data.opening) html += `<p>${data.opening}</p>`;
          if (Array.isArray(data.paragraphs)) {
            data.paragraphs.forEach(p => html += `<p>${p}</p>`);
          }
          if (Array.isArray(data.projects) && data.projects.length) {
            html += '<ul class="letter-pillars-list">';
            const repoMap = {
              'MNusic': 'https://github.com/carrommad/mnusic',
              'Pipa-Music-Ball': 'https://github.com/carrommad/pipa-music-ball',
              'Expo-Curator': 'https://github.com/carrommad/expo-curator'
            };
            data.projects.forEach(proj => {
              let tagStr = '';
              if (proj.tag) {
                const url = proj.url || repoMap[proj.tag];
                if (url) {
                  tagStr = ` (<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:underline;">${proj.tag}</a>)`;
                } else {
                  tagStr = ` (${proj.tag})`;
                }
              }
              html += `<li><strong>${proj.name || ''}${tagStr} —</strong> ${proj.summary || ''}</li>`;
            });
            html += '</ul>';
          }
          if (Array.isArray(data.closing_paragraphs)) {
            data.closing_paragraphs.forEach(p => html += `<p>${p}</p>`);
          }

          bodyEl.innerHTML = html;
        }
        if (data.signoff) {
          const sName = document.getElementById('letter-signoff-name');
          if (sName && data.signoff.name) sName.textContent = data.signoff.name;
          const sGreet = document.getElementById('letter-signoff-greeting');
          if (sGreet && data.signoff.greeting) sGreet.textContent = data.signoff.greeting;
        }
      } catch (err) {
        console.warn('Cover letter hydration error:', err);
      }
    }

    function initCoverLetter() {
      if (window.COVER_LETTER_DATA) {
        applyCoverLetterContent(window.COVER_LETTER_DATA);
      }
      if (location.protocol !== 'file:') {
        fetch('cover_letter.json?v=' + Date.now())
          .then(r => r.ok ? r.json() : null)
          .then(d => { if (d) applyCoverLetterContent(d); })
          .catch(() => {});
      }
    }

    initCoverLetter();

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


    // ---------------------------------------------------------
    // MODAL HANDLERS
    // ---------------------------------------------------------
    function openSectionModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (modalId === 'modal-trajectory') {
          setTimeout(() => {
            initMap();
            if (map) {
              map.invalidateSize();
              resetMapView();
            }
          }, 180);
        }
      }
    }

    function closeSectionModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        if (modalId === 'modal-creative') {
          closeCinemaMode();
        }
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        const videos = modal.querySelectorAll('video');
        videos.forEach(v => {
          if (!v.paused) v.pause();
        });
      }
    }

    function handleOverlayClick(event, modalId) {
      if (event.target && event.target.id === modalId) {
        closeSectionModal(modalId);
      }
    }

    // ---------------------------------------------------------
    // CINEMA MODE LIGHTBOX (Centered Media Theater)
    // ---------------------------------------------------------
    var cinemaActiveType = null;

    function openCinemaMedia(type, src, title, caption, badgeText, poster) {
      const modal = document.getElementById('cinema-modal');
      const videoEl = document.getElementById('cinema-video');
      const imgEl = document.getElementById('cinema-image');
      const titleEl = document.getElementById('cinema-title-text');
      const badgeEl = document.getElementById('cinema-badge-text');
      const capEl = document.getElementById('cinema-cap-text');
      const inlineVideo = document.getElementById('inline-ae-video');

      if (!modal) return;

      cinemaActiveType = type;
      if (titleEl) titleEl.textContent = title || '';
      if (badgeEl) badgeEl.textContent = badgeText || (type === 'video' ? 'Motion Study' : 'Telemetry View');
      if (capEl) capEl.textContent = caption || '';

      document.body.style.overflow = 'hidden';

      if (type === 'video') {
        if (imgEl) {
          imgEl.style.display = 'none';
          imgEl.src = '';
        }
        if (videoEl) {
          videoEl.style.display = 'block';
          if (poster) videoEl.poster = poster;

          if (inlineVideo) {
            videoEl.currentTime = inlineVideo.currentTime || 0;
            if (!inlineVideo.paused) inlineVideo.pause();
          }

          modal.classList.add('active');
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.log('Cinema autoplay deferred:', err);
            });
          }
        }
      } else {
        if (videoEl) {
          if (!videoEl.paused) videoEl.pause();
          videoEl.style.display = 'none';
        }
        if (imgEl) {
          imgEl.style.display = 'block';
          imgEl.src = src;
          imgEl.alt = title || 'Cinema Media Preview';
        }
        modal.classList.add('active');
      }
    }

    function openCinemaVideo() {
      openCinemaMedia(
        'video',
        'assets/videos/graffiti.mp4',
        'After Effects Lab · Graffiti & Architectural Collage',
        'Graffiti mural art and architectural light geometry — Adobe After Effects motion study and kinetic overlays',
        'Adobe After Effects · Motion Study',
        'assets/photos/graffiti_poster.jpg'
      );
    }

    function closeCinemaMode() {
      const modal = document.getElementById('cinema-modal');
      const videoEl = document.getElementById('cinema-video');
      const inlineVideo = document.getElementById('inline-ae-video');

      if (modal) modal.classList.remove('active');

      if (videoEl && cinemaActiveType === 'video') {
        if (!videoEl.paused) videoEl.pause();
        if (inlineVideo) {
          inlineVideo.currentTime = videoEl.currentTime;
        }
      }

      cinemaActiveType = null;

      const remainingModals = document.querySelectorAll('.modal-overlay.active');
      if (remainingModals.length > 0) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }

    function handleCinemaOverlayClick(e) {
      if (e.target && (e.target.id === 'cinema-modal' || e.target.classList.contains('cinema-dialog-wrapper'))) {
        closeCinemaMode();
      }
    }

    function initCinemaVideoListeners() {
      const inlineVideo = document.getElementById('inline-ae-video');
      if (inlineVideo) {
        inlineVideo.addEventListener('play', () => {
          const modal = document.getElementById('cinema-modal');
          if (!modal || !modal.classList.contains('active')) {
            inlineVideo.pause();
            openCinemaVideo();
          }
        });
      }
    }

    initCinemaVideoListeners();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const cinemaModal = document.getElementById('cinema-modal');
        if (cinemaModal && cinemaModal.classList.contains('active')) {
          closeCinemaMode();
          e.stopPropagation();
          return;
        }
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(m => closeSectionModal(m.id));
      }
    });

    // ---------------------------------------------------------
    // LEAFLET MAP (High-Contrast B&W Monochrome)
    // ---------------------------------------------------------
    const citiesData = [
      {
        key: 'bonn',
        name: 'Bonn / Cologne (Germany)',
        coords: [50.7374, 7.0982],
        org: 'Fraunhofer FHR',
        role: 'Research Scientist · Cognitive Radar Optimization',
        period: '2018–2019'
      },
      {
        key: 'marseille',
        name: 'Marseille (France)',
        coords: [43.2965, 5.3698],
        org: 'Aix-Marseille University',
        role: 'MSc Plasma & Fusion Physics (1st of Class)',
        period: '2019–2020'
      },
      {
        key: 'seville',
        name: 'Seville (Spain)',
        coords: [37.3891, -5.9845],
        org: 'University of Seville',
        role: 'Double Degree (Physics & Mathematics, 3rd) · Plasma Researcher',
        period: '2013–2018 · 2020–2022'
      },
      {
        key: 'pamplona',
        name: 'Pamplona (Spain)',
        coords: [42.8125, -1.6458],
        org: 'CENER (Renewable Energy)',
        role: 'Data Scientist · Wind Turbine ML & Predictive Maintenance',
        period: '2022'
      },
      {
        key: 'barcelona',
        name: 'Barcelona (Spain)',
        coords: [41.3879, 2.1699],
        org: 'Barcelona Supercomputing Center (BSC)',
        role: 'HPC Scientific Software Engineer (Performance & Fusion)',
        period: '2023–Present'
      }
    ];

    const routeLegs = [
      { from: [50.7374, 7.0982], to: [43.2965, 5.3698], curveOffset: -1.0, label: 'Leg 1: Bonn → Marseille' },
      { from: [43.2965, 5.3698], to: [37.3891, -5.9845], curveOffset: -1.8, label: 'Leg 2: Marseille → Seville' },
      { from: [37.3891, -5.9845], to: [42.8125, -1.6458], curveOffset: 1.2, label: 'Leg 3: Seville → Pamplona' },
      { from: [42.8125, -1.6458], to: [41.3879, 2.1699], curveOffset: -0.5, label: 'Leg 4: Pamplona → Barcelona (BSC Current ★)' }
    ];

    function generateCurvePoints(start, end, offsetDegree = 2.0, numPoints = 35) {
      const p0 = start;
      const p2 = end;
      const midLat = (p0[0] + p2[0]) / 2;
      const midLng = (p0[1] + p2[1]) / 2;
      const dLat = p2[0] - p0[0];
      const dLng = p2[1] - p0[1];
      const ctrlLat = midLat - dLng * 0.18 * offsetDegree;
      const ctrlLng = midLng + dLat * 0.18 * offsetDegree;

      const points = [];
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const lat = (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * ctrlLat + t * t * p2[0];
        const lng = (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * ctrlLng + t * t * p2[1];
        points.push([lat, lng]);
      }
      return points;
    }

    let map;
    const markers = {};
    let mapInitialized = false;

    function initMap() {
      if (mapInitialized) {
        map.invalidateSize();
        return;
      }

      map = L.map('europe-leaflet-map', {
        attributionControl: false,
        center: [45.0, 3.5],
        zoom: 4,
        minZoom: 3,
        maxZoom: 10,
        scrollWheelZoom: false
      });

      // Esri Light Gray base layer, styled via CSS to pure monochrome
      L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
      }).addTo(map);

      // High-Precision Real Geographic Country Masks (All cities accurately encompassed)
      const countryHighlights = [
        {
          name: "Spain · España",
          color: "#FEB737", // Honey Amber
          coords: [
            [41.8806, -9.0348], [42.5928, -8.9844], [43.0266, -9.3929], [43.7483, -7.9782], [43.5679, -6.7545],
            [43.5742, -5.4119], [43.4034, -4.3478], [43.4559, -3.5175], [43.4228, -1.9014], [43.0340, -1.5028],
            [42.5795, 0.3380], [42.7957, 0.7016], [42.3434, 1.8268], [42.4730, 2.9860], [41.8921, 3.0395],
            [41.2261, 2.0918], [41.0147, 0.8105], [40.6783, 0.7213], [40.1239, 0.1067], [39.3100, -0.2787],
            [38.7385, 0.1113], [38.2924, -0.4671], [37.6424, -0.6834], [37.4431, -1.4384], [36.6741, -2.1465],
            [36.6589, -3.4158], [36.6778, -4.3689], [36.3247, -4.9952], [35.9468, -5.3772], [36.0298, -5.8664],
            [36.3677, -6.2367], [36.9429, -6.5202], [37.0978, -7.4537], [37.4289, -7.5371], [37.8039, -7.1665],
            [38.0758, -7.0293], [38.3731, -7.3741], [39.0301, -7.0980], [39.6296, -7.4986], [39.7119, -7.0666],
            [40.1845, -7.0264], [40.3309, -6.8640], [41.1111, -6.8511], [41.3818, -6.3891], [41.8834, -6.6686],
            [41.9183, -7.2513], [41.7921, -7.4225], [41.7909, -8.0132], [42.2805, -8.2639], [42.1347, -8.6719],
            [41.8806, -9.0348]
          ],
          tooltip: "<strong>Spain (España)</strong><br>Seville (BSc Double Degree) · Barcelona (BSC-CNS)"
        },
        {
          name: "France",
          color: "#7BB8C0", // Sea Breeze
          coords: [
            [50.3790, 3.5882], [49.9075, 4.2860], [49.9854, 4.7992], [49.5295, 5.6741], [49.4427, 5.8978],
            [49.4638, 6.1863], [49.2020, 6.6582], [49.0178, 8.0993], [48.3330, 7.5937], [47.6206, 7.4668],
            [47.4498, 7.1922], [47.5418, 6.7366], [47.2877, 6.7687], [46.7258, 6.0374], [46.2730, 6.0226],
            [46.4297, 6.5001], [45.9911, 6.8436], [45.7086, 6.8024], [45.3331, 7.0967], [45.0285, 6.7500],
            [44.2548, 7.0076], [44.1279, 7.5496], [43.6938, 7.4352], [43.1289, 6.5292], [43.3997, 4.5570],
            [43.0752, 3.1004], [42.4730, 2.9860], [42.3434, 1.8268], [42.7957, 0.7016], [42.5795, 0.3380],
            [43.0340, -1.5028], [43.4228, -1.9014], [44.0226, -1.3842], [46.0149, -1.1938], [47.0644, -2.2257],
            [47.5703, -2.9633], [47.9550, -4.4916], [48.6842, -4.5924], [48.9017, -3.2958], [48.6444, -1.6165],
            [49.7763, -1.9335], [49.3474, -0.9895], [50.1272, 1.3388], [50.9466, 1.6390], [51.1485, 2.5136],
            [50.7968, 2.6584], [50.7804, 3.1233], [50.3790, 3.5882]
          ],
          tooltip: "<strong>France</strong><br>Marseille (MSc Plasma & Fusion Physics, 1st of Class)"
        },
        {
          name: "Germany · Deutschland",
          color: "#543786", // Deep Indigo
          coords: [
            [54.9831, 9.9219], [54.5966, 9.9396], [54.3636, 10.9501], [54.0087, 10.9395], [54.1965, 11.9563],
            [54.4704, 12.5184], [54.0755, 13.6475], [53.7570, 14.1197], [53.2482, 14.3533], [52.9813, 14.0745],
            [52.6248, 14.4376], [52.0899, 14.6850], [51.7452, 14.6071], [51.1067, 15.0170], [51.0023, 14.5707],
            [51.1173, 14.3070], [50.9269, 14.0562], [50.7332, 13.3381], [50.4841, 12.9668], [50.2663, 12.2401],
            [49.9691, 12.4152], [49.5474, 12.5210], [49.3071, 13.0313], [48.8772, 13.5959], [48.4161, 13.2434],
            [48.2891, 12.8841], [47.6376, 13.0259], [47.4676, 12.9326], [47.6724, 12.6208], [47.7031, 12.1414],
            [47.5238, 11.4264], [47.5664, 10.5445], [47.3025, 10.4021], [47.5802, 9.8961], [47.5251, 9.5942],
            [47.8308, 8.5226], [47.6136, 8.3173], [47.6206, 7.4668], [48.3330, 7.5937], [49.0178, 8.0993],
            [49.2020, 6.6582], [49.4638, 6.1863], [49.9022, 6.2428], [50.1281, 6.0431], [50.8037, 6.1567],
            [51.8516, 5.9887], [51.8520, 6.5894], [52.2284, 6.8429], [53.1440, 7.0921], [53.4822, 6.9051],
            [53.6939, 7.1004], [53.7483, 7.9362], [53.5278, 8.1217], [54.0208, 8.8007], [54.3956, 8.5721],
            [54.9627, 8.5262], [54.8309, 9.2820], [54.9831, 9.9219]
          ],
          tooltip: "<strong>Germany (Deutschland)</strong><br>Bonn & Cologne (Fraunhofer FHR Cognitive Radar)"
        }
      ];

      countryHighlights.forEach(c => {
        L.polygon(c.coords, {
          color: c.color,
          weight: 2.0,
          opacity: 0.85,
          fillColor: c.color,
          fillOpacity: 0.22,
          className: 'country-highlight-poly'
        }).addTo(map).bindTooltip(c.tooltip, { sticky: true, className: 'country-tooltip' });
      });

      // Trajectory Curved Lines (Dynamic Accent)
      routeLegs.forEach((leg) => {
        const curvePoints = generateCurvePoints(leg.from, leg.to, leg.curveOffset);
        
        // Underline shadow
        L.polyline(curvePoints, {
          className: 'leaflet-route-shadow',
          color: 'rgba(0, 0, 0, 0.45)',
          weight: 4.5,
          opacity: 0.5
        }).addTo(map);

        // Core line
        L.polyline(curvePoints, {
          className: 'leaflet-route-core',
          weight: 2.5,
          opacity: 0.95,
          dashArray: '6, 6'
        }).addTo(map).bindTooltip(leg.label, { sticky: true, className: 'country-tooltip' });
      });

      // City Markers
      citiesData.forEach(city => {
        const markerIcon = L.divIcon({
          className: 'custom-map-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker(city.coords, { icon: markerIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="font-family:var(--font-mono); color:var(--bw-text);">
            <div style="font-size:15px; font-weight:800; margin-bottom:2px; color:var(--bw-text);">${city.name}</div>
            <div style="font-size:12.5px; font-weight:600; color:var(--bw-text-muted);">${city.org}</div>
            <div style="font-family:var(--font-mono); font-size:11.5px; margin-top:4px; font-weight:700; color:var(--bw-border);">${city.role}</div>
            <div style="font-size:11px; color:var(--bw-text-dim); margin-top:2px;">${city.period}</div>
          </div>
        `);

        marker.on('click', () => {
          highlightTimelineCard(city.key, false);
        });

        markers[city.key] = marker;
      });

      resetMapView();
      mapInitialized = true;
    }

    function resetMapView() {
      if (!map) return;
      map.setView([45.0, 3.5], 4);
    }

    function focusCity(cityKey, openPopup = false) {
      const city = citiesData.find(c => c.key === cityKey);
      if (!city || !map) return;

      // Smoothly scroll the modal scroll body to top so the map is fully visible
      const modalTrajectory = document.getElementById('modal-trajectory');
      const scrollBody = modalTrajectory ? modalTrajectory.querySelector('.modal-scroll-body') : null;
      if (scrollBody && scrollBody.scrollTop > 0) {
        scrollBody.scrollTo({ top: 0, behavior: 'smooth' });
      }

      map.flyTo(city.coords, 6.5, {
        animate: true,
        duration: 1.0
      });

      if (openPopup && markers[cityKey]) {
        setTimeout(() => {
          markers[cityKey].openPopup();
        }, 800);
      }
      highlightTimelineCard(cityKey, false);
    }

    function highlightTimelineCard(cityKey, shouldScroll = false) {
      document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('highlight'));
      const activeCards = document.querySelectorAll(`.timeline-card[data-city="${cityKey}"]`);
      activeCards.forEach(c => c.classList.add('highlight'));
      if (shouldScroll && activeCards.length > 0) {
        activeCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // ---------------------------------------------------------
    // AMBIENT PARTICLES (High-Contrast Monochrome Stardust)
    // ---------------------------------------------------------
    (function initMonochromeParticles() {
      const canvas = document.getElementById('ambient-particles-canvas');
      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const numParticles = Math.min(95, Math.max(50, Math.floor((width * height) / 12500)));
      const particles = [];

      class AmbientParticle {
        constructor() {
          this.reset(true);
        }

        reset(initial = false) {
          this.x = Math.random() * width;
          this.y = initial ? Math.random() * height : height + 20;
          this.radius = Math.random() * 2.2 + 1.8; // Visible celestial nodes
          this.vx = (Math.random() - 0.5) * 0.35;
          this.vy = -(Math.random() * 0.45 + 0.15);
          this.baseAlpha = Math.random() * 0.28 + 0.38;
          this.phase = Math.random() * Math.PI * 2;
          this.phaseSpeed = Math.random() * 0.015 + 0.005;
        }

        update() {
          this.phase += this.phaseSpeed;
          this.x += this.vx + Math.sin(this.phase) * 0.25;
          this.y += this.vy;
          if (this.y < -20 || this.x < -20 || this.x > width + 20) {
            this.reset(false);
          }
        }

        draw() {
          const [r, g, b] = getParticleRGB();
          const alpha = Math.min(0.85, Math.max(0.22, this.baseAlpha + Math.sin(this.phase) * 0.12));
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        }
      }

      function getParticleRGB() {
        const body = document.body;
        if (body.classList.contains('theme-cyber-yellow')) return [255, 230, 0];
        if (body.classList.contains('theme-touareg')) return [244, 162, 97];
        if (body.classList.contains('theme-black-silver')) return [226, 230, 240];
        if (body.classList.contains('theme-nordic-pine')) return [61, 220, 151];
        if (body.classList.contains('theme-marenostrum')) return [0, 240, 255];
        if (body.classList.contains('theme-crimson-linen')) return [201, 42, 42];
        if (body.classList.contains('theme-deep-blue')) return [254, 183, 55];
        if (body.classList.contains('theme-indigo-honey')) return [254, 183, 55];
        if (body.classList.contains('theme-lemon-meringue')) return [84, 55, 134];
        if (body.classList.contains('theme-editorial-day')) return [0, 0, 0];
        if (body.classList.contains('theme-night')) return [255, 255, 255];
        return [201, 42, 42]; // Default: Crimson
      }

      for (let i = 0; i < numParticles; i++) {
        particles.push(new AmbientParticle());
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);

        // Subtle geometric constellation connections
        const [r, g, b] = getParticleRGB();
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 135) {
              const linkAlpha = (1 - dist / 135) * 0.22;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${linkAlpha})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        particles.forEach(p => {
          p.update();
          p.draw();
        });

        requestAnimationFrame(animate);
      }

      animate();
    })();

    // ---------------------------------------------------------
    // GENERATIVE AMBIENT AUDIO SYNTHESIZER (MNusic Web Audio)
    // Dual-Engine Architectural Crossfader:
    // Day: Radiant, Joyful C Major 9 Lydian Chimes (sunlit, uplifting)
    // Night: Wistful, Nostalgic D Minor 9 Nocturne (melancholic, cinematic)
    // Seamless 3.6s organic crossfade between moods with zero pitch-bending
    // ---------------------------------------------------------
    var audioCtx = null;
    var isPlayingAudio = false;
    var sequenceTimer = null;
    var masterCompressor = null;
    var masterGain = null;
    var dayBus = null;
    var nightBus = null;
    var activeAudioNodes = [];

    // Musical Tunings (Hz)
    // Day: Radiant C Major 9 Lydian (uplifting, sunny, bright, crystalline)
    const DAY_PAD_FREQS = [130.81, 261.63, 329.63, 392.00, 493.88, 587.33, 659.25];
    const DAY_BELL_NOTES = [523.25, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];
    const DAY_SHIMMER_NOTES = [1046.50, 1318.51, 1567.98, 1760.00, 2093.00, 2637.02];

    // Night: Nostalgic D Minor 9 Nocturne (melancholic, celestial, starlight)
    const NIGHT_PAD_FREQS = [73.42, 146.83, 174.61, 220.00, 261.63, 329.63, 440.00];
    const NIGHT_BELL_NOTES = [293.66, 349.23, 440.00, 523.25, 587.33, 698.46, 880.00];
    const NIGHT_SHIMMER_NOTES = [880.00, 1046.50, 1174.66, 1396.91, 1760.00, 2093.00];

    function updateAudioMood(mode) {
      if (typeof isPlayingAudio === 'undefined' || !isPlayingAudio || !audioCtx || !dayBus || !nightBus) return;
      const now = audioCtx.currentTime;
      const FADE_DUR = 3.6; // 3.6s organic cinematic crossfade

      if (mode === 'day') {
        // Smoothly dissolve Night out, blossom Day in
        nightBus.gain.cancelScheduledValues(now);
        nightBus.gain.setValueAtTime(nightBus.gain.value, now);
        nightBus.gain.linearRampToValueAtTime(0.0, now + FADE_DUR);

        dayBus.gain.cancelScheduledValues(now);
        dayBus.gain.setValueAtTime(dayBus.gain.value, now);
        dayBus.gain.linearRampToValueAtTime(1.0, now + FADE_DUR);
      } else {
        // Smoothly dissolve Day out, descend into Night nostalgia
        dayBus.gain.cancelScheduledValues(now);
        dayBus.gain.setValueAtTime(dayBus.gain.value, now);
        dayBus.gain.linearRampToValueAtTime(0.0, now + FADE_DUR);

        nightBus.gain.cancelScheduledValues(now);
        nightBus.gain.setValueAtTime(nightBus.gain.value, now);
        nightBus.gain.linearRampToValueAtTime(1.0, now + FADE_DUR);
      }
    }

    function toggleMNusicAudio() {
      const btn = document.getElementById('btn-mnusic-audio');
      const label = document.getElementById('audio-btn-label');

      if (isPlayingAudio) {
        if (sequenceTimer) clearTimeout(sequenceTimer);
        sequenceTimer = null;
        isPlayingAudio = false;
        btn.classList.remove('playing');
        label.textContent = 'Ambient Audio';

        if (masterGain && audioCtx) {
          const now = audioCtx.currentTime;
          masterGain.gain.cancelScheduledValues(now);
          masterGain.gain.setValueAtTime(masterGain.gain.value, now);
          masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
          setTimeout(() => {
            activeAudioNodes.forEach(n => {
              try {
                if (n.stop) n.stop();
                if (n.disconnect) n.disconnect();
              } catch(e) {}
            });
            activeAudioNodes = [];
            dayBus = null;
            nightBus = null;
            masterGain = null;
            masterCompressor = null;
          }, 400);
        }
        return;
      }

      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isPlayingAudio = true;
      btn.classList.add('playing');
      label.textContent = 'Playing Audio';

      const now = audioCtx.currentTime;

      // Master Output Chain
      masterCompressor = audioCtx.createDynamicsCompressor();
      masterCompressor.threshold.setValueAtTime(-18, now);
      masterCompressor.knee.setValueAtTime(25, now);
      masterCompressor.ratio.setValueAtTime(8, now);
      masterCompressor.attack.setValueAtTime(0.005, now);
      masterCompressor.release.setValueAtTime(0.2, now);

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.22, now + 1.5);

      masterCompressor.connect(masterGain);
      masterGain.connect(audioCtx.destination);
      activeAudioNodes.push(masterCompressor, masterGain);

      // Dedicated Day & Night Crossfade Buses
      dayBus = audioCtx.createGain();
      nightBus = audioCtx.createGain();
      const isDay = (currentThemeMode === 'day');

      dayBus.gain.setValueAtTime(isDay ? 1.0 : 0.0, now);
      nightBus.gain.setValueAtTime(isDay ? 0.0 : 1.0, now);

      dayBus.connect(masterCompressor);
      nightBus.connect(masterCompressor);
      activeAudioNodes.push(dayBus, nightBus);

      // --- ETHEREAL SHIMMER SPACE DELAY BUS ---
      // Adds a dreamy, floating stereo feedback echo for shiny notes
      const delayNode = audioCtx.createDelay();
      delayNode.delayTime.setValueAtTime(0.38, now);
      const delayFeedback = audioCtx.createGain();
      delayFeedback.gain.setValueAtTime(0.42, now);
      const delayFilter = audioCtx.createBiquadFilter();
      delayFilter.type = 'highpass';
      delayFilter.frequency.setValueAtTime(600, now); // Keep delay sparkly and clean

      delayNode.connect(delayFeedback);
      delayFeedback.connect(delayFilter);
      delayFilter.connect(delayNode);
      delayNode.connect(masterCompressor);
      activeAudioNodes.push(delayNode, delayFeedback, delayFilter);

      // --- 1. DAY ENGINE: Radiant C Major 9 Lydian ---
      const dayFilter = audioCtx.createBiquadFilter();
      dayFilter.type = 'lowpass';
      dayFilter.frequency.setValueAtTime(750, now); // Softer, warmer background ceiling matching night mode
      dayFilter.Q.setValueAtTime(0.7, now);
      dayFilter.connect(dayBus);
      activeAudioNodes.push(dayFilter);

      const dayLfo = audioCtx.createOscillator();
      const dayLfoGain = audioCtx.createGain();
      dayLfo.frequency.setValueAtTime(0.06, now);
      dayLfoGain.gain.setValueAtTime(140, now);
      dayLfo.connect(dayLfoGain);
      dayLfoGain.connect(dayFilter.frequency);
      dayLfo.start(now);
      activeAudioNodes.push(dayLfo, dayLfoGain);

      const dayDrone = audioCtx.createOscillator();
      const dayDroneGain = audioCtx.createGain();
      dayDrone.type = 'sine';
      dayDrone.frequency.setValueAtTime(65.41, now); // C2
      dayDroneGain.gain.setValueAtTime(0.14, now); // Reduced from 0.26 to match night drone subtlety
      dayDrone.connect(dayDroneGain);
      dayDroneGain.connect(dayFilter);
      dayDrone.start(now);
      activeAudioNodes.push(dayDrone, dayDroneGain);

      // Day Chord Voices (Major 9 Shimmer)
      DAY_PAD_FREQS.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = 'sine'; // pure and soft like night mode instead of buzzy triangle
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((idx - 3) * 2.8, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.022, now + 2.0 + idx * 0.3); // Reduced from 0.045 to 0.022

        osc.connect(g);
        g.connect(dayFilter);
        osc.start(now);
        activeAudioNodes.push(osc, g);
      });

      // --- 2. NIGHT ENGINE: Nostalgic D Minor 9 Nocturne ---
      const nightFilter = audioCtx.createBiquadFilter();
      nightFilter.type = 'lowpass';
      nightFilter.frequency.setValueAtTime(520, now);
      nightFilter.Q.setValueAtTime(1.2, now);
      nightFilter.connect(nightBus);
      activeAudioNodes.push(nightFilter);

      const nightLfo = audioCtx.createOscillator();
      const nightLfoGain = audioCtx.createGain();
      nightLfo.frequency.setValueAtTime(0.045, now);
      nightLfoGain.gain.setValueAtTime(95, now);
      nightLfo.connect(nightLfoGain);
      nightLfoGain.connect(nightFilter.frequency);
      nightLfo.start(now);
      activeAudioNodes.push(nightLfo, nightLfoGain);

      const nightDrone = audioCtx.createOscillator();
      const nightDroneGain = audioCtx.createGain();
      nightDrone.type = 'sine';
      nightDrone.frequency.setValueAtTime(73.42, now); // D2
      nightDroneGain.gain.setValueAtTime(0.32, now);
      nightDrone.connect(nightDroneGain);
      nightDroneGain.connect(nightFilter);
      nightDrone.start(now);
      activeAudioNodes.push(nightDrone, nightDroneGain);

      // Night Chord Voices
      NIGHT_PAD_FREQS.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((idx - 3) * 2.5, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.048, now + 2.5 + idx * 0.4);

        osc.connect(g);
        g.connect(nightFilter);
        osc.start(now);
        activeAudioNodes.push(osc, g);
      });

      // --- 3. CRYSTALLINE SHINING SPARKLES & TELEMETRY BELLS ---
      function playShinySparkle() {
        if (!isPlayingAudio || !audioCtx) return;
        const isDayMode = (currentThemeMode === 'day');
        const sparkTime = audioCtx.currentTime;
        const shimmerNotes = isDayMode ? DAY_SHIMMER_NOTES : NIGHT_SHIMMER_NOTES;

        // Cascade of 2 to 3 micro-tuned shiny glass glints
        const glintCount = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < glintCount; i++) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const filter = audioCtx.createBiquadFilter();
          const t = sparkTime + (i * 0.12);

          const freq = shimmerNotes[Math.floor(Math.random() * shimmerNotes.length)];
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          // Subtle pitch glissando / shimmer twinkle
          osc.frequency.exponentialRampToValueAtTime(freq * 1.025, t + 0.5);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(freq, t);
          filter.Q.setValueAtTime(8.0, t); // Piercing, pure crystalline glass resonance

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.042, t + 0.025);
          gain.gain.exponentialRampToValueAtTime(0.00001, t + 1.6);

          let panner = null;
          if (audioCtx.createStereoPanner) {
            panner = audioCtx.createStereoPanner();
            panner.pan.setValueAtTime((Math.random() * 1.4) - 0.7, t);
          }

          osc.connect(filter);
          filter.connect(gain);
          if (panner) {
            gain.connect(panner);
            panner.connect(delayNode); // Feed directly into shimmer space delay
            panner.connect(isDayMode ? dayBus : nightBus);
          } else {
            gain.connect(delayNode);
            gain.connect(isDayMode ? dayBus : nightBus);
          }

          osc.start(t);
          osc.stop(t + 1.8);
        }
      }

      function playTelemetryPing() {
        if (!isPlayingAudio || !audioCtx) return;
        const isDayMode = (currentThemeMode === 'day');
        const notes = isDayMode ? DAY_BELL_NOTES : NIGHT_BELL_NOTES;
        const noteFreq = notes[Math.floor(Math.random() * notes.length)];
        const pingTime = audioCtx.currentTime;

        const pingOsc = audioCtx.createOscillator();
        const pingGain = audioCtx.createGain();
        const pingFilter = audioCtx.createBiquadFilter();

        // Dual-harmonic chime for pure glockenspiel sparkle
        const pingHarmonic = audioCtx.createOscillator();
        const harmGain = audioCtx.createGain();

        let panner = null;
        if (audioCtx.createStereoPanner) {
          panner = audioCtx.createStereoPanner();
          const panVal = (Math.random() * 0.8) - 0.4;
          panner.pan.setValueAtTime(panVal, pingTime);
        }

        if (isDayMode) {
          // DAY: Crystalline, radiant glass bell with upper octave glint
          pingOsc.type = 'triangle';
          pingOsc.frequency.setValueAtTime(noteFreq, pingTime);
          pingFilter.type = 'bandpass';
          pingFilter.frequency.setValueAtTime(noteFreq, pingTime);
          pingFilter.Q.setValueAtTime(4.2, pingTime);

          pingHarmonic.type = 'sine';
          pingHarmonic.frequency.setValueAtTime(noteFreq * 2.0, pingTime); // Octave sparkle overtone

          pingGain.gain.setValueAtTime(0.0001, pingTime);
          pingGain.gain.exponentialRampToValueAtTime(0.085, pingTime + 0.035);
          pingGain.gain.exponentialRampToValueAtTime(0.0001, pingTime + 2.4);

          harmGain.gain.setValueAtTime(0.0001, pingTime);
          harmGain.gain.exponentialRampToValueAtTime(0.028, pingTime + 0.02);
          harmGain.gain.exponentialRampToValueAtTime(0.0001, pingTime + 1.2);

          pingOsc.connect(pingFilter);
          pingHarmonic.connect(harmGain);
          harmGain.connect(pingFilter);
          pingFilter.connect(pingGain);

          if (panner) {
            pingGain.connect(panner);
            panner.connect(delayNode);
            panner.connect(dayBus);
          } else {
            pingGain.connect(delayNode);
            pingGain.connect(dayBus);
          }

          pingOsc.start(pingTime);
          pingOsc.stop(pingTime + 2.5);
          pingHarmonic.start(pingTime);
          pingHarmonic.stop(pingTime + 1.4);
        } else {
          // NIGHT: Nostalgic, starry vibraphone & celestial Rhodes
          pingOsc.type = 'sine';
          pingOsc.frequency.setValueAtTime(noteFreq, pingTime);
          pingFilter.type = 'lowpass';
          pingFilter.frequency.setValueAtTime(680, pingTime);
          pingFilter.Q.setValueAtTime(1.5, pingTime);

          pingGain.gain.setValueAtTime(0.0001, pingTime);
          pingGain.gain.exponentialRampToValueAtTime(0.075, pingTime + 0.06);
          pingGain.gain.exponentialRampToValueAtTime(0.0001, pingTime + 3.2);

          pingOsc.connect(pingFilter);
          pingFilter.connect(pingGain);

          if (panner) {
            pingGain.connect(panner);
            panner.connect(delayNode);
            panner.connect(nightBus);
          } else {
            pingGain.connect(delayNode);
            pingGain.connect(nightBus);
          }

          pingOsc.start(pingTime);
          pingOsc.stop(pingTime + 3.3);
        }

        // Randomly accompany primary bell with a glittering cascade
        if (Math.random() > 0.35) {
          setTimeout(playShinySparkle, Math.random() * 600 + 150);
        }
      }

      function scheduleNextPing() {
        if (!isPlayingAudio) return;
        playTelemetryPing();
        const isDayMode = (currentThemeMode === 'day');
        const nextDelay = isDayMode ? (Math.random() * 1600 + 1800) : (Math.random() * 2200 + 2600);
        sequenceTimer = setTimeout(scheduleNextPing, nextDelay);
      }

      // Initial bloom: pad opens, then shiny bells begin
      sequenceTimer = setTimeout(scheduleNextPing, 1400);
    }

    // =========================================================
    // FAST SCROLL-DRIVEN STATUS DOCK FADE-OUT
    // Fades out the status badge across a short vertical scroll distance
    // =========================================================
    function initStatusDockScrollFade() {
      const dock = document.querySelector('.top-status-dock');
      if (!dock) return;

      function updateFade() {
        const y = Math.max(
          window.scrollY || 0,
          window.pageYOffset || 0,
          document.documentElement.scrollTop || 0,
          document.body.scrollTop || 0
        );
        // Fast fade-out: disappears smoothly upon the slightest scroll down
        if (y > 6) {
          dock.classList.add('is-scrolled');
          dock.style.opacity = '0';
          dock.style.pointerEvents = 'none';
          dock.style.transform = 'translateY(-8px)';
        } else {
          dock.classList.remove('is-scrolled');
          dock.style.opacity = '1';
          dock.style.pointerEvents = '';
          dock.style.transform = 'translateY(0)';
        }
      }

      window.addEventListener('scroll', updateFade, { passive: true, capture: true });
      document.addEventListener('scroll', updateFade, { passive: true, capture: true });
      if (document.body) {
        document.body.addEventListener('scroll', updateFade, { passive: true, capture: true });
      }
      window.addEventListener('wheel', updateFade, { passive: true });
      window.addEventListener('touchmove', updateFade, { passive: true });

      updateFade();
    }

    // =========================================================
    // KINETIC TYPOGRAPHY SCROLL AWAKENING
    // Letters sit completely at rest on page load.
    // Awakens only once the user performs their first scroll down.
    // =========================================================
    function initTypographyScrollAwakening() {
      let awakened = false;

      function awaken() {
        if (awakened) return;
        awakened = true;
        document.body.classList.add('typography-awakened');
        window.removeEventListener('scroll', checkAwaken, { capture: true });
        document.removeEventListener('scroll', checkAwaken, { capture: true });
        window.removeEventListener('wheel', checkWheel);
        window.removeEventListener('touchmove', checkTouch);
      }

      function checkAwaken() {
        const y = Math.max(
          window.scrollY || 0,
          window.pageYOffset || 0,
          document.documentElement.scrollTop || 0,
          document.body.scrollTop || 0
        );
        if (y > 4) {
          awaken();
        }
      }

      function checkWheel(e) {
        if (e.deltaY > 0) {
          awaken();
        }
      }

      function checkTouch() {
        checkAwaken();
      }

      const initialY = Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );
      if (initialY > 4) {
        awaken();
      } else {
        window.addEventListener('scroll', checkAwaken, { passive: true, capture: true });
        document.addEventListener('scroll', checkAwaken, { passive: true, capture: true });
        window.addEventListener('wheel', checkWheel, { passive: true });
        window.addEventListener('touchmove', checkTouch, { passive: true });
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        checkInitialModalHash();
        initStatusDockScrollFade();
        initTypographyScrollAwakening();
        initCinemaVideoListeners();
      });
    } else {
      checkInitialModalHash();
      initStatusDockScrollFade();
      initTypographyScrollAwakening();
      initCinemaVideoListeners();
    }

    function checkInitialModalHash() {
      if (window.location.hash) {
        const h = window.location.hash.substring(1);
        if (document.getElementById(h)) {
          setTimeout(() => openSectionModal(h), 80);
        }
      }
    }
    window.addEventListener('hashchange', checkInitialModalHash);
