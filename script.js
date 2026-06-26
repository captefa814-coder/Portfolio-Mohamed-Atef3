/* ============================================
   MOHAMED ATEF PORTFOLIO — JAVASCRIPT
   Interactions, Animations & Carousel
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Elements ---------- */
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTop');
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  const particlesContainer = document.getElementById('particles');
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const sections = document.querySelectorAll('.section');

  /* ---------- Page Loading Animation ---------- */
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 1800);
  });

  /* ---------- Custom Cursor ---------- */
  if (window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-card, .service-card, .contact-card, .project-card');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursorOutline.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursorOutline.classList.remove('hover');
      });
    });
  }

  /* ---------- Floating Background Particles ---------- */
  function createParticles() {
    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  /* ---------- Mobile Navigation Toggle ---------- */
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Smooth Scrolling & Active Nav ---------- */
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ---------- Navbar Scroll Effect ---------- */
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Scroll to Top ---------- */
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Intersection Observer — Section Reveal ---------- */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Testimonial Carousel ---------- */
  const testimonials = carouselTrack.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  let carouselInterval;

  function createDots() {
    testimonials.forEach(function (_, index) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        goToSlide(index);
        resetCarouselInterval();
      });
      carouselDots.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach(function (dot, index) {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    updateDots();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    goToSlide(currentSlide);
  }

  function startCarouselInterval() {
    carouselInterval = setInterval(nextSlide, 4000);
  }

  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
  }

  createDots();
  startCarouselInterval();

  /* Pause carousel on hover */
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', function () {
      clearInterval(carouselInterval);
    });
    carouselWrapper.addEventListener('mouseleave', function () {
      startCarouselInterval();
    });
  }

  /* ---------- Initialize on Load ---------- */
  handleScroll();

})();
