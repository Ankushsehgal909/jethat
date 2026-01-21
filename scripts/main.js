// Bootstrap 5 JetHat Main JavaScript
class JetHatBootstrap {
    constructor() {
        this.init();
    }

    init() {
        this.initializeGSAP();
        this.initializeVideoBackground();
        this.initializeScrollProgress();
        this.initializeTypingAnimation();
        this.initializeScanningEffects();
        this.initializeScrollAnimations();
        this.initializeAnimatedStats();
        this.initializeAnimatedCounters();
    }

    // GSAP Initialization
    initializeGSAP() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Smooth scrolling
            gsap.config({
                nullTargetWarn: false,
                trialWarn: false
            });

            // Hero animations
            gsap.timeline()
                .from('.hero-title', { 
                    duration: 1.2, 
                    y: 50, 
                    opacity: 0, 
                    ease: 'power3.out' 
                })
                .from('.hero-subtitle', { 
                    duration: 1, 
                    y: 30, 
                    opacity: 0, 
                    ease: 'power2.out' 
                }, '-=0.8')
                .from('.hero-buttons .btn', { 
                    duration: 0.8, 
                    y: 20, 
                    opacity: 0, 
                    stagger: 0.2, 
                    ease: 'power2.out' 
                }, '-=0.6');

            // Scroll-triggered animations
            gsap.utils.toArray('.card').forEach((card, index) => {
                gsap.fromTo(card, 
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }
    }

    // Video Background
    initializeVideoBackground() {
        const video = document.getElementById('hero-video');
        if (!video) return;

        video.classList.remove('opacity-0');
        video.style.opacity = '1';
        
        video.addEventListener('loadeddata', () => {
            video.style.opacity = '1';
        });

        video.addEventListener('error', () => {
            const fallback = document.getElementById('video-fallback');
            if (fallback) {
                fallback.classList.remove('d-none');
                fallback.classList.add('d-flex');
            }
        });

        video.load();
        
        setTimeout(() => {
            if (video.readyState < 2) {
                const fallback = document.getElementById('video-fallback');
                if (fallback) {
                    fallback.classList.remove('d-none');
                    fallback.classList.add('d-flex');
                }
            }
        }, 3000);
    }

    // Scroll Progress
    initializeScrollProgress() {
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

    // Typing Animation
    initializeTypingAnimation() {
        const checkForTypingElement = () => {
            const typingText = document.getElementById('typing-text');
            if (typingText) {
                this.runTypingAnimation(typingText);
            } else {
                setTimeout(checkForTypingElement, 100);
            }
        };
        checkForTypingElement();
    }
    
    runTypingAnimation(typingText) {
        const texts = [
            'We Protect Every Moment',
            'अनुक्षणं रक्षामहे',
            'Securing Digital Future',
            'Innovation Meets Security'
        ];
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const typeText = () => {
            const currentText = texts[currentIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        };

        typeText();
    }

    // Scanning Effects
    initializeScanningEffects() {
        const heroSection = document.querySelector('[data-hero-container]');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update scanning lines position
                const horizontalScan = document.getElementById('horizontal-scan');
                const verticalScan = document.getElementById('vertical-scan');
                const radarPulse = document.getElementById('radar-pulse');

                if (horizontalScan) {
                    horizontalScan.style.top = y + 'px';
                    horizontalScan.classList.remove('d-none');
                }

                if (verticalScan) {
                    verticalScan.style.left = x + 'px';
                    verticalScan.classList.remove('d-none');
                }

                if (radarPulse) {
                    radarPulse.style.left = (x - 50) + 'px';
                    radarPulse.style.top = (y - 50) + 'px';
                    radarPulse.style.opacity = '0.7';
                    
                    // Animate radar pulse
                    radarPulse.style.animation = 'none';
                    setTimeout(() => {
                        radarPulse.style.animation = 'radar-pulse 1s ease-out';
                    }, 10);
                }
            });

            heroSection.addEventListener('mouseleave', () => {
                const horizontalScan = document.getElementById('horizontal-scan');
                const verticalScan = document.getElementById('vertical-scan');
                const radarPulse = document.getElementById('radar-pulse');

                if (horizontalScan) horizontalScan.classList.add('d-none');
                if (verticalScan) verticalScan.classList.add('d-none');
                if (radarPulse) radarPulse.style.opacity = '0';
            });
        }
    }

    // Scroll Animations
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .btn, h1, h2, h3, p').forEach(el => {
            observer.observe(el);
        });
    }

    // Animated Stats
    initializeAnimatedStats() {
        const stats = document.querySelectorAll('[data-count]');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(stat);
        });
    }

    // Animated Counters
    initializeAnimatedCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            counter.textContent = '0';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const increment = target / 100;
                        let current = 0;

                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        };

                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JetHatBootstrap();
});
