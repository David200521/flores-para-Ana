// --- LÓGICA DE INTERACCIÓN Y FLOR ---
const sunflower = document.getElementById('sunflower');
const flowerContainer = document.getElementById('flowerContainer');
const tapHint = document.getElementById('tapHint');
let isBloomed = false;

function bloomFlower() {
  if (!isBloomed) {
    sunflower.classList.remove('unbloomed');
    sunflower.classList.add('bloomed');
    tapHint.innerText = "✨ ¡Floreció para ti!";
    isBloomed = true;

    // Lanzar Confeti Amarillo y Dorado
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#fef08a']
    });
  } else {
    // Efecto secundario al tocar nuevamente
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#ffffff']
    });
  }
}

flowerContainer.addEventListener('click', bloomFlower);

// Florecer automáticamente tras 1.2 segundos
setTimeout(() => {
  bloomFlower();
}, 1200);

// --- CARTA DESPLEGABLE ---
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letterContent');

envelope.addEventListener('click', () => {
  letterContent.classList.toggle('open');
  if (letterContent.classList.contains('open')) {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#fbbf24', '#f59e0b']
    });
  }
});

// --- SINTETIZADOR DE MÚSICA DE FONDO (Web Audio API) ---
let audioCtx = null;
let isPlaying = false;
let timerId = null;

const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.getElementById('audioIcon');
const audioLabel = document.getElementById('audioLabel');

// Melodía suave e inspiradora (Frecuencias en Hz)
const notes = [
  261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
  349.23, 440.00, 523.25, // F4, A4, C5
  392.00, 493.88, 587.33, // G4, B4, D5
  329.63, 392.00, 493.88  // E4, G4, B4
];

function playMelody() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  let noteIndex = 0;

  timerId = setInterval(() => {
    if (!isPlaying) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(notes[noteIndex], audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);

    noteIndex = (noteIndex + 1) % notes.length;
  }, 400);
}

audioToggle.addEventListener('click', () => {
  if (!isPlaying) {
    isPlaying = true;
    audioIcon.innerText = "⏸";
    audioLabel.innerText = "Pausar música";
    playMelody();
  } else {
    isPlaying = false;
    audioIcon.innerText = "▶";
    audioLabel.innerText = "Música de primavera";
    if (timerId) clearInterval(timerId);
  }
});

// --- ANIMACIÓN DE PARTÍCULAS / PÉTALOS FLOTANTES ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const particleColors = ['rgba(251, 191, 36, 0.6)', 'rgba(245, 158, 11, 0.5)', 'rgba(254, 240, 138, 0.7)'];

for (let i = 0; i < 25; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 4 + 2,
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
    speedY: Math.random() * 0.8 + 0.3,
    speedX: Math.random() * 0.4 - 0.2,
    opacity: Math.random()
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();