/**
 * Professional Industries Section Animation System
 * Clean, performant scroll-based card transitions with proper state management
 */

class ProfessionalIndustriesAnimation {
    constructor() {
        // Core properties
        this.wrapper = null;
        this.cardsDisplay = null;
        this.scrollTrigger = null;
        this.cards = [];
        this.scrollSteps = [];
        this.navigationBtns = {};
        
        // State management
        this.currentIndex = 0;
        this.totalCards = 0;
        this.isAnimating = false;
        this.isMobile = window.innerWidth <= 992;
        this.isInitialized = false;
        
        // Animation properties
        this.scrollProgress = 0;
        this.animationFrame = null;
        this.lastScrollY = 0;
        
        // Bind methods
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.updateAnimation = this.updateAnimation.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrev = this.goToPrev.bind(this);
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Get DOM elements
        this.wrapper = document.getElementById('industriesAnimationWrapper');
        this.cardsDisplay = document.getElementById('industriesCardsDisplay');
        this.scrollTrigger = document.getElementById('industriesScrollTrigger');
        
        if (!this.wrapper || !this.cardsDisplay) {
            console.warn('Industries animation: Required elements not found');
            return;
        }
        
        // Initialize collections
        this.cards = Array.from(this.cardsDisplay.querySelectorAll('.industry-card'));
        this.scrollSteps = Array.from(this.scrollTrigger?.querySelectorAll('.scroll-step') || []);
        this.totalCards = this.cards.length;
        
        // Get navigation buttons
        this.navigationBtns = {
            prev: document.getElementById('prevIndustry'),
            next: document.getElementById('nextIndustry')
        };
        
        if (this.totalCards === 0) {
            console.warn('Industries animation: No cards found');
            return;
        }
        
        // Setup initial state
        this.setupCards();
        this.setupNavigation();
        this.bindEvents();
        this.updateProgress();
        this.updateNavigation();
        
        this.isInitialized = true;
        
        console.log(`Professional Industries Animation initialized with ${this.totalCards} cards`);
    }
    
