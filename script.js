// Door Open Interaction
const doorContainer = document.getElementById('doorContainer');

doorContainer.addEventListener('click', function() {
    // Add open class to trigger CSS 3D transforms
    this.classList.add('door-open');
    
    // Allow scrolling by adding class to body/container
    document.body.classList.add('doors-opened');

    // Remove the door container after animation completes to avoid blocking pointer events
    setTimeout(() => {
        this.style.pointerEvents = 'none';
    }, 2500);
});

// Intersection Observer for Slide Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // Trigger when 30% of slide is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find the .slide-content inside the intersecting .slide
            const content = entry.target.querySelector('.slide-content');
            if (content) {
                content.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all slides
document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
});


// Particle System for Gold Shimmer Effect
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width, height, particles;

function initParticles() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];

    // Create particles
    const numParticles = Math.min(window.innerWidth / 10, 80); // Responsive particle count
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#D4AF37' : '#FFFDD0', // Gold or Cream
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * -1 - 0.5, // Float upwards
            opacity: Math.random() * 0.5 + 0.3
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Reset particle to bottom if it goes off top
        if (p.y + p.radius < 0) {
            p.y = height + p.radius;
            p.x = Math.random() * width;
        }
        
        // Wrap horizontally
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
    });

    requestAnimationFrame(drawParticles);
}

// Handle Resize
window.addEventListener('resize', () => {
    initParticles();
});

// Start Particle System
initParticles();
drawParticles();
