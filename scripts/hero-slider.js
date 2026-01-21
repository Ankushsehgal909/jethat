/**
 * Enhanced Hero Slider with Bootstrap 5
 * Features: Auto-slide, manual controls, keyboard navigation, accessibility
 */

class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.slideInterval = 5000; // 5 seconds per slide
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.startAutoPlay();
        this.updateProgressBar();
        this.initializeAccessibility();
        
        // Initialize first slide
        this.showSlide(0, false);
        
        console.log('Hero Slider initialized successfully');
    }

    cacheElements() {
        // Background slides
        this.backgroundSlides = document.querySelectorAll('.hero-slide-bg');
        
        // Content slides
        this.contentSlides = document.querySelectorAll('.hero-slide-content');
        
        // Animation elements
        this.slideTexts = document.querySelectorAll('.slide-text');
        
        // Controls
        this.prevBtn = document.querySelector('.hero-prev-btn');
        this.nextBtn = document.querySelector('.hero-next-btn');
        this.indicators = document.querySelectorAll('.slide-indicator');
        this.autoplayToggle = document.querySelector('.autoplay-toggle');
        this.autoplayIcon = document.querySelector('.autoplay-icon');
        this.autoplayText = document.querySelector('.autoplay-text');
        
        // Progress bar
        this.progressBar = document.querySelector('.slide-progress .progress-bar');
        
        // Container for keyboard events
        this.container = document.querySelector('.hero-slider-container');
    }

    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Autoplay toggle
        if (this.autoplayToggle) {
            this.autoplayToggle.addEventListener('click', () => this.toggleAutoPlay());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Pause on hover
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }

        // Touch/swipe support
        this.initTouchEvents();

        // Visibility API - pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else if (this.isAutoPlaying) {
                this.resumeAutoPlay();
            }
        });

        // Intersection Observer for performance
        this.initIntersectionObserver();
    }

    initTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        const minSwipeDistance = 50;

        if (this.container) {
            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                
                // Check if horizontal swipe is more significant than vertical
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        this.previousSlide();
                    } else {
                        this.nextSlide();
                    }
                }
            }, { passive: true });
        }
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (this.isAutoPlaying) {
                        this.startAutoPlay();
                    }
                } else {
                    this.stopAutoPlay();
                }
            });
        }, { threshold: 0.5 });

        if (this.container) {
            observer.observe(this.container);
        }
    }

    initializeAccessibility() {
        // Add ARIA labels and roles
        if (this.container) {
            this.container.setAttribute('role', 'region');
            this.container.setAttribute('aria-label', 'Hero image slider');
        }

        // Add live region for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'hero-slider-live-region';
        document.body.appendChild(liveRegion);

        this.liveRegion = liveRegion;
    }

    showSlide(index, animate = true) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        const previousSlide = this.currentSlide;
        this.currentSlide = index;

        // Update background slides
        this.backgroundSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update content slides with stagger effect
        this.contentSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update animation text
        this.slideTexts.forEach((text, i) => {
            text.classList.toggle('active', i === index);
        });

        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
            indicator.style.background = i === index ? 
                'var(--accent-gold)' : 
                'rgba(255,255,255,0.3)';
        });

        // Update ARIA labels
        this.updateAriaLabels();

        // Announce slide change to screen readers
        if (this.liveRegion) {
            const slideInfo = this.getSlideInfo(index);
            this.liveRegion.textContent = `Slide ${index + 1} of ${this.totalSlides}: ${slideInfo}`;
        }

        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);

        // Trigger custom event
        this.dispatchSlideChangeEvent(previousSlide, index);
    }

    getSlideInfo(index) {
        const slideInfos = [
            'Cybersecurity Excellence - Securing Tomorrow\'s Digital Innovation',
            'AI & Machine Learning - Intelligent Security Powered by AI',
            'Cloud Security - Cloud-Native Security Solutions'
        ];
        return slideInfos[index] || `Slide ${index + 1}`;
    }

    updateAriaLabels() {
        this.indicators.forEach((indicator, i) => {
            const isActive = i === this.currentSlide;
            indicator.setAttribute('aria-pressed', isActive.toString());
            indicator.setAttribute('aria-label', 
                `${isActive ? 'Current slide' : 'Go to slide'} ${i + 1}: ${this.getSlideInfo(i)}`
            );
        });
    }

    dispatchSlideChangeEvent(previousIndex, currentIndex) {
        const event = new CustomEvent('heroSlideChange', {
            detail: {
                previousSlide: previousIndex,
                currentSlide: currentIndex,
                totalSlides: this.totalSlides
            }
        });
        document.dispatchEvent(event);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
        this.resetProgressBar();
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
        this.resetProgressBar();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.showSlide(index);
            this.resetProgressBar();
        }
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }

        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);

        this.updateProgressBar();
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    pauseAutoPlay() {
        if (this.isAutoPlaying) {
            this.stopAutoPlay();
        }
    }

    resumeAutoPlay() {
        if (this.isAutoPlaying && !this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }

    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        
        if (this.isAutoPlaying) {
            this.startAutoPlay();
            this.autoplayIcon.className = 'bi bi-pause-fill autoplay-icon';
            this.autoplayText.textContent = 'Pause';
            this.autoplayToggle.setAttribute('aria-label', 'Pause slideshow');
        } else {
            this.stopAutoPlay();
            this.autoplayIcon.className = 'bi bi-play-fill autoplay-icon';
            this.autoplayText.textContent = 'Play';
            this.autoplayToggle.setAttribute('aria-label', 'Play slideshow');
        }

        // Reset progress bar
        this.resetProgressBar();
    }

    updateProgressBar() {
        if (!this.progressBar || !this.isAutoPlaying) return;

        let progress = 0;
        const increment = 100 / (this.slideInterval / 100);

        const progressInterval = setInterval(() => {
            if (!this.isAutoPlaying || !this.autoPlayInterval) {
                clearInterval(progressInterval);
                return;
            }

            progress += increment;
            this.progressBar.style.width = Math.min(progress, 100) + '%';

            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 100);
    }

    resetProgressBar() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
            setTimeout(() => {
                this.updateProgressBar();
            }, 100);
        }
    }

    handleKeyboard(e) {
        // Only handle keyboard events when slider is in focus or visible
        if (!this.container || !this.isElementInViewport(this.container)) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ': // Spacebar
                e.preventDefault();
                this.toggleAutoPlay();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
            case '1':
            case '2':
            case '3':
                e.preventDefault();
                const slideIndex = parseInt(e.key) - 1;
                if (slideIndex < this.totalSlides) {
                    this.goToSlide(slideIndex);
                }
                break;
        }
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Public API methods
    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.totalSlides;
    }

    isPlaying() {
        return this.isAutoPlaying && this.autoPlayInterval !== null;
    }

    // Method to update slide content dynamically
    updateSlideContent(slideIndex, content) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides && this.contentSlides[slideIndex]) {
            const slide = this.contentSlides[slideIndex];
            
            if (content.title) {
                const titleElement = slide.querySelector('.hero-title');
                if (titleElement) titleElement.innerHTML = content.title;
            }
            
            if (content.subtitle) {
                const subtitleElement = slide.querySelector('.hero-subtitle');
                if (subtitleElement) subtitleElement.textContent = content.subtitle;
            }
            
            if (content.badge) {
                const badgeElement = slide.querySelector('.hero-badge .badge');
                if (badgeElement) badgeElement.innerHTML = content.badge;
            }
        }
    }

    // Method to update background images
    updateSlideBackground(slideIndex, backgroundStyle) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides && this.backgroundSlides[slideIndex]) {
            this.backgroundSlides[slideIndex].style.background = backgroundStyle;
        }
    }

    // Cleanup method
    destroy() {
        this.stopAutoPlay();
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeyboard);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Remove live region
        if (this.liveRegion && this.liveRegion.parentNode) {
            this.liveRegion.parentNode.removeChild(this.liveRegion);
        }
        
        console.log('Hero Slider destroyed');
    }
}

// Initialize the slider when DOM is loaded
function initializeHeroSlider() {
    // Check if hero slider exists on the page
    const heroSliderContainer = document.querySelector('.hero-slider-container');
    if (heroSliderContainer) {
        window.heroSlider = new HeroSlider();
        
        // Example of how to listen to slide changes
        document.addEventListener('heroSlideChange', (e) => {
            console.log('Slide changed:', e.detail);
        });
        
        return true;
    }
    return false;
}

// Try to initialize immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for components to load
        setTimeout(initializeHeroSlider, 100);
    });
} else {
    // DOM is already ready, try to initialize
    setTimeout(initializeHeroSlider, 100);
}

// Also provide a global function to manually initialize
window.initializeHeroSlider = initializeHeroSlider;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroSlider;
}