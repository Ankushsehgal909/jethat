// Career Section Carousel Controller
function initializeCareerCarousel() {
    const careerSection = document.getElementById('career-component');
    
    // ================= CAROUSEL FUNCTIONALITY ================= 
    const carouselTrack = document.getElementById('insights-carousel-track');
    const prevBtn = document.getElementById('insights-prev');
    const nextBtn = document.getElementById('insights-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Check if elements exist
    if (!carouselTrack || !prevBtn || !nextBtn || slides.length === 0) {
        setTimeout(initializeCareerCarousel, 100);
        return;
    }
    
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    let maxSlide = Math.max(0, slides.length - slidesPerView);
    let isAnimating = false;
    let autoPlayInterval;
    
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 1200) return 3;
        if (width >= 992) return 2;
        if (width >= 768) return 1;
        return 1;
    }
    
    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;
        
        const slideWidth = slides[0].offsetWidth;
        const translateX = -currentSlide * slideWidth;
        
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === Math.floor(currentSlide / slidesPerView));
        });
        
        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    function goToSlide(slideIndex) {
        const targetSlide = slideIndex * slidesPerView;
        if (targetSlide <= maxSlide) {
            currentSlide = targetSlide;
            updateCarousel();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play carousel
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide >= maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateCarousel();
        }, 4000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Handle window resize
    function handleResize() {
        slidesPerView = getSlidesPerView();
        maxSlide = Math.max(0, slides.length - slidesPerView);
        currentSlide = Math.min(currentSlide, maxSlide);
        updateCarousel();
    }
    
    window.addEventListener('resize', handleResize);
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });
    
    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', () => {
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
    carouselTrack.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        carouselTrack.style.cursor = 'grabbing';
        stopAutoPlay();
    });
    
    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });
    
    carouselTrack.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
        
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
    
    carouselTrack.addEventListener('mouseleave', () => {
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
        if (!carouselContainer.matches(':hover')) {
            startAutoPlay();
        }
    });
    
    // Initialize carousel
    updateCarousel();
    startAutoPlay();
}

// ================= SCROLL ANIMATIONS ================= 
function initializeCareerAnimations() {
    const careerSection = document.getElementById('career-component');
    
    if (!careerSection) {
        setTimeout(initializeCareerAnimations, 100);
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
    
    observer.observe(careerSection);
    
    // Enhanced button interactions
    const animatedBtns = document.querySelectorAll('.animated-btn');
    animatedBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax effect for image
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            parallaxImage.style.transform = `translateY(${rate}px) scale(1.1)`;
        };
        
        window.addEventListener('scroll', handleScroll);
    }
    
    // Enhanced card hover effects
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add stagger effect to other cards
            insightCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            insightCards.forEach(otherCard => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
            });
        });
    });
    
    // Add CSS for ripple animation
    if (!document.getElementById('career-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'career-ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initializeCareerCarousel();
            initializeCareerAnimations();
        }, 500);
    });
} else {
    setTimeout(() => {
        initializeCareerCarousel();
        initializeCareerAnimations();
    }, 500);
}

// Export functions for manual initialization
window.initializeCareerCarousel = initializeCareerCarousel;
window.initializeCareerAnimations = initializeCareerAnimations;