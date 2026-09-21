document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto al hacer clic en el lirio
  const flowerContainer = document.getElementById('flower-container');
  const statusBadge = document.getElementById('status-badge');

  flowerContainer.addEventListener('click', () => {
    // Lanzar confeti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffeb3b', '#fbc02d', '#fff176', '#81c784']
    });

    statusBadge.textContent = "✨ ¡Floreció con todo su esplendor!";
    statusBadge.style.background = "#ffee58";
  });

  // 2. Control de Audio
  const btnMusic = document.getElementById('btn-music');
  const bgAudio = document.getElementById('bg-audio');
  let isPlaying = false;

  btnMusic.addEventListener('click', () => {
    if (!isPlaying) {
      bgAudio.play().then(() => {
        isPlaying = true;
        btnMusic.querySelector('span').textContent = "⏸ Pausar música";
        btnMusic.style.background = "#ffee58";
      }).catch(err => console.log("Audio blocked:", err));
    } else {
      bgAudio.pause();
      isPlaying = false;
      btnMusic.querySelector('span').textContent = "▶ Reproducir: I Wanna Be Yours 🎵";
      btnMusic.style.background = "#fff59d";
    }
  });

  // 3. Modal de Mensaje
  const btnModal = document.getElementById('btn-modal');
  const closeModal = document.getElementById('close-modal');
  const modal = document.getElementById('modal');

  btnModal.addEventListener('click', () => {
    modal.classList.add('active');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ffeb3b', '#fbc02d', '#ffffff']
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 4. Fondo de Partículas Suaves
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = Array.from({ length: 25 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    color: ['rgba(251, 192, 45, 0.4)', 'rgba(255, 235, 59, 0.4)', 'rgba(255, 255, 255, 0.6)'][Math.floor(Math.random() * 3)],
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * -0.5 - 0.2
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) p.y = canvas.height;
      if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});