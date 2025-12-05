// Advanced Portfolio Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Loading animation
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loading);
  
  setTimeout(() => {
    loading.classList.add('fade-out');
    setTimeout(() => loading.remove(), 500);
  }, 1000);
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('active');
        menuBtn.innerHTML = '☰';
      }
    });
    
    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.innerHTML = '☰';
      });
    });
  }
  
  // Smooth scrolling with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
  
  // Form submission with animation
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      const form = document.getElementById('contactForm');
      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;
      
      // Reset styles
      inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      });
      
      // Validate
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
          input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
          isValid = false;
        }
      });
      
      if (!isValid) {
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => this.style.animation = '', 500);
        return;
      }
      
      // Show loading state
      const originalHTML = this.innerHTML;
      this.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        </svg>
        Sending...
      `;
      this.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        this.innerHTML = '✓ Sent!';
        this.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        form.reset();
        
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.style.background = '';
          this.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.card, .project-card').forEach(el => {
    observer.observe(el);
  });
  
  // Add floating shapes with more advanced effects
  const shapesContainer = document.querySelector('.floating-shapes');
  if (shapesContainer) {
    for (let i = 0; i < 5; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 300 + 100;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * -30;
      
      Object.assign(shape.style, {
        width: `${size}px`,
        height: `${size}px`,
        top: `${y}%`,
        left: `${x}%`,
        background: `radial-gradient(circle, 
          rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 241, 0.1),
          transparent 70%)`,
        position: 'absolute',
        borderRadius: '50%',
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        filter: 'blur(40px)',
        zIndex: '-1'
      });
      
      shapesContainer.appendChild(shape);
    }
  }
});