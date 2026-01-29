// Who We Are 2 Section JavaScript - Pure CSS Animations
class WhoWeAre2Section {
    constructor() {
        this.activeSection = 0;
        this.sectionRefs = [];
        this.leftPanelRef = null;
        this.rightPanelRef = null;
        this.titleRef = null;
        this.descriptionRef = null;
        this.activeSectionRef = null;
        this.progressRef = null;
        
        // Section data
        this.sections = [
            {
                id: "vision",
                title: "Vision",
                description: "Jethat Cybersecurity Private Limited envisions a digitally secure world, where businesses thrive without compromise on data integrity and user privacy.",
                icon: "bi-eye",
                color: "gradient-blue"
            },
            {
                id: "expertise",
                title: "Expertise",
                description: "We specialize in cybersecurity and software development, boasting a team of seasoned professionals with deep knowledge in both domains.",
                icon: "bi-bullseye",
                color: "gradient-purple"
            },
            {
                id: "innovation",
                title: "Innovation",
                description: "At the core of our ethos is innovation. We consistently leverage cutting-edge technologies to stay ahead of evolving cyber threats and deliver state-of-the-art software solutions.",
                icon: "bi-lightbulb",
                color: "gradient-yellow"
            },
            {
                id: "security",
                title: "Comprehensive Security",
                description: "Our cybersecurity services encompass advanced threat detection, risk assessment, and proactive measures to fortify organizations against cyber threats.",
                icon: "bi-shield-check",
                color: "gradient-green"
            },
            {
                id: "client-centric",
                title: "Client-Centric Approach",
                description: "Our focus is on understanding and addressing the specific challenges faced by our clients, ensuring tailored solutions that meet their objectives and exceed expectations.",
                icon: "bi-people",
                color: "gradient-red"
            },
            {
                id: "quality",
                title: "Commitment to Quality",
                description: "We adhere to the highest standards of quality in both cybersecurity practices and software development, ensuring reliability, scalability, and resilience in every solution we deliver.",
                icon: "bi-award",
                color: "gradient-indigo"
            },
            {
                id: "partnerships",
                title: "Collaborative Partnerships",
                description: "Building lasting partnerships with our clients is integral to our mission. We work closely with organizations, providing ongoing support and adapting our services to meet evolving needs.",
                icon: "bi-handshake",
                color: "gradient-teal"
            },
            {
                id: "improvement",
                title: "Continuous Improvement",
                description: "In fields of cybersecurity and software development, we remain agile and responsive. We continually refine our approaches, adopting emerging technologies to keep our clients at the forefront of digital innovation and security.",
                icon: "bi-graph-up-arrow",
                color: "gradient-orange"
            }
        ];
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.cacheElements();
        this.setupScrollAnimations();
        this.setupScrollListener();
        this.setupIntersectionObserver();
        this.updateActiveSection(0);
    }
    
    cacheElements() {
        this.leftPanelRef = document.querySelector('.who-we-are-2-left-panel');
        this.rightPanelRef = document.querySelector('.who-we-are-2-right-panel');
        this.titleRef = document.querySelector('.who-we-are-2-title');
        this.descriptionRef = document.querySelector('.who-we-are-2-description');
        this.activeSectionRef = document.querySelector('.active-section-display');
        this.progressRef = document.querySelector('.progress-indicator');
        
        // Cache all section cards
        this.sectionRefs = Array.from(document.querySelectorAll('.who-we-are-2-card'));
    }
    
    setupIntersectionObserver() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add parallax effect to images
                    const image = entry.target.querySelector('.parallax-image');
                    if (image) {
                        this.setupParallaxEffect(entry.target, image);
                    }
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .who-we-are-2-card');
        animatedElements.forEach(el => observer.observe(el));
        
