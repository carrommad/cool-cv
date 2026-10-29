/**
 * ==============================================================================
 * COOL-CV CINEMA MODE LIGHTBOX (MEDIA THEATER)
 * ==============================================================================
 * Purpose: Opens high-res video and audio visualizer previews in a centered
 *          monochrome theater overlay.
 * ==============================================================================
 */

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

