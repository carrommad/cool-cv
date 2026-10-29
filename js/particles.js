/**
 * ==============================================================================
 * COOL-CV AMBIENT STARDUST PARTICLES ENGINE
 * ==============================================================================
 * Purpose: Lightweight canvas simulation drawing subtle floating stardust
 *          particles across the background.
 * ==============================================================================
 */

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

