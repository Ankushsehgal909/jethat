/**
 * Navigation Loader
 * Shows loading indicator when navigating between pages
 */

(function() {
    'use strict';

    // Create navigation loader
    function createNavLoader() {
        if (document.getElementById('nav-loader')) return;

        const navLoader = document.createElement('div');
        navLoader.className = 'nav-loader';
        navLoader.id = 'nav-loader';
        navLoader.innerHTML = '<div class="nav-loader-bar"></div>';
        navLoader.style.display = 'none';
        
        document.body.appendChild(navLoader);
    }

    // Show navigation loader
    function showNavLoader() {
        const navLoader = document.getElementById('nav-loader');
        if (navLoader) {
            navLoader.style.display = 'block';
            const bar = navLoader.querySelector('.nav-loader-bar');
            if (bar) {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'navProgress 1s ease-in-out';
                }, 10);
            }
        }
    }

    // Hide navigation loader
    function hideNavLoader() {
        const navLoader = document.getElementById('nav-loader');
        if (navLoader) {
            setTimeout(() => {
                navLoader.style.display = 'none';
            }, 1000);
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createNavLoader);
    } else {
        createNavLoader();
    }

    // Intercept all navigation links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        // Check if it's an internal navigation link
        if (link && 
            link.href && 
            link.href.startsWith(window.location.origin) &&
            !link.href.includes('#') &&
            !link.target &&
            !link.download &&
            !e.ctrlKey && 
            !e.metaKey && 
            !e.shiftKey) {
            
            // Show loader for internal navigation
            showNavLoader();
        }
    });

    // Hide loader when new page starts loading
    window.addEventListener('beforeunload', function() {
        hideNavLoader();
    });

    // Export for manual control
    window.navLoader = {
        show: showNavLoader,
        hide: hideNavLoader
    };

})();
