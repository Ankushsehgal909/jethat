/**
 * Tech Section Animations - Theme Compatible
 * Works with existing WOW.js and Owl Carousel functionality
 */

// Load required libraries
function loadTechLibraries() {
    return new Promise((resolve) => {
        // Check if jQuery is loaded
        if (typeof jQuery === 'undefined') {
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
            jqueryScript.onload = () => {
                loadOwlCarousel().then(resolve);
            };
            document.head.appendChild(jqueryScript);
        } else {
            loadOwlCarousel().then(resolve);
        }
    });
}

// Load Owl Carousel
function loadOwlCarousel() {
    return new Promise((resolve) => {
        if (typeof jQuery === 'undefined' || typeof jQuery.fn.owlCarousel === 'undefined') {
            // Load Owl Carousel CSS
            const owlCSS = document.createElement('link');
            owlCSS.rel = 'stylesheet';
            owlCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css';
            document.head.appendChild(owlCSS);

            // Load Owl Carousel JS
            const owlScript = document.createElement('script');
            owlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
            owlScript.onload = resolve;
            document.head.appendChild(owlScript);
        } else {
            resolve();
        }
    });
}

// Initialize tech section
function initializeTechSectionAnimations() {
    // Ensure content is visible first
    const techSection = document.querySelector('#tech-section');
    if (techSection) {
        techSection.style.opacity = '1';
        techSection.style.visibility = 'visible';
        
        // Make sure all text elements are visible
        const textElements = techSection.querySelectorAll('.display-1, h5, .tech-cta-btn');
        textElements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        });
    }
    
    // WOW.js is already initialized in tech.html, so we don't need to initialize it again
    
    // Load libraries and initialize carousel
    loadTechLibraries().then(() => {
        initializeTechCarousel();
        initializeTechInteractions();
    });
}

// Initialize tech carousel
function initializeTechCarousel() {
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.owlCarousel !== 'undefined') {
        jQuery(document).ready(function($) {
            // Initialize both tech-carousel and header-carousel
            $('.tech-carousel, .header-carousel').each(function() {
                const $carousel = $(this);
                
                // Destroy existing carousel if it exists
                if ($carousel.hasClass('owl-loaded')) {
                    $carousel.trigger('destroy.owl.carousel');
                    $carousel.removeClass('owl-loaded');
                }
                
                // Initialize carousel
                $carousel.owlCarousel({
                    items: 1,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    smartSpeed: 800,
                    dots: true,
                    nav: true,
                    navText: ['<span>‹</span>', '<span>›</span>'],
                    responsive: {
                        0: {
                            nav: false
                        },
                        768: {
                            nav: true
                        }
                    }
                });
            });
        });
    }
}

// Initialize tech interactions
function initializeTechInteractions() {
    // Feature item hover effects
    const featureItems = document.querySelectorAll('.tech-feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // CTA button hover effect
    const ctaBtn = document.querySelector('.tech-cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('mouseenter', () => {
            ctaBtn.style.transform = 'translateY(-3px)';
        });
        
        ctaBtn.addEventListener('mouseleave', () => {
            ctaBtn.style.transform = 'translateY(0)';
        });
    }
}

// Handle theme changes
function handleTechThemeChange() {
    const techSection = document.querySelector('#tech-section');
    if (!techSection) return;

    // Update carousel dots color based on theme
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const dots = document.querySelectorAll('.tech-carousel .owl-dot');
    
    dots.forEach(dot => {
        if (isDark) {
            dot.style.background = 'rgba(215, 113, 4, 0.3)';
        } else {
            dot.style.background = 'rgba(215, 113, 4, 0.3)';
        }
    });
}

// Cleanup function
function cleanupTechSectionAnimations() {
    // Destroy carousel if exists
    if (typeof jQuery !== 'undefined') {
        jQuery('.tech-carousel').trigger('destroy.owl.carousel');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Immediate visibility fix
    const techSection = document.querySelector('#tech-section');
    if (techSection) {
        // Force visibility of the entire section
        techSection.style.opacity = '1';
        techSection.style.visibility = 'visible';
        
        // Force visibility of all wow elements
        const wowElements = techSection.querySelectorAll('.wow');
        wowElements.forEach(element => {
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        });
    }
    
    // Small delay to ensure all components are loaded
    setTimeout(() => {
        // Only initialize if not already called from tech.html
        if (!window.techAnimationsInitialized) {
            initializeTechSectionAnimations();
            window.techAnimationsInitialized = true;
        }
    }, 300);
    
    // Additional fallback after 1 second
    setTimeout(() => {
        const techSection = document.querySelector('#tech-section');
        if (techSection) {
            const hiddenElements = techSection.querySelectorAll('[style*="visibility: hidden"], .wow:not(.animated)');
            hiddenElements.forEach(element => {
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                element.classList.add('animated');
            });
        }
    }, 1000);
});

// Handle theme toggle
document.addEventListener('DOMContentLoaded', () => {
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                handleTechThemeChange();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
    });
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (typeof jQuery !== 'undefined') {
        if (document.hidden) {
            jQuery('.tech-carousel').trigger('stop.owl.autoplay');
        } else {
            jQuery('.tech-carousel').trigger('play.owl.autoplay');
        }
    }
});

// Handle window resize
let techResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(techResizeTimeout);
    techResizeTimeout = setTimeout(() => {
        if (typeof jQuery !== 'undefined') {
            jQuery('.tech-carousel').trigger('refresh.owl.carousel');
        }
    }, 250);
});

// Export functions
if (typeof window !== 'undefined') {
    window.initializeTechSectionAnimations = initializeTechSectionAnimations;
    window.cleanupTechSectionAnimations = cleanupTechSectionAnimations;
}