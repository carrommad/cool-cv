/**
 * ==============================================================================
 * COOL-CV CONTENT LOADER & HYDRATION ENGINE
 * ==============================================================================
 * Purpose: Populates the DOM dynamically from embedded config or content.json /
 *          cover_letter.js data objects.
 * ==============================================================================
 */

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

