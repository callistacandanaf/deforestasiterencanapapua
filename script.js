  // =====================
  // CUSTOM CURSOR
  // =====================
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  // Smooth trail animation
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.transform = `translate(${trailX - 18}px, ${trailY - 18}px)`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Cursor scale on hover
  document.querySelectorAll('a, button, [class*="btn"], .cause-card, .dampak-card, .stat-card, .map-zone, .ba-divider').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.8)';
      cursorTrail.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursorTrail.style.opacity = '1';
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorTrail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorTrail.style.opacity = '1';
  });

  // =====================
  // LOADER
  // =====================
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 2400);
  });

  // =====================
  // ACTIVE NAV LINK
  // =====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // =====================
  // NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // =====================
  // HAMBURGER MENU
  // =====================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  function closeMenu() {
    mobileMenu.classList.remove('open');
  }

  // =====================
  // SCROLL REVEAL
  // =====================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // =====================
  // FOREST PARTICLES
  // =====================
  const particleContainer = document.getElementById('forestParticles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    particleContainer.appendChild(p);
  }

  // =====================
  // STAT NUMBER COUNTER
  // =====================
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const isDecimal = el.dataset.decimal === 'true';
        let start = 0;
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('id-ID')) + (suffix ? ' ' + suffix : '');
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  // =====================
  // PROGRESS BARS
  // =====================
  const progressFills = document.querySelectorAll('.progress-fill[data-width]');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  progressFills.forEach(el => progressObserver.observe(el));

  // =====================
  // BEFORE/AFTER SLIDER
  // =====================
  const baSlider = document.getElementById('baSlider');
  const baClip = document.getElementById('baClip');
  const baDivider = document.getElementById('baDivider');
  let isDragging = false;

  function setSliderPos(x) {
    const rect = baSlider.getBoundingClientRect();
    let pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
    baClip.style.width = pct + '%';
    baDivider.style.left = pct + '%';
  }

  baDivider.addEventListener('mousedown', () => isDragging = true);
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('mousemove', (e) => { if (isDragging) setSliderPos(e.clientX); });

  baDivider.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); }, { passive: false });
  document.addEventListener('touchend', () => isDragging = false);
  document.addEventListener('touchmove', (e) => { if (isDragging) setSliderPos(e.touches[0].clientX); }, { passive: true });

  // =====================
  // LIVE COUNTER
  // =====================
  const liveCounter = document.getElementById('liveCounter');
  const startTime = Date.now();
  const ratePerMs = 50 / 60000; // ~50 ha per menit, terasa bergerak cepat
  function updateCounter() {
    const elapsed = Date.now() - startTime;
    const lost = elapsed * ratePerMs;
    liveCounter.textContent = lost.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    requestAnimationFrame(updateCounter);
  }
  updateCounter();

  // =====================
  // CTA CANVAS PARTICLES
  // =====================
  const ctaCanvas = document.getElementById('ctaCanvas');
  if (ctaCanvas) {
    const ctx = ctaCanvas.getContext('2d');
    let ctaParticles = [];
    function resizeCanvas() {
      ctaCanvas.width = ctaCanvas.offsetWidth;
      ctaCanvas.height = ctaCanvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    for (let i = 0; i < 60; i++) {
      ctaParticles.push({
        x: Math.random() * ctaCanvas.width,
        y: Math.random() * ctaCanvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    function drawCta() {
      ctx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
      ctaParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(63,186,107,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = ctaCanvas.height + 10; p.x = Math.random() * ctaCanvas.width; }
      });
      requestAnimationFrame(drawCta);
    }
    drawCta();
  }


  // =====================
  // BN BAR ANIMATION
  // =====================
  const bnBars = document.querySelectorAll('.bn-bar[data-width]');
  const bnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        bnObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bnBars.forEach(el => bnObserver.observe(el));


  // =====================
  // MASYARAKAT PHOTO FADE-IN
  // =====================
  const masyarakatPhoto = document.querySelector('.masyarakat-photo');
  if (masyarakatPhoto) {
    if (masyarakatPhoto.complete) {
      masyarakatPhoto.classList.add('loaded');
    } else {
      masyarakatPhoto.addEventListener('load', () => {
        masyarakatPhoto.classList.add('loaded');
      });
    }
  }
