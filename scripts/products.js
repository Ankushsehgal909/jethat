/**
 * Products Section Animations - Tech Section Inspired
 * Works with existing WOW.js and Owl Carousel functionality
 */

// Load required libraries
function loadProductsLibraries() {
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

// Initialize products section
function initializeProductsSection() {
    console.log('Products: Initializing products section');
    
    // Ensure content is visible first
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
        productsSection.style.opacity = '1';
        productsSection.style.visibility = 'visible';
        
        // Make sure all text elements are visible
        const textElements = productsSection.querySelectorAll('.display-1, h5, .text-gradient');
        textElements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        });
    }
    
    // Load libraries and initialize carousel
    loadProductsLibraries().then(() => {
        initializeProductsCarousel();
        initializeProductsInteractions();
    });
}

// Initialize products carousel
function initializeProductsCarousel() {
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.owlCarousel !== 'undefined') {
        jQuery(document).ready(function($) {
            console.log('Products: Initializing carousel');
            
            // Product data for synchronization
            const productData = [
                {
                    link: 'products/ai-lms.html',
                    ctaText: 'Explore AI-LMS'
                },
                {
                    link: 'products/anukaran-ai.html',
                    ctaText: 'Explore Anukaran AI'
                },
                {
                    link: 'products/e-library.html',
                    ctaText: 'Explore E-Library'
                },
                {
                    link: 'products/magai.html',
                    ctaText: 'Explore MagAI'
                },
                {
                    link: 'products/multi-dictionary.html',
                    ctaText: 'Explore Multi-Dictionary'
                },
                {
                    link: 'products/sambhasini-ai.html',
                    ctaText: 'Explore Sambhāṣinī AI'
                },
                {
                    link: 'products/virtual-naani.html',
                    ctaText: 'Explore Virtual Naani'
                }
            ];
            
            let currentSlide = 0;
            
            // Initialize products carousel
            $('.products-carousel-slider').each(function() {
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
                        const realIndex = currentIndex % productData.length;
                        currentSlide = realIndex;
                        updateLeftSideContent(realIndex);
                        updateIndicators(realIndex);
                        console.log(`Products: Carousel changed to slide ${realIndex}`);
                    },
                    onInitialized: function(event) {
                        // Set initial content
                        currentSlide = 0;
                        updateLeftSideContent(0);
                        updateIndicators(0);
                        console.log('Products: Carousel initialized');
                    }
                });
                
                // Store carousel reference for manual controls
                window.productsCarousel = $carousel;
            });
            
            // Function to update left side content
            function updateLeftSideContent(productIndex) {
                // Hide all product info items
                $('.product-info-item').removeClass('active');
                
                // Show the current product info
                $(`.product-info-item[data-product="${productIndex}"]`).addClass('active');
                
                // Update CTA link and text
                const currentProduct = productData[productIndex];
                if (currentProduct) {
                    $('#explore-current-product').attr('href', currentProduct.link);
                    $('#current-product-cta').text(currentProduct.ctaText);
                }
            }
            
            // Function to update indicators
            function updateIndicators(activeIndex) {
                $('.indicator-item').removeClass('active');
                $(`.indicator-item[data-slide="${activeIndex}"]`).addClass('active');
            }
            
            // Manual navigation controls
            $('#carousel-prev').on('click', function() {
                if (window.productsCarousel) {
                    window.productsCarousel.trigger('prev.owl.carousel');
                    console.log('Products: Manual previous clicked');
                }
            });
            
            $('#carousel-next').on('click', function() {
                if (window.productsCarousel) {
                    window.productsCarousel.trigger('next.owl.carousel');
                    console.log('Products: Manual next clicked');
                }
            });
            
            // Indicator click handlers
            $('.indicator-item').on('click', function() {
                const slideIndex = parseInt($(this).data('slide'));
                if (window.productsCarousel && !isNaN(slideIndex)) {
                    // Stop autoplay temporarily
                    window.productsCarousel.trigger('stop.owl.autoplay');
                    
                    // Go to specific slide
                    window.productsCarousel.trigger('to.owl.carousel', [slideIndex, 800]);
                    
                    // Update content immediately
                    updateLeftSideContent(slideIndex);
                    updateIndicators(slideIndex);
                    
                    // Resume autoplay after a delay
                    setTimeout(() => {
                        if (window.productsCarousel) {
                            window.productsCarousel.trigger('play.owl.autoplay');
                        }
                    }, 3000);
                    
                    console.log(`Products: Manual indicator clicked - slide ${slideIndex}`);
                }
            });
            
            // Add hover effects for carousel slides
            $('.product-slide-content').hover(
                function() {
                    // On hover - pause autoplay and show current product info
                    if (window.productsCarousel) {
                        window.productsCarousel.trigger('stop.owl.autoplay');
                    }
                    const productIndex = parseInt($(this).data('product'));
                    if (!isNaN(productIndex)) {
                        updateLeftSideContent(productIndex);
                        updateIndicators(productIndex);
                    }
                },
                function() {
                    // On hover out - resume autoplay
                    if (window.productsCarousel) {
                        window.productsCarousel.trigger('play.owl.autoplay');
                    }
                }
            );
            
            console.log('Products: Carousel and manual controls initialized');
        });
    }
}

