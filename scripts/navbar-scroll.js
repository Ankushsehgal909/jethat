// Enhanced Navbar Scroll Effect with Blur and Theme Support
(function() {
    'use strict';
    
    let isScrolled = false;
    let ticking = false;
    
    // Configuration
    const config = {
        scrollThreshold: 50,
        transitionDuration: 400,
        blurAmount: 20,
        saturation: 180
    };
    
    // Get navbar element
    function getNavbar() {
        return document.querySelector('.navbar, .professional-nav, .navbar-theme');
    }
    
    // Detect current theme
    function getCurrentTheme() {
        const body = document.body;
        const html = document.documentElement;
        
        if (body.classList.contains('dark-theme') || 
            html.classList.contains('dark-theme') ||
            html.getAttribute('data-bs-theme') === 'dark') {
            return 'dark';
        } else if (body.classList.contains('light-theme') || 
                   html.classList.contains('light-theme') ||
                   html.getAttribute('data-bs-theme') === 'light') {
            return 'light';
        }
        
        // Default theme detection based on CSS variables or system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    
    // Apply scroll effect to navbar
    function applyScrollEffect(navbar, scrolled) {
        if (!navbar) return;
        
        const theme = getCurrentTheme();
        
        if (scrolled) {
            // Add scrolled class and blur effect
            navbar.classList.add('navbar-scrolled');
            
            // Apply theme-specific styles
            if (theme === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.85)';
                navbar.style.borderBottom = '1px solid rgba(220, 20, 60, 0.25)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.85)';
                navbar.style.borderBottom = '1px solid rgba(220, 20, 60, 0.15)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }
            
            // Apply blur effect
            navbar.style.backdropFilter = `blur(${config.blurAmount}px) saturate(${config.saturation}%)`;
            navbar.style.webkitBackdropFilter = `blur(${config.blurAmount}px) saturate(${config.saturation}%)`;
            
        } else {
            // Remove scrolled class and reset to transparent
            navbar.classList.remove('navbar-scrolled');
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.webkitBackdropFilter = 'none';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid transparent';
        }
    }
    
    // Handle scroll event
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeScrolled = scrollTop > config.scrollThreshold;
        
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            const navbar = getNavbar();
            
            if (navbar) {
                applyScrollEffect(navbar, isScrolled);
                
                // Dispatch custom event for other components
                const event = new CustomEvent('navbarScrollStateChanged', {
                    detail: { 
                        scrolled: isScrolled, 
                        scrollTop: scrollTop,
                        theme: getCurrentTheme()
                    }
                });
                document.dispatchEvent(event);
            }
        }
        
        ticking = false;
    }
    
    // Throttled scroll handler
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    // Handle theme changes
    function handleThemeChange() {
        const navbar = getNavbar();
        if (navbar && isScrolled) {
            // Reapply scroll effect with new theme
            applyScrollEffect(navbar, true);
        }
    }
    
    // Initialize navbar scroll effect
    function initNavbarScroll() {
        // Initial check
        handleScroll();
        
        // Add scroll listener
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Listen for theme changes
        document.addEventListener('themeChanged', handleThemeChange);
        
        // Watch for theme attribute changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'data-bs-theme' || 
                     mutation.attributeName === 'class')) {
                    handleThemeChange();
                }
            });
        });
        
        // Observe theme changes on html and body
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-bs-theme', 'class']
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Enhanced initialization with multiple triggers
    function initialize() {
        if (document.readyState !== 'loading') {
            initNavbarScroll();
        } else {
            document.addEventListener('DOMContentLoaded', initNavbarScroll);
        }
        
        // Backup initialization
        window.addEventListener('load', function() {
            setTimeout(initNavbarScroll, 100);
        });
        
        // Handle dynamic navbar loading
        document.addEventListener('navigationLoaded', function() {
            setTimeout(initNavbarScroll, 100);
        });
    }
    
    // Expose global functions
    window.navbarScrollEffect = {
        init: initNavbarScroll,
        handleScroll: handleScroll,
        getCurrentTheme: getCurrentTheme,
        config: config
    };
    
    // Auto-initialize
    initialize();
    
    // Handle page visibility changes (for performance)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, remove scroll listener
            window.removeEventListener('scroll', onScroll);
        } else {
            // Page is visible, re-add scroll listener and check current state
            window.addEventListener('scroll', onScroll, { passive: true });
            handleScroll();
        }
    });
    
})();