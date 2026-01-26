/**
 * Contact Page JavaScript
 * Handles scroll progress, counter animations, form submission, and component loading
 */

// Scroll Progress Functionality
function initScrollProgress() {
    const scrollBar = document.getElementById('scroll-bar');
    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollBar.style.width = scrollPercent + '%';
        });
    }
}

// Counter Animation Functionality
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current) + '+';
                }, 16);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Form Submission Handler
function initContactForm() {
    const contactForm = document.getElementById('contactInfoForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const existingMsg = this.querySelector('.alert');
            if (existingMsg) existingMsg.remove();
            
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success text-center mt-3';
            successMsg.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
            
            this.appendChild(successMsg);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                successMsg.remove();
            }, 3000);
        });
    }
}

// Component Loader Function
async function loadComponent(id, path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`${path} (${res.status})`);
        const html = await res.text();

        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
        else console.warn(`Missing container #${id}`);
    } catch (err) {
        console.error(`Component load failed: ${path}`, err);
    }
}

// Animation Initialization
function initializeAnimations() {
    // Simple fade-in animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Trigger animations on page load for elements in viewport
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Initialize All Contact Page Functions
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize scroll progress
    initScrollProgress();
    
    // Initialize counter animations
    animateCounters();
    
    // Initialize form handling
    initContactForm();
    
    // Load components (navigation, footer, right panel)
    const components = [
        ['navigation-component', 'components/navigation/navigation.html'],
        ['footer-component', 'components/footer/footer.html'],
        ['right-panel-component', 'components/right-panel/right-panel.html']
    ];

    await Promise.all(components.map(([id, path]) => loadComponent(id, path)));
    
    // Initialize animations after components are loaded
    initializeAnimations();
    
    console.log('✅ Contact page initialized successfully');
});

// Export for potential use in other scripts
window.ContactPage = {
    initScrollProgress,
    animateCounters,
    initContactForm,
    loadComponent,
    initializeAnimations
};

