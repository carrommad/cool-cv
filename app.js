/**
 * Carlos Romero Portfolio & CV Interactive Engine
 * Features:
 * 1. Background particle/data flow simulation
 * 2. MNusic: Web Audio API Cluster Sonification & Real-Time Waveform
 * 3. Pipa-Music-Ball: Drag & Flick Physics & Kinetic Bio-Tone Synthesizer
 * 4. Topological Cluster Matrix Canvas Animation
 * 5. Data Democratization Radar Chart
 * 6. Modal open/close & print handlers
 */

// ==========================================
// 1. Ambient Background Particle Matrix
// ==========================================
const ambientCanvas = document.getElementById('ambient-canvas');
const aCtx = ambientCanvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 45;

function resizeAmbient() {
  ambientCanvas.width = window.innerWidth;
  ambientCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeAmbient);
resizeAmbient();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * ambientCanvas.width;
    this.y = Math.random() * ambientCanvas.height;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.radius = Math.random() * 1.8 + 0.8;
    this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(6, 182, 212, ';
    this.alpha = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > ambientCanvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > ambientCanvas.height) this.vy *= -1;
  }
  draw() {
    aCtx.beginPath();
    aCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    aCtx.fillStyle = this.color + this.alpha + ')';
    aCtx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateAmbient() {
  aCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
  
  // Draw connecting data lines
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        aCtx.beginPath();
        aCtx.moveTo(particles[i].x, particles[i].y);
        aCtx.lineTo(particles[j].x, particles[j].y);
        aCtx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 130)})`;
        aCtx.lineWidth = 0.8;
        aCtx.stroke();
      }
    }
  }
  requestAnimationFrame(animateAmbient);
}
animateAmbient();

// ==========================================
// 2. MNusic: Cluster Audio Sonification Engine
// ==========================================
const waveformDisplay = document.getElementById('waveform-display');
const toggleAudioBtn = document.getElementById('toggle-audio-btn');
const clusterLoadSlider = document.getElementById('cluster-cluster-load');
const mnusicStatusText = document.getElementById('mnusic-status-text');

const BAR_COUNT = 32;
const bars = [];

// Initialize waveform bars
for (let i = 0; i < BAR_COUNT; i++) {
  const bar = document.createElement('div');
  bar.className = 'synth-bar';
  bar.style.height = `${Math.random() * 30 + 10}%`;
  waveformDisplay.appendChild(bar);
  bars.push(bar);
}

let audioCtx = null;
let isAudioPlaying = false;
let oscillators = [];
let gainNode = null;
let filterNode = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    
    // Lowpass filter for warm ambient drone
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(650, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  }
}

function startClusterSonification() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Harmonic chord representing supercomputing parallel racks (C Minor 9th chord)
  const baseFreqs = [65.41, 130.81, 155.56, 196.00, 293.66, 392.00]; // C2, C3, Eb3, G3, D4, G4
  oscillators = baseFreqs.map((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Individual subtle detuning for cluster beating effect
    osc.detune.setValueAtTime((Math.random() - 0.5) * 12, audioCtx.currentTime);
    
    oscGain.gain.setValueAtTime(0.25 / baseFreqs.length, audioCtx.currentTime);
    osc.connect(oscGain);
    oscGain.connect(filterNode);
    osc.start();
    return { osc, oscGain };
  });

  isAudioPlaying = true;
  toggleAudioBtn.classList.add('playing');
  toggleAudioBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
    <span>Mute Cluster Stream</span>
  `;
  mnusicStatusText.textContent = "Live Stream Active (MN5 Node Synthesis)";
  mnusicStatusText.style.color = "var(--accent-pink)";
}

