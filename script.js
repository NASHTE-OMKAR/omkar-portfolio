document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loading-screen');
  const welcomePopup = document.getElementById('welcome-popup');
  const closeWelcomeBtn = document.getElementById('close-welcome');

  // Hide loading screen after 2.5 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
  }, 2500);

  // Show welcome popup once
  if (!localStorage.getItem('visited')) {
    setTimeout(() => {
      welcomePopup.classList.add('show');
      localStorage.setItem('visited', 'true');
    }, 3000);
  }

  closeWelcomeBtn?.addEventListener('click', () => {
    welcomePopup.classList.remove('show');
  });

  // === Core Logic ===
  let activeSection = 'home';
  let isRotating = false;

  // Dark mode
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  document.getElementById('darkModeToggle').innerText = '☀️';

  document.getElementById('darkModeToggle').addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.innerText = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Particles
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

  // Typewriter
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
  setTimeout(type, 1000);

  // Splash cursor
  const createSplashCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('splash-cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      const dot = document.createElement('div');
      dot.classList.add('splash-dot');
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.width = `${Math.random() * 10 + 5}px`;
      dot.style.height = dot.style.width;
      dot.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      cursor.appendChild(dot);
      setTimeout(() => {
        if (dot.parentNode) cursor.removeChild(dot);
      }, 1000);
    });
  };
  createSplashCursor();

  // Section navigation WITHOUT laser
  function handleSectionClick(sectionId) {
    if (isRotating || activeSection === sectionId) return;
    isRotating = true;

    const mainContent = document.getElementById('main-content');
    gsap.to(mainContent, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${sectionId}-section`).classList.add('active');
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');
        gsap.to(mainContent, {
          opacity: 1,
          duration: 0.4,
          onComplete: () => {
            isRotating = false;
            activeSection = sectionId;
          }
        });
      }
    });
  }

  // Event listeners
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.getAttribute('data-section');
      handleSectionClick(sectionId);
    });
  });

  document.getElementById('home-btn').addEventListener('click', () => handleSectionClick('home'));
  document.getElementById('view-projects-btn').addEventListener('click', () => handleSectionClick('projects'));
  document.getElementById('get-in-touch-btn').addEventListener('click', () => handleSectionClick('contact'));

  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent successfully! (Demo)');
    this.reset();
  });
});
