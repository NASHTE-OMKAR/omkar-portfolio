document.addEventListener('DOMContentLoaded', function() {
  // State
  let activeSection = 'home';
  let isRotating = false;

  // Initialize dark mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('darkModeToggle').innerText = savedTheme === 'dark' ? '☀️' : '🌙';

  // Dark mode toggle
  document.getElementById('darkModeToggle').addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.innerText = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Create particles
  const particlesContainer = document.getElementById('particles-container');
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const speed = Math.random() * 0.5 + 0.1;
    const delay = Math.random() * 2;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${3 + speed}s`;
    particlesContainer.appendChild(particle);
  }

  // GSAP Typewriter Effect
  gsap.registerPlugin(ScrollTrigger);

  const typewriterText = document.getElementById('typewriter-text');
  const text = "Omkar Nashte";
  let index = 0;

  function type() {
    if (index < text.length) {
      typewriterText.textContent = text.slice(0, index + 1);
      index++;
      setTimeout(type, 150);
    }
  }

  // Start typewriter after page loads
  setTimeout(type, 1000);

  // GSAP Page Transitions
  function handleSectionClick(sectionId) {
    if (isRotating || activeSection === sectionId) return;

    isRotating = true;
    const mainContent = document.getElementById('main-content');

    // Fade out current section
    gsap.to(mainContent, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        // Hide all sections
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        // Show target
        document.getElementById(`${sectionId}-section`).classList.add('active');
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');
        // Fade in
        gsap.to(mainContent, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            isRotating = false;
            activeSection = sectionId;
          }
        });
      }
    });
  }

  // Nav item click
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      handleSectionClick(sectionId);
    });
  });

  // Home button
  document.getElementById('home-btn').addEventListener('click', () => handleSectionClick('home'));

  // Action buttons
  document.getElementById('view-projects-btn').addEventListener('click', () => handleSectionClick('projects'));
  document.getElementById('get-in-touch-btn').addEventListener('click', () => handleSectionClick('contact'));

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully! (Demo)');
    this.reset();
  });
});