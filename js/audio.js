/**
 * ==============================================================================
 * COOL-CV GENERATIVE AMBIENT AUDIO SYNTHESIZER (MNusic)
 * ==============================================================================
 * Purpose: Web Audio API dual-engine crossfader producing joyful C Major 9 chimes
 *          in Day mode and contemplative dark chords in Night mode.
 * ==============================================================================
 */

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
