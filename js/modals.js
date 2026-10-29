/**
 * ==============================================================================
 * COOL-CV CHAPTER MODAL HANDLER
 * ==============================================================================
 * Purpose: Manages section modal open/close transitions, scroll locking, and URL
 *          hash routing (e.g. #modal-trajectory).
 * ==============================================================================
 */

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

