// login.js - Logic for Animated Portals
document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selection ---
  const container = document.getElementById('loginContainer');
  const themeToggle = document.getElementById('themeToggle');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailField = document.getElementById('emailField');
  const passwordField = document.getElementById('passwordField');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const togglePasswordIcon = togglePasswordBtn.querySelector('i');
  const loginForm = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');
  const emailError = document.getElementById('emailError');
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');

  let isDarkMode = true;

  // --- Theme Management ---
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      container.classList.remove('light');
      container.classList.add('dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      container.classList.remove('dark');
      container.classList.add('light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    // Re-init particles on theme change
    initParticles();
  }
  themeToggle.addEventListener('click', toggleTheme);

  // Initialize theme based on user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!prefersDark) {
    toggleTheme(); // Switch to light if that's preferred
  }

  // --- Input Floating Label Logic ---
  function updateInputState(input, field, errorEl) {
    if (input.value.length > 0) {
      field.classList.add('has-value');
    } else {
      field.classList.remove('has-value');
    }

    // Email validation
    if (input.id === 'email' && input.value.length > 0) {
      const re = /^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;
      const isValid = re.test(String(input.value).toLowerCase());
      if (!isValid) {
        field.classList.add('invalid');
        errorEl.style.display = 'block';
        submitBtn.disabled = true;
      } else {
        field.classList.remove('invalid');
        errorEl.style.display = 'none';
        checkGlobalValidity();
      }
    } else if (input.id === 'email') {
      field.classList.remove('invalid');
      errorEl.style.display = 'none';
      checkGlobalValidity();
    }
  }

  function checkGlobalValidity() {
    if (emailInput.value && passwordInput.value && !emailField.classList.contains('invalid')) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  [emailInput, passwordInput].forEach(inp => {
    inp.addEventListener('focus', () => inp.parentElement.classList.add('active'));
    inp.addEventListener('blur', () => inp.parentElement.classList.remove('active'));
    inp.addEventListener('input', () => {
      updateInputState(inp, inp.parentElement, inp.id === 'email' ? emailError : null);
      checkGlobalValidity();
    });
  });

  // --- Password Toggle ---
  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordIcon.classList.remove('fa-eye');
      togglePasswordIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      togglePasswordIcon.classList.remove('fa-eye-slash');
      togglePasswordIcon.classList.add('fa-eye');
    }
  });

  // --- Form Submit ---
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginForm.classList.add('form-success');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    
    // Simulate API Call
    setTimeout(() => {
      loginForm.classList.remove('form-success');
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Success';
      submitBtn.style.background = '#10B981';
      submitBtn.style.color = 'white';
      
      // Redirect after 1 second (mock)
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }, 1500);
  });

  // --- Particle Engine ---
  let particles = [];
  
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', setCanvasSize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = isDarkMode 
        ? `rgba(255, 255, 255, ${Math.random() * 0.2})` 
        : `rgba(11, 19, 64, ${Math.random() * 0.2})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    setCanvasSize();
    particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  // Start Animation
  initParticles();
  animateParticles();
});