function stopClusterSonification() {
  if (oscillators.length) {
    oscillators.forEach(item => {
      try { item.osc.stop(); } catch(e){}
    });
    oscillators = [];
  }
  isAudioPlaying = false;
  toggleAudioBtn.classList.remove('playing');
  toggleAudioBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
    <span>Listen to Cluster (Web Audio API)</span>
  `;
  mnusicStatusText.textContent = "Synthesizer Idle (Click to Stream)";
  mnusicStatusText.style.color = "var(--accent-cyan)";
}

toggleAudioBtn.addEventListener('click', () => {
  if (isAudioPlaying) {
    stopClusterSonification();
  } else {
    startClusterSonification();
  }
});

// Update waveform dynamic movement
let tick = 0;
function updateSynthWaveform() {
  tick += 0.05;
  const loadVal = parseFloat(clusterLoadSlider.value);
  
  if (filterNode && isAudioPlaying) {
    // Modify filter cutoff based on cluster load
    const targetFreq = 300 + (loadVal / 100) * 1600;
    filterNode.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1);
  }

  bars.forEach((bar, i) => {
    let amp;
    if (isAudioPlaying) {
      amp = (Math.sin(tick * 2 + i * 0.3) * 0.4 + 0.6) * (loadVal * 0.85);
    } else {
      amp = (Math.sin(tick + i * 0.2) * 0.2 + 0.3) * 35;
    }
    bar.style.height = `${Math.min(100, Math.max(10, amp))}%`;
  });
  requestAnimationFrame(updateSynthWaveform);
}
updateSynthWaveform();

// ==========================================
// 3. Pipa-Music-Ball: Kinetic Simulation & Bio-Audio
// ==========================================
const stage = document.getElementById('kinetic-stage');
const ball = document.getElementById('interactive-ball');
const ballAccEl = document.getElementById('ball-acc');
const ballPitchEl = document.getElementById('ball-pitch');
const ballStateEl = document.getElementById('ball-state');

let ballX = 140, ballY = 40;
let ballVx = 0, ballVy = 0;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
let ballOsc = null;
let ballGain = null;

function triggerBallPluck(freq, intensity) {
  try {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    
    // Pentatonic scale frequency calculation
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.95, audioCtx.currentTime + 0.2);

    g.gain.setValueAtTime(Math.min(0.2, intensity * 0.05), audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    osc.connect(g);
    g.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.36);
  } catch(e) {}
}

stage.addEventListener('mousedown', (e) => {
  const rect = stage.getBoundingClientRect();
  isDragging = true;
  lastMouseX = e.clientX - rect.left;
  lastMouseY = e.clientY - rect.top;
  ballStateEl.textContent = "Feline Strike Detected!";
  ballStateEl.style.color = "var(--accent-pink)";
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const rect = stage.getBoundingClientRect();
  const mouseX = Math.max(22, Math.min(rect.width - 22, e.clientX - rect.left));
  const mouseY = Math.max(22, Math.min(rect.height - 22, e.clientY - rect.top));

  ballVx = (mouseX - lastMouseX) * 0.6;
  ballVy = (mouseY - lastMouseY) * 0.6;

  ballX = mouseX;
  ballY = mouseY;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    ballStateEl.textContent = "Spinning & Resonating";
    ballStateEl.style.color = "var(--accent-green)";
  }
});

// Kinetic Physics Loop
const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
function animateBallPhysics() {
  const rect = stage.getBoundingClientRect();
  const width = rect.width || 300;
  const height = rect.height || 120;

  if (!isDragging) {
    ballX += ballVx;
    ballY += ballVy;

    // Boundary bounces
    let bounced = false;
    if (ballX <= 22) {
      ballX = 22;
      ballVx = -ballVx * 0.8;
      bounced = true;
    } else if (ballX >= width - 22) {
      ballX = width - 22;
      ballVx = -ballVx * 0.8;
      bounced = true;
    }

    if (ballY <= 22) {
      ballY = 22;
      ballVy = -ballVy * 0.8;
      bounced = true;
    } else if (ballY >= height - 22) {
      ballY = height - 22;
      ballVy = -ballVy * 0.8;
      bounced = true;
    }

    // Friction
    ballVx *= 0.96;
    ballVy *= 0.96;

    const speed = Math.sqrt(ballVx * ballVx + ballVy * ballVy);
    if (bounced && speed > 1.5) {
      const noteIdx = Math.floor(Math.random() * pentatonicScale.length);
      triggerBallPluck(pentatonicScale[noteIdx], speed);
      ballPitchEl.textContent = `${Math.round(pentatonicScale[noteIdx])} Hz`;
    }

    if (speed < 0.2) {
      ballStateEl.textContent = "Playful Idling";
      ballStateEl.style.color = "var(--accent-cyan)";
    }
  }

  const speed = Math.sqrt(ballVx * ballVx + ballVy * ballVy);
  ballAccEl.textContent = `${(speed * 1.8).toFixed(1)} m/s²`;

  ball.style.transform = `translate3d(${ballX - width / 2}px, ${ballY - height / 2}px, 0)`;

  requestAnimationFrame(animateBallPhysics);
}
animateBallPhysics();

// ==========================================
// 4. Supercomputing Node Matrix Canvas Viz
// ==========================================
const clusterCanvas = document.getElementById('cluster-canvas');
const cCtx = clusterCanvas.getContext('2d');
let clusterMode = 'power';

const toggleBtns = document.querySelectorAll('.toggle-btn');
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    clusterMode = btn.dataset.mode;
  });
});

let cTime = 0;
function renderClusterTopology() {
  cTime += 0.02;
  const w = clusterCanvas.width = clusterCanvas.offsetWidth;
  const h = clusterCanvas.height = clusterCanvas.offsetHeight;

  cCtx.clearRect(0, 0, w, h);

  const cols = 12;
  const rows = 5;
  const cellW = w / (cols + 1);
  const cellH = h / (rows + 1);

  // Draw node interconnect paths
  cCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  cCtx.lineWidth = 1;
  for (let r = 1; r <= rows; r++) {
    cCtx.beginPath();
    cCtx.moveTo(cellW, r * cellH);
    cCtx.lineTo(cols * cellW, r * cellH);
    cCtx.stroke();
  }

  // Draw dynamic wave flux across compute partition
  cCtx.beginPath();
  cCtx.moveTo(cellW, cellH * 3);
  for (let c = 1; c <= cols; c++) {
    const x = c * cellW;
    const offset = Math.sin(cTime * 3 + c * 0.6) * 25;
    const y = cellH * 3 + offset;
    cCtx.lineTo(x, y);
  }
  cCtx.strokeStyle = clusterMode === 'power' ? 'rgba(255, 42, 133, 0.6)' : (clusterMode === 'flops' ? 'rgba(6, 182, 212, 0.6)' : 'rgba(245, 158, 11, 0.6)');
  cCtx.lineWidth = 2.5;
  cCtx.stroke();

  // Render individual HPC nodes
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const x = c * cellW;
      const y = r * cellH;
      
      const val = (Math.sin(cTime * 2 + c * 0.4 + r * 0.8) + 1) / 2;
      
      let nodeColor;
      if (clusterMode === 'power') {
        nodeColor = `rgba(255, 42, 133, ${0.25 + val * 0.75})`;
      } else if (clusterMode === 'flops') {
        nodeColor = `rgba(6, 182, 212, ${0.25 + val * 0.75})`;
      } else {
        nodeColor = `rgba(245, 158, 11, ${0.25 + val * 0.75})`;
      }

      cCtx.beginPath();
      cCtx.arc(x, y, 3 + val * 3.5, 0, Math.PI * 2);
      cCtx.fillStyle = nodeColor;
      cCtx.shadowColor = nodeColor;
      cCtx.shadowBlur = val > 0.7 ? 12 : 2;
      cCtx.fill();
      cCtx.shadowBlur = 0;
    }
  }

  requestAnimationFrame(renderClusterTopology);
}
renderClusterTopology();

// ==========================================
// 5. Data Democratization Radar Canvas
// ==========================================
const radarCanvas = document.getElementById('radar-canvas');
const rCtx = radarCanvas.getContext('2d');

const radarSkills = [
  { label: 'Creative Sonification', val: 0.94 },
  { label: 'HPC & Complex Data', val: 0.90 },
  { label: 'Physical Computing', val: 0.92 },
  { label: 'Science Storytelling', val: 0.96 },
  { label: 'LLM & Prototyping', val: 0.98 },
  { label: 'Democratization', val: 0.92 },
  { label: 'Expo Curation', val: 0.93 },
  { label: 'Photo & Motion (AE)', val: 0.88 }
];

function drawRadarChart() {
  const w = radarCanvas.width = radarCanvas.offsetWidth;
  const h = radarCanvas.height = radarCanvas.offsetHeight;
  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(centerX, centerY) - 38;
  const total = radarSkills.length;

  rCtx.clearRect(0, 0, w, h);

  // Background radar webs
  const levels = 4;
  for (let l = 1; l <= levels; l++) {
    rCtx.beginPath();
    const lvlRadius = (radius / levels) * l;
    for (let i = 0; i < total; i++) {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * lvlRadius;
      const y = centerY + Math.sin(angle) * lvlRadius;
      if (i === 0) rCtx.moveTo(x, y);
      else rCtx.lineTo(x, y);
    }
    rCtx.closePath();
    rCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    rCtx.stroke();
  }

  // Draw axes
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    rCtx.beginPath();
    rCtx.moveTo(centerX, centerY);
    rCtx.lineTo(x, y);
    rCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    rCtx.stroke();

    // Labels
    const labelX = centerX + Math.cos(angle) * (radius + 22);
    const labelY = centerY + Math.sin(angle) * (radius + 22);
    rCtx.fillStyle = '#94a3b8';
    rCtx.font = '10px "JetBrains Mono", monospace';
    rCtx.textAlign = 'center';
    rCtx.textBaseline = 'middle';
    rCtx.fillText(radarSkills[i].label, labelX, labelY);
  }

  // Filled polygon for Carlos's competencies
  rCtx.beginPath();
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const dist = radius * radarSkills[i].val;
    const x = centerX + Math.cos(angle) * dist;
    const y = centerY + Math.sin(angle) * dist;
    if (i === 0) rCtx.moveTo(x, y);
    else rCtx.lineTo(x, y);
  }
  rCtx.closePath();

  // Gradient fill
  const radGrad = rCtx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
  radGrad.addColorStop(0, 'rgba(139, 92, 246, 0.45)');
  radGrad.addColorStop(1, 'rgba(6, 182, 212, 0.25)');
  rCtx.fillStyle = radGrad;
  rCtx.fill();

  rCtx.strokeStyle = 'rgba(255, 42, 133, 0.85)';
  rCtx.lineWidth = 2;
  rCtx.stroke();

  // Points on vertices
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const dist = radius * radarSkills[i].val;
    const x = centerX + Math.cos(angle) * dist;
    const y = centerY + Math.sin(angle) * dist;
    rCtx.beginPath();
    rCtx.arc(x, y, 4, 0, Math.PI * 2);
    rCtx.fillStyle = '#fff';
    rCtx.shadowColor = 'rgba(255, 42, 133, 0.9)';
    rCtx.shadowBlur = 8;
    rCtx.fill();
    rCtx.shadowBlur = 0;
  }
}
window.addEventListener('resize', drawRadarChart);
drawRadarChart();

// ==========================================
// 6. Cover Letter Modal & Print Controllers
// ==========================================
const coverLetterModal = document.getElementById('cover-letter-modal');
const coverLetterBtn = document.getElementById('cover-letter-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

function openCoverLetter() {
  coverLetterModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCoverLetter() {
  coverLetterModal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

if (coverLetterBtn) coverLetterBtn.addEventListener('click', openCoverLetter);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeCoverLetter);

coverLetterModal.addEventListener('click', (e) => {
  if (e.target === coverLetterModal) {
    closeCoverLetter();
  }
});

// ==========================================
// 8. DDS Theme Switcher Logic
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isMuseum = document.body.classList.toggle('dds-museum-theme');
    if (isMuseum) {
      themeIcon.textContent = "⚡";
      themeText.textContent = "Dark Neon Theme";
    } else {
      themeIcon.textContent = "🏛️";
      themeText.textContent = "DDS Museum Theme";
    }
  });
}

// ==========================================
// 9. Participatory Poll (Domestic Data Streamers)
// ==========================================
const choiceBtns = document.querySelectorAll('.choice-btn');
const pVotesCount = document.getElementById('visitor-votes-count');
const pResponseHint = document.getElementById('p-response-hint');

let currentVotes = 418;
let hasVoted = false;

choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (hasVoted) return;
    hasVoted = true;
    choiceBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    currentVotes++;
    if (pVotesCount) pVotesCount.textContent = currentVotes;
    
    // Play gentle confirmation pitch
    try {
      initAudio();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
      g.gain.setValueAtTime(0.08, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(g);
      g.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.31);
    } catch(e) {}

    if (pResponseHint) {
      pResponseHint.textContent = "Ballot recorded in real-time. Thank you for co-creating this data story!";
      pResponseHint.style.color = "var(--accent-pink)";
    }
  });
});