    setupCards() {
        this.cards.forEach((card, index) => {
            card.dataset.industry = index;
            
            if (!this.isMobile) {
                // Set initial states for desktop
                if (index === 0) {
                    card.classList.add('active');
                } else if (index === 1) {
                    card.classList.add('next');
                } else {
                    card.classList.add('hidden');
                }
            } else {
                // Mobile: show all cards normally
                card.classList.remove('active', 'prev', 'next', 'hidden');
            }
        });
        
        // Setup scroll steps
        this.scrollSteps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            }
        });
        
        // Update total industries display
        const totalElement = document.getElementById('totalIndustries');
        if (totalElement) {
            totalElement.textContent = this.totalCards;
        }
    }
    
    setupNavigation() {
        if (this.navigationBtns.prev) {
            this.navigationBtns.prev.addEventListener('click', this.goToPrev);
        }
        
        if (this.navigationBtns.next) {
            this.navigationBtns.next.addEventListener('click', this.goToNext);
        }
    }
    
    bindEvents() {
        if (!this.isMobile) {
            // Throttled scroll event for desktop
            window.addEventListener('scroll', this.handleScroll, { passive: true });
        }
        
        // Resize event with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(this.handleResize, 150);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isInitialized || this.isMobile) return;
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.goToPrev();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.goToNext();
            }
        });
    }
    
    handleScroll() {
        if (this.isAnimating || this.isMobile) return;
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.animationFrame = requestAnimationFrame(this.updateAnimation);
    }
    
    updateAnimation() {
        if (!this.wrapper || this.isMobile) return;
        
        const rect = this.wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress within the animation area
        const triggerStart = windowHeight * 0.2;
        const triggerEnd = -rect.height + windowHeight * 0.8;
        
        if (rect.top <= triggerStart && rect.top >= triggerEnd) {
            // Calculate progress (0 to 1)
            const totalDistance = triggerStart - triggerEnd;
            const currentDistance = triggerStart - rect.top;
            this.scrollProgress = Math.max(0, Math.min(1, currentDistance / totalDistance));
            
            // Calculate which card should be active
            const targetIndex = Math.floor(this.scrollProgress * this.totalCards);
            const clampedIndex = Math.max(0, Math.min(this.totalCards - 1, targetIndex));
            
            if (clampedIndex !== this.currentIndex) {
                this.goToIndex(clampedIndex);
            }
            
            this.updateProgress();
        }
        
        this.animationFrame = null;
    }
    
    goToIndex(index, animate = true) {
        if (index < 0 || index >= this.totalCards || index === this.currentIndex) {
            return;
        }
        
        if (animate && !this.isMobile) {
            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, 800);
        }
        
        const prevIndex = this.currentIndex;
        this.currentIndex = index;
        
        // Update card states
        this.cards.forEach((card, cardIndex) => {
            card.classList.remove('active', 'prev', 'next', 'hidden');
            
            if (!this.isMobile) {
                if (cardIndex === this.currentIndex) {
                    card.classList.add('active');
                } else if (cardIndex === this.currentIndex - 1) {
                    card.classList.add('prev');
                } else if (cardIndex === this.currentIndex + 1) {
                    card.classList.add('next');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
        
        // Update scroll steps
        this.scrollSteps.forEach((step, stepIndex) => {
            step.classList.toggle('active', stepIndex === this.currentIndex);
        });
        
        this.updateProgress();
        this.updateNavigation();
        
        // Dispatch custom event
        this.wrapper.dispatchEvent(new CustomEvent('industryChanged', {
            detail: {
                currentIndex: this.currentIndex,
                previousIndex: prevIndex,
                totalCards: this.totalCards
            }
        }));
    }
    
    goToNext() {
        if (this.currentIndex < this.totalCards - 1) {
            this.goToIndex(this.currentIndex + 1);
        }
    }
    
    goToPrev() {
        if (this.currentIndex > 0) {
            this.goToIndex(this.currentIndex - 1);
        }
    }
    
    updateProgress() {
        const progressFill = document.getElementById('industriesProgressFill');
        const currentIndexElement = document.getElementById('currentIndustryIndex');
        
        if (progressFill) {
            const progressPercent = ((this.currentIndex + 1) / this.totalCards) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
        
        if (currentIndexElement) {
            currentIndexElement.textContent = this.currentIndex + 1;
        }
    }
    
    updateNavigation() {
        if (this.navigationBtns.prev) {
            this.navigationBtns.prev.disabled = this.currentIndex === 0;
        }
        
        if (this.navigationBtns.next) {
            this.navigationBtns.next.disabled = this.currentIndex === this.totalCards - 1;
        }
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 992;
        
        if (wasMobile !== this.isMobile) {
            this.setupCards();
            
            if (this.isMobile) {
                // Remove scroll listener for mobile
                window.removeEventListener('scroll', this.handleScroll);
            } else {
                // Add scroll listener for desktop
                window.addEventListener('scroll', this.handleScroll, { passive: true });
            }
        }
    }
    
    // Public API methods
    getCurrentIndex() {
        return this.currentIndex;
    }
    
    getTotalCards() {
        return this.totalCards;
    }
    
    isCurrentlyMobile() {
        return this.isMobile;
    }
    
    // Auto-play functionality
    startAutoPlay(interval = 5000) {
        this.stopAutoPlay();
        
        this.autoPlayInterval = setInterval(() => {
            if (!this.isAnimating && !this.isMobile) {
                if (this.currentIndex < this.totalCards - 1) {
                    this.goToNext();
                } else {
                    this.goToIndex(0);
                }
            }
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Cleanup
    destroy() {
        if (this.isInitialized) {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.handleResize);
            
            if (this.navigationBtns.prev) {
                this.navigationBtns.prev.removeEventListener('click', this.goToPrev);
            }
            
            if (this.navigationBtns.next) {
                this.navigationBtns.next.removeEventListener('click', this.goToNext);
            }
            
            this.stopAutoPlay();
            
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            this.isInitialized = false;
        }
    }
}

// Enhanced interaction handlers
class IndustriesInteractionManager {
    constructor(animationInstance) {
        this.animation = animationInstance;
        this.init();
    }
    
    init() {
        this.setupCardHovers();
        this.setupCTAButtons();
        this.setupTouchGestures();
    }
    
    setupCardHovers() {
        const cards = document.querySelectorAll('.industry-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.enhanceCardHover(card, false);
            });
        });
    }
    
    enhanceCardHover(card, isHovering) {
        const image = card.querySelector('.card-image');
        const features = card.querySelectorAll('.feature-item');
        const badge = card.querySelector('.industry-badge');
        const ctaButton = card.querySelector('.industry-cta-button');
        
        if (isHovering) {
            // Enhance image
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            // Animate features
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(8px)';
                }, index * 100);
            });
            
            // Show badge and CTA
            if (badge) {
                badge.style.transform = 'translateY(0)';
                badge.style.opacity = '1';
            }
            
            if (ctaButton) {
                ctaButton.style.transform = 'translateY(0)';
                ctaButton.style.opacity = '1';
            }
        } else {
            // Reset transforms
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        }
    }
    
    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.industry-cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const card = button.closest('.industry-card');
                const industryIndex = parseInt(card.dataset.industry);
                
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('industryCtaClicked', {
                    detail: {
                        industryIndex,
                        industryName: card.querySelector('.industry-name')?.textContent
                    }
                }));
                
                console.log(`CTA clicked for industry ${industryIndex}`);
            });
        });
    }
    
    setupTouchGestures() {
        if (!this.animation.cardsDisplay) return;
        
        let startX = 0;
        let startY = 0;
        let isSwipe = false;
        
        this.animation.cardsDisplay.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipe = false;
        }, { passive: true });
        
        this.animation.cardsDisplay.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            if (diffX > diffY && diffX > 50) {
                isSwipe = true;
            }
        }, { passive: true });
        
        this.animation.cardsDisplay.addEventListener('touchend', (e) => {
            if (!isSwipe || this.animation.isMobile) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.animation.goToNext();
                } else {
                    this.animation.goToPrev();
                }
            }
            
            startX = 0;
            startY = 0;
            isSwipe = false;
        }, { passive: true });
    }
}

