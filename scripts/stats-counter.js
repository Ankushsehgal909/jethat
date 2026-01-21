/**
 * Stats Counter Animation
 * Handles the animated counter for statistics section
 * Supports both static and dynamically loaded components
 */

(function() {
    'use strict';
    
    // Configuration for animation
    const animationConfig = {
        duration: 2000, // Animation duration in ms
        updateInterval: 20 // Update interval in ms
    };
    
    // Function to animate a single counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animationConfig.duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(target * easeOutQuart);
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Function to start animation for all counters in a container
    function animateCountersInContainer(container) {
        const counters = container.querySelectorAll('.counter:not(.animated)');
        
        if (counters.length === 0) {
            return;
        }
        
        // Initialize with Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        counter.classList.add('animated');
                        animateCounter(counter);
                        observer.unobserve(counter);
                    }
                });
            }, {
                threshold: 0.5, // Trigger when 50% of element is visible
                rootMargin: '0px 0px -50px 0px'
            });
            
            counters.forEach(counter => {
                observer.observe(counter);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            counters.forEach(counter => {
                counter.classList.add('animated');
                animateCounter(counter);
            });
        }
    }
    
    // Initialize counters in the entire document
    function initAllCounters() {
        animateCountersInContainer(document.body);
    }
    
    // Use MutationObserver to detect dynamically loaded components
    function initMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        // Check if the added node or its children contain counters
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.classList && node.classList.contains('stats-theme')) {
                                animateCountersInContainer(node);
                            }
                            // Also check children
                            const statsInNode = node.querySelector && node.querySelector('.stats-theme');
                            if (statsInNode) {
                                animateCountersInContainer(statsInNode);
                            }
                            // Check for counter elements directly
                            if (node.querySelectorAll) {
                                const counters = node.querySelectorAll('.counter');
                                if (counters.length > 0) {
                                    animateCountersInContainer(node);
                                }
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Listen for custom event from component loader
    function initCustomEventListener() {
        document.addEventListener('componentLoaded', (e) => {
            // Check if the loaded component contains counters
            const container = e.detail && e.detail.element ? e.detail.element : document.body;
            animateCountersInContainer(container);
        });
        
        // Listen for loaderManager completion
        document.addEventListener('loaderComplete', () => {
            setTimeout(initAllCounters, 100);
        });
    }
    
    // Initialize
    function init() {
        // Initial attempt for already loaded counters
        initAllCounters();
        
        // Set up MutationObserver for dynamically added counters
        initMutationObserver();
        
        // Listen for custom events from component loader
        initCustomEventListener();
        
        // Also try after a short delay to catch any late-loaded components
        setTimeout(initAllCounters, 500);
        setTimeout(initAllCounters, 1000);
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

