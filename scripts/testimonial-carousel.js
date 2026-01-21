// Modern Testimonial Section Controller
function initializeTestimonialCarousel() {
    const testimonialSection = document.getElementById('testimonials');
    
    // ================= MODERN CAROUSEL FUNCTIONALITY ================= 
    const modernTrack = document.getElementById('testimonials-modern-track');
    const slides = document.querySelectorAll('.testimonial-modern-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Check if elements exist
    if (!modernTrack || slides.length === 0 || dots.length === 0) {
        console.log('Modern testimonial elements not found, retrying...');
        setTimeout(initializeTestimonialCarousel, 100);
        return;
    }
    
    let currentSlide = 0;
    let isAnimating = false;
    let autoPlayInterval;
    
    function updateSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide all slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlide();
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play carousel
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 4000); // 4 seconds for testimonials
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.testimonial-modern-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    modernTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });
    
    modernTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
    });
    
    modernTrack.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    });
    
    // Mouse drag support
    modernTrack.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        stopAutoPlay();
        e.preventDefault();
    });
    
    modernTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });
    
    modernTrack.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    });
    
    modernTrack.addEventListener('mouseleave', () => {
        isDragging = false;
        if (!carouselContainer.matches(':hover')) {
            startAutoPlay();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (testimonialSection.getBoundingClientRect().top < window.innerHeight && 
            testimonialSection.getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
    
    // Initialize carousel
    updateSlide();
    startAutoPlay();
    
    console.log('Modern testimonial carousel initialized successfully');
}

// ================= SCROLL ANIMATIONS ================= 
function initializeTestimonialAnimations() {
    const testimonialSection = document.getElementById('testimonials');
    
    if (!testimonialSection) {
        setTimeout(initializeTestimonialAnimations, 100);
        return;
    }
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    observer.observe(testimonialSection);
    
    // Enhanced modern layout hover effects
    const modernLayouts = document.querySelectorAll('.testimonial-modern-layout');
    modernLayouts.forEach((layout, index) => {
        layout.addEventListener('mouseenter', function() {
            // Add subtle scale effect
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        layout.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate frame colors on hover
    const frames = document.querySelectorAll('.testimonial-frame');
    frames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add ripple effect to dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(46,139,87,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: dotRipple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for dot ripple animation
    if (!document.getElementById('dot-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'dot-ripple-styles';
        style.textContent = `
            @keyframes dotRipple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .dot {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animate author lines
    const authorLines = document.querySelectorAll('.author-line');
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '40px';
                entry.target.style.transition = 'width 0.8s ease';
            }
        });
    }, { threshold: 0.5 });
    
    authorLines.forEach(line => {
        line.style.width = '0px';
        lineObserver.observe(line);
    });
    
    // Animate testimonial content on scroll
    const contentAreas = document.querySelectorAll('.testimonial-content-area');
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.testimonial-title');
                const description = entry.target.querySelector('.testimonial-description');
                const author = entry.target.querySelector('.testimonial-author');
                
                setTimeout(() => {
                    if (title) {
                        title.style.opacity = '1';
                        title.style.transform = 'translateY(0)';
                    }
                }, 100);
                
                setTimeout(() => {
                    if (description) {
                        description.style.opacity = '1';
                        description.style.transform = 'translateY(0)';
                    }
                }, 300);
                
                setTimeout(() => {
                    if (author) {
                        author.style.opacity = '1';
                        author.style.transform = 'translateY(0)';
                    }
                }, 500);
            }
        });
    }, { threshold: 0.3 });
    
    contentAreas.forEach(area => {
        const title = area.querySelector('.testimonial-title');
        const description = area.querySelector('.testimonial-description');
        const author = area.querySelector('.testimonial-author');
        
        [title, description, author].forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.6s ease';
            }
        });
        
        contentObserver.observe(area);
    });
    
    console.log('Modern testimonial animations initialized successfully');
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initializeTestimonialCarousel();
            initializeTestimonialAnimations();
        }, 600);
    });
} else {
    setTimeout(() => {
        initializeTestimonialCarousel();
        initializeTestimonialAnimations();
    }, 600);
}

// Export functions for manual initialization
window.initializeTestimonialCarousel = initializeTestimonialCarousel;
window.initializeTestimonialAnimations = initializeTestimonialAnimations;