// Page Navigation System
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update active navigation link
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('onclick')?.includes(`showPage('${pageId}')`)) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
    
    // Trigger fade-in animations for the visible page
    setTimeout(() => {
        document.querySelectorAll(`#${pageId} .fade-in`).forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100); // Staggered animation
        });
    }, 100);
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    // Store theme preference
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('dusk-theme', isLightMode ? 'light' : 'dark');
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('dusk-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

// Cursor Trail Effect
function setupCursorTrail() {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    // Hide cursor dot when cursor leaves the window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
    });
}

// Particle System
function setupParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Add unique animation
        const duration = Math.random() * 30 + 10;
        const xMove = Math.random() * 50 - 25;
        const yMove = Math.random() * 50 - 25;
        
        particle.style.animation = `float-${i} ${duration}s infinite ease-in-out`;
        
        // Create keyframes dynamically
        const keyframes = document.createElement('style');
        keyframes.innerHTML = `
            @keyframes float-${i} {
                0%, 100% { 
                    transform: translate(0, 0); 
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                50% { 
                    transform: translate(${xMove}px, ${yMove}px); 
                    opacity: ${Math.random() * 0.3 + 0.2};
                }
            }
        `;
        document.head.appendChild(keyframes);
        
        container.appendChild(particle);
    }
}

// Scroll Animation Observer
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Resume Download Function
function downloadResume() {
    // Replace with your actual resume URL
    const resumeUrl = 'https://yourdomain.com/DUSK_Resume.pdf';
    
    // Create temporary link
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'DUSK_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // If resume is not ready yet, show message
    if (resumeUrl.includes('yourdomain.com')) {
        alert('Resume will be available soon. Please check back later or contact me directly.');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadThemePreference();
    setupCursorTrail();
    setupParticles();
    setupScrollAnimation();
    
    // Show initial page animations
    setTimeout(() => {
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            const id = activePage.id;
            document.querySelectorAll(`#${id} .fade-in`).forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        }
    }, 100);
    
    // Update resume button
    const resumeButton = document.querySelector('.resume-section .btn');
    if (resumeButton) {
        resumeButton.onclick = downloadResume;
    }
});

// Background music toggle
function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