// Initialize the animation system
let industriesAnimation;
let industriesInteractionManager;

function initializeIndustriesAnimations() {
    try {
        // Initialize main animation
        industriesAnimation = new ProfessionalIndustriesAnimation();
        
        // Initialize interaction manager
        industriesInteractionManager = new IndustriesInteractionManager(industriesAnimation);
        
        // Optional: Start auto-play (uncomment if desired)
        // industriesAnimation.startAutoPlay(6000);
        
        console.log('Professional Industries Animation System initialized successfully');
        
        // Make available globally for debugging
        window.industriesAnimation = industriesAnimation;
        
    } catch (error) {
        console.error('Error initializing industries animations:', error);
        
        // Fallback: Ensure cards are visible
        const cards = document.querySelectorAll('.industry-card');
        cards.forEach(card => {
            card.style.position = 'relative';
            card.style.transform = 'none';
            card.style.opacity = '1';
            card.style.marginBottom = '2rem';
        });
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIndustriesAnimations);
} else {
    initializeIndustriesAnimations();
}

// Export for manual control
window.initializeIndustriesAnimations = initializeIndustriesAnimations;

// Cleanup function
window.destroyIndustriesAnimations = function() {
    if (industriesAnimation) {
        industriesAnimation.destroy();
    }
};

// Event listeners for external integration
document.addEventListener('industryChanged', (e) => {
    console.log('Industry changed:', e.detail);
});

document.addEventListener('industryCtaClicked', (e) => {
    console.log('Industry CTA clicked:', e.detail);
    // Add your custom logic here (e.g., open modal, navigate to page, etc.)
});