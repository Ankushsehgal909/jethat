// Cybersecurity Section Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on data attributes
                if (element.hasAttribute('data-aos')) {
                    element.classList.add('aos-animate');
                    
                    // Add staggered delays for multiple elements
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) translateX(0) scale(1)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Set initial transforms based on animation type
        const animationType = el.getAttribute('data-aos');
        switch(animationType) {
            case 'fade-up':
                el.style.transform = 'translateY(50px)';
                break;
            case 'fade-left':
                el.style.transform = 'translateX(100px)';
                break;
            case 'zoom-in':
                el.style.transform = 'scale(0.8)';
                break;
            default:
                el.style.transform = 'translateY(30px)';
        }
        
        observer.observe(el);
    });

    // Enhanced hover effects for cyber cards
    const cyberCards = document.querySelectorAll('.cyber-image-container');
    
    cyberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add floating animation
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.2)';
            
            // Animate image inside
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            // Show overlay content
            const overlay = this.querySelector('.cyber-overlay, .cyber-hover-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
            
            const content = this.querySelector('.cyber-content');
            if (content) {
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset animations
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            
            // Reset image
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            // Hide overlay content
            const overlay = this.querySelector('.cyber-overlay, .cyber-hover-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
            
            const content = this.querySelector('.cyber-content');
            if (content) {
                content.style.transform = 'translateY(20px)';
                content.style.opacity = '0';
            }
        });
    });

    // Parallax effect for main cyber section
    const cyberSection = document.getElementById('cyber-security-component');
    if (cyberSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sectionTop = cyberSection.offsetTop;
            const sectionHeight = cyberSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const parallaxElements = cyberSection.querySelectorAll('.cyber-card-secondary, .cyber-card-mini');
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.5 + (index * 0.2);
                    const yPos = -(scrolled - sectionTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                });
            }
        });
    }

    // Add click animations
    const featureCards = document.querySelectorAll('.cyber-feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(124, 58, 237, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cyber-card-main, .cyber-card-secondary, .cyber-card-mini {
            will-change: transform;
        }
        
        .cyber-image-container img {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll reveal for cards
    const revealCards = () => {
        const cards = document.querySelectorAll('.cyber-feature-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };

    // Initialize card reveal
    const cards = document.querySelectorAll('.cyber-feature-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Listen for scroll events
    window.addEventListener('scroll', revealCards);
    revealCards(); // Initial check

});