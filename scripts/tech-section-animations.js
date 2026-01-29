/**
 * Tech Section Animations - Products Section Inspired
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
function initializeTechSection() {
    console.log('Tech: Initializing tech section');
    
    // Ensure content is visible first
    const techSection = document.querySelector('#tech-section');
    if (techSection) {
        techSection.style.opacity = '1';
        techSection.style.visibility = 'visible';
        
        // Make sure all text elements are visible
        const textElements = techSection.querySelectorAll('.display-1, h5, .text-gradient');
        textElements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        });
    }
    
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
            console.log('Tech: Initializing carousel');
            
            // Technology data for synchronization
            const techData = [
                {
                    link: 'technologies/core.html',
                    ctaText: 'Explore AI & ML'
                },
                {
                    link: 'technologies/core.html',
                    ctaText: 'Explore Cybersecurity'
                },
                {
                    link: 'technologies/core.html',
                    ctaText: 'Explore Cloud Infrastructure'
                },
                {
                    link: 'technologies/core.html',
                    ctaText: 'Explore Blockchain'
                },
                {
                    link: 'technologies/core.html',
                    ctaText: 'Explore IoT & Edge Computing'
                }
            ];
            
            let currentSlide = 0;
            
            // Initialize tech carousel
            $('.tech-carousel-slider').each(function() {
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
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    smartSpeed: 800,
                    dots: false, // Disable default dots
                    nav: false,  // Disable default nav
                    mouseDrag: true,
                    touchDrag: true,
                    pullDrag: true,
                    responsive: {
                        0: {
                            nav: false,
                            dots: false
                        },
                        768: {
                            nav: false,
                            dots: false
                        }
                    },
                    onChanged: function(event) {
                        // Sync left side content when carousel changes
                        const currentIndex = event.item.index;
                        const realIndex = currentIndex % techData.length;
                        currentSlide = realIndex;
                        updateLeftSideContent(realIndex);
                        updateIndicators(realIndex);
                        console.log(`Tech: Carousel changed to slide ${realIndex}`);
                    },
                    onInitialized: function(event) {
                        // Set initial content
                        currentSlide = 0;
                        updateLeftSideContent(0);
                        updateIndicators(0);
                        console.log('Tech: Carousel initialized');
                    }
                });
                
                // Store carousel reference for manual controls
                window.techCarousel = $carousel;
            });
            
            // Function to update left side content
            function updateLeftSideContent(techIndex) {
                // Hide all tech info items
                $('.tech-info-item').removeClass('active');
                
                // Show the current tech info
                $(`.tech-info-item[data-tech="${techIndex}"]`).addClass('active');
                
                // Update CTA link and text
                const currentTech = techData[techIndex];
                if (currentTech) {
                    $('#explore-current-tech').attr('href', currentTech.link);
                    $('#current-tech-cta').text(currentTech.ctaText);
                }
            }
            
            // Function to update indicators
            function updateIndicators(activeIndex) {
                $('.tech-indicator-item').removeClass('active');
                $(`.tech-indicator-item[data-slide="${activeIndex}"]`).addClass('active');
            }
            
            // Manual navigation controls
            $('#tech-carousel-prev').on('click', function() {
                if (window.techCarousel) {
                    window.techCarousel.trigger('prev.owl.carousel');
                    console.log('Tech: Manual previous clicked');
                }
            });
            
            $('#tech-carousel-next').on('click', function() {
                if (window.techCarousel) {
                    window.techCarousel.trigger('next.owl.carousel');
                    console.log('Tech: Manual next clicked');
                }
            });
            
            // Indicator click handlers
            $('.tech-indicator-item').on('click', function() {
                const slideIndex = parseInt($(this).data('slide'));
                if (window.techCarousel && !isNaN(slideIndex)) {
                    // Stop autoplay temporarily
                    window.techCarousel.trigger('stop.owl.autoplay');
                    
                    // Go to specific slide
                    window.techCarousel.trigger('to.owl.carousel', [slideIndex, 800]);
                    
                    // Update content immediately
                    updateLeftSideContent(slideIndex);
                    updateIndicators(slideIndex);
                    
                    // Resume autoplay after a delay
                    setTimeout(() => {
                        if (window.techCarousel) {
                            window.techCarousel.trigger('play.owl.autoplay');
                        }
                    }, 3000);
                    
                    console.log(`Tech: Manual indicator clicked - slide ${slideIndex}`);
                }
            });
            
            // Add hover effects for carousel slides
            $('.tech-slide-content').hover(
                function() {
                    // On hover - pause autoplay and show current tech info
                    if (window.techCarousel) {
                        window.techCarousel.trigger('stop.owl.autoplay');
                    }
                    const techIndex = parseInt($(this).data('tech'));
                    if (!isNaN(techIndex)) {
                        updateLeftSideContent(techIndex);
                        updateIndicators(techIndex);
                    }
                },
                function() {
                    // On hover out - resume autoplay
                    if (window.techCarousel) {
                        window.techCarousel.trigger('play.owl.autoplay');
                    }
                }
            );
            
            console.log('Tech: Carousel and manual controls initialized');
        });
    }
}

// Initialize tech interactions
function initializeTechInteractions() {
    console.log('Tech: Initializing interactions');
    
    // Desktop carousel slide click handlers
    const carouselSlides = document.querySelectorAll('.tech-slide-content');
    carouselSlides.forEach(slide => {
        const link = slide.dataset.link;
        if (link) {
            slide.style.cursor = 'pointer';
            slide.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = link;
            });
        }
    });

    console.log(`Tech: Added interactions to ${carouselSlides.length} carousel slides`);
}

// Theme handling
function handleTechThemeChange() {
    console.log('Tech: Handling theme change');
    
    // Update carousel dots color based on theme
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const dots = document.querySelectorAll('.tech-carousel .owl-dot');
    
    dots.forEach(dot => {
        if (isDark) {
            dot.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        } else {
            dot.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        }
    });
}

// Cleanup function
function cleanupTechSection() {
    console.log('Tech: Cleaning up tech section');
    
    // Destroy carousel if exists
    if (typeof jQuery !== 'undefined') {
        jQuery('.tech-carousel-slider').trigger('destroy.owl.carousel');
    }
}

// Visibility change handler
function handleTechVisibilityChange() {
    if (typeof jQuery !== 'undefined') {
        if (document.hidden) {
            jQuery('.tech-carousel-slider').trigger('stop.owl.autoplay');
        } else {
            jQuery('.tech-carousel-slider').trigger('play.owl.autoplay');
        }
    }
}

// Resize handler
let techResizeTimeout;
function handleTechResize() {
    clearTimeout(techResizeTimeout);
    techResizeTimeout = setTimeout(() => {
        if (typeof jQuery !== 'undefined') {
            jQuery('.tech-carousel-slider').trigger('refresh.owl.carousel');
        }
    }, 250);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all other scripts are loaded
    setTimeout(() => {
        if (document.querySelector('#tech-section')) {
            initializeTechSection();
        }
    }, 1000);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', handleTechVisibilityChange);

// Handle window resize
window.addEventListener('resize', handleTechResize);

// Handle theme changes
document.addEventListener('themeChanged', handleTechThemeChange);

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupTechSection);

// Export functions for external use
if (typeof window !== 'undefined') {
    window.initializeTechSection = initializeTechSection;
    window.cleanupTechSection = cleanupTechSection;
    window.handleTechThemeChange = handleTechThemeChange;
}