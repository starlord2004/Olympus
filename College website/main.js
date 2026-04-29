/* ═══════════════════════════════════════════════════════════
   OLYMPUS UNIVERSITY — MAIN JAVASCRIPT
   Global: Loader, Navbar, Dark Mode, Counters, Cursor, AOS
   ═══════════════════════════════════════════════════════════ */

// ── LOADER SCREEN ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
    document.body.style.overflow = 'hidden';
  }

  initNavbar();
  initDarkMode();
  initCounters();
  initCustomCursor();
  initBackToTop();
  initMobileNav();
  initAccordions();
  initTabs();
  initScrollAnimations();
  initFormValidation();
  initToasts();
});

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  const onScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── DARK MODE TOGGLE ──────────────────────────────────────
function initDarkMode() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('olympus-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('olympus-theme', 'light');
      toggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('olympus-theme', 'dark');
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}

// ── ANIMATED COUNTERS ─────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

// ── CUSTOM CURSOR ─────────────────────────────────────────
function initCustomCursor() {
  if (window.innerWidth < 1024) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  const animate = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animate);
  };
  animate();

  const hoverEls = document.querySelectorAll('a, button, .card, .dept-card, .btn, input, textarea');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ── BACK TO TOP ───────────────────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── MOBILE NAV ────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ── ACCORDIONS ────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close siblings
      item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ── TABS ──────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const parent = tabGroup.parentElement;
    const contents = parent.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const targetEl = parent.querySelector(`#${target}`);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  });
}

// ── SCROLL ANIMATIONS (AOS-like) ─────────────────────────
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Style for animated state
  const style = document.createElement('style');
  style.textContent = '.aos-animate { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

// ── FORM VALIDATION ───────────────────────────────────────
function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(input => {
        const errorEl = input.parentElement.querySelector('.error-msg');
        if (!input.value.trim()) {
          input.classList.add('error');
          if (errorEl) errorEl.style.display = 'block';
          valid = false;
        } else {
          input.classList.remove('error');
          if (errorEl) errorEl.style.display = 'none';
        }
      });

      // Email validation
      form.querySelectorAll('input[type="email"]').forEach(email => {
        if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          email.classList.add('error');
          valid = false;
        }
      });

      if (valid) {
        form.reset();
        showToast(form.getAttribute('data-success') || 'Submitted successfully!');
      }
    });
  });

  // Remove error on input
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = input.parentElement.querySelector('.error-msg');
      if (errorEl) errorEl.style.display = 'none';
    });
  });
}

// ── TOAST NOTIFICATIONS ──────────────────────────────────
function initToasts() {
  if (!document.querySelector('.toast')) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'globalToast';
    document.body.appendChild(toast);
  }
}

function showToast(message, duration = 3000) {
  const toast = document.getElementById('globalToast') || document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── COUNTDOWN TIMER ───────────────────────────────────────
function initCountdown(targetDate) {
  const elements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  if (!elements.days) return;

  const update = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      Object.values(elements).forEach(el => el.textContent = '0');
      return;
    }

    elements.days.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    elements.hours.textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    elements.minutes.textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    elements.seconds.textContent = Math.floor((diff % (1000 * 60)) / 1000);
  };

  update();
  setInterval(update, 1000);
}

// ── SEARCH/FILTER ─────────────────────────────────────────
function initFilter(inputSelector, itemSelector, filterAttribute) {
  const input = document.querySelector(inputSelector);
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    document.querySelectorAll(itemSelector).forEach(item => {
      const text = item.getAttribute(filterAttribute) || item.textContent;
      item.style.display = text.toLowerCase().includes(query) ? '' : 'none';
    });
  });
}

function initFilterPills(pillSelector, itemSelector, dataAttr) {
  document.querySelectorAll(pillSelector).forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll(pillSelector).forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      document.querySelectorAll(itemSelector).forEach(item => {
        if (filter === 'all' || item.getAttribute(dataAttr) === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ── PAGINATION ────────────────────────────────────────────
function initPagination(itemSelector, perPage = 10) {
  const items = document.querySelectorAll(itemSelector);
  const totalPages = Math.ceil(items.length / perPage);
  let currentPage = 1;

  function showPage(page) {
    items.forEach((item, i) => {
      item.style.display = (i >= (page - 1) * perPage && i < page * perPage) ? '' : 'none';
    });
    currentPage = page;
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    const container = document.querySelector('.pagination');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `btn btn-sm ${i === currentPage ? 'btn-gold' : 'btn-outline'}`;
      btn.style.margin = '0 4px';
      btn.addEventListener('click', () => showPage(i));
      container.appendChild(btn);
    }
  }

  if (items.length > 0) showPage(1);
}

// ── ACTIVE NAV LINK ───────────────────────────────────────
(function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── MODALS ────────────────────────────────────────────────
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Close modals when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});
