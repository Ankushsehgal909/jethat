(function() {
    'use strict';
    function createNavLoader() {
        if (document.getElementById('nav-loader')) return;

        const navLoader = document.createElement('div');
        navLoader.className = 'nav-loader';
        navLoader.id = 'nav-loader';
        navLoader.innerHTML = '<div class="nav-loader-bar"></div>';
        navLoader.style.display = 'none';
        
        document.body.appendChild(navLoader);
    }

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

    function hideNavLoader() {
        const navLoader = document.getElementById('nav-loader');
        if (navLoader) {
            setTimeout(() => {
                navLoader.style.display = 'none';
            }, 1000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createNavLoader);
    } else {
        createNavLoader();
    }

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link && 
            link.href && 
            link.href.startsWith(window.location.origin) &&
            !link.href.includes('#') &&
            !link.target &&
            !link.download &&
            !e.ctrlKey && 
            !e.metaKey && 
            !e.shiftKey) {
            
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
