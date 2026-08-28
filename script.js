// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = prefersReducedMotion ? 0 : (index % 5) * 100;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.reviews-stats');
if (statsEl) counterObserver.observe(statsEl);

function animateCounters() {
  statNumbers.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = prefersReducedMotion ? 0 : 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ===== TESTIMONIAL CAROUSEL =====
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;
let autoplayInterval;
let cards = [];

if (track) {
  cards = track.querySelectorAll('.testimonial-card');
}

// Create dots
if (dotsContainer && cards.length) {
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  if (!cards.length) return;
  currentSlide = index;
  if (currentSlide >= cards.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = cards.length - 1;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function updateDots() {
  const dots = dotsContainer?.querySelectorAll('.carousel-dot');
  dots?.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

prevBtn?.addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  resetAutoplay();
});

nextBtn?.addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  resetAutoplay();
});

function startAutoplay() {
  autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

if (cards.length) startAutoplay();

// Pause on hover
const carousel = document.querySelector('.testimonial-carousel');
carousel?.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
carousel?.addEventListener('mouseleave', startAutoplay);

// Touch support
let touchStartX = 0;
carousel?.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  clearInterval(autoplayInterval);
}, { passive: true });

carousel?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
  }
  startAutoplay();
}, { passive: true });

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentGalleryIndex = 0;
const galleryImages = [];

galleryItems.forEach((item, i) => {
  const img = item.querySelector('img');
  if (img) {
    galleryImages.push(img.src);
    item.addEventListener('click', () => {
      currentGalleryIndex = i;
      openLightbox(img.src, img.alt);
    });
  }
});

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox?.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.querySelector('.lightbox-prev')?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentGalleryIndex];
});

document.querySelector('.lightbox-next')?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentGalleryIndex];
});

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
  }
  if (e.key === 'ArrowRight') {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
  }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const service = document.getElementById('service')?.value || '';
  const message = document.getElementById('message')?.value || '';

  const text = `Hello Calisa Beauty Salon!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message)}`;

  window.open(`https://wa.me/96876090204?text=${text}`, '_blank');
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});
