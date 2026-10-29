/**
 * ==============================================================================
 * COOL-CV MASTER APPLICATION ORCHESTRATOR
 * ==============================================================================
 * Loads and initializes application lifecycle:
 *   - checkInitialModalHash()
 *   - initStatusDockScrollFade()
 *   - initTypographyScrollAwakening()
 *   - initCinemaVideoListeners()
 * ==============================================================================
 */

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