        // Observe cards for scaling effect
        this.sectionRefs.forEach(card => {
            if (card) {
                observer.observe(card);
            }
        });
    }
    
    setupParallaxEffect(card, image) {
        const handleScroll = () => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate parallax offset
            const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height);
            const parallaxSpeed = 0.3;
            const yPos = -(scrolled * 100 * parallaxSpeed);
            
            // Apply transform
            image.style.transform = `translateY(${yPos}px)`;
        };
        
        // Add scroll listener for this specific image
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Store reference for cleanup
        if (!this.parallaxListeners) {
            this.parallaxListeners = [];
        }
        this.parallaxListeners.push({ element: image, handler: handleScroll });
    }
    
    setupScrollListener() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateActiveSection();
                    this.updateCardScaling();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        this.scrollHandler = handleScroll;
    }
    
    updateCardScaling() {
        this.sectionRefs.forEach(card => {
            if (!card) return;
            
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = windowHeight / 2;
            
            // Calculate distance from center
            const distance = Math.abs(cardCenter - windowCenter);
            const maxDistance = windowHeight / 2;
            const scale = Math.max(0.95, 1 - (distance / maxDistance) * 0.05);
            
            // Apply scaling
            if (rect.top < windowHeight && rect.bottom > 0) {
                card.style.transform = `scale(${scale})`;
                card.style.opacity = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
            }
        });
    }
    
    updateActiveSection(forceIndex = null) {
        if (forceIndex !== null) {
            this.activeSection = forceIndex;
            this.renderActiveSection();
            return;
        }
        
        let maxVisibleArea = 0;
        let mostVisibleIndex = 0;
        
        this.sectionRefs.forEach((ref, index) => {
            if (!ref) return;
            
            const rect = ref.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const visibleTop = Math.max(rect.top, 0);
            const visibleBottom = Math.min(rect.bottom, viewportHeight);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);
            
            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                mostVisibleIndex = index;
            }
        });
        
        if (mostVisibleIndex !== this.activeSection) {
            this.activeSection = mostVisibleIndex;
            this.renderActiveSection();
        }
    }
    
    renderActiveSection() {
        const section = this.sections[this.activeSection];
        if (!section || !this.activeSectionRef) return;
        
        // Update active section display
        const iconElement = this.activeSectionRef.querySelector('.active-section-icon');
        const titleElement = this.activeSectionRef.querySelector('.active-section-title');
        const descriptionElement = this.activeSectionRef.querySelector('.active-section-description');
        
        if (iconElement) {
            iconElement.className = `active-section-icon ${section.color}`;
            iconElement.innerHTML = `<i class="${section.icon} text-white" style="font-size: 1.5rem;"></i>`;
        }
        
        if (titleElement) {
            titleElement.textContent = section.title;
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = section.description;
        }
        
        // Update progress indicator
        this.updateProgressIndicator();
        
        // Animate the change with CSS
        this.activeSectionRef.style.animation = 'fadeInLeft 0.5s ease-out';
        setTimeout(() => {
            if (this.activeSectionRef) {
                this.activeSectionRef.style.animation = '';
            }
        }, 500);
    }
    
    updateProgressIndicator() {
        const dots = this.progressRef?.querySelectorAll('.progress-dot');
        if (!dots) return;
        
        dots.forEach((dot, index) => {
            if (index === this.activeSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    setupScrollAnimations() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add initial classes for animations
        if (this.titleRef) this.titleRef.classList.add('fade-in-up');
        if (this.descriptionRef) this.descriptionRef.classList.add('fade-in-up');
        if (this.activeSectionRef) this.activeSectionRef.classList.add('fade-in-left');
        if (this.progressRef) this.progressRef.classList.add('fade-in-up');
        
        // Trigger initial animations after a short delay
        setTimeout(() => {
            const initialElements = document.querySelectorAll('#who-we-are-2 .fade-in-up, #who-we-are-2 .fade-in-left');
            initialElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        }, 300);
    }
    
    destroy() {
        // Remove event listeners
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
        
        // Remove parallax listeners
        if (this.parallaxListeners) {
            this.parallaxListeners.forEach(({ handler }) => {
                window.removeEventListener('scroll', handler);
            });
        }
    }
}

// CSS Animation keyframes (added programmatically)
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .animate-slide-up {
            animation: slideInUp 0.6s ease-out;
        }
        
        .animate-scale-in {
            animation: scaleIn 0.8s ease-out;
        }
    `;
    document.head.appendChild(style);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add animation styles
    addAnimationStyles();
    
    // Only initialize if the section exists on the page
    if (document.getElementById('who-we-are-2')) {
        new WhoWeAre2Section();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhoWeAre2Section;
}