// Initialize products interactions
function initializeProductsInteractions() {
    console.log('Products: Initializing interactions');
    
    // Desktop carousel slide click handlers
    const carouselSlides = document.querySelectorAll('.product-slide-content');
    carouselSlides.forEach(slide => {
        const link = slide.dataset.link;
        if (link) {
            slide.addEventListener('click', () => {
                console.log(`Products: Navigating to ${link}`);
                window.location.href = link;
            });
            
            slide.style.cursor = 'pointer';
            
            // Add hover effects with content sync
            slide.addEventListener('mouseenter', () => {
                slide.style.transform = 'scale(1.02)';
                
                // Sync left side content on hover
                const productIndex = parseInt(slide.dataset.product);
                if (!isNaN(productIndex)) {
                    updateLeftSideContentDirect(productIndex);
                }
            });
            
            slide.addEventListener('mouseleave', () => {
                slide.style.transform = 'scale(1)';
            });
        }
    });

    // Mobile card click handlers
    const mobileCards = document.querySelectorAll('.mobile-product-card');
    mobileCards.forEach(card => {
        const link = card.dataset.link;
        if (link) {
            card.addEventListener('click', () => {
                console.log(`Products: Mobile card navigating to ${link}`);
                window.location.href = link;
            });
            
            card.style.cursor = 'pointer';
            
            // Add keyboard support
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Navigate to ${card.querySelector('.mobile-card-title')?.textContent || 'product page'}`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = link;
                }
            });
        }
    });

    // Add click handler for dynamic CTA button
    const exploreCurrent = document.getElementById('explore-current-product');
    if (exploreCurrent) {
        exploreCurrent.addEventListener('click', (e) => {
            const href = exploreCurrent.getAttribute('href');
            console.log(`Products: CTA clicked, navigating to ${href}`);
        });
    }

    console.log(`Products: Added interactions to ${carouselSlides.length} carousel slides and ${mobileCards.length} mobile cards`);
}

// Direct function to update left side content (for hover effects)
function updateLeftSideContentDirect(productIndex) {
    const productData = [
        {
            link: 'products/ai-lms.html',
            ctaText: 'Explore AI-LMS'
        },
        {
            link: 'products/anukaran-ai.html',
            ctaText: 'Explore Anukaran AI'
        },
        {
            link: 'products/e-library.html',
            ctaText: 'Explore E-Library'
        },
        {
            link: 'products/magai.html',
            ctaText: 'Explore MagAI'
        },
        {
            link: 'products/multi-dictionary.html',
            ctaText: 'Explore Multi-Dictionary'
        },
        {
            link: 'products/sambhasini-ai.html',
            ctaText: 'Explore Sambhāṣinī AI'
        },
        {
            link: 'products/virtual-naani.html',
            ctaText: 'Explore Virtual Naani'
        }
    ];
    
    // Hide all product info items
    const allItems = document.querySelectorAll('.product-info-item');
    allItems.forEach(item => item.classList.remove('active'));
    
    // Show the current product info
    const currentItem = document.querySelector(`.product-info-item[data-product="${productIndex}"]`);
    if (currentItem) {
        currentItem.classList.add('active');
    }
    
    // Update CTA link and text
    const currentProduct = productData[productIndex];
    if (currentProduct) {
        const ctaLink = document.getElementById('explore-current-product');
        const ctaText = document.getElementById('current-product-cta');
        
        if (ctaLink) ctaLink.setAttribute('href', currentProduct.link);
        if (ctaText) ctaText.textContent = currentProduct.ctaText;
    }
}

// Handle theme changes
function handleProductsThemeChange() {
    const productsSection = document.querySelector('#products-section');
    if (!productsSection) return;

    // Update carousel dots color based on theme
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const dots = document.querySelectorAll('.products-carousel .owl-dot');
    
    dots.forEach(dot => {
        if (isDark) {
            dot.style.background = 'rgba(255, 255, 255, 0.7)';
            dot.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        } else {
            dot.style.background = 'rgba(255, 255, 255, 0.7)';
            dot.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        }
    });
}

// Cleanup function
function cleanupProductsSection() {
    // Destroy carousel if exists
    if (typeof jQuery !== 'undefined') {
        jQuery('.products-carousel-slider').trigger('destroy.owl.carousel');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Products: DOM loaded, initializing...');
    
    // Immediate visibility fix
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
        // Force visibility of the entire section
        productsSection.style.opacity = '1';
        productsSection.style.visibility = 'visible';
        
        // Force visibility of all wow elements
        const wowElements = productsSection.querySelectorAll('.wow');
        wowElements.forEach(element => {
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        });
    }
    
    // Small delay to ensure all components are loaded
    setTimeout(() => {
        // Only initialize if not already called
        if (!window.productsAnimationsInitialized) {
            initializeProductsSection();
            window.productsAnimationsInitialized = true;
        }
    }, 300);
    
    // Additional fallback after 1 second
    setTimeout(() => {
        const productsSection = document.querySelector('#products-section');
        if (productsSection) {
            const hiddenElements = productsSection.querySelectorAll('[style*="visibility: hidden"], .wow:not(.animated)');
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
                handleProductsThemeChange();
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
            jQuery('.products-carousel-slider').trigger('stop.owl.autoplay');
        } else {
            jQuery('.products-carousel-slider').trigger('play.owl.autoplay');
        }
    }
});

// Handle window resize
let productsResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(productsResizeTimeout);
    productsResizeTimeout = setTimeout(() => {
        if (typeof jQuery !== 'undefined') {
            jQuery('.products-carousel-slider').trigger('refresh.owl.carousel');
        }
    }, 250);
});

// Export functions
if (typeof window !== 'undefined') {
    window.initializeProductsSection = initializeProductsSection;
    window.cleanupProductsSection = cleanupProductsSection;
    
    // Legacy support
    window.ProductsSection = {
        init: initializeProductsSection,
        refresh: function() {
            console.log('Products: Manual refresh requested');
            window.productsAnimationsInitialized = false;
            initializeProductsSection();
        },
        isInitialized: function() {
            return window.productsAnimationsInitialized || false;
        }
    };
}

console.log('Products: Script loaded successfully